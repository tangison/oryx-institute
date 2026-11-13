import type { Metadata } from "next";
import Link from "next/link";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * Corner Spa, the first venture, on its own page.
 *
 * The venture runs in collaboration with Mendozer: the spa's own
 * counter lives on their platform at spa.mendozer.com and is embedded
 * here, exactly as the collaboration states it: the spa's address on
 * this site, and Mendozer's counter serving it. The copy keeps the
 * ventures register: state what is operating, preserve the spa's own
 * booking boundary, and invent nothing beyond the approved facts.
 */

const SPA_COUNTER = "https://spa.mendozer.com";

const copy = {
  en: {
    meta: {
      title: "Corner Spa, the venture",
      description:
        "Corner Spa, Oryx's first operating venture, run with Mendozer Investments: a live setting for practical business and service work in Windhoek. The spa's counter at spa.mendozer.com is embedded on this page.",
      ogTitle: "Corner Spa | Oryx Institute",
      ogDescription:
        "Oryx's first operating venture, run with Mendozer Investments: practical business and service work in Windhoek. The spa's counter, spa.mendozer.com, is embedded here.",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa, Oryx Institute's first operating venture, run with Mendozer Investments: a live setting for practical business and service work in Windhoek.",
    },
    eyebrow: "Ventures · operating",
    partnerTag: "Operating with Mendozer",
    h1: "Corner Spa",
    lede: "Oryx's first operating venture, run with Mendozer Investments. A live setting for practical business and service work in Windhoek.",
    withEyebrow: "With Mendozer",
    withLede: "An operating venture with a counter of its own.",
    withBody:
      "Corner Spa is Oryx's first operating venture, run with Mendozer Investments. Mendozer's platform serves the spa's own website at spa.mendozer.com. That counter is embedded below, and it also opens full screen at oryxinstitute.org/corner-spa. Booking and service details stay on the spa's own site.",
    shapeEyebrow: "The operating collaboration",
    rows: [
      {
        term: "The counter",
        body: "Mendozer's platform serves the storefront; this page embeds it, and the line beneath the frame always carries the address, so the door is never lost to a blocked frame or a slow connection.",
      },
      {
        term: "The classroom",
        body: "Corner Spa is a live setting for practical business and service work. The spa's own customer-facing booking and service details remain on its own site.",
      },
      {
        term: "The public record",
        body: "Oryx states its ventures plainly as they are. Corner Spa is operating; no opening date or public street address is claimed here.",
      },
    ],
    counterEyebrow: "The counter",
    counterTitle: "The Corner Spa counter at spa.mendozer.com",
    counterNote:
      "The counter is served by Mendozer. If it has not loaded here, the spa's own address is",
    statusEyebrow: "Status",
    liveNote: "The spa\u2019s own site, spa.mendozer.com, carries the menu and the prices; bookings run on WhatsApp. The full note with the price list is on the blog.",
    statusLede:
      "Corner Spa is Oryx's first operating venture, run with Mendozer Investments. It is a live setting for practical business and service work.",
    statusBody:
      "Booking and service details stay on the spa's own site. Oryx does not publish a public street address or an opening date for the spa.",
    readRegister: "Read the register",
    writeOffice: "Write to the office",
  },
  af: {
    meta: {
      title: "Corner Spa, die onderneming",
      description:
        "Corner Spa, Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf: 'n lewende omgewing vir praktiese besigheids- en dienswerk in Windhoek. Die spa se toonbank by spa.mendozer.com is op hierdie blad ingebed.",
      ogTitle: "Corner Spa | Oryx Instituut",
      ogDescription:
        "Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf: praktiese besigheids- en dienswerk in Windhoek. Die spa se toonbank, spa.mendozer.com, is hier ingebed.",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa, Oryx Instituut se eerste bedrywige onderneming, saam met Mendozer Investments bedryf: 'n lewende omgewing vir praktiese besigheids- en dienswerk in Windhoek.",
    },
    eyebrow: "Ondernemings · in bedryf",
    partnerTag: "In bedryf saam met Mendozer",
    h1: "Corner Spa",
    lede: "Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. 'n Lewende omgewing vir praktiese besigheids- en dienswerk in Windhoek.",
    withEyebrow: "Saam met Mendozer",
    withLede: "'n Bedrywige onderneming met sy eie toonbank.",
    withBody:
      "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Mendozer se platform bedien die spa se eie webwerf by spa.mendozer.com. Daardie toonbank is hieronder ingebed en maak ook volskerm by oryxinstitute.org/corner-spa oop. Besprekings- en diensbesonderhede bly op die spa se eie webwerf.",
    shapeEyebrow: "Die bedrywige samewerking",
    rows: [
      {
        term: "Die toonbank",
        body: "Mendozer se platform bedien die winkelvenster; hierdie blad bed dit in, en die lyn onder die raam dra altyd die adres sodat die toegang nie by 'n geblokkeerde raam of stadige verbinding verlore gaan nie.",
      },
      {
        term: "Die klaskamer",
        body: "Corner Spa is 'n lewende omgewing vir praktiese besigheids- en dienswerk. Die spa se eie kliëntgerigte besprekings- en diensbesonderhede bly op sy eie webwerf.",
      },
      {
        term: "Die openbare rekord",
        body: "Oryx stel sy ondernemings eerlik soos dit is. Corner Spa is in bedryf; geen openingsdatum of openbare straatadres word hier beweer nie.",
      },
    ],
    counterEyebrow: "Die toonbank",
    counterTitle: "Die Corner Spa-toonbank by spa.mendozer.com",
    counterNote:
      "Die toonbank word deur Mendozer bedien. Indien dit nie hier gelaai het nie, is die spa se eie adres",
    statusEyebrow: "Status",
    liveNote: "Die spa se eie webwerf, spa.mendozer.com, bevat die spyskaart en pryse; besprekings loop op WhatsApp. Die volledige nota met die pryslys is op die blog.",
    statusLede:
      "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Dit is 'n lewende omgewing vir praktiese besigheids- en dienswerk.",
    statusBody:
      "Besprekings- en diensbesonderhede bly op die spa se eie webwerf. Oryx publiseer nie 'n openbare straatadres of 'n openingsdatum vir die spa nie.",
    readRegister: "Lees die register",
    writeOffice: "Skryf aan die kantoor",
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
    alternates: alternates(lang, "/ventures/corner-spa", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/ventures/corner-spa`,
      images: [
        {
          url: "/brand/og/corner-spa.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function CornerSpaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/corner-spa")}`,
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

      {/* The hero: the venture's own sand, type only: the treatment
          photographs stay on /ventures, and the counter below is this
          page's image. */}
      <section className="section" data-sc-act="scrub">
        <div className="shell">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.eyebrow}</p>
            <h1 className="h-display mt-6 max-w-[14ch]">{t.h1}</h1>
            <p className="offer-tag mt-5">{t.partnerTag}</p>
            <p className="lede measure mt-6">{t.lede}</p>
          </div>
        </div>
      </section>

      {/* The collaboration, on the venture's sand ground: named
          partner, named counter, nothing embellished. */}
      <section className="section relative" data-sc-act="flow">
        <div
          className="absolute inset-0"
          style={{ background: "var(--sand)" }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <div className="hair-t pt-14" data-sc-reveal>
            <p className="eyebrow eyebrow--ink">{t.withEyebrow}</p>
            <p className="lede measure mt-6">{t.withLede}</p>
          </div>
          <p className="measure mt-6 text-soft" data-sc-in>
            {t.withBody}
          </p>
        </div>
      </section>

      {/* The shape of the collaboration: three ledger rows on cream,
          the counter, the classroom, the register row. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14" data-sc-reveal>
            <p className="eyebrow eyebrow--ink">{t.shapeEyebrow}</p>
          </div>
          <div className="mt-4" data-sc-in>
            {t.rows.map((r) => (
              <div className="ledger-row--flat hair-t" key={r.term}>
                <h2 className="h-sub mt-8">{r.term}</h2>
                <p className="measure mt-4 text-soft">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The counter itself: Mendozer's platform, framed. A visible
          note beneath carries the venture's own address for any visitor
          whose browser or the partner's headers refuse the frame. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.counterEyebrow}</p>
            <p className="lede measure mt-6" data-sc-reveal>
              {t.counterTitle}
            </p>
          </div>
          <div className="spa-frame mt-10" data-sc-in>
            <iframe
              src={SPA_COUNTER}
              title={t.counterTitle}
              width={1200}
              height={800}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="measure mt-5 text-sm text-soft">
            {t.counterNote}{" "}
            <a
              href={SPA_COUNTER}
              rel="noopener noreferrer"
              target="_blank"
              className="underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              spa.mendozer.com
              <span className="arr ml-1" aria-hidden="true">
                ↗
              </span>
            </a>
          </p>
        </div>
      </section>

      {/* Status and the two doors out: the register, and the office. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 md:grid-cols-2">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.statusEyebrow}</p>
            <p className="lede measure mt-6">{t.statusLede}</p>
            <p className="measure mt-6 text-soft">{t.statusBody}</p>
            <p className="measure mt-4 text-soft">{t.liveNote}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={A("/corner-spa")} className="btn">
                {af ? "Open Corner Spa full screen" : "Open Corner Spa full screen"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link href={A("/blog/corner-spa")} className="btn--quiet">
                {af ? "Read the blog note" : "Read the blog note"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="hair-t pt-14" data-sc-in>
            <h2 className="h-section max-w-[20ch]">
              {af ? "Benodig jy Corner Spa se besprekingsbesonderhede?" : "Need Corner Spa's booking details?"}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={A("/contact")} className="btn">
                {t.writeOffice}
              </Link>
              <Link href={A("/ventures")} className="btn--quiet">
                {af ? "Back to ventures" : "Back to ventures"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
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
