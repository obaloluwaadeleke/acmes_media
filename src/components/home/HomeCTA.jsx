import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';

export default function HomeCTA() {
  return (
    <section className="section-pad bg-bg relative overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container-site relative z-10 text-center">
        <RevealWrapper>
          <span className="label-tag mb-6 block">Ready to build something?</span>
        </RevealWrapper>
        <RevealWrapper delay={0.1}>
          <h2 className="heading-display max-w-4xl mx-auto mb-6">
            Launching a new brand,{' '}
            <em className="text-accent not-italic">redoing your website,</em>{' '}
            or scaling up?
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={0.2}>
          <p className="body-lg max-w-xl mx-auto mb-10">
            Whatever stage you're at, we'd like to hear from you. Let's figure out what to build and get started.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={0.25}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Let's talk <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Request a quote
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
