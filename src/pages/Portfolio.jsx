import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';
import { projects, projectCategories } from '@/data/projects';

const gradients = [
  'from-accent/10 to-accent/5',
  'from-purple-900/20 to-purple-900/5',
  'from-blue-900/20 to-blue-900/5',
  'from-emerald-900/20 to-emerald-900/5',
  'from-rose-900/20 to-rose-900/5',
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <>
      <Helmet>
        <title>Portfolio — Acmes Media</title>
        <meta name="description" content="Selected work across branding, web design, e-commerce, and digital products. See how we help businesses solve problems and grow." />
        <link rel="canonical" href="https://acmesmedia.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acmesmedia.com/portfolio" />
        <meta property="og:title" content="Portfolio — Acmes Media" />
        <meta property="og:description" content="Selected work across branding, web design, e-commerce, and digital products. See how we help businesses solve problems and grow." />
        <meta property="og:image" content="https://acmesmedia.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio — Acmes Media" />
        <meta name="twitter:description" content="Selected branding, web design, and digital work from Acmes Media." />
        <meta name="twitter:image" content="https://acmesmedia.com/og-image.jpg" />
      </Helmet>

      {/* Page hero */}
      <section className="section-pad bg-bg border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <AmbientGlow />
        <div className="container-site relative z-10">
          <HeroReveal delay={0}>
            <span className="label-tag mb-5 block">The work</span>
          </HeroReveal>
          <h1 className="heading-display max-w-4xl mb-6">
            <HeroReveal as="span" text="Every project is its own" delay={0} />
            <HeroReveal as="span" text="problem to solve." delay={0.6} wordClassName="text-accent" />
          </h1>
          <HeroReveal delay={0.42}>
            <p className="body-lg max-w-2xl">
              Selected projects across branding, web design, digital products, content, and visual communication. We try to balance three things that don't always cooperate: creative quality, things that actually function, and results the client can see.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-pad bg-bg" aria-label="Portfolio projects">
        <div className="container-site">

          {/* Filter tabs */}
          <RevealWrapper>
            <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by category">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-accent text-bg'
                      : 'border border-border text-ink-muted hover:border-accent hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealWrapper>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <RevealWrapper key={project.id} delay={0.06 * i}>
                <Link to={`/portfolio/${project.id}`} className="group card-surface overflow-hidden h-full flex flex-col">
                  {/* Project image */}
                  <div className={`h-56 relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center` : ''}`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-accent/15 font-serif text-9xl font-bold select-none">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-bg-surface/80 backdrop-blur-sm text-ink-muted text-xs px-3 py-1 rounded-full border border-border">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-ink-muted border border-border px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-ink font-serif text-xl mb-2 group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h2>
                    <p className="text-ink-muted text-sm leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>
                    {project.outcome && (
                      <p className="text-accent text-xs font-medium border-t border-border pt-4">
                        ✦ {project.outcome}
                      </p>
                    )}
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-ink-muted">No projects match this filter yet.</p>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-bg-surface border-t border-border">
        <div className="container-site text-center">
          <RevealWrapper>
            <h2 className="heading-xl mb-4">Have a project in mind?</h2>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <p className="body-lg max-w-xl mx-auto mb-8">
              Let's add it to the list. Tell us what you're building and we'll take it from there.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={0.15}>
            <Link to="/contact" className="btn-primary">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
