import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ventures, site, schemaIds } from "@/lib/site";
import { venturesAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Small Companies, Real Customers",
      description:
        "Small operating companies Oryx Institute opens to test sectors. Corner Spa, wellness and service operations, is the first.",
      ogTitle: "Ventures | Oryx Institute",
      ogDescription:
        "Small operating companies the institute opens to test sectors. Corner Spa is the first.",
      ldName: "Ventures",
      ldDescription:
        "The ventures at Oryx Institute: small operating companies opened to test sectors, starting with Corner Spa.",
    },
    howEyebrow: "How ventures work",
    lessonEyebrow: "The classroom on the floor",
    lessonBody:
      "Every venture doubles as a teaching site. Corner Spa is where bookkeeping is practised on real invoices, where scheduling is practised on real appointments, and where a service standard is written, followed and audited, not recited. Students rotate through the floor the way apprentices always have: they do the work under supervision, they write down what they did, and they hand the notes on. What a diploma claims, the venture shows.",
    exitLede:
      "A venture cannot be faked. It is judged by the two things that cannot lie: whether it works, and whether anyone pays for it.",
    exitBody:
      "Every course the institute teaches ends in something that works and something that sells. Ventures are how the institute holds itself to that rule: small companies, run to standard, their openings dated in the public register.",
    nextEyebrow: "Next",
    readRegister: "Read the register",
    briefUs: "Brief the Market R&D desk",
    followSpa: "Explore Corner Spa",
    venturePage: "The venture page",
    futureNote:
      "More labs are opened as sectors warrant them. What is not ready, says so.",
  },
  af: {
    meta: {
      title: "Small Companies, Real Customers",
      description:
        "Small operating companies Oryx Institute opens to test sectors. Corner Spa, wellness and service operations, is the first.",
      ogTitle: "Ventures | Oryx Institute",
      ogDescription:
        "Small operating companies the institute opens to test sectors. Corner Spa is the first.",
      ldName: "Ventures",
      ldDescription:
        "The ventures at Oryx Institute: small operating companies opened to test sectors, starting with Corner Spa.",
    },
    howEyebrow: "How ventures work",
    lessonEyebrow: "The classroom on the floor",
    lessonBody:
      "Every venture doubles as a teaching site. Corner Spa is where bookkeeping is practised on real invoices, where scheduling is practised on real appointments, and where a service standard is written, followed and audited, not recited. Students rotate through the floor the way apprentices always have: they do the work under supervision, they write down what they did, and they hand the notes on. What a diploma claims, the venture shows.",
    exitLede:
      "A venture cannot be faked. It is judged by the two things that cannot lie: whether it works, and whether anyone pays for it.",
    exitBody:
      "Every course the institute teaches ends in something that works and something that sells. Ventures are how the institute holds itself to that rule: small companies, run to standard, their openings dated in the public register.",
    nextEyebrow: "Next",
    readRegister: "Read the register",
    briefUs: "Brief the Market R&D desk",
    followSpa: "Explore Corner Spa",
    venturePage: "The venture page",
    futureNote:
      "More labs are opened as sectors warrant them. What is not ready, says so.",
    enLedger: { paras: [] as string[] },
  },
} as const;

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
    alternates: alternates(lang, "/ventures", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/ventures`,
      images: [
        {
          url: "/brand/og/ventures.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function VenturesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const v = af ? venturesAf : ventures;
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/ventures")}`,
    description: t.meta.ldDescription,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero, a reverse-zigzag under scrub: the proposition on the
          left, the spa's own treatment scene drifting at its own rate
          on the right. (The spa dish stays on the homepage; this is
          the corner-spa towel: a real treatment scene, not an
          object.) */}
      <section className="section" data-sc-act="scrub">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-16 lg:gap-24">
          <div data-sc-in>
            <h1 className="h-display max-w-[16ch]">{v.lead}</h1>
            <p className="measure mt-6 text-soft">{v.body}</p>
          </div>
          <figure className="plate-fig" data-sc-parallax="0.15">
            <Image
              src="/images/kinfolk/texture/36-corner-spa-towel.jpg"
              alt="A terracotta tile with folded linen and a sprig of herbs, a corner-spa treatment scene"
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 26rem, 88vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* How ventures work, wiped in from the left. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.howEyebrow}</p>
            <div data-sc-reveal>
              <p className="lede measure mt-6">{t.exitLede}</p>
            </div>
            <p className="measure mt-6 text-soft" data-sc-in>
              {t.exitBody}
            </p>
          </div>
          <div className="hair-t mt-12 pt-12">
            <p className="eyebrow eyebrow--ink">{t.lessonEyebrow}</p>
            <p className="measure mt-6 text-soft" data-sc-in>
              {t.lessonBody}
            </p>
          </div>
        </div>
      </section>

      {/* The peak: Corner Spa, named on its own sand ground: the
          venture's own palette, type and colour only, the treatment
          scene already seen above. Pinned for two viewports. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div
            className="absolute inset-0 grid place-items-center p-8 md:p-16"
            style={{ background: "var(--sand)" }}
            data-sc-scale
          >
            <div className="peak-scrim" data-sc-scrim>
              <p className="offer-tag">{v.cornerSpa.status}</p>
              <h2 className="h-section mt-3">{v.cornerSpa.name}</h2>
              <p className="peak-line">{v.cornerSpa.line}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The full story of the first venture, on cream. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <p className="measure text-soft">{v.cornerSpa.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href={A("/corner-spa")} className="btn--quiet">
              {t.followSpa} <span className="arr" aria-hidden="true">→</span>
            </Link>
            {/* Contextual link to the venture's own page, so the detail
                route is never an orphan: the spa's counter, the classroom
                rows and the register row live there. */}
            <Link href={A("/ventures/corner-spa")} className="link-type">
              {t.venturePage} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* A dust trail leaves the scrim: ventures starting, motion
          leaving. Silent, full-bleed, no text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.7">
          <Image
            src="/images/kinfolk/texture/33-dust-trail.jpg"
            alt=""
            width={1402}
            height={1122}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* What comes next: silent, small. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 md:grid-cols-2">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.nextEyebrow}</p>
            <p className="lede measure mt-5">{v.futureLine}</p>
            <p className="measure mt-6 text-soft">{t.futureNote}</p>
            <div className="mt-8">
              <Link href={A("/register")} className="btn--quiet">
                {t.readRegister} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* The dust-trail divider above carries the breath before
              the close. */}
          <div className="hair-t pt-14" data-sc-in>
            <h2 className="h-section max-w-[20ch]">
              {af ? "A sector you think Oryx should test?" : "A sector you think Oryx should test?"}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={A("/apply/market-rd")} className="btn">
                {t.briefUs}
              </Link>
              <a href={`mailto:${site.email}`} className="btn--quiet">
                {af ? "Write to the office" : "Write to the office"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
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
