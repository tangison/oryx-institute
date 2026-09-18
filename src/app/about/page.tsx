import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ScaleFigure } from "@/components/site/scale-figure";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oryx Politechnical Institute: the oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Oryx Politechnical Institute",
    description:
      "The oryx, the characters 理工 and the Principal's office in Windhoek.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "About Oryx Politechnical Institute",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="Built for hard" accent="ground.">
        <p>
          The institute is named for the oryx: Namibia&apos;s own antelope,
          straight-horned, unhurried and impossible to starve out of dry
          country. The wordmark adds{" "}
          <span className="wordmark-cjk text-accent">理工</span>, science and
          engineering, set in the logo exactly where the two belong.
        </p>
      </PageHero>

      <section className="chapter shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <div className="grid gap-8">
          <div>
            <p className="label-caps text-soft">The name</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-soft">
              Oryx Politechnical Institute. In the wordmark the middle word
              stands in Chinese: <span className="wordmark-cjk text-accent">理工</span>{" "}
              (li gong), the characters for science and engineering. The
              seal above them is the maroon shield, and the whole lockup
              sets in a classic serif, the way it is printed on the
              institute&apos;s letterhead.
            </p>
          </div>

          <div>
            <p className="label-caps text-soft">The temper</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-soft">
              The institute&apos;s own flyer says it in three words: looks
              harmless, isn&apos;t. Graduates are measured the same way the
              certificate measures them, on innovation and applied
              problem-solving. Quiet work, decisive finishes.
            </p>
          </div>

          <div>
            <p className="label-caps text-soft">The office</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-soft">
              {site.address}. The Principal, {site.principal.name}, reads
              every application personally. Reach the office by telephone
              on {site.phoneDisplay} or by email at {site.email}.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/apply" className="pill">
              Apply now
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <Link href="/brand" className="pill-ghost">
              The brand register
            </Link>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-10">
            <OryxLogo
              variant="lockup"
              tone="brand"
              className="h-16 w-auto"
            />
            <p className="photo-caption mt-6">
              The lockup as printed: ORYX and INSTITUTE in ink,{" "}
              <span className="wordmark-cjk text-accent">理工</span> and the
              shield in maroon.
            </p>
          </div>

          <ScaleFigure
            src="/images/ocean.jpg"
            alt="A calm ocean under heavy mist, from the institute's presentation folder"
            width={1920}
            height={1180}
            sizes="(min-width: 64rem) 40vw, 100vw"
            caption="The presentation folder's register: calm water, mist, patience"
          />
        </div>
      </section>
    </>
  );
}
