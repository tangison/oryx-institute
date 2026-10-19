import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { OryxLogo } from "@/components/site/oryx-logo";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site, status } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "Oryx Institute: the oryx, the characters 理工, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About the Institute | Oryx Institute",
    description:
      "The oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
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

/** The ground plan: ten of the master package's architecture frames,
    carried horizontally — the page's own drawer of buildings and
    rooms, image only. */
const groundTiles = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11].map((n) => ({
  src: `/images/register/architecture/architecture_${String(n).padStart(2, "0")}.webp`,
  alt: `Institute architecture, frame ${n} of the master set`,
}));

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
            <p className="label-caps text-soft">The practice</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-soft">
              Today the institute works as a consultancy. Business
              counselling runs from the Principal&apos;s office; market
              research and development work is taken on per engagement;
              Rapid Response Training brings teams up to standard. The
              schools are phased in behind the practice, in order, as
              accreditation progresses, not before.
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
              The institute works from {site.city}, {site.country}, and
              does not operate public premises yet, so no street address
              is printed. The Principal, {site.principal.name}, reads
              every application personally. Reach the office by email at{" "}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              .
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
        </div>
      </section>

      {/* The ground plan: the institute's buildings and rooms, carried
          horizontally, image only, no captions. */}
      <section className="chapter shell pb-0 md:pb-0">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The ground, <span className="em-serif text-accent">in frames.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            The institute&apos;s buildings and rooms, from the master
            package&apos;s architecture set. Unedited.
          </p>
        </div>

        <HorizontalScroll label="The ground plan, in frames">
          {groundTiles.map((t) => (
            <figure
              key={t.src}
              className="hs-card hs-card--plate hs-card--wide"
            >
              <div className="plate-clip img-zoom w-full">
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={344}
                  height={248}
                  sizes="560px"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </HorizontalScroll>
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
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>{" "}
              and say what you have in mind.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
