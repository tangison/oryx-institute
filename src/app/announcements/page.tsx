import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { announcements, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "What Oryx Institute has made public, dated as it was said: the AI training programme with a technology company, and everything that follows.",
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

      <section className="shell" data-reveal>
        <PhotoFigure
          src="/images/photo/typewriter.jpg"
          alt="A typewriter on a concrete surface, its carriage set"
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      <section className="chapter shell">
        <div className="grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule" data-reveal-group>
          {announcements.map((a) => (
            <Link
              key={a.slug}
              href={`/announcements/${a.slug}`}
              className="group flex flex-col gap-2 bg-paper p-8 transition-colors hover:bg-paper-2 md:flex-row md:items-center md:gap-10 md:p-10"
            >
              <span className="shrink-0 lg:w-44">
                <span className="label-caps text-accent">{a.kicker}</span>
                <span className="mt-1 block text-[0.85rem] text-soft">{a.date}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.15rem] font-semibold text-ink">
                  {a.title}
                </span>
                <span className="mt-1 block text-[0.98rem] leading-relaxed text-soft">
                  {a.standfirst}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 text-[0.85rem] font-semibold text-accent">
                Read
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>

        <p className="measure mt-8 text-[0.95rem] leading-relaxed text-soft">
          Enquiries about any announcement go to the Principal&apos;s
          office: WhatsApp {site.phoneDisplay} or{" "}
          <a href={`mailto:${site.email}`} className="link-type">
            {site.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
