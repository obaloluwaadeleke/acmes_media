import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Mail, Search, Sparkles } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import TravellingRing from '@/components/ui/TravellingRing';
import { motionTokens } from '@/lib/motion-tokens';
import { slots, packages, included, emailAddOn } from '@/data/sales';
import { track } from '@/lib/track';
import useIsDesktop from '@/hooks/useIsDesktop';

const remaining = Math.max(slots.total - slots.taken, 0);
const isClosed = remaining === 0;

// Links to the unlisted /sales page; UTM tags show which homepage block sent them.
const SALES_URL = '/sales?utm_source=homepage&utm_medium=banner&utm_campaign=web-slots';

const includedIcons = [Globe, Search, Sparkles];

// Counts 0 → value, holds, then repeats, so the number keeps catching the eye.
// Pauses while off screen; shows the final value for reduced motion and SSR.
function LoopingCounter({ value }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { margin: '-40px' });
  const count = useMotionValue(value);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || shouldReduce) return undefined;
    const controls = animate(count, [0, value], {
      duration: 3.2,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 5,
    });
    return () => {
      controls.stop();
      count.set(value);
    };
  }, [inView, shouldReduce, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function SalesBanner() {
  const shouldReduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const loops = !shouldReduce && isDesktop; // decorative always-on motion: desktop only

  return (
    <section className="section-pad bg-bg border-b border-border relative overflow-hidden" aria-labelledby="sales-banner-heading">
      {/* Drifting gold glow: two orbs that sweep across the card edges */}
      <motion.div
        className="hidden md:block absolute -top-20 right-0 w-[560px] h-[560px] rounded-full bg-accent/25 blur-[90px] pointer-events-none"
        aria-hidden="true"
        animate={loops ? { x: [0, -220, -60, 0], y: [0, 90, -40, 0], scale: [1, 1.15, 0.95, 1] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: motionTokens.ease.inOut }}
      />
      <motion.div
        className="hidden md:block absolute -bottom-24 left-0 w-[480px] h-[480px] rounded-full bg-accent/20 blur-[90px] pointer-events-none"
        aria-hidden="true"
        animate={loops ? { x: [0, 200, 60, 0], y: [0, -70, 30, 0], scale: [1, 0.9, 1.15, 1] } : undefined}
        transition={{ duration: 11, repeat: Infinity, ease: motionTokens.ease.inOut, delay: 1 }}
      />

      <div className="container-site relative z-10">
        <RevealWrapper>
          {/* Gentle float */}
          <motion.div
            animate={loops ? { y: [0, -16, 0] } : undefined}
            transition={{ duration: 4.5, repeat: Infinity, ease: motionTokens.ease.inOut }}
          >
            <div className="card-surface p-8 md:p-12">
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-3">
                  <RevealWrapper delay={0.05}>
                    <span className="label-tag mb-4 block">
                      {isClosed ? 'Website offer closed' : 'Website offer now open'}
                    </span>
                    <h2 id="sales-banner-heading" className="heading-xl mb-4">
                      A custom website, live in 14 days.{' '}
                      <em className="text-accent not-italic whitespace-nowrap">From ₦200,000.</em>
                    </h2>
                    <p className="body-lg mb-6 max-w-xl">
                      We’re open to 10 website projects right now. Every site is designed and built from scratch on your brand.
                    </p>
                  </RevealWrapper>

                  <RevealWrapper delay={0.15}>
                    <ul className="flex flex-wrap gap-2 mb-8" aria-label="Packages and prices">
                      {packages.map((pkg) => (
                        <li key={pkg.id} className="rounded-full border border-border px-4 py-1.5 text-sm text-ink">
                          {pkg.name} <span className="text-accent">{pkg.price}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <Link
                        to={SALES_URL}
                        onClick={() => track('cta_click', { location: 'homepage_banner' })}
                        className="btn-primary cta-live justify-center"
                      >
                        <TravellingRing />
                        {isClosed ? 'Join the waiting list' : 'See packages and book'}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      {!isClosed && <p className="text-ink-muted text-xs">Pay nothing to inquire.</p>}
                    </div>
                  </RevealWrapper>
                </div>

                <RevealWrapper delay={0.25} className="lg:col-span-2 lg:border-l lg:border-border lg:pl-14">
                  <div role="status" aria-live="polite">
                    <p className="font-serif text-accent leading-none text-7xl md:text-8xl mb-2">
                      <LoopingCounter value={remaining} />
                      <span className="text-ink-muted text-3xl md:text-4xl"> / {slots.total}</span>
                    </p>
                    <p className="text-ink text-lg mb-5">
                      {isClosed ? 'Slots left. This offer is closed.' : 'slots open'}
                    </p>

                    <div className="flex gap-1.5 mb-4" aria-hidden="true">
                      {Array.from({ length: slots.total }).map((_, i) => {
                        const open = i >= slots.taken;
                        return (
                          <motion.span
                            key={i}
                            className="flex-1 max-w-8"
                            initial={shouldReduce ? false : { opacity: 0, scale: 0.4 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, ease: motionTokens.ease.out, delay: 0.5 + i * 0.09 }}
                          >
                            {/* Open slots breathe; taken slots stay still */}
                            <motion.span
                              className={`block h-2 rounded-full ${open ? 'bg-accent' : 'bg-border'}`}
                              animate={open && loops ? { opacity: [1, 0.4, 1] } : undefined}
                              transition={{ duration: 2.4, repeat: Infinity, ease: motionTokens.ease.inOut, delay: 1.8 + i * 0.15 }}
                            />
                          </motion.span>
                        );
                      })}
                    </div>

                    <p className="text-ink-muted text-sm">
                      {isClosed
                        ? `All ${slots.total} slots are filled.`
                        : 'When the 10 slots are filled, this offer closes.'}
                    </p>
                  </div>
                </RevealWrapper>
              </div>

              {/* Included in every package: compact row, highlight sweeps through each chip */}
              <RevealWrapper delay={0.1}>
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="label-tag mr-2">Included in every package</p>
                    {included.map((item, i) => {
                      const Icon = includedIcons[i];
                      return (
                        <span
                          key={item.title}
                          className="relative overflow-hidden inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-ink"
                        >
                          <Icon size={16} className="text-accent shrink-0" aria-hidden="true" />
                          {item.title}
                          {loops && (
                            <motion.span
                              aria-hidden="true"
                              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none"
                              initial={{ x: '-120%' }}
                              animate={{ x: '420%' }}
                              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.4, delay: i * 1.1, ease: 'easeInOut' }}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <p className="flex items-center gap-2 text-ink-muted text-xs mt-4">
                    <Mail size={14} className="shrink-0" aria-hidden="true" />
                    {emailAddOn.title} is optional and billed as a separate fee.
                  </p>
                </div>
              </RevealWrapper>
            </div>
          </motion.div>
        </RevealWrapper>
      </div>
    </section>
  );
}
