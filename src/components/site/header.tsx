'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { primaryNav, secondaryNav } from '@/lib/content';
import { cn } from '@/lib/utils';
import { OryxWordmark } from '@/components/site/oryx-wordmark';

/**
 * SiteHeader — Premium navigation with Collins-style offcanvas panel.
 *
 * Features:
 * - OryxWordmark lockup (wordmark + icon) replaces bare shield mark.
 * - Desktop: horizontal nav with clean typography.
 * - Mobile/tablet: premium offcanvas slide-from-right panel with
 *   visual-driven navigation (school/programme images), Collins-style restraint.
 * - Scroll-aware transparency (transparent on homepage hero, solid otherwise).
 * - Escape key closes offcanvas.
 * - Focus trap within offcanvas when open.
 */

// Visual items for the offcanvas — school thumbnails with links
const offcanvasVisuals = [
  { href: '/schools/safety', image: '/images/schools/safety-01.webp', label: 'School of Safety' },
  { href: '/schools/administration', image: '/images/schools/administration-01.webp', label: 'Administration & Commerce' },
  { href: '/schools/hospitality', image: '/images/schools/hospitality-01.webp', label: 'Hospitality & Service' },
  { href: '/schools/digital', image: '/images/schools/digital-01.webp', label: 'Digital & Technology' },
  { href: '/schools/future', image: '/images/campus/arched-corridor.webp', label: 'Future Skills' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const isHome = pathname === '/';
  const solid = scrolled || menuOpen || !isHome;

  // Determine wordmark variant based on header background
  const wordmarkVariant = solid ? 'light' : 'dark';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[var(--z-header)] transition-colors duration-300',
          solid
            ? 'bg-[var(--color-brand-cream)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-transparent'
        )}
      >
        <div className="container-oryx flex items-center justify-between h-20 md:h-24">
          {/* Logo — OryxWordmark lockup */}
          <OryxWordmark variant={wordmarkVariant} size="default" linked />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-sm font-semibold tracking-wide transition-colors relative py-2',
                    solid
                      ? 'text-[var(--color-brand-ink)] hover:text-[var(--color-brand-maroon)]'
                      : 'text-[var(--color-brand-cream)] hover:text-white',
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

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className={cn(
                'hidden md:inline-flex btn-primary text-xs',
                !solid && 'hero-secondary-btn'
              )}
            >
              Register Interest
            </Link>

            {/* Menu toggle — hamburger / close */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'lg:hidden inline-flex items-center justify-center w-11 h-11 border',
                solid
                  ? 'border-[var(--color-brand-ink)] text-[var(--color-brand-ink)]'
                  : 'border-[var(--color-brand-cream)] text-[var(--color-brand-cream)]'
              )}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                ) : (
                  <>
                    <path d="M2 5H16" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 13H16" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Offcanvas panel ─── */}
      {/* Backdrop */}
      <div
        className={cn('offcanvas-backdrop', menuOpen && 'is-open')}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn('offcanvas-panel', menuOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="h-full flex flex-col">
          {/* Panel header — wordmark + close */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--color-border)]">
            <OryxWordmark variant="light" size="compact" linked={false} />
            <button
              onClick={closeMenu}
              className="inline-flex items-center justify-center w-11 h-11 border border-[var(--color-brand-ink)] text-[var(--color-brand-ink)]"
              aria-label="Close navigation"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          {/* Visual showcase — school thumbnails */}
          <div className="px-6 pt-6">
            <p className="eyebrow mb-4">Schools</p>
            <div className="grid grid-cols-2 gap-3">
              {offcanvasVisuals.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="offcanvas-visual-card group"
                  onClick={closeMenu}
                >
                  <img src={item.image} alt={item.label} loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-[var(--color-brand-ink)]/80 to-transparent">
                    <span className="text-[0.625rem] font-display uppercase tracking-[0.08em] text-[var(--color-brand-cream)] leading-tight">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/schools"
              className="mt-3 block text-center font-display text-xs uppercase tracking-[0.08em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-all duration-200"
              onClick={closeMenu}
            >
              All Schools →
            </Link>
          </div>

          {/* Primary nav */}
          <nav className="px-6 pt-6" aria-label="Primary">
            <p className="eyebrow mb-4">Explore</p>
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
          <nav className="px-6 pt-6" aria-label="Secondary">
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
          <div className="px-6 pt-8 pb-6 mt-auto">
            <Link
              href="/register"
              className="btn-primary w-full justify-center"
              onClick={closeMenu}
            >
              Register Interest
            </Link>
          </div>

          {/* Pre-launch notice */}
          <div className="px-6 pb-6">
            <span className="status-pill status-planned">Pre-Launch</span>
          </div>
        </div>
      </div>
    </>
  );
}
