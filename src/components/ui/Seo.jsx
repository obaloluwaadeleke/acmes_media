import { Helmet } from 'react-helmet-async';
import { SITE_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from '@/lib/site';

/**
 * Per-page head tags: title, description, canonical, Open Graph, Twitter.
 * index.html deliberately carries none of these — React 19 hoists whatever
 * this renders into <head>, so a static copy there would duplicate them.
 *
 * Every value is passed as a single string: React 19 renders a <title> with
 * mixed children (e.g. {post.title} — Acmes Media) as an empty title.
 */
export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
}) {
  const url = path ? absoluteUrl(path) : null;
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_NG" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
