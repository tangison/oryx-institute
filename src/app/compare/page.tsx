import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { compareRules, comparisons } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare, honestly | Oryx Institute",
  description:
    "Oryx beside NUST, the public VTCs, private colleges and teaching yourself: facts cited, with Oryx's own new-and-small status stated as it is.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare, honestly | Oryx Institute",
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

      {/* The comparisons ahead, carried horizontally: one card per
          table, so the choice is visible before the detail. */}
      <section className="shell pt-16">
        <HorizontalScroll label="The four comparisons">
          {comparisons.map((c, i) => (
            <Link
              key={c.id}
              href={`#${c.id}`}
              className={`hs-card hover-lift ${["tint-blush", "tint-warm", "tint-sand", "tint-rose"][i]}`}
            >
              <p className="label-caps text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{c.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                {c.rows.length} axes, side by side.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.85rem] font-semibold text-accent">
                Read the table
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </span>
            </Link>
          ))}
        </HorizontalScroll>
      </section>

      {/* The rules, stated before the tables. */}
      <section className="chapter shell">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
          <p className="label-caps text-accent">The rules of this page</p>
          <ul className="mt-5 grid gap-3" data-reveal-group>
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
