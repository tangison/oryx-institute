import type { Lang } from "@/lib/i18n";

/**
 * Recruitment data is separate from programme copy. A Lead Instructor
 * position represents one senior programme role across the grouped scope;
 * it is never a claim that Oryx currently offers a course, accreditation,
 * NQF credit, enrolment or a public campus.
 */
/**
 * One publication switch controls every recruitment surface.  Keep a closed
 * campaign out of navigation emphasis, home-page promotion, search and the
 * sitemap as well as off the careers page itself.
 */
export const recruitment = {
  status: "closed" as "open" | "closed",
  email: "vacancies@oryxinstitute.org",
  location: "Ongwediva, Namibia",
  closesAt: "2026-11-27T23:59:00+02:00",
  timeZone: "Africa/Windhoek",
  timeZoneLabel: "CAT (UTC+2)",
} as const;

export const hasOpenVacancies = recruitment.status === "open";

export type CareerRoleGroup =
  | "operations"
  | "quality"
  | "records"
  | "instruction";

export type CareerRoleKind =
  | "centre-manager"
  | "independent-moderator"
  | "learner-records"
  | "lead-instructor";

export type CareerNoticeType =
  | "individual-position-notice"
  | "programme-position-notice"
  | "consolidated-campaign-notice";

export type CareerRole = {
  slug: string;
  group: CareerRoleGroup;
  kind: CareerRoleKind;
  title: string;
  /** The public programme or work-stream label for this one position. */
  specialism?: string;
  /** Source scopes combined into this one programme position. */
  scope?: readonly string[];
  noticeType: CareerNoticeType;
};

const leadInstructor = (
  slug: string,
  specialism: string,
  scope: readonly string[],
  noticeType: CareerNoticeType = "programme-position-notice"
): CareerRole => ({
  slug,
  group: "instruction",
  kind: "lead-instructor",
  title: "Lead Instructor",
  specialism,
  scope,
  noticeType,
});

/**
 * One senior Lead Instructor is recruited per coherent programme scope,
 * rather than once per level, strand or short-course title. The scope lists
 * preserve the source notices behind the consolidated advertisement.
 */
export const careerRoles: readonly CareerRole[] = [
  {
    slug: "centre-manager",
    group: "operations",
    kind: "centre-manager",
    title: "Centre Manager",
    noticeType: "individual-position-notice",
  },
  {
    slug: "independent-moderator",
    group: "quality",
    kind: "independent-moderator",
    title: "Independent Moderator",
    noticeType: "individual-position-notice",
  },
  {
    slug: "learner-records-administrator",
    group: "records",
    kind: "learner-records",
    title: "Learner Records Administrator",
    noticeType: "individual-position-notice",
  },
  leadInstructor(
    "occupational-health-and-safety",
    "Occupational Health, Safety and Fire Safety (NQF 4–5 and short-course scope)",
    [
      "Certificate in Occupational Health and Safety (NQF 4)",
      "National Vocational Diploma in Occupational Health and Safety (NQF 5)",
      "Short course: Basic Workplace Health and Safety",
      "Short course: Safety Representative and Fire Safety",
    ]
  ),
  leadInstructor(
    "business-services-and-administration",
    "Business Services and Administration (Office Administration L1–L3)",
    [
      "Business Services: Office Administration L1",
      "Business Services: Office Administration L2",
      "Business Services: Office Administration L3",
      "Short courses: Computer Literacy; Front Desk and Reception; Records Management",
    ]
  ),
  leadInstructor(
    "hospitality-tourism-and-local-guiding",
    "Hospitality, Tourism and Local Guiding (L1–L3)",
    [
      "Hospitality and Tourism L2, Strand A: Front Office / Housekeeping",
      "Hospitality and Tourism L2, Strand B: Commercial Cookery / Food and Beverage",
      "Hospitality and Tourism L3 (strand specialisation)",
      "Hospitality and Tourism: Local Guide L1",
      "Hospitality and Tourism: Local Guide L2",
      "Hospitality and Tourism: Local Guide L3",
    ]
  ),
  leadInstructor(
    "cosmetology-hairdressing",
    "Cosmetology (Hairdressing) (L2–L3)",
    [
      "Cosmetology (Hairdressing) L2",
      "Cosmetology (Hairdressing) L3",
    ]
  ),
  leadInstructor(
    "wholesale-retail-and-merchandising",
    "Wholesale, Retail and Merchandising (L2 and short-course scope)",
    [
      "Wholesale and Retail Operations L2",
      "Wholesale and Retail Distribution L2",
      "Short course: Merchandising and Stock Control",
    ]
  ),
  leadInstructor(
    "entrepreneurship",
    "Entrepreneurship",
    ["Entrepreneurship"],
    "consolidated-campaign-notice"
  ),
] as const;

