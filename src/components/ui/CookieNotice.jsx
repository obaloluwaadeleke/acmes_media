import { useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Analytics consent. GA4 starts with analytics_storage denied (see index.html);
// Accept grants it for this visitor, Decline leaves it off. The choice is kept
// in localStorage (and in memory if storage is blocked) so the notice shows once.
const KEY = 'cookie_consent';
const listeners = new Set();
let memory = null;

function read() {
  if (memory) return memory;
  try { return window.localStorage.getItem(KEY); } catch { return null; }
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function choose(value) {
  memory = value;
  try { window.localStorage.setItem(KEY, value); } catch { /* storage blocked */ }
  if (value === 'granted' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
  listeners.forEach((listener) => listener());
}

export default function CookieNotice() {
  const shouldReduce = useReducedMotion();
  // The server snapshot is 'server', so nothing renders during prerender or hydration.
  const choice = useSyncExternalStore(subscribe, read, () => 'server');

  if (choice !== null) return null;

  return (
    <motion.div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[60] card-surface p-5 shadow-2xl"
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <p className="text-ink text-sm mb-4">
        We use analytics cookies to see how people use this site. You can accept or decline.
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={() => choose('granted')} className="btn-primary !px-5 !py-2.5 text-sm">
          Accept
        </button>
        <button type="button" onClick={() => choose('denied')} className="btn-ghost !px-5 !py-2.5 text-sm">
          Decline
        </button>
      </div>
    </motion.div>
  );
}
