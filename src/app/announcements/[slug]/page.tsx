import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import { announcements, site } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return announcements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = announcements.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `${a.title} | Announcements`,
    description: a.standfirst,
    alternates: { canonical: `/announcements/${a.slug}` },
    openGraph: {
      title: `${a.title} | Oryx Institute`,
      description: a.standfirst,
      images: [
        {
          url: "/images/og-inner.jpg",
          width: 1200,
          height: 630,
          alt: `${a.title}, from Oryx Institute`,
        },
      ],
    },
  };
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = announcements.find((x) => x.slug === slug);
  if (!a) notFound();

  /** Truthful structured data: a dated public statement by the
      institute as publisher. Every field matches visible content. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.standfirst,
    datePublished: a.dateISO,
    dateModified: a.dateISO,
    author: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo-lockup.svg`,
      },
    },
    image: `${site.url}/images/og-inner.jpg`,
    url: `${site.url}/announcements/${a.slug}`,
    mainEntityOfPage: `${site.url}/announcements/${a.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero title={a.title} accent="">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem]">
          <span className="label-caps text-accent">{a.kicker}</span>
          <span className="text-soft">{a.date}</span>
        </div>
      </PageHero>

      {/* The three facts of this announcement, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="What this announcement states">
          {[
            {
              t: "The partner",
              b: "Tangison Technologies, named. The collaboration grew out of real client work, not a signing ceremony.",
              c: "tint-blush",
            },
            {
              t: "The curriculum",
              b: "Being written now, module by module, to the institute's rule: tools named, not magic, nothing taught that cannot be demonstrated.",
              c: "tint-warm",
            },
            {
              t: "The flagship",
              b: "Under construction on top of the curriculum. It stays deliberately quiet until it can be shown.",
              c: "tint-sand",
            },
          ].map((s) => (
            <article key={s.t} className={`hs-card hover-lift ${s.c}`}>
              <p className="label-caps text-accent">Stated</p>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{s.t}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{s.b}</p>
            </article>
          ))}
        </HorizontalScroll>
      </section>

      <section className="chapter shell">
        <div
          data-line-grow
          className="mb-10 h-px w-full bg-rule"
          aria-hidden
        />
        {/* The body reveals through the site-wide ScrollMotion pass:
            content is server-rendered visible and only animated FROM a
            hidden state when JS runs — no-JS visitors lose nothing. */}
        <div
          data-reveal
          className="measure grid gap-6 text-[1.05rem] leading-[1.75] text-soft"
        >
          {a.body.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : undefined}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule md:grid-cols-2" data-reveal-group>
          <div className="bg-paper p-8">
            <p className="label-caps text-soft">What is certain</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              The partner is named: Tangison Technologies. The curriculum is
              being written now, and a flagship product is under construction
              on top of it. It will carry the institute&apos;s usual standard:
              tools named, evidence first.
            </p>
          </div>
          <div className="bg-paper p-8">
            <p className="label-caps text-soft">What is not, yet</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              The schedule, the syllabus and the enrolment route are not
              final, so they are not printed. The flagship product itself
              stays quiet until it can be shown. A second announcement will
              follow when they are.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnet padding={36} magnetStrength={3} maxOffset={9}>
            <Link href="/apply" className="pill">
              Register interest with the office
            </Link>
          </Magnet>
          <Link href="/announcements" className="pill-ghost">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            All announcements
          </Link>
        </div>
      </section>
    </>
  );
}
