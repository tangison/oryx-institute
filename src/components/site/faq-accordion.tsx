'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/lib/content';

/**
 * OryxFaqAccordion — Custom accordion widget for FAQ sections.
 *
 * Design principles (per tangison-widget-master):
 *   - Rectilinear: max 4px radius, no blobs
 *   - Brand colours: maroon accent, ink text, cream surface
 *   - Clean reveal animation: smooth open/close, no bounce
 *   - WCAG AA: proper button semantics, aria-expanded, keyboard support
 *   - Reduced-motion: instant toggle, no animation
 *
 * Each item is a collapsible panel with:
 *   - Question as trigger button (display font, uppercase tracking)
 *   - Answer revealed on click/Enter/Space
 *   - Thin maroon left border on open items
 *   - Plus/minus toggle icon (not chevron, per brand rectilinear style)
 */

export function OryxFaqAccordion({ items }: { items: FaqItem[] }) {
  // Track which items are open — single item can be open at a time per category
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]" role="list">
      {items.map((item) => {
        const isOpen = openSlug === item.slug;
        return (
          <div
            key={item.slug}
            role="listitem"
            className={cn(
              'transition-colors duration-200',
              isOpen && 'bg-[var(--color-surface-alt)]/40'
            )}
          >
            {/* Trigger button */}
            <button
              onClick={() => setOpenSlug(isOpen ? null : item.slug)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.slug}`}
              className={cn(
                'w-full flex items-start justify-between gap-4 py-5 md:py-6 px-0 text-left',
                'group transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-maroon)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-cream)]'
              )}
            >
              <h2 className="font-display text-[0.9375rem] md:text-[1.0625rem] font-medium leading-[1.35] tracking-[0.02em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">
                {item.question}
              </h2>
              {/* Toggle icon — plus/minus, rectilinear */}
              <span
                className={cn(
                  'flex-shrink-0 w-[28px] h-[28px] flex items-center justify-center',
                  'border border-[var(--color-border)]',
                  'text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] group-hover:border-[var(--color-brand-maroon)]',
                  'transition-colors duration-200 mt-0.5'
                )}
                aria-hidden="true"
              >
                {isOpen ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    <path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                )}
              </span>
            </button>

            {/* Answer panel — revealed with CSS transition */}
            <div
              id={`faq-answer-${item.slug}`}
              role="region"
              aria-labelledby={item.slug}
              className={cn(
                'faq-answer-panel',
                isOpen ? 'is-open' : 'is-closed'
              )}
            >
              <div className="pb-5 md:pb-6 pr-[32px]">
                {/* Thin maroon left accent when open */}
                <div className={cn(
                  'border-l-[3px] pl-4 md:pl-5 transition-colors duration-200',
                  isOpen ? 'border-[var(--color-brand-maroon)]' : 'border-transparent'
                )}>
                  <p className="text-[0.9375rem] md:text-base leading-[1.65] text-[var(--color-text-secondary)] text-pretty">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
