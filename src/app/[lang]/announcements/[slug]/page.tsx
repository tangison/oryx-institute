import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { NewsBody } from "@/lib/news-content";
import { getNews, getNewsMeta, formatNewsDate } from "@/lib/news";
import { site, schemaIds } from "@/lib/site";
import { alternates, chrome, langFromParams } from "@/lib/i18n";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

const categoryAf: Record<string, string> = {
  announcement: "aankondiging",
  fieldnote: "veldnota",
  press: "pers",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const post = getNewsMeta(slug);
  if (!post) return {};
  const lang = langFromParams({ lang: rawLang });
  return {
    /** Absolute: the headline is the announcement's full published
        title; a site suffix would push it past the 60-char bar. */
    title: { absolute: post.title },
    description: post.description,
    alternates: alternates(lang, `/announcements/${post.slug}`, site.url),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: `${post.title}, from Oryx Institute`,
        },
      ],
    },
  };
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = langFromParams({ lang: rawLang });
  const af = lang === "af";
  const post = getNewsMeta(slug);
  if (!post) notFound();
  const A = (path: string) => (af ? `/af${path}` : path);

  /** Truthful structured data: a dated public statement by the
      institute as publisher. The Organization and WebSite are
      referenced by @id: one entity site-wide, not re-declared. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: site.principal.name },
    publisher: { "@type": "Organization", "@id": schemaIds.org },
    mainEntityOfPage: `${site.url}/announcements/${post.slug}`,
    isAccessibleForFree: true,
  };

  const eyebrow = `${af ? categoryAf[post.category] ?? post.category : post.category} · ${formatNewsDate(post.date)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={post.title}>
        {post.standfirst ? <p>{post.standfirst}</p> : null}
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          {af ? <p className="meta mb-8">{chrome.af.newsInEnglish}</p> : null}
          <article className="article" data-sc-in>
            <NewsBody slug={post.slug} />
          </article>

          <div className="hair-t mt-16 flex flex-wrap items-center gap-8 pt-8" data-sc-in>
            <Link href={A("/news")} className="btn--quiet">
              {af ? "Alle nuus" : "All news"} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${site.email}`} className="btn--quiet">
              {af ? "Skryf aan die kantoor" : "Write to the office"}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
