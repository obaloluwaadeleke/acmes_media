import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from '@/lib/motion-tokens';
import useIsDesktop from '@/hooks/useIsDesktop';
import { ArrowUpRight, Check, Globe, Mail, MessageCircle, Search, Send, Sparkles } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';
import LogoComponent from '@/components/ui/LogoComponent';
import TravellingRing from '@/components/ui/TravellingRing';
import Testimonials from '@/components/home/Testimonials';
import { projects } from '@/data/projects';
import { stats } from '@/data/stats';
import { testimonials } from '@/data/testimonials';
import { track, getAttribution } from '@/lib/track';
import {
  slots, packages, reasons, process, faqs, work, painPoints, included, includedLine, emailAddOn,
  packageOptions, heardOptions, whatsappLink, REPLY_TIME,
} from '@/data/sales';

const UTM = 'utm_source=sales&utm_medium=landing&utm_campaign=web-slots';
// Two figures from src/data/stats.js plus a delivery promise stated on this page.
const proofStats = [
  ...['projects', 'experience'].map((id) => stats.find((s) => s.id === id)).filter(Boolean),
  { id: 'starter-delivery', value: 14, suffix: ' days', label: 'Web Starter delivery' },
];

// The testimonial about a website build leads; the rest are brand-identity work.
const salesTestimonials = [
  ...testimonials.filter((t) => t.company === 'GraceApp'),
  ...testimonials.filter((t) => t.company !== 'GraceApp'),
];

const onCta = (location, extra) => () => track('cta_click', { location, ...extra });
const onWhatsApp = (location) => () => track('whatsapp_click', { location });

const remaining = Math.max(slots.total - slots.taken, 0);
const isClosed = remaining === 0;

const waGeneral = whatsappLink('Hi Acmes Media, I saw your website offer and I’d like to book a slot.');
const waWaitlist = whatsappLink('Hi Acmes Media, the website offer is full. Please add me to the waiting list.');

export default function Sales() {
  useEffect(() => {
    track('sales_view', { slots_open: remaining });
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Seo
        title="Get a Professional Website From ₦200,000 | Acmes Media"
        description="Custom websites for Nigerian businesses. Domain, hosting, SEO and GEO included in every package. Web Starter sites go live in 14 days. Only 10 project slots open."
        path="/sales"
        image="/og-sales.jpg"
        noindex
      />

      <SalesHeader />

      <main id="main-content">
        <Hero />
        <ProofStats />
        <Problem />
        <Included />
        <Packages />
        <Process />
        <BookingForm />
        <Reasons />
        <Work />
        <Testimonials items={salesTestimonials} />
        <Faq />
      </main>

      <SalesFooter />
      <FloatingWhatsApp />
    </div>
  );
}

/* ── Header: logo + one CTA, no main-site nav ─────────────────────────────── */
function SalesHeader() {
  return (
    <header className="sticky top-0 z-40 bg-bg md:bg-bg/80 md:backdrop-blur border-b border-border">
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        <div className="h-8 md:h-10">
          <LogoComponent />
        </div>
        <a href="#book" onClick={onCta('header')} className="btn-primary cta-live !py-2.5 !px-5 text-sm">
          <TravellingRing />
          {isClosed ? 'Join waiting list' : 'Book a slot'}
        </a>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="section-pad relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="hidden md:block">
        <AmbientGlow />
      </div>
      <div className="container-site relative z-10">
        <HeroReveal delay={0}>
          <span className="label-tag mb-5 block">
            {isClosed ? 'Offer closed' : `${remaining} website slots open`}
          </span>
        </HeroReveal>

        <h1 className="heading-display max-w-5xl mb-6">
          <HeroReveal as="span" text="Your Instagram can be taken down. " delay={0} />
          <HeroReveal as="span" text="Your website cannot." delay={0.4} wordClassName="text-accent" />
        </h1>

        <HeroReveal delay={0.5}>
          <p className="body-lg max-w-2xl mb-8">
            Acmes Media builds custom websites for Nigerian businesses. Domain, hosting and SEO + GEO setup come included
            in every package, and Web Starter sites go live in 14 days, from ₦200,000.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.6} className="py-10 -my-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="#book" onClick={onCta('hero')} className="btn-primary cta-live justify-center">
              <TravellingRing />
              {isClosed ? 'Join the waiting list' : 'Book my slot'}
              <Send size={15} aria-hidden="true" />
            </a>
            <a href={waGeneral} onClick={onWhatsApp('hero')} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center">
              <MessageCircle size={15} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </HeroReveal>

        <SlotMeter />
        {!isClosed && (
          <p className="text-ink-muted text-xs mt-4">Pay nothing to inquire.</p>
        )}
      </div>
    </section>
  );
}

