import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { motto, toolsList } from "@/lib/content";
import { site } from "@/lib/site";

/** The master package's artifact set, at native scale. */
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
          The institute&apos;s rule is the founder&apos;s: {motto.line} So
          the tools are named, not magic. What the institute runs on is
          listed here in the open, because a school that hides its tools is
          asking you to trust it blind.
        </p>
      </PageHero>

      {/* The motto band, in the documentary register. */}
      <section className="shell" data-reveal>
        <PhotoFigure
          src="/images/1947/tools-hero.jpg"
          alt="Hands at work on the institute's tools, from the 1947 register"
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* The working objects: the master package's artifact set, at
          native scale, image only, no captions. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The working <span className="em-serif text-accent">objects.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Ten frames from the master package&apos;s artifact set: the
            things a working institute keeps on its shelves.
          </p>
        </div>
        <ul className="specimen-grid mt-12 md:grid-cols-3 lg:grid-cols-5" data-reveal-group>
          {artifactTiles.map((t) => (
            <li key={t.src} className="specimen-tile">
              <Image
                src={t.src}
                alt={t.alt}
                width={344}
                height={248}
                sizes="(min-width: 64rem) 20vw, (min-width: 40rem) 33vw, 50vw"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
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
            alt="Hands on the work, from the institute's 1947 register"
            sizes="(min-width: 64rem) 48vw, 100vw"
            ratio="aspect-[4/5]"
          />
        </div>
      </section>
    </>
  );
}
