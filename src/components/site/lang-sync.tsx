"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The root layout renders <html lang> from the route segment, but a
 * client-side language switch does not re-mount the document, and the
 * attribute stays on the old language until the next full load. This
 * one-line effect keeps the document language honest on every route,
 * which screen readers and translation tools both key off.
 */
export function LangSync({ lang }: { lang: string }) {
  const pathname = usePathname();
  useEffect(() => {
    /* zh carries its region subtag: the CJK font stacks and hyphenation
       both key on the full BCP-47 tag, not the bare language. */
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang, pathname]);
  return null;
}
