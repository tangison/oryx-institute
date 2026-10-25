"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { swapLang, type Lang } from "@/lib/i18n";

/**
 * The language switch lives in the menu, not the bar. The current
 * language holds still; the other one is one large serif link that
 * carries this exact page across. It is a plain anchor, so it works
 * with JavaScript off, exactly like the rest of the panel.
 */
export function MenuLang({ lang }: { lang: Lang }) {
  const tSwap = lang === "en" ? "Afrikaans" : "English";
  const eyebrow = lang === "en" ? "Language" : "Taal";
  const note = lang === "en" ? "Every page, in both languages." : "Elke bladsy, in albei tale.";
  const pathname = usePathname();
  /* The middleware serves /programmes as /en/programmes internally, so
     strip a leading locale segment before swapping. */
  const bare = pathname.replace(/^\/(en|af)(?=\/|$)/, "") || "/";

  return (
    <div className="menu-lang">
      <p className="eyebrow eyebrow--ivory">{eyebrow}</p>
      <Link
        href={swapLang(lang, bare)}
        hrefLang={lang === "en" ? "af" : "en"}
        className="menu-lang-link"
      >
        {tSwap}
        <span className="menu-arr" aria-hidden="true">
          →
        </span>
      </Link>
      <p className="menu-lang-note">{note}</p>
    </div>
  );
}
