import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { appliedSpine, schools } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Schools",
  description:
    "Three schools, one spine: Technology first, then Engineering, then Science, with applied problem-solving running through all of them. Open for enquiry.",
  alternates: { canonical: "/schools" },
  openGraph: {
    title: "The Schools | Oryx Institute",
    description:
      "Three schools, one spine: Technology, Engineering, Science. Open for enquiry, honest about timing.",
    images: [
      {
        url: "/brand/og/schools.png",
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

      <PageHead title="Three schools, one spine.">
        <p>
          The institute grows in order, not all at once: Technology first,
          because it needs the least; Engineering second, because the
          workshop has to be real; Science third, because the laboratory
          cannot be faked. Running through all three, the same spine:
          applied problem-solving, named on every certificate. Dates are
          confirmed by the Principal&apos;s office at the point of
          application, never printed in advance.
        </p>
      </PageHead>

      {/* The place the schools will teach in — held still, no text.
          Above the fold here, so it loads eagerly. */}
      <div className="divider" aria-hidden="true">
        <Image
          src="/images/kinfolk/k07-windhoek.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* The three schools, status set in type weight, not pills */}
      {schools.map((s) => (
        <section key={s.id} id={s.id} className="section">
          <div className="shell">
            <div className="hair-t pt-14" data-reveal>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                <p className="eyebrow">{s.phase}</p>
                <p className="lede text-soft">{s.status}</p>
              </div>
              <h2 className="h-section mt-5 max-w-[20ch]">
                {s.name.replace("School of ", "")}
                {s.id === "technology" ? " first." : "."}
              </h2>
              <p className="lede measure mt-6">{s.lead}</p>
              <p className="measure mt-6 text-soft">{s.body}</p>
              <div className="mt-9">
                <Link href="/apply" className="btn--quiet">
                  Enquire to the office{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* The spine: not a school */}
      <section className="cta-band section-lg on-ink">
        <div className="shell">
          <p className="eyebrow eyebrow--ivory">The fourth discipline</p>
          <h2 className="h-section mt-5 max-w-[22ch]" data-reveal>
            {appliedSpine.name}, everywhere.
          </h2>
          <p className="measure mt-6 text-ivory-80" data-reveal>
            {appliedSpine.line}
          </p>
        </div>
      </section>
    </>
  );
}
