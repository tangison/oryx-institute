import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import {
  directoryAll,
  directoryCourses,
  directoryTemplates,
  getDoc,
  COPYRIGHT_LINE,
  FREE_LINE,
  type Block,
} from "@/lib/directory";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

export function generateStaticParams() {
  return directoryAll.map((d) => ({ slug: d.slug }));
}

/** Meta descriptions are sized for search results: the visible
    standfirst stands uncut on the page; only the meta is trimmed. */
function metaOf(doc: { standfirst: string }): string {
  return doc.standfirst.length <= 158
    ? doc.standfirst
    : `${doc.standfirst.slice(0, 155).replace(/\s+\S*$/, "")}\u2026`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  const lang = langFromParams({ lang: rawLang });
  const shelf = lang === "zh" ? "Oryx 资源目录" : "The Oryx Directory";
  return {
    title: { absolute: `${doc.title} | ${shelf}` },
    description: metaOf(doc),
    alternates: alternates(lang, `/resources/${doc.slug}`, site.url),
    openGraph: {
      title: `${doc.title} | ${shelf}`,
      description: metaOf(doc),
      images: [
        {
          url: "/brand/og/resources.png",
          width: 1200,
          height: 630,
          alt: `${doc.title}, from the Oryx Directory`,
        },
      ],
    },
  };
}

function BlockView({ block }: { block: Block }) {
  if (block.t === "p") {
    return <p>{block.text}</p>;
  }
  if (block.t === "list") {
    return (
      <ul className="grid gap-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-[0.55em] h-px w-4 shrink-0 bg-maroon"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[0.92rem]">
        <caption className="sr-only">{block.head.join(" · ")}</caption>
        <thead>
          <tr>
            {block.head.map((h, i) => (
              <th
                key={i}
                className="border-b border-ink/25 pb-2 pr-6 align-bottom font-[500] text-ink"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-rule">
              {row.map((cell, ci) => (
                <td key={ci} className="py-3 pr-6 align-top text-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function DirectoryDocPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = langFromParams({ lang: rawLang });
  const zh = lang === "zh";
  const doc = getDoc(slug);
  if (!doc) notFound();
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const siblings = doc.kind === "course" ? directoryCourses : directoryTemplates;
  const others = siblings.filter((d) => d.slug !== doc.slug);

  /** Truthful structured data: courses carry Course, templates carry
      CreativeWork. The author is the institute itself (no invented
      person), and no date is asserted beyond the copyright year: the
      visible "Updated" line is month-granular and is not masqueraded
      as an ISO date. */
  const jsonLd =
    doc.kind === "course"
      ? {
          "@context": "https://schema.org",
          "@type": "Course",
          name: doc.title,
          description: metaOf(doc),
          url: `${site.url}/resources/${doc.slug}`,
          provider: {
            "@type": "EducationalOrganization",
            name: site.legalName,
            alternateName: site.tradingName,
            url: site.url,
          },
          isAccessibleForFree: true,
          educationalLevel: "Crash course",
          inLanguage: "en",
          teaches: doc.standfirst,
        }
      : {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          headline: doc.title,
          description: metaOf(doc),
          url: `${site.url}/resources/${doc.slug}`,
          author: {
            "@type": "EducationalOrganization",
            name: site.legalName,
            url: site.url,
          },
          publisher: {
            "@type": "EducationalOrganization",
            name: site.legalName,
            alternateName: site.tradingName,
            url: site.url,
          },
          copyrightHolder: {
            "@type": "EducationalOrganization",
            name: site.legalName,
          },
          copyrightYear: "2026",
          isAccessibleForFree: true,
        };

  const eyebrow = `${doc.no} · ${doc.readMinutes} ${
    zh ? "分钟读完" : "minute read"
  } · ${zh ? "更新于" : "Updated"} ${doc.updated}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={doc.title}>
        <p>{doc.standfirst}</p>
        <p className="mt-4 italic">
          {zh
            ? "免费取用，版权归 Oryx Polytechnic Institute。不是开源：可以用，可以学，别当成自己的发布。"
            : FREE_LINE}
        </p>
        {doc.kind === "template" ? (
          <p className="mt-3 border-l-2 border-maroon pl-5 text-[0.9rem]">
            {zh
              ? "一套供填写的模板：方括号里的每个字段，比如[你的商号]，用前都是你来替换的。这里没有法律、税务或财务建议。"
              : "A fill-in template: every field in brackets, like [your business name], is yours to replace before use. Nothing here is legal, tax or financial advice."}
          </p>
        ) : null}
        {zh ? (
          <p className="meta mt-4">
            文档本身以英文发布。
          </p>
        ) : null}
      </PageHead>

      <section className="section-lg">
        <div className="shell grid gap-16 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Document index rail */}
          <nav aria-label={zh ? "目录" : "Contents"} className="lg:w-56" data-sc-in>
            <p className="meta">{zh ? "目录" : "Contents"}</p>
            <ol className="mt-4 grid gap-2 text-[0.88rem]">
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i}`} className="link-type text-soft">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <div className="hair-t mt-8 pt-6">
              <Link href={A("/resources")} className="btn--quiet">
                {zh ? "Oryx 资源目录" : "The Oryx Directory"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>

          {/* The document */}
          <article className="article min-w-0 max-w-3xl" data-sc-in>
            {doc.sections.map((s, i) => (
              <div
                key={i}
                id={`s${i}`}
                className="hair-t mb-14 scroll-mt-28 pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="h-sub">{s.heading}</h2>
                {s.walkaway ? (
                  <p className="mt-3 border-l-2 border-maroon pl-4 text-[0.95rem] italic leading-relaxed text-soft">
                    {zh ? "读完你会带走：" : "You'll walk away knowing: "}
                    {s.walkaway}
                  </p>
                ) : null}
                <div className="mt-7 grid gap-6">
                  {s.blocks.map((b, bi) => (
                    <BlockView key={bi} block={b} />
                  ))}
                </div>
              </div>
            ))}

            {/* Provenance */}
            <footer className="hair-t mt-4 pt-8">
              <p className="text-[0.88rem] leading-relaxed text-soft">
                <span className="font-[500] text-ink">
                  {zh ? "出处注：" : "Source note: "}
                </span>
                {doc.sourceNote}
              </p>
              <p className="mt-4 text-[0.88rem] font-[500] text-ink">
                {COPYRIGHT_LINE}
              </p>
            </footer>
          </article>
        </div>
      </section>

      {/* More in this register */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-section max-w-[24ch]">
              {zh
                ? doc.kind === "course"
                  ? "更多课程。"
                  : "更多模板。"
                : doc.kind === "course"
                  ? "More in the courses."
                  : "More in the templates."}
            </h2>
            <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
              {others.map((d) => (
                <Link
                  href={A(`/resources/${d.slug}`)}
                  className="ledger-row group"
                  key={d.slug}
                >
                  <p className="ledger-date">{d.no}</p>
                  <div>
                    <h3 className="news-title">{d.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-soft">{d.standfirst}</p>
                    <p className="meta mt-3">
                      {d.readMinutes} {zh ? "分钟读完" : "minute read"}
                    </p>
                  </div>
                </Link>
              ))}
              <Link href={A("/resources#directory")} className="ledger-row group">
                <p className="ledger-date">{zh ? "目录" : "Directory"}</p>
                <div>
                  <h3 className="news-title">
                    {zh
                      ? `全部 ${directoryAll.length} 份文档、课程与模板`
                      : `All ${directoryAll.length} documents, courses and templates`}
                  </h3>
                  <p className="meta mt-3">
                    {zh ? "打开目录" : "Open the Directory"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
