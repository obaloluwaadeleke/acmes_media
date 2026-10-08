// Single source of truth for the public origin. Every canonical, og:url,
// sitemap entry and JSON-LD URL is built from this — it must match the host
// Vercel serves as primary (the other host should 308-redirect to it).
export const SITE_URL = 'https://www.acmesmedia.com';
export const SITE_NAME = 'Acmes Media';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`;
