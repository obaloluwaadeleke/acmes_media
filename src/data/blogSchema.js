/**
 * Blog post schema
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the shape every post must conform to, regardless of where it comes
 * from (CMS, markdown files, or the placeholder array in Blog.jsx).
 *
 * When you connect a headless CMS, map its response to this shape inside
 * src/hooks/usePosts.js before returning data to the page.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * @typedef {Object} BlogPost
 * @property {string}       id          - Unique identifier (CMS entry ID or slug)
 * @property {string}       slug        - URL slug, e.g. "brand-identity-process"
 * @property {string}       title       - Post title (plain text)
 * @property {string}       excerpt     - One-paragraph summary shown on the listing page
 * @property {string}       category    - Must match one of the CATEGORIES array in Blog.jsx
 * @property {string}       date        - Display date string, e.g. "May 2025"
 * @property {string}       readTime    - Estimated read time, e.g. "6 min read"
 * @property {string|null}  coverImage  - Absolute image URL, or null for gradient placeholder
 * @property {boolean}      featured    - Whether to surface this post in featured slots
 * @property {string}       [body]      - Full HTML/markdown body (used on the detail page)
 * @property {string}       [author]    - Author name (optional)
 * @property {string[]}     [tags]      - Array of tag strings (optional, for future filtering)
 */

