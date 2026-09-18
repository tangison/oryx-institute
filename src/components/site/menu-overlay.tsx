"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { site } from "@/lib/site";

/** Featured menu artifacts: the brand's own printed matter. */
const menuArtifacts = [
  {
    title: "Recruitment flyer",
    note: "Looks harmless. Isn't.",
    photo: "/images/brand/kit-flyer.jpg",
  },
  {
    title: "Certificate of Achievement",
    note: "Innovation and applied problem-solving",
    photo: "/images/brand/kit-certificate.jpg",
  },
  {
    title: "Letterhead",
    note: "P.O. Box 1662, Windhoek",
    photo: "/images/brand/kit-letterhead.jpg",
  },
] as const;

/** Primary menu links, Collins register. */
const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/programmes", label: "Programmes", cjk: "理工" },
  { href: "/about", label: "About" },
  { href: "/brand", label: "Brand" },
  { href: "/faq", label: "FAQ" },
] as const;

/**
 * Full-screen menu, Collins register: brand-ink ground, huge serif
 * links with lot indexes, a featured-artifacts column, maroon pill CTA
 * and a contact footer row. The wordmark repeats inside the overlay
 * with a close control, exactly as the reference does.
 */
export function MenuOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  // Route changes close the overlay.
  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="site-menu"
        showCloseButton={false}
        className="!top-0 !left-0 !inset-0 !max-h-dvh !w-screen !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !p-0 !shadow-none menu-overlay flex h-dvh flex-col overflow-y-auto bg-[var(--menu-bg)] menu-text data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 sm:!translate-x-0 sm:!translate-y-0 sm:!rounded-none"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>

        {/* Top register: wordmark left, close right */}
        <div className="shell-wide flex h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            onClick={close}
            className="flex items-center"
            aria-label={`${site.tradingName}, home`}
          >
            {/* The cached file variant: the menu ground is always ink,
                so the reverse lockup file serves it without shipping the
                path data twice in the document. */}
            <img
              src="/images/logo-lockup-dark.svg"
              alt=""
              width={116}
              height={40}
              className="h-[2.4rem] w-auto min-[48rem]:h-[2.75rem]"
              decoding="async"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            aria-expanded={open}
            onClick={close}
            className="menu-toggle menu-text"
          >
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>

        {/* Middle register: primary links, featured column */}
        <div className="shell-wide grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <nav aria-label="Menu">
            <ul className="flex flex-col gap-4 sm:gap-6">
              {menuLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="menu-link"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {link.label}
                    {"cjk" in link && link.cjk ? (
                      <span className="menu-cjk" aria-hidden>
                        {link.cjk}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <p
              className="label-caps mb-2 menu-text-muted"
              style={{ animation: "menu-link-in 480ms var(--ease-out) 280ms forwards", opacity: 0 }}
            >
              Printed matter
            </p>
            <div className="flex flex-col">
              {menuArtifacts.map((a, i) => (
                <Link
                  key={a.title}
                  href="/brand"
                  onClick={close}
                  className="menu-feature"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="relative block h-[4.5rem] w-[4.5rem] flex-none overflow-hidden rounded-[10px]">
                    <Image
                      src={a.photo}
                      alt={`${a.title}, Oryx Institute brand asset`}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="menu-feature-label">{a.title}</span>
                    <span className="menu-feature-title block truncate">
                      {a.note}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto h-4 w-4 flex-none menu-text-muted"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom register: CTA and contact row */}
        <div className="shell-wide py-7">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6">
            <div
              className="flex flex-wrap items-center gap-6"
              style={{ animation: "menu-link-in 480ms var(--ease-out) 420ms forwards", opacity: 0 }}
            >
              <Link href="/apply" onClick={close} className="pill pill-fill-dark !px-6 !py-3 text-[0.9rem]">
                Apply now
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <a href={`tel:${site.phoneHref}`} className="menu-utility tnum">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="menu-utility">
                {site.email}
              </a>
            </div>
            <ul
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{ animation: "menu-link-in 480ms var(--ease-out) 480ms forwards", opacity: 0 }}
            >
              <li>
                <Link href="/privacy" onClick={close} className="menu-utility">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" onClick={close} className="menu-utility">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" onClick={close} className="menu-utility">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
