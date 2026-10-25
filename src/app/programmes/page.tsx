import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { offers, disciplines, site, schemaIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programmes — What Runs Today",
  description:
    "Six offers live at Oryx Institute: the Owner's Desk, crash and short courses in business administration and IT, market R&D, Rapid Response Training, and the free Oryx Directory.",
  alternates: { canonical: "/programmes" },
  openGraph: {
    title: "What Runs Today | Oryx Institute",
    description:
      "Six offers, live from Windhoek: teaching departments, the practice, and the free Directory.",
    images: [
      {
        url: "/brand/og/programmes.png",
        width: 1200,
        height: 630,
        alt: "What runs today at Oryx Institute",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "What runs today at Oryx Institute",
  itemListElement: offers.map((o, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": o.id === "business-administration" || o.id === "it" ? "Course" : "Service",
      name: o.name,
      description: o.line,
      provider: { "@type": "EducationalOrganization", "@id": schemaIds.org },
      url: `${site.url}/programmes#${o.id}`,
    },
  })),
};

export default function ProgrammesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow="What runs today" title="What runs today.">
        <p>
          A polytechnic education stands on four legs. The institute
          teaches them together, because a problem never arrives divided
          into subjects. Today the teaching runs as crash courses and
          short courses in business administration and IT and related
          fields; the schools phase in behind as accreditation progresses.
        </p>
      </PageHead>

      {/* The six offers, in full */}
      <section className="section">
        <div className="shell">
          <div className="offers">
            {offers.map((o) => (
              <div className="offer" id={o.id} key={o.id} data-reveal>
                <p className="offer-tag">{o.tag}</p>
                <h2 className="offer-name">{o.name}</h2>
                <p className="max-w-[46ch] text-soft">{o.line}</p>
                <p className="measure mt-3 text-[0.95rem] leading-relaxed text-soft">
                  {o.body}
                </p>
                <Link href={o.cta.href} className="btn--quiet mt-3">
                  {o.cta.label} <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The disciplines the offers sit inside */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow eyebrow--ink">Beside the disciplines</p>
            <p className="measure text-soft" data-reveal>
              The disciplines describe the education being phased in; today
              the teaching runs as crash courses and short courses in
              business administration and IT and related fields — and
              nothing longer. Beside the teaching, the practice — the
              Owner&apos;s Desk, market research and development, Rapid
              Response Training — is live, and everything books the same
              way: one message to the Principal&apos;s office. The
              research and development page names what the institute is
              building behind it, and with whom.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d) => (
              <div key={d.id} className="bg-paper p-8" data-reveal>
                <span
                  className={`text-[1.7rem] leading-none ${
                    d.glyph.length > 2 ? "font-serif" : "wordmark-cjk"
                  }`}
                  aria-hidden="true"
                >
                  {d.glyph}
                </span>
                <h3 className="mt-5 font-[500]">{d.name}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-soft">
                  {d.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to read this page + the apply close */}
      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">How to read this page</p>
            <p className="measure mt-6 text-soft" data-reveal>
              The disciplines describe direction, not a fixed catalogue.
              Programme and course offerings are confirmed by the
              Principal&apos;s office at the point of application, and the
              certificate is issued on completion. If your interest sits
              between two fields, say so in your message: applied
              problem-solving is itself one of the four.
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href="/apply" className="btn">
                Apply now
              </Link>
              <Link href="/research" className="btn--quiet">
                See Research &amp; Development{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10">
            <h2 className="h-sub">Apply in one message</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
              Applications are read by the Principal&apos;s office in
              Windhoek. Send your name, your contact and your field of
              interest.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="btn--quiet mt-6"
            >
              {site.email} <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
