import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import SchemaScript from '@/components/ui/SchemaScript';
import { webPageSchema, breadcrumbSchema } from '@/lib/schema';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';
import StatsBento from '@/components/ui/StatsBento';

const values = [
  { title: 'Excellence', body: 'We don\'t ship work we\'re not proud of. Every deliverable is held to the same standard.' },
  { title: 'Integrity', body: 'Clear communication, honest pricing, and no surprises. We say what we mean.' },
  { title: 'Innovation', body: 'We stay current so our clients don\'t have to. New tools and methods get tested, not just tracked.' },
  { title: 'Collaboration', body: 'The best outcomes come from working closely with clients, not just for them.' },
  { title: 'Always improving', body: 'Every project teaches us something. We apply those lessons to the next one.' },
  { title: 'Client success', body: 'We measure our work by what it does for the client, not how it looks in our portfolio.' },
];

const process = [
  { step: '01', title: 'Discover', body: 'We get to know the business, its goals, its competitors, and where it\'s stuck.' },
  { step: '02', title: 'Strategise', body: 'We shape an approach that fits those goals — not a template applied to every brief.' },
  { step: '03', title: 'Create', body: 'We design and build the thing — properly, with the right tools for the job.' },
  { step: '04', title: 'Launch', body: 'We ship carefully, test thoroughly, and make sure everything works as intended.' },
  { step: '05', title: 'Grow', body: 'We stick around to refine and help the business keep moving forward.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Acmes Media</title>
        <meta name="description" content="Acmes Media started in 2016 with one question: what does it take to deliver creative and digital work at a high standard, every time? Our story, mission, and how we work." />
        <link rel="canonical" href="https://acmesmedia.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acmesmedia.com/about" />
        <meta property="og:title" content="About — Acmes Media" />
        <meta property="og:description" content="Acmes Media started in 2016 with one question: what does it take to deliver creative work at a high standard, every time? Our story and how we work." />
        <meta property="og:image" content="https://acmesmedia.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Acmes Media" />
        <meta name="twitter:description" content="Creative and digital agency. Our story, mission, and how we work." />
        <meta name="twitter:image" content="https://acmesmedia.com/og-image.jpg" />
      </Helmet>
      <SchemaScript data={[
        webPageSchema({
          name: 'About — Acmes Media',
          description: 'Acmes Media started in 2016 with one question: what does it take to deliver creative and digital work at a consistently high standard?',
          url: 'https://acmesmedia.com/about',
        }),
        breadcrumbSchema([
          { name: 'Home', url: 'https://acmesmedia.com' },
          { name: 'About', url: 'https://acmesmedia.com/about' },
        ]),
      ]} />

      {/* Page hero */}
      <section className="section-pad bg-bg border-b border-border relative overflow-hidden" aria-label="About page hero">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <AmbientGlow />
        <div className="container-site relative z-10">
          <HeroReveal delay={0}>
            <span className="label-tag mb-5 block">About us</span>
          </HeroReveal>
          <h1 className="heading-display max-w-5xl mb-6">
            <HeroReveal as="span" text="Built to do" delay={0} />
            <HeroReveal as="span" text="excellent work," delay={0.36} wordClassName="text-accent" />
            <HeroReveal as="span" text="project after project." delay={0.6} />
          </h1>
          <HeroReveal delay={0.5}>
            <p className="body-lg max-w-2xl">
              Acmes Media started in 2016 with one question: what does it take to deliver creative and digital work at a consistently high standard? That question still runs everything we do.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Our story */}
      <section className="section-pad bg-bg" aria-labelledby="story-heading">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <RevealWrapper>
                <span className="label-tag mb-4 block">Our story</span>
                <h2 id="story-heading" className="heading-xl mb-6">
                  From a single question to a full agency.
                </h2>
              </RevealWrapper>
              <RevealWrapper delay={0.1}>
                <p className="body-lg mb-5">
                  The name comes from "acme" — the peak, the top of the climb. From day one the point was never just to make things look good. It was to help businesses explain themselves clearly, present well, and compete in markets that don't go easy on anyone.
                </p>
              </RevealWrapper>
              <RevealWrapper delay={0.15}>
                <p className="body-md mb-5">
                  As more of business moved online, we moved with it. The company grew from a creative agency into a full creative and digital one, covering branding, web development, content, and strategy under a single roof.
                </p>
              </RevealWrapper>
              <RevealWrapper delay={0.2}>
                <p className="body-md">
                  Today we work with clients in Nigeria, the United Kingdom, and Canada — turning ideas into brands and products that hold up in the real world.
                </p>
              </RevealWrapper>
            </div>

            {/* Stats */}
            <StatsBento layout="stacked" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-bg-surface border-t border-border" aria-labelledby="mission-heading">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8">
            <RevealWrapper>
              <div className="card-surface p-8 h-full">
                <span className="label-tag mb-4 block">Our mission</span>
                <h2 id="mission-heading" className="heading-md mb-4">Why we do this work.</h2>
                <p className="body-md">
                  To give businesses creative and digital work that strengthens their brand, improves how customers experience them, and supports steady, measurable growth.
                </p>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <div className="card-surface p-8 h-full">
                <span className="label-tag mb-4 block">Our vision</span>
                <h2 className="heading-md mb-4">Where we're going.</h2>
                <p className="body-md">
                  To be known internationally as a creative and digital agency that does excellent, useful, genuinely good work — for any type of business, anywhere in the world.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section-pad bg-bg" aria-labelledby="process-heading">
        <div className="container-site">
          <RevealWrapper>
            <span className="label-tag mb-4 block">How we work</span>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h2 id="process-heading" className="heading-xl max-w-lg mb-16">
              A process built for{' '}
              <em className="text-accent not-italic">real outcomes.</em>
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden">
            {process.map(({ step, title, body }, i) => (
              <RevealWrapper key={step} delay={0.08 * i}>
                <div className="bg-bg p-8 h-full">
                  <span className="text-accent font-mono text-xs tracking-widest mb-4 block">{step}</span>
                  <h3 className="text-ink font-serif text-xl mb-3">{title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-bg-surface border-t border-border" aria-labelledby="values-heading">
        <div className="container-site">
          <RevealWrapper>
            <span className="label-tag mb-4 block">What we value</span>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h2 id="values-heading" className="heading-xl max-w-lg mb-16">
              Principles we don't{' '}
              <em className="text-accent not-italic">negotiate on.</em>
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ title, body }, i) => (
              <RevealWrapper key={title} delay={0.08 * i}>
                <div className="flex gap-4 p-6 card-surface h-full">
                  <span className="text-accent mt-1 shrink-0 text-lg" aria-hidden="true">→</span>
                  <div>
                    <h3 className="text-ink font-serif text-lg mb-2">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-bg border-t border-border">
        <div className="container-site text-center">
          <RevealWrapper>
            <h2 className="heading-xl mb-4">Ready to work with us?</h2>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <p className="body-lg max-w-xl mx-auto mb-8">
              Tell us about your project. We'll figure out the best way to help.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={0.15}>
            <Link to="/contact" className="btn-primary">
              Get in touch <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
