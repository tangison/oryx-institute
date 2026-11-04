import type { Metadata } from "next";
import Link from "next/link";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * Corner Spa, the first venture, on its own page.
 *
 * The venture runs in collaboration with Mendozer: the spa's own
 * counter lives on their platform at spa.mendozer.com and is embedded
 * here, exactly as the collaboration states it — the spa's address on
 * this site, and Mendozer's counter serving it. The copy keeps the
 * ventures register: state what exists, date the opening in the
 * register the day it happens, and invent nothing before then.
 */

const SPA_COUNTER = "https://spa.mendozer.com";

const copy = {
  en: {
    meta: {
      title: "Corner Spa, with Mendozer",
      description:
        "Corner Spa, the first venture: wellness and service operations in Windhoek, run in collaboration with Mendozer. The spa's counter, spa.mendozer.com, is embedded on this page.",
      ogTitle: "Corner Spa | Oryx Institute",
      ogDescription:
        "Wellness and service operations in Windhoek, run with Mendozer. The spa's counter, spa.mendozer.com, embedded here.",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa, the first venture of Oryx Institute: wellness and service operations in Windhoek, run in collaboration with Mendozer at spa.mendozer.com.",
    },
    eyebrow: "Ventures · the first",
    partnerTag: "In collaboration with Mendozer",
    h1: "Corner Spa",
    lede: "The first venture: a small wellness and service operation for Windhoek, opened with a partner. Teach on the floor, serve real customers, and print the result.",
    withEyebrow: "With Mendozer",
    withLede: "A venture with a counter of its own.",
    withBody:
      "Corner Spa runs in collaboration with Mendozer, whose platform carries the spa's own counter at spa.mendozer.com. The counter is embedded on this page: it is the spa's address on this site, and Mendozer's platform is what serves it. When the counter goes live, bookings, times and the service menu read from it directly — nothing about the spa is retold here that the counter does not itself say.",
    counterEyebrow: "The counter",
    counterTitle: "The Corner Spa counter at spa.mendozer.com",
    counterNote:
      "The counter is served by Mendozer. If it has not loaded here, the spa's own address is",
    classroomEyebrow: "The classroom on the floor",
    classroomBody:
      "Every venture doubles as a teaching site. Corner Spa is where bookkeeping is practised on real invoices, where scheduling is practised on real appointments, and where a service standard is written, followed and audited — not recited. What a diploma claims, the venture shows.",
    statusEyebrow: "Status",
    statusLede:
      "Announced as a venture in collaboration with Mendozer. Premises, licensing and the service menu are being worked through in order.",
    statusBody:
      "The opening is dated in the register the day it happens — as a business, or not at all. Until then, this page and the counter are the spa's whole public surface.",
    readRegister: "Read the register",
    writeOffice: "Write to the office",
  },
  zh: {
    meta: {
      title: "Corner Spa，与 Mendozer 合作",
      description:
        "Corner Spa，学院的第一项实业：温得和克的康养与服务运营，与 Mendozer 合作经营。水疗的柜台 spa.mendozer.com 直接嵌在本页。",
      ogTitle: "Corner Spa | Oryx 理工学院",
      ogDescription:
        "温得和克的康养与服务运营，与 Mendozer 合作。水疗柜台 spa.mendozer.com，嵌于本页。",
      ldName: "Corner Spa",
      ldDescription:
        "Corner Spa，Oryx 理工学院的第一项实业：温得和克的康养与服务运营，与 Mendozer 合作，柜台设在 spa.mendozer.com。",
    },
    eyebrow: "实业 · 第一项",
    partnerTag: "与 Mendozer 合作",
    h1: "Corner Spa",
    lede: "第一项实业：为温得和克开的一间小康养与服务公司，与伙伴一起开业。在地板上教学，服务真实的顾客，把结果印出来。",
    withEyebrow: "与 Mendozer",
    withLede: "一间拥有自己柜台的实业。",
    withBody:
      "Corner Spa 与 Mendozer 合作经营，水疗自己的柜台设在对方的平台上：spa.mendozer.com。柜台直接嵌在本页——它是水疗在这个网站上的地址，服务它的是 Mendozer 的平台。柜台上线之后，预约、时间与服务单都从它那里读出；柜台没有说的，本页不替它说。",
    counterEyebrow: "柜台",
    counterTitle: "Corner Spa 柜台，设在 spa.mendozer.com",
    counterNote: "柜台由 Mendozer 提供服务。若它未在此加载，水疗自己的地址是",
    classroomEyebrow: "地板上的教室",
    classroomBody:
      "每一间实业同时是一处教学现场。在 Corner Spa，簿记在真实发票上练习，排程在真实预约上练习，服务标准是写下来、执行下去、再接受审校的——不是背出来的。文凭上声称的，实业把它摆出来。",
    statusEyebrow: "现状",
    statusLede: "已公布为与 Mendozer 合作开办的实业。场地、执照与服务单正在逐项推进。",
    statusBody: "开业之日，登记册记下日期——作为一门生意开业，否则不开。在那之前，本页与柜台就是水疗全部的公开门面。",
    readRegister: "读登记册",
    writeOffice: "给办公室写信",
    enLedger: {
      paras: [
        "Corner Spa, the first venture: a small wellness and service operation for Windhoek, opened with a partner. Teach on the floor, serve real customers, and print the result.",
        "Corner Spa runs in collaboration with Mendozer, whose platform carries the spa's own counter at spa.mendozer.com. The counter is embedded on this page: it is the spa's address on this site, and Mendozer's platform is what serves it. When the counter goes live, bookings, times and the service menu read from it directly — nothing about the spa is retold here that the counter does not itself say.",
        "Every venture doubles as a teaching site. Corner Spa is where bookkeeping is practised on real invoices, where scheduling is practised on real appointments, and where a service standard is written, followed and audited — not recited. What a diploma claims, the venture shows.",
        "Announced as a venture in collaboration with Mendozer. Premises, licensing and the service menu are being worked through in order. The opening is dated in the register the day it happens — as a business, or not at all.",
      ],
    },
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
    alternates: alternates(lang, "/corner-spa", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/corner-spa`,
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
  const zh = lang === "zh";
  const t = copy[lang];
  const A = (path: string) => (zh ? `/zh${path}` : path);

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

      {/* The hero: the venture's own sand, type only — the treatment
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

      {/* The counter itself: Mendozer's platform, framed. A visible
          note beneath carries the spa's own address for any visitor
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

      {/* The classroom: what the venture teaches, condensed from the
          ventures page. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14" data-sc-reveal>
            <p className="eyebrow eyebrow--ink">{t.classroomEyebrow}</p>
            <p className="measure mt-6 text-soft" data-sc-in>
              {t.classroomBody}
            </p>
          </div>
        </div>
      </section>

      {/* Status and the two doors out: the register, and the office. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 md:grid-cols-2">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.statusEyebrow}</p>
            <p className="lede measure mt-6">{t.statusLede}</p>
            <p className="measure mt-6 text-soft">{t.statusBody}</p>
            <div className="mt-8">
              <Link href={A("/register")} className="btn--quiet">
                {t.readRegister} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="hair-t pt-14" data-sc-in>
            <h2 className="h-section max-w-[20ch]">
              {zh ? "想先知道开业的那一天？" : "Waiting for the opening date?"}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={A("/contact")} className="btn">
                {t.writeOffice}
              </Link>
              <Link href={A("/ventures")} className="btn--quiet">
                {zh ? "回到实业" : "Back to ventures"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Chinese page. */}
      {zh && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">英文原文 · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {copy.zh.enLedger.paras.map((p, i) => (
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
