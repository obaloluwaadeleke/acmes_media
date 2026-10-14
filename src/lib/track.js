// Lightweight conversion tracking for the /sales page.
//
// No analytics vendor is bundled here. Events go to whatever is present on the
// page: a GTM/GA4 `dataLayer`, `gtag`, or the Meta pixel `fbq`. Until one of
// those is installed the calls are harmless no-ops (they log in dev only).
// UTM parameters are captured once per session so every event and the form
// submission carry the channel that brought the visitor.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'sales_attribution';

export function getAttribution() {
  if (typeof window === 'undefined') return {};

  let attr = {};
  try { attr = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}'); } catch { /* storage blocked */ }

  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) attr[key] = value;
  });

  if (!attr.referrer && document.referrer) {
    try { attr.referrer = new URL(document.referrer).hostname; } catch { /* bad referrer */ }
  }

  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr)); } catch { /* storage blocked */ }
  return attr;
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
