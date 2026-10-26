import type { Lang } from "./i18n";
import { langPath } from "./i18n";
import { offers, faqs, footerNav, navLinks } from "./site";
import { offersZh, faqsZh, navZh } from "./site-zh";
import { insights } from "./content";
import { resourcesZh } from "./content-zh";
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
  const af = lang === "zh";
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
        ["研究", "页面", "实务、公报，以及在建的东西。", "/research"],
        ["实务", "页面", "经营咨询、市场调研与快速响应培训，按标准交付。", "/practice"],
        ["实业", "页面", "学院为弄懂一个行业开设的小公司。Corner Spa 是第一项。", "/ventures"],
        ["登记册", "页面", "学院走过的每一步公开的路，说了就记下日期。", "/register"],
        ["资源目录", "页面", "Oryx 资源目录：免费的速成课与商业模板，另有公报。", "/resources"],
        ["申请", "页面", "给办公室的一封邮件，申请就开始了。", "/apply"],
        ["联系", "页面", "唯一的一个邮箱，以及办公室怎么回信。", "/contact"],
        ["关于", "页面", "学院是什么、谁在主持、它站在哪里。", "/about"],
        ["品牌", "页面", "字标、徽记、色码与文风。", "/brand"],
        ["常见问题", "页面", "办公室对那些每次都会被问到的问题的回答。", "/faq"],
      ]
    : [
        ["Research", "Pages", "The practice, the Bulletin, and what is in development.", "/research"],
        ["Practice", "Pages", "Counselling, market R&D and rapid response training, delivered to standard.", "/practice"],
        ["Ventures", "Pages", "Small companies the institute opens to understand a sector. Corner Spa is the first.", "/ventures"],
        ["The register", "Pages", "Every public step the institute has taken, dated as it was said.", "/register"],
        ["The Directory", "Pages", "The Oryx Directory: free crash courses and business templates, plus the Bulletin.", "/resources"],
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
    ? offersZh.map((o) => [o.name, o.line, o.id] as const)
    : offers.map((o) => [o.name, o.line, o.id] as const);
  for (const [name, line, id] of offersList) {
    add(name, af ? "服务" : "Offers", line, P(`/apply?for=${id}`));
  }

  /* Directory: the works themselves carry their published titles. */
  for (const d of directoryAll) {
    const kind = d.kind === "course"
      ? af ? "课程" : "Course"
      : af ? "模板" : "Template";
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
  const faqList = af ? faqsZh : faqs;
  for (const f of faqList) {
    add(f.q, af ? "回答" : "Answers", f.a, P("/faq"));
  }

  /* Free resources list */
  const resList = af ? resourcesZh : resources;
  for (const r of resList) {
    add(r.name, af ? "资源" : "Resources", r.what, P(r.action.href));
  }

  /* Sitemap labels, so a half-remembered nav word lands. */
  const navList = af ? navZh.footerNav : footerNav;
  const seen = new Set(out.map((o) => o.href));
  for (const l of [...(af ? navZh.navLinks : navLinks), ...navList]) {
    const href = P(l.href);
    if (seen.has(href)) continue;
    add(l.label, af ? "页面" : "Pages", "", href);
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
