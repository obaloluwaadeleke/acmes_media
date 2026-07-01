const BASE_URL = 'https://acmesmedia.com';
const ORG = 'Acmes Media';
const LOGO = `${BASE_URL}/favicon.svg`;
const OG   = `${BASE_URL}/og-image.jpg`;

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: ORG,
    description:
      'Creative and digital agency helping businesses look sharper, communicate better, and compete online through branding, web design, motion graphics, and digital strategy.',
    url: BASE_URL,
    logo: LOGO,
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
    serviceType: [
      'Brand Identity Design',
      'Web Design & Development',
      'Motion Graphics',
      'Corporate Design',
      'Product Design',
      'Printing Solutions',
    ],
    knowsAbout: [
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
    founder: {
      '@type': 'Person',
      name: 'Obaloluwa Adeleke',
      url: `${BASE_URL}/about`,
    },
  };
}

export function webPageSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: { '@type': 'WebSite', name: ORG, url: BASE_URL },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || OG,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: ORG, url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: ORG,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  };
}

export function creativeWorkSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image || OG,
    dateCreated: project.year,
    url: `${BASE_URL}/portfolio/${project.id}`,
    keywords: project.tags?.join(', '),
    creator: { '@type': 'Organization', name: ORG, url: BASE_URL },
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/services#${service.id}`,
    provider: { '@type': 'ProfessionalService', name: ORG, url: BASE_URL },
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
    creator: { '@type': 'Organization', name: ORG, url: BASE_URL },
  };
}
