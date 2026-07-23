'use client';

import { useEffect, useState } from 'react';
import { useModal } from '@/lib/modal-context';
import { primaryNav, partnerNav } from '@/lib/content';

export function SiteHeader() {
  const { open } = useModal();
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

  const goToSection = (target: string, type: 'section' | 'modal') => {
    setMenuOpen(false);
    if (type === 'section') {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      open(target as Parameters<typeof open>[0]);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'bg-[var(--color-oryx-cream)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-oryx flex items-center justify-between h-16 md:h-20">
        {/* Logo lockup */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oryx-maroon)]"
          aria-label="Oryx Institute — home"
        >
          <img
            src="/oryx-logo.png"
            alt="Oryx Institute"
            width={48}
            height={32}
            className="h-8 md:h-10 w-auto"
          />
          <span className="font-display text-base md:text-lg font-medium tracking-tight text-[var(--oryx-ink)]">
            Oryx Institute
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {primaryNav.map((item) => (
            <button
              key={item.label}
              onClick={() => goToSection(item.target, item.type)}
              className="text-sm font-medium text-[var(--oryx-ink)] hover:text-[var(--oryx-maroon)] transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('register-interest');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hidden md:inline-flex btn-primary text-xs uppercase tracking-wider"
          >
            Register Interest
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-[var(--oryx-ink)]"
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
        <div className="lg:hidden fixed inset-0 top-16 bg-[var(--color-oryx-cream)] z-40 overflow-y-auto">
          <nav className="container-oryx py-8 flex flex-col" aria-label="Mobile primary">
            {primaryNav.map((item) => (
              <button
                key={item.label}
                onClick={() => goToSection(item.target, item.type)}
                className="py-4 text-left font-display text-2xl border-b border-[var(--color-border)]"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-8">
              <p className="eyebrow mb-3">Partners and Contact</p>
              {partnerNav.map((item) => (
                <button
                  key={item.modal}
                  onClick={() => {
                    setMenuOpen(false);
                    open(item.modal as Parameters<typeof open>[0]);
                  }}
                  className="py-3 text-left text-base block w-full border-b border-[var(--color-border)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById('register-interest');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="mt-8 btn-primary w-full justify-center"
            >
              Register Interest
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
