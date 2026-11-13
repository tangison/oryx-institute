import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/site/blog-body";
import { blogPosts, getPost } from "@/lib/blog";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: langRaw, slug } = await params;
  const lang = langFromParams({ lang: langRaw });
  const post = getPost(slug);
  if (!post) return {};
  const L = lang === "af" ? "/af" : "";
  return {
    /* Absolute: both headline strings already carry the brand ("Oryx
       Institute"), so the root template would print it a second time
       and push the title past 60 characters. */
    title: { absolute: lang === "af" ? post.titleAf : post.title },
    description: lang === "af" ? post.descriptionAf : post.description,
    alternates: alternates(lang, `/blog/${post.slug}`, site.url),
    openGraph: {
      type: "article",
      title: lang === "af" ? post.titleAf : post.title,
      description: lang === "af" ? post.descriptionAf : post.description,
      url: `${site.url}${L}/blog/${post.slug}`,
      publishedTime: post.dateISO,
      images: [
        {
          url: `${site.url}${post.ogImage}`,
          width: 1510,
          height: 1041,
          alt: post.ogImageAlt,
        },
      ],
    },
  };
}

const labels = {
  en: {
    kicker: "Blog",
    next: "Where to go next",
    openSpa: "Open Corner Spa",
    spaSite: "spa.mendozer.com",
    all: "All notes",
  },
  af: {
    kicker: "Blog",
    next: "Waarheen volgende",
    openSpa: "Open Corner Spa",
    spaSite: "spa.mendozer.com",
    all: "Alle notas",
  },
} as const;

/** One blog note, rendered with Article structured data. The headline
 * stays under 60 characters, the description under 155, and every
 * claim in the body belongs to the approved copy: the spa's real
 * prices, the spa's own number, and the two roles, stated exactly. */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: langRaw, slug } = await params;
  const lang = langFromParams({ lang: langRaw });
  const af = lang === "af";
  const post = getPost(slug);
  if (!post) notFound();
  const A = (path: string) => (af ? `/af${path}` : path);
  const t = labels[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: af ? post.titleAf : post.title,
    description: af ? post.descriptionAf : post.description,
    ...(af ? { inLanguage: "af-NA" } : {}),
    image: [`${site.url}${post.ogImage}`],
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    /* Both roles point at the ONE org node by @id, and repeat its
       canonical name (the legalName the node itself carries): the
       Article validator requires author.name and publisher.name, the
       entity rules require the @id, and matching names keep the two
       rules from fighting each other. */
    author: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
    },
    mainEntityOfPage: `${site.url}${A(`/blog/${post.slug}`)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="section" data-sc-act="flow">
        <div className="shell">
          <header className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink tnum">
              {t.kicker} · {af ? post.dateHumanAf : post.dateHuman}
            </p>
            <h1 className="h-display mt-5 max-w-[24ch]">
              {af ? post.titleAf : post.title}
            </h1>
            <p className="lede measure mt-6">
              {af ? post.descriptionAf : post.description}
            </p>
          </header>

          <div className="hair-t pt-12" data-sc-in>
            <BlogPostBody
              body={af ? post.bodyAf : post.bodyEn}
              images={post.images}
            />
          </div>

          <footer className="hair-t mt-16 pt-12" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.next}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Link href={A("/corner-spa")} className="btn--quiet">
                {t.openSpa} <span className="arr" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://spa.mendozer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-type"
              >
                {t.spaSite}
                <span className="arr ml-1" aria-hidden="true">↗</span>
              </a>
              <Link href={A("/blog")} className="link-type">
                {t.all}
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
