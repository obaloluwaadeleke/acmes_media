import { useSyncExternalStore } from 'react';

// True from the md breakpoint up. Used to keep decorative, always-running
// animations off phones, where they cost battery and cause scroll jank.
// The server snapshot is false, so mobile gets the lighter page first.
const QUERY = '(min-width: 768px)';

function subscribe(callback) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
