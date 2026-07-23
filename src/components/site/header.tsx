'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav, secondaryNav } from '@/lib/content';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const solid = scrolled || menuOpen || !isHome;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[var(--z-header)] transition-colors duration-300',
        solid
          ? 'bg-[var(--color-brand-cream)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-oryx flex items-center justify-between h-20 md:h-24">
        {/* Logo — BIG shield icon only, no wordmark text */}
        <Link
          href="/"
          className="flex items-center gap-0"
          aria-label="Oryx Institute — home"
        >
          <img
            src="/oryx-mark.png"
            alt=""
            aria-hidden="true"
            width={173}
            height={226}
            className="h-14 md:h-16 w-auto"
          />
        </Link>

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
            className="hidden md:inline-flex btn-primary text-xs"
          >
            Register Interest
          </Link>
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 md:top-24 bg-[var(--color-brand-cream)] z-40 overflow-y-auto">
          <nav className="container-oryx py-8 flex flex-col" aria-label="Mobile primary">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-4 font-display text-2xl uppercase tracking-wide border-b border-[var(--color-border)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              <p className="eyebrow mb-3">More</p>
              {secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-3 text-base block w-full border-b border-[var(--color-border)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/register" className="mt-8 btn-primary w-full justify-center">
              Register Interest
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
