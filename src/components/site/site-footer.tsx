import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { chrome, langPath, type Lang } from "@/lib/i18n";
import { footerNav, site } from "@/lib/site";
import { navZh, siteZh } from "@/lib/site-zh";

/**
 * The ink footer: the close of every page. Wordmark, the inline
 * sitemap, the founding line, the mailbox, the social channels as
 * plain text, and the legal row. Nothing else. No outgoing partner
 * or studio links live here; the one credit is small type, not a
 * link.
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const zh = lang === "zh";
  const links = zh ? navZh.footerNav : footerNav;

  return (
    <footer className="site-footer">
      <div className="shell py-16 md:py-20">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link
              href={langPath(lang, "/")}
              className="flex items-center"
              aria-label={t.home}
            >
              <OryxLogo
                variant="lockup"
                tone="reverse"
                loading="lazy"
                className="h-[2rem] w-auto"
              />
            </Link>
            <p className="foot-place mt-6">
              {zh ? "温得和克 · 2026 年创立" : "WINDHOEK · EST. 2026"}
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
            <ul className="foot-social" aria-label={zh ? "社交频道" : "Social channels"}>
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

        <div className="foot-legal mt-14 flex flex-col gap-4 pt-6 text-[0.82rem] md:flex-row md:items-center md:justify-between">
          <p className="tnum">
            © {new Date().getFullYear()} {site.legalName}. {t.rights}
          </p>
          <p className="foot-credit">{zh ? "由 Tangison 构建" : "Built by Tangison"}</p>
        </div>
      </div>
    </footer>
  );
}