function SlotMeter() {
  const shouldReduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  return (
    <div className="inline-flex flex-col gap-2" role="status" aria-live="polite">
      {/* Dots fill in left to right, then open slots breathe */}
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: slots.total }).map((_, i) => {
          const open = i >= slots.taken;
          return (
            <motion.span
              key={i}
              className="h-2 w-6 sm:w-8"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: motionTokens.ease.out, delay: 0.9 + i * 0.09 }}
            >
              <motion.span
                className={`block h-full w-full rounded-full ${open ? 'bg-accent' : 'bg-border'}`}
                animate={open && !shouldReduce && isDesktop ? { opacity: [1, 0.4, 1] } : undefined}
                transition={{ duration: 2.4, repeat: Infinity, ease: motionTokens.ease.inOut, delay: 2.2 + i * 0.15 }}
              />
            </motion.span>
          );
        })}
      </div>
      <p className="text-ink-muted text-sm">
        {isClosed
          ? `All ${slots.total} slots are filled and this offer is closed.`
          : `${remaining} of ${slots.total} slots open. When they’re filled, this offer closes.`}
      </p>
    </div>
  );
}

/* ── Proof numbers ───────────────────────────────── */
function ProofStats() {
  return (
    <section className="bg-bg-surface border-b border-border" aria-label="Acmes Media in numbers">
      <div className="container-site py-10 grid grid-cols-3 gap-4 text-center">
        {proofStats.map((s) => (
          <div key={s.id}>
            <p className="font-serif text-3xl md:text-5xl text-accent">{s.value}{s.suffix}</p>
            <p className="text-ink-muted text-xs md:text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Problem: loss framing ────────────────────────────────────────────────── */
function Problem() {
  return (
    <section className="section-pad bg-bg" aria-labelledby="problem-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">Why a website</span>
          <h2 id="problem-heading" className="heading-xl mb-12 max-w-3xl">
            A page you rent can <em className="text-accent not-italic">disappear overnight.</em>
          </h2>
        </RevealWrapper>
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((p, i) => (
            <RevealWrapper key={p.title} delay={i * 0.08}>
              <div className="card-surface p-6 h-full">
                <h3 className="font-serif text-xl text-ink mb-2">{p.title}</h3>
                <p className="text-ink-muted text-sm">{p.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Work: outbound links open in a new tab so the funnel stays open ──────── */
function Work() {
  return (
    <section className="section-pad bg-bg" aria-labelledby="work-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">Recent work</span>
          <h2 id="work-heading" className="heading-xl mb-4">
            Open our work <em className="text-accent not-italic">before you book.</em>
          </h2>
          <p className="body-lg max-w-2xl mb-12">
            Real projects from Acmes Media. Click any card to see how it works.
          </p>
        </RevealWrapper>

        <div className="grid md:grid-cols-3 gap-6">
          {work.map((w, i) => {
            const project = w.projectId ? projects.find((p) => p.id === w.projectId) : null;
            const title = project?.title ?? w.title;
            const href = project ? `/portfolio/${project.id}?${UTM}` : `${w.href}?${UTM}`;
            const image = project?.image ?? w.image;
            return (
              <RevealWrapper key={title} delay={i * 0.08}>
                <a
                  href={href}
                  onClick={() => track('work_click', { project: title })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-surface block overflow-hidden group h-full"
                >
                  <div className="h-56 md:h-64 overflow-hidden bg-bg">
                    <img
                      src={image}
                      alt={`${title} preview`}
                      width="1200"
                      height="630"
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="label-tag mb-2">{w.label} · {w.status}</p>
                    <h3 className="font-serif text-xl text-ink mb-2 flex items-center gap-2">
                      {title}
                      <ArrowUpRight size={16} className="text-accent" aria-hidden="true" />
                    </h3>
                    <p className="text-ink-muted text-sm">{w.summary}</p>
                  </div>
                </a>
              </RevealWrapper>
            );
          })}
        </div>

        <RevealWrapper delay={0.2}>
          <div className="mt-10 flex items-center justify-center">
            <a href={`/portfolio?${UTM}`} target="_blank" rel="noopener noreferrer" className="btn-text">
              See the full Acmes Media portfolio
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

/* ── Included in every package ────────────────────────────────────────────── */
const includedIcons = [Globe, Search, Sparkles];

function Included() {
  return (
    <section className="section-pad bg-bg-surface border-y border-border" aria-labelledby="included-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">Included in every package</span>
          <h2 id="included-heading" className="heading-xl mb-4 max-w-3xl">
            Everything you need to <em className="text-accent not-italic">go live and be found.</em>
          </h2>
          <p className="body-lg max-w-2xl mb-12">
            Web Starter, Web Pro and Web Elite all include these three.
          </p>
        </RevealWrapper>

        <div className="grid md:grid-cols-3 gap-6">
          {included.map((item, i) => {
            const Icon = includedIcons[i];
            return (
              <RevealWrapper key={item.title} delay={i * 0.08}>
                <div className="card-surface p-6 h-full">
                  <div className="w-11 h-11 rounded-full border border-accent/40 text-accent flex items-center justify-center mb-5">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-muted text-sm">{item.body}</p>
                </div>
              </RevealWrapper>
            );
          })}
        </div>

        <RevealWrapper delay={0.25}>
          <div className="mt-6 rounded-2xl border border-dashed border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-11 h-11 rounded-full border border-border text-ink-muted flex items-center justify-center shrink-0">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="label-tag mb-1">Optional add-on</p>
              <h3 className="font-serif text-lg text-ink mb-1">{emailAddOn.title}</h3>
              <p className="text-ink-muted text-sm">{emailAddOn.body}</p>
            </div>
            <span className="rounded-full border border-border px-4 py-1.5 text-xs text-ink-muted shrink-0">Separate fee</span>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

/* ── Packages ─────────────────────────────────────────────────────────────── */
function Packages() {
  return (
    <section className="section-pad bg-bg" aria-labelledby="packages-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">What we build</span>
          <h2 id="packages-heading" className="heading-xl mb-4">
            Pick the package that <em className="text-accent not-italic">fits where you are.</em>
          </h2>
          <p className="body-lg max-w-2xl mb-12">
            Every site is designed and built from scratch on your brand. Domain, hosting, SEO and GEO are included in every package.
          </p>
        </RevealWrapper>

        <div className="grid lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <RevealWrapper key={pkg.id} delay={i * 0.08}>
              <div className={`card-surface p-8 h-full flex flex-col ${pkg.featured ? 'border-accent' : ''}`}>
                <p className="label-tag mb-3">{pkg.tier}</p>
                <h3 className="font-serif text-2xl text-ink mb-3">{pkg.name}</h3>
                <p className="text-ink-muted text-sm mb-6">{pkg.blurb}</p>
                <p className="font-serif text-4xl text-accent mb-1">{pkg.price}</p>
                <p className="text-ink text-xs mb-1">{pkg.deposit}</p>
                <p className="text-ink-muted text-xs mb-4">{pkg.terms}</p>
                <p className="flex items-start gap-2 text-xs text-accent mb-6">
                  <Check size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {includedLine}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#book" onClick={onCta('package', { package: pkg.id })} className={`${pkg.featured ? 'btn-primary' : 'btn-ghost'} justify-center`}>
                  {isClosed ? 'Join waiting list' : `Book ${pkg.name}`}
                </a>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper delay={0.2}>
          <div className="text-ink-muted text-sm text-center mt-8 space-y-2">
            <p>You pay 70% to begin and 30% on launch day. You approve a full mockup in week 1, before we build.</p>
            <p>Official email setup is optional and billed separately.</p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

/* ── Why Acmes Media ────────────────────────────────────────────────────────────── */
function Reasons() {
  return (
    <section className="section-pad bg-bg-surface border-y border-border" aria-labelledby="why-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">Why Acmes Media</span>
          <h2 id="why-heading" className="heading-xl mb-12">
            Why businesses <em className="text-accent not-italic">choose Acmes Media.</em>
          </h2>
        </RevealWrapper>
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <RevealWrapper key={r.title} delay={i * 0.06}>
              <div className="card-surface p-6 h-full">
                <p className="font-serif text-accent text-lg mb-2" aria-hidden="true">0{i + 1}</p>
                <h3 className="font-serif text-xl text-ink mb-2">{r.title}</h3>
                <p className="text-ink-muted text-sm">{r.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────────────────────────── */
function Process() {
  return (
    <section className="section-pad bg-bg-surface border-y border-border" aria-labelledby="process-heading">
      <div className="container-site">
        <RevealWrapper>
          <span className="label-tag mb-4 block">How it works</span>
          <h2 id="process-heading" className="heading-xl mb-12">
            From inquiry to launch <em className="text-accent not-italic">in three steps.</em>
          </h2>
        </RevealWrapper>
        <ol className="grid md:grid-cols-3 gap-6">
          {process.map((s, i) => (
            <RevealWrapper as="li" key={s.step} delay={i * 0.08} className="list-none">
              <div className="card-surface p-6 h-full">
                <p className="font-serif text-4xl text-accent/40 mb-3" aria-hidden="true">{s.step}</p>
                <h3 className="font-serif text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-ink-muted text-sm">{s.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Booking form ─────────────────────────────────────────────────────────── */
const emptyForm = { name: '', phone: '', email: '', package: '', message: '', heard_from: '' };

const naira = (n) => `₦${n.toLocaleString('en-NG')}`;
// Optional Make.com webhook (set VITE_MAKE_WEBHOOK_URL). Drives the automated email.
const MAKE_WEBHOOK = import.meta.env.VITE_MAKE_WEBHOOK_URL;

// Everything the automation needs to write a personalised email, so the Make
// scenario can template these fields without keeping its own price table.
function buildPayload(form) {
  const pkg = packages.find((p) => form.package.startsWith(p.name));
  const hasPrice = Boolean(pkg?.priceNgn);
  return {
    _subject: 'Sales page inquiry',
    source: 'sales-page',
    ...getAttribution(),
    ...form,
    email: form.email.trim(),
    package_id: pkg?.id ?? 'unsure',
    package_name: pkg?.name ?? 'Not sure yet',
    price: hasPrice ? naira(pkg.priceNgn) : 'Custom, agreed on the call',
    deposit: hasPrice ? naira(pkg.depositNgn) : 'Agreed on the call',
    balance: hasPrice ? naira(pkg.balanceNgn) : 'Agreed on the call',
    payment_plan: hasPrice
      ? `70% (${naira(pkg.depositNgn)}) to begin, 30% (${naira(pkg.balanceNgn)}) on launch day`
      : 'Milestone payments agreed on the scoping call',
    delivery: pkg?.delivery ?? 'Agreed on the call',
    features: pkg ? pkg.features.join('; ') : '',
    included: included.map((i) => i.title).join(', '),
    packages_overview: packages
      .map((p) => `${p.name} ${p.price} (${p.delivery.toLowerCase()})`)
      .join(' | '),
    reply_time: REPLY_TIME,
    submitted_at: new Date().toISOString(),
  };
}

function BookingForm() {
  const [form, setForm] = useState(emptyForm);
  const [gotcha, setGotcha] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const started = useRef(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => { const n = { ...er }; delete n[name]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^\+?[\d\s-]{10,16}$/.test(form.phone.trim())) e.phone = 'Enter a valid WhatsApp number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.package) e.package = 'Choose a package.';
    if (!form.message.trim()) e.message = 'Tell us what your business does.';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); track('form_invalid', { fields: Object.keys(errs).join(',') }); return; }

    setStatus('sending');
    const payload = buildPayload(form);
    try {
      const res = await fetch('https://formspree.io/f/xojrgrlr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _gotcha: gotcha }),
      });
      if (res.ok) {
        // Fire-and-forget: the Make scenario sends the confirmation email.
        if (MAKE_WEBHOOK && !gotcha) {
          fetch(MAKE_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {});
        }
        setStatus('success');
        track('form_submit', { package: form.package });
        setForm(emptyForm);
      }
      else { setStatus('error'); track('form_error', { status: res.status }); }
    } catch { setStatus('error'); track('form_error', { status: 'network' }); }
  };

  return (
    <section id={isClosed ? 'book' : undefined} className="section-pad bg-bg border-t border-border" aria-labelledby="book-heading">
      <div className="container-site">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <RevealWrapper>
              <span className="label-tag mb-4 block">Get started</span>
              <h2 id="book-heading" className="heading-xl mb-6">
                {isClosed ? 'All slots are filled.' : <>Ready? <em className="text-accent not-italic">Claim your slot.</em></>}
              </h2>
              <p className="body-lg mb-8">
                {isClosed
                  ? 'This offer is closed. Message us on WhatsApp and we will add you to the waiting list.'
                  : `Tell us about your business. We reply on WhatsApp ${REPLY_TIME} to book your scoping call.`}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Domain, hosting, SEO and GEO included',
                  'Clear pricing before you commit',
                  'Pay nothing to inquire',
                  `${remaining} of ${slots.total} slots open`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <Check size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {isClosed && (
                <a
                  href={waWaitlist}
                  onClick={onWhatsApp('form_side')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Join the waiting list
                </a>
              )}
            </RevealWrapper>
          </div>

          {!isClosed && (
            <div id="book" className="lg:col-span-3">
              <RevealWrapper delay={0.1}>
                {status === 'success' ? (
                  <div role="status" aria-live="polite" className="card-surface p-8 md:p-10 text-center">
                    <div className="w-12 h-12 rounded-full border border-accent text-accent flex items-center justify-center mx-auto mb-5">
                      <Check size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-2xl text-ink mb-3">You’re in the queue.</h3>
                    <p className="text-ink-muted text-sm mb-6">
                      {MAKE_WEBHOOK
                        ? 'Check your email for your package details and payment steps. We will also message you on WhatsApp '
                        : 'We have your details. We will message you on WhatsApp '}
                      {REPLY_TIME} to book your scoping call.
                    </p>
                    <a href={waGeneral} onClick={onWhatsApp('form_success')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <MessageCircle size={15} aria-hidden="true" />
                      Message us now
                    </a>
                  </div>
                ) : (
                  <form
                    onSubmit={onSubmit}
                    onFocus={() => { if (!started.current) { started.current = true; track('form_start'); } }}
                    noValidate
                    aria-label="Website inquiry form"
                    className="card-surface p-6 md:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-serif text-2xl text-ink">Book your slot</h3>
                      <span className="text-accent text-sm shrink-0">{remaining} of {slots.total} open</span>
                    </div>
                    <p className="text-ink-muted text-xs mb-6">Takes 1 minute. We use your details only to reply about this project.</p>

                    {/* Honeypot — hidden from humans, dropped by Formspree when filled. */}
                    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] w-px h-px overflow-hidden" style={{ opacity: 0 }}>
                      <label htmlFor="_gotcha">Leave this field empty</label>
                      <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Your name" id="name" name="name" value={form.name} onChange={onChange} error={errors.name} required autoComplete="name" />
                      <Field label="WhatsApp number" id="phone" name="phone" type="tel" placeholder="+234…" value={form.phone} onChange={onChange} error={errors.phone} required autoComplete="tel" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <Field label="Email address" id="email" name="email" type="email" placeholder="you@business.com" value={form.email} onChange={onChange} error={errors.email} required autoComplete="email" />
                      <SelectField label="Package interest" id="package" name="package" value={form.package} onChange={onChange} options={packageOptions} error={errors.package} required />
                    </div>
                    <div className="mb-6">
                      <Field label="What does your business do?" id="message" name="message" placeholder="e.g. Bridal makeup studio in Lekki" value={form.message} onChange={onChange} error={errors.message} required />
                    </div>
                    <div className="mb-6">
                      <SelectField label="How did you hear about us? (optional)" id="heard_from" name="heard_from" value={form.heard_from} onChange={onChange} options={heardOptions} />
                    </div>

                    {status === 'error' && (
                      <div role="alert" className="mb-4 p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-400 text-sm">
                        Your message did not send. Please message us on WhatsApp instead.
                      </div>
                    )}

                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === 'sending' ? 'Sending…' : 'Book my slot'}
                      <Send size={15} aria-hidden="true" />
                    </button>
                  </form>
                )}
              </RevealWrapper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls = (error) =>
  `w-full bg-bg border rounded-xl px-4 py-3 text-ink text-base placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors duration-200 ${error ? 'border-red-500' : 'border-border'}`;

function Field({ label, id, name, type = 'text', value, onChange, error, required, placeholder, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="text-ink text-sm font-medium mb-1.5 block">
        {label}
        {required && <span aria-hidden="true" className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputCls(error)}
      />
      {error && <p id={`${id}-error`} className="text-red-400 text-xs mt-1" aria-live="polite">{error}</p>}
    </div>
  );
}

function SelectField({ label, id, name, value, onChange, options, error, required }) {
  return (
    <div>
      <label htmlFor={id} className="text-ink text-sm font-medium mb-1.5 block">
        {label}
        {required && <span aria-hidden="true" className="text-accent ml-1">*</span>}
      </label>
      <select
        id={id} name={name} value={value} onChange={onChange}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputCls(error)}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p id={`${id}-error`} className="text-red-400 text-xs mt-1" aria-live="polite">{error}</p>}
    </div>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
function Faq() {
  return (
    <section className="section-pad bg-bg border-t border-border" aria-labelledby="faq-heading">
      <div className="container-site max-w-3xl">
        <RevealWrapper>
          <span className="label-tag mb-4 block">Common questions</span>
          <h2 id="faq-heading" className="heading-xl mb-10">
            Questions <em className="text-accent not-italic">before you book.</em>
          </h2>
        </RevealWrapper>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-ink font-medium">
                {f.q}
                <span className="text-accent text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="text-ink-muted text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer + floating WhatsApp ───────────────────────────────────────────── */
function SalesFooter() {
  return (
    <footer className="bg-bg border-t border-border py-10 pb-24 md:pb-10">
      <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>© {new Date().getFullYear()} Acmes Media. Web design and brand identity.</p>
        <div className="flex gap-6">
          <a href={`/about?${UTM}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">About Acmes Media</a>
          <a href={`/portfolio?${UTM}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Portfolio</a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={isClosed ? waWaitlist : waGeneral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Acmes Media on WhatsApp"
      onClick={onWhatsApp('floating')}
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" aria-hidden="true" />
      <MessageCircle size={24} className="relative" aria-hidden="true" />
    </a>
  );
}
