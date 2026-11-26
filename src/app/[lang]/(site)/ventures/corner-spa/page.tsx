import type { Metadata } from "next";
import Link from "next/link";
import { CornerSpaInlineFrame } from "@/components/site/corner-spa-embed";
import { RouteArrowIcon } from "@/components/site/glyphs";
import { site, schemaIds } from "@/lib/site";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
      title: "Corner Spa Venture in Windhoek",
      description:
        "Discover Corner Spa, Oryx Institute’s first operating venture with Mendozer Investments in Windhoek. Find the spa’s official booking and service details.",
      ogTitle: "Corner Spa in Windhoek",
      ogDescription:
        "Corner Spa is Oryx’s first operating venture with Mendozer Investments in Windhoek. Booking stays on the spa’s own site.",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa is Oryx Institute's first operating venture, run with Mendozer Investments in Windhoek.",
    },
    eyebrow: "Ventures · operating",
    partnerTag: "Operating with Mendozer",
    h1: "Corner Spa",
    lede: "Oryx's first operating venture, run with Mendozer Investments in Windhoek.",
    withEyebrow: "With Mendozer",
    withLede: "An operating venture with its own counter.",
    withBody:
      "Corner Spa is Oryx's first operating venture, run with Mendozer Investments. Mendozer's platform serves the spa's own website at spa.mendozer.com. That counter is embedded below, and it also opens full screen at oryxinstitute.org/corner-spa. Booking and service details stay on the spa's own site.",
    shapeEyebrow: "The operating collaboration",
    rows: [
      {
        term: "The counter",
        body: "Mendozer's platform serves the storefront, and this page embeds it. The spa address remains available below the frame if it cannot load.",
      },
      {
        term: "The working setting",
        body: "Corner Spa is an operating setting for practical business and service work. The spa's own customer-facing booking and service details remain on its own site.",
      },
      {
        term: "The public record",
        body: "Corner Spa is operating. Oryx does not publish an opening date or public street address for the spa.",
      },
    ],
    counterEyebrow: "The counter",
    counterTitle: "The Corner Spa counter at spa.mendozer.com",
    counterNote:
      "The counter is served by Mendozer. If it has not loaded here, the spa's own address is",
    statusEyebrow: "Status",
    liveNote: "The spa\u2019s own site, spa.mendozer.com, carries the menu and the prices; bookings run on WhatsApp. The full note with the price list is on the blog.",
    statusLede:
      "Corner Spa is Oryx's first operating venture, run with Mendozer Investments. It is an operating setting for practical business and service work.",
    statusBody:
      "Booking and service details stay on the spa's own site. Oryx does not publish a public street address or an opening date for the spa.",
    readRegister: "Read the register",
    writeOffice: "Write to the office",
  },
  af: {
    meta: {
      title: "Corner Spa-onderneming in Windhoek",
      description:
        "Corner Spa is ’n Oryx-onderneming saam met Mendozer Investments in Windhoek. Besprekings en diensbesonderhede bly op die spa se eie webwerf.",
      ogTitle: "Corner Spa in Windhoek",
      ogDescription:
        "Corner Spa is Oryx se eerste bedrywige onderneming saam met Mendozer Investments in Windhoek. Besprekings bly op die spa se eie webwerf.",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa is Oryx Instituut se eerste bedrywige onderneming, saam met Mendozer Investments in Windhoek bedryf.",
    },
    eyebrow: "Ondernemings · in bedryf",
    partnerTag: "In bedryf saam met Mendozer",
    h1: "Corner Spa",
    lede: "Oryx se eerste bedrywige onderneming, saam met Mendozer Investments in Windhoek bedryf.",
    withEyebrow: "Saam met Mendozer",
    withLede: "’n Bedrywige onderneming met sy eie toonbank.",
    withBody:
      "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Mendozer se platform bedien die spa se eie webwerf by spa.mendozer.com. Daardie toonbank is hieronder ingebed en maak ook volskerm by oryxinstitute.org/corner-spa oop. Besprekings- en diensbesonderhede bly op die spa se eie webwerf.",
    shapeEyebrow: "Die bedrywige samewerking",
    rows: [
      {
        term: "Die toonbank",
        body: "Mendozer se platform bedien die winkelvenster en hierdie blad bed dit in. Die spa-adres bly onder die raam beskikbaar as dit nie kan laai nie.",
      },
      {
        term: "Die bedrywige omgewing",
        body: "Corner Spa is ’n bedrywige omgewing vir praktiese besigheids- en dienswerk. Die spa se eie kliëntgerigte besprekings- en diensbesonderhede bly op sy eie webwerf.",
      },
      {
        term: "Die openbare rekord",
        body: "Corner Spa is in bedryf. Oryx publiseer nie ’n openingsdatum of openbare straatadres vir die spa nie.",
      },
    ],
    counterEyebrow: "Die toonbank",
    counterTitle: "Die Corner Spa-toonbank by spa.mendozer.com",
    counterNote:
      "Die toonbank word deur Mendozer bedien. Indien dit nie hier gelaai het nie, is die spa se eie adres",
    statusEyebrow: "Status",
    liveNote: "Die spa se eie webwerf, spa.mendozer.com, bevat die spyskaart en pryse; besprekings loop op WhatsApp. Die volledige nota met die pryslys is op die blog.",
    statusLede:
      "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Dit is ’n bedrywige omgewing vir praktiese besigheids- en dienswerk.",
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
  return pageMetadata({
    lang,
    path: "/ventures/corner-spa",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/corner-spa.png", width: 1200, height: 630, alt: m.ogTitle },
  });
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
    url: `${site.url}${A("/ventures/corner-spa")}`,
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
      <section className="section screen-intro" data-sc-act="scrub">
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
          <div className="mt-10" data-sc-in>
            <CornerSpaInlineFrame lang={lang} title={t.counterTitle} />
          </div>
          <p className="measure mt-5 text-sm text-soft">
            {t.counterNote}{" "}
            <a
              href={SPA_COUNTER}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-1 underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              spa.mendozer.com
              <RouteArrowIcon className="h-3.5 w-3.5 shrink-0" />
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
                {af ? "Maak Corner Spa volskerm oop" : "Open Corner Spa full screen"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link href={A("/blog/corner-spa")} className="btn--quiet">
                {af ? "Lees die blognota" : "Read the blog note"}{" "}
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
                {af ? "Terug na ondernemings" : "Back to ventures"}{" "}
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
