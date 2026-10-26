import type { Lang } from "./i18n";
import { langPath } from "./i18n";
import { offers, faqs, footerNav, navLinks } from "./site";
import { offersAf, faqsAf, navAf } from "./site-af";
import { insights } from "./content";
import { resourcesAf } from "./content-af";
import { resources } from "./content";
import { directoryAll } from "./directory";
import { getNews } from "./news";

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
 * the Bulletin, announcements and the office answers.
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
        ["Programme", "Bladsye", "Kondens- en kortkursusse in twee departemente: besigheidsadministrasie, en IT en verwante velde.", "/programmes"],
        ["Navorsing", "Bladsye", "Die praktyk, die Bulletin, en wat in ontwikkeling is.", "/research"],
        ["Praktyk", "Bladsye", "Berading, marknavorsing en spoedreaksie-opleiding, tot standaard gelewer.", "/practice"],
        ["Ondernemings", "Bladsye", "Klein maatskappye wat die instituut open om 'n sektor te verstaan. Corner Spa is die eerste.", "/ventures"],
        ["Die register", "Bladsye", "Elke openbare stap wat die instituut geneem het, gedateer soos dit gesê is.", "/register"],
        ["Skole", "Bladsye", "Drie skole, gefaseer. Tegnologie is oop vir navraag.", "/schools"],
        ["Hulpbronne", "Bladsye", "Die Oryx-gids: gratis kondenskursusse en besigheidssjablone, plus die Bulletin.", "/resources"],
        ["Gereedskap", "Bladsye", "Elke gereedskap waarop die instituut loop, openlik gepubliseer.", "/tools"],
        ["Nuus", "Bladsye", "Aankondigings van die instituut, gedateer soos dit gebeur.", "/news"],
        ["Skryf in", "Bladsye", "Een e-pos aan die kantoor begin die aansoek.", "/apply"],
        ["Kontak", "Bladsye", "Die een posbus, en hoe die kantoor antwoord.", "/contact"],
        ["Oor", "Bladsye", "Wat die instituut is, wie dit lei, en waar dit staan.", "/about"],
        ["Handelsmerk", "Bladsye", "Die woordmerk, die embleem, die kodes en die stem.", "/brand"],
        ["Gereelde vrae", "Bladsye", "Die kantoor se antwoorde op die vrae wat elke keer kom.", "/faq"],
      ]
    : [
        ["Programmes", "Pages", "Crash and short courses in two departments: business administration, and IT and related fields.", "/programmes"],
        ["Research", "Pages", "The practice, the Bulletin, and what is in development.", "/research"],
        ["Practice", "Pages", "Counselling, market R&D and rapid response training, delivered to standard.", "/practice"],
        ["Ventures", "Pages", "Small companies the institute opens to understand a sector. Corner Spa is the first.", "/ventures"],
        ["The register", "Pages", "Every public step the institute has taken, dated as it was said.", "/register"],
        ["Schools", "Pages", "Three schools, phased. Technology is open for enquiry.", "/schools"],
        ["Resources", "Pages", "The Oryx Directory: free crash courses and business templates, plus the Bulletin.", "/resources"],
        ["Tools", "Pages", "Every tool the institute runs on, published in the open.", "/tools"],
        ["News", "Pages", "Announcements from the institute, dated as they happen.", "/news"],
        ["Apply", "Pages", "One email to the office starts the application.", "/apply"],
        ["Contact", "Pages", "The one mailbox, and how the office answers.", "/contact"],
        ["About", "Pages", "What the institute is, who leads it, and where it stands.", "/about"],
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
    add(name, af ? "Aanbiedings" : "Offers", line, P(`/apply?for=${id}`));
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
      af ? "Bulletin" : "Bulletin",
      i.dek,
      P("/resources#bulletin"),
      i.no
    );
  }

  /* Announcements */
  for (const n of getNews()) {
    add(
      n.title,
      af ? "Aankondigings" : "Announcements",
      n.description,
      P(`/announcements/${n.slug}`)
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
