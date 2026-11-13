/**
 * The apply deep links, as real routes.
 *
 * Every offer CTA on the site used to point at /apply#<id> (and before
 * that /apply?for=<id>). Query strings forced a server render per deep
 * link: the five slow-TTFB errors of the first crawl, and hash
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

/** A real route needs a real proposition, not only a different title.
 * This short, offer-specific introduction appears above the shared
 * message composer on each /apply/:offer page. It lets applicants know
 * which door they reached while keeping the single, privacy-preserving
 * mailto handoff intact. */
export const APPLY_OFFER_INTROS: Record<
  ApplyOfferSlug,
  Record<"en" | "zh", { eyebrow: string; title: string; body: string }>
> = {
  "owners-desk": {
    en: {
      eyebrow: "The Owner's Desk",
      title: "Bring the decision to the desk.",
      body:
        "The Owner's Desk is one-on-one business counselling for Namibian owners at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. The result is written down: what was decided, and what happens next.",
    },
    zh: {
      eyebrow: "经营者案头",
      title: "把要定的事带到案头来。",
      body:
        "经营者案头为纳米比亚的经营者提供一对一咨询，专挑代价最高的时刻：开张、注册、雇人、定价、转向，或者体面地收尾。结果落在纸面：定了什么，接下来做什么。",
    },
  },
  "business-administration": {
    en: {
      eyebrow: "Business Administration",
      title: "Learn the work that keeps a business in order.",
      body:
        "Business Administration covers records, filings, registers and the everyday processes behind a working business. Oryx offers crash and short courses only: each course is narrow, practical and finished.",
    },
    zh: {
      eyebrow: "工商管理",
      title: "学会让一门生意井然有序的日常功夫。",
      body:
        "工商管理教账目、申报、登记册，以及一门生意背后的日常流程。Oryx 只开速成课与短期课程：每门课都窄、都实用、都收尾。",
    },
  },
  it: {
    en: {
      eyebrow: "Information Technology",
      title: "Learn the systems work runs on.",
      body:
        "Information Technology and Related Fields covers the systems and software a business runs on, from first principles to confident use. The offer is made of focused crash and short courses, with every tool named.",
    },
    zh: {
      eyebrow: "信息技术及相关领域",
      title: "学会一门生意赖以运转的系统。",
      body:
        "信息技术及相关领域教一门生意赖以运转的系统与软件，从第一性原理讲到用得有把握。课程都是聚焦的速成课与短期课程，每一件工具都有名字。",
    },
  },
  "market-rd": {
    en: {
      eyebrow: "Market Research & Development",
      title: "Start with evidence from the ground.",
      body:
        "Market Research & Development takes on feasibility studies, market sizing, competitor reads and route-to-market plans. The work is gathered on Namibian ground, sourced, and written to be used in a decision.",
    },
    zh: {
      eyebrow: "市场调研",
      title: "先从地上的证据开始。",
      body:
        "市场调研承接可行性研究、市场规模测算、对手研判与入市路径规划。材料取自纳米比亚的土地，出处写明，报告为决策而写。",
    },
  },
  "rapid-response": {
    en: {
      eyebrow: "Rapid Response Training",
      title: "Build the training the team needs now.",
      body:
        "Rapid Response Training is for the moment a business needs a team trained on something new. Oryx sources the industry expert, structures the programme around the need, and delivers it to standard.",
    },
    zh: {
      eyebrow: "快速响应培训",
      title: "把团队眼下要学的东西搭起来。",
      body:
        "快速响应培训为一家企业需要团队学会新东西的时刻而设。Oryx 约请行业专家，围绕需求搭好课程，并按标准交付。",
    },
  },
  safety: {
    en: {
      eyebrow: "Safety Officer Training",
      title: "Train for the conditions a site actually has.",
      body:
        "Safety Officer Training is a Namibian occupational programme taught in Windhoek: one day of worker induction, five days to a safety officer, and ten days to advanced safety management. The curriculum is published; enrolments open with Cohort 1.",
    },
    zh: {
      eyebrow: "安全员培训",
      title: "为现场真正面对的条件而练。",
      body:
        "安全员培训是一套在温得和克教授的纳米比亚职业安全课程：一天完成员工准入，五天成为安全员，十天进阶高级安全管理。课程大纲已发布；首期班开放时开始报名。",
    },
  },
  "safety-level-1": {
    en: {
      eyebrow: "Safety Training, Level 1",
      title: "Begin with a worker who can spot a hazard.",
      body:
        "Level 1 is a one-day General Worker Safety Induction. It covers hazard identification, PPE, emergency procedures and legal duties for a new employee before a first shift on a Namibian site.",
    },
    zh: {
      eyebrow: "安全培训，一级准入",
      title: "从能看见危险源的员工开始。",
      body:
        "一级是一日制员工安全准入培训，讲危险源辨识、个人防护装备、应急程序与法律义务，面向在纳米比亚工地上第一次上班之前的新员工。",
    },
  },
  "safety-level-2": {
    en: {
      eyebrow: "Safety Training, Level 2",
      title: "Prepare to hold the safety officer's standard.",
      body:
        "Level 2 is the five-day Safety Representative and Site Safety Officer course. It develops the practical record, inspection and reporting work needed to carry the standard on a working site.",
    },
    zh: {
      eyebrow: "安全培训，二级安全员",
      title: "准备好守住安全员的标准。",
      body:
        "二级是五日制安全代表与现场安全员课程，训练在真实现场守住标准所需的记录、巡查与报告工作。",
    },
  },
  "safety-level-3": {
    en: {
      eyebrow: "Safety Training, Level 3",
      title: "Lead the system behind a safe site.",
      body:
        "Level 3 is the ten-day Advanced Safety Management course. It moves from site practice to SHEQ systems, contractor safety, serious-incident investigation and the management work that keeps a standard standing.",
    },
    zh: {
      eyebrow: "安全培训，三级管理",
      title: "带领支撑安全现场的整套系统。",
      body:
        "三级是十日制高级安全管理课程，从现场实操进入 SHEQ 体系、承包商安全、严重事故调查与让标准立得住的管理工作。",
    },
  },
};

export function applyOfferIntro(slug: ApplyOfferSlug, lang: "en" | "zh") {
  return APPLY_OFFER_INTROS[slug][lang];
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
