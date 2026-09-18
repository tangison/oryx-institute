"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { MenuOverlay } from "@/components/site/menu-overlay";
import { OryxLogo } from "@/components/site/oryx-logo";
import { navGroups, site } from "@/lib/site";

/**
 * Wordmark lockup: the official ORYX 理工 INSTITUTE artwork, rendered
 * from its own vector paths. Over photography it runs the reverse tone;
 * once the header turns solid it runs the brand tone.
 */
export function Wordmark({
  onNavigate,
  reverse = false,
}: {
  onNavigate?: () => void;
  reverse?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex items-center"
      aria-label={`${site.tradingName}, home`}
    >
      <OryxLogo
        variant="lockup"
        tone={reverse ? "reverse" : "brand"}
        className="h-[2.4rem] w-auto min-[48rem]:h-[2.75rem]"
      />
    </Link>
  );
}

/**
 * Desktop mega dropdown. Opens on click and on hover intent, closes on
 * Escape, outside press, and pointer leave with a short grace period.
 */
function MegaNav({
  label,
  items,
  active,
}: {
  label: string;
  items: readonly { href: string; name: string; desc: string }[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? scheduleClose() : openNow())}
        className={`nav-trigger label-caps transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent-deep ${
          active ? "text-accent-deep" : ""
        }`}
      >
        {label}
        <ChevronDown
          className="nav-chev h-3.5 w-3.5"
          strokeWidth={2}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="mega-panel" style={{ minWidth: "26rem" }}>
          <ul className="grid gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mega-item"
                >
                  <span className="mega-num" aria-hidden>
                    {String(items.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="mega-name">{item.name}</span>
                    <span className="mega-desc">{item.desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  // Route changes reset the hero state during render, not in an effect.
  const [prevHome, setPrevHome] = useState(isHome);
  if (prevHome !== isHome) {
    setPrevHome(isHome);
    setOverHero(isHome);
  }

  useEffect(() => {
    if (!isHome) return;
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const solid = !overHero;

  const groupActive = (group: (typeof navGroups)[number]) => {
    if ("href" in group) return pathname === group.href;
    return group.items.some(
      (item) => pathname === item.href || pathname === `${item.href}/`
    );
  };

  return (
    <>
      <header
        className={`site-header ${solid ? "is-solid" : ""}`}
      >
        <div className="shell-wide flex h-[4.5rem] items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navGroups.map((group) => (
                <li key={"href" in group ? group.href : group.label}>
                  {"href" in group ? (
                    <Link
                      href={group.href}
                      className={`label-caps transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent-deep ${
                        pathname === group.href ? "text-accent-deep" : ""
                      }`}
                      aria-current={pathname === group.href ? "page" : undefined}
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <MegaNav
                      label={group.label}
                      items={group.items}
                      active={groupActive(group)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <Link
              href="/apply"
              className="pill !px-5 !py-2.5 text-[0.82rem] hidden xl:inline-flex"
            >
              Apply now
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
              className="menu-toggle"
            >
              <span className="menu-line" />
              <span className="menu-line" />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
