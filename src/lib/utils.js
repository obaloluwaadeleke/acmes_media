import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — merge Tailwind class names safely.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 * Used by every shadcn/ui component.
 *
 * @example
 *   cn('px-4 py-2', isActive && 'bg-accent', 'px-6')
 *   // → 'py-2 bg-accent px-6'  (px-4 is overridden by px-6)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
