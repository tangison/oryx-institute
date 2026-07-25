import { cn } from '@/lib/utils';

/**
 * DynamicHeading — renders the appropriate heading level element.
 * Used by ProseSection to maintain correct heading hierarchy.
 */
function DynamicHeading({
  level,
  className,
  children,
}: {
  level: 'h2' | 'h3' | 'h4';
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = level;
  return <Tag className={className}>{children}</Tag>;
}

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
        tone === 'dark' ? 'text-[var(--color-brand-cream)]/85' : 'text-[var(--muted-foreground)]',
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
  headingLevel = 'h3',
  children,
  tone = 'light',
}: {
  eyebrow?: string;
  heading?: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <section>
      {eyebrow && (
        <p className={cn('eyebrow mb-3', isDark && 'text-[var(--color-brand-cream)]/70')}>
          {eyebrow}
        </p>
      )}
      {heading && (
        <DynamicHeading
          level={headingLevel}
          className={cn(
            'font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4',
            isDark ? 'text-[var(--color-brand-cream)]' : 'text-[var(--color-brand-ink)]'
          )}
        >
          {heading}
        </DynamicHeading>
      )}
      <div className={cn('space-y-4 leading-relaxed text-pretty')}>{children}</div>
    </section>
  );
}
