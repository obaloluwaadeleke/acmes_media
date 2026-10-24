# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server on port 5174 (see .claude/launch.json; autoPort on)
npm run build     # Production build to dist/
npm run preview   # Preview the production build
npm run lint      # ESLint over the repo
```

- **Preview/verify UI work via the launch config**, not a manual `npm run dev` in Bash — the dev server is named `acmesmedia` in `.claude/launch.json` (port 5174).
- No test runner is configured. There are no tests to run.
- Use `python` (not `python3`) on this machine if scripting is needed.

## Stack

Vite 8 + React 19 (**JSX, not TypeScript**) + Tailwind CSS 3 + Framer Motion 12 + react-router-dom 7.
SEO via react-helmet-async. Icons from lucide-react. Deployed on Vercel behind Cloudflare.
Path alias `@/` → `src/` (defined in both `vite.config.js` and consumed throughout).

## Architecture

**Single-page marketing site** for a creative agency. Entry: `main.jsx` wraps `<App/>` in
`HelmetProvider` + Vercel `SpeedInsights`. `App.jsx` defines all routes under one `Layout` route
(`Header` + `<Outlet/>` + `Footer`), with `ScrollToTop` resetting scroll on navigation. Routes:
Home, About, Services, Portfolio (+ `/portfolio/:id`), Blog (+ `/blog/:slug`), Contact, 404, plus the
unlisted `/sales` offer page (see "/sales landing page" below; it sits outside `Layout`).

Four cross-cutting systems define how this codebase works — understand these before editing:

### 1. Design tokens are the single source of truth
Never hardcode brand colors, fonts, or spacing. Everything flows from two files:
- **`tailwind.config.js`** — brand color scales (`bg`, `accent`, `ink`, `border`), fluid
  `display-*` font sizes (clamp-based), serif/sans families. The **same palette is also mapped
  into shadcn/ui CSS variables** so shadcn components drop in on-brand.
- **`src/index.css`** — the shadcn CSS variables (dark theme, `--radius: 0.75rem`) plus an
  `@layer components` block of reusable utilities: `.container-site`, `.section-pad`,
  `.label-tag`, `.heading-*`, `.body-*`, `.card-surface`, `.btn-primary`/`.btn-ghost` (animated
  conic-gradient ring via `@property --btn-angle` + mask-composite carve), `.grid-bg`,
  `.text-gradient`. Prefer these classes over ad-hoc Tailwind for anything that recurs.

Brand palette: gold accent `#C8A96E` on near-black `#080808`; DM Serif Display headings, DM Sans
body. **Off-palette colors (purple/indigo) are not brand tokens** — do not introduce them, even
from external design references.

### 2. Motion is centralized and always has a reduced-motion fallback
- **`src/lib/motion-tokens.js`** holds shared easings/durations/delays. Reuse these; don't invent
  new easing curves inline.
- Reusable motion primitives live in `src/components/ui/`: `RevealWrapper` (scroll fade-rise, its
  `className` prop passes through to the motion.div so it can carry grid col-spans), `HeroReveal`
  (SEO-safe word-split — keeps an `sr-only` unsplit copy for crawlers/AT), `AmbientGlow`
  (drifting blurred orbs), `AnimatedCounter`, and the `Marquee` CSS loop.
- **Every animated component must call `useReducedMotion()` and degrade gracefully.** There is
  also a global `prefers-reduced-motion` kill-switch in `index.css`. Both layers are expected.

### 3. Content is data-driven; components are presentational
- Page content lives in **`src/data/*.js`** (`projects.js`, `services.js`, `testimonials.js`,
  `stats.js`) — edit data there, not JSX. Data shapes are minimal (e.g. a testimonial is
  `{ id, quote, name, title, company, initials }` — no ratings/dates).
- **Blog posts are markdown** in `src/content/blog/*.md`. `src/hooks/usePosts.js` loads them via
  `import.meta.glob(..., { query: '?raw' })` and parses front-matter manually (no parser dep).
  To add a post, drop in a `.md` file with `title/date/category/readTime/excerpt/coverImage/featured`
  front-matter.
