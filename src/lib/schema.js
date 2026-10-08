import { SITE_URL as BASE_URL, SITE_NAME as ORG, DEFAULT_OG_IMAGE as OG, absoluteUrl } from './site';
import { services } from '@/data/services';

// Google requires a raster logo (≥112px) for Organization / publisher.
const LOGO = `${BASE_URL}/acmes_media_logo.png`;

// Stable @ids let every page reference the same entities instead of
// re-declaring them.
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const FOUNDER_ID = `${BASE_URL}/about#founder`;

const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Obaloluwa Adeleke',
  url: `${BASE_URL}/about`,
  worksFor: { '@id': ORG_ID },
};

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: ORG,
    description:
      'Creative and digital agency helping businesses look sharper, communicate better, and compete online through AI automation, web design, branding, motion graphics, and digital strategy.',
    url: `${BASE_URL}/`,
    logo: { '@type': 'ImageObject', url: LOGO, width: 700, height: 700 },
    image: OG,
    email: 'hello@acmesmedia.com',
    telephone: '+2348065134373',
    foundingDate: '2016',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    areaServed: ['NG', 'GB', 'CA'],
    serviceType: services.map((s) => s.title),
    knowsAbout: [
      'AI Automation',
      'Brand Identity Design',
      'Logo Design',
      'Web Design',
      'Web Development',
      'Motion Graphics',
      'Digital Strategy',
      'Product Design',
    ],
    sameAs: [
      'https://www.instagram.com/acmesmedia',
      'https://www.behance.net/enochlee2',
    ],
    founder,
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: ORG,
    url: `${BASE_URL}/`,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function webPageSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(url),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

// items: [{ name, path }] — paths are site-relative.
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? absoluteUrl(post.coverImage) : OG,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    url,
    articleSection: post.category,
    author: founder,
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: ORG, logo: { '@type': 'ImageObject', url: LOGO } },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function creativeWorkSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image ? absoluteUrl(project.image) : OG,
    ...(project.year && { dateCreated: project.year }),
    url: `${BASE_URL}/portfolio/${project.id}`,
    keywords: project.tags?.join(', '),
    creator: { '@id': ORG_ID },
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/services#${service.id}`,
    provider: { '@id': ORG_ID },
    areaServed: ['NG', 'GB', 'CA'],
  };
}

export function collectionPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio — Acmes Media',
    description:
      'Selected projects across branding, web design, digital products, content, and visual communication.',
    url: `${BASE_URL}/portfolio`,
    isPartOf: { '@id': WEBSITE_ID },
    creator: { '@id': ORG_ID },
  };
}
