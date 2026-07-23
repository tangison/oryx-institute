import { cn } from '@/lib/utils';

/**
 * Prose — long-form content wrapper for interior pages.
 * Applies consistent typographic rhythm to children.
 * Use for legal text, about pages, founder narrative, etc.
 */
export function Prose({
  children,
  className,
  tone = 'light',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div
      className={cn(
        'space-y-6 leading-relaxed',
        tone === 'dark' ? 'text-[var(--oryx-warm-white)]/85' : 'text-[var(--muted-foreground)]',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * ProseSection — a labelled block within a Prose column.
 * eyebrow + heading + body. The standard editorial unit.
 */
export function ProseSection({
  eyebrow,
  heading,
  children,
  tone = 'light',
}: {
  eyebrow?: string;
  heading?: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <section>
      {eyebrow && (
        <p className={cn('eyebrow mb-3', isDark && 'text-[var(--oryx-warm-white)]/70')}>
          {eyebrow}
        </p>
      )}
      {heading && (
        <p
          className={cn(
            'font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4',
            isDark ? 'text-[var(--oryx-cream)]' : 'text-[var(--oryx-ink)]'
          )}
        >
          {heading}
        </p>
      )}
      <div className={cn('space-y-4 leading-relaxed text-pretty')}>{children}</div>
    </section>
  );
}
