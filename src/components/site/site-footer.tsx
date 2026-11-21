import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { chrome, langPath, type Lang } from "@/lib/i18n";
import { footerNav, site } from "@/lib/site";
import { navAf, siteAf } from "@/lib/site-af";

/**
 * The ink footer: the close of every page. Wordmark, the inline
 * sitemap, the founding line, the mailbox, the social channels as
 * plain text, and one small studio credit. Nothing else. No outgoing
 * partner or studio links live here; the credit is plain text, not a
 * link.
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const af = lang === "af";
  const links = af ? navAf.footerNav : footerNav;

  return (
    <footer className="site-footer" data-nosnippet>
      <div className="shell py-16 md:py-20">
        <div className="foot-grid" data-sc-in>
          <div className="foot-brand">
            <Link
              href={langPath(lang, "/")}
              className="foot-brand-link"
              aria-label={t.home}
            >
              <OryxLogo
                variant="lockup"
                tone="reverse"
                title="Oryx Polytechnic Institute logo"
                loading="lazy"
                className="h-auto w-full max-w-none"
              />
            </Link>
            {/* The footer is a signature, not a location claim. The
                institute's actual operating locations belong on the
                relevant venture, contact and programme pages. */}
            <p className="foot-place mt-6">
              {af ? "’N POLITEGNIESE INSTITUUT VIR NAMIBIË" : "A POLYTECHNIC FOR NAMIBIA"}
            </p>
          </div>

          <nav aria-label={t.footerNav} className="foot-nav-wrap">
            <ul className="foot-nav">
              {links.map((l) => (
                <li key={l.href}>
                  {/* Footer links don't prefetch: every route pulled
                      from every page is bandwidth visitors rarely
                      use. */}
                  <Link href={langPath(lang, l.href)} prefetch={false}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-office">
            <a href={`mailto:${site.email}`} className="foot-mail link-type">
              {site.email}
            </a>
            <p className="foot-post">{af ? siteAf.postalAddressBox : site.postalAddress.postOfficeBox}</p>
            <p className="foot-phone">
              <a
                href={site.phoneHref}
                className="link-type whitespace-nowrap"
                /* Label in Name (WCAG 2.5.3): the accessible name must
                   contain the visible string, so it reuses phoneDisplay
                   exactly, no-break spaces and all. */
                aria-label={`Call ${site.tradingName} on ${site.phoneDisplay}`}
              >
                {site.phoneDisplay}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 link-type"
              >
                {af ? "WhatsApp" : "WhatsApp"}
              </a>
            </p>
            <ul className="foot-social" aria-label={af ? "Social channels" : "Social channels"}>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-legal mt-10 pt-6 text-[0.82rem]" data-sc-in>
          <p className="foot-credit">
            {af ? "Webwerf deur Tangison Studio gemaak" : "Site made by Tangison Studio"}
          </p>
        </div>
      </div>
    </footer>
  );
}
