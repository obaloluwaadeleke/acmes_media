import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { projects } from '@/data/projects';

const featured = projects.filter((p) => p.featured).slice(0, 3);

const placeholderGradients = [
  'from-accent/10 to-accent/5',
  'from-purple-900/20 to-purple-900/5',
  'from-blue-900/20 to-blue-900/5',
];

export default function FeaturedWork() {
  return (
    <section className="section-pad bg-bg" aria-labelledby="work-heading">
      <div className="container-site">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <RevealWrapper>
              <span className="label-tag mb-4 block">Selected work</span>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <h2 id="work-heading" className="heading-xl max-w-lg">
                Every project is its own{' '}
                <em className="text-accent not-italic">problem to solve.</em>
              </h2>
            </RevealWrapper>
          </div>
          <RevealWrapper delay={0.15} className="shrink-0">
            <Link to="/portfolio" className="btn-ghost text-sm">
              View all work <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </RevealWrapper>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Large card */}
          {featured[0] && (
            <RevealWrapper delay={0.1} className="lg:col-span-7">
              <Link to={`/portfolio/${featured[0].id}`} className="group block card-surface overflow-hidden h-full">
                <div className={`h-72 relative overflow-hidden ${!featured[0].image ? `bg-gradient-to-br ${placeholderGradients[0]} flex items-center justify-center` : ''}`}>
                  {featured[0].image ? (
                    <img
                      src={featured[0].image}
                      alt={featured[0].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-accent/20 font-serif text-8xl font-bold select-none">
                      {featured[0].title.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 text-ink font-medium text-sm bg-bg/80 backdrop-blur-sm px-5 py-3 rounded-full border border-border">
                      View project <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="label-tag">{featured[0].category}</span>
                    <span className="text-ink-muted text-xs">{featured[0].year}</span>
                  </div>
                  <h3 className="heading-md mb-2 group-hover:text-accent transition-colors duration-200">
                    {featured[0].title}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{featured[0].description}</p>
                </div>
              </Link>
            </RevealWrapper>
          )}

          {/* Stack of two smaller cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {featured.slice(1).map((project, i) => (
              <RevealWrapper key={project.id} delay={0.15 + i * 0.1} className="flex-1">
                <Link to={`/portfolio/${project.id}`} className="group block card-surface overflow-hidden h-full">
                  <div className={`h-44 relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${placeholderGradients[i + 1]} flex items-center justify-center` : ''}`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-accent/20 font-serif text-6xl font-bold select-none">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 text-ink font-medium text-xs bg-bg/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                        View project <ArrowUpRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="label-tag text-[0.65rem]">{project.category}</span>
                      <span className="text-ink-muted text-xs">{project.year}</span>
                    </div>
                    <h3 className="text-ink font-serif text-lg group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
