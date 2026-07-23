import { cn } from '@/lib/utils';

/**
 * PageHeader — consistent editorial header for interior pages.
 * Big display headline, optional eyebrow, optional supporting lede, optional rule.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  children?: React.ReactNode;
  className?: string;
}) {
  const isDark = tone === 'dark';
  return (
    <header
      className={cn(
        'relative w-full pt-28 md:pt-36 pb-12 md:pb-20',
        isDark ? 'bg-[var(--oryx-ink)] text-[var(--oryx-cream)]' : 'bg-[var(--color-background)]',
        className
      )}
    >
      <div className="container-oryx">
        <div className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center')}>
          {eyebrow && (
            <p className={cn('eyebrow mb-4', isDark && 'text-[var(--oryx-warm-white)]/70')}>
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance'
            )}
          >
            {title}
          </h1>
          {lede && (
            <p
              className={cn(
                'mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-pretty',
                align === 'center' && 'mx-auto',
                isDark ? 'text-[var(--oryx-warm-white)]/80' : 'text-[var(--muted-foreground)]'
              )}
            >
              {lede}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </header>
  );
}
