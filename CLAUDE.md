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
Home, About, Services, Portfolio (+ `/portfolio/:id`), Blog (+ `/blog/:slug`), Contact, 404.

Three cross-cutting systems define how this codebase works — understand these before editing:

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
- **SEO/structured data**: `src/lib/schema.js` exports JSON-LD builders
  (`professionalServiceSchema`, `breadcrumbSchema`, `creativeWorkSchema`, `articleSchema`, etc.);
  `SchemaScript` injects them via Helmet. Each page sets its own Helmet title/description/canonical/OG.
  Site-wide ProfessionalService JSON-LD is hardcoded in `index.html`.

## Deployment constraints (`vercel.json`)

- Explicit `buildCommand` + `outputDirectory: dist` are required — the site shipped blank without them.
- SPA rewrite sends all routes to `/index.html`.
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
