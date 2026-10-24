import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { SocialIcon } from "@/components/site/social-icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "One mailbox answers everything at Oryx Institute: info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office. Visits by appointment.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Oryx Institute",
    description:
      "One mailbox answers everything: info@oryxinstitute.org. The office reads every message, Windhoek, Namibia.",
    images: [
      {
        url: "/brand/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Contact the office of Oryx Institute",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact the Office",
  url: `${site.url}/contact`,
  isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website` },
  about: {
    "@type": "EducationalOrganization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    email: site.email,
    areaServed: site.areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "NA",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow="Contact" title="Contact the office.">
        <p>
          One mailbox answers everything: applications, partnerships, the
          press. It is read in the Principal&apos;s office, and every
          message gets a reply from a person, not a queue.
        </p>
      </PageHead>

      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">The address that works</p>
            <h2 className="h-section mt-5 max-w-[24ch]" data-reveal>
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              Say in your first message what the message is: an
              application, a business problem, a partnership, or a press
              question. The office replies personally, usually within the
              week, and the first reply names what the institute can and
              cannot do for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={`mailto:${site.email}`} className="btn">
                Write to the office
              </a>
              <Link href="/apply" className="btn--quiet">
                Apply instead <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-12">
              <p className="eyebrow eyebrow--ink">The channels</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-row-item inline-flex items-center gap-3 border border-rule px-4 py-3 text-[0.85rem] transition-colors hover:border-ink"
                    >
                      <SocialIcon name={s.label as "Instagram" | "Facebook" | "LinkedIn"} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel p-8 md:p-10" data-reveal>
            <p className="eyebrow eyebrow--ink">Stated as it is</p>
            <dl className="mt-6 grid gap-6 text-[0.95rem] leading-relaxed">
              <div>
                <dt className="font-[500]">Where the office is</dt>
                <dd className="mt-1 text-soft">
                  {site.city}, {site.country}. No public premises yet, so
                  no street address is printed.
                </dd>
              </div>
              <div>
                <dt className="font-[500]">Visits</dt>
                <dd className="mt-1 text-soft">
                  By appointment. Say in your first message that you would
                  like to meet, and the office confirms a time and place
                  in Windhoek that suits both sides.
                </dd>
              </div>
              <div>
                <dt className="font-[500]">Telephone</dt>
                <dd className="mt-1 text-soft">
                  None published. A dedicated business line lands before
                  launch, and it appears here and in the footer the day it
                  exists.
                </dd>
              </div>
              <div>
                <dt className="font-[500]">Social</dt>
                <dd className="mt-1 text-soft">
                  Instagram, Facebook and LinkedIn, linked as icons in the
                  footer and above. Nothing is embedded; the site runs no
                  third-party scripts.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
