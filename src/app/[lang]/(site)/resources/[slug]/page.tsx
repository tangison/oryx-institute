import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import {
  directoryAll,
  directoryCourses,
  directoryTemplates,
  directoryAfMeta,
  getDoc,
  templateDownloads,
  COPYRIGHT_LINE,
  FREE_LINE,
  type Block,
} from "@/lib/directory";
import { site, schemaIds } from "@/lib/site";
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
  const shelf = lang === "af" ? "Die Oryx Directory" : "The Oryx Directory";
  /* The title stays a plain string so the locale template adds the
     brand: every title on the site ends the same way, and the shelf
     stays visible in the share card. Templates name their kind, so a
     short title like "Letterhead" still clears the SERP minimum. */
  const docTitle =
    doc.kind === "template" && lang === "en"
      ? `${doc.title} Template`
      : doc.title;
  /* The af listing used to reuse the English standfirst, so all eleven
     documents shared one description and read as duplicates to a
     crawler. directoryAfMeta gives each document its own af title and
     description, and says plainly that the body is in English. */
  const afMeta = lang === "af" ? directoryAfMeta[doc.slug] : undefined;
  const title = afMeta ? afMeta.title : docTitle;
  const description = afMeta ? afMeta.description : metaOf(doc);
  return {
    title,
    description,
    alternates: alternates(lang, `/resources/${doc.slug}`, site.url),
    openGraph: {
      title: afMeta ? afMeta.title : `${doc.title} | ${shelf}`,
      description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/resources/${doc.slug}`,
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
  const af = lang === "af";
  const doc = getDoc(slug);
  if (!doc) notFound();
  const A = (path: string) => (af ? `/af${path}` : path);
  /* Structured-data URLs must agree with this locale's canonical URL.
     The source document remains in English on the Afrikaans route, but
     that does not make its schema point at a different HTML page. */
  const canonicalUrl = `${site.url}${A(`/resources/${doc.slug}`)}`;

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
          "@id": `${canonicalUrl}#course`,
          name: doc.title,
          description: metaOf(doc),
          url: canonicalUrl,
          provider: {
            "@type": "EducationalOrganization",
            "@id": schemaIds.org,
            name: site.legalName,
            alternateName: site.tradingName,
            url: site.url,
          },
          isAccessibleForFree: true,
          educationalLevel: "Crash course",
          inLanguage: "en",
          teaches: doc.standfirst,
          dateModified: doc.reviewedIso,
          citation: doc.sources?.map((source) => source.url),
        }
      : {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${canonicalUrl}#work`,
          headline: doc.title,
          description: metaOf(doc),
          url: canonicalUrl,
          /* One organization, referenced by id: the same node every
             other page points at, not a second inline copy. */
          author: { "@type": "EducationalOrganization", "@id": schemaIds.org },
          publisher: { "@type": "EducationalOrganization", "@id": schemaIds.org },
          copyrightHolder: {
            "@type": "EducationalOrganization",
            "@id": schemaIds.org,
          },
          copyrightYear: "2026",
          dateModified: doc.reviewedIso,
          isAccessibleForFree: true,
          citation: doc.sources?.map((source) => source.url),
        };

  const eyebrow = `${doc.no} · ${doc.readMinutes} ${
    af ? "minute read" : "minute read"
  } · ${af ? "Updated" : "Updated"} ${doc.updated}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={doc.title}>
        <p>{doc.standfirst}</p>
        <p className="mt-4 italic">
          {af
            ? "Gratis beskikbaar en onder kopiereg van Oryx Polytechnic Institute. Dit is nie oopbron nie: gebruik en leer daaruit, maar publiseer dit nie as jou eie nie."
            : FREE_LINE}
        </p>
        {doc.kind === "template" ? (
          <>
            <p className="mt-3 border-l-2 border-maroon pl-5 text-[0.9rem]">
              {af ? "A fill-in template: every field in brackets is yours to replace before use. Nothing here is legal, tax or financial advice." : "A fill-in template: every field in brackets is yours to replace before use. Nothing here is legal, tax or financial advice."}
            </p>
            {/* The editable file, free and direct (CONTENT-CORRECTIONS
                §9): no gate, no email capture; the Directory's own
                register. */}
            {(templateDownloads[doc.slug] ?? []).length > 0 && (
              <div className="mt-5 flex flex-wrap gap-4">
                {templateDownloads[doc.slug].map((d) => (
                  <a
                    key={d.file}
                    href={`/templates/${d.file}`}
                    download
                    className="btn--outline btn"
                  >
                    {af ? "Download" : "Download"} · {d.label}{" "}
                    <span className="arr" aria-hidden="true">↓</span>
                  </a>
                ))}
              </div>
            )}
          </>
        ) : null}
        {af ? (
          <p className="meta mt-4">
            Die dokument self word in Engels gepubliseer.
          </p>
        ) : null}
      </PageHead>

      <section className="section-lg">
        <div className="shell grid gap-16 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Document index rail */}
          <nav aria-label={af ? "Contents" : "Contents"} className="lg:w-56" data-sc-in>
            <p className="meta">{af ? "Contents" : "Contents"}</p>
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
                {af ? "The Oryx Directory" : "The Oryx Directory"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>

          {/* The document */}
          <article
            className="article min-w-0 max-w-3xl"
            data-sc-in
            data-sc-stagger="60"
          >
            {doc.sections.map((s, i) => (
              <div
                key={i}
                id={`s${i}`}
                className="hair-t mb-14 scroll-mt-28 pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="h-sub">{s.heading}</h2>
                {s.walkaway ? (
                  <p className="mt-3 border-l-2 border-maroon pl-4 text-[0.95rem] italic leading-relaxed text-soft">
                    {af ? "You'll walk away knowing: " : "You'll walk away knowing: "}
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

            {/* Provenance and the review cycle (CONTENT-CORRECTIONS
                §11): author, review date, reviewer, and the error
                door, on every document. */}
            <footer className="hair-t mt-4 pt-8">
              <p className="text-[0.88rem] leading-relaxed text-soft">
                <span className="font-[500] text-ink">
                  {af ? "Source note: " : "Source note: "}
                </span>
                {doc.sourceNote}
              </p>
              {doc.sources?.length ? (
                <div className="mt-5 border-l-2 border-maroon pl-5">
                  <p className="meta">{af ? "Checkable sources" : "Checkable sources"}</p>
                  <ol className="mt-3 grid gap-3 text-[0.88rem] leading-relaxed text-soft">
                    {doc.sources.map((source) => (
                      <li key={source.id}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="link-type font-[500] text-ink"
                        >
                          {source.title}
                        </a>
                        <span> · {source.scope}</span>
                        <span className="block mt-1 text-[0.8rem]">{source.authority}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
              <p className="mt-4 text-[0.88rem] leading-relaxed text-soft">
                {af ? "Maintained by Tangi Iigonda, Principal." : "Maintained by Tangi Iigonda, Principal."}{" "}
                {af ? `Laas hersien: ${doc.updated}.` : `Last reviewed ${doc.updated}.`}{" "}
                {af ? "Spotted an error?" : "Spotted an error?"}{" "}
                <a
                  href={`mailto:corrections@oryxinstitute.org?subject=${encodeURIComponent(doc.title)}`}
                  className="link-type"
                >
                  {af ? "Report an error" : "Report an error"}
                </a>
                .
              </p>
              <p className="mt-4 text-[0.88rem] font-[500] text-ink">
                {COPYRIGHT_LINE}
              </p>
            </footer>

            {doc.related?.length ? (
              <aside className="hair-t mt-12 pt-8" aria-label={af ? "Related resources" : "Related resources"}>
                <p className="meta">{af ? "Keep working" : "Keep working"}</p>
                <div className="mt-5 grid gap-3">
                  {doc.related.map((related) => (
                    <Link
                      href={A(related.href)}
                      key={related.href}
                      className="group border-b border-rule pb-4"
                    >
                      <h2 className="font-[500] text-ink group-hover:text-maroon">{related.title}</h2>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-soft">{related.body}</p>
                      <p className="meta mt-2">
                        {af ? "Open resource" : "Open resource"} <span className="arr" aria-hidden="true">→</span>
                      </p>
                    </Link>
                  ))}
                </div>
              </aside>
            ) : null}
          </article>
        </div>
      </section>

      {/* More in this register */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-section max-w-[24ch]">
              {af
                ? doc.kind === "course"
                  ? "Meer kursusse."
                  : "Meer sjablone."
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
                      {d.readMinutes} {af ? "minute read" : "minute read"}
                    </p>
                  </div>
                </Link>
              ))}
              <Link href={A("/resources#directory")} className="ledger-row group">
                <p className="ledger-date">{af ? "Directory" : "Directory"}</p>
                <div>
                  <h3 className="news-title">
                    {af
                      ? `Al ${directoryAll.length} dokumente, kursusse en sjablone`
                      : `All ${directoryAll.length} documents, courses and templates`}
                  </h3>
                  <p className="meta mt-3">
                    {af ? "Open the Directory" : "Open the Directory"}
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
