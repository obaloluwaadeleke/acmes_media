import { useState, useEffect } from 'react';

export function usePosts() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        // Vite 5+ syntax: query: '?raw' replaces the deprecated { as: 'raw' }
        const modules = import.meta.glob('../content/blog/*.md', {
          query: '?raw',
          import: 'default',
        });

        const postList = [];

        for (const filePath in modules) {
          const rawContent = await modules[filePath]();

          // Manual front-matter extraction — no browser-unsafe parsers needed
          const matches = rawContent.match(/^---([\s\S]*?)---([\s\S]*)$/);
          if (!matches) continue;

          const yamlLines = matches[1].split('\n');
          const content   = matches[2].trim();
          const metadata  = {};

          yamlLines.forEach((line) => {
            const [key, ...val] = line.split(':');
            if (key && val.length) {
              metadata[key.trim()] = val.join(':').trim().replace(/^['"]|['"]$/g, '');
            }
          });

          const slug = filePath.split('/').pop().replace('.md', '');

          postList.push({
            slug,
            content,
            title:      metadata.title      || 'Untitled',
            date:       metadata.date        || '',
            category:   metadata.category    || 'General',
            readTime:   metadata.readTime    || '5 min read',
            excerpt:    metadata.excerpt     || '',
            coverImage: metadata.coverImage  || null,
            featured:   metadata.featured === 'true',
          });
        }

        // Newest first
        postList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postList);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return { posts, loading, error };
}
