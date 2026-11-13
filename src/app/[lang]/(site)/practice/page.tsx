import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { offers, site } from "@/lib/site";
import { offersAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The practice, on its own page. The hands-peak belongs to the
 * homepage now (Image Bible v6), so this page opens on cream: the
 * proposition in type, and the working hands arrive as the mid-detail
 * reveal beside the working-kit note; the wrench carries the close;
 * the safety officer course runs as the fourth hairline row, tagged
 * NEW with its marker; and the page states its NTA standing exactly
 * as the content corrections demand.
 */
const copy = {
  en: {
    meta: {
      title: "The Practice: Work That Holds",
      description:
        "The practice at Oryx Institute: Owner's Desk counselling, market R&D, Rapid Response Training, and safety officer training for Namibian sites, from Windhoek.",
      ogTitle: "Practice | Oryx Institute",
      ogDescription:
        "Owner's Desk counselling, market R&D, Rapid Response Training, and safety officer training, delivered to standard.",
    },
    heroLine: "Work that holds.",
    heroSub: "Measured and finished to standard. Every tool named, not magic.",
    runsTitle: "What the practice runs.",
    safetyName: "Safety Officer Training",
    safetyLine:
      "One, five, and ten days of occupational safety training for Namibian sites, taught by a registered safety professional and examined on paper and on site.",
    safetyCta: "See the Safety Officer Training curriculum",
    safetyTag: "New",
    holdsTitle: "The outcome is written down.",
    holdsBody: [
      "Every engagement ends the same way: on paper. Counselling sessions close with what was decided and what happens next, written down. Research engagements close with findings, options and the decision they support, gathered on Namibian ground with sources named. Training engagements close with a programme structured around the need that asked for it, delivered by the industry expert the need calls for.",
      "Nothing here promises a credential; the promise is the work itself. Fees are confirmed by the Principal's office at the point of enquiry, and the first reply names what the institute can and cannot do for you.",
    ],
    kitEyebrow: "The working kit",
    kitBody:
      "The practice runs on named, ordinary tools: a metre rule, a bench, the office stack published in the open, and notebooks kept in the institute's own hand. Nothing in the room is decorative; if a thing cannot be named, it is not used. Courses list their tools before enrolment, out loud, never by\u00A0implication.",
    standsEyebrow: "Where the practice stands",
    standsBody:
      "The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
    apprenticeship:
      "The apprenticeship bench is not open yet. What is not ready, says so.",
    enquire: "Enquire about courses and the Practice",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
  },
  af: {
    meta: {
      title: "The Practice: Work That Holds",
      description:
        "The practice at Oryx Institute: Owner's Desk counselling, market R&D, Rapid Response Training, and safety officer training for Namibian sites, from Windhoek.",
      ogTitle: "Practice | Oryx Institute",
      ogDescription:
        "Owner's Desk counselling, market R&D, Rapid Response Training, and safety officer training, delivered to standard.",
    },
    heroLine: "Work that holds.",
    heroSub: "Measured and finished to standard. Every tool named, not magic.",
    runsTitle: "What the practice runs.",
    safetyName: "Safety Officer Training",
    safetyLine:
      "One, five, and ten days of occupational safety training for Namibian sites, taught by a registered safety professional and examined on paper and on site.",
    safetyCta: "See the Safety Officer Training curriculum",
    safetyTag: "New",
    holdsTitle: "The outcome is written down.",
    holdsBody: [
      "Every engagement ends the same way: on paper. Counselling sessions close with what was decided and what happens next, written down. Research engagements close with findings, options and the decision they support, gathered on Namibian ground with sources named. Training engagements close with a programme structured around the need that asked for it, delivered by the industry expert the need calls for.",
      "Nothing here promises a credential; the promise is the work itself. Fees are confirmed by the Principal's office at the point of enquiry, and the first reply names what the institute can and cannot do for you.",
    ],
    kitEyebrow: "The working kit",
    kitBody:
      "The practice runs on named, ordinary tools: a metre rule, a bench, the office stack published in the open, and notebooks kept in the institute's own hand. Nothing in the room is decorative; if a thing cannot be named, it is not used. Courses list their tools before enrolment, out loud, never by\u00A0implication.",
    standsEyebrow: "Where the practice stands",
    standsBody:
      "The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
    apprenticeship:
      "The apprenticeship bench is not open yet. What is not ready, says so.",
    enquire: "Enquire about courses and the Practice",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
    enLedger: { paras: [] as string[] },
  },
} as const;

/** The three practice-facing offers, by id. */
const PRACTICE_IDS = ["owners-desk", "market-rd", "rapid-response"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/practice", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/practice`,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const all = af ? offersAf : offers;
  const rows = PRACTICE_IDS.map((id) => all.find((o) => o.id === id)!);
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/practice")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The head, on cream: the proposition in type. The hands-peak
          plate is the homepage's peak now, so this page opens the
          way it works: plainly. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <h1 className="h-display max-w-[14ch]">{t.heroLine}</h1>
          <p className="lede measure mt-6 text-soft">{t.heroSub}</p>
        </div>
      </section>

      {/* The practice offers: hairline rows, no images, and the new
          fourth row: safety officer training, tagged NEW with its
          marker, linking to the course landing. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <div className="offers mt-14" data-sc-in data-sc-stagger="80">
            {rows.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="offer-line">
                    {o.line}{" "}
                    <Link href={A(o.cta.href)} className="offer-cta">
                      {o.cta.label}{" "}
                      <span className="arr" aria-hidden="true">→</span>
                    </Link>
                  </p>
                  <p className="mt-4 max-w-[56ch] text-soft">{o.body}</p>
                </div>
                <p className="offer-tag">{o.tag}</p>
              </div>
            ))}
            <div className="offer" id="safety-officer-training">
              <div className="offer-main">
                <h3 className="offer-name">{t.safetyName}</h3>
                <p className="offer-line">
                  {t.safetyLine}{" "}
                  <Link
                    href={A("/practice/safety-officer-course")}
                    className="offer-cta"
                  >
                    {t.safetyCta}{" "}
                    <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
              <p className="offer-tag offer-tag--new">
                <span className="new-marker" aria-hidden="true" />
                {t.safetyTag}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The working kit, beside the working hands: the mid-detail
          plate, unmasking from its left edge. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16 lg:gap-24">
          <figure
            className="plate-fig md:order-2"
            data-sc-reveal
          >
            <Image
              src="/images/kinfolk/people/31-hands-working.jpg"
              alt={
                af ? "A pair of hands working a hand tool in hard daylight, mid-task" : "A pair of hands working a hand tool in hard daylight, mid-task"
              }
              width={1122}
              height={1402}
              sizes="(min-width: 768px) 20rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div className="md:order-1" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.kitEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.kitBody}</p>
          </div>
        </div>
      </section>

      {/* What the practice holds. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[20ch]">{t.holdsTitle}</h2>
          {t.holdsBody.map((p, i) => (
            <p key={i} className="measure mt-6 text-soft">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* The close: the wrench plate, full measure, drifting at its
          own rate. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/kinfolk/inner/23-practice-wrench.jpg"
              alt={
                af ? "A clean single-end wrench, centred on cream paper" : "A clean single-end wrench, centred on cream paper"
              }
              width={1402}
              height={1122}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* Where the practice stands: the NTA sentence, exact. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <div className="panel p-8 md:p-10">
            <p className="eyebrow eyebrow--ink">{t.standsEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.standsBody}</p>
          </div>
        </div>
      </section>

      {/* The apprenticeship bench, stated as not ready. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <p className="lede measure">{t.apprenticeship}</p>
        </div>
      </section>

      {/* The close: one door, the intake. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <div className="flex flex-wrap items-center gap-5">
            <Link href={A("/apply")} className="btn">
              {t.enquire}
            </Link>
            <a href={`mailto:${site.email}`} className="btn--quiet">
              {t.writeOffice} <span className="arr" aria-hidden="true">→</span>
            </a>
            <Link href={A("/faq")} className="btn--quiet">
              {t.readFaq} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Afrikaans page. */}
      {false && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">Engelse oorspronklike · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {copy.af.enLedger.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
