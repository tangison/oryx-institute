import type { Lang } from "@/lib/i18n";

/**
 * Recruitment data is kept separate from the institute's programme copy.
 * The specialisms below come from the approved recruitment artwork; they
 * describe the advertised role scope, not an offer of study, accreditation
 * or a public campus.
 */
export const recruitment = {
  email: "vacancies@oryxinstitute.org",
  location: "Ongwediva, Namibia",
  closesAt: "2026-11-27T23:59:00+02:00",
  timeZone: "Africa/Windhoek",
  timeZoneLabel: "CAT (UTC+2)",
} as const;

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

export type CareerRole = {
  slug: string;
  group: CareerRoleGroup;
  kind: CareerRoleKind;
  /** Exact public position title from the recruitment notices. */
  title: string;
  /** Exact subject or work-stream label from the supplied notice. */
  specialism?: string;
  /** The entrepreneurship notice appears on the consolidated flyer only. */
  source: "individual-notice" | "consolidated-notice";
};

const leadInstructor = (slug: string, specialism: string, source: CareerRole["source"] = "individual-notice"): CareerRole => ({
  slug,
  group: "instruction",
  kind: "lead-instructor",
  title: "Lead Instructor",
  specialism,
  source,
});

/**
 * Every advertised position has a distinct route. The first three roles
 * and the nineteen subject-specific Lead Instructor notices are individual
 * flyers. Entrepreneurship is retained because it is named on the
 * consolidated notice; its page says exactly that.
 */
export const careerRoles: readonly CareerRole[] = [
  {
    slug: "centre-manager",
    group: "operations",
    kind: "centre-manager",
    title: "Centre Manager",
    source: "individual-notice",
  },
  {
    slug: "independent-moderator",
    group: "quality",
    kind: "independent-moderator",
    title: "Independent Moderator",
    source: "individual-notice",
  },
  {
    slug: "learner-records-administrator",
    group: "records",
    kind: "learner-records",
    title: "Learner Records Administrator",
    source: "individual-notice",
  },
  leadInstructor(
    "occupational-health-and-safety-certificate-nqf-4",
    "Certificate in Occupational Health and Safety (NQF 4)"
  ),
  leadInstructor(
    "occupational-health-and-safety-national-vocational-diploma-nqf-5",
    "National Vocational Diploma in Occupational Health and Safety (NQF 5)"
  ),
  leadInstructor(
    "basic-workplace-health-and-safety",
    "Short course: Basic Workplace Health and Safety"
  ),
  leadInstructor(
    "safety-representative-and-fire-safety",
    "Short course: Safety Representative and Fire Safety"
  ),
  leadInstructor(
    "business-services-office-administration-l1",
    "Business Services: Office Administration L1"
  ),
  leadInstructor(
    "business-services-office-administration-l2",
    "Business Services: Office Administration L2"
  ),
  leadInstructor(
    "business-services-office-administration-l3",
    "Business Services: Office Administration L3"
  ),
  leadInstructor(
    "computer-literacy-front-desk-reception-records-management",
    "Short courses: Computer Literacy; Front Desk and Reception; Records Management"
  ),
  leadInstructor(
    "hospitality-tourism-l2-front-office-housekeeping",
    "Hospitality and Tourism L2, Strand A: Front Office / Housekeeping"
  ),
  leadInstructor(
    "hospitality-tourism-l2-commercial-cookery-food-beverage",
    "Hospitality and Tourism L2, Strand B: Commercial Cookery / Food and Beverage"
  ),
  leadInstructor(
    "hospitality-tourism-l3-strand-specialisation",
    "Hospitality and Tourism L3 (strand specialisation)"
  ),
  leadInstructor("cosmetology-hairdressing-l2", "Cosmetology (Hairdressing) L2"),
  leadInstructor("cosmetology-hairdressing-l3", "Cosmetology (Hairdressing) L3"),
  leadInstructor("local-guide-l1", "Hospitality and Tourism: Local Guide L1"),
  leadInstructor("local-guide-l2", "Hospitality and Tourism: Local Guide L2"),
  leadInstructor("local-guide-l3", "Hospitality and Tourism: Local Guide L3"),
  leadInstructor("wholesale-retail-operations-l2", "Wholesale and Retail Operations L2"),
  leadInstructor("wholesale-retail-distribution-l2", "Wholesale and Retail Distribution L2"),
  leadInstructor("merchandising-stock-control", "Short course: Merchandising and Stock Control"),
  leadInstructor("entrepreneurship", "Entrepreneurship", "consolidated-notice"),
] as const;

