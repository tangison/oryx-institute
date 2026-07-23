'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook using IntersectionObserver.
 * Respects prefers-reduced-motion (the .reveal CSS class also handles this).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      // Use a microtask to defer the state update outside the effect body
      Promise.resolve().then(() => setVisible(true));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (options?.once !== false) obs.unobserve(entry.target);
          } else if (options?.once === false) {
            setVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, visible };
}
