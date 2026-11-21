import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { blogPosts, hasCompletePostTranslation } from "@/lib/blog";
import { site } from "@/lib/site";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const copy = {
  en: {
    meta: {
      title: "Oryx Practice Notes and Venture Updates",
      description:
        "Read dated Oryx Institute notes on current practice, ventures and work in development, including the public record for Corner Spa.",
      ogTitle: "Oryx practice notes and venture updates",
    },
    head: {
      eyebrow: "Blog",
      title: "Notes from the practice.",
      lede: "Published notes on current work, collaborations and ventures. Each is dated when it is published.",
    },
    read: "Read the note",
    readEnglish: "Read the English note",
    contactLine: "Questions about anything written here go to the office:",
    callOr: "or call or WhatsApp",
  },
  af: {
    meta: {
      title: "Oryx-praktyknotas en Opdaterings",
      description:
        "Lees gedateerde notas van Oryx Instituut oor huidige praktyk, ondernemings en werk in ontwikkeling, insluitend Corner Spa se openbare rekord.",
      ogTitle: "Oryx-praktyknotas en ondernemingsopdaterings",
    },
    head: {
      eyebrow: "Blog",
      title: "Notas uit die praktyk.",
      lede: "Gepubliseerde notas oor huidige werk, samewerking en ondernemings. Elke nota word gedateer wanneer dit gepubliseer word.",
    },
    read: "Lees die nota",
    readEnglish: "Lees die Engelse nota",
    contactLine: "Vrae oor enigiets wat hier geskryf staan, gaan na die kantoor:",
    callOr: "of bel of WhatsApp",
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
  return pageMetadata({
    lang,
    path: "/blog",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.description,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle },
  });
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
            {blogPosts.map((post) => {
              const translated = hasCompletePostTranslation(post, lang);
              return (
                <div className="ledger-row--flat hair-t" key={post.slug}>
                  <Link
                    href={translated && af ? `/af/blog/${post.slug}` : `/blog/${post.slug}`}
                    className="link-type block"
                    hrefLang={translated && af ? "af" : "en"}
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
                      {translated ? t.read : t.readEnglish} <span className="arr" aria-hidden="true">→</span>
                    </p>
                  </Link>
                </div>
              );
            })}
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
