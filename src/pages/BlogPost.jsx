import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SchemaScript from '@/components/ui/SchemaScript';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';

export default function BlogPost() {
  const { slug }          = useParams();
  const { posts, loading } = usePosts();
  const post              = posts.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-ink-muted text-sm tracking-widest uppercase animate-pulse">
          Loading article…
        </span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-ink-muted">Article not found.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Acmes Media</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://acmesmedia.com/blog/${post.slug}`} />
      </Helmet>
      <SchemaScript data={[
        articleSchema(post),
        breadcrumbSchema([
          { name: 'Home', url: 'https://acmesmedia.com' },
          { name: 'Blog', url: 'https://acmesmedia.com/blog' },
          { name: post.title, url: `https://acmesmedia.com/blog/${post.slug}` },
        ]),
      ]} />

      <article className="bg-bg min-h-screen">

        {/* ── Hero banner ───────────────────────────────────────────────────── */}
        <header className="section-pad border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="container-site relative z-10 max-w-3xl">
            <HeroReveal delay={0}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm transition-colors duration-200 mb-10"
              >
                <ArrowLeft size={15} aria-hidden="true" /> Back to Blog
              </Link>
            </HeroReveal>

            <HeroReveal delay={0.1}>
              <span className="label-tag mb-4 block">{post.category}</span>
            </HeroReveal>

            <h1 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-ink mb-6">
              <HeroReveal as="span" text={post.title} delay={0} />
            </h1>

            <HeroReveal delay={0.32}>
              <p className="body-lg mb-8 max-w-2xl">{post.excerpt}</p>
            </HeroReveal>

            <HeroReveal delay={0.42}>
              <div className="flex flex-wrap items-center gap-5 text-ink-muted text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </HeroReveal>
          </div>
        </header>

        {/* ── Cover image ───────────────────────────────────────────────────── */}
        {post.coverImage && (
          <div className="container-site max-w-3xl pt-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl border border-border"
            />
          </div>
        )}

        {/* ── Body ──────────────────────────────────────────────────────────── */}
        <div className="container-site max-w-3xl py-16">
          <RevealWrapper>
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-ink prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-p:text-ink-muted prose-p:leading-relaxed
                prose-strong:text-ink
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-li:text-ink-muted
                prose-hr:border-border"
            >
              {/* Render paragraphs — replace with react-markdown for full MD support */}
              {post.content.split('\n\n').map((block, i) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // h2
                if (trimmed.startsWith('## ')) {
                  return <h2 key={i}>{trimmed.replace('## ', '')}</h2>;
                }
                // h3
                if (trimmed.startsWith('### ')) {
                  return <h3 key={i}>{trimmed.replace('### ', '')}</h3>;
                }
                // Unordered list
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
                  return (
                    <ul key={i}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                // Ordered list
                if (/^\d+\./.test(trimmed)) {
                  const items = trimmed.split('\n').filter((l) => /^\d+\./.test(l));
                  return (
                    <ol key={i}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                // Default paragraph
                return <p key={i}>{trimmed}</p>;
              })}
            </div>
          </RevealWrapper>

          {/* ── Footer nav ────────────────────────────────────────────────── */}
          <div className="mt-16 pt-10 border-t border-border flex flex-wrap gap-4 justify-between items-center">
            <Link to="/blog" className="btn-ghost">
              <ArrowLeft size={15} aria-hidden="true" /> Back to Blog
            </Link>
            <Link to="/contact" className="btn-primary">
              Work with us
            </Link>
          </div>
        </div>

      </article>
    </>
  );
}
