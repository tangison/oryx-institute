import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Blog",
      description:
        "Notes from Oryx Institute: the practice, the ventures and the work in development, written to be used.",
      ogTitle: "Blog | Oryx Institute",
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
  zh: {
    meta: {
      title: "博客",
      description:
        "来自 Oryx Institute 的笔记：实务、实业与在建的工作，写成能直接用的东西。",
      ogTitle: "博客 | Oryx 理工学院",
    },
    head: {
      eyebrow: "博客",
      title: "来自实务的笔记。",
      lede: "关于工作的长笔记：学院在做什么、与伙伴在建什么，以及第一项实业在地面上的样子。按发表日期记录。",
    },
    read: "阅读文章",
    contactLine: "对文中内容的问题，请写给办公室：",
    callOr: "，或来电、WhatsApp",
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
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/blog", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/blog`,
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
  const zh = lang === "zh";
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
                  href={zh ? `/zh/blog/${post.slug}` : `/blog/${post.slug}`}
                  className="link-type block"
                >
                  <p className="eyebrow eyebrow--ink mt-8 tnum">
                    {zh ? post.dateHumanZh : post.dateHuman} · 博客 Blog
                  </p>
                  <h2 className="h-sub mt-3 max-w-[30ch]">
                    {zh ? post.titleZh : post.title}
                  </h2>
                  <p className="measure mt-3 text-soft">
                    {zh ? post.descriptionZh : post.description}
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
