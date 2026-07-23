'use client';

import { useReveal } from '@/hooks/use-reveal';

/**
 * Section wrapper that handles consistent vertical rhythm and reveal animation.
 */
export function Section({
  id,
  eyebrow,
  headline,
  intro,
  tone = 'light',
  children,
  className = '',
}: {
  id?: string;
  eyebrow?: string;
  headline?: string;
  intro?: string;
  tone?: 'light' | 'cream' | 'ink' | 'sand' | 'maroon';
  children?: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const toneClass =
    tone === 'cream'
      ? 'bg-[var(--color-oryx-cream)]'
      : tone === 'ink'
        ? 'bg-[var(--oryx-ink)] text-[var(--oryx-cream)]'
        : tone === 'sand'
          ? 'bg-[var(--oryx-warm-white)]'
          : tone === 'maroon'
            ? 'bg-[var(--oryx-maroon)] text-white'
            : 'bg-white';

  const eyebrowColor =
    tone === 'ink' || tone === 'maroon'
      ? 'text-[var(--oryx-warm-white)]'
      : 'text-[var(--oryx-maroon)]';

  return (
    <section
      id={id}
      className={`${toneClass} py-20 md:py-28 lg:py-32 ${className}`}
    >
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        {(eyebrow || headline || intro) && (
          <header className="max-w-3xl mb-12 md:mb-16">
            {eyebrow && (
              <p className={`eyebrow mb-4 ${eyebrowColor}`}>{eyebrow}</p>
            )}
            {headline && (
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
                {headline}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-6 text-base md:text-lg leading-relaxed ${
                  tone === 'ink' || tone === 'maroon'
                    ? 'text-[var(--oryx-warm-white)]/90'
                    : 'text-[var(--muted-foreground)]'
                } text-pretty`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
