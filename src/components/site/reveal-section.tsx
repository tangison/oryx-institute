'use client';

import { useScrollReveal, useStaggerReveal } from '@/lib/motion';

/**
 * RevealSection — Wrapper that applies scroll reveal motion.
 * Reduced-motion: shows content immediately.
 */
export function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useScrollReveal({ delay });
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={className}>
      {children}
    </section>
  );
}

/**
 * StaggerGrid — Wrapper that stagger-reveals children.
 * Reduced-motion: all children visible immediately.
 */
export function StaggerGrid({
  children,
  className,
  stagger = 80,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useStaggerReveal({ stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
