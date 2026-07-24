import Link from 'next/link';
import { primaryNav, secondaryNav, legalNav } from '@/lib/content';
import { OryxWordmark } from '@/components/site/oryx-wordmark';

/**
 * SiteFooter — Premium Collins-style footer.
 *
 * More visuals, fewer words. Clean, intentional layout.
 * Uses OryxWordmark lockup (wordmark + icon) instead of bare shield mark.
 *
 * Structure:
 * - CTA strip (maroon background, strong visual accent)
 * - Main footer (ink background):
 *   - Brand column (OryxWordmark lockup + tagline)
 *   - Two lean nav columns (Explore + Institute)
 *   - Campus visual accent (small image)
 * - Legal line + copyright
 */

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)]" data-dark-surface>
      {/* CTA strip — maroon background for visual accent */}
      <div className="bg-[var(--color-brand-maroon)]">
        <div className="container-oryx py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <h2 className="font-display text-xl md:text-3xl font-medium leading-tight text-balance uppercase tracking-[0.04em]">
            Be part of what is being built.
          </h2>
          <div className="md:justify-self-end flex flex-wrap gap-3">
            <Link href="/register" className="btn-secondary-dark">
              Register Interest
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-oryx py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand — OryxWordmark lockup + tagline */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <OryxWordmark variant="dark" size="compact" linked={false} />
            </div>
            <p className="font-display text-base text-[var(--color-brand-cream)]/90 leading-snug">
              Knowledge shaped by the Namibian landscape.
            </p>
          </div>

          {/* Explore nav */}
          <nav className="md:col-span-3" aria-label="Footer primary">
            <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-4">Explore</p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-brand-cream)]/80 hover:text-[var(--color-brand-cream)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Institute nav */}
          <nav className="md:col-span-2" aria-label="Footer secondary">
            <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-4">Institute</p>
            <ul className="space-y-3">
              {secondaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-brand-cream)]/80 hover:text-[var(--color-brand-cream)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Campus visual accent */}
          <div className="md:col-span-2 hidden md:block">
            <div className="aspect-square overflow-hidden opacity-60">
              <img
                src="/images/campus/arched-corridor.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Pre-launch notice + Legal */}
        <div className="mt-12 pt-8 border-t border-[var(--color-brand-cream)]/15 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-[var(--color-brand-cream)]/60">
            <span className="status-pill border-[var(--color-brand-cream)]/40 text-[var(--color-brand-cream)]/80 whitespace-nowrap">
              Pre-Launch
            </span>
            <nav aria-label="Footer legal" className="flex flex-wrap gap-x-4 gap-y-1">
              {legalNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[var(--color-brand-cream)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="text-xs text-[var(--color-brand-cream)]/50">
            &copy; {new Date().getFullYear()} Oryx Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
