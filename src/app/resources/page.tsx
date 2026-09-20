import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { insights, resources } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources & Insights | Oryx Politechnical Institute",
  description:
    "The Oryx Bulletin: cited insights on Namibian skills, training and the tools of an AI-native institute, plus the institute's own guides and registers.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources & Insights | Oryx Politechnical Institute",
    description:
      "The Oryx Bulletin: cited insights on Namibian skills and training, with the institute's guides and registers.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Resources and insights from Oryx Politechnical Institute",
      },
    ],
  },
};

const bulletinLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Oryx Bulletin",
  url: `${site.url}/resources`,
  publisher: {
    "@type": "EducationalOrganization",
    name: site.legalName,
    url: site.url,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bulletinLd) }}
      />

      <PageHero title="Resources &amp;" accent="insights.">
        <p>
          The institute writes down what it knows, and cites it. The Oryx
          Bulletin carries the numbers behind the mission; the registers
          carry the tools. Nothing here asks you to take a claim on faith.
        </p>
      </PageHero>

      {/* The Bulletin, in the 1947 documentary register. */}
      <section className="shell">
        <PhotoFigure
          src="/images/1947/resources-hero.jpg"
          alt="Period study in the 1947 documentary register: a reading room with students leaning over open books, one walking through with a stack"
          caption="Period study: the reading room, in the 1947 documentary register."
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* ------------------------------------------------ Resources */}
      <section className="chapter shell">
        <h2 className="display-section max-w-3xl text-ink">
          The registers, <span className="em-serif text-accent">kept</span>
        </h2>
        <p className="measure mt-6 text-[1.02rem] leading-relaxed text-soft">
          Everything the institute publishes in one place. The prospectus is
          issued on request rather than left to go stale on a server, which
          is the institute&apos;s honesty rule applied to paper.
        </p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule">
          {resources.map((r) => (
            <li key={r.name} className="bg-paper">
              <Link
                href={r.action.href}
                className="group flex flex-col gap-2 p-6 transition-colors hover:bg-paper-2 sm:flex-row sm:items-center sm:gap-8 md:p-8"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.05rem] font-semibold text-ink">
                    {r.name}
                  </span>
                  <span className="mt-1 block text-[0.95rem] leading-relaxed text-soft">
                    {r.what}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-[0.85rem] font-semibold text-accent">
                  {r.action.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ Bulletin */}
      <section id="bulletin" className="chapter shell">
        <div className="hair-t grid gap-10 pt-16 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
          <p className="label-caps text-accent">The Oryx Bulletin</p>
          <p className="measure text-[1.02rem] leading-relaxed text-soft">
            Cited essays on the numbers, the method and the tools. Written
            the way the institute teaches: evidence first, decoration never.
          </p>
        </div>

        <div className="mt-6 grid gap-16">
          {insights.map((a) => (
            <article
              key={a.id}
              className="hair-t grid gap-8 pt-12 lg:grid-cols-[auto_1fr] lg:gap-16"
            >
              <div className="lg:w-44">
                <p className="label-caps text-accent">{a.no}</p>
                <p className="photo-caption mt-2">{a.date}</p>
              </div>
              <div className="min-w-0">
                <h3 className="display-statement max-w-3xl text-ink">
                  {a.title}
                </h3>
                <p className="measure mt-4 text-[1.05rem] italic leading-relaxed text-soft">
                  {a.dek}
                </p>
                <div className="measure mt-6 grid gap-5 text-[1.02rem] leading-[1.7] text-soft">
                  {a.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Press */}
      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <PhotoFigure
            src="/images/1947/resources-press.jpg"
            alt="Period study in the 1947 documentary register: a printer pulling the lever of a flatbed letterpress, freshly printed sheets stacked beside"
            caption="Period study: the pressroom, in the 1947 documentary register."
            sizes="(min-width: 64rem) 44vw, 100vw"
            ratio="aspect-[4/5]"
          />
          <div>
            <h2 className="display-section max-w-xl text-ink">
              Set in ink, <span className="em-serif text-accent">kept honest.</span>
            </h2>
            <p className="measure mt-6 text-[1.02rem] leading-relaxed text-soft">
              The Bulletin follows the institute&apos;s publishing rule:
              every figure carries its source, nothing is invented to fill a
              gap, and when a fact changes, the Bulletin changes with it.
              The press above is a period study, not the institute&apos;s
              own pressroom; the honesty rule applies to pictures too.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply" className="pill">
                Apply now
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <Link href="/compare" className="pill-ghost">
                Compare the options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
