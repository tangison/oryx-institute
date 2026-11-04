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
        "Corner Spa, the first venture: wellness and service operations in Windhoek, run with Mendozer. The spa's counter at spa.mendozer.com, embedded on this page.",
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
      "Corner Spa runs in collaboration with Mendozer, whose platform carries the venture's storefront at spa.mendozer.com. That counter is embedded below: the venture's own address on this site, served by their platform. When it goes live, bookings, times and the service menu read from it directly; nothing here retells what the counter itself says.",
    shapeEyebrow: "The shape of the collaboration",
    rows: [
      {
        term: "The counter",
        body: "Mendozer's platform serves the storefront at spa.mendozer.com; this page embeds it, and the line beneath the frame always carries the address, so the door is never lost to a blocked frame or a slow connection.",
      },
      {
        term: "The classroom",
        body: "The venture doubles as the teaching site. Bookkeeping is practised on real invoices, scheduling on real appointments, and a service standard is written, followed and audited — not recited. Students rotate through the floor the way apprentices always have: they do the work under supervision, they write down what they did, and they hand the notes on.",
      },
      {
        term: "The register row",
        body: "The opening is dated in the register the day it happens, and the result prints either way — as a business, or as a lesson the institute paid for once, on the record, so nobody pays for it twice.",
      },
    ],
    counterEyebrow: "The counter",
    counterTitle: "The Corner Spa counter at spa.mendozer.com",
    counterNote:
      "The counter is served by Mendozer. If it has not loaded here, the venture's own address is",
    statusEyebrow: "Status",
    statusLede:
      "Announced as a venture in collaboration with Mendozer. Premises, licensing and the service menu are being worked through in order.",
    statusBody:
      "The opening is dated in the register the day it happens — as a business, or not at all. Until then, this page is the venture's whole public surface.",
    readRegister: "Read the register",
    writeOffice: "Write to the office",
  },
  zh: {
    meta: {
      title: "Corner Spa，与 Mendozer 合作",
      description:
        "Corner Spa，学院的第一项实业：温得和克的康养与服务运营，与 Mendozer 合作经营。水疗的柜台设在 Mendozer 平台 spa.mendozer.com，直接嵌于本页：预约、时间与服务单都从柜台读出，柜台没有说的，本页不替它说；开业之日，登记册记下日期。",
      ogTitle: "Corner Spa | Oryx 理工学院",
      ogDescription:
        "温得和克的康养与服务运营，与 Mendozer 合作。水疗柜台 spa.mendozer.com，嵌于本页。",
      ldName: "Corner Spa · Oryx 理工学院",
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
      "Corner Spa 与 Mendozer 合作经营，水疗的店面设在对方的平台上：spa.mendozer.com。柜台直接嵌在本页——它是这项实业在本站的地址，由对方的平台承载服务。柜台上线之后，预约、时间与服务单都从它那里读出；本页不替柜台转述它自己会说的事。",
    shapeEyebrow: "合作的形状",
    rows: [
      {
        term: "柜台",
        body: "Mendozer 的平台承载 spa.mendozer.com 的店面；本页将它嵌入，边框下方的文字始终标注地址——即使边框被拦或连接缓慢，这扇门也不会丢。",
      },
      {
        term: "教室",
        body: "实业同时是教学现场。簿记在真实发票上练习，排程在真实预约上练习，服务标准是写下来、执行下去、再接受审校的——不是背出来的。学生像历代学徒一样轮班上 floor：在督导下动手做事，把做过的事写下来，再把笔记交给下一个人。",
      },
      {
        term: "登记册一行",
        body: "开业之日，日期记入登记册；结果无论哪种都印出来——作为一门生意，或作为学院付过一次学费、记在案上、让后人不必再付的一课。",
      },
    ],
    counterEyebrow: "柜台",
    counterTitle: "Corner Spa 柜台，设在 spa.mendozer.com",
    counterNote: "柜台由 Mendozer 提供服务。若它未在此加载，这项实业自己的地址是",
    statusEyebrow: "现状",
    statusLede: "已公布为与 Mendozer 合作开办的实业。场地、执照与服务单正在逐项推进。",
    statusBody: "开业之日，登记册记下日期——作为一门生意开业，否则不开。在那之前，本页就是这项实业全部的公开门面。",
    readRegister: "读登记册",
    writeOffice: "给办公室写信",
    enLedger: {
      paras: [
        "Corner Spa, the first venture: a small wellness and service operation for Windhoek, opened with a partner. Teach on the floor, serve real customers, and print the result.",
        "Corner Spa runs in collaboration with Mendozer, whose platform carries the venture's storefront at spa.mendozer.com. That counter is embedded below: the venture's own address on this site, served by their platform. When it goes live, bookings, times and the service menu read from it directly; nothing here retells what the counter itself says.",
        "The shape of the collaboration, in three rows. The counter: Mendozer's platform serves the storefront at spa.mendozer.com; this page embeds it, and the line beneath the frame always carries the address. The classroom: the venture doubles as the teaching site, where bookkeeping is practised on real invoices, scheduling on real appointments, and a service standard is written, followed and audited — not recited. The register row: the opening is dated the day it happens, and the result prints either way — as a business, or as a lesson the institute paid for once, on the record.",
        "Announced as a venture in collaboration with Mendozer. Premises, licensing and the service menu are being worked through in order. The opening is dated in the register the day it happens — as a business, or not at all. Until then, this page is the venture's whole public surface.",
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

      {/* The shape of the collaboration: three ledger rows on cream —
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
