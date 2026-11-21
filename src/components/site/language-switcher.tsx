"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { langPath, type Lang } from "@/lib/i18n";

/**
 * The only public language cluster is English and Afrikaans. Chinese is
 * part of the supplied visual mark, not a published translation: legacy
 * /zh URLs permanently redirect to English and are intentionally not
 * advertised as a language choice.
 */
export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const barePath = pathname.replace(/^\/(?:en|af)(?=\/|$)/, "") || "/";
  const label = lang === "af" ? "Taal" : "Language";

  return (
    <nav className="lang-toggle" aria-label={label} data-nosnippet>
      {lang === "en" ? (
        <span className="lang-current" aria-current="page">EN</span>
      ) : (
        <Link className="lang-link" href={langPath("en", barePath)} hrefLang="en">
          EN
        </Link>
      )}
      <span className="lang-sep" aria-hidden="true">|</span>
      {lang === "af" ? (
        <span className="lang-current" aria-current="page">AF</span>
      ) : (
        <Link className="lang-link" href={langPath("af", barePath)} hrefLang="af">
          AF
        </Link>
      )}
    </nav>
  );
}
