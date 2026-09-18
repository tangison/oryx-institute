import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ProgrammesAccordion } from "@/components/site/programmes-accordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "The four disciplines of a 理工 education at Oryx Politechnical Institute: science, engineering, technology and applied problem-solving. Applications open by enquiry.",
  alternates: { canonical: "/programmes" },
  openGraph: {
    title: "Programmes | Oryx Politechnical Institute",
    description:
      "Science, engineering, technology and applied problem-solving: the four disciplines of a 理工 education in Windhoek.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The disciplines of Oryx Politechnical Institute",
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
          A politechnical education stands on four legs. The institute
          teaches them together, because a problem never arrives divided
          into subjects.
        </p>
      </PageHero>

      <section className="chapter shell">
        <ProgrammesAccordion />
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
