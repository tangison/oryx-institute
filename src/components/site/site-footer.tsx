import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { SocialIcon, type SocialName } from "@/components/site/social-icon";
import { chrome, langPath, type Lang } from "@/lib/i18n";
import { footerNav, partners, site } from "@/lib/site";
import { navAf, partnersAf, siteAf } from "@/lib/site-af";

/**
 * The footer: the graduate line first, then the sitemap, the office and
 * the social channels (icon-only links, no embeds), the partners carried
 * as their own untampered marks, and the legal row.
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const af = lang === "af";
  const links = af ? navAf.footerNav : footerNav;
  const partnerNote = (id: string) => {
    if (af) return partnersAf.find((p) => p.id === id)?.note;
    return partners.find((p) => p.id === id)?.note;
  };

  return (
    <footer className="site-footer">
      <div className="shell py-16 md:py-20">
        <p className="foot-statement">
          {af ? siteAf.closingLine : site.closingLine}
        </p>
        <p className="measure mt-5 text-soft max-w-[52ch]">
          {af ? siteAf.heroSub : site.heroSub}
        </p>

        <div className="hair-t mt-14 grid gap-10 pt-12 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-16">
          <Link
            href={langPath(lang, "/")}
            className="flex items-center"
            aria-label={t.home}
          >
            <OryxLogo
              variant="lockup"
              tone="brand"
              className="h-[2rem] w-auto"
            />
          </Link>

          <nav aria-label={t.footerNav} className="md:justify-self-center">
            <ul className="foot-nav">
              {links.map((l) => (
                <li key={l.href}>
                  {/* Footer links don't prefetch: twelve routes pulled
                      from every page is bandwidth visitors rarely use. */}
                  <Link href={langPath(lang, l.href)} prefetch={false}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-6 md:justify-items-end">
            <address className="not-italic text-[0.95rem] leading-relaxed text-soft md:text-right">
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              <br />
              <Link href={langPath(lang, "/contact")} className="link-type">
                {t.contactOffice}
              </Link>
              <br />
              {site.city}, {af ? siteAf.country : site.country}
            </address>
            <ul className="social-row md:justify-self-end" aria-label={af ? "Sosiale kanale" : "Social channels"}>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${af ? siteAf.tradingName : site.tradingName} on ${s.label}`}
                  >
                    <SocialIcon name={s.label as SocialName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The partners, carried as their own marks: byte-exact from
            each partner's site, no recolouring. Mendozer's wordmark is
            its ink variant: the gradient M stands unaltered, the
            wordmark reads on cream. */}
        <div className="hair-t partner-row mt-12 pt-8">
          <p className="eyebrow--ink eyebrow">
            {af ? "In die praktyk saam met" : "In practice with"}
          </p>
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className={p.tone === "ink" ? "text-ink" : ""}
              title={partnerNote(p.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.id === "mendozer" ? "/partners/mendozer-logo-ink.svg" : p.logo}
                alt=""
                width={p.id === "tangison" ? 1383 : 1024}
                height={p.id === "tangison" ? 296 : 401}
                className="h-full w-auto"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-6 text-[0.82rem] text-soft md:flex-row md:items-center md:justify-between">
          <p className="tnum">
            © {new Date().getFullYear()} {site.legalName}. {t.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={langPath(lang, "/privacy")} className="link-type">
                {af ? "Privaatheid" : "Privacy"}
              </Link>
            </li>
            <li>
              <Link href={langPath(lang, "/terms")} className="link-type">
                {af ? "Voorwaardes" : "Terms"}
              </Link>
            </li>
            <li>
              <Link href={langPath(lang, "/brand")} className="link-type">
                {af ? "Handelsmerk" : "Brand"}
              </Link>
            </li>
          </ul>
          <p>
            {t.madeBy}{" "}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-type"
            >
              Tangison Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