export function getCareerRole(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}

export function careerRoleName(role: CareerRole): string {
  return role.specialism ? `${role.title} — ${role.specialism}` : role.title;
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
      instruction: "Lead instruction",
    },
    af: {
      operations: "Sentrumbedrywighede",
      quality: "Gehalteversekering",
      records: "Rekordadministrasie",
      instruction: "Leidende onderrig",
    },
  } as const;

  return labels[lang][group];
}

export function careerRoleSummary(role: CareerRole, lang: Lang): string {
  const name = careerRoleName(role);

  if (lang === "af") {
    switch (role.kind) {
      case "centre-manager":
        return "Koördineer die toekomstige sentrum se daaglikse gereedheid, administrasie en rekordstelsels.";
      case "independent-moderator":
        return "Voer onafhanklike gehalteondersoeke van assesseringsprosesse en bewyse binne ’n formeel goedgekeurde omvang uit.";
      case "learner-records":
        return "Hou leerderlêers, beheerde rekords en administrasie akkuraat, veilig en vindbaar.";
      case "lead-instructor":
        return `${name}: vakspesialis-bydrae tot beplande leer- en assesseringswerk binne die aangeduide omvang.`;
    }
  }

  switch (role.kind) {
    case "centre-manager":
      return "Coordinate future centre readiness, day-to-day administration and record systems.";
    case "independent-moderator":
      return "Carry out independent quality checks of assessment processes and evidence within a formally approved scope.";
    case "learner-records":
      return "Keep learner files, controlled records and administration accurate, secure and retrievable.";
    case "lead-instructor":
      return `${name}: subject-specialist contribution to planned learning and assessment work within the stated scope.`;
  }
}

export function careerRoleOverview(role: CareerRole, lang: Lang): string {
  if (lang === "af") {
    switch (role.kind) {
      case "centre-manager":
        return "Die Centre Manager help om bedrywighede, mense, inligting en hulpbronne ordelik voor te berei en te koördineer. Die rol bring praktiese bestuur en duidelike administratiewe beheer na die sentrum se vestigingswerk.";
      case "independent-moderator":
        return "Die Independent Moderator bied ’n onafhanklike, bewysgerigte gehalteperspektief. Die rol ondersoek of interne prosesse konsekwent gevolg word en teken bevindings duidelik aan vir opvolg.";
      case "learner-records":
        return "Die Learner Records Administrator help om beheer oor rekords van die begin af te vestig. Die werk vereis noukeurigheid, vertroulikheid en ’n sistematiese benadering tot lêers, toegang en naspeurbaarheid.";
      case "lead-instructor":
        return `Oryx werf ’n Lead Instructor vir beplande werk binne ${role.specialism}. Die spesialisering dui die beoogde werk- en assesseringsomvang aan; dit kondig nie ’n geakkrediteerde kursus, kwalifikasie, inname of openbare kampus aan nie.`;
    }
  }

  switch (role.kind) {
    case "centre-manager":
      return "The Centre Manager helps prepare and coordinate operations, people, information and resources in an orderly way. The role brings practical management and clear administrative control to the centre-establishment work.";
    case "independent-moderator":
      return "The Independent Moderator brings an independent, evidence-led quality perspective. The role checks whether internal processes are followed consistently and records clear findings for follow-up.";
    case "learner-records":
      return "The Learner Records Administrator helps establish record control from the outset. The work calls for accuracy, confidentiality and a systematic approach to files, access and traceability.";
    case "lead-instructor":
      return `Oryx is recruiting a Lead Instructor for planned work in ${role.specialism}. The specialism identifies the intended learning and assessment scope; it does not announce an accredited course, qualification, intake or public campus.`;
  }
}

