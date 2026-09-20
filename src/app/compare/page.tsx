import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { compareRules, comparisons } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare, honestly | Oryx Politechnical Institute",
  description:
    "Oryx beside the alternatives: NUST, the public VTCs, private colleges and teaching yourself. Publicly verifiable facts, cited, with Oryx's own status stated as it is.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare, honestly | Oryx Politechnical Institute",
    description:
      "Oryx beside NUST, the VTCs, private colleges and the self-taught path. Facts cited, status stated as it is.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Institute compared honestly with Namibian alternatives",
      },
    ],
  },
};

export default function ComparePage() {
  return (
    <>
      <PageHero title="Compare," accent="honestly.">
        <p>
          A new institute should be chosen with its eyes open, so this page
          puts Oryx beside the alternatives Namibians actually weigh: the
          university, the public VTCs, the private colleges, and the
          self-taught path. Three rules govern every table: never
          disparage, use only publicly verifiable facts, and state
          Oryx&apos;s own status as it is, new, small and honest about it.
        </p>
      </PageHero>

      {/* The fork in the veld: the page's own art direction. */}
      <section className="shell">
        <PhotoFigure
          src="/images/1947/compare-road.jpg"
          alt="Period study in the 1947 documentary register: a gravel road forking across the Namibian veld, a lone figure with a satchel walking the left path"
          caption="Period study: the fork in the road, in the 1947 documentary register."
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* The rules, stated before the tables. */}
      <section className="chapter shell">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
          <p className="label-caps text-accent">The rules of this page</p>
          <ul className="mt-5 grid gap-3">
            {compareRules.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[1.02rem] leading-relaxed text-soft"
              >
                <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The comparisons. */}
      {comparisons.map((c) => (
        <section key={c.id} id={c.id} className="chapter shell">
          <div className="hair-t pt-16">
            <h2 className="display-section max-w-2xl text-ink">{c.title}</h2>
            <p className="measure mt-5 text-[1.02rem] leading-[1.7] text-soft">
              {c.intro}
            </p>

            <div className="mt-10 overflow-hidden rounded-[var(--r-card)] border border-rule">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-paper-2">
                    <th className="label-caps p-4 align-bottom text-soft md:p-5" scope="col">
                      The axis
                    </th>
                    <th className="label-caps p-4 align-bottom text-soft md:p-5" scope="col">
                      The other path
                    </th>
                    <th className="label-caps p-4 align-bottom text-accent md:p-5" scope="col">
                      Oryx
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row) => (
                    <tr key={row.axis} className="border-t border-rule align-top">
                      <th
                        className="p-4 text-[0.92rem] font-semibold text-ink md:p-5"
                        scope="row"
                      >
                        {row.axis}
                      </th>
                      <td className="p-4 text-[0.95rem] leading-relaxed text-soft md:p-5">
                        {row.them}
                      </td>
                      <td className="p-4 text-[0.95rem] leading-relaxed text-ink md:p-5">
                        {row.us}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* The honest close. */}
      <section className="chapter shell">
        <div className="band-night relative overflow-hidden rounded-[var(--r-card)] px-6 py-16 text-center sm:px-12 md:py-20">
          <h2 className="display-section mx-auto max-w-2xl">
            If you want big, go to them.{" "}
            <span className="em-serif text-rose">
              If you want this, apply.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-[1.02rem] leading-relaxed opacity-90">
            Applications open by enquiry, addressed to the
            Principal&apos;s office. One message starts it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply" className="pill">
              Start your application
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="pill-ghost-dark pill-ghost !px-6 !py-3"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-10 text-[0.85rem] opacity-75">
            Sources: NUST public admissions record; NTA publicised intake,
            2026; UNESCO-UNEVOC Namibia TVET profile; World Bank skills
            policy note. Figures carried in full on the{" "}
            <Link href="/resources#bulletin" className="underline underline-offset-4">
              Oryx Bulletin
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
