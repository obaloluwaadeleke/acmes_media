// Post-build step: renders every route to static HTML so crawlers (including
// AI bots that don't run JavaScript) receive real content, titles, canonicals
// and JSON-LD. Also generates sitemap.xml and robots.txt from the route list.
//
// Runs after `vite build` (client → dist/) and `vite build --ssr` (→ dist-ssr/).
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, SITE_URL, NOT_FOUND_ROUTE } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

// React 19 emits hoistable metadata (<title>, <meta>, <link>) ahead of the app
// markup when rendering a fragment. Move that preamble into <head>.
function splitHead(html) {
  const match = html.match(/^(?:\s*<(?:title[^>]*>[\s\S]*?<\/title>|meta\b[^>]*>|link\b[^>]*>))*/);
  const head = match ? match[0] : '';
  return { head: head.trim(), body: html.slice(head.length) };
}

async function writePage(url, outFile) {
  const { head, body } = splitHead(await render(url));
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body);
  const target = path.join(dist, outFile);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, page);
  return page;
}

for (const { path: url } of routes) {
  // /about → about.html; vercel.json `cleanUrls` serves it at /about
  const outFile = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  const page = await writePage(url, outFile);

  // Guard against regressions of the duplicate-canonical / empty-title bugs.
  const canonicals = page.match(/rel="canonical"/g)?.length ?? 0;
  const title = page.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (canonicals !== 1 || !title.trim()) {
    throw new Error(`${url}: expected 1 canonical and a title, got ${canonicals} canonical(s) and title "${title}"`);
  }
  console.log(`  prerendered ${url.padEnd(55)} ${title}`);
}

// Served by Vercel with a real 404 status for any unmatched URL.
await writePage(NOT_FOUND_ROUTE, '404.html');
console.log('  prerendered 404.html');

// lastmod only where a real date is known (blog posts) — a build-date lastmod
// on every URL teaches Google to ignore the field.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ path: url, lastmod }) => `  <url>
    <loc>${SITE_URL}${url === '/' ? '/' : url}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`)
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);

await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`  wrote sitemap.xml (${routes.length} URLs) and robots.txt`);
