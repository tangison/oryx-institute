import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { insights, resources } from "@/lib/content";
import { directoryCourses, directoryTemplates } from "@/lib/directory";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Oryx Directory & Bulletin",
  description:
    "Free Namibia-specific crash courses and fill-in business templates from the Oryx Directory, plus the Oryx Bulletin: cited essays on Namibia's skills and tools.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "The Oryx Directory & Bulletin | Oryx Institute",
    description:
      "The Oryx Directory: free crash courses and business templates, with the Bulletin's cited essays.",
    images: [
      {
        url: "/brand/og/resources.png",
        width: 1200,
        height: 630,
        alt: "Resources from Oryx Institute",
      },
    ],
  },
};

const bulletinLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Oryx Directory and Bulletin",
  url: `${site.url}/resources`,
  publisher: {
    "@type": "EducationalOrganization",
    name: site.legalName,
    url: site.url,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bulletinLd) }}
      />

      <PageHead eyebrow="Resources" title="The Oryx Directory and Bulletin.">
        <p>
          The institute writes down what it knows, and gives it away. The
          Directory carries the free resource library: Namibia-specific
          crash courses and business templates, live ahead of
          accreditation. The Bulletin carries the numbers behind the
          mission. Nothing here asks you to take a claim on faith.
        </p>
      </PageHead>

      {/* The Directory — crash courses */}
      <section id="directory" className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">The Oryx Directory</p>
            <p className="measure text-soft" data-reveal>
              Free, Namibia-specific, and copyrighted to Oryx Polytechnic
              Institute: not open-source, but free to access. It is real
              value on day one, before accreditation, and proof of the
              rigor everything the institute charges for is held to. Every
              figure is sourced or labelled as an assumption. None of it
              is legal, tax, or financial advice.
            </p>
          </div>

          <h2 className="h-section mt-14 max-w-[22ch]" data-reveal>
            Crash courses, Namibia first.
          </h2>
          <div className="ledger mt-10">
            {directoryCourses.map((d) => (
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
          </div>

          <h2 className="h-section mt-16 max-w-[22ch]" data-reveal>
            Business templates, ready to fill.
          </h2>
          <div className="ledger mt-10">
            {directoryTemplates.map((d) => (
              <Link
                href={`/resources/${d.slug}`}
                className="ledger-row group"
                key={d.slug}
                data-reveal
              >
                <p className="ledger-date">{d.no}</p>
                <div>
                  <h3 className="news-title">{d.title}</h3>
                  <p className="meta mt-2">
                    {d.readMinutes} min · Updated {d.updated}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The other registers, in one place */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">The registers</p>
            <p className="measure text-soft" data-reveal>
              Everything the institute publishes, listed here. The
              prospectus is issued on request rather than left to go
              stale on a server.
            </p>
          </div>
          <div className="ledger mt-10">
            {resources.map((r) => (
              <Link href={r.action.href} className="ledger-row group" key={r.name} data-reveal>
                <p className="ledger-date">Register</p>
                <div>
                  <h3 className="news-title">{r.name}</h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{r.what}</p>
                  <p className="meta mt-3">{r.action.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Bulletin */}
      <section id="bulletin" className="section-lg">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">The Oryx Bulletin</p>
            <p className="measure text-soft" data-reveal>
              Cited essays on the numbers, the method and the tools.
              Written the way the institute teaches: evidence first,
              decoration never.
            </p>
          </div>

          <div className="mt-14 grid gap-20">
            {insights.map((a) => (
              <article
                key={a.id}
                id={`bulletin-${a.id}`}
                className="hair-t grid gap-8 pt-12 scroll-mt-28 lg:grid-cols-[180px_1fr] lg:gap-16"
                data-reveal
              >
                <div>
                  <p className="eyebrow">{a.no}</p>
                  <p className="meta mt-3">{a.date}</p>
                </div>
                <div className="min-w-0">
                  <h3 className="h-section max-w-[26ch]">{a.title}</h3>
                  <p className="lede measure mt-5 text-soft">{a.dek}</p>
                  <div className="article mt-8">
                    {a.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing rule close */}
      <section className="cta-band section-lg on-ink">
        <div className="shell">
          <h2 className="h-section max-w-[20ch]" data-reveal>
            Set in ink, kept honest.
          </h2>
          <p className="measure mt-6 text-ivory-80" data-reveal>
            The Bulletin follows the institute&apos;s publishing rule:
            every figure carries its source, nothing is invented to fill a
            gap, and when a fact changes, the Bulletin changes with it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5" data-reveal>
            <Link href="/apply" className="btn">
              Apply now
            </Link>
            <Link href="/programmes" className="btn--quiet btn--quiet--ivory">
              What runs today <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