/** Old level-specific paths resolve to their single programme notice. */
export const careerRoleRedirects: Readonly<Record<string, string>> = {
  "occupational-health-and-safety-certificate-nqf-4": "occupational-health-and-safety",
  "occupational-health-and-safety-national-vocational-diploma-nqf-5": "occupational-health-and-safety",
  "basic-workplace-health-and-safety": "occupational-health-and-safety",
  "safety-representative-and-fire-safety": "occupational-health-and-safety",
  "business-services-office-administration-l1": "business-services-and-administration",
  "business-services-office-administration-l2": "business-services-and-administration",
  "business-services-office-administration-l3": "business-services-and-administration",
  "computer-literacy-front-desk-reception-records-management": "business-services-and-administration",
  "hospitality-tourism-l2-front-office-housekeeping": "hospitality-tourism-and-local-guiding",
  "hospitality-tourism-l2-commercial-cookery-food-beverage": "hospitality-tourism-and-local-guiding",
  "hospitality-tourism-l3-strand-specialisation": "hospitality-tourism-and-local-guiding",
  "local-guide-l1": "hospitality-tourism-and-local-guiding",
  "local-guide-l2": "hospitality-tourism-and-local-guiding",
  "local-guide-l3": "hospitality-tourism-and-local-guiding",
  "cosmetology-hairdressing-l2": "cosmetology-hairdressing",
  "cosmetology-hairdressing-l3": "cosmetology-hairdressing",
  "wholesale-retail-operations-l2": "wholesale-retail-and-merchandising",
  "wholesale-retail-distribution-l2": "wholesale-retail-and-merchandising",
  "merchandising-stock-control": "wholesale-retail-and-merchandising",
};

export function getCareerRole(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}

export function getCareerRoleRedirect(slug: string): string | undefined {
  return careerRoleRedirects[slug];
}

export function careerRoleName(role: CareerRole): string {
  return role.specialism ? `${role.title}, ${role.specialism}` : role.title;
}

export function careerRoleTag(role: CareerRole, lang: Lang): string {
  const labels = {
    en: {
      "centre-manager": "Operations leadership",
      "independent-moderator": "Quality assurance",
      "learner-records": "Records administration",
      "lead-instructor": "Programme leadership",
    },
    af: {
      "centre-manager": "Bedryfsleierskap",
      "independent-moderator": "Gehalteversekering",
      "learner-records": "Rekordadministrasie",
      "lead-instructor": "Programleierskap",
    },
  } as const;

  return labels[lang][role.kind];
}

export function careerRoleScope(role: CareerRole): readonly string[] {
  return role.scope ?? [];
}

export function formatRecruitmentDeadline(lang: Lang): string {
  const date = new Date(recruitment.closesAt);
  const formatted = new Intl.DateTimeFormat(lang === "af" ? "af-NA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: recruitment.timeZone,
  }).format(date);

  return `${formatted} ${recruitment.timeZoneLabel}`;
}

export function careerGroupLabel(group: CareerRoleGroup, lang: Lang): string {
  const labels = {
    en: {
      operations: "Centre operations",
      quality: "Quality assurance",
      records: "Records administration",
      instruction: "Programme leadership",
    },
    af: {
      operations: "Sentrumbedrywighede",
      quality: "Gehalteversekering",
      records: "Rekordadministrasie",
      instruction: "Programleierskap",
    },
  } as const;

  return labels[lang][group];
}

