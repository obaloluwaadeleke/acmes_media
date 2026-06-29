import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Layers, Play, Briefcase, Printer, PenTool, ArrowRight, Plus, Check } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';
import { services } from '@/data/services';

// ── Per-service visual config ─────────────────────────────────────────────────
const meta = [
  { Icon: Monitor,   accent: '#3B82F6', tag: 'Digital'   },
  { Icon: Layers,    accent: '#F59E0B', tag: 'Creative'  },
  { Icon: Play,      accent: '#06B6D4', tag: 'Motion'    },
  { Icon: Briefcase, accent: '#8B5CF6', tag: 'Corporate' },
  { Icon: PenTool,   accent: '#10B981', tag: 'Product'   },
  { Icon: Printer,   accent: '#D97706', tag: 'Print'     },
];

// ── Service row ───────────────────────────────────────────────────────────────
function ServiceRow({ service, m, index }) {
  const [hovered, setHovered]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { Icon, accent, tag } = m;

  const onPointerEnter = (e) => { if (e.pointerType === 'mouse') setHovered(true);  };
  const onPointerLeave = (e) => { if (e.pointerType === 'mouse') setHovered(false); };
  const toggle    = () => setExpanded((v) => !v);
  const handleKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } };
  const isActive  = hovered || expanded;

  return (
    <motion.div
      className="relative border-b border-border overflow-hidden"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      {/* Left accent bar — grows in on hover / expand */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
        style={{ background: accent }}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {/* Subtle surface tint */}
      <motion.div
        className="absolute inset-0 bg-bg-surface pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* ── Row trigger — native <button> ───────────────────────────────── */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`sd-${service.id}`}
        onClick={toggle}
        onKeyDown={handleKey}
        className="container-site relative z-10 flex items-center gap-6 lg:gap-10 py-8 lg:py-12 w-full text-left cursor-pointer select-none"
      >
        {/* Index number */}
        <motion.span
          className="font-mono text-[0.7rem] tracking-widest shrink-0 w-8 hidden sm:block"
          animate={{ color: isActive ? '#C8A96E' : '#555555' }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          {service.number}
        </motion.span>

        {/* Service icon — functional visual identifier for each service */}
        <motion.div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border hidden sm:flex"
          animate={{
            borderColor: isActive ? `${accent}60` : '#2e2e2e',
            background:  isActive ? `${accent}12` : 'transparent',
          }}
          transition={{ duration: 0.25 }}
        >
          <Icon size={20} style={{ color: isActive ? accent : '#666666' }} aria-hidden="true" />
        </motion.div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <motion.span
            className="inline-block font-sans text-xs tracking-[0.15em] uppercase mb-2 font-medium"
            animate={{ color: isActive ? '#C8A96E' : '#9A9A9A' }}
            transition={{ duration: 0.2 }}
          >
            {tag}
          </motion.span>

          <motion.h2
            className="font-serif leading-[1.05] tracking-tight text-[clamp(2rem,4vw,4.5rem)]"
            animate={{ color: isActive ? '#C8A96E' : '#F2F2F2' }}
            transition={{ duration: 0.2 }}
          >
            {service.title}
          </motion.h2>

          <p className="text-ink-muted text-sm leading-relaxed mt-2 line-clamp-1">
            {service.description}
          </p>
        </div>

        {/* Expand toggle — Plus rotates 45° into an X */}
        <motion.div
          className="shrink-0 w-12 h-12 rounded-full border flex items-center justify-center"
          animate={{ borderColor: isActive ? '#C8A96E' : '#2e2e2e' }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="flex items-center justify-center"
            animate={{ rotate: expanded ? 45 : 0, color: isActive ? '#C8A96E' : '#666666' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Plus size={18} aria-hidden="true" />
          </motion.span>
        </motion.div>
      </button>

      {/* ── Expanded detail panel ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`sd-${service.id}`}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden relative z-10 bg-bg-surface"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" aria-hidden="true" />

            <div className="container-site py-10 lg:py-14">
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 pl-0 sm:pl-14">

                {/* Left: overview + process */}
                <div>
                  <p className="body-md mb-10">{service.description}</p>

                  <h3 className="label-tag mb-4 block">Our process</h3>
                  <ol className="space-y-3">
                    {service.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          className="font-mono text-[0.65rem] tracking-widest mt-1 shrink-0 w-5 text-right"
                          style={{ color: accent }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-ink-muted text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Right: icon + deliverables + CTA */}
                <div className="flex flex-col">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border"
                    style={{ background: `${accent}15`, borderColor: `${accent}30` }}
                  >
                    <Icon size={28} style={{ color: accent }} aria-hidden="true" />
                  </div>

                  <h3 className="label-tag mb-4 block">What you receive</h3>
                  <ul className="space-y-3 mb-8 flex-1">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={13} className="mt-0.5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                        <span className="text-ink-muted text-sm leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn-primary self-start">
                    Start this project <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Acmes Media</title>
        <meta name="description" content="Web design, branding, motion graphics, product design, corporate design, and print. Six focused services from one creative and digital agency." />
        <link rel="canonical" href="https://acmesmedia.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acmesmedia.com/services" />
        <meta property="og:title" content="Services — Acmes Media" />
        <meta property="og:description" content="Web design, branding, motion graphics, product design, corporate design, and print. Six focused services from one creative and digital agency." />
        <meta property="og:image" content="https://acmesmedia.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services — Acmes Media" />
        <meta name="twitter:description" content="Six focused creative and digital services from Acmes Media." />
        <meta name="twitter:image" content="https://acmesmedia.com/og-image.jpg" />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="min-h-[65vh] flex items-center bg-bg border-b border-border relative overflow-hidden py-32 lg:py-40">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
        <AmbientGlow />

        <div className="container-site relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div>
              <HeroReveal delay={0}>
                <span className="label-tag mb-6 block">Our services</span>
              </HeroReveal>
              <h1 className="heading-display mb-8">
                <HeroReveal as="span" text="Six services." delay={0} />
                <HeroReveal as="span" text="One partner." delay={0.24} wordClassName="text-accent" />
              </h1>
              <HeroReveal delay={0.42}>
                <p className="body-lg max-w-lg mb-10">
                  Focused creative and digital work — web, brand, motion, product design, corporate, and print — so your business looks the part and grows in ways you can actually measure.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.54}>
                <Link to="/contact" className="btn-primary">
                  Start a project <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </HeroReveal>
            </div>

            <div className="hidden lg:block">
              <HeroReveal delay={0.3}>
                <ul className="border-t border-border" role="list">
                  {services.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between py-4 border-b border-border group"
                    >
                      <span className="text-ink-muted text-sm group-hover:text-ink transition-colors duration-200">
                        {s.title}
                      </span>
                      <span className="font-mono text-[0.6rem] text-ink-faint ml-4 shrink-0">
                        {s.number}
                      </span>
                    </li>
                  ))}
                </ul>
              </HeroReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── Service rows ─────────────────────────────────────────────────── */}
      <section className="bg-bg" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">Services list</h2>
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} m={meta[i]} index={i} />
        ))}
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="section-pad bg-bg border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <RevealWrapper>
                <h2 className="heading-xl mb-6">Not sure where to start?</h2>
              </RevealWrapper>
              <RevealWrapper delay={0.1}>
                <p className="body-lg max-w-lg mb-8">
                  Tell us what you're trying to achieve. We'll identify the right services, put together a clear scope, and give you an honest proposal.
                </p>
              </RevealWrapper>
              <RevealWrapper delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary">
                    Let's talk <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/portfolio" className="btn-ghost">
                    See our work
                  </Link>
                </div>
              </RevealWrapper>
            </div>

            <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
              {[
                { num: '100+', label: 'Projects delivered', sub: 'Across all five service areas'       },
                { num: '6',    label: 'Core services',      sub: 'Creative and digital under one roof' },
                { num: '3',    label: 'Countries',          sub: 'Nigeria, UK, and Canada'             },
                { num: '2016', label: 'Founded',            sub: 'Nearly a decade of work'             },
              ].map(({ num, label, sub }) => (
                <RevealWrapper key={label}>
                  <div className="bg-bg-surface p-6 lg:p-8">
                    <p className="font-serif text-3xl text-accent mb-1">{num}</p>
                    <p className="text-ink text-sm font-medium mb-1">{label}</p>
                    <p className="text-ink-muted text-xs leading-relaxed">{sub}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
