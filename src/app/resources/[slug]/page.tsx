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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: { absolute: `${doc.title} | The Oryx Directory` },
    description: metaOf(doc),
    alternates: { canonical: `/resources/${doc.slug}` },
    openGraph: {
      title: `${doc.title} | The Oryx Directory`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const siblings = doc.kind === "course" ? directoryCourses : directoryTemplates;
  const others = siblings.filter((d) => d.slug !== doc.slug);
  const index = directoryAll.findIndex((d) => d.slug === doc.slug);

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow={`${doc.no} · ${doc.readMinutes} minute read · Updated ${doc.updated}`} title={doc.title}>
        <p>{doc.standfirst}</p>
        <p className="mt-4 italic">{FREE_LINE}</p>
        {doc.kind === "template" ? (
          <p className="mt-3 border-l-2 border-maroon pl-5 text-[0.9rem]">
            A fill-in template: every field in brackets, like [your
            business name], is yours to replace before use. Nothing here
            is legal, tax or financial advice.
          </p>
        ) : null}
      </PageHead>

      <section className="section-lg">
        <div className="shell grid gap-16 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Document index rail */}
          <nav aria-label="Contents" className="lg:w-56">
            <p className="eyebrow eyebrow--ink">Contents</p>
            <ol className="mt-4 grid gap-2 text-[0.88rem]">
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i}`} className="link-type text-soft">
                    {String(i + 1).padStart(2, "0")} {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <div className="hair-t mt-8 pt-6">
              <Link href="/resources" className="btn--quiet">
                The Oryx Directory{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>

          {/* The document */}
          <article className="article min-w-0 max-w-3xl">
            {doc.sections.map((s, i) => (
              <div
                key={i}
                id={`s${i}`}
                className="hair-t mb-14 scroll-mt-28 pt-10 first:border-t-0 first:pt-0"
                data-reveal
              >
                <h2 className="h-sub">{s.heading}</h2>
                {s.walkaway ? (
                  <p className="mt-3 border-l-2 border-maroon pl-4 text-[0.95rem] italic leading-relaxed text-soft">
                    You&apos;ll walk away knowing: {s.walkaway}
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
                <span className="font-[500] text-ink">Source note: </span>
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
            <h2 className="h-section max-w-[24ch]" data-reveal>
              More in the {doc.kind === "course" ? "courses." : "templates."}
            </h2>
            <div className="ledger mt-10">
              {others.map((d) => (
                <Link
                  href={`/resources/${d.slug}`}
                  className="ledger-row group"
                  key={d.slug}
                  data-reveal
                >
                  <p className="ledger-date">{d.no}</p>
                  <div>
                    <h3 className="news-title">{d.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-soft">{d.standfirst}</p>
                    <p className="meta mt-3">{d.readMinutes} minute read</p>
                  </div>
                </Link>
              ))}
              <Link href="/resources#directory" className="ledger-row group" data-reveal>
                <p className="ledger-date">Directory</p>
                <div>
                  <h3 className="news-title">
                    All {directoryAll.length} documents, courses and templates
                  </h3>
                  <p className="meta mt-3">Open the Directory</p>
                </div>
              </Link>
            </div>
            <p className="meta mt-8">
              Document {index + 1} of {directoryAll.length} in the Oryx Directory
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
