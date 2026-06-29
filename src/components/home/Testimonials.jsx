import { useState } from 'react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { testimonials } from '@/data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const t = testimonials[active];

  return (
    <section className="section-pad bg-bg-surface border-t border-border" aria-labelledby="testimonials-heading">
      <div className="container-site">

        <div className="max-w-4xl mx-auto">
          <RevealWrapper>
            <span className="label-tag mb-4 block text-center">Client testimonials</span>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h2 id="testimonials-heading" className="heading-xl text-center mb-16">
              What clients <em className="text-accent not-italic">say.</em>
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={0.15}>
            <div className="card-surface p-8 md:p-12 relative" aria-live="polite" aria-atomic="true">
              {/* Decorative quote mark */}
              <span className="absolute top-8 right-10 font-serif text-8xl text-accent/10 leading-none select-none" aria-hidden="true">"</span>

              <blockquote>
                <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <footer className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-medium shrink-0"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-ink font-medium text-sm">{t.name}</p>
                    <p className="text-ink-muted text-xs">{t.title}, {t.company}</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </RevealWrapper>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial ${i + 1} of ${total}`}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === active
                      ? 'w-6 h-2 bg-accent'
                      : 'w-2 h-2 bg-border-light hover:bg-ink-muted'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
