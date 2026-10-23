import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site, services, status, partners, schemaIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research & Development | Oryx Institute",
  description:
    "Research and development at Oryx Institute: market R&D for hire, the AI training programme built with Tangison Technologies, and concept work with Mendozer.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research & Development | Oryx Institute",
    description:
      "Market R&D for hire, the AI training programme with Tangison Technologies, and concept work with Mendozer — the R&D practice at Oryx Institute, Windhoek.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Research and Development at Oryx Institute",
      },
    ],
  },
};

/**
 * WebPage + Service structured data for the R&D practice. Every field
 * is a published fact: the for-hire service, the named collaborations.
 * No schedule, fee or credential is asserted.
 */
const jsonLd = [
  {
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
  },
];

export default function ResearchPage() {
  const marketRnD = services.find((s) => s.id === "research");
  const tangison = partners.find((p) => p.id === "tangison");
  const mendozer = partners.find((p) => p.id === "mendozer");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="Research &"
        accent={<span className="em-serif">development.</span>}
      >
        <p>
          Evidence before money moves — for clients, and for the
          institute&apos;s own builds. The same desk does both: market
          research taken on per engagement, and the programme and product
          work the institute runs with named partners.
        </p>
      </PageHero>

      {/* ------------------------------------------------ For hire */}
      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="keyline">
            <p className="label-caps text-soft">For hire</p>
            <h2 className="display-section mt-4 max-w-2xl text-ink" data-reveal>
              The market side of the <span className="em-serif text-accent">desk.</span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-soft">
              {marketRnD?.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply" className="pill">
                Bring a problem
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <Link href="/compare" className="pill-ghost">
                How Oryx compares
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
            <p className="label-caps text-soft">How the work lands</p>
            <ol className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-soft">
              <li>
                <span className="font-semibold text-ink">1 · The question.</span>{" "}
                Written down as it stands, before any method is discussed.
              </li>
              <li>
                <span className="font-semibold text-ink">2 · The ground.</span>{" "}
                Evidence gathered on Namibian ground, sources named.
              </li>
              <li>
                <span className="font-semibold text-ink">3 · The document.</span>{" "}
                Written to be used: findings, options, and the decision
                they support. Not shelved.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ In development */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-3xl text-ink" data-reveal>
            What the institute is <span className="em-serif text-accent">building.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Stated as it stands: in development, with the partners it runs
            with, and nothing promised ahead of its evidence.
          </p>
        </div>

        <HorizontalScroll label="Current research and development work">
          {status.inDevelopment.map((d, i) => (
            <article
              key={d.name}
              className={`hs-card hover-lift ${["tint-blush", "tint-sand", "tint-warm", "tint-rose"][i % 4]}`}
            >
              <p className="label-caps text-accent">In development</p>
              <p className="mt-3 text-[1.15rem] font-semibold text-ink">{d.name}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{d.line}</p>
            </article>
          ))}
          <article className="hs-card hs-card--wide bg-ink text-paper">
            <p className="label-caps opacity-70">The standard</p>
            <p className="mt-3 text-[1.15rem] font-semibold">
              Nothing is announced before it is certain, and no schedule is printed ahead of its evidence.
            </p>
            <Link
              href="/announcements"
              className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-pale-rose"
            >
              Read the announcements
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </Link>
          </article>
        </HorizontalScroll>
      </section>

      {/* ------------------------------------------------ Partners */}
      <section className="chapter shell">
        <div className="keyline pb-12">
          <p className="label-caps text-soft">The partners</p>
          <h2 className="display-section mt-4 max-w-3xl text-ink" data-reveal>
            The work runs <span className="em-serif text-accent">with.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              p: tangison,
              role: "AI training programme · flagship product",
            },
            {
              p: mendozer,
              role: "Collaborating in concepts",
            },
          ].map(({ p, role }) =>
            p ? (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-8 rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-warm-md)] md:p-10"
              >
                <div className="flex h-16 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt=""
                    width={p.id === "tangison" ? 1383 : 1024}
                    height={p.id === "tangison" ? 296 : 401}
                    className={`h-9 w-auto md:h-10 ${
                      p.tone === "ink"
                        ? "text-ink"
                        : ""
                    }`}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-caps text-accent">{role}</p>
                  <p className="mt-3 text-[1.05rem] font-semibold text-ink">
                    {p.name}
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/75">
                    {p.note}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-soft transition-colors group-hover:text-accent">
                    {p.href.replace("https://", "").replace("/", "")}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </p>
                </div>
              </a>
            ) : null,
          )}
        </div>

        <p className="measure mt-8 text-[0.95rem] leading-relaxed text-soft">
          Both marks are carried exactly as each partner publishes them.
          The partnership stance stays open: training bodies, accreditation
          partners, corporate sponsors and complementary businesses can
          write to the office with what they have in mind.
        </p>
      </section>

      {/* ------------------------------------------------ Action */}
      <section className="chapter shell">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 text-center md:p-14">
          <h2 className="display-section mx-auto max-w-2xl text-ink">
            Put the desk to <span className="em-serif text-accent">work.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-soft">
            One email, addressed to the Principal&apos;s office: the
            question as it stands, or the collaboration you have in mind.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply" className="pill">
              Start the conversation
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <a href={`mailto:${site.email}`} className="pill-ghost">
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
