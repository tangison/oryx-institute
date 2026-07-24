import Link from 'next/link';
import { primaryNav, secondaryNav, legalNav } from '@/lib/content';
import { OryxLogo } from '@/components/site/oryx-logo';

/**
 * SiteFooter — Premium Collins-style footer.
 *
 * Per the brand spec:
 *   - Logo: official reversed logo lockup on cream footer panel (NOT transparent maroon icon on black)
 *   - Single-column hierarchy followed by compact link groups on mobile
 *   - contact@oryxinstitute.org near the bottom
 *   - CTA strip in maroon
 *   - More visuals, less words
 *   - Clean, intentional, Collins-style restraint
 */

export function SiteFooter() {
  return (
    <footer data-dark-surface>
      {/* CTA strip — maroon background */}
      <div className="bg-[var(--color-brand-maroon)]">
        <div className="container-oryx py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <h2 className="font-display text-xl md:text-[1.75rem] font-medium leading-tight text-balance uppercase tracking-[0.04em] text-[var(--color-brand-cream)]">
            Be part of what is being built.
          </h2>
          <div className="md:justify-self-end">
            <Link href="/register" className="btn-secondary-dark">
              Register Interest
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer — cream background with reversed logo */}
      <div className="bg-[var(--color-brand-cream)]">
        <div className="container-oryx py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand column — reversed logo on cream */}
            <div className="md:col-span-5">
              <div className="mb-6">
                <OryxLogo variant="light" size="compact" linked={false} />
              </div>
              <p className="font-display text-base text-[var(--color-brand-ink)]/80 leading-snug max-w-[34ch]">
                Knowledge shaped by the Namibian landscape.
              </p>
            </div>

            {/* Explore nav */}
            <nav className="md:col-span-3" aria-label="Footer primary">
              <p className="eyebrow text-[var(--color-brand-ink)]/50 mb-4">Explore</p>
              <ul className="space-y-3">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-brand-ink)]/70 hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Institute nav */}
            <nav className="md:col-span-2" aria-label="Footer secondary">
              <p className="eyebrow text-[var(--color-brand-ink)]/50 mb-4">Institute</p>
              <ul className="space-y-3">
                {secondaryNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-brand-ink)]/70 hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Campus visual accent */}
            <div className="md:col-span-2 hidden md:block">
              <div className="aspect-[3/4] overflow-hidden opacity-70">
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

          {/* Legal + Contact + Copyright */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-[var(--color-brand-ink)]/50">
              <span className="status-pill border-[var(--color-brand-ink)]/40 text-[var(--color-brand-ink)]/70 whitespace-nowrap">
                Pre-Launch
              </span>
              <nav aria-label="Footer legal" className="flex flex-wrap gap-x-4 gap-y-1">
                {legalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <a
                href="mailto:contact@oryxinstitute.org"
                className="text-sm text-[var(--color-brand-ink)]/60 hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
              >
                contact@oryxinstitute.org
              </a>
              <p className="text-xs text-[var(--color-brand-ink)]/40">
                &copy; {new Date().getFullYear()} Oryx Institute. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
