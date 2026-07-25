'use client';

import { useEffect, useRef } from 'react';

/**
 * Motion system for Oryx Institute.
 *
 * Uses CSS + IntersectionObserver as the primary reveal engine.
 * Anime.js (v3) loaded lazily for stagger choreography.
 * GSAP ScrollTrigger loaded lazily for advanced scroll-driven storytelling.
 *
 * Purpose hierarchy:
 *   1. Reveal — sections, cards, headings appear on scroll
 *   2. Emphasise — hover states, active states, micro-interactions
 *   3. Transition — page-level and panel transitions
 *   4. Storytelling — scroll-driven narrative sequences
 *
 * Reduced motion: all animations disabled, elements visible immediately.
 * Performance budget: ≤2 concurrent tweens, ≤5 anime instances per view.
 */

// ─── Primary: CSS + IntersectionObserver reveal ─── //

/**
 * useScrollReveal — Fade-in and slide-up on scroll using CSS transitions.
 * No external library dependency for simple reveals.
 */
export function useScrollReveal(options?: {
  translateY?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const translateY = options?.translateY ?? 24;
  const duration = options?.duration ?? 600;
  const delay = options?.delay ?? 0;
  const threshold = options?.threshold ?? 0.15;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transform = `translateY(${translateY}px)`;
    el.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            // Trigger CSS transition
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [translateY, duration, delay, threshold]);

  return ref;
}

/**
 * useStaggerReveal — Staggered reveal for list/grid children using CSS.
 */
export function useStaggerReveal(options?: {
  stagger?: number;
  translateY?: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const stagger = options?.stagger ?? 80;
  const translateY = options?.translateY ?? 20;
  const duration = options?.duration ?? 500;
  const threshold = options?.threshold ?? 0.1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).style.opacity = '1';
        (children[i] as HTMLElement).style.transform = 'translateY(0)';
      }
      return;
    }

    // Set initial hidden state for children
    const children = el.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLElement).style.opacity = '0';
      (children[i] as HTMLElement).style.transform = `translateY(${translateY}px)`;
      (children[i] as HTMLElement).style.transition = `opacity ${duration}ms ease-out ${i * stagger}ms, transform ${duration}ms ease-out ${i * stagger}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            for (let i = 0; i < children.length; i++) {
              (children[i] as HTMLElement).style.opacity = '1';
              (children[i] as HTMLElement).style.transform = 'translateY(0)';
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [stagger, translateY, duration, threshold]);

  return ref;
}

// ─── Advanced: GSAP ScrollTrigger for storytelling ─── //

/**
 * useSectionFade — Subtle parallax fade for sections using GSAP.
 * Lazy-loaded only when GSAP is needed.
 */
export function useSectionFade() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Lazy-load GSAP
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          el,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 40%',
            },
          }
        );
      });
    });
  }, []);

  return ref;
}

// ─── Anime.js choreography (lazy-loaded) ─── //

/**
 * animeTimeline — Create a controlled Anime.js timeline for choreography.
 * Lazy-loaded. Used for: logo reveal, modal transitions.
 */
export async function animeTimeline(
  targets: string | Element | Element[],
  steps: Record<string, unknown>[]
) {
  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  if (mq?.matches) return;

  const animeMod = await import('animejs');
  const anime = animeMod.default;
  const tl = anime.timeline({ easing: 'easeOutCubic' });
  steps.forEach((step) => {
    tl.add({ targets, ...step });
  });
  return tl;
}

/**
 * Refresh ScrollTrigger calculations after layout changes.
 * Not a hook — just a function. Lazy-loads GSAP when called.
 */
export function refreshScrollTriggers() {
  if (typeof window !== 'undefined') {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }
}
