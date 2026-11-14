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
    /* Afrikaans carries Namibia's regional subtag so assistive tools
       and translation services receive the most specific published tag. */
    document.documentElement.lang = lang === "af" ? "af-NA" : lang;
  }, [lang, pathname]);
  return null;
}
