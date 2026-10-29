import {
  COPYRIGHT_LINE,
  FREE_LINE,
  directoryAll,
  getDoc,
  type Block,
  type Doc,
} from "@/lib/directory";
import { site } from "@/lib/site";

/**
 * The markdown shelf: the whole site as clean markdown for any client
 * that negotiates text/markdown. Served from /md by the proxy when an
 * Accept header asks for it; the HTML page stays the canonical form.
 * English only — the documents are published in English, and the zh
 * pages note it in their listing metadata.
 */

export type IndexRow = {
  path: string;
  title: string;
  note: string;
};

const PAGES: IndexRow[] = [
  { path: "/", title: "Oryx Polytechnic Institute", note: "Home" },
  {
    path: "/about",
    title: "About the Institute",
    note: "Who runs it, how it is funded, what it is for",
  },
  {
    path: "/apply",
    title: "Apply: Courses and the Practice",
    note: "One email to the Principal's office starts it",
  },
  {
    path: "/brand",
    title: "The Brand Register",
    note: "The institute's marks, colours and rules of use",
  },
  {
    path: "/contact",
    title: "Contact the Office",
    note: "One mailbox answers everything",
  },
  {
    path: "/faq",
    title: "Questions & Answers",
    note: "Answered as they are asked",
  },
  {
    path: "/practice",
    title: "The Practice: Work That Holds",
    note: "Consulting work the institute takes and holds",
  },
  {
    path: "/register",
    title: "The Public Register",
    note: "Everything the institute has published, dated",
  },
  {
    path: "/research",
    title: "Research & Development",
    note: "What the institute is building next",
  },
  {
    path: "/resources",
    title: "The Oryx Directory & Bulletin",
    note: "The free library and the cited essays",
  },
  {
    path: "/ventures",
    title: "Small Companies, Real Customers",
    note: "Ventures the institute runs to teach from",
  },
];

/** The whole shelf as index rows: pages first, then every document. */
export function buildIndex(): IndexRow[] {
  const docs: IndexRow[] = directoryAll.map((d) => ({
    path: `/resources/${d.slug}`,
    title: d.title,
    note: `${d.no} · ${d.readMinutes} min read · ${d.kind === "course" ? "crash course" : "fill-in template"}`,
  }));
  return [...PAGES, ...docs];
}

function mdEscape(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function blockToMd(b: Block): string {
  if (b.t === "p") return b.text;
  if (b.t === "list") return b.items.map((i) => `- ${i}`).join("\n");
  const head = `| ${b.head.map(mdEscape).join(" | ")} |`;
  const rule = `| ${b.head.map(() => "---").join(" | ")} |`;
  const rows = b.rows.map((r) => `| ${r.map(mdEscape).join(" | ")} |`);
  return [head, rule, ...rows].join("\n");
}

/** One document as clean markdown, register intact. */
export function docToMd(d: Doc): string {
  const out: string[] = [];
  out.push(`# ${d.title}`);
  out.push("");
  out.push(`${d.no} · ${d.readMinutes} minute read · Updated ${d.updated}`);
  out.push("");
  out.push(d.standfirst);
  out.push("");
  for (const s of d.sections) {
    out.push(`## ${s.heading}`);
    out.push("");
    if (s.walkaway) {
      out.push(`**What you should be able to walk away with:** ${s.walkaway}`);
      out.push("");
    }
    for (const b of s.blocks) {
      out.push(blockToMd(b));
      out.push("");
    }
  }
  out.push("---");
  out.push("");
  out.push(d.sourceNote);
  out.push("");
  out.push(FREE_LINE);
  out.push("");
  out.push(COPYRIGHT_LINE);
  out.push("");
  out.push(`Source page: ${site.url}/resources/${d.slug}`);
  out.push("");
  return out.join("\n");
}

/** A site page as an index-row answer: title, note, canonical URL. */
export function pageToMd(row: IndexRow): string {
  return [
    `# ${row.title}`,
    "",
    row.note + ".",
    "",
    `Read the full page (canonical, HTML): ${site.url}${row.path}`,
    "",
    `Browse the whole site as markdown: ${site.url}/md`,
    "",
    COPYRIGHT_LINE,
    "",
  ].join("\n");
}

/** The shelf index as markdown. */
export function pageIndexMd(): string {
  const rows = buildIndex();
  const docs = rows.slice(PAGES.length);
  const out: string[] = [];
  out.push("# Oryx Polytechnic Institute — markdown index");
  out.push("");
  out.push(
    "Every public page and document of the institute, listed once. Append any path below to this shelf (for example /md/resources/business-plan-template) to read it as markdown."
  );
  out.push("");
  out.push("## Pages");
  out.push("");
  for (const r of PAGES) {
    out.push(`- [${r.title}](${site.url}/md${r.path === "/" ? "" : r.path}) — ${r.note}`);
  }
  out.push("");
  out.push("## The Oryx Directory (documents)");
  out.push("");
  for (const r of docs) {
    out.push(`- [${r.title}](${site.url}/md${r.path}) — ${r.note}`);
  }
  out.push("");
  out.push(FREE_LINE);
  out.push("");
  out.push(COPYRIGHT_LINE);
  out.push("");
  return out.join("\n");
}

/** Resolve any /md/{slug} request to its markdown body, or null. */
export function resolveSlug(slug: string): string | null {
  if (slug === "index") return pageIndexMd();
  const doc = getDoc(slug);
  if (doc) return docToMd(doc);
  const row = buildIndex().find((r) => r.path === `/${slug}`);
  if (row) return pageToMd(row);
  return null;
}

/** Every slug the shelf answers with a real body. */
export function shelfSlugs(): string[] {
  return [
    "index",
    ...PAGES.map((p) => p.path.replace(/^\//, "")).filter((s) => s !== ""),
    ...directoryAll.map((d) => d.slug),
  ];
}
