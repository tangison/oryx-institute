import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * BackLink — consistent "back to X" navigation at the top of detail pages.
 */
export function BackLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--color-brand-maroon)] transition-colors group',
        className
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        <path d="M13 7H1M1 7L7 13M1 7L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      {label}
    </Link>
  );
}

/**
 * Breadcrumbs — simple inline breadcrumb trail.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-[var(--muted-foreground)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-brand-maroon)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-[var(--color-brand-ink)]' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true" className="text-[var(--color-border)]">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
