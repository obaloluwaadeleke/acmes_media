// Content + config for the unlisted /sales landing page.
// Edit slot counts, prices and copy here, not in the JSX.

// When `taken` reaches `total`, the page flips to its closed state
// (form hidden, waitlist via WhatsApp). Bump `taken` as slots are confirmed.
export const slots = { total: 10, taken: 0 };

export const WHATSAPP_NUMBER = '2348065134373';
export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Reply-time promise. Matches the 24-hour commitment on the Contact page.
export const REPLY_TIME = 'within 24 hours';

// Included in every package. Used by the homepage banner and the /sales page.
export const included = [
  {
    title: 'Domain + hosting',
    body: 'We register your domain in your name, host your site on Vercel and deploy it. Both are included for your first year.',
  },
  {
    title: 'SEO integration',
    body: 'Page titles, descriptions, a sitemap and fast mobile pages, so Google can find and understand your site.',
  },
  {
    title: 'GEO integration',
    body: 'Structured data and clearly written content, so AI assistants like ChatGPT, Gemini and Perplexity can read and describe your business.',
  },
];
export const includedLine = 'Domain, hosting, SEO and GEO included';

export const emailAddOn = {
  title: 'Official email setup',
  body: 'Get an address like you@yourbusiness.com. This is optional and billed as a separate fee.',
};

export const AUTOMATION_PORTFOLIO_URL = 'https://obaloluwa-automates.vercel.app/';

export const painPoints = [
  {
    title: 'Your followers belong to the platform',
    body: 'Accounts get suspended and reach changes without warning. Your website stays exactly where you left it.',
  },
  {
    title: 'Customers search before they message',
    body: 'People Google a business before they trust it. A fast site on their phone answers the first question for you.',
  },
  {
    title: 'Referrals need somewhere to land',
    body: 'When a customer sends your name to a friend, a link to your website carries more weight than a screenshot of your page.',
  },
];

// Proof cards. `projectId` pulls the image and case-study link from
// src/data/projects.js; entries with `flow` render as a workflow diagram and
// link to the automation portfolio. `status` mirrors the labels used there.
export const work = [
  {
    projectId: 'webq-solutions',
    label: 'Brand identity + WordPress website',
    status: 'Case study',
    summary:
      'A full logo system and a lead-focused WordPress website for a digital solutions company. Bounce rate dropped from 74% to 36% after launch.',
  },
  {
    projectId: 'expense-iq',
    label: 'AI expense app',
    status: 'Live',
    summary:
      'An expense system for Naira spending. Staff file a claim in minutes, AI checks it, and managers approve from one dashboard.',
  },
  {
    title: 'Automation Portfolio',
    label: 'Make · n8n · AI workflows',
    status: 'Case studies',
    summary:
      'Workflows that file documents with AI, capture and route leads into Airtable, and run approval queues. Each one validates its input and alerts someone when a step fails.',
    image: '/images/projects/automation-portfolio.jpg',
    href: AUTOMATION_PORTFOLIO_URL,
  },
];

export const packages = [
  {
    id: 'starter',
    tier: 'Starter',
    name: 'Web Starter',
    blurb: 'Your first real web presence, built clean and fast around your brand.',
    price: '₦250k',
    priceNgn: 250000,
    depositNgn: 175000,
    balanceNgn: 75000,
    delivery: '2 weeks',
    deposit: 'Deposit to start: ₦175,000',
    terms: 'One-time payment. Live in 2 weeks.',
    features: [
      'Up to 5 pages',
      'Mobile-responsive design',
      'Contact form + WhatsApp button',
      '2 revision rounds',
    ],
  },
  {
    id: 'pro',
    tier: 'Most popular',
    name: 'Web Pro',
    blurb: 'For businesses that need to look established at first glance. Up to 8 pages on a design system built around your brand.',
    price: '₦550k',
    priceNgn: 550000,
    depositNgn: 385000,
    balanceNgn: 165000,
    delivery: '3 weeks',
    deposit: 'Deposit to start: ₦385,000',
    terms: 'One-time payment. Live in 3 weeks.',
    featured: true,
    features: [
      'Up to 8 pages',
      'Custom UI design system',
      'Blog or portfolio section',
      'Sitemap + analytics integration',
      '3 revision rounds',
    ],
  },
  {
    id: 'elite',
    tier: 'Full stack',
    name: 'Web Elite',
    blurb: 'Brand identity and website in one engagement, with the systems that run with it when you need them.',
    price: '₦1.2M+',
    priceNgn: 1200000,
    open: true,
    delivery: 'Scoped on the call',
    deposit: 'Payments agreed on the call',
    terms: 'Custom scope, milestone payments.',
    features: [
      'Full brand identity system',
      'Custom web design + build',
      'Content strategy',
      'Priority support: 1 hour a month for 6 months',
    ],
    // Names only on the page. Prices live in docs/pricing-and-terms.md.
    addons: [
      'E-commerce ready',
      'Chatbot integration',
      'Automated booking system',
      'Custom CRM + leads automation',
    ],
  },
];

