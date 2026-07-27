'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedSection — Client wrapper that applies scroll-triggered reveal animation
 * to page sections. Works alongside the server-component Section.
 *
 * Motion hierarchy (per motion.ts):
 *   1. Reveal — sections, cards, headings appear on scroll (CSS transition)
 *   2. Emphasise — hover states, active states (handled by CSS)
 *   3. Transition — page-level transitions (not in this component)
 *   4. Storytelling — GSAP ScrollTrigger for narrative sequences
 *
 * Reduced-motion: all animations disabled, elements visible immediately.
 * Performance budget: ≤2 concurrent tweens, ≤5 anime instances per view.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  translateY = 24,
  duration = 600,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  translateY?: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

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
    // Brand easing: cubic-bezier(0.2, 0, 0, 1) matches --ease-standard token
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
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

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * AnimatedStagger — Client wrapper that stagger-reveals children on scroll.
 * Used for school lists, programme cards, value items, glossary entries.
 */
export function AnimatedStagger({
  children,
  className,
  stagger = 80,
  translateY = 20,
  duration = 500,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  translateY?: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

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
      // Brand easing: cubic-bezier(0.2, 0, 0, 1) matches --ease-standard token
      (children[i] as HTMLElement).style.transition = `opacity ${duration}ms cubic-bezier(0.2, 0, 0, 1) ${i * stagger}ms, transform ${duration}ms cubic-bezier(0.2, 0, 0, 1) ${i * stagger}ms`;
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

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * AnimatedHeader — Client wrapper for page headers with GSAP ScrollTrigger fade-in.
 * Lazy-loads GSAP only when needed. Used for ImagePageHeader wrappers.
 */
export function AnimatedHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    // Simple CSS reveal for header (GSAP reserved for storytelling only)
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    // Brand easing: cubic-bezier(0.2, 0, 0, 1) matches --ease-standard token
    el.style.transition = 'opacity 800ms cubic-bezier(0.2, 0, 0, 1) 200ms, transform 800ms cubic-bezier(0.2, 0, 0, 1) 200ms';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
