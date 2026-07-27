'use client';

import Link from 'next/link';
import { updates } from '@/lib/content';
import { UpdateCard } from '@/components/site/updates-feed';
import { AnimatedStagger } from '@/components/site/animated-section';

/**
 * UpdatesSection — Homepage editorial updates feed.
 *
 * Shows the latest update cards in a responsive grid with:
 *   - Section header with eyebrow + headline + link
 *   - Stagger-revealed UpdateCard grid
 *   - View all updates link
 *
 * If no updates exist, shows honest empty state.
 * Reduced-motion: handled by AnimatedStagger parent.
 */

export function UpdatesSection() {
  if (updates.length === 0) {
    return (
      <section id="updates" className="border-t border-[var(--color-border)] bg-[var(--color-brand-cream)]">
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          <header className="max-w-3xl mb-12 md:mb-16">
            <p className="eyebrow mb-4">Updates</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              The establishment journey.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              Verified institutional updates will appear here as the institution is established.
              No fabricated announcements. No speculation.
            </p>
          </header>
          <div className="border border-[var(--color-border)] bg-white p-12 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 border border-[var(--color-border)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 5V10L13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
            </div>
            <p className="font-display text-2xl md:text-3xl font-medium leading-tight mb-3">No updates yet.</p>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto text-pretty">
              Updates will appear here as the institution reaches milestones. Register your interest to be informed.
            </p>
            <Link href="/register" className="mt-8 btn-primary">Register Interest</Link>
          </div>
        </div>
      </section>
    );
  }

  // Show the 4 most recent updates
  const latestUpdates = updates.slice(0, 4);

  return (
    <section id="updates" aria-labelledby="updates-heading" className="border-t border-[var(--color-border)] bg-[var(--color-brand-cream)]">
      <div className="container-oryx py-14 md:py-20 lg:py-24">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="eyebrow mb-3">Updates</p>
            <h2
              id="updates-heading"
              className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05]"
            >
              The establishment journey
            </h2>
          </div>
          <Link
            href="/updates"
            className="hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-[gap] duration-200"
          >
            All Updates <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Update cards grid — stagger reveal */}
        <AnimatedStagger stagger={100} translateY={20} duration={500} threshold={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {latestUpdates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        </AnimatedStagger>

        {/* View all — mobile */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/updates"
            className="group flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] hover:gap-3 transition-[gap] duration-200"
          >
            All Updates <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
