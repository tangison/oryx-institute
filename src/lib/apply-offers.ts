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

const OFFER_NAMES: Record<ApplyOfferSlug, { en: string; af: string }> = {
  "owners-desk": { en: "the Owner's Desk", af: "the Owner's Desk" },
  "business-administration": {
    en: "Business Administration",
    af: "Besigheidsadministrasie",
  },
  it: { en: "Information Technology", af: "Information Technology" },
  "market-rd": { en: "Market Research & Development", af: "Market Research & Development" },
  "rapid-response": { en: "Rapid Response Training", af: "Rapid Response Training" },
  safety: { en: "Safety Officer Training", af: "Safety Officer Training" },
  "safety-level-1": {
    en: "Safety Training, Level 1 Induction",
    af: "Veiligheidsopleiding, Vlak 1: Inlywing",
  },
  "safety-level-2": {
    en: "Safety Training, Level 2 Officer",
    af: "Veiligheidsopleiding, Vlak 2: Beampte",
  },
  "safety-level-3": {
    en: "Safety Training, Level 3 Management",
    af: "Veiligheidsopleiding, Vlak 3: Bestuur",
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

export function applyOfferName(slug: ApplyOfferSlug, lang: "en" | "af") {
  return OFFER_NAMES[slug][lang];
}

/** A real route needs a real proposition, not only a different title.
 * This short, offer-specific introduction appears above the shared
 * message composer on each /apply/:offer page. It lets applicants know
 * which door they reached while keeping the single, privacy-preserving
 * mailto handoff intact. */
export const APPLY_OFFER_INTROS: Record<
  ApplyOfferSlug,
  Record<"en" | "af", { eyebrow: string; title: string; body: string }>
> = {
  "owners-desk": {
    en: {
      eyebrow: "The Owner's Desk",
      title: "Bring the decision to the desk.",
      body:
        "The Owner's Desk is one-on-one business counselling for Namibian owners at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. The result is written down: what was decided, and what happens next.",
    },
    af: {
      eyebrow: "The Owner's Desk",
      title: "Bring the decision to the desk.",
      body:
        "The Owner's Desk is one-on-one business counselling for Namibian owners at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. The result is written down: what was decided, and what happens next.",
    },
  },
  "business-administration": {
    en: {
      eyebrow: "Business Administration",
      title: "Learn the work that keeps a business in order.",
      body:
        "Business Administration covers records, filings, registers and the everyday processes behind a working business. Oryx offers crash and short courses only: each course is narrow, practical and finished.",
    },
    af: {
      eyebrow: "Business Administration",
      title: "Learn the work that keeps a business in order.",
      body:
        "Business Administration covers records, filings, registers and the everyday processes behind a working business. Oryx offers crash and short courses only: each course is narrow, practical and finished.",
    },
  },
  it: {
    en: {
      eyebrow: "Information Technology",
      title: "Learn the systems work runs on.",
      body:
        "Information Technology and Related Fields covers the systems and software a business runs on, from first principles to confident use. The offer is made of focused crash and short courses, with every tool named.",
    },
    af: {
      eyebrow: "Information Technology",
      title: "Learn the systems work runs on.",
      body:
        "Information Technology and Related Fields covers the systems and software a business runs on, from first principles to confident use. The offer is made of focused crash and short courses, with every tool named.",
    },
  },
  "market-rd": {
    en: {
      eyebrow: "Market Research & Development",
      title: "Start with evidence from the ground.",
      body:
        "Market Research & Development takes on feasibility studies, market sizing, competitor reads and route-to-market plans. The work is gathered on Namibian ground, sourced, and written to be used in a decision.",
    },
    af: {
      eyebrow: "Market Research & Development",
      title: "Start with evidence from the ground.",
      body:
        "Market Research & Development takes on feasibility studies, market sizing, competitor reads and route-to-market plans. The work is gathered on Namibian ground, sourced, and written to be used in a decision.",
    },
  },
  "rapid-response": {
    en: {
      eyebrow: "Rapid Response Training",
      title: "Build the training the team needs now.",
      body:
        "Rapid Response Training is for the moment a business needs a team trained on something new. Oryx sources the industry expert, structures the programme around the need, and delivers it to standard.",
    },
    af: {
      eyebrow: "Rapid Response Training",
      title: "Build the training the team needs now.",
      body:
        "Rapid Response Training is for the moment a business needs a team trained on something new. Oryx sources the industry expert, structures the programme around the need, and delivers it to standard.",
    },
  },
  safety: {
    en: {
      eyebrow: "Safety Officer Training",
      title: "Train for the conditions a site actually has.",
      body:
        "Safety Officer Training is a Namibian occupational programme taught in Windhoek: one day of worker induction, five days to a safety officer, and ten days to advanced safety management. The curriculum is published; enrolments open with Cohort 1.",
    },
    af: {
      eyebrow: "Safety Officer Training",
      title: "Train for the conditions a site actually has.",
      body:
        "Safety Officer Training is a Namibian occupational programme taught in Windhoek: one day of worker induction, five days to a safety officer, and ten days to advanced safety management. The curriculum is published; enrolments open with Cohort 1.",
    },
  },
  "safety-level-1": {
    en: {
      eyebrow: "Safety Training, Level 1",
      title: "Begin with a worker who can spot a hazard.",
      body:
        "Level 1 is a one-day General Worker Safety Induction. It covers hazard identification, PPE, emergency procedures and legal duties for a new employee before a first shift on a Namibian site.",
    },
    af: {
      eyebrow: "Safety Training, Level 1",
      title: "Begin with a worker who can spot a hazard.",
      body:
        "Level 1 is a one-day General Worker Safety Induction. It covers hazard identification, PPE, emergency procedures and legal duties for a new employee before a first shift on a Namibian site.",
    },
  },
  "safety-level-2": {
    en: {
      eyebrow: "Safety Training, Level 2",
      title: "Prepare to hold the safety officer's standard.",
      body:
        "Level 2 is the five-day Safety Representative and Site Safety Officer course. It develops the practical record, inspection and reporting work needed to carry the standard on a working site.",
    },
    af: {
      eyebrow: "Safety Training, Level 2",
      title: "Prepare to hold the safety officer's standard.",
      body:
        "Level 2 is the five-day Safety Representative and Site Safety Officer course. It develops the practical record, inspection and reporting work needed to carry the standard on a working site.",
    },
  },
  "safety-level-3": {
    en: {
      eyebrow: "Safety Training, Level 3",
      title: "Lead the system behind a safe site.",
      body:
        "Level 3 is the ten-day Advanced Safety Management course. It moves from site practice to SHEQ systems, contractor safety, serious-incident investigation and the management work that keeps a standard standing.",
    },
    af: {
      eyebrow: "Safety Training, Level 3",
      title: "Lead the system behind a safe site.",
      body:
        "Level 3 is the ten-day Advanced Safety Management course. It moves from site practice to SHEQ systems, contractor safety, serious-incident investigation and the management work that keeps a standard standing.",
    },
  },
};

export function applyOfferIntro(slug: ApplyOfferSlug, lang: "en" | "af") {
  return APPLY_OFFER_INTROS[slug][lang];
}

/** Title and description per offer and language, in the site's own
 * title register: statement first, brand last. Descriptions hold the
 * SERP band in both languages. */
export function applyOfferMeta(slug: ApplyOfferSlug, lang: "en" | "af") {
  const name = OFFER_NAMES[slug];
  if (lang === "af") {
    return {
      title: `Aansoek: ${name.af} | Oryx Instituut`,
      description: `Doen aansoek vir ${name.af} by Oryx Instituut in Windhoek. Een boodskap aan die kantoor van die Prinsipaal begin die aansoek; antwoorde kom gewoonlik binne die week.`,
      ogTitle: `Aansoek: ${name.af} | Oryx Instituut`,
      ogDescription:
        "Een boodskap aan die kantoor van die Prinsipaal in Windhoek begin jou aansoek.",
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
