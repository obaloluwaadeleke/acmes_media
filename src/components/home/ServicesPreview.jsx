import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Layers, Play, Briefcase, PenTool, Printer } from 'lucide-react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { services } from '@/data/services';

const SERVICE_META = [
  { Icon: Monitor,    tag: 'Digital'   },
  { Icon: Layers,     tag: 'Creative'  },
  { Icon: Play,       tag: 'Motion'    },
  { Icon: Briefcase,  tag: 'Corporate' },
  { Icon: PenTool,    tag: 'Product'   },
  { Icon: Printer,    tag: 'Print'     },
];

// Zigzag bento: row 1 = 3+2+1, row 2 = 1+2+3
const SPANS = [
  'md:col-span-3',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-3',
];

// col-span-1 cards use slim layout (no description)
const SLIM = [false, false, true, true, false, false];

// Diagonal stagger — sweeps top-left → bottom-right across both rows
const ENTRY_DELAYS = [0, 0.10, 0.20, 0.06, 0.16, 0.26];

// Hover tilt direction — alternates L/R by column position for depth realism
const HOVER_TILT_Y = [3, -2, -4, 4, -3, 2];

function ServiceCard({ service, meta, span, index, slim, shouldReduce }) {
  const { Icon, tag } = meta;
  const isHero = index === 0;
  const pad = slim ? 'p-4' : 'p-5';

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${span}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.32)',
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      /* ── Entrance: 3D tilt cascade from "far below" ── */
      initial={shouldReduce ? {} : {
        opacity: 0,
        y: 52,
        scale: 0.86,
        rotateX: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: ENTRY_DELAYS[index] ?? index * 0.08,
      }}
      /* ── Hover: subtle 3D tilt — feels magnetic ── */
      whileHover={shouldReduce ? {} : {
        y: -7,
        scale: 1.025,
        rotateX: -4,
        rotateY: HOVER_TILT_Y[index] ?? 0,
        transition: { duration: 0.32, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glass inner highlight — top-left edge shimmer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)' }}
        aria-hidden="true"
      />

      {/* Hero ambient glow */}
      {isHero && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 12% 22%, rgba(200,169,110,0.1), transparent 65%)' }}
          aria-hidden="true"
        />
      )}

      {/* Hover radial wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 30% 50%, rgba(200,169,110,0.08), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Dot-grid on hover — 21st.dev bento texture */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.055) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.22)' }}
        aria-hidden="true"
      />

      <Link
        to="/services"
        className={`relative z-10 flex flex-col h-full ${pad} ${slim ? 'gap-3' : 'gap-4'}`}
        aria-label={`${service.title} — view service`}
      >
        {/* Icon + number */}
        <div className="flex items-start justify-between">
          <div
            className={`rounded-xl flex items-center justify-center transition-all duration-300 ${slim ? 'w-8 h-8' : 'w-9 h-9'}`}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            <Icon
              size={slim ? 14 : 16}
              className="text-ink-muted group-hover:text-accent transition-colors duration-300"
              aria-hidden="true"
            />
          </div>
          <span
            className="text-[9px] font-mono tracking-[0.2em] text-ink-muted/40 uppercase rounded-full px-2 py-0.5"
            style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
          >
            {service.number}
          </span>
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${slim ? 'gap-1' : 'gap-1.5'}`}>
          <span className="text-[9px] font-sans font-medium tracking-[0.18em] text-accent/55 uppercase">
            {tag}
          </span>
          <h3
            className={`font-serif text-ink leading-snug tracking-tight group-hover:text-accent transition-colors duration-300 ${
              isHero ? 'text-xl md:text-2xl' : slim ? 'text-base' : 'text-base md:text-[1.05rem]'
            }`}
          >
            {service.title}
          </h3>
          {!slim && (
            <p className="text-ink-muted leading-relaxed text-xs md:text-sm line-clamp-3">
              {service.description}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-accent opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-300">
          <span>Explore</span>
          <ArrowRight size={10} aria-hidden="true" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPreview() {
  const shouldReduce = useReducedMotion();
  const gridRef = useRef(null);
  // Fire once the grid is 60px into the viewport
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      className="bg-bg border-t border-border relative overflow-hidden py-14 md:py-20"
      aria-labelledby="services-heading"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/3 w-[560px] h-[320px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.05), transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <RevealWrapper>
              <span className="label-tag mb-3 block">What we do</span>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <h2 id="services-heading" className="heading-xl max-w-lg">
                Services built around <em className="text-accent not-italic">growth.</em>
              </h2>
            </RevealWrapper>
          </div>
          <RevealWrapper delay={0.15} className="shrink-0">
            <Link to="/services" className="btn-ghost text-sm">
              All services <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </RevealWrapper>
        </div>

        {/* ── Bento grid with gold shimmer sweep ─────────────────────────── */}
        <div ref={gridRef} className="relative">

          {/* Zigzag bento: row1=[3+2+1], row2=[1+2+3] */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5 md:auto-rows-[minmax(120px,auto)]">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                meta={SERVICE_META[i] ?? SERVICE_META[0]}
                span={SPANS[i] ?? 'md:col-span-2'}
                index={i}
                slim={SLIM[i] ?? false}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>

          {/* Gold shimmer sweep — fires after cards have entered */}
          {!shouldReduce && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-y-0 w-[38%]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.07) 25%, rgba(255,220,100,0.18) 50%, rgba(200,169,110,0.07) 75%, transparent 100%)',
                  filter: 'blur(6px)',
                }}
                initial={{ x: '-55%' }}
                animate={gridInView ? { x: '320%' } : { x: '-55%' }}
                transition={{
                  duration: 1.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.65,
                }}
              />
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
