import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { SearchControl } from "@/components/site/search-dialog";
import { MenuBehaviour } from "@/components/site/menu-behaviour";
import { LangToggle } from "@/components/site/lang-toggle";
import { chrome, langPath, type Lang } from "@/lib/i18n";
import { navLinks, footerNav, site } from "@/lib/site";
import { navAf, siteAf } from "@/lib/site-af";

/**
 * The floating header: a cream bar detached from the top edge, hairline
 * framed, riding above the page. Wordmark left; the brief's four links,
 * then search (desktop) and the language toggle right; the menu trigger
 * carries every screen into the off-canvas sitemap.
 *
 * The menu is a native <details>: full-screen ink, the primary links in
 * the brand serif, the rest of the sitemap beneath, the office line at
 * the bottom. It opens, navigates and closes with JavaScript off.
 */
export function SiteHeader({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const af = lang === "af";
  const links = af ? navAf.navLinks : navLinks;
  const sitemap = af ? navAf.footerNav : footerNav;
  const secondary = sitemap.filter(
    (l) => !links.some((n) => n.href === l.href)
  );

  return (
    <header className="site-header">
      {/* The menu is a checkbox disclosure: the hidden input is the
          first child, the label lives in the bar, the panel is the last
          child, so pure CSS opens and closes it with JavaScript off.
          The input stays focusable, so keyboard users toggle with
          Space and the ring lands on the label. */}
      <input
        type="checkbox"
        id="site-menu-toggle"
        className="menu-toggle sr-only"
        /* No aria-label: the visible label word is the accessible
           name, so it always matches what is on screen. */
        aria-controls="site-menu-panel"
      />

      <div className="header-bar">
        <Link
          href={langPath(lang, "/")}
          aria-label={t.home}
          className="flex items-center shrink-0"
        >
          <OryxLogo
            variant="lockup"
            tone="brand"
            className="h-[2rem] w-auto min-[48rem]:h-[2.25rem]"
          />
        </Link>

        <nav aria-label={t.primaryNav} className="nav-links">
          <ul className="flex items-center gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={langPath(lang, l.href)} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-tools">
          <SearchControl lang={lang} />
          <LangToggle lang={lang} />

          <label htmlFor="site-menu-toggle" className="menu-summary">
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="menu-word menu-word--open">{t.menu}</span>
            <span className="menu-word menu-word--close">{t.close}</span>
          </label>
        </div>
      </div>

      <div
        className="menu-panel"
        id="site-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t.siteMenu}
      >
        <div className="menu-inner">
          <nav aria-label={t.primaryNav} className="menu-primary">
            <ul>
              {links.map((l, i) => (
                <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                  <Link href={langPath(lang, l.href)} data-menu-first={i === 0 ? "" : undefined}>
                    <span className="menu-link-text">{l.label}</span>
                    <span className="menu-arr" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footerNav} className="menu-secondary">
            <ul>
              {secondary.map((l) => (
                <li key={l.href}>
                  <Link href={langPath(lang, l.href)}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-meta">
            <a href={`mailto:${site.email}`} className="menu-mail">
              {site.email}
            </a>
            <p className="menu-place">
              {site.city}, {af ? siteAf.country : site.country}
            </p>
            <ul className="menu-social" aria-label={af ? "Sosiale kanale" : "Social channels"}>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="menu-legal">
              © {new Date().getFullYear()} {site.legalName}. {t.rights}
            </p>
          </div>
        </div>
      </div>
      <MenuBehaviour />
    </header>
  );
}
