import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { getNews, formatNewsDate } from "@/lib/news";
import { site, schemaIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "News from the Institute",
  description:
    "Announcements, field notes and press from Oryx Institute, dated as they were said. The feed is the source of truth; social is distribution.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News from the Institute | Oryx Institute",
    description:
      "Announcements, field notes and press, dated as they were said.",
    images: [
      {
        url: "/brand/og/news.png",
        width: 1200,
        height: 630,
        alt: "News from Oryx Institute",
      },
    ],
  },
};

export default async function NewsPage() {
  const news = await getNews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News from the Institute",
    url: `${site.url}/news`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    publisher: { "@type": "Organization", "@id": schemaIds.org },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title="News from the institute.">
        <p>
          What the institute has made public, dated as it was said.
          Announcements, field notes and press live here; the site feed is
          the source of truth, and the social channels are distribution.
        </p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="ledger">
            {news.map((n) => (
              <article className="news-row" key={n.slug} data-reveal>
                <div>
                  <p className="ledger-date">{formatNewsDate(n.date)}</p>
                  <p className="eyebrow mt-3">{n.category}</p>
                </div>
                <div>
                  <h2 className="news-title">
                    <Link href={`/announcements/${n.slug}`}>{n.title}</Link>
                  </h2>
                  {n.standfirst ? (
                    <p className="mt-3 max-w-[62ch] text-soft">{n.standfirst}</p>
                  ) : null}
                  <Link
                    href={`/announcements/${n.slug}`}
                    className="btn--quiet mt-4"
                  >
                    Read <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="hair-t mt-14 flex flex-wrap items-center gap-8 pt-8">
            <p className="eyebrow eyebrow--ink">The feed</p>
            <a href="/feed.xml" className="btn--quiet">
              RSS <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href="/feed.json" className="btn--quiet">
              JSON <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