export function careerRoleContributions(role: CareerRole, lang: Lang): readonly string[] {
  const english: Record<CareerRoleKind, readonly string[]> = {
    "centre-manager": [
      "Coordinate centre-readiness work, schedules, information flows and the practical use of shared resources.",
      "Maintain orderly administrative records and surface gaps, risks and decisions for timely follow-up.",
      "Support clear communication among operations, quality and delivery colleagues while work is being established.",
      "Help put fair, accessible and documented processes in place before any approved public activity begins.",
    ],
    "independent-moderator": [
      "Review assessment-related processes and evidence independently, within the scope formally approved for the work.",
      "Record objective findings, identify gaps and recommend practical corrective actions without taking over the process reviewed.",
      "Treat candidate and learner information confidentially and maintain a clear audit trail for moderation work.",
      "Contribute to internal quality assurance that is fair, consistent and evidence-led.",
    ],
    "learner-records": [
      "Organise controlled learner files, registers and supporting records so they can be found and checked when required.",
      "Apply clear naming, access, retention and correction practices to records in the role’s care.",
      "Check record completeness and escalate discrepancies through the appropriate internal route.",
      "Handle personal information carefully and share it only for a legitimate work purpose.",
    ],
    "lead-instructor": [
      "Bring current subject knowledge to the preparation, review and improvement of learning and assessment materials for the stated scope.",
      "Deliver or support learning and assessment work only within the scope formally approved for Oryx at the time.",
      "Keep accurate work, attendance and assessment records, and participate in internal quality and moderation processes.",
      "Create a respectful, accessible learning environment and raise safety, quality or learner-support issues promptly.",
    ],
  };

  const afrikaans: Record<CareerRoleKind, readonly string[]> = {
    "centre-manager": [
      "Koördineer sentrum-gereedheidswerk, skedules, inligtingsvloei en die praktiese gebruik van gedeelde hulpbronne.",
      "Hou administratiewe rekords ordelik en bring gapings, risiko’s en besluite betyds vir opvolg na vore.",
      "Ondersteun duidelike kommunikasie tussen bedrywighede, gehalte- en leweringskollegas terwyl die werk gevestig word.",
      "Help om billike, toeganklike en gedokumenteerde prosesse in plek te kry voordat goedgekeurde openbare aktiwiteit begin.",
    ],
    "independent-moderator": [
      "Ondersoek assesseringsverwante prosesse en bewyse onafhanklik binne die omvang wat formeel vir die werk goedgekeur is.",
      "Teken objektiewe bevindings aan, identifiseer gapings en beveel uitvoerbare regstellende stappe aan sonder om die ondersoekte proses oor te neem.",
      "Hanteer kandidaat- en leerderinligting vertroulik en behou ’n duidelike ouditspoor vir modereringswerk.",
      "Dra by tot interne gehalteversekering wat billik, konsekwent en bewysgerig is.",
    ],
    "learner-records": [
      "Organiseer beheerde leerderlêers, registers en stawende rekords sodat dit gevind en nagegaan kan word wanneer nodig.",
      "Pas duidelike naamgewing-, toegangs-, bewaring- en regstellingspraktyke toe op rekords onder die rol se beheer.",
      "Kontroleer rekordvolledigheid en eskaleer teenstrydighede deur die toepaslike interne roete.",
      "Hanteer persoonlike inligting versigtig en deel dit slegs vir ’n wettige werksdoel.",
    ],
    "lead-instructor": [
      "Bring huidige vakkennis na die voorbereiding, hersiening en verbetering van leer- en assesseringsmateriaal vir die aangeduide omvang.",
      "Lewer of ondersteun leer- en assesseringswerk slegs binne die omvang wat op daardie tydstip formeel vir Oryx goedgekeur is.",
      "Hou akkurate werks-, bywonings- en assesseringsrekords, en neem deel aan interne gehalte- en modereringsprosesse.",
      "Skep ’n respekvolle, toeganklike leeromgewing en meld veiligheids-, gehalte- of leerderondersteuningskwessies onmiddellik aan.",
    ],
  };

  return (lang === "af" ? afrikaans : english)[role.kind];
}
