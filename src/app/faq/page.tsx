import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions & Answers",
  description:
    "Applying to Oryx Institute, the programmes, the meaning of 理工, ventures, the certificate and where to find the office in Windhoek.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Oryx Institute",
    description:
      "Applying, programmes, ventures, the certificate and the office, answered.",
    images: [
      {
        url: "/brand/og/faq.png",
        width: 1200,
        height: 630,
        alt: "Frequently asked questions about Oryx Institute",
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

      <PageHead title="Questions, answered.">
        <p>
          What applicants ask before they write. Anything else, put it in
          the application message itself: the Principal&apos;s office
          answers directly.
        </p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="faq-list" data-reveal>
            {faqs.map((faq) => (
              <details key={faq.q} name="faq">
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-sign" aria-hidden="true">+</span>
                </summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <a href={`mailto:${site.email}`} className="btn">
              Write to the office
            </a>
            <Link href="/apply" className="btn--quiet">
              Apply now <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
