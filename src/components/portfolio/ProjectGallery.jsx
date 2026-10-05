import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Auto-advancing screenshot slideshow for product case studies.
 * images: [{ src, alt, label? }]. Pauses on hover/focus; respects reduced motion
 * (no autoplay). Arrows + dot indicators for manual control.
 */
export default function ProjectGallery({ images, interval = 5000 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduce = useReducedMotion();
  const total = images.length;

  const go = useCallback((i) => setActive(((i % total) + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (shouldReduce || paused || total <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), interval);
    return () => clearInterval(id);
  }, [shouldReduce, paused, total, interval]);

  const current = images[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-border bg-bg-surface aspect-[1850/950]"
        aria-roledescription="carousel"
        aria-label="ExpenseIQ app screenshots"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={active}
            src={current.src}
            alt={current.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            draggable="false"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Slide label */}
        {current.label && (
          <span
            className="absolute top-3 left-3 z-10 text-[11px] font-medium text-ink rounded-full px-3 py-1"
            style={{ background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {current.label}
          </span>
        )}

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-ink hover:text-accent transition-colors duration-200"
              style={{ background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-ink hover:text-accent transition-colors duration-200"
              style={{ background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Choose screenshot">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={img.label || `Screenshot ${i + 1}`}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-200 ${
                i === active ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-border-light hover:bg-ink-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
