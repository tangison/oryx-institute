import type { Metadata } from "next";
import { InkPage } from "@/components/site/ink-page";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which this website is offered: what the site does, what an enquiry means, what the certificates claim, and what the institute does not promise.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Oryx Polytechnic Institute",
    description:
      "What the site does, what an application means, and what it does not promise.",
    url: "/terms",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of service, Oryx Polytechnic Institute",
      },
    ],
  },
};

const sections = [
  {
    h: "What this site is",
    body: [
      `This website presents ${site.legalName} and invites applications by enquiry. It is operated from ${site.city}, ${site.country}. It takes no payments, creates no accounts, and stores no messages: the application composer prepares an email in your own mail client, where the conversation continues.`,
    ],
  },
  {
    h: "What an enquiry means",
    body: [
      "Sending the application message asks the Principal's office to read it and reply. It does not create a place, a promise of a place, or any obligation on either side. Admission, programme placement and study arrangements are confirmed only in the written reply from the institute.",
    ],
  },
  {
    h: "The content on these pages",
    body: [
      "The site describes the institute's disciplines, brand and printed matter as they are published by the institute itself. The disciplines describe direction, not a catalogue of offerings: programme and course specifics are confirmed at the point of application, and the certificate is issued on completion.",
    ],
  },
  {
    h: "Intellectual property",
    body: [
      "The wordmark, the shield emblem, the print kit imagery and the text of this site belong to the institute. You may quote them with attribution and link to this site; you may not republish them as your own or use them to imply any association with the institute.",
    ],
  },
  {
    h: "External channels",
    body: [
      "This site hands the application to your own mail client. Once your message leaves this site, it travels under the terms of the service you chose to use, not under these terms.",
    ],
  },
  {
    h: "Liability",
    body: [
      "The site is offered as it stands. The institute is not liable for decisions made on the strength of this site alone: the authoritative channel for anything that matters is the written reply from the Principal's office.",
    ],
  },
  {
    h: "Changes",
    body: [
      "These terms may be updated as the institute grows. The current version is always the one published on this page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <InkPage>
      <>
        <PageHero title="Terms of service">
          <p>
            Short terms, because the site does little: it shows the
            institute and carries one message at a time.
          </p>
        </PageHero>

      {/* The register of this page, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="This page, carried horizontally">
          <article className={`hs-card hover-lift tint-warm`}>
            <p className="text-[1.05rem] font-semibold text-ink">What the site does</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">Presents the institute and prepares an application email. Nothing more, nothing hidden.</p>
          </article>
          <article className={`hs-card hover-lift tint-sand`}>
            <p className="text-[1.05rem] font-semibold text-ink">What it never does</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">Takes payments, creates accounts, or stores your messages.</p>
          </article>
          <article className={`hs-card hover-lift tint-blush`}>
            <p className="text-[1.05rem] font-semibold text-ink">Where content lives</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">The words on this site are the institute's own; the handoff happens in your mail client, under its terms.</p>
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
