import { posts } from '@/lib/posts';

// Posts are bundled at build time (see src/lib/posts.js), so they are always
// available synchronously. The { loading, error } shape is kept so callers —
// and a future CMS-backed version of this hook — don't need to change.
export function usePosts() {
  return { posts, loading: false, error: null };
}
