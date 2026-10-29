"use client";

import { useEffect } from "react";

/**
 * Per-offer metadata for /apply, set after hydration.
 *
 * The route is statically generated: every ?for= variant used to be a
 * separate server render, which cost a cold render per deep link and
 * showed up as five slow TTFB errors in the crawl. The deep links are
 * now hash anchors on one static page, and this component carries the
 * per-offer title and description the variants used to serve — read
 * from the URL hash first (the format every internal CTA now uses),
 * with the legacy ?for= parameter still honoured.
 */

const OFFER_NAMES: Record<string, { en: string; zh: string }> = {
  "owners-desk": { en: "the Owner's Desk", zh: "经营者案头" },
  "business-administration": {
    en: "Business Administration",
    zh: "工商管理",
  },
  it: { en: "Information Technology", zh: "信息技术" },
  "market-rd": { en: "Market Research & Development", zh: "市场调研" },
  "rapid-response": { en: "Rapid Response Training", zh: "快速响应培训" },
};

export function offerNameFromSlug(
  slug: string | undefined
): { en: string; zh: string } | undefined {
  if (!slug) return undefined;
  return OFFER_NAMES[slug];
}

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
      const offer = offerNameFromSlug(slug);
      if (!offer) return;
      const name = lang === "zh" ? offer.zh : offer.en;
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
