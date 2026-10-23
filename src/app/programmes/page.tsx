import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ProgrammesAccordion } from "@/components/site/programmes-accordion";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { disciplines, site } from "@/lib/site";

/** The ground the institute is named for: the master set's one wide
    coastal frame, carried horizontally beside the four discipline
    cards. Image only. */
const groundPlate = {
  src: "/images/register-hd/landscape/landscape_06.webp",
  alt: "The Namibian coast where the desert meets the water, from the master set",
};

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
          into subjects. Today the teaching runs as crash courses and
          short courses in business administration and IT and related
          fields; the schools phase in behind as accreditation
          progresses.
        </p>
      </PageHero>

      <section className="chapter shell">
        <ProgrammesAccordion />
      </section>

      {/* What runs today: the crash and short courses, with the live
          practice named beside them so a visitor knows what books. */}
      <section className="chapter shell">
        <div className="keyline max-w-3xl">
          <p className="label-caps text-soft">Beside the disciplines</p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-soft" data-reveal>
            The disciplines describe the education being phased in; today
            the teaching runs as crash courses and short courses in
            business administration and IT and related fields — and
            nothing longer. Beside the teaching, the practice —
            counselling, market research and development, Rapid Response
            Training — is live, and everything books the same way: one
            message to the Principal&apos;s office. The research and
            development page names what the institute is building behind
            it, and with whom.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/research" className="pill-ghost">
              See Research &amp; Development
            </Link>
            <Link href="/apply" className="pill">
              Book the practice
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* The ground the institute is named for: one wide coastal frame
          and the four discipline cards, carried horizontally. */}
      <section className="chapter shell pb-0">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The ground it is <span className="em-serif text-accent">named for.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Hard country, taken straight from the master set: the coast,
            the desert, the discipline both demand.
          </p>
        </div>

        <HorizontalScroll label="The ground and the four disciplines">
          <figure className="hs-card hs-card--plate hs-card--wide">
            <div className="plate-clip img-zoom w-full">
              <Image
                src={groundPlate.src}
                alt={groundPlate.alt}
                width={695}
                height={249}
                sizes="560px"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
          {disciplines.map((d, i) => (
            <article
              key={d.id}
              className={`hs-card hover-lift ${["tint-blush", "tint-sand", "tint-warm", "tint-rose"][i]}`}
            >
              <span
                className={`${d.glyph.length > 2 ? "bento-glyph-latin" : "bento-glyph wordmark-cjk"}`}
                aria-hidden
              >
                {d.glyph}
              </span>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{d.name}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{d.summary}</p>
            </article>
          ))}
        </HorizontalScroll>
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
