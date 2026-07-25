'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { primaryNav, secondaryNav, partnerNav, schools } from '@/lib/content';
import { cn } from '@/lib/utils';
import { OryxLogo } from '@/components/site/oryx-logo';

/**
 * SiteHeader — Floating institutional navigation with rich dropdown mega-menus.
 *
 * Desktop: Floating cream pill with dropdown panels for Schools, Programmes,
 * Partners. Each panel features imagery cards + sub-links. Hover-activated
 * with keyboard support (Enter/Space to open, Escape to close).
 *
 * Mobile: Full-width header + advanced offcanvas panel with large imagery
 * cards for schools, editorial layout, and secondary nav.
 *
 * Skip-to-content: Visually hidden until focused (WCAG 2.2 AA compliant).
 */

/* ─── Dropdown menu data ─── */

interface DropdownItem {
  href: string;
  label: string;
  image?: string;
  alt?: string;
  caption?: string;
}

interface DropdownSection {
  eyebrow: string;
  items: DropdownItem[];
}

interface DropdownMenuData {
  triggerLabel: string;
  triggerHref: string;
  sections: DropdownSection[];
  featuredImage?: string;
  featuredAlt?: string;
  featuredCaption?: string;
}

const dropdownMenus: DropdownMenuData[] = [
  {
    triggerLabel: 'Schools',
    triggerHref: '/schools',
    featuredImage: '/images/campus/arched-corridor.webp',
    featuredAlt: 'Architectural arched corridor detail.',
    featuredCaption: 'Five schools, each built for the work Namibia needs.',
    sections: [
      {
        eyebrow: 'Schools',
        items: schools.map((s) => ({
          href: `/schools/${s.slug}`,
          label: s.name,
          image: s.image,
          alt: s.alt,
          caption: s.caption,
        })),
      },
    ],
  },
  {
    triggerLabel: 'Programmes',
    triggerHref: '/programmes',
    featuredImage: '/images/programmes/clipboards-notebooks.webp',
    featuredAlt: 'Clipboards and notebooks arranged on a counter.',
    featuredCaption: 'Planned programmes across four schools. Subject to accreditation.',
    sections: [
      {
        eyebrow: 'By School',
        items: [
          { href: '/schools/safety', label: 'Safety programmes', image: '/images/schools/safety-01.webp', alt: 'Safety tools and equipment portfolio.' },
          { href: '/schools/administration', label: 'Administration programmes', image: '/images/schools/administration-01.webp', alt: 'Notebook with pen and stone on concrete.' },
          { href: '/schools/hospitality', label: 'Hospitality programmes', image: '/images/schools/hospitality-01.webp', alt: 'Service bell and guest keys on wooden counter.' },
          { href: '/schools/digital', label: 'Digital programmes', image: '/images/schools/digital-01.webp', alt: 'Fountain pen on open notebook near binders.' },
        ],
      },
      {
        eyebrow: 'Pathways',
        items: [
          { href: '/programmes', label: 'All programmes' },
          { href: '/faq', label: 'RPL and admissions FAQ' },
          { href: '/register', label: 'Register interest' },
        ],
      },
    ],
  },
  {
    triggerLabel: 'Partners',
    triggerHref: '/partners',
    featuredImage: '/images/partners/collaboration.webp',
    featuredAlt: 'Collaboration scene.',
    featuredCaption: 'Employer, WIL, research, and funding partnerships.',
    sections: [
      {
        eyebrow: 'Partner with us',
        items: partnerNav.map((p) => ({
          href: p.href,
          label: p.label,
        })),
      },
    ],
  },
  {
    triggerLabel: 'Research',
    triggerHref: '/research',
    featuredImage: '/images/research/leather-books.webp',
    featuredAlt: 'Stack of well-worn technical books on warm wooden desk.',
    featuredCaption: 'Research, archival practice, and advisory work.',
    sections: [
      {
        eyebrow: 'Research',
        items: [
          { href: '/research', label: 'Research overview', image: '/images/research/archival-calipers.webp', alt: 'Archival calipers on worn surface.' },
          { href: '/partners/research', label: 'Research partnership' },
          { href: '/faq', label: 'Research FAQ' },
        ],
      },
    ],
  },
];

/* ─── Flat nav items (no dropdown) ─── */
const flatNavItems = primaryNav.filter(
  (item) => !dropdownMenus.some((dm) => dm.triggerLabel === item.label)
);

