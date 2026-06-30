import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';

const gradients = [
  'from-accent/10 to-accent/5',
  'from-purple-900/20 to-purple-900/5',
  'from-blue-900/20 to-blue-900/5',
  'from-emerald-900/20 to-emerald-900/5',
  'from-rose-900/20 to-rose-900/5',
  'from-amber-900/20 to-amber-900/5',
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric',
  });
}

export default function Blog() {
  const { posts, loading, error } = usePosts();
  const [activeCategory, setActiveCategory] = useState('All');

  // Build category list dynamically from loaded posts
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category))).sort()];

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Blog — Acmes Media</title>
        <meta name="description" content="Notes, ideas, and the occasional  strong opinion. Articles on branding, web design, digital marketing, business growth, technology, and creative strategy." />
        <link rel="canonical" href="https://acmesmedia.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acmesmedia.com/blog" />
        <meta property="og:title" content="Blog — Acmes Media" />
        <meta property="og:description" content="Articles on branding, web design, digital marketing, business growth, and creative strategy from the Acmes Media team." />
        <meta property="og:image" content="https://acmesmedia.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Acmes Media" />
        <meta name="twitter:description" content="Branding, web, and digital insights from Acmes Media." />
        <meta name="twitter:image" content="https://acmesmedia.com/og-image.jpg" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-bg border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <AmbientGlow />
        <div className="container-site relative z-10">
          <HeroReveal delay={0}>
            <span className="label-tag mb-5 block">The blog</span>
          </HeroReveal>
          <h1 className="heading-display max-w-5xl mb-6">
            <HeroReveal as="span" text="Notes, ideas, and the occasional" delay={0} />
            <HeroReveal as="span" text="strong opinion." delay={0.6} wordClassName="text-accent" />
          </h1>
          <HeroReveal delay={0.42}>
            <p className="body-lg max-w-2xl">
              Articles on branding, web design, digital marketing, business growth, technology, and creative strategy.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* ── Posts ─────────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-bg" aria-label="Blog posts">
        <div className="container-site">

          {loading && (
            <div className="text-center py-24 text-ink-muted animate-pulse">
              Loading articles…
            </div>
          )}

          {error && (
            <div className="text-center py-24">
              <p className="text-ink-muted mb-2">Could not load articles right now.</p>
              <p className="text-ink-muted text-sm">Try refreshing the page.</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Category filter */}
              <RevealWrapper>
                <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by category">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={activeCategory === cat}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat
                          ? 'bg-accent text-bg'
                          : 'border border-border text-ink-muted hover:border-accent hover:text-accent'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </RevealWrapper>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((post, i) => (
                    <RevealWrapper key={post.slug} delay={0.08 * (i % 3)}>
                      <Link to={`/blog/${post.slug}`} className="group card-surface flex flex-col h-full hover:bg-bg-hover transition-colors duration-200">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt=""
                            className="w-full h-44 object-cover"
                          />
                        ) : (
                          <div
                            className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]}`}
                            aria-hidden="true"
                          />
                        )}

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <span className="label-tag">{post.category}</span>
                            <span className="text-ink-muted text-xs">{formatDate(post.date)}</span>
                          </div>
                          <h2 className="text-ink font-serif text-xl mb-3 leading-snug group-hover:text-accent transition-colors duration-200 flex-1">
                            {post.title}
                          </h2>
                          <p className="text-ink-muted text-sm leading-relaxed mb-5 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between border-t border-border pt-4">
                            <span className="text-ink-muted text-xs">{post.readTime}</span>
                            <span className="text-accent text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Read article <ArrowRight size={12} aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </RevealWrapper>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-ink-muted">No articles in this category yet.</p>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}
