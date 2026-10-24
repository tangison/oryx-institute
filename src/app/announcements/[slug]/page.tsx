import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { NewsBody } from "@/lib/news-content";
import { getNews, getNewsMeta, formatNewsDate } from "@/lib/news";
import { site, schemaIds } from "@/lib/site";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsMeta(slug);
  if (!post) return {};
  return {
    /** Absolute: the headline is the announcement's full published
        title; a site suffix would push it past the 60-char bar. */
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/announcements/${post.slug}` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsMeta(slug);
  if (!post) notFound();

  /** Truthful structured data: a dated public statement by the
      institute as publisher. The Organization and WebSite are
      referenced by @id — one entity site-wide, not re-declared. */
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow={`${post.category} · ${formatNewsDate(post.date)}`} title={post.title}>
        {post.standfirst ? <p>{post.standfirst}</p> : null}
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <article className="article" data-reveal>
            <NewsBody slug={post.slug} />
          </article>

          <div className="hair-t mt-16 flex flex-wrap items-center gap-8 pt-8">
            <Link href="/news" className="btn--quiet">
              All news <span className="arr" aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${site.email}`} className="btn--quiet">
              Write to the office <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
