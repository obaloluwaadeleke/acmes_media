// Blog posts are parsed at module load (eager glob) rather than in an effect,
// so prerendering emits the full article HTML instead of a loading state.
const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parsePost(filePath, rawContent) {
  // Manual front-matter extraction — no browser-unsafe parsers needed
  const matches = rawContent.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!matches) return null;

  const metadata = {};
  matches[1].split('\n').forEach((line) => {
    const [key, ...val] = line.split(':');
    if (key && val.length) {
      metadata[key.trim()] = val.join(':').trim().replace(/^['"]|['"]$/g, '');
    }
  });

  return {
    slug:       filePath.split('/').pop().replace('.md', ''),
    content:    matches[2].trim(),
    title:      metadata.title      || 'Untitled',
    date:       metadata.date       || '',
    updated:    metadata.updated    || metadata.date || '',
    category:   metadata.category   || 'General',
    readTime:   metadata.readTime   || '5 min read',
    excerpt:    metadata.excerpt    || '',
    coverImage: metadata.coverImage || null,
    featured:   metadata.featured === 'true',
  };
}

// Newest first
export const posts = Object.entries(modules)
  .map(([filePath, raw]) => parsePost(filePath, raw))
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
