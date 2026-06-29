import { useReducedMotion, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motionTokens } from '@/lib/motion-tokens';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';
import ParallaxGrid from '@/components/ui/ParallaxGrid';

// Generic fade-up for sub-headline, CTAs, stats — not clip-mask, just gentle opacity+y
function useFadeUp(shouldReduce) {
  return (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: motionTokens.ease.out, delay },
  });
}

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const fadeUp = useFadeUp(shouldReduce);

  // Headline: 3 lines, word-split.
  // Line 1 "We build brands" (4 words)  → starts at textStart (0.4)
  // Line 2 "and the digital work that" (5 words) → starts at 0.4 + 4*0.12 = 0.88
  // Line 3 "grows them."               → starts at 0.88 + 5*0.12 = 1.48
  const line2Delay = 4 * motionTokens.duration.stagger;   // 0.48
  const line3Delay = line2Delay + 5 * motionTokens.duration.stagger; // 1.08

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg"
      aria-label="Hero"
    >
      {/* ── Background layers ────────────────────────────────────────────── */}
      <ParallaxGrid />
      <AmbientGlow />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="container-site relative z-10 pt-16 pb-24">

        {/* Status badge */}
        <motion.div {...fadeUp(0.2)} className="mb-8">
          <span className="inline-flex items-center gap-2 border border-border bg-bg-surface text-ink-muted text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"
              aria-hidden="true"
            />
            Currently taking on new projects
          </span>
        </motion.div>

        {/* ── Headline — word-split across three lines ─────────────────── */}
        <h1 className="heading-display max-w-5xl mb-6">
          <HeroReveal as="span" text="We build brands" delay={0} />
          <br className="hidden sm:block" />
          <HeroReveal as="span" text="and the digital work that " delay={line2Delay} />
          <br className="hidden sm:block" />
          <HeroReveal as="span" text="grows them." delay={line3Delay} wordClassName="text-accent not-italic" />
        </h1>

        {/* Sub-headline */}
        <motion.p {...fadeUp(1.6)} className="body-lg max-w-2xl mb-10">
          Acmes Media is a creative and digital agency. We help startups,
          growing businesses, and institutions look sharper, communicate better,
          and compete in a market that lives mostly online — through branding,
          websites, and the digital tools behind them.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(1.72)} className="flex flex-wrap gap-4 mb-20">
          <Link to="/contact" className="btn-primary">
            Let's talk <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/portfolio" className="btn-ghost">
            View our work
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div {...fadeUp(1.84)}>
          <div className="flex flex-wrap gap-px border border-border rounded-2xl bg-border overflow-hidden max-w-3xl">
            {[
              { num: '100+', label: 'Projects delivered' },
              { num: '3',    label: 'Countries served'   },
              { num: '2016', label: 'Founded'             },
              { num: '6',    label: 'Service areas'       },
            ].map(({ num, label }) => (
              <div key={label} className="flex-1 min-w-[120px] bg-bg-surface px-6 py-5">
                <p className="font-serif text-2xl text-ink mb-1">{num}</p>
                <p className="text-ink-muted text-xs tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-ink-muted to-transparent" />
      </div>
    </section>
  );
}
