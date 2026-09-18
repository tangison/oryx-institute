import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Applying to Oryx Politechnical Institute, the four disciplines, the meaning of 理工, the certificate and where to find the office in Windhoek.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Oryx Politechnical Institute",
    description:
      "Applying, programmes, the certificate and the office, answered.",
    url: "/faq",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Frequently asked questions about Oryx Politechnical Institute",
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero title="Questions," accent="answered.">
        <p>
          What applicants ask before they write. Anything else, put it in
          the application message itself: the Principal&apos;s office
          answers directly.
        </p>
      </PageHero>

      <section className="chapter shell grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <FaqAccordion items={faqs} />

        <aside className="grid gap-8 lg:sticky lg:top-28">
          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8">
            <p className="label-caps text-soft">Still unanswered?</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              Ask it in your application. A question in the first message
              is read as seriousness, not hesitation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="pill !px-5 !py-2.5 text-[0.85rem]"
              >
                Apply now
              </Link>
              <a href={`tel:${site.phoneHref}`} className="pill-ghost !px-5 !py-2.5 text-[0.85rem]">
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="keyline">
            <p className="label-caps text-soft">The office</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">
              {site.address}
              <br />
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
