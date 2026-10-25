import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { motto, toolsList } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Oryx Tools List",
  description:
    "You're only as good as your tools. We forge them. Every tool the institute runs on, published in the open: office stack, learner's spine, AI stack.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "The Oryx Tools List | Oryx Institute",
    description:
      "Every tool the institute runs on, published in the open, per the tagline: we forge them.",
    images: [
      {
        url: "/brand/og/tools.png",
        width: 1200,
        height: 630,
        alt: "The Oryx Tools List",
      },
    ],
  },
};

export default function ToolsPage() {
  return (
    <>
      <PageHead eyebrow="Tools & method" title="The tools, named.">
        <p>
          The institute&apos;s rule is the tagline&apos;s: {motto.line} So
          the tools are named, not magic. What the institute runs on is
          listed here in the open, because a school that hides its tools is
          asking you to trust it blind.
        </p>
      </PageHead>

      {/* The three registers — text only, no artifact theatre */}
      {toolsList.map((reg) => (
        <section key={reg.register} className="section">
          <div className="shell">
            <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
              <p className="eyebrow">{reg.register}</p>
              <p className="measure text-soft" data-reveal>
                {reg.intro}
              </p>
            </div>
            <div className="ledger mt-10">
              {reg.items.map((item) => (
                <div className="ledger-row" key={item.name} data-reveal>
                  <p className="ledger-date" aria-hidden="true">
                    {String(reg.items.indexOf(item) + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="h-sub">{item.name}</h2>
                    <p className="measure mt-3 text-soft">{item.what}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* The close: the spine made visible */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-section max-w-[16ch]" data-reveal>
              The biggest tool thinks.
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              Every tool on this page multiplies the same instrument: a
              trained mind, working on evidence, finishing what it starts.
              The AI stack is the newest multiplier and it gets named like
              everything else, because the institute&apos;s rule does not
              have an exception for software. Learn the tools, then forget
              none of them.
            </p>
            <div className="mt-9 flex flex-wrap gap-5">
              <Link href="/schools" className="btn">
                See the schools
              </Link>
              <a href={`mailto:${site.email}`} className="btn--quiet">
                Ask the office <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
