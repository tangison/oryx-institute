import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Notes from the practice",
      description:
        "Notes from Oryx Institute: the practice running today, the ventures opened with partners, the work in development. Written to be used, dated as published.",
      ogTitle: "Notes from the practice | Oryx Institute",
    },
    head: {
      eyebrow: "Blog",
      title: "Notes from the practice.",
      lede: "Longer notes on the work: what the institute runs, what it builds with its partners, and what the first ventures look like on the ground. Dated as published.",
    },
    read: "Read the note",
    contactLine: "Questions about anything written here go to the office:",
    callOr: "or call or WhatsApp",
  },
  af: {
    meta: {
      title: "Notes from the practice",
      description:
        "Notes from Oryx Institute: the practice running today, the ventures opened with partners, the work in development. Written to be used, dated as published.",
      ogTitle: "Notes from the practice | Oryx Institute",
    },
    head: {
      eyebrow: "Blog",
      title: "Notes from the practice.",
      lede: "Longer notes on the work: what the institute runs, what it builds with its partners, and what the first ventures look like on the ground. Dated as published.",
    },
    read: "Read the note",
    contactLine: "Questions about anything written here go to the office:",
    callOr: "or call or WhatsApp",
    enLedger: { paras: [] as string[] },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  return {
    /* af prints absolute: its title already carries the locale brand. */
    title: lang === "af" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: alternates(lang, "/blog", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/blog`,
      images: [
        { url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

/** The blog index: the smallest page that fits the site's patterns.
 * No comments, no sliders, no share widgets: the notes are the thing. */
export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];

  return (
    <>
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="mt-4" data-sc-in>
            {blogPosts.map((post) => (
              <div className="ledger-row--flat hair-t" key={post.slug}>
                <Link
                  href={af ? `/af/blog/${post.slug}` : `/blog/${post.slug}`}
                  className="link-type block"
                >
                  <p className="eyebrow eyebrow--ink mt-8 tnum">
                    {af ? post.dateHumanAf : post.dateHuman} · Blog
                  </p>
                  <h2 className="h-sub mt-3 max-w-[30ch]">
                    {af ? post.titleAf : post.title}
                  </h2>
                  <p className="measure mt-3 text-soft">
                    {af ? post.descriptionAf : post.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink">
                    {t.read} <span className="arr" aria-hidden="true">→</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <p className="measure mt-12 text-soft" data-sc-in>
            {t.contactLine}{" "}
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            {t.callOr}{" "}
            <a
              href={site.phoneHref}
              className="link-type whitespace-nowrap tnum"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
