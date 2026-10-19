import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import { announcements, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "What Oryx Institute has made public, dated as it was said: the AI training programme with Tangison Technologies, and everything that follows.",
  alternates: { canonical: "/announcements" },
  openGraph: {
    title: "Announcements | Oryx Institute",
    description: "What the institute has made public, dated as it was said.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Announcements from Oryx Institute",
      },
    ],
  },
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero title="Announcements," accent="dated.">
        <p>
          Nothing is announced before it is certain, and nothing is dated
          twice. Each entry below is the institute&apos;s full public
          statement on the day it was made; later entries correct earlier
          ones, never the other way round.
        </p>
      </PageHero>

      {/* The paper trail: the wax seal plate and the announcements
          themselves, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="The announcements">
          {announcements.map((a, i) => (
            <Link
              key={a.slug}
              href={`/announcements/${a.slug}`}
              className={`hs-card hs-card--wide hover-lift ${["tint-blush", "tint-warm"][i % 2]}`}
            >
              <ShinyText
                text={a.kicker}
                color="#71111F"
                shineColor="#D37084"
                speed={4}
                className="label-caps"
              />
              <span className="mt-1 block text-[0.85rem] text-soft">{a.date}</span>
              <p className="mt-3 text-[1.08rem] font-semibold text-ink">{a.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{a.standfirst}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.85rem] font-semibold text-accent">
                Read
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </span>
            </Link>
          ))}
        </HorizontalScroll>
      </section>

      <section className="chapter shell">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8 md:p-10">
          <p className="label-caps text-soft">The standing rule</p>
          <p className="mt-4 text-[1.02rem] leading-[1.7] text-soft">
            Nothing is announced before it is certain, and nothing is dated
            twice. Each entry on this page is the institute&apos;s full
            public statement on the day it was made.
          </p>
        </div>
      </section>
    </>
  );
}
