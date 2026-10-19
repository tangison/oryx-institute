import type { Metadata } from "next";
import { InkPage } from "@/components/site/ink-page";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer & Acceptable Use",
  description:
    "What this website asserts, what it leaves to the Principal's office to confirm, and how the institute's own print kit governs the claims made here.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | Oryx Polytechnic Institute",
    description:
      "What this site asserts and what it leaves to the office to confirm.",
    url: "/disclaimer",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Disclaimer, Oryx Polytechnic Institute",
      },
    ],
  },
};

const sections = [
  {
    h: "The standard for every claim",
    body: [
      "Every factual statement on this site is drawn from the institute's own published material: the logo artwork, the print kit, the recruitment flyer and the certificate. Names, contacts, colours and lines are reproduced exactly as supplied. Where this site adds framing of its own, the framing is clearly editorial and never introduces a fact the institute has not printed.",
    ],
  },
  {
    h: "Programmes and offerings",
    body: [
      "The four disciplines describe the directions of the education. They are not a catalogue of programmes, courses, schedules or fees, and this site deliberately prints none. Anything specific to your case, including programme and course offerings, admission, and what completion requires, is confirmed by the Principal's office in the written reply to your application.",
    ],
  },
  {
    h: "No accreditation claims",
    body: [
      "This site makes no claim about accreditation, recognition or registration beyond what the institute itself prints. Where the printed material is silent, so is this site.",
    ],
  },
  {
    h: "The application channel",
    body: [
      `Applications run by email to the office (${site.email}). No message is stored by this site, and no portal here takes a place, a payment or a promise.`,
    ],
  },
  {
    h: "Imagery",
    body: [
      "The wolf and the misty ocean appear exactly as the institute's print kit publishes them, cropped only to fit the page. They are brand imagery, not depictions of the campus or its students.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <InkPage>
      <>
        <PageHero title="Disclaimer">
          <p>
            What this site asserts and what it leaves to the office to
            confirm, in plain language.
          </p>
        </PageHero>

      {/* The register of this page, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="This page, carried horizontally">
          <article className={`hs-card hover-lift tint-sand`}>
            <p className="text-[1.05rem] font-semibold text-ink">Status, as it is</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">Prelaunch and pre-accreditation. Nothing here claims a credential the institute does not hold.</p>
          </article>
          <article className={`hs-card hover-lift tint-blush`}>
            <p className="text-[1.05rem] font-semibold text-ink">Figures carry sources</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">Every number in the Bulletin names its source inline, or it does not ship.</p>
          </article>
          <article className={`hs-card hover-lift tint-warm`}>
            <p className="text-[1.05rem] font-semibold text-ink">Not advice</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">The free Directory is teaching material, not legal, tax or financial advice.</p>
          </article>
        </HorizontalScroll>
      </section>

        <section className="shell pb-28">
          {sections.map((s) => (
            <div key={s.h} className="mt-10 first:mt-0">
              <h2>{s.h}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="doc-meta mt-16">
            {site.legalName} · {site.city}, {site.country}
          </p>
        </section>
      </>
    </InkPage>
  );
}
