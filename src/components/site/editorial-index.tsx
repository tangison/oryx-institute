import Link from 'next/link';

/**
 * EditorialIndex — Collins-style "table of contents" navigation.
 * Each entry is a single idea, a single destination. No clustering, no cards.
 * The list IS the design.
 */
export interface IndexEntry {
  number: string;
  title: string;
  blurb: string;
  href: string;
  status?: string;
}

export function EditorialIndex({ entries }: { entries: IndexEntry[] }) {
  return (
    <ol className="divide-y divide-[var(--color-border)]" role="list">
      {entries.map((entry) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="group grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-6 py-7 sm:py-9 items-baseline transition-colors duration-200 hover:bg-[var(--color-surface-alt)]/40 -mx-3 px-3 sm:-mx-5 sm:px-5"
          >
            <span className="font-display text-sm sm:text-base tabular-nums tracking-[0.08em] text-[var(--color-text-muted)]">
              {entry.number}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl sm:text-2xl md:text-[1.75rem] leading-[1.15] tracking-[0.02em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">
                {entry.title}
              </span>
              <span className="mt-2 block max-w-[52ch] text-[0.9375rem] leading-[1.6] text-[var(--color-text-secondary)]">
                {entry.blurb}
              </span>
              {entry.status && (
                <span className="mt-2 inline-block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-maroon)]">
                  {entry.status}
                </span>
              )}
            </span>
            <span
              aria-hidden="true"
              className="self-center text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-maroon)] group-hover:translate-x-1 transition-[color,transform] duration-200"
            >
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                <path
                  d="M1 7H21M21 7L15 1M21 7L15 13"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