- **SEO/structured data**: `src/lib/site.js` holds `SITE_URL` (`https://www.acmesmedia.com` — must
  match Vercel's primary domain; every canonical/og:url/sitemap/JSON-LD URL derives from it).
  Each page renders `<Seo title description path [image] [type] [noindex] />`
  (`src/components/ui/Seo.jsx`) for title/description/canonical/OG/Twitter. Pass `title` as a single
  string (template literal) — React 19 renders a `<title>` with mixed children as empty.
  `src/lib/schema.js` exports JSON-LD builders (breadcrumb items take site-relative `path`s);
  `SchemaScript` injects them. Site-wide ProfessionalService + WebSite JSON-LD render from `Layout`.
  **`index.html` must not carry title/description/canonical/OG/JSON-LD** — React 19 hoists page
  tags alongside static ones, producing conflicting duplicates.

### 4. Every route is prerendered at build time
`npm run build` = client build → SSR build of `src/entry-server.jsx` → `scripts/prerender.mjs`,
which writes `dist/<route>.html` for every route in `entry-server.jsx`'s `routes` list (static pages
+ every project id + every blog slug), `dist/404.html`, `sitemap.xml` and `robots.txt` (both
generated — don't add them to `public/`). The script fails the build if a page lacks exactly one
canonical and a non-empty title. `main.jsx` hydrates prerendered HTML (`hydrateRoot`) and falls back
to `createRoot` on the dev server. Consequences:
- Render output must be deterministic and SSR-safe: touch `window`/`document` only inside effects.
- Data a page needs must be available synchronously (blog posts are parsed eagerly in
  `src/lib/posts.js`; `usePosts()` keeps its `{ posts, loading, error }` shape for a future CMS).
- A new route must be added to both `src/routes.jsx` and the `routes` list in `entry-server.jsx`.
  Unlisted pages (like `/sales`) go in `hiddenRoutes` instead: prerendered, but kept out of the sitemap.
- Routes other than Home/NotFound are `React.lazy` chunks behind the `Suspense` in `Layout`.
- Test the real output with `npx serve -l 4180 dist` after `npm run build` (launch config
  `acmesmedia-dist`) — `serve` mimics Vercel's clean URLs and 404 handling.

## Deployment constraints (`vercel.json`)

- Explicit `buildCommand` + `outputDirectory: dist` are required — the site shipped blank without them.
- No SPA rewrite: routes are real prerendered files served via `cleanUrls` (`/about` → `about.html`,
  `trailingSlash: false`). Unmatched URLs get `404.html` with a true 404 status. Don't re-add a
  catch-all rewrite to `/index.html` — it turns every unknown URL into a soft 404.
- **HTML is served `no-cache`** (Cloudflare would otherwise serve a stale `index.html` pointing at
  old hashed assets after a deploy); `/assets/*` is immutable long-cache. Keep this split intact.

## Contact form — spam protection

The contact form (`src/pages/Contact.jsx`) POSTs directly to Formspree
(`formspree.io/f/xojrgrlr`) from the browser. Because that endpoint is public in the JS bundle,
any spam defense must be enforced server-side (by Formspree or a function) — a browser-only
check is trivially bypassed by POSTing straight to Formspree.

**Currently live: honeypot only.** A hidden `_gotcha` field (off-screen, `opacity:0`,
`tabIndex=-1`) is included in the submission. Formspree silently drops any submission where
`_gotcha` is non-empty. Free, no keys, catches most bots. This is being trialled for ~a week
(from 2026-07) before deciding whether reCAPTCHA is also needed.

**Staged but NOT wired: reCAPTCHA v3.** Verified working, then set aside pending the honeypot
trial. Two files sit ready in the tree, unused until activated:
- `api/contact.js` — Vercel serverless function: verifies the reCAPTCHA token server-side
  (score ≥ 0.5) using `RECAPTCHA_SECRET_KEY`, then forwards clean submissions to Formspree.
  Dormant until the frontend calls it. If deploying honeypot-only, leave this file (and
  `.env.example`) uncommitted so no live endpoint ships.
- `.env.example` — documents `VITE_RECAPTCHA_SITE_KEY` (public, frontend) and
  `RECAPTCHA_SECRET_KEY` (secret, Vercel dashboard only — never in code or committed `.env`).

**To activate reCAPTCHA later:**
1. Create v3 keys at `google.com/recaptcha/admin` (add domains `acmesmedia.com`, `localhost`).
2. In Vercel → Settings → Environment Variables: set `VITE_RECAPTCHA_SITE_KEY` and
   `RECAPTCHA_SECRET_KEY`. Locally, copy `.env.example` → `.env` and add the site key.
3. In `Contact.jsx`: load the v3 script, generate a token per submit, POST to `/api/contact`
   (instead of Formspree directly) with `{ ...formData, token, _gotcha }`, and add Google's
   required reCAPTCHA disclosure line. (The full frontend wiring was built once already —
   reconstruct the same shape.)
4. Deploy code + env vars together — the function returns 500 "Server not configured" without
   the secret. Full local testing needs `vercel dev` (plain `npm run dev` can't run the function).

## /sales landing page (unlisted website offer)

A noindex conversion page for the "10 website slots" offer, linked only from the homepage banner and
shared links. It lives at `/sales`, outside `Layout` (own header/footer), and is prerendered via
`hiddenRoutes` (`entry-server.jsx` + `scripts/prerender.mjs`), so link previews get OG tags.

**Files:** `src/pages/Sales.jsx` (all sections), `src/data/sales.js` (**single source of truth**: slot
count, packages, prices, deposits, included list, FAQ, form options, reply time, WhatsApp number),
`src/components/home/SalesBanner.jsx` (homepage offer section), `src/components/ui/TravellingRing.jsx`
(animated CTA border, class `cta-live`), `src/components/ui/CookieNotice.jsx`, `src/lib/track.js`,
`src/hooks/useIsDesktop.js`, `public/og-sales.jpg` (1200x630 share image).

**Offer (changing prices touches several places):** Starter ₦250k, Pro ₦550k (8 pages), Elite from
₦1.2M; Starter/Pro pay 70% to start and 30% on launch day; Elite is milestone-based. Domain, hosting,
SEO and GEO are included for the first year; the client pays renewals after that. Official email is an
optional separate fee. **Add-on and hourly prices are never shown on the page** (they live in
`docs/pricing-and-terms.md`). After a price change, update `sales.js`, the hero/title text in
`Sales.jsx`, the "From ₦..." heading in `SalesBanner.jsx`, `public/og-sales.jpg`, the flyers in
`marketing/flyers/`, the docs, and the static "Not sure yet" email in Make.

**Slots:** `slots.taken` in `sales.js` is edited by hand and only counts a **cleared deposit**, never an
inquiry. Counters are baked in at build time, so change it and redeploy. Never state how many slots
are left on flyers or share images.

**Form:** `BookingForm` posts to Formspree (`xojrgrlr`, honeypot `_gotcha`) and, when
`VITE_MAKE_WEBHOOK_URL` is set (Vercel env var, and a gitignored local `.env`), also to a Make
webhook. `buildPayload` adds the package money fields from `sales.js` so Make keeps no price table of
its own. Fields: name, phone (WhatsApp), email, package, message, optional `heard_from`.

**Source tracking:** one link everywhere. `getAttribution()` in `track.js` resolves the source from
`utm_source`, then the outside referrer, then the in-app browser user agent, else `direct`
(`detected_source`, `detected_via`). WhatsApp, DMs and SMS send nothing, so they show as `direct`;
`heard_from` covers them. `track()` sends events (`sales_view`, `cta_click`, `whatsapp_click`,
`form_start`, `form_submit`, `form_invalid`, `form_error`, `work_click`) to `gtag`, `dataLayer` and
`fbq` when present. GA4 (`G-YXDNYS0JNV`) is loaded in `index.html`, skipped on localhost, with analytics
storage denied until the visitor accepts the cookie notice (`cookie_consent` in localStorage).

**Automation (outside this repo):** Make scenario: webhook, Google Sheets row ("Acmes Media Website
Sales Leads"), Resend email from `hello@acmesmedia.com`, routed by `package_id` (starter/pro, elite,
unsure). Payments use Paystack payment pages (six links in `docs/`); the email picks the page with
`switch(package_id; ...)` and keeps a bank-transfer fallback. Secret keys live only in Make or Vercel.

**UX and performance rules learned the hard way:**
- `#book` is the **form card**, not the section. `html` already has `scroll-padding-top: 96px`; do not
  add `scroll-mt-*` or the landing position doubles.
- Phones: no decorative infinite animations, big blurred glows or `backdrop-blur` on the header. Use
  `useIsDesktop` (JS) or the `max-width: 767px` block in `index.css` (button rings stay static except
  the header CTA). Form inputs stay 16px so iOS does not zoom.
- Section order: hero, numbers, why a website, included, packages, **systems** (chatbot, booking, CRM,
  store as optional add-ons, names and benefits only), how it works, **form**, why Acmes
  Media, recent work, testimonials, FAQ. Alternate `bg-bg` / `bg-bg-surface` between neighbours.
- Copy: write "Acmes Media" (never bare "Acmes"), no em dashes in short copy, no invented proof.

**Internal files kept out of git on purpose:** `docs/` (client delivery plan, Make guide, pricing and
terms, `docs/word/` exports; contains bank details) and `marketing/` (flyers, Paystack page image).
Do not commit them without confirming the GitHub repo is private.

## Working conventions

- **Do not commit or push unless explicitly asked** — the owner reviews and commits manually.
- **Testimonials stay a single-card carousel** — multi-card / bento testimonial layouts were
  explicitly rejected.
- When adapting an external design reference, take layout/interaction/animation but restyle with
  the existing tokens — never import the reference's colors/fonts.
- If Vite throws a JSX parse error after several sequential edits to one file, rewrite the whole
  file in one pass rather than stacking incremental fixes; stale server error output can linger,
  so verify against fresh logs and a hard reload.
- `PROJECT_PROMPT.md` in the repo root is a reusable master build-prompt capturing the full design
  system and the owner's standing corrections — a useful reference for larger design decisions.
