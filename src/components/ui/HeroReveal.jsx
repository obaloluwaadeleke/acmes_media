import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from '@/lib/motion-tokens';

/**
 * Two modes:
 *
 * Word-split mode (pass `text` prop):
 *   <HeroReveal as="h1" text="Five services." />
 *   <HeroReveal as="span" text="One partner." wordClassName="text-accent" />
 *   Each word clips up from overflow:hidden with a stagger. A sr-only span
 *   contains the unsplit text for screen readers / crawlers.
 *
 * Block-clip mode (pass `children`):
 *   <HeroReveal delay={0.42}><p className="body-lg">…</p></HeroReveal>
 *   The children block slides up from an overflow:hidden parent as one piece.
 *   `delay` is a direct offset in seconds (not added to textStart).
 */
export default function HeroReveal({
  text,
  children,
  as: Tag = 'div',
  className = '',
  wordClassName = '',
  delay = 0,
}) {
  const shouldReduce = useReducedMotion();

  // ── Word-split mode ───────────────────────────────────────────────────────
  if (text !== undefined) {
    const words = text.split(' ');

    const wordVariants = {
      hidden: { y: shouldReduce ? 0 : '110%', opacity: shouldReduce ? 0 : 1 },
      visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: shouldReduce
          ? { duration: 0.3 }
          : {
              duration: motionTokens.duration.word,
              ease: motionTokens.ease.out,
              delay: motionTokens.delay.textStart + delay + i * motionTokens.duration.stagger,
            },
      }),
    };

    const MotionTag = Tag === 'span' ? motion.span : motion.div;

    return (
      <Tag className={className || undefined}>
        {/* Unsplit text for screen readers and crawlers */}
        <span className="sr-only">{text}</span>

        {/* Visually animated version — hidden from AT */}
        <MotionTag aria-hidden="true" className={Tag === 'span' ? 'inline' : 'block'}>
          {words.map((word, i) => (
            <span
              key={i}
              style={{ overflow: 'hidden', display: 'inline-block' }}
            >
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                style={{ display: 'inline-block' }}
                className={wordClassName || undefined}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </MotionTag>
      </Tag>
    );
  }

  // ── Block-clip mode (children) ────────────────────────────────────────────
  const MotionEl = Tag === 'span' ? motion.span : motion.div;

  return (
    <Tag
      className={`block overflow-hidden${className ? ` ${className}` : ''}`}
    >
      <MotionEl
        className="block"
        initial={shouldReduce ? { opacity: 0 } : { y: '115%' }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: shouldReduce ? 0.3 : 0.85,
          ease: motionTokens.ease.out,
          delay,
        }}
      >
        {children}
      </MotionEl>
    </Tag>
  );
}
