import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
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

      <section className="chapter shell">
        <div className="measure grid gap-6 text-[1.05rem] leading-[1.75] text-soft">
          {a.body.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : undefined}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule md:grid-cols-2">
          <div className="bg-paper p-8">
            <p className="label-caps text-soft">What is certain</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              The programme exists and is in development. The technology
              partnership is confirmed. It will carry the institute&apos;s
              usual standard: tools named, evidence first.
            </p>
          </div>
          <div className="bg-paper p-8">
            <p className="label-caps text-soft">What is not, yet</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              The schedule, the syllabus and the enrolment route are not
              final, so they are not printed. A second announcement will
              follow when they are.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/apply" className="pill">
            Register interest with the office
          </Link>
          <Link href="/announcements" className="pill-ghost">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            All announcements
          </Link>
        </div>
      </section>
    </>
  );
}
