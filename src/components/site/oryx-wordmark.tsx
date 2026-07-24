'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * OryxWordmark — The complete institutional wordmark lockup.
 *
 * Specification source: Detailed brand wordmark spec provided by Tangison.
 *
 * Layout (horizontal lockup):
 *   Line 1: ORYX (orange, wide tracking) + ὄρυξ (Greek companion, smaller, same baseline)
 *   Line 2: INSTITUTE (wide tracking, left-aligned with ORYX)
 *   Icon: Supplied logo icon on the right, vertically centred against the entire wordmark block.
 *
 * Typography: Cinzel (approved open-source Trajan Pro 3 fallback).
 * Colour variants: light-background and dark-background.
 *
 * Proportions:
 *   Icon height = 1.00H (reference unit)
 *   Wordmark total height ≈ 0.56H–0.64H
 *   Gap between wordmark and icon ≈ 0.18H–0.25H
 *   Icon remains the tallest element.
 *
 * Strict prohibitions:
 *   - Do not place wordmark to the right of icon.
 *   - Do not stack as three separate lines.
 *   - Do not omit Greek diacritics.
 *   - Do not alter the supplied icon.
 *   - ORYX always in approved orange (#7A0F1E).
 *   - ὄρυξ and INSTITUTE: black on light, white on dark.
 */

type WordmarkVariant = 'light' | 'dark';
type WordmarkSize = 'default' | 'compact' | 'small';

interface OryxWordmarkProps {
  variant?: WordmarkVariant;
  size?: WordmarkSize;
  linked?: boolean;
  className?: string;
}

export function OryxWordmark({
  variant = 'light',
  size = 'default',
  linked = true,
  className,
}: OryxWordmarkProps) {
  const isDark = variant === 'dark';
  const isSmall = size === 'small';

  // "Approved Oryx orange" — sampled from the authoritative supplied wordmark.
  // The logo PNG uses #7A0F1E family; this IS the brand's approved primary
  // that the wordmark spec calls "Oryx orange".
  const oryxOrange = 'var(--color-brand-orange)';

  // Companion text colours per spec
  const companionColor = isDark ? '#FFFFFF' : '#171717';
  const instituteColor = isDark ? '#FFFFFF' : '#171717';

  // Sizes — derived from the icon height as reference unit
  // Default: icon h-16 (64px), wordmark scales proportionally
  // Compact: icon h-12 (48px)
  // Small: icon only (no wordmark)
  const iconHeight = size === 'default' ? 'h-14 md:h-16' : size === 'compact' ? 'h-10 md:h-12' : 'h-8';

  // If small format, show icon alone (spec: "Use the supplied icon alone when
  // the complete wordmark would become unreadable.")
  if (isSmall) {
    const content = (
      <img
        src="/oryx-mark.png"
        alt="Oryx Institute"
        className={cn(iconHeight, 'w-auto')}
        width={173}
        height={226}
      />
    );
    if (linked) {
      return (
        <Link href="/" className={cn('flex items-center', className)} aria-label="Oryx Institute — home">
          {content}
        </Link>
      );
    }
    return <div className={cn('flex items-center', className)}>{content}</div>;
  }

  // Full lockup — wordmark on left, icon on right
  // The wordmark block uses Cinzel with carefully controlled tracking
  const lockupContent = (
    <div className={cn('flex items-center gap-3 md:gap-4', className)}>
      {/* Wordmark block (left side) */}
      <div className="flex flex-col" aria-label="Oryx Institute">
        {/* Line 1: ORYX + ὄρυξ */}
        <div className="flex items-baseline gap-2">
          <span
            className="font-display uppercase text-[var(--color-brand-orange)] leading-none"
            style={{
              fontSize: size === 'default' ? 'clamp(1.125rem, 1.5vw, 1.5rem)' : 'clamp(0.875rem, 1.2vw, 1.125rem)',
              letterSpacing: '0.16em',
              fontWeight: 500,
            }}
          >
            ORYX
          </span>
          <span
            className="font-display leading-none"
            style={{
              fontSize: size === 'default' ? 'clamp(0.54rem, 0.72vw, 0.72rem)' : 'clamp(0.42rem, 0.56vw, 0.56rem)',
              letterSpacing: 'normal',
              fontWeight: 400,
              color: companionColor,
            }}
          >
            ὄρυξ
          </span>
        </div>
        {/* Line 2: INSTITUTE */}
        <span
          className="font-display uppercase leading-none"
          style={{
            fontSize: size === 'default' ? 'clamp(0.78rem, 1.17vw, 1.17rem)' : 'clamp(0.56rem, 0.8vw, 0.78rem)',
            letterSpacing: '0.22em',
            fontWeight: 400,
            color: instituteColor,
            // Optical left-alignment with ORYX's first vertical stroke
            // Slight negative margin to compensate for serif O shape
            marginLeft: '-0.02em',
          }}
        >
          INSTITUTE
        </span>
      </div>

      {/* Supplied icon (right side) — never altered */}
      <img
        src="/oryx-mark.png"
        alt=""
        aria-hidden="true"
        className={cn(iconHeight, 'w-auto flex-shrink-0')}
        width={173}
        height={226}
      />
    </div>
  );

  if (linked) {
    return (
      <Link href="/" className={cn('inline-flex', className)} aria-label="Oryx Institute — home">
        {lockupContent}
      </Link>
    );
  }

  return <div className={cn('inline-flex', className)}>{lockupContent}</div>;
}
