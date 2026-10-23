import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "One mailbox answers everything at Oryx Institute: info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office.",
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
          <p className="label-caps text-soft">What to expect of the reply</p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-soft" data-reveal>
            The first reply is written by a person, and it does three
            things: it confirms what you asked, it names what the
            institute can and cannot do for you at this stage, and it
            sets out the next step in one line. No fee is quoted before
            the scope of the work is understood, and nothing in the
            reply claims a credential, a campus or a schedule the
            institute does not hold. If your question sits outside the
            practice, the reply says so plainly and points you to where
            the answer is, so no one&apos;s time is spent politely.
          </p>
        </div>
      </section>

      {/* The four kinds of message, carried horizontally like every
          page on the site. Text only; the office is the destination. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            What you can <span className="em-serif text-accent">write about.</span>
          </h2>
        </div>
        <HorizontalScroll label="What the office handles">
          {[
            {
              t: "An application",
              b: "Name, a contact for the reply, and your field of interest. The application starts with that message.",
              c: "tint-blush",
            },
            {
              t: "A business problem",
              b: "Counselling, administration, IT, or research work: bring the problem as it stands, in your own words.",
              c: "tint-warm",
            },
            {
              t: "A partnership",
              b: "Training bodies, accreditation partners, sponsors, complementary businesses. Say what you have in mind.",
              c: "tint-sand",
            },
            {
              t: "The press",
              b: "Questions about the institute, the programme with Tangison Technologies, or the work with Mendozer.",
              c: "tint-rose",
            },
          ].map((s) => (
            <article key={s.t} className={`hs-card hover-lift ${s.c}`}>
              <p className="label-caps text-accent">The office handles</p>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{s.t}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{s.b}</p>
            </article>
          ))}
          <article className="hs-card hs-card--wide bg-ink text-paper">
            <p className="label-caps opacity-70">One rule</p>
            <p className="mt-3 text-[1.15rem] font-semibold">
              Every message gets a reply from a person, not a queue.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-pale-rose"
            >
              {site.email}
            </a>
          </article>
        </HorizontalScroll>
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
