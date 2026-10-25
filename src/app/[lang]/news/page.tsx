import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { getNews, formatNewsDate } from "@/lib/news";
import { site, schemaIds } from "@/lib/site";
import { alternates, chrome, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "News from the Institute",
      description:
        "Announcements, field notes and press from Oryx Institute, dated as they were said. The feed is the source of truth; social is distribution.",
      ogTitle: "News from the Institute | Oryx Institute",
      ogDescription: "Announcements, field notes and press, dated as they were said.",
      ldName: "News from the Institute",
    },
    headTitle: "News from the institute.",
    headLede:
      "What the institute has made public, dated as it was said. Announcements, field notes and press live here; the site feed is the source of truth, and the social channels are distribution.",
    read: "Read",
    feedEyebrow: "The feed",
  },
  af: {
    meta: {
      title: "Nuus van die Instituut",
      description:
        "Aankondigings, veldnotas en persberigte van Oryx Instituut, gedateer soos dit gesê is. Die stroom is die bron van waarheid; sosiale media is verspreiding.",
      ogTitle: "Nuus van die Instituut | Oryx Instituut",
      ogDescription: "Aankondigings, veldnotas en persberigte, gedateer soos dit gesê is.",
      ldName: "Nuus van die Instituut",
    },
    headTitle: "Nuus van die instituut.",
    headLede:
      "Wat die instituut openbaar gemaak het, gedateer soos dit gesê is. Aankondigings, veldnotas en persberichte woon hier; die werfstroom is die bron van waarheid, en die sosiale kanale is verspreiding.",
    read: "Lees",
    feedEyebrow: "Die stroom",
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
    alternates: alternates(lang, "/news", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        { url: "/brand/og/news.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const news = await getNews();
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/news")}`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    publisher: { "@type": "Organization", "@id": schemaIds.org },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={t.headTitle}>
        <p>
          {af ? `${chrome.af.newsInEnglish} ` : ""}
          {t.headLede}
        </p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="60">
            {news.map((n) => (
              <article className="news-row" key={n.slug}>
                <div>
                  <p className="ledger-date">{formatNewsDate(n.date)}</p>
                  <p className="eyebrow mt-3">{n.category}</p>
                </div>
                <div>
                  <h2 className="news-title">
                    <Link href={A(`/announcements/${n.slug}`)}>{n.title}</Link>
                  </h2>
                  {n.standfirst ? (
                    <p className="mt-3 max-w-[62ch] text-soft">{n.standfirst}</p>
                  ) : null}
                  <Link href={A(`/announcements/${n.slug}`)} className="btn--quiet mt-4">
                    {t.read} <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="hair-t mt-14 flex flex-wrap items-center gap-8 pt-8" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.feedEyebrow}</p>
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
