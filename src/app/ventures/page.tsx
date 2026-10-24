import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { ventures, site, schemaIds } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Ventures are the proof: small operating companies Oryx Institute opens to test sectors. Corner Spa, wellness and service operations, is the first live lab.",
  alternates: { canonical: "/ventures" },
  openGraph: {
    title: "Ventures | Oryx Institute",
    description:
      "Small operating companies the institute opens to test sectors. Corner Spa is the first.",
    images: [
      {
        url: "/brand/og/ventures.png",
        width: 1200,
        height: 630,
        alt: "Ventures at Oryx Institute",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ventures",
  url: `${site.url}/ventures`,
  description:
    "The ventures engine at Oryx Institute: small operating companies opened to test sectors, starting with Corner Spa.",
  isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
  about: { "@type": "Organization", "@id": schemaIds.org },
};

export default function VenturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow="Ventures" title="Ventures are the proof.">
        <p>{ventures.body}</p>
      </PageHead>

      {/* Corner Spa — the first venture, on its own palette */}
      <section className="section-lg">
        <div className="shell">
          <div className="quiet-card lg:grid lg:grid-cols-[minmax(0,30rem)_1fr]">
            <figure
              className="relative min-h-[20rem] lg:min-h-full"
              style={{ background: "var(--sand)" }}
              data-reveal
            >
              <Image
                src="/images/kinfolk/k08-spa.jpg"
                alt="Folded linen, stone and a candle on a warm counter"
                fill
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="p-8 md:p-12 lg:p-14">
              <p className="offer-tag">Venture 01 · {ventures.cornerSpa.status}</p>
              <h2 className="h-section mt-4">{ventures.cornerSpa.name}</h2>
              <p className="lede mt-4 text-soft">{ventures.cornerSpa.line}</p>
              <p className="measure mt-6 text-soft" data-reveal>
                {ventures.cornerSpa.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What a venture is, and what comes next */}
      <section className="section-lg">
        <div className="shell grid gap-12 md:grid-cols-2">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">The exit exam</p>
            <p className="lede measure mt-6" data-reveal>
              A venture cannot be faked. It works or it doesn&apos;t. A
              customer pays or doesn&apos;t.
            </p>
            <p className="measure mt-6 text-soft" data-reveal>
              Every course the institute teaches ends in something that
              works and something that sells. The ventures engine is the
              institute holding itself to its own exit exam: small
              companies, run to standard, their openings dated in the
              public register.
            </p>
          </div>
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">Next</p>
            <p className="lede measure mt-6" data-reveal>
              {ventures.futureLine}
            </p>
            <div className="mt-8">
              <Link href="/news" className="btn--quiet">
                Read the register in the news{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="cta-band section-lg on-ink">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]" data-reveal>
            A sector you think Oryx should test?
          </h2>
          <p className="mt-6 max-w-[52ch] text-ivory-80" data-reveal>
            The office reads venture ideas the same way it reads
            applications: one message, answered personally. If the fit is
            real, the conversation starts there.
          </p>
          <div className="mt-10" data-reveal>
            <a href={`mailto:${site.email}`} className="btn">
              Write to the office
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
