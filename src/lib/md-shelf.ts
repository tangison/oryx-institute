import { careerRoleName, careerRoles } from "@/lib/careers";
import { site } from "@/lib/site";

/**
 * The markdown shelf exposes concise, machine-readable summaries of the
 * public site. Retired resource-library material is deliberately absent:
 * the shelf follows the same public information architecture as HTML.
 */
export type IndexRow = {
  path: string;
  title: string;
  note: string;
};

const PAGES: IndexRow[] = [
  { path: "/", title: "Oryx Institute", note: "Home" },
  {
    path: "/about",
    title: "About Oryx Institute",
    note: "Research, practice and ventures for a new Namibian polytechnic",
  },
  {
    path: "/status",
    title: "Institutional Status",
    note: "NTA registration work and the institute's current non-accredited status",
  },
  {
    path: "/research",
    title: "Research & Development",
    note: "Market research, published research notes and work in development",
  },
  {
    path: "/practice",
    title: "Practice",
    note: "Business counselling, market research and practical support",
  },
  {
    path: "/ventures",
    title: "Ventures",
    note: "Operating companies that test work in real conditions",
  },
  {
    path: "/ventures/corner-spa",
    title: "Corner Spa",
    note: "Oryx's first operating venture, run with Mendozer Investments",
  },
  { path: "/register", title: "The Public Register", note: "Dated public updates" },
  {
    path: "/apply",
    title: "Enquire with Oryx",
    note: "One public office for enquiries about current work and future learning",
  },
  {
    path: "/careers",
    title: "Careers",
    note: "Current vacancies, closing time and the email-first application process",
  },
  ...careerRoles.map((role) => ({
    path: `/careers/${role.slug}`,
    title: careerRoleName(role),
    note: "Current vacancy with role scope and an email-first application route",
  })),
  { path: "/links", title: "Oryx Links", note: "Official contacts and routes" },
  { path: "/contact", title: "Contact Oryx", note: "Official public contact details" },
  { path: "/faq", title: "Questions & Answers", note: "Institutional answers" },
  { path: "/brand", title: "The Brand Register", note: "Marks, codes and rules of use" },
  { path: "/blog", title: "Blog", note: "Notes from the practice" },
  { path: "/blog/corner-spa", title: "Corner Spa", note: "The first operating venture" },
];

export function buildIndex(): IndexRow[] {
  return PAGES;
}

export function pageToMd(row: IndexRow): string {
  return [
    `# ${row.title}`,
    "",
    `${row.note}.`,
    "",
    `Read the full page: ${site.url}${row.path}`,
    "",
    `Browse the full markdown shelf: ${site.url}/md`,
    "",
    site.copyright,
    "",
  ].join("\n");
}

export function pageIndexMd(): string {
  const out: string[] = [
    "# Oryx Institute: markdown index",
    "",
    "Every current public editorial page, listed once. Retired resource-library material is not included.",
    "",
    "## Pages",
    "",
  ];
  for (const row of PAGES) {
    out.push(`- [${row.title}](${site.url}/md${row.path === "/" ? "" : row.path}): ${row.note}`);
  }
  out.push("", site.copyright, "");
  return out.join("\n");
}

export function resolveSlug(slug: string): string | null {
  if (slug === "index") return pageIndexMd();
  const row = PAGES.find((page) => page.path === `/${slug}`);
  return row ? pageToMd(row) : null;
}

export function shelfSlugs(): string[] {
  return ["index", ...PAGES.map((page) => page.path.replace(/^\//, "")).filter(Boolean)];
}
