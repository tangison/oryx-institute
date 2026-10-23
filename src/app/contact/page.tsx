import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "One mailbox answers everything at Oryx Institute: info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office in Windhoek.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Oryx Institute",
    description:
      "One mailbox answers everything: info@oryxinstitute.org. The office reads every message, Windhoek, Namibia.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Contact the office of Oryx Institute",
      },
    ],
  },
};

/**
 * The contact facts, stated once. No telephone is published (a
 * business line lands before launch); no street address exists yet, so
 * none is claimed. Everything here matches the footer and the FAQ.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact the Office",
  url: `${site.url}/contact`,
  isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website` },
  about: {
    "@type": "EducationalOrganization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    email: site.email,
    areaServed: site.areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "NA",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero title="Contact the" accent={<span className="em-serif">office.</span>}>
        <p>
          One mailbox answers everything: applications, partnerships, the
          press. It is read in the Principal&apos;s office, and every
          message gets a reply from a person, not a queue.
        </p>
      </PageHero>

      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="keyline">
            <p className="label-caps text-soft">The address that works</p>
            <h2 className="display-section mt-4 text-ink" data-reveal>
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </h2>
            <p className="mt-6 max-w-[48ch] text-[1.02rem] leading-relaxed text-soft">
              Say in your first message what the message is: an
              application, a business problem, a partnership, or a press
              question. The office replies personally, usually within the
              week, and the first reply names what the institute can and
              cannot do for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${site.email}`} className="pill">
                Write to the office
              </a>
              <Link href="/apply" className="pill-ghost">
                Apply instead
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
            <p className="label-caps text-soft">Stated as it is</p>
            <dl className="mt-6 space-y-5 text-[0.98rem] leading-relaxed">
              <div>
                <dt className="font-semibold text-ink">Where the office is</dt>
                <dd className="mt-1 text-soft">
                  {site.city}, {site.country}. No public premises yet, so
                  no street address is printed. Visits are arranged by
                  appointment, at a place that suits both sides.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Telephone</dt>
                <dd className="mt-1 text-soft">
                  None published. A dedicated business line lands before
                  launch, and it will appear here and in the footer the
                  day it exists.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Social channels</dt>
                <dd className="mt-1 text-soft">
                  None linked yet. The channels the institute opens will
                  be linked from the footer when they are real.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="chapter shell">
        <div className="keyline max-w-3xl">
          <p className="label-caps text-soft">Before you write</p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-soft" data-reveal>
            The FAQ answers the common questions: how to apply, what the
            practice covers, where the institute stands on accreditation,
            and how partnerships work. Reading it first means the first
            reply can go straight to your actual question.
          </p>
          <div className="mt-6">
            <Link href="/faq" className="pill-ghost">
              Read the FAQ first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