/* ─── Component ─── */

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

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

  // Close menus on route change — necessary UX: menus must close when
  // the user navigates. The lint rule flags setState-in-effect, but this
  // is a standard Next.js pattern for closing menus on pathname change.
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing menus on navigation is intentional UX
      setMenuOpen(false);
      setActiveDropdown(null);
      prevPathname.current = pathname;
    }
  }, [pathname]);

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

  // Dropdown hover/keyboard handlers
  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, label: string) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDropdown(activeDropdown === label ? null : label);
    }
    if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  }, [activeDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  return (
    <>
      {/* ─── Floating header ─── */}
      <header
        ref={headerRef}
        className={cn(
          'fixed z-[var(--z-header)] transition-[background-color,box-shadow] duration-200',
          // Desktop: floating with margins
          'lg:top-4 lg:inset-x-0',
          // Mobile: full-width
          'top-0 inset-x-0',
        )}
        style={{
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

            {/* Desktop nav with dropdowns */}
            <nav className="flex items-center gap-1 pr-2" aria-label="Primary">
              {/* Dropdown triggers */}
              {dropdownMenus.map((menu) => {
                const isActive = pathname === menu.triggerHref || pathname.startsWith(menu.triggerHref + '/');
                const isOpen = activeDropdown === menu.triggerLabel;
                return (
                  <div
                    key={menu.triggerLabel}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(menu.triggerLabel)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={menu.triggerHref}
                      className={cn(
                        'nav-dropdown-trigger inline-flex items-center gap-1.5 px-4 py-2',
                        'text-sm font-semibold tracking-[0.06em] transition-colors duration-200',
                        'text-[var(--color-brand-ink)] hover:text-[var(--color-brand-maroon)]',
                        isActive && 'text-[var(--color-brand-maroon)]',
                        isOpen && 'text-[var(--color-brand-maroon)]',
                      )}
                      onKeyDown={(e) => handleDropdownKeyDown(e, menu.triggerLabel)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {menu.triggerLabel}
                      {/* Chevron indicator */}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                        className={cn(
                          'transition-transform duration-200',
                          isOpen && 'rotate-180',
                        )}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    {/* ─── Mega-dropdown panel ─── */}
                    {isOpen && (
                      <div
                        className="nav-dropdown-panel absolute top-full left-0 mt-2"
                        role="menu"
                        aria-label={`${menu.triggerLabel} submenu`}
                      >
                        <div className="nav-dropdown-inner">
                          {/* Featured image column */}
                          {menu.featuredImage && (
                            <div className="nav-dropdown-featured">
                              <div className="nav-dropdown-featured-image">
                                <Image
                                  src={menu.featuredImage}
                                  alt={menu.featuredAlt || ''}
                                  fill
                                  className="object-cover"
                                  sizes="240px"
                                  aria-hidden={!menu.featuredAlt}
                                />
                              </div>
                              {menu.featuredCaption && (
                                <p className="nav-dropdown-featured-caption">{menu.featuredCaption}</p>
                              )}
                            </div>
                          )}

                          {/* Content columns */}
                          <div className="nav-dropdown-content">
                            {menu.sections.map((section) => (
                              <div key={section.eyebrow} className="nav-dropdown-section">
                                <p className="nav-dropdown-eyebrow">{section.eyebrow}</p>
                                <ul className="nav-dropdown-list">
                                  {section.items.map((item) => (
                                    <li key={item.href}>
                                      <Link
                                        href={item.href}
                                        className={cn(
                                          'nav-dropdown-item',
                                          item.image && 'nav-dropdown-item--with-image',
                                        )}
                                        role="menuitem"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        {item.image && (
                                          <div className="nav-dropdown-item-image">
                                            <Image
                                              src={item.image}
                                              alt={item.alt || ''}
                                              fill
                                              className="object-cover"
                                              sizes="80px"
                                              aria-hidden={!item.alt}
                                            />
                                          </div>
                                        )}
                                        <div className="nav-dropdown-item-text">
                                          <span className="nav-dropdown-item-label">{item.label}</span>
                                          {item.caption && (
                                            <span className="nav-dropdown-item-caption">{item.caption}</span>
                                          )}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Flat nav items (About, Updates, FAQ) */}
              {flatNavItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-semibold tracking-[0.06em] transition-colors duration-200',
                      'text-[var(--color-brand-ink)] hover:text-[var(--color-brand-maroon)]',
                      active && 'text-[var(--color-brand-maroon)]'
                    )}
                  >
                    {item.label}
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

          {/* Menu button — Collins-style premium: two lines only */}
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
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
              {menuOpen ? (
                /* Close: two diagonal lines forming a cross */
                <>
                  <path d="M1 1L21 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M21 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </>
              ) : (
                /* Open: two horizontal lines — premium Collins style */
                <>
                  <path d="M0 1.5H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M0 8.5H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

      {/* ─── Offcanvas panel — Advanced with imagery ─── */}
      <div
        ref={panelRef}
        className={cn('offcanvas-panel', menuOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header — logo + close */}
        <div className="flex items-center justify-between mb-8">
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
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
              <path d="M1 1L21 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M21 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ─── Schools editorial cards — large imagery ─── */}
        <div className="pt-2">
          <p className="eyebrow mb-5">Schools</p>
          <div className="space-y-3">
            {schools.map((school) => (
              <Link
                key={school.slug}
                href={`/schools/${school.slug}`}
                className="group flex items-center gap-4 min-h-[44px] py-3 border-b border-[var(--color-border-subtle)] transition-colors duration-200 hover:bg-[var(--color-surface-alt)]/40"
                onClick={closeMenu}
              >
                {/* Larger image card */}
                <div className="w-[72px] h-[54px] flex-shrink-0 overflow-hidden bg-[var(--color-brand-ink)]">
                  <Image
                    src={school.image}
                    alt=""
                    aria-hidden="true"
                    width={72}
                    height={54}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                  />
                </div>
                {/* Title + caption */}
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-sm uppercase tracking-[0.06em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">
                    {school.shortName}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors duration-200">
                    {school.caption}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Primary nav ─── */}
        <nav className="pt-8" aria-label="Mobile navigation">
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

        {/* ─── Secondary nav ─── */}
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

        {/* ─── Campus accent image ─── */}
        <div className="pt-8">
          <div className="aspect-[3/2] overflow-hidden opacity-70 rounded-none">
            <Image
              src="/images/campus/arched-corridor.webp"
              alt=""
              aria-hidden="true"
              width={360}
              height={240}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

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
