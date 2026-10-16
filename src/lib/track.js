// Lightweight conversion tracking for the /sales page.
//
// No analytics vendor is bundled here. Events go to whatever is present on the
// page: a GTM/GA4 `dataLayer`, `gtag`, or the Meta pixel `fbq`. Until one of
// those is installed the calls are harmless no-ops (they log in dev only).
// UTM parameters are captured once per session so every event and the form
// submission carry the channel that brought the visitor.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'sales_attribution';

// One link works everywhere: where a visitor came from is worked out automatically.
// Order of trust: explicit utm_source, then the referring site, then the in-app
// browser (Instagram, Facebook, TikTok and others identify themselves), else 'direct'.
// WhatsApp, DMs and SMS send no referrer and no marker, so they land in 'direct';
// the optional "How did you hear about us?" question on the form covers those.
const REFERRER_SOURCES = [
  [/(^|\.)instagram\.com$/, 'instagram'],
  [/(^|\.)(facebook|fb)\.com$|(^|\.)fb\.me$/, 'facebook'],
  [/^t\.co$|(^|\.)(twitter|x)\.com$/, 'x'],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, 'linkedin'],
  [/(^|\.)tiktok\.com$/, 'tiktok'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, 'whatsapp'],
  [/(^|\.)google\./, 'google'],
  [/(^|\.)bing\.com$/, 'bing'],
];
const IN_APP_SOURCES = [
  [/Instagram/i, 'instagram'],
  [/FBAN|FBAV|FB_IAB/i, 'facebook'],
  [/musical_ly|TikTok|Bytedance/i, 'tiktok'],
  [/LinkedInApp/i, 'linkedin'],
  [/Snapchat/i, 'snapchat'],
  [/Twitter/i, 'x'],
];

function detectSource(attr) {
  if (attr.utm_source) return { detected_source: attr.utm_source, detected_via: 'utm' };

  if (attr.referrer) {
    const match = REFERRER_SOURCES.find(([pattern]) => pattern.test(attr.referrer));
    return { detected_source: match ? match[1] : attr.referrer, detected_via: 'referrer' };
  }

  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent || '';
  const inApp = IN_APP_SOURCES.find(([pattern]) => pattern.test(ua));
  if (inApp) return { detected_source: inApp[1], detected_via: 'in-app-browser' };

  return { detected_source: 'direct', detected_via: 'none' };
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};

  let attr = {};
  try { attr = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}'); } catch { /* storage blocked */ }

  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) attr[key] = value;
  });

  // First outside referrer wins; moving between our own pages never overwrites it.
  if (!attr.referrer && document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      if (host !== window.location.hostname && !host.endsWith('acmesmedia.com')) attr.referrer = host;
    } catch { /* bad referrer */ }
  }

  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr)); } catch { /* storage blocked */ }
  return { ...attr, ...detectSource(attr) };
}

export function track(name, params = {}) {
  if (typeof window === 'undefined') return;
  const payload = { ...getAttribution(), ...params };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
    if (typeof window.gtag === 'function') window.gtag('event', name, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload);
  } catch { /* tracking must never break the page */ }

  if (import.meta.env.DEV) console.debug('[track]', name, payload);
}
