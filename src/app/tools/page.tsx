import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { motto, toolsList } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Oryx Tools List | Oryx Politechnical Institute",
  description:
    "A man is only as good as his tools. The brain is the biggest tool. Every tool the institute runs on, published in the open: office stack, learner's spine, AI stack.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "The Oryx Tools List | Oryx Politechnical Institute",
    description:
      "Every tool the institute runs on, published in the open. The brain is the biggest tool.",
    images: [
      {
        url: "/images/og-inner.jpg",
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
      <PageHero title="The tools," accent="named.">
        <p>
          The institute&apos;s rule is the founder&apos;s: {motto.line} So
          the tools are named, not magic. What the institute runs on is
          listed here in the open, because a school that hides its tools is
          asking you to trust it blind.
        </p>
      </PageHero>

      {/* The motto band, in the 1947 register. */}
      <section className="shell">
        <PhotoFigure
          src="/images/1947/tools-hero.jpg"
          alt="Period study in the 1947 documentary register: a workshop bench with drafting instruments and calipers in rows, a hand reaching for a micrometer"
          caption="Period study: the bench, in the 1947 documentary register."
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* The three registers. */}
      {toolsList.map((reg) => (
        <section key={reg.register} className="chapter shell">
          <div className="hair-t grid gap-10 pt-16 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="label-caps text-accent">{reg.register}</p>
            <p className="measure text-[1.02rem] leading-relaxed text-soft">
              {reg.intro}
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule sm:grid-cols-2">
            {reg.items.map((item) => (
              <li key={item.name} className="bg-paper p-8 md:p-10">
                <p className="text-[1.1rem] font-semibold text-ink">
                  {item.name}
                </p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
                  {item.what}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* The close: compass in hand, the spine made visible. */}
      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="display-section max-w-xl text-ink">
              The biggest tool{" "}
              <span className="em-serif text-accent">thinks.</span>
            </h2>
            <p className="measure mt-6 text-[1.02rem] leading-relaxed text-soft">
              Every tool on this page multiplies the same instrument: a
              trained mind, working on evidence, finishing what it starts.
              The AI stack is the newest multiplier and it gets named like
              everything else, because the institute&apos;s rule does not
              have an exception for software. Learn the tools, then forget
              none of them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/schools" className="pill">
                See the schools
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <a href={site.whatsapp} className="pill-ghost">
                Ask the office
              </a>
            </div>
          </div>
          <PhotoFigure
            src="/images/1947/tools-hands.jpg"
            alt="Period study in the 1947 documentary register: the hands of an apprentice holding a drafting compass over a technical drawing, mid-stroke"
            caption="Period study: the compass on the drawing, in the 1947 documentary register."
            sizes="(min-width: 64rem) 48vw, 100vw"
            ratio="aspect-[4/5]"
          />
        </div>
      </section>
    </>
  );
}
