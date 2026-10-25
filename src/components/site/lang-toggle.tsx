"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chrome, swapLang, type Lang } from "@/lib/i18n";

/**
 * The language toggle: the current language held still, the other one a
 * link to this exact page in the other language. Two letters and a
 * hairline separator, nothing more.
 */
export function LangToggle({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const pathname = usePathname();
  /* The middleware serves /programmes as /en/programmes internally, so
     strip a leading locale segment before swapping. */
  const bare = pathname.replace(/^\/(en|af)(?=\/|$)/, "") || "/";
  return (
    <span className="lang-toggle">
      <span className="lang-current" aria-current="true">
        {lang === "en" ? "EN" : "AF"}
      </span>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <Link
        href={swapLang(lang, bare)}
        hrefLang={lang === "en" ? "af" : "en"}
        aria-label={t.langAria}
        className="lang-link"
      >
        {t.langShort}
      </Link>
    </span>
  );
}
