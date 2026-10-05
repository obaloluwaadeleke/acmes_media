// Vercel serverless function: POST /api/contact
//
// Why this exists: the site is a static SPA, so a reCAPTCHA token generated in
// the browser is worthless unless something verifies it server-side with the
// SECRET key. This function does that verification, then forwards clean
// submissions to Formspree. The Formspree URL lives here (server-side), not in
// the public JS bundle, so bots can't scrape it and POST around the check.
//
// Required env vars (set in the Vercel dashboard, NOT in code):
//   RECAPTCHA_SECRET_KEY  — reCAPTCHA v3 secret key
//   FORMSPREE_ENDPOINT    — optional; defaults to the existing form endpoint
//
// Minimum score to accept (v3 returns 0.0–1.0; 0.5 is Google's default cutoff).
const MIN_SCORE = 0.5;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const formspree = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xojrgrlr';

  if (!secret) {
    console.error('[contact] RECAPTCHA_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { token, _gotcha, ...formData } = body;

  // Honeypot: a real user never fills this. Return a fake success so the bot
  // believes it worked and moves on — no signal that it was filtered.
  if (_gotcha) return res.status(200).json({ ok: true });

  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!token) return res.status(400).json({ error: 'Missing captcha token' });

  // ── Verify the reCAPTCHA token with Google ────────────────────────────────
  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const verify = await verifyRes.json();

    if (!verify.success || (typeof verify.score === 'number' && verify.score < MIN_SCORE)) {
      console.warn('[contact] reCAPTCHA rejected', { score: verify.score, errors: verify['error-codes'] });
      return res.status(403).json({ error: 'Failed spam check' });
    }
  } catch (err) {
    console.error('[contact] reCAPTCHA verification error', err);
    return res.status(502).json({ error: 'Verification unavailable' });
  }

  // ── Forward the clean submission to Formspree ─────────────────────────────
  try {
    const fwd = await fetch(formspree, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!fwd.ok) {
      console.error('[contact] Formspree returned', fwd.status);
      return res.status(502).json({ error: 'Delivery failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Formspree forward error', err);
    return res.status(502).json({ error: 'Delivery failed' });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
