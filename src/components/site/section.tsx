import { cn } from '@/lib/utils';

/**
 * Section — consistent vertical rhythm for page sections.
 * padding: py-16 md:py-24 by default. tone switches background.
 */
export function Section({
  children,
  className,
  tone = 'light',
  id,
  as: Tag = 'section',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'cream' | 'dark' | 'maroon';
  id?: string;
  as?: React.ElementType;
}) {
  const bg = {
    light: 'bg-white text-[var(--color-brand-ink)]',
    cream: 'bg-[var(--color-background)] text-[var(--color-brand-ink)]',
    dark: 'bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)]',
    maroon: 'bg-[var(--color-brand-maroon)] text-white',
  }[tone];

  const darkAttr = tone === 'dark' || tone === 'maroon' ? { 'data-dark-surface': '' } : {};

  return (
    <Tag id={id} className={cn('py-16 md:py-24', bg, className)} {...darkAttr}>
      <div className="container-oryx">{children}</div>
    </Tag>
  );
}

/**
 * SectionHeader — eyebrow + display heading + optional lede, for section tops.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark' | 'maroon';
  className?: string;
}) {
  const isDark = tone === 'dark';
  const isMaroon = tone === 'maroon';
  const muted = isDark
    ? 'text-[var(--color-brand-cream)]/75'
    : isMaroon
      ? 'text-white/80'
      : 'text-[var(--muted-foreground)]';
  const eyebrowTone = isDark
    ? 'text-[var(--color-brand-cream)]'
    : isMaroon
      ? 'text-white'
      : 'text-[var(--color-brand-maroon)]';
  const titleTone = isDark
    ? 'text-[var(--color-brand-cream)]'
    : isMaroon
      ? 'text-white'
      : 'text-[var(--color-brand-ink)]';

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-4', eyebrowTone)}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance',
          titleTone
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn('mt-5 text-lg md:text-xl leading-relaxed text-pretty', muted)}>{lede}</p>
      )}
    </div>
  );
}
