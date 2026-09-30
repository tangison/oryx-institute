import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ScaleFigure } from "@/components/site/scale-figure";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site, status } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oryx Institute: the oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Oryx Institute",
    description:
      "The oryx, the characters 理工 and the Principal's office in Windhoek.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "About Oryx Institute",
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
              Oryx Institute. In the wordmark the middle word
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
          <div className="rounded-[var(--r-card)] border border-rule tint-warm p-10">
            <OryxLogo
              variant="lockup"
              tone="brand"
              className="h-16 w-auto"
            />
          </div>

          <ScaleFigure
            src="/images/photo/coast-fog.jpg"
            alt="Fog rolling over the Namibian coast, the water calm beneath"
            width={1000}
            height={720}
            sizes="(min-width: 64rem) 40vw, 100vw"
          />
        </div>
      </section>

      {/* Where the institute stands, stated plainly. Every line comes
          from the master package's own status note and decisions. */}
      <section className="chapter shell">
        <div className="hair-t pt-16">
          <p className="label-caps text-accent">Where the institute stands</p>
          <h2 className="display-section mt-4 max-w-3xl text-ink">
            Prelaunch, and <span className="em-serif text-accent">honest about it.</span>
          </h2>
          <p className="measure mt-6 max-w-3xl text-[1.05rem] leading-relaxed text-soft">
            {status.accreditation} Legal name: {site.legalName}. The
            institute is being established in Windhoek; what runs today is
            what works today.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule md:grid-cols-2">
            {status.liveNow.map((item) => (
              <div key={item.name} className="tint-blush p-8">
                <p className="label-caps text-accent">Live now</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-ink">{item.name}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">{item.line}</p>
              </div>
            ))}
            {status.inDevelopment.map((item) => (
              <div key={item.name} className="tint-sand p-8">
                <p className="label-caps text-soft">In development</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-ink">{item.name}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">{item.line}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--r-card)] border border-rule bg-paper-2 p-8">
            <p className="label-caps text-soft">Partnerships</p>
            <p className="mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-ink/85">
              {status.partnerships} Write to the office at{" "}
              <a href={`mailto:${site.emailGeneral}`} className="link-type">
                {site.emailGeneral}
              </a>{" "}
              and say what you have in mind.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
