import type { Lang } from "./i18n";
import { langPath } from "./i18n";
import { careerRoleName, careerRoleSummary, careerRoles, hasOpenVacancies } from "./careers";
import { offers, faqs, footerNav, navLinks } from "./site";
import { offersAf, faqsAf, navAf } from "./site-af";
import { insights } from "./content";

export type SearchEntry = {
  title: string;
  group: string;
  excerpt: string;
  href: string;
  words: string;
};

const trim = (value: string, length = 110) =>
  value.length <= length ? value : `${value.slice(0, value.lastIndexOf(" ", length - 1)).trimEnd()}...`;

/** The static on-site index follows the published site, not retired
 * material. Search never exposes removed resource-library documents. */
export function buildIndex(lang: Lang): SearchEntry[] {
  const af = lang === "af";
  const path = (href: string) => langPath(lang, href);
  const out: SearchEntry[] = [];
  const add = (title: string, group: string, excerpt: string, href: string, extra = "") =>
    out.push({
      title,
      group,
      excerpt: trim(excerpt),
      href,
      words: `${title} ${excerpt} ${extra}`.toLowerCase(),
    });

  const pages: [string, string, string, string][] = af
    ? [
        ["Navorsing", "Bladsye", "Marknavorsing, gepubliseerde navorsingsnotas en werk in ontwikkeling.", "/research"],
        ["Praktyk", "Bladsye", "Besigheidsadvies, marknavorsing en praktiese ondersteuning.", "/practice"],
        ["Ondernemings", "Bladsye", "Klein bedryfsmaatskappye. Corner Spa is die eerste.", "/ventures"],
        ["Institusionele status", "Bladsye", "NTA-registrasiewerk en Oryx se huidige ongeakkrediteerde status.", "/status"],
        ["Die register", "Bladsye", "Elke openbare stap wat die instituut geneem het, gedateer.", "/register"],
        ["Doen navraag", "Bladsye", "Een boodskap aan die Oryx-kantoor begin 'n gesprek.", "/apply"],
        ["Loopbane", "Bladsye", "Werwingsopdaterings; geen vakatures is tans oop nie.", "/careers"],
        ["Oor", "Bladsye", "Wat die instituut is, waar dit staan en hoe dit werk.", "/about"],
        ["Kontak", "Bladsye", "Bel, WhatsApp of skryf aan info@oryxinstitute.org.", "/contact"],
        ["Vrae", "Bladsye", "Die kantoor se antwoorde op algemene vrae.", "/faq"],
      ]
    : [
        ["Research", "Pages", "Market research, published research notes and work in development.", "/research"],
        ["Practice", "Pages", "Business counselling, market research and practical support.", "/practice"],
        ["Ventures", "Pages", "Small operating companies. Corner Spa is the first.", "/ventures"],
        ["Institutional status", "Pages", "NTA registration work and Oryx's current non-accredited status.", "/status"],
        ["The register", "Pages", "Every public step the institute has taken, dated as it was said.", "/register"],
        ["Enquire", "Pages", "One message to the Oryx office starts a conversation.", "/apply"],
        ["Careers", "Pages", "Recruitment updates; no vacancies are currently open.", "/careers"],
        ["About", "Pages", "What the institute is, where it stands and how it works.", "/about"],
        ["Contact", "Pages", "Call, WhatsApp or write to info@oryxinstitute.org.", "/contact"],
        ["FAQ", "Pages", "The office's answers to common questions.", "/faq"],
      ];

  for (const [title, group, excerpt, href] of pages) add(title, group, excerpt, path(href));

  const offersList = af ? offersAf : offers;
  for (const offer of offersList) {
    add(offer.name, af ? "Werk" : "Work", offer.line, path(`/practice#${offer.id}`));
  }

  if (hasOpenVacancies) {
    for (const role of careerRoles) {
      add(
        careerRoleName(role),
        af ? "Loopbane" : "Careers",
        careerRoleSummary(role, lang),
        path(`/careers/${role.slug}`),
        role.specialism ?? ""
      );
    }
  }

  for (const note of insights) {
    add(note.title, af ? "Navorsingsnotas" : "Research notes", note.dek, path(`/research#note-${note.id}`), note.no);
  }

  for (const faq of af ? faqsAf : faqs) add(faq.q, af ? "Antwoorde" : "Answers", faq.a, path("/faq"));

  const nav = af ? navAf : { navLinks, footerNav };
  const seen = new Set(out.map((entry) => entry.href));
  for (const link of [...nav.navLinks, ...nav.footerNav]) {
    const href = path(link.href);
    if (!seen.has(href)) add(link.label, af ? "Bladsye" : "Pages", "", href);
  }

  return out;
}

export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const queryText = query.trim().toLowerCase();
  if (queryText.length < 2) return [];
  const terms = queryText.split(/\s+/).filter(Boolean);

  return index
    .map((entry) => {
      let score = 0;
      const title = entry.title.toLowerCase();
      for (const term of terms) {
        if (title === term) score += 12;
        else if (title.startsWith(term)) score += 8;
        else if (title.includes(term)) score += 5;
        else if (entry.words.includes(term)) score += 2;
        else return { entry, score: -1 };
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => entry);
}
