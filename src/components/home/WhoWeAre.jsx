import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Zap, Users, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import RevealWrapper from '@/components/ui/RevealWrapper';

const values = [
  {
    title: 'Strategy first',
    body: 'Every project starts with what the business is actually trying to achieve.',
    icon: Target,
    span: 'sm:col-span-2',
  },
  {
    title: 'Built to last',
    body: 'Work designed to scale as the business changes — not need a redo in 18 months.',
    icon: Zap,
    span: 'sm:col-span-1',
  },
  {
    title: 'One partner',
    body: 'Branding, websites, marketing — handled by one team that sees the whole picture.',
    icon: Users,
    span: 'sm:col-span-1',
  },
  {
    title: 'Run properly',
    body: 'Clear process, real technical skill, and projects that actually ship on time.',
    icon: CheckCircle2,
    span: 'sm:col-span-2',
  },
];

function GlowCard({ title, body, icon: Icon }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (shouldReduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
    },
    [shouldReduce]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--mx', '50%');
    ref.current.style.setProperty('--my', '50%');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full overflow-hidden rounded-2xl p-6 group cursor-default"
      style={{
        '--mx': '50%',
        '--my': '50%',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Mouse-tracking gold spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle 220px at var(--mx) var(--my), rgba(200,169,110,0.18), transparent 80%)',
        }}
        aria-hidden="true"
      />
      {/* Inset border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.28)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: 'rgba(200,169,110,0.1)',
            border: '1px solid rgba(200,169,110,0.2)',
          }}
          aria-hidden="true"
        >
          <Icon size={15} className="text-accent" />
        </div>
        <h3 className="font-serif text-ink text-lg leading-tight">{title}</h3>
        <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <section className="section-pad bg-bg" aria-labelledby="who-heading">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: text */}
          <div>
            <RevealWrapper>
              <span className="label-tag mb-4 block">Who we are</span>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <h2 id="who-heading" className="heading-xl mb-6">
                Creativity, with the{' '}
                <em className="text-accent not-italic">technical side</em>{' '}
                to back it up.
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={0.15}>
              <p className="body-lg mb-5">
                Acmes Media is a creative and digital agency that helps businesses say what they do clearly, grow faster, and hold their own online.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.2}>
              <p className="body-md mb-5">
                We started in 2016 with one question: could we deliver creative work at a consistently high standard, project after project? That question still runs the place.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.25}>
              <p className="body-md mb-8">
                The name comes from "acme" — the highest point, the top of the climb. Every business deserves work built to perform at its best, not just look good in a deck. Today we bring strategy, design, technology, and a bit of business sense to everything we build.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.3}>
              <Link to="/about" className="btn-text">
                Our full story <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </RevealWrapper>
          </div>

          {/* Right: asymmetric bento glow grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {values.map(({ title, body, icon, span }, i) => (
              <RevealWrapper key={title} delay={0.1 + i * 0.07} className={`col-span-1 ${span} h-full`}>
                <GlowCard title={title} body={body} icon={icon} />
              </RevealWrapper>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
