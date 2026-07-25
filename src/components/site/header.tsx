'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { primaryNav, secondaryNav } from '@/lib/content';
import { cn } from '@/lib/utils';
import { OryxLogo } from '@/components/site/oryx-logo';

/**
 * SiteHeader — Compact floating institutional navigation.
 *
 * Per the brand spec:
 *   - Desktop: 80-88px height, cream bg (rgba(255,248,239,0.97)), floating with
 *     top offset 16px, side margin clamp(24px,4vw,64px), border + shadow.
 *   - Mobile: 68-72px height, cream bg #FFF8EF, compact logo lockup + 44×44 menu button.
 *   - Scroll state: cream bg with 200ms transition.
 *   - Logo always uses OryxLogo light-background lockup (never changes between scroll states).
 *   - CTA: one restrained maroon action, not oversized outlined box.
 *
 * Offcanvas:
 *   - Right-side panel, width min(92vw, 420px)
 *   - Cream bg, 100dvh, padding 88px 24px 32px
 *   - Focus trap, Escape close, body scroll lock
 *   - Editorial school rows with small images
 *   - 44px minimum touch targets
 */

const offcanvasSchools = [
  { href: '/schools/safety', image: '/images/schools/safety-01.webp', label: 'School of Safety' },
  { href: '/schools/administration', image: '/images/schools/administration-01.webp', label: 'Administration & Commerce' },
  { href: '/schools/hospitality', image: '/images/schools/hospitality-01.webp', label: 'Hospitality & Tourism' },
  { href: '/schools/digital', image: '/images/schools/digital-01.webp', label: 'Information & Digital Skills' },
  { href: '/schools/future', image: '/images/campus/arched-corridor.webp', label: 'Future Schools' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when offcanvas open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close offcanvas on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Focus trap inside offcanvas
  useEffect(() => {
    if (!menuOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', trap);
    // Move focus into panel
    first?.focus();

    return () => document.removeEventListener('keydown', trap);
  }, [menuOpen]);

  // Restore focus to menu button after closing
  useEffect(() => {
    if (!menuOpen) {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ─── Floating header ─── */}
      <header
        className={cn(
          'fixed z-[var(--z-header)] transition-[background-color,box-shadow] duration-200',
          // Desktop: floating with margins
          'lg:top-4 lg:inset-x-0',
          // Mobile: full-width
          'top-0 inset-x-0',
        )}
        style={{
          // Desktop floating margins per spec
          ...(scrolled || pathname !== '/'
            ? {
                background: 'rgba(255, 248, 239, 0.97)',
                boxShadow: scrolled ? '0 8px 30px rgba(23, 23, 23, 0.08)' : 'none',
              }
            : pathname === '/'
              ? {
                  background: 'rgba(255, 248, 239, 0.97)',
                  boxShadow: '0 8px 30px rgba(23, 23, 23, 0.08)',
                }
              : {}),
        }}
      >
        {/* Desktop floating wrapper with margin */}
        <div className="hidden lg:block lg:mx-[clamp(24px,4vw,64px)]">
          <div
            className={cn(
              'flex items-center justify-between h-[84px]',
              'border border-[rgba(23,23,23,0.14)]',
              'bg-[rgba(255,248,239,0.97)]',
            )}
            style={{
              boxShadow: '0 8px 30px rgba(23, 23, 23, 0.08)',
            }}
          >
            {/* Logo — always light-background lockup */}
            <div className="pl-6">
              <OryxLogo variant="light" size="desktop" linked />
            </div>

            {/* Desktop nav — concise, evenly spaced */}
            <nav className="flex items-center gap-8 pr-6" aria-label="Primary">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'text-sm font-semibold tracking-[0.06em] transition-colors duration-200 py-2',
                      'text-[var(--color-brand-ink)] hover:text-[var(--color-brand-maroon)]',
                      active && 'text-[var(--color-brand-maroon)]'
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-brand-maroon)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA — one restrained maroon action */}
            <div className="pr-6">
              <Link
                href="/register"
                className="inline-flex items-center justify-center min-h-[40px] px-5 text-xs font-semibold uppercase tracking-[0.06em] bg-[var(--color-brand-maroon)] text-white border border-[var(--color-brand-maroon)] hover:bg-[var(--color-brand-maroon-dark)] hover:border-[var(--color-brand-maroon-dark)] transition-colors duration-200"
              >
                Register Interest
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile header — full-width, compact */}
        <div
          className={cn(
            'lg:hidden flex items-center justify-between h-[68px]',
            'px-[clamp(12px,3vw,16px)]',
            'bg-[#FFF8EF]',
            'border-b border-[rgba(23,23,23,0.14)]',
          )}
        >
          {/* Logo — compact lockup */}
          <OryxLogo variant="light" size="mobile" linked />

          {/* Menu button — Collins-style: clean three lines, no border, no box */}
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              'inline-flex items-center justify-center w-[44px] h-[44px]',
              'text-[var(--color-brand-ink)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-brand-maroon)]',
            )}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              {menuOpen ? (
                <>
                  <path d="M1 1L21 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M21 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M0 1.5H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M0 7H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M0 12.5H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* ─── Offcanvas backdrop ─── */}
      <div
        className={cn('offcanvas-backdrop', menuOpen && 'is-open')}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ─── Offcanvas panel ─── */}
      <div
        ref={panelRef}
        className={cn('offcanvas-panel', menuOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header — logo + close (at top of padded panel) */}
        <div className="flex items-center justify-between mb-6">
          <OryxLogo variant="light" size="compact" linked={false} />
          <button
            onClick={closeMenu}
            className={cn(
              'inline-flex items-center justify-center w-[44px] h-[44px]',
              'text-[var(--color-brand-ink)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-brand-maroon)]',
            )}
            aria-label="Close navigation"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <path d="M1 1L21 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M21 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* School editorial rows — alternating image-and-title */}
        <div className="pt-4">
          <p className="eyebrow mb-4">Schools</p>
          <div className="space-y-2">
            {offcanvasSchools.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 min-h-[44px] py-2 border-b border-[var(--color-border-subtle)] transition-colors duration-200 hover:bg-[var(--color-surface-alt)]/40"
                onClick={closeMenu}
              >
                {/* Small image */}
                <div className="w-[56px] h-[42px] flex-shrink-0 overflow-hidden bg-[var(--color-brand-ink)]">
                  <img src={item.image} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-200" loading="lazy" />
                </div>
                {/* Title */}
                <span className="font-display text-sm uppercase tracking-[0.06em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Primary nav */}
        <nav className="pt-6" aria-label="Mobile navigation">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="offcanvas-nav-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Secondary nav */}
        <nav className="pt-6" aria-label="Secondary">
          <p className="eyebrow mb-4">Institute</p>
          {secondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="offcanvas-nav-link-secondary"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="pt-8 pb-4 mt-auto">
          <Link
            href="/register"
            className="btn-primary w-full justify-center"
            onClick={closeMenu}
          >
            Register Interest
          </Link>
        </div>

        {/* Contact email */}
        <div>
          <a
            href="mailto:contact@oryxinstitute.org"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand-maroon)] transition-colors duration-200"
          >
            contact@oryxinstitute.org
          </a>
        </div>
      </div>
    </>
  );
}
