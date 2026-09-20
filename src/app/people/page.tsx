import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { peoplePage } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The People | Oryx Politechnical Institute",
  description:
    "Practitioner-teachers first, one administrator plus agents, and a hiring bar you can read before you apply. The institute hires on evidence, not titles.",
  alternates: { canonical: "/people" },
  openGraph: {
    title: "The People | Oryx Politechnical Institute",
    description:
      "Practitioner-teachers first, one administrator plus agents, and a hiring bar published in advance.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The people of Oryx Politechnical Institute",
      },
    ],
  },
};

export default function PeoplePage() {
  return (
    <>
      <PageHero title="The people," accent="the bar.">
        <p>
          The institute publishes its hiring bar before it prints a single
          staff title, because the staff are the product families are
          buying. Faculty first in the payroll, practitioners first in the
          faculty, and administrators kept deliberately few:{" "}
          {peoplePage.adminLine}
        </p>
      </PageHero>

      {/* The corridor at class change: the page's own register. */}
      <section className="shell">
        <PhotoFigure
          src="/images/1947/people-hero.jpg"
          alt="Period study in the 1947 documentary register: students and a teacher striding through a tall doorway mid-stride, one laughing, books under arms"
          caption="Period study: class change, in the 1947 documentary register."
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* The two tracks. */}
      <section className="chapter shell">
        <h2 className="display-section max-w-3xl text-ink">
          Two tracks, <span className="em-serif text-accent">one standard.</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule md:grid-cols-2">
          {peoplePage.tracks.map((t) => (
            <div key={t.name} className="bg-paper p-8 md:p-10">
              <p className="label-caps text-accent">{t.name}</p>
              <p className="mt-4 text-[1.02rem] leading-[1.7] text-soft">
                {t.what}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The hiring bar. */}
      <section className="chapter shell">
        <div className="hair-t grid gap-10 pt-16 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
          <p className="label-caps text-accent">The hiring bar</p>
          <p className="measure text-[1.02rem] leading-relaxed text-soft">
            Four questions, asked of every candidate, in this order. They
            are printed here so you can judge the institute by the same
            standard it judges its people.
          </p>
        </div>

        <ol className="mt-6 grid gap-10">
          {peoplePage.hiringBar.map((item, i) => (
            <li key={item.q} className="hair-t grid gap-4 pt-10 lg:grid-cols-[auto_1fr] lg:gap-16">
              <p className="display-hero text-accent/90 lg:w-24" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="display-statement max-w-2xl text-ink">
                  {item.q}
                </h3>
                <p className="measure mt-3 text-[1.02rem] leading-[1.7] text-soft">
                  {item.a}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* The invitation. */}
      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="display-section max-w-xl text-ink">
              Teach what you <span className="em-serif text-accent">do.</span>
            </h2>
            <p className="measure mt-6 text-[1.02rem] leading-[1.7] text-soft">
              {peoplePage.invite}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${site.email}`} className="pill">
                Write to the office
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </a>
              <a href={site.whatsapp} className="pill-ghost">
                {site.phoneDisplay}
              </a>
            </div>
            <p className="photo-caption mt-6">
              Staff pages go live as the Principal confirms each name.
              Nothing is published ahead of that confirmation.
            </p>
          </div>
          <PhotoFigure
            src="/images/1947/people-classroom.jpg"
            alt="Period study in the 1947 documentary register: a teacher mid-gesture at the blackboard, chalk dust in the air"
            caption="Period study: the teacher, in the 1947 documentary register."
            sizes="(min-width: 64rem) 44vw, 100vw"
            ratio="aspect-[4/5]"
          />
        </div>
      </section>
    </>
  );
}
