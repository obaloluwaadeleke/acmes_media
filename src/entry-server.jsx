// Build-time render entry, used only by scripts/prerender.mjs (never shipped
// to the browser). Mirrors main.jsx's tree so the client can hydrate it.
/* eslint-disable react-refresh/only-export-components -- not a HMR module */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes';
import { projects } from './data/projects';
import { posts } from './lib/posts';

export { SITE_URL } from './lib/site';

export const NOT_FOUND_ROUTE = '/__not-found__';

// Every indexable URL. The sitemap is generated from this list.
export const routes = [
  { path: '/' },
  { path: '/about' },
  { path: '/services' },
  { path: '/portfolio' },
  ...projects.map((p) => ({ path: `/portfolio/${p.id}` })),
  { path: '/blog' },
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updated || p.date })),
  { path: '/contact' },
];

// prerenderToNodeStream (unlike renderToString) waits for lazy routes to
// resolve, so the output contains the full page rather than a fallback.
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
    {
      // By default React "outlines" any Suspense boundary over ~12 KB: it emits
      // the fallback in place and appends the real content as a hidden segment
      // plus a swap script. Disable that so page content sits inline in <main>.
      progressiveChunkSize: Infinity,
    },
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
