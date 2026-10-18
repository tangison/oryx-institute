import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ProgrammesAccordion } from "@/components/site/programmes-accordion";
import { site } from "@/lib/site";

/** The country the disciplines are named for: the master package's
    landscape set plus the institute's own dune frame, at native
    scale, image only. */
const groundFrames = [
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/register/landscape/landscape_${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Namibian ground, frame ${i + 1} of 11, from the master set`,
  })),
  { src: "/images/photo/dune-oryx.jpg", alt: "An oryx on a red dune crest, from the institute's own set" },
];

export const metadata: Metadata = {
  title: "Programmes & Disciplines",
  description:
    "The four disciplines of a 理工 education at Oryx Institute: science, engineering, technology and applied problem-solving. Applications open by enquiry.",
  alternates: { canonical: "/programmes" },
  openGraph: {
    title: "Programmes & Disciplines | Oryx Institute",
    description:
      "Science, engineering, technology and applied problem-solving: the four disciplines of a 理工 education in Windhoek.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The disciplines of Oryx Institute",
      },
    ],
  },
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        title="The disciplines."
        accent={<span className="wordmark-cjk">理工</span>}
      >
        <p>
          A polytechnic education stands on four legs. The institute
          teaches them together, because a problem never arrives divided
          into subjects. Today the live offer is the consulting practice;
          the schools phase in behind it as accreditation progresses.
        </p>
      </PageHero>

      <section className="chapter shell">
        <ProgrammesAccordion />
      </section>

      {/* The ground the institute is named for: the master package's
          landscape set, image only, no captions. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The ground it is <span className="em-serif text-accent">named for.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Eleven frames from the master package&apos;s landscape set:
            dunes, coast, desert roads, the oryx among them.
          </p>
        </div>
        <ul className="specimen-grid mt-12 md:grid-cols-3 lg:grid-cols-4" data-reveal-group>
          {groundFrames.map((t) => (
            <li key={t.src} className="specimen-tile">
              <Image
                src={t.src}
                alt={t.alt}
                width={343}
                height={248}
                sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 33vw, 50vw"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="keyline">
            <p className="label-caps text-soft">How to read this page</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-soft">
              The disciplines describe direction, not a fixed catalogue.
              Programme and course offerings are confirmed by the
              Principal&apos;s office at the point of application, and the
              certificate is issued on completion. If your interest sits
              between two fields, say so in your message: applied
              problem-solving is itself one of the four.
            </p>
          </div>

          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
            <h2 className="display-section text-ink">Apply in one message</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
              Applications are read by the Principal&apos;s office in Windhoek.
              Send your name, your contact and your field of interest.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply" className="pill">
                Apply now
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <a href={`mailto:${site.email}`} className="pill-ghost">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
