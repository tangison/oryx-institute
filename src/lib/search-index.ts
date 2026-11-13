import type { Lang } from "./i18n";
import { langPath } from "./i18n";
import { offers, faqs, footerNav, navLinks } from "./site";
import { offersAf, faqsAf, navAf } from "./site-af";
import { insights } from "./content";
import { resourcesAf } from "./content-af";
import { resources } from "./content";
import { directoryAll } from "./directory";

export type SearchEntry = {
  title: string;
  group: string;
  excerpt: string;
  href: string;
  words: string;
};

const trim = (s: string, n = 110) =>
  s.length <= n ? s : `${s.slice(0, s.lastIndexOf(" ", n - 1)).trimEnd()}...`;

/**
 * The search index is a static array computed per language at module
 * load: no server round trip, no client-side crawl. The whole site the
 * office actually publishes is in here: pages, offers, the Directory,
 * the Bulletin and the office answers.
 */
export function buildIndex(lang: Lang): SearchEntry[] {
  const af = lang === "af";
  const P = (path: string) => langPath(lang, path);
  const out: SearchEntry[] = [];
  const add = (
    title: string,
    group: string,
    excerpt: string,
    href: string,
    extraWords = ""
  ) =>
    out.push({
      title,
      group,
      excerpt: trim(excerpt),
      href,
      words: `${title} ${excerpt} ${extraWords}`.toLowerCase(),
    });

  /* Pages */
  const pages: [string, string, string, string][] = af
    ? [
        ["Navorsing", "Bladsye", "Die praktyk, die Bulletin en wat in ontwikkeling is.", "/research"],
        ["Praktyk", "Bladsye", "Besigheidsadvies, marknavorsing en vinnige-reaksie-opleiding, volgens standaard gelewer.", "/practice"],
        ["Ondernemings", "Bladsye", "Klein maatskappye wat die instituut open om 'n sektor te verstaan. Corner Spa is die eerste.", "/ventures"],
        ["Corner Spa", "Bladsye", "Die eerste onderneming: massering, warmklip-behandelings, naels en waks in Windhoek, per WhatsApp bespreek.", "/corner-spa"],
        ["Blog", "Bladsye", "Notas uit die praktyk, volgens publikasiedatum aangeteken.", "/blog"],
        ["Kontak", "Bladsye", "Bel of WhatsApp 083 676 4338, of skryf aan info@oryxinstitute.org.", "/contact"],
        ["Die register", "Bladsye", "Elke openbare stap wat die instituut geneem het, gedateer.", "/register"],
        ["Die Directory", "Bladsye", "Die Oryx Directory: gratis blitskursusse, besigheidsjablone en die Bulletin.", "/resources"],
        ["Doen aansoek", "Bladsye", "Een e-pos aan die kantoor begin die aansoek.", "/apply"],
        ["Oor", "Bladsye", "Wat die instituut is, wie dit lei en waar dit staan.", "/about"],
        ["Mense", "Bladsye", "Die mense wat die instituut bou: die Prinsipaal, instrukteurs en ondernemingsleiers.", "/about/staff"],
        ["Veiligheidsbeampte-kursus", "Bladsye", "Een, vyf en tien dae se beroepsveiligheidsopleiding vir Namibiese terreine.", "/practice/safety-officer-course"],
        ["Handelsmerk", "Bladsye", "Die woordmerk, embleem, kodes en stem.", "/brand"],
        ["Vrae", "Bladsye", "Die kantoor se antwoorde op vrae wat telkens opduik.", "/faq"],
      ]
    : [
        ["Research", "Pages", "The practice, the Bulletin, and what is in development.", "/research"],
        ["Practice", "Pages", "Counselling, market R&D and rapid response training, delivered to standard.", "/practice"],
        ["Ventures", "Pages", "Small companies the institute opens to understand a sector. Corner Spa is the first.", "/ventures"],
        ["Corner Spa", "Pages", "The first venture, now live: massage, hot stone treatments, nails and waxing in Windhoek, booked on WhatsApp at +264 81 623 4788. Full-screen entry; the counter is spa.mendozer.com.", "/corner-spa"],
        ["Blog", "Pages", "Notes from the practice, dated as published.", "/blog"],
        ["Contact", "Pages", "Call or WhatsApp 083 676 4338 (+264 83 676 4338 international), or write to info@oryxinstitute.org.", "/contact"],
        ["The register", "Pages", "Every public step the institute has taken, dated as it was said.", "/register"],
        ["The Directory", "Pages", "The Oryx Directory: free crash courses and business templates, plus the Bulletin.", "/resources"],
        ["Apply", "Pages", "One email to the office starts the application.", "/apply"],
        
        ["About", "Pages", "What the institute is, who leads it, and where it stands.", "/about"],
        ["People", "Pages", "The people building the institute: the Principal, instructors, ventures leads.", "/about/staff"],
        ["Safety officer course", "Pages", "One, five, and ten days of occupational safety training for Namibian sites.", "/practice/safety-officer-course"],
        ["Brand", "Pages", "The wordmark, the emblem, the codes and the voice.", "/brand"],
        ["FAQ", "Pages", "The office's answers to the questions that come every time.", "/faq"],
      ];
  for (const [title, group, excerpt, path] of pages) {
    add(title, group, excerpt, P(path));
  }

  /* Offers */
  const offersList = af
    ? offersAf.map((o) => [o.name, o.line, o.id] as const)
    : offers.map((o) => [o.name, o.line, o.id] as const);
  for (const [name, line, id] of offersList) {
    add(name, af ? "Aanbiedinge" : "Offers", line, P(`/apply/${id}`));
  }

  /* Directory: the works themselves carry their published titles. */
  for (const d of directoryAll) {
    const kind = d.kind === "course"
      ? af ? "Kursus" : "Course"
      : af ? "Sjabloon" : "Template";
    add(
      d.title,
      kind,
      d.standfirst,
      P(`/resources/${d.slug}`),
      `${d.kind} ${d.no}`
    );
  }

  /* Bulletin essays: published in English, searchable in both. */
  for (const i of insights) {
    add(
      i.title,
      "Bulletin",
      i.dek,
      P("/resources#bulletin"),
      i.no
    );
  }

  /* Office answers */
  const faqList = af ? faqsAf : faqs;
  for (const f of faqList) {
    add(f.q, af ? "Antwoorde" : "Answers", f.a, P("/faq"));
  }

  /* Free resources list */
  const resList = af ? resourcesAf : resources;
  for (const r of resList) {
    add(r.name, af ? "Hulpbronne" : "Resources", r.what, P(r.action.href));
  }

  /* Sitemap labels, so a half-remembered nav word lands. */
  const navList = af ? navAf.footerNav : footerNav;
  const seen = new Set(out.map((o) => o.href));
  for (const l of [...(af ? navAf.navLinks : navLinks), ...navList]) {
    const href = P(l.href);
    if (seen.has(href)) continue;
    add(l.label, af ? "Bladsye" : "Pages", "", href);
  }

  return out;
}

/** Score one query against the index. Title hits outrank body hits;
 * a word-prefix match outranks a mid-string one. */
export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = index.map((e) => {
    let score = 0;
    const title = e.title.toLowerCase();
    for (const t of terms) {
      if (title === t) score += 12;
      else if (title.startsWith(t)) score += 8;
      else if (title.includes(t)) score += 5;
      else if (e.words.includes(t)) score += 2;
      else return { e, score: -1 };
    }
    return { e, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.e);
}
