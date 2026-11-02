/**
 * The apply deep links, as real routes.
 *
 * Every offer CTA on the site used to point at /apply#<id> (and before
 * that /apply?for=<id>). Query strings forced a server render per deep
 * link — the five slow-TTFB errors of the first crawl — and hash
 * anchors made every variant share one title, which the second crawl
 * read as duplicate titles and descriptions across ten pages.
 *
 * The fix is a real static route per offer: /apply/<offer> renders the
 * full application page with its own title, description and canonical,
 * generated at build time. Nothing is dynamic; the composer preselects
 * the field of interest from the route segment.
 */

export const APPLY_OFFER_SLUGS = [
  "owners-desk",
  "business-administration",
  "it",
  "market-rd",
  "rapid-response",
  "safety",
  "safety-level-1",
  "safety-level-2",
  "safety-level-3",
] as const;

export type ApplyOfferSlug = (typeof APPLY_OFFER_SLUGS)[number];

const OFFER_NAMES: Record<ApplyOfferSlug, { en: string; zh: string }> = {
  "owners-desk": { en: "the Owner's Desk", zh: "经营者案头" },
  "business-administration": {
    en: "Business Administration",
    zh: "工商管理",
  },
  it: { en: "Information Technology", zh: "信息技术" },
  "market-rd": { en: "Market Research & Development", zh: "市场调研" },
  "rapid-response": { en: "Rapid Response Training", zh: "快速响应培训" },
  safety: { en: "Safety Officer Training", zh: "安全员培训" },
  "safety-level-1": {
    en: "Safety Training, Level 1 Induction",
    zh: "安全培训，一级准入",
  },
  "safety-level-2": {
    en: "Safety Training, Level 2 Officer",
    zh: "安全培训，二级安全员",
  },
  "safety-level-3": {
    en: "Safety Training, Level 3 Management",
    zh: "安全培训，三级管理",
  },
};

/** The route segment the composer preselects. The safety levels map to
 * the same form options the legacy ?for= parameter used. */
export const APPLY_FORM_VALUE: Record<ApplyOfferSlug, string> = {
  "owners-desk": "owners-desk",
  "business-administration": "business-administration",
  it: "it",
  "market-rd": "market-rd",
  "rapid-response": "rapid-response",
  safety: "safety",
  "safety-level-1": "safety-level-1",
  "safety-level-2": "safety-level-2",
  "safety-level-3": "safety-level-3",
};

export function isApplyOfferSlug(x: string): x is ApplyOfferSlug {
  return (APPLY_OFFER_SLUGS as readonly string[]).includes(x);
}

export function applyOfferName(slug: ApplyOfferSlug, lang: "en" | "zh") {
  return OFFER_NAMES[slug][lang];
}

/** Title and description per offer and language, in the site's own
 * title register: statement first, brand last. Descriptions hold the
 * SERP band in both languages: 137-155 characters in English,
 * 138-144 in Chinese. */
export function applyOfferMeta(slug: ApplyOfferSlug, lang: "en" | "zh") {
  const name = OFFER_NAMES[slug];
  if (lang === "zh") {
    return {
      title: `申请：${name.zh} | Oryx 理工学院 · Oryx Institute`,
      description: `申请${name.zh}。申请方式只有一种：给温得和克的院长办公室写一封邮件，写明姓名、一个便于回复的联系方式与你感兴趣的领域。没有门户，也不排队；院长办公室亲自阅读每一封邮件并亲自回复，通常在一周之内，先谈再定，双方同意之前不会定下任何事，申请从你的第一封邮件开始，写清楚你要什么即可。`,
      ogTitle: `申请：${name.zh} | Oryx 理工学院`,
      ogDescription:
        "给温得和克院长办公室的一封邮件，你的申请就开始了。",
    };
  }
  return {
    title: `Apply: ${name.en} | Oryx Institute`,
    description: `${name.en} at Oryx Institute, Windhoek. One message to the Principal's office starts the application; replies come within the week.`,
    ogTitle: `Apply: ${name.en} | Oryx Institute`,
    ogDescription:
      "One message to the Principal's office in Windhoek starts your application.",
  };
}
