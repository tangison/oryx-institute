import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} | The Oryx Directory`,
    description: doc.standfirst,
    alternates: { canonical: `/resources/${doc.slug}` },
    openGraph: {
      title: `${doc.title} | The Oryx Directory`,
      description: doc.standfirst,
      images: [
        {
          url: "/images/og-inner.jpg",
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
            <span className="mt-[0.55em] h-px w-4 shrink-0 bg-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[0.92rem]">
        <thead>
          <tr>
            {block.head.map((h, i) => (
              <th
                key={i}
                className="border-b border-ink/25 pb-2 pr-6 align-bottom font-semibold text-ink"
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.standfirst,
    datePublished: "2026-09-01",
    url: `${site.url}/resources/${doc.slug}`,
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
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero title={doc.title} accent={doc.kind === "course" ? "One on one." : "Free to use."}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem]">
          <span className="label-caps text-accent">{doc.no}</span>
          <span className="text-soft">{doc.readMinutes} minute read</span>
          <span className="text-soft">Updated {doc.updated}</span>
        </div>
        <p className="measure mt-5 text-[1.08rem] leading-relaxed text-ink/85">
          {doc.standfirst}
        </p>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-soft italic">
          {FREE_LINE}
        </p>
      </PageHero>

      <section className="chapter shell">
        <div className="grid gap-16 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Document index rail */}
          <nav aria-label="Contents" className="lg:w-56">
            <p className="label-caps text-soft">Contents</p>
            <ol className="mt-4 grid gap-2 text-[0.88rem]">
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#s${i}`}
                    className="link-type text-soft hover:text-accent"
                  >
                    {String(i + 1).padStart(2, "0")} {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <div className="hair-t mt-8 pt-6">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                The Oryx Directory
              </Link>
            </div>
          </nav>

          {/* The document */}
          <article className="measure min-w-0 max-w-3xl">
            {doc.sections.map((s, i) => (
              <div key={i} id={`s${i}`} className="hair-t mb-14 scroll-mt-32 pt-10 first:border-t-0 first:pt-0">
                <h2 className="display-statement text-ink">{s.heading}</h2>
                {s.walkaway ? (
                  <p className="mt-3 border-l-2 border-accent pl-4 text-[0.95rem] italic leading-relaxed text-soft">
                    You&apos;ll walk away knowing: {s.walkaway}
                  </p>
                ) : null}
                <div className="mt-7 grid gap-6 text-[1.02rem] leading-[1.7] text-ink/85">
                  {s.blocks.map((b, bi) => (
                    <BlockView key={bi} block={b} />
                  ))}
                </div>
              </div>
            ))}

            {/* Provenance */}
            <footer className="hair-t mt-4 pt-8">
              <p className="text-[0.88rem] leading-relaxed text-soft">
                <span className="font-semibold text-ink">Source note: </span>
                {doc.sourceNote}
              </p>
              <p className="mt-4 text-[0.88rem] font-semibold text-ink">
                {COPYRIGHT_LINE}
              </p>
            </footer>
          </article>
        </div>
      </section>

      {/* More in this register */}
      <section className="chapter shell">
        <div className="hair-t pt-14">
          <h2 className="display-section text-ink">
            More in the <span className="em-serif text-accent">{doc.kind === "course" ? "courses." : "templates."}</span>
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule sm:grid-cols-2">
            {others.map((d) => (
              <li key={d.slug} className="bg-paper">
                <Link
                  href={`/resources/${d.slug}`}
                  className="group flex items-center gap-4 p-6 transition-colors hover:bg-paper-2"
                >
                  <FileText className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1rem] font-semibold text-ink">{d.title}</span>
                    <span className="mt-0.5 block text-[0.85rem] text-soft">{d.no} · {d.readMinutes} min</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
            {others.length % 2 === 1 && (
              <li className="bg-paper-2">
                <Link
                  href="/resources#directory"
                  className="group flex h-full items-center gap-4 p-6 transition-colors hover:bg-paper-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1rem] font-semibold text-ink">
                      The full Directory
                    </span>
                    <span className="mt-0.5 block text-[0.85rem] text-soft">
                      All {directoryAll.length} documents, courses and templates
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </li>
            )}
          </ul>
          <p className="mt-8 text-[0.88rem] text-soft">
            Document {index + 1} of {directoryAll.length} in the Oryx Directory.
          </p>
        </div>
      </section>
    </>
  );
}