export function careerNoticeLabel(noticeType: CareerNoticeType, lang: Lang): string {
  const labels = {
    en: {
      "individual-position-notice": "Individual position notice",
      "programme-position-notice": "Programme position notice",
      "consolidated-campaign-notice": "Consolidated campaign notice",
    },
    af: {
      "individual-position-notice": "Individuele poskennisgewing",
      "programme-position-notice": "Programposkennisgewing",
      "consolidated-campaign-notice": "Gekonsolideerde veldtogkennisgewing",
    },
  } as const;

  return labels[lang][noticeType];
}

export function careerRoleSummary(role: CareerRole, lang: Lang): string {
  if (lang === "af") {
    switch (role.slug) {
      case "centre-manager":
        return "’n Senior bedryfsrol vir Oryx se beplande sentrum in Ongwediva.";
      case "independent-moderator":
        return "’n Onafhanklike gehalterol binne die sentrumvestigingswerwing.";
      case "learner-records-administrator":
        return "’n Rekordgerigte pos binne die sentrumvestigingswerwing.";
      case "occupational-health-and-safety":
        return "Een Lead Instructor-rol vir die NQF 4–5- en kortkursusomvang in beroepsgesondheid, veiligheid en brandveiligheid.";
      case "business-services-and-administration":
        return "Een Lead Instructor-rol wat Office Administration-vlakke 1 tot 3 en die verwante kortkursusse dek.";
      case "hospitality-tourism-and-local-guiding":
        return "Een Lead Instructor-rol vir die verwante vlakke in gasvryheid, toerisme en plaaslike gidswerk.";
      case "cosmetology-hairdressing":
        return "Een Lead Instructor-rol wat die Cosmetology- en Hairdressing-vlakke dek.";
      case "wholesale-retail-and-merchandising":
        return "Een Lead Instructor-rol vir groothandel, kleinhandel, handelsware en die verwante kortkursusomvang.";
      case "entrepreneurship":
        return "Een Lead Instructor-rol vir die entrepreneurskapomvang wat in hierdie kennisgewing genoem word.";
    }
    return "Een Lead Instructor-rol vir die gepubliseerde programomvang.";
  }

  switch (role.slug) {
    case "centre-manager":
      return "A senior operations role for Oryx’s planned centre in Ongwediva.";
    case "independent-moderator":
      return "An independent quality role within the centre-establishment recruitment.";
    case "learner-records-administrator":
      return "A records-focused post within the centre-establishment recruitment.";
    case "occupational-health-and-safety":
      return "One Lead Instructor role for the NQF 4–5 and short-course scope in occupational health, safety and fire safety.";
    case "business-services-and-administration":
      return "One Lead Instructor role covering Office Administration Levels 1 to 3 and the related short courses.";
    case "hospitality-tourism-and-local-guiding":
      return "One Lead Instructor role for the related Hospitality, Tourism and Local Guiding levels.";
    case "cosmetology-hairdressing":
      return "One Lead Instructor role covering the Cosmetology and Hairdressing levels.";
    case "wholesale-retail-and-merchandising":
      return "One Lead Instructor role for wholesale, retail, merchandising and the related short-course scope.";
    case "entrepreneurship":
      return "One Lead Instructor role for the entrepreneurship scope named in this notice.";
  }
  return "One Lead Instructor role for the published programme scope.";
}

export function careerRoleOverview(role: CareerRole, lang: Lang): string {
  const isProgrammePosition = role.kind === "lead-instructor";

  if (lang === "af") {
    return isProgrammePosition
      ? "Hierdie Lead Instructor-rol bring verwante vlakke, rigtings en kortkursusse in een aansoek saam. Die lys dui die beplande programomvang vir hierdie rol aan."
      : "Hierdie pos vorm deel van Oryx se sentrumvestigingswerwing in Ongwediva.";
  }

  return isProgrammePosition
    ? "This Lead Instructor role brings related levels, strands and short courses into one application. The list identifies the planned programme scope for this role."
    : "This position forms part of Oryx’s centre-establishment recruitment in Ongwediva.";
}
