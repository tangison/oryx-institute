'use client';

import { useModal } from '@/lib/modal-context';
import { legalNav, partnerNav, primaryNav } from '@/lib/content';

export function SiteFooter() {
  const { open } = useModal();

  const goToSection = (target: string, type: 'section' | 'modal') => {
    if (type === 'section') {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      open(target as Parameters<typeof open>[0]);
    }
  };

  return (
    <footer className="bg-[var(--oryx-ink)] text-[var(--oryx-cream)]">
      {/* CTA strip */}
      <div className="border-b border-[var(--oryx-warm-white)]/15">
        <div className="container-oryx py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-medium leading-tight text-balance">
              Be part of what is being built.
            </h2>
            <p className="mt-3 text-[var(--oryx-warm-white)]/75 text-pretty">
              Register your interest. We will contact you when admissions open.
            </p>
          </div>
          <div className="md:justify-self-end flex flex-wrap gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('register-interest');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-primary"
            >
              Register Interest
            </button>
            <button
              onClick={() => open('contact')}
              className="btn-secondary"
              style={{ color: 'var(--oryx-cream)', borderColor: 'var(--oryx-cream)' }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-oryx py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/oryx-logo.png"
                alt="Oryx Institute"
                className="h-10 w-auto"
              />
              <span className="font-display text-lg font-medium">Oryx Institute</span>
            </div>
            <p className="text-sm text-[var(--oryx-warm-white)]/70 leading-relaxed text-pretty">
              A multidisciplinary vocational education and training institution being established in
              Windhoek, Namibia. Pre-launch. All programmes planned and subject to approval.
            </p>
            <p className="mt-6 font-display text-base italic text-[var(--oryx-warm-white)]/90">
              Knowledge shaped by the Namibian landscape.
            </p>
          </div>

          {/* Primary nav */}
          <nav className="md:col-span-3" aria-label="Footer primary">
            <p className="eyebrow text-[var(--oryx-warm-white)]/60 mb-4">Explore</p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => goToSection(item.target, item.type)}
                    className="text-sm text-[var(--oryx-warm-white)]/80 hover:text-[var(--oryx-cream)] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Partners */}
          <nav className="md:col-span-3" aria-label="Footer partners">
            <p className="eyebrow text-[var(--oryx-warm-white)]/60 mb-4">Partners</p>
            <ul className="space-y-3">
              {partnerNav.map((item) => (
                <li key={item.modal}>
                  <button
                    onClick={() => open(item.modal as Parameters<typeof open>[0])}
                    className="text-sm text-[var(--oryx-warm-white)]/80 hover:text-[var(--oryx-cream)] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="md:col-span-2" aria-label="Footer legal">
            <p className="eyebrow text-[var(--oryx-warm-white)]/60 mb-4">Legal</p>
            <ul className="space-y-3">
              {legalNav.map((item) => (
                <li key={item.modal}>
                  <button
                    onClick={() => open(item.modal as Parameters<typeof open>[0])}
                    className="text-sm text-[var(--oryx-warm-white)]/80 hover:text-[var(--oryx-cream)] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Pre-launch notice */}
        <div className="mt-12 pt-8 border-t border-[var(--oryx-warm-white)]/15">
          <div className="flex flex-col md:flex-row md:items-start gap-4 text-sm text-[var(--oryx-warm-white)]/60">
            <p className="flex-1 leading-relaxed text-pretty">
              Oryx Institute is being established. Programmes are planned and subject to approval.
              No accreditation, registration number, campus address, fees, or intake dates are
              claimed until verified.
            </p>
            <span className="status-pill border-[var(--oryx-warm-white)]/40 text-[var(--oryx-warm-white)]/80 whitespace-nowrap">
              Pre-Launch
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--oryx-warm-white)]/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-[var(--oryx-warm-white)]/50">
          <p>&copy; {new Date().getFullYear()} Oryx Institute. All rights reserved.</p>
          <p>
            Made by{' '}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--oryx-warm-white)] hover:text-[var(--oryx-cream)] underline-offset-4 hover:underline"
            >
              Tangison Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
