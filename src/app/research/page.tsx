import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { offers, partners, site, status, schemaIds } from "@/lib/site";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research & Development",
  description:
    "Research and development at Oryx Institute: market R&D for hire, the AI training programme built with Tangison Technologies, and concept work with Mendozer.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research & Development | Oryx Institute",
    description:
      "Market R&D for hire, the AI training programme with Tangison Technologies, and concept work with Mendozer.",
    images: [
      {
        url: "/brand/og/research.png",
        width: 1200,
        height: 630,
        alt: "Research and Development at Oryx Institute",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Research & Development",
  url: `${site.url}/research`,
  description:
    "The R&D practice at Oryx Institute: market research and development for hire, and the institute's own development work with named partners.",
  isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
  about: {
    "@type": "Service",
    name: "Market research and development",
    provider: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
    },
    areaServed: site.areaServed,
  },
};

export default function ResearchPage() {
  const marketRnD = offers.find((o) => o.id === "market-rd");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow="Research" title="Research runs from day one.">
        <p>
          Evidence before money moves — for clients, and for the
          institute&apos;s own builds. The same desk does both: market
          research taken on per engagement, and the programme and product
          work the institute runs with named partners.
        </p>
      </PageHead>

      {/* For hire — the market side of the desk */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow eyebrow--ink">For hire</p>
            <h2 className="h-section mt-5 max-w-[20ch]" data-reveal>
              The market side of the desk.
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              {marketRnD?.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href="/apply?for=market-rd" className="btn">
                Bring a problem
              </Link>
              <Link href="/programmes" className="btn--quiet">
                What runs today <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10" data-reveal>
            <p className="eyebrow eyebrow--ink">How the work lands</p>
            <ol className="mt-6 grid gap-5 text-[0.98rem] leading-relaxed text-soft">
              <li>
                <span className="font-[500] text-ink">1 · The question.</span>{" "}
                Written down as it stands, before any method is discussed.
              </li>
              <li>
                <span className="font-[500] text-ink">2 · The ground.</span>{" "}
                Evidence gathered on Namibian ground, sources named.
              </li>
              <li>
                <span className="font-[500] text-ink">3 · The document.</span>{" "}
                Written to be used: findings, options, and the decision
                they support. Not shelved.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* The Bulletin — the published writing */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">The Bulletin</p>
            <p className="measure text-soft" data-reveal>
              Cited essays on the numbers, the method and the tools,
              written the way the institute teaches: evidence first,
              decoration never. Every figure carries its source, or it
              does not ship.
            </p>
          </div>
          <div className="ledger mt-12">
            {insights.map((a) => (
              <div className="ledger-row" key={a.id} data-reveal>
                <p className="ledger-date">{a.no}</p>
                <div>
                  <h3 className="news-title">
                    <Link href={`/resources#bulletin-${a.id}`}>{a.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{a.dek}</p>
                  <Link
                    href={`/resources#bulletin-${a.id}`}
                    className="btn--quiet mt-3"
                  >
                    Read <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The notebook — the research image */}
      <section className="section">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16">
          <figure className="plate aspect-[3/4]" data-reveal>
            <Image
              src="/images/kinfolk/k05-notebook.jpg"
              alt="A maroon notebook lies open on cream paper, pen resting in the fold"
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="eyebrow eyebrow--ink">Fieldwork notes</p>
            <p className="lede measure mt-5" data-reveal>
              Fieldwork notes open when fieldwork starts. The Bulletin
              carries the writing until then.
            </p>
            <p className="eyebrow eyebrow--ink mt-12">Papers</p>
            <p className="lede measure mt-5" data-reveal>
              Cited papers publish as the research programme produces
              them. None exist yet; none are claimed.
            </p>
          </div>
        </div>
      </section>

      {/* Terracotta research divider */}
      <div className="band band--terracotta" aria-hidden="true">
        <p className="band-word">Evidence.</p>
      </div>

      {/* Researchers — the Principal, at launch */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Researchers</p>
            <p className="measure text-soft" data-reveal>
              The research register at launch is one desk wide. It widens
              as researchers join, and each one is named here when they do.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2">
            <div className="quiet-card">
              {/* TODO founder: replace the shield placeholder with the
                  Principal's portrait when the Windhoek photoshoot lands. */}
              <div className="grid place-items-center bg-white border-b border-rule p-14">
                <OryxLogo
                  variant="emblem"
                  tone="brand"
                  className="h-44 w-auto"
                  title=""
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow eyebrow--ink">{site.principal.role}</p>
                <h3 className="h-sub mt-3">{site.principal.name}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                  Principal of the institute. Reads every application
                  personally, writes the Bulletin&apos;s register, and
                  holds the desk the research runs from.
                </p>
              </div>
            </div>
            <div className="quiet-card p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">In development</p>
              <ul className="mt-6 grid gap-6">
                {status.inDevelopment.map((item) => (
                  <li key={item.name} className="hair-b hair-b--ink pb-6 last:border-0 last:pb-0">
                    <p className="font-[500]">{item.name}</p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">
                      {item.line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Partners</p>
            <p className="measure text-soft" data-reveal>
              Named, and by their own marks: the collaborations the
              research runs with, carried as the partners print them.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2">
            {partners.map((p) => (
              <div key={p.id} className="bg-paper p-8 md:p-10" data-reveal>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className={`inline-flex h-8 items-center ${p.tone === "ink" ? "text-ink" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt=""
                    width={p.id === "tangison" ? 1383 : 1024}
                    height={p.id === "tangison" ? 296 : 401}
                    className="h-full w-auto"
                    loading="lazy"
                  />
                </a>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-soft">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
