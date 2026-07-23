import Link from 'next/link';
import { primaryNav, secondaryNav, partnerNav, legalNav } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)]" data-dark-surface>
      {/* CTA strip */}
      <div className="border-b border-[var(--color-brand-cream)]/15">
        <div className="container-oryx py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-medium leading-tight text-balance uppercase tracking-[0.04em]">
              Be part of what is being built.
            </h2>
            <p className="mt-3 text-[var(--color-brand-cream)]/75 text-pretty">
              Register your interest. We will contact you when admissions open.
            </p>
          </div>
          <div className="md:justify-self-end flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Register Interest
            </Link>
            <Link
              href="/contact"
              className="btn-secondary hero-secondary-btn"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-oryx py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand — BIG shield icon, no wordmark text */}
          <div className="md:col-span-4">
            <div className="mb-5">
              <img
                src="/oryx-mark.png"
                alt=""
                aria-hidden="true"
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed text-pretty">
              A multidisciplinary vocational education and training institution being established in
              Windhoek, Namibia. Pre-launch. All programmes planned and subject to approval.
            </p>
            <p className="mt-6 font-body text-base text-[var(--color-brand-cream)]/90">
              Knowledge shaped by the Namibian landscape.
            </p>
          </div>

          {/* Primary nav */}
          <nav className="md:col-span-2" aria-label="Footer primary">
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

          {/* Secondary */}
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

          {/* Partners */}
          <nav className="md:col-span-2" aria-label="Footer partners">
            <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-4">Partners</p>
            <ul className="space-y-3">
              {partnerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-brand-cream)]/80 hover:text-[var(--color-brand-cream)] transition-colors text-left"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="md:col-span-2" aria-label="Footer legal">
            <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-4">Legal</p>
            <ul className="space-y-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-brand-cream)]/80 hover:text-[var(--color-brand-cream)] transition-colors text-left"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Pre-launch notice */}
        <div className="mt-12 pt-8 border-t border-[var(--color-brand-cream)]/15">
          <div className="flex flex-col md:flex-row md:items-start gap-4 text-sm text-[var(--color-brand-cream)]/60">
            <p className="flex-1 leading-relaxed text-pretty">
              Oryx Institute is being established. Programmes are planned and subject to approval.
              No accreditation, registration number, campus address, fees, or intake dates are
              claimed until verified.
            </p>
            <span className="status-pill border-[var(--color-brand-cream)]/40 text-[var(--color-brand-cream)]/80 whitespace-nowrap">
              Pre-Launch
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-brand-cream)]/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-[var(--color-brand-cream)]/50">
          <p>&copy; {new Date().getFullYear()} Oryx Institute. All rights reserved.</p>
          <p>
            Made by{' '}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-cream)] hover:text-white underline-offset-4 hover:underline"
            >
              Tangison Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
