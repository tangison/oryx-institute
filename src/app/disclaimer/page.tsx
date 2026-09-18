import type { Metadata } from "next";
import { InkPage } from "@/components/site/ink-page";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "What this website asserts, what it leaves to the Principal's office to confirm, and how the institute's own print kit governs the claims made here.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | Oryx Politechnical Institute",
    description:
      "What this site asserts and what it leaves to the office to confirm.",
    url: "/disclaimer",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Disclaimer, Oryx Politechnical Institute",
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
      `Applications run through WhatsApp and email to the Principal's office (${site.email}, ${site.phoneDisplay}). No message is stored by this site, and no portal here takes a place, a payment or a promise.`,
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
            {site.legalName} · {site.address}
          </p>
        </section>
      </>
    </InkPage>
  );
}
