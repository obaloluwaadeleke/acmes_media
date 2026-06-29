import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';

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

          {/* Right: feature blocks */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Strategy first', body: 'Every project starts with what the business is actually trying to achieve.' },
              { title: 'Built to last', body: 'Work designed to scale as the business changes — not need a redo in 18 months.' },
              { title: 'One partner', body: 'Branding, websites, marketing — handled by one team that sees the whole picture.' },
              { title: 'Run properly', body: 'Clear process, real technical skill, and projects that actually ship on time.' },
            ].map(({ title, body }, i) => (
              <RevealWrapper key={title} delay={0.1 + i * 0.08}>
                <div className="card-surface p-6 h-full">
                  <h3 className="text-ink font-serif text-lg mb-2">{title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
