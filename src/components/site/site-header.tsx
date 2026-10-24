import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { footerNav, navLinks, site } from "@/lib/site";

/**
 * The header: a flat cream bar, hairline foot, wordmark left, the
 * brief's four links right. The mobile menu is a native <details>
 * disclosure — it opens, navigates and closes with JavaScript off.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          aria-label="Oryx Institute, home"
          className="flex items-center shrink-0"
        >
          <OryxLogo
            variant="lockup"
            tone="brand"
            className="h-[2.1rem] w-auto min-[48rem]:h-[2.4rem]"
          />
        </Link>

        <nav aria-label="Primary" className="nav-links">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: the full sitemap in a no-JS disclosure */}
        <details className="menu">
          <summary className="menu-summary" aria-label="Open the site menu">
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            Menu
          </summary>
          <nav className="menu-panel" aria-label="Site menu">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    {l.label}
                    <span className="meta" aria-hidden="true">
                      01
                    </span>
                  </Link>
                </li>
              ))}
              {footerNav
                .filter((l) => !navLinks.some((n) => n.href === l.href))
                .map((l, i) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      {l.label}
                      <span className="meta" aria-hidden="true">
                        {String(i + 5).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
