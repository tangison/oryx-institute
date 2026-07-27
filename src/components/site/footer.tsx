import Link from 'next/link';
import { primaryNav, secondaryNav, legalNav } from '@/lib/content';
import { OryxLogo } from '@/components/site/oryx-logo';

/**
 * SiteFooter — Ultra-minimalistic mobile, editorial desktop.
 *
 * Mobile: logo + tagline + email + copyright only. No nav columns.
 * Desktop: reversed logo + explore nav + institute nav + campus accent + legal bar.
 * Collins-style restraint throughout. No CTA strip (homepage section handles that).
 */

export function SiteFooter() {
  return (
    <footer data-dark-surface>
      <div className="bg-[var(--color-brand-cream)]">
        {/* ─── Desktop footer (hidden on mobile) ─── */}
        <div className="hidden md:block">
          <div className="container-oryx py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
              {/* Brand column — reversed logo on cream */}
              <div className="md:col-span-5">
                <div className="mb-6">
                  <OryxLogo variant="light" size="compact" linked={false} />
                </div>
                <p className="font-display text-base text-[var(--color-brand-ink)]/80 leading-snug max-w-[34ch]">
                  Knowledge shaped by Namibia's working realities.
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
              <div className="md:col-span-2">
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
            <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-row items-start justify-between gap-4">
              <div className="flex flex-row items-center gap-4 text-sm text-[var(--color-brand-ink)]/50">
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
              <div className="flex flex-col items-end gap-2">
                <a
                  href="mailto:contact@oryxinstitute.org"
                  className="text-sm text-[var(--color-brand-ink)]/60 hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
                >
                  contact@oryxinstitute.org
                </a>
                <p className="text-xs text-[var(--color-brand-ink)]/40">
                  &copy; {new Intl.DateTimeFormat('en-NA', { year: 'numeric' }).format(new Date())} Oryx Institute.{' '}
                  <a
                    href="https://studio.tangison.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand-ink)]/50 hover:text-[var(--color-brand-maroon)] underline-offset-4 hover:underline transition-colors duration-200"
                    translate="no"
                  >
                    Made by Tangison Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile footer (ultra-minimalistic) ─── */}
        <div className="md:hidden">
          <div className="px-[clamp(12px,3vw,16px)] pt-10 pb-8">
            {/* Logo */}
            <div className="mb-4">
              <OryxLogo variant="light" size="mobile" linked={false} />
            </div>

            {/* Tagline */}
            <p className="font-display text-sm text-[var(--color-brand-ink)]/60 leading-snug max-w-[30ch] mb-6">
              Knowledge shaped by Namibia's working realities.
            </p>

            {/* Thin separator */}
            <div className="border-t border-[var(--color-border)] mb-5" />

            {/* Single compact row: email + legal */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contact@oryxinstitute.org"
                className="text-xs text-[var(--color-brand-ink)]/50 hover:text-[var(--color-brand-maroon)] transition-colors"
              >
                contact@oryxinstitute.org
              </a>
              <div className="flex flex-wrap gap-x-3 text-xs text-[var(--color-brand-ink)]/40">
                {legalNav.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-[var(--color-brand-maroon)] transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
              <p className="text-[10px] text-[var(--color-brand-ink)]/30 mt-2">
                &copy; {new Intl.DateTimeFormat('en-NA', { year: 'numeric' }).format(new Date())} Oryx Institute.{' '}
                <a
                  href="https://studio.tangison.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-brand-maroon)] underline-offset-2 hover:underline transition-colors"
                  translate="no"
                >
                  Made by Tangison Studio
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
