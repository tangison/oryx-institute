import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { motto, toolsList } from "@/lib/content";
import { site } from "@/lib/site";

/** The master package's artifact set, at native scale, carried
    horizontally: the working objects as a drawer of plates. */
const artifactTiles = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/register/artifacts/artifact_${String(i + 1).padStart(2, "0")}.webp`,
  alt: `Institute artifact ${i + 1} of 10, from the master set`,
}));

export const metadata: Metadata = {
  title: "The Oryx Tools List | Oryx Institute",
  description:
    "You're only as good as your tools. We forge them. Every tool the institute runs on, published in the open: office stack, learner's spine, AI stack.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "The Oryx Tools List | Oryx Institute",
    description:
      "Every tool the institute runs on, published in the open, per the tagline: we forge them.",
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
          The institute&apos;s rule is the tagline&apos;s: {motto.line} So
          the tools are named, not magic. What the institute runs on is
          listed here in the open, because a school that hides its tools is
          asking you to trust it blind.
        </p>
      </PageHero>

      {/* The working objects: the master package's artifact set, at
          native scale, carried horizontally, image only, no captions. */}
      <section className="shell pt-4">
        <HorizontalScroll label="The working objects">
          {artifactTiles.map((t) => (
            <figure key={t.src} className="hs-card hs-card--plate">
              <div className="plate-clip img-zoom w-full">
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={263}
                  height={370}
                  sizes="380px"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </HorizontalScroll>
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

      {/* The close: the spine made visible. */}
      <section className="chapter shell">
        <div className="keyline max-w-3xl">
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
            <a href={`mailto:${site.email}`} className="pill-ghost">
              Ask the office
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
