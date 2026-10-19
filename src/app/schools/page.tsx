import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { appliedSpine, schools } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Schools | Oryx Institute",
  description:
    "Three schools, one spine: Technology first, then Engineering, then Science, with applied problem-solving running through all of them. Open for enquiry.",
  alternates: { canonical: "/schools" },
  openGraph: {
    title: "The Schools | Oryx Institute",
    description:
      "Three schools, one spine: Technology, Engineering, Science. Open for enquiry, honest about timing.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The schools of Oryx Institute",
      },
    ],
  },
};

const schoolsLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The schools of Oryx Institute",
  itemListElement: schools.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "EducationalOrganization",
      name: `${site.legalName}, ${s.name}`,
      url: `${site.url}/schools#${s.id}`,
    },
  })),
};

export default function SchoolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolsLd) }}
      />

      <PageHero title="Three schools," accent="one spine.">
        <p>
          The institute grows in order, not all at once: Technology first,
          because it needs the least; Engineering second, because the
          workshop has to be real; Science third, because the laboratory
          cannot be faked. Running through all three, the same spine:
          applied problem-solving, named on every certificate. Dates are
          confirmed by the Principal&apos;s office at the point of
          application, never printed in advance.
        </p>
      </PageHero>

      {/* The room the institute will teach in, from the master set's
          architecture register. Image only. */}
      <section className="shell" data-reveal>
        <PhotoFigure
          src="/images/register/architecture/architecture_09.webp"
          alt="A classroom with wooden desks and shelving, from the master set"
          priority
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
      </section>

      {/* The three schools and the spine, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="The three schools and the spine">
          {schools.map((s, i) => (
            <article
              key={s.id}
              className={`hs-card hover-lift ${["tint-warm", "tint-sand", "tint-blush"][i]}`}
            >
              <p className="label-caps text-accent">{s.phase}</p>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{s.name}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{s.lead}</p>
              <p className="mt-auto pt-6 label-caps text-soft">{s.status}</p>
            </article>
          ))}
          <article className="hs-card bg-ink text-paper">
            <p className="label-caps opacity-70">The fourth discipline</p>
            <p className="mt-3 text-[1.1rem] font-semibold">{appliedSpine.name}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed opacity-80">{appliedSpine.line}</p>
          </article>
        </HorizontalScroll>
      </section>

      {schools.map((s) => (
        <section key={s.id} id={s.id} className="chapter shell">
          <div className="keyline max-w-3xl" data-reveal-group>
            <div className="flex flex-wrap items-center gap-4">
              <p className="label-caps text-accent">{s.phase}</p>
              <p className="label-caps rounded-full border border-rule px-3 py-1 text-soft">
                {s.status}
              </p>
            </div>
            <h2 className="display-section mt-4 max-w-xl text-ink">
              {s.name.replace("School of ", "")}
              {s.id === "technology" ? (
                <span className="em-serif text-accent"> first.</span>
              ) : null}
            </h2>
            <p className="measure mt-4 text-[1.05rem] italic leading-relaxed text-ink/80">
              {s.lead}
            </p>
            <p className="measure mt-5 text-[1.02rem] leading-[1.7] text-soft">
              {s.body}
            </p>
            <div className="mt-8">
              <Link href="/apply" className="pill-ghost">
                Enquire to the office
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* The spine: not a school. */}
      <section className="chapter shell">
        <div className="band-night rounded-[var(--r-card)] px-6 py-16 text-left sm:px-12 md:py-20">
          <div className="max-w-2xl">
            <p className="label-caps opacity-80">The fourth discipline</p>
            <h2 className="display-section mt-4 max-w-xl">
              {appliedSpine.name},{" "}
              <span className="em-serif text-rose">everywhere.</span>
            </h2>
            <p className="measure mt-5 max-w-xl text-[1.02rem] leading-relaxed opacity-90">
              {appliedSpine.line}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
