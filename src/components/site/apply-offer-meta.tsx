"use client";

import { useEffect } from "react";
import { APPLY_OFFER_SLUGS, applyOfferName } from "@/lib/apply-offers";

/**
 * Legacy-variant metadata for /apply, set after hydration.
 *
 * The per-offer deep links are real routes now (/apply/<offer> carries
 * its own server-rendered metadata), so this component only serves the
 * variants that still arrive at the hub: a URL hash left over from the
 * anchor era, or the legacy ?for= parameter. The route's own metadata
 * is the canonical one; nothing here overrides it on the offer routes.
 */

export function readOfferSlug(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) return decodeURIComponent(hash);
  const param = new URLSearchParams(window.location.search).get("for");
  return param ?? undefined;
}

export function ApplyOfferMeta({ lang }: { lang: "en" | "zh" }) {
  useEffect(() => {
    const applyMeta = () => {
      const slug = readOfferSlug();
      if (!slug || !(APPLY_OFFER_SLUGS as readonly string[]).includes(slug))
        return;
      const name = applyOfferName(slug as (typeof APPLY_OFFER_SLUGS)[number], lang);
      const title =
        lang === "zh" ? `申请：${name} | Oryx 理工学院` : `Apply: ${name} | Oryx Institute`;
      const description =
        lang === "zh"
          ? `申请${name}。申请方式只有一种：给温得和克的院长办公室写一封邮件，写明姓名、回复方式与你感兴趣的领域。`
          : `${name} at Oryx Institute. Write to the Principal's office in Windhoek; the application starts with your first message.`;
      document.title = title;
      const setMeta = (selector: string, attr: string, value: string) => {
        const el = document.head.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      };
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[property="og:description"]', "content", description);
    };
    applyMeta();
    window.addEventListener("hashchange", applyMeta);
    return () => window.removeEventListener("hashchange", applyMeta);
  }, [lang]);

  return null;
}