// "Systems that run with your website". Optional add-ons, names and benefits only.
// Prices stay out of the page (see docs/pricing-and-terms.md).
export const systems = [
  {
    title: 'AI chatbot',
    body: 'Answers common customer questions on your site at any hour, using what your business actually offers, and hands real enquiries to you.',
  },
  {
    title: 'Automated booking',
    body: 'Customers choose a time and book themselves. Confirmations go out automatically, so nobody has to message back and forth.',
  },
  {
    title: 'CRM + leads automation',
    body: 'Every enquiry lands in one place, tagged by service, and the right follow-up starts without anyone chasing it.',
  },
  {
    title: 'Online store',
    body: 'Add product pages and online payments when you are ready to sell, on a site that is already built for it.',
  },
];

// One example of the systems working together, shown as a short flow.
export const systemsFlow = [
  'A customer asks a question',
  'The chatbot answers',
  'They book a time',
  'The lead lands in your CRM',
];

export const reasons = [
  {
    title: 'You own your domain and code',
    body: 'Your domain is registered in your name and the code is yours. If we ever part ways, you can take both and host your site anywhere.',
  },
  {
    title: 'Fast on Nigerian networks',
    body: 'We design for the phones and data speeds your customers use, so pages open quickly where they are.',
  },
  {
    title: 'Designed around your brand',
    body: 'Every site starts with a design brief. Your colours, voice and customers decide the layout.',
  },
  {
    title: 'Built by hand',
    body: 'We design and build every page ourselves, with no Wix and no drag-and-drop builders.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Send your details',
    body: `Fill in the form or message us on WhatsApp. We reply ${REPLY_TIME} to book your scoping call.`,
  },
  {
    step: '02',
    title: 'Week 1: brief and design',
    body: 'We write the design brief, wireframe your pages and design a full mockup. You approve it before we build. The 70% deposit starts this week.',
  },
  {
    step: '03',
    title: 'Week 2: build and launch',
    body: 'You send your content, we build and test, and your site goes live. The remaining 30% is due on launch day.',
  },
];

export const faqs = [
  {
    q: 'Are domain and hosting included?',
    a: 'Yes, for your first year. We register your domain in your name, host your site on Vercel and deploy it. After the first year you pay the domain and hosting renewals, and we remind you 30 days before each one is due. If you already own a domain, we use it.',
  },
  {
    q: 'What do SEO and GEO integration include?',
    a: 'SEO covers page titles, descriptions, a sitemap and fast mobile pages, so Google can find and understand your site. GEO adds structured data and clearly written content, so AI assistants such as ChatGPT, Gemini and Perplexity can read and describe your business. Neither one guarantees a ranking or a mention.',
  },
  {
    q: 'Is official email included?',
    a: 'No. Official email setup (you@yourbusiness.com) is optional and billed as a separate fee. Ask us about it when you inquire.',
  },
  {
    q: 'How long does it take?',
    a: 'Web Starter goes live in 14 days. In week 1 you get the design brief, wireframes and a full mockup to approve. In week 2 we build, you send content, and we test and launch. Web Pro takes 3 weeks, and Web Elite is scoped on the call.',
  },
  {
    q: 'What do I need to send you?',
    a: 'Your logo (or we design one), the photos you want on the site, your list of services or products, and a clear idea of what the site should do for you. After you book, we send a simple checklist.',
  },
  {
    q: 'Can I edit the site myself after launch?',
    a: 'Yes. You can change text and images without a developer. For bigger changes and technical maintenance after launch, we bill by the hour.',
  },
  {
    q: 'How do payments work?',
    a: 'You pay 70% to begin and 30% on launch day. Web Elite uses milestone payments that we agree on the scoping call.',
  },
  {
    q: 'Can you connect my site to WhatsApp, Airtable or AI tools?',
    a: 'Yes. Chatbots, automated booking systems and CRM and lead automations are optional add-ons, usually part of a Web Elite project. Tell us what you need on the scoping call and we will scope and quote it.',
  },
  {
    q: 'Can you run these systems for us after they are built?',
    a: 'Yes. Acmes Media can manage your booking system, CRM or AI chatbot for you as an ongoing service, so you do not need your own technical person. We agree the scope and the cost with you first.',
  },
  {
    q: 'Why only 10 slots?',
    a: 'We design and build every site by hand, so we limit how many projects run at once. When the 10 slots are filled, this offer closes.',
  },
];

// Optional "How did you hear about us?" answers. Covers WhatsApp, DMs and anything
// the automatic source detection in src/lib/track.js cannot see.
export const heardOptions = [
  'Instagram',
  'WhatsApp',
  'Facebook',
  'X (Twitter)',
  'LinkedIn',
  'TikTok',
  'Google search',
  'A friend or referral',
  'Flyer or ad',
  'Other',
];

export const packageOptions = [
  'Web Starter (₦250k)',
  'Web Pro (₦550k)',
  'Web Elite (₦1.2M+)',
  'Not sure yet',
];

