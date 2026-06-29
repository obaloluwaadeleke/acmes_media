import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projects } from '@/data/projects';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';

const gradients = [
  'from-accent/10 to-accent/5',
  'from-purple-900/20 to-purple-900/5',
  'from-blue-900/20 to-blue-900/5',
  'from-emerald-900/20 to-emerald-900/5',
  'from-rose-900/20 to-rose-900/5',
];

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Find project by id
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
        <p className="text-ink-muted">Project case study not found.</p>
        <Link to="/portfolio" className="btn-primary">Back to Portfolio</Link>
      </div>
    );
  }

  // Next project link for continuous browsing
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <Helmet>
        <title>{project.title} — Case Study | Acmes Media</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://acmesmedia.com/portfolio/${project.id}`} />
      </Helmet>

      <section className="bg-bg min-h-screen">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="section-pad border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="container-site relative z-10">
            <HeroReveal delay={0}>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm transition-colors duration-200 mb-10"
              >
                <ArrowLeft size={15} aria-hidden="true" /> Back to Portfolio
              </Link>
            </HeroReveal>

            <HeroReveal delay={0.1}>
              <span className="label-tag mb-4 block">{project.category}</span>
            </HeroReveal>

            <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ink mb-6">
              <HeroReveal as="span" text={project.title} delay={0} />
            </h1>

            <HeroReveal delay={0.32}>
              <p className="body-lg max-w-3xl leading-relaxed">{project.description}</p>
            </HeroReveal>
          </div>
        </header>

        {/* ── Showcase Panel & Sidebar ─────────────────────────────────────── */}
        <div className="container-site py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Visual Showcase (Gradient block matching Portfolio list page style) */}
            <div className="lg:col-span-2 space-y-8">
              <RevealWrapper>
                <div className={`h-[300px] sm:h-[450px] bg-gradient-to-br ${gradients[projectIndex % gradients.length]} rounded-2xl flex items-center justify-center relative overflow-hidden border border-border`}>
                  <div className="text-accent/10 font-serif text-[12rem] sm:text-[18rem] font-bold select-none">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 grid-bg opacity-20" />
                </div>
              </RevealWrapper>
            </div>

            {/* Sidebar Specs */}
            <div className="lg:col-span-1 space-y-8">
              <RevealWrapper delay={0.1}>
                <div className="card-surface p-8 space-y-6">
                  <h2 className="font-serif text-2xl text-ink border-b border-border pb-4">
                    Project details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs text-accent uppercase tracking-widest font-sans font-medium mb-1">
                        Timeline
                      </h3>
                      <p className="text-ink font-medium text-sm">{project.year}</p>
                    </div>

                    <div>
                      <h3 className="text-xs text-accent uppercase tracking-widest font-sans font-medium mb-1">
                        Services Provided
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs text-ink-muted border border-border px-2.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.outcome && (
                      <div className="border-t border-border pt-4">
                        <h3 className="text-xs text-accent uppercase tracking-widest font-sans font-medium mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-accent" />
                          Key Outcome
                        </h3>
                        <p className="text-ink text-sm leading-relaxed font-serif italic">
                          "{project.outcome}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </RevealWrapper>

              {/* Next Case Study Navigation */}
              {nextProject && (
                <RevealWrapper delay={0.15}>
                  <Link
                    to={`/portfolio/${nextProject.id}`}
                    className="group card-surface p-6 flex justify-between items-center hover:border-accent/40"
                  >
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] text-accent uppercase font-medium">
                        Next Case Study
                      </span>
                      <h4 className="text-ink font-serif text-lg leading-tight mt-1 group-hover:text-accent transition-colors duration-200">
                        {nextProject.title}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover:border-accent group-hover:text-accent transition-colors duration-200 shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </Link>
                </RevealWrapper>
              )}
            </div>

          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <footer className="section-pad border-t border-border bg-bg-surface">
          <div className="container-site text-center">
            <RevealWrapper>
              <h2 className="heading-xl mb-4">Want similar results?</h2>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <p className="body-lg max-w-xl mx-auto mb-8">
                Let's discuss how we can help your business stand out and perform online.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.15}>
              <Link to="/contact" className="btn-primary">
                Start your project <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </RevealWrapper>
          </div>
        </footer>
      </section>
    </>
  );
}
