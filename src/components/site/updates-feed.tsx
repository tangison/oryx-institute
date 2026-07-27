'use client';

import Link from 'next/link';
import { updates } from '@/lib/content';
import { AnimatedStagger } from '@/components/site/animated-section';

/**
 * UpdatesFeed — Professional editorial blog feed widget.
 *
 * Displays update cards with:
 *   - Category badge (colour-coded: Establishment maroon, Programme ink, Public Notice info, Event warning)
 *   - Date in editorial format
 *   - Title with display font
 *   - Excerpt as body text
 *   - Read more link with arrow animation
 *
 * Empty state: honest editorial empty-state with subscribe CTA.
 * Stagger reveal on scroll via AnimatedStagger.
 * Reduced-motion: handled by AnimatedStagger parent.
 */

const categoryConfig: Record<string, { label: string; bg: string; text: string; border?: string }> = {
  Establishment: {
    label: 'Establishment',
    bg: 'bg-[var(--color-brand-maroon)]',
    text: 'text-[var(--color-brand-cream)]',
    border: 'border-[var(--color-brand-maroon)]',
  },
  Programme: {
    label: 'Programme',
    bg: 'bg-[var(--color-brand-ink)]',
    text: 'text-[var(--color-brand-cream)]',
    border: 'border-[var(--color-brand-ink)]',
  },
  'Public Notice': {
    label: 'Public Notice',
    bg: 'bg-[var(--color-info)]',
    text: 'text-white',
    border: 'border-[var(--color-info)]',
  },
  Event: {
    label: 'Event',
    bg: 'bg-[var(--color-warning)]',
    text: 'text-white',
    border: 'border-[var(--color-warning)]',
  },
};

export function UpdatesFeed() {
  if (updates.length === 0) {
    return (
      <div className="border border-[var(--color-border)] bg-white p-12 md:p-16 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-6 border border-[var(--color-border)]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 5V10L13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-3">
          No updates yet.
        </h3>
        <p className="text-[var(--muted-foreground)] max-w-md mx-auto text-pretty">
          Verified institutional updates will appear here as the institution is established.
          No fabricated announcements. No speculation.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById('mailing-list');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="mt-8 btn-secondary"
        >
          Subscribe to Updates
        </button>
      </div>
    );
  }

  return (
    <AnimatedStagger stagger={120} translateY={24} duration={600} threshold={0.08}>
      <div className="space-y-0 divide-y divide-[var(--color-border)]">
        {updates.map((u) => {
          const cat = categoryConfig[u.category] || categoryConfig.Establishment;
          return (
            <article
              key={u.slug}
              className="group py-8 md:py-10 lg:py-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Meta column — date + category badge */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <time
                    className="font-display text-sm md:text-base text-[var(--color-text-secondary)] tracking-[0.02em]"
                    dateTime={u.date}
                  >
                    {u.date}
                  </time>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${cat.bg} ${cat.text} ${cat.border} border`}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Content column — title + excerpt + read more */}
                <div className="lg:col-span-9">
                  <h3 className="font-display text-xl md:text-2xl lg:text-[1.625rem] font-medium leading-[1.15] tracking-[0.02em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 mb-3">
                    <Link href={`/updates/${u.slug}`} className="hover:no-underline">
                      {u.title}
                    </Link>
                  </h3>
                  <p className="text-[0.9375rem] md:text-base leading-[1.65] text-[var(--color-text-secondary)] max-w-[56ch] mb-4 text-pretty">
                    {u.excerpt}
                  </p>
                  <Link
                    href={`/updates/${u.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)]/40 pb-1 hover:border-[var(--color-brand-maroon)] hover:gap-3 transition-[gap,border-color] duration-200"
                  >
                    Read more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </AnimatedStagger>
  );
}

/**
 * UpdateCard — Compact card variant for homepage section.
 * Used by UpdatesSection on the homepage.
 */
export function UpdateCard({ update }: { update: typeof updates[number] }) {
  const cat = categoryConfig[update.category] || categoryConfig.Establishment;

  return (
    <article className="group bg-[var(--color-surface-raised)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-brand-maroon)]/60 transition-colors duration-200 card-hover-lift">
      {/* Top accent line */}
      <div className={`h-[3px] w-full ${cat.bg}`} aria-hidden="true" />
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] ${cat.bg} ${cat.text}`}
          >
            {cat.label}
          </span>
          <time className="font-display text-[0.75rem] text-[var(--color-text-muted)] tracking-[0.04em]" dateTime={update.date}>
            {update.date}
          </time>
        </div>
        <h3 className="font-display text-base md:text-lg font-medium leading-[1.15] tracking-[0.02em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">
          <Link href={`/updates/${update.slug}`} className="hover:no-underline">
            {update.title}
          </Link>
        </h3>
        <p className="text-[0.8125rem] md:text-[0.875rem] leading-[1.55] text-[var(--color-text-secondary)] line-clamp-3 text-pretty">
          {update.excerpt}
        </p>
        <Link
          href={`/updates/${update.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] hover:gap-2.5 transition-[gap] duration-200 mt-1"
        >
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
