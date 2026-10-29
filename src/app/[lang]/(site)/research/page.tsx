import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { offers, partners, site, status, schemaIds } from "@/lib/site";
import { offersZh, partnersZh, siteZh, statusZh } from "@/lib/site-zh";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";
import { chrome } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Research & Development",
      description:
        "Research and development at Oryx Institute: market R&D for hire, the AI training programme built with Tangison Technologies, and concept work with Mendozer.",
      ogTitle: "Research & Development | Oryx Institute",
      ogDescription:
        "Market R&D for hire, the AI training programme with Tangison Technologies, and concept work with Mendozer.",
    },
    head: {
      title: "Research runs from day one.",
      lede: "Evidence before money moves: for clients, and for the institute's own builds. The same desk does both, market research taken on per engagement, and the programme and product work the institute runs with named partners.",
    },
    hireTitle: "The market side of the desk.",
    bring: "Bring a problem",
    whatRuns: "What runs today",
    how: [
      { k: "1 · The question.", v: "Written down as it stands, before any method is discussed." },
      { k: "2 · The ground.", v: "Evidence gathered on Namibian ground, sources named." },
      { k: "3 · The document.", v: "Written to be used: findings, options, and the decision they support. Not shelved." },
    ],
    streamsEyebrow: "Three streams",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools, written the way the institute teaches: evidence first, decoration never. Every figure carries its source, or it does not ship.",
    read: "Read",
    readBulletin: "Read the Bulletin",
    fieldLede:
      "Fieldwork notes open when fieldwork starts. The Bulletin carries the writing until then.",
    papersLede:
      "Cited papers publish as the research programme produces them. None exist yet; none are claimed.",
    quote: "Entrepreneurship is not a subject at Oryx. It is the exit exam.",
    quoteMeta: "Bulletin No. 4 · Why every course here ends in a venture",
    researchersBody:
      "The research register at launch is one desk wide. It widens as researchers join, and each one is named here when they do.",
    principalBody:
      "Principal of the institute. Reads every application personally, writes the Bulletin's register, and holds the desk the research runs from.",
    partnersBody:
      "Named, and by their own marks: the collaborations the research runs with, carried as the partners print them.",
  },
  zh: {
    meta: {
      title: "研究与开发",
      description:
        "Oryx 理工学院的研究与开发：对外接单的市场调研（可行性、市场规模、竞品研判、通路设计），在纳米比亚的地面上采集，写成可用的报告；对内自建的课程：与 Tangison Technologies 共建的 AI 培训课程，旗舰产品在它之上施工；与 Mendozer 共同推进的概念工作。研究登记册随研究者加入而变宽。",
      ogTitle: "研究与开发 | Oryx 理工学院",
      ogDescription:
        "对外接单的市场调研、与 Tangison Technologies 共建的 AI 培训课程，以及与 Mendozer 共同推进的概念工作。",
    },
    head: {
      title: "研究从第一天就开始。",
      lede: "先有证据，钱再动：对客户如此，对学院自己的建造也如此。同一张桌子做两件事：按项目接单的市场调研，以及与指名伙伴一起推进的课程与产品。",
    },
    hireTitle: "桌子的市场那一侧。",
    bring: "带来一个问题",
    whatRuns: "今天在运转的",
    how: [
      { k: "一 · 问题。", v: "原样写下，先于任何方法讨论。" },
      { k: "二 · 土地。", v: "证据取自纳米比亚的土地，出处指名道姓。" },
      { k: "三 · 文件。", v: "写成能用的东西：发现、选项，以及它们支撑的决策。不进抽屉。" },
    ],
    streamsEyebrow: "三股水流",
    bulletinBody:
      "注明出处的文章，写数字、方法与工具，写作方式即学院的教学方式：证据在先，绝无装饰。每个数字注明出处，否则不发。",
    read: "阅读",
    readBulletin: "读公报",
    fieldLede:
      "田野笔记等田野开始那天开放。在那之前，公报承担这里的写作。",
    papersLede:
      "注明出处的论文随研究计划产出而发表。目前一篇没有，也不声称有。",
    quote: "在 Oryx，创业不是一门课。它是出门考试。",
    quoteMeta: "公报第四号 · 为什么这里的每门课都结束于一项实业",
    researchersBody:
      "起步时的研究登记册只有一张桌子宽。研究者加入，它就变宽；每来一位，就在这里指名。",
    principalBody:
      "学院院长。亲自阅读每一份申请，执笔公报的登记册，守着研究出发的这张桌子。",
    partnersBody:
      "指名，且用他们自己的标记：研究的合作方，按伙伴自己印制的样子呈现。",
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
    alternates: alternates(lang, "/research", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/research`,
      images: [
        {
          url: "/brand/og/research.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  /* The quote pin points at Bulletin No. 4; the accessible name of its
     read link names the essay it opens. */
  const quoteEssay =
    insights.find((i) => i.id === "why-every-course-ends-in-a-venture")
      ?.title ?? "";
  const t = copy[lang];
  const marketRnD = (zh ? offersZh : offers).find((o) => o.id === "market-rd");
  const devList = zh ? statusZh.inDevelopment : status.inDevelopment;
  const partnerNote = (id: string) =>
    zh ? partnersZh.find((p) => p.id === id)?.note : partners.find((p) => p.id === id)?.note;
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/research")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "Service",
      name: zh ? "市场调研" : "Market research and development",
      provider: {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
      },
      areaServed: zh ? siteZh.areaServed : site.areaServed,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The hero plate: the notebook, full measure, drifting at a
          gentler rate than the page — the scrub act. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/kinfolk/04-notebook.jpg"
              alt="A bound maroon notebook with ribbon, centred on cream paper"
              width={1250}
              height={1000}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* For hire, the market side of the desk */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div data-sc-in data-sc-stagger="70">
            <h2 className="h-section max-w-[20ch]">{t.hireTitle}</h2>
            <p className="measure mt-6 text-soft">{marketRnD?.body}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href={A("/apply#market-rd")} className="btn">
                {t.bring}
              </Link>
              <Link href={A("/practice")} className="btn--quiet">
                {t.whatRuns} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10" data-sc-in>
            <ol className="grid gap-5 text-[0.98rem] leading-relaxed text-soft">
              {t.how.map((h) => (
                <li key={h.k}>
                  <span className="font-[500] text-ink">{h.k}</span> {h.v}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The three streams, hairline rows, one by one. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.streamsEyebrow}</p>
          <div className="ledger mt-8" data-sc-in data-sc-stagger="80">
            <div className="ledger-row">
              <p className="ledger-date">Bulletin</p>
              <p className="max-w-[62ch] text-soft">{t.bulletinBody}</p>
            </div>
            <div className="ledger-row">
              <p className="ledger-date">{zh ? "田野" : "Fieldwork"}</p>
              <p className="max-w-[62ch] text-soft">{t.fieldLede}</p>
            </div>
            <div className="ledger-row">
              <p className="ledger-date">{zh ? "论文" : "Papers"}</p>
              <p className="max-w-[62ch] text-soft">{t.papersLede}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page breath: wood and rope, a silent divider. No text, no
          overlay, one full viewport. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/03-wood-rope-divider.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The peak: the Bulletin quote, pinned for two viewports on a
          cream plate. The journal-detail photograph (open notebook with
          dip pen) is not commissioned yet; the quote holds the screen in
          type alone, which is the register anyway.
          TODO image (founder to commission): inner/16 journal detail —
          an open journal with a dip pen resting in the fold, hard
          upper-left light, cream ground — as the pinned plate behind
          this quote. */}
      <section
        className="peak"
        data-sc-act="pin"
        data-sc-span="2"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="shell flex h-full flex-col justify-center py-24">
            <figure data-sc-scrim>
              <blockquote className="pull-quote max-w-[24ch]">
                {t.quote}
              </blockquote>
              <figcaption className="meta mt-8">{t.quoteMeta}</figcaption>
              <Link
                href={A("/resources#bulletin-why-every-course-ends-in-a-venture")}
                className="btn--quiet mt-8"
                aria-label={
                  zh
                    ? `${t.read}${quoteEssay}`
                    : `${t.read}: ${quoteEssay}`
                }
              >
                {zh ? "读这篇文章" : "Read the essay"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </figure>
          </div>
        </div>
      </section>

      {/* The Bulletin, the published writing. The essays are the works
          themselves: they publish in English, and the ZH page says so. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">
              {zh ? `${chrome.zh.bulletinInEnglish} ${t.bulletinBody}` : t.bulletinBody}
            </p>
          </div>
          <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
            {insights.map((a) => (
              <div className="ledger-row" key={a.id}>
                <p className="ledger-date">{a.no}</p>
                <div>
                  {/* The title is the link: one row, one door, the register
                      the Directory pages keep. */}
                  <h3 className="news-title">
                    <Link href={A(`/resources#bulletin-${a.id}`)}>{a.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{a.dek}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-context divider: the game plays out to an outcome.
          No text, no overlay. */}
      <div
        className="divider overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="1.0">
          <Image
            src="/images/kinfolk/06-game-board.jpg"
            alt=""
            width={1200}
            height={960}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Researchers, the Principal, at launch */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.researchersBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2"
            data-sc-in
            data-sc-stagger="80"
          >
            <div className="quiet-card">
              {/* TODO founder: replace the shield placeholder with the
                  Principal's portrait when the Windhoek photoshoot lands. */}
              <div className="grid place-items-center bg-white border-b border-rule p-14">
                <OryxLogo
                  variant="emblem"
                  tone="brand"
                  loading="lazy"
                  className="h-44 w-auto"
                  title=""
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="h-sub">
                  {site.principal.name}
                  <span className="ml-3 align-middle text-[0.72rem] font-[500] tracking-[0.14em] uppercase text-soft">
                    {zh ? "院长" : site.principal.role}
                  </span>
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                  {t.principalBody}
                </p>
              </div>
            </div>
            <div className="quiet-card p-8 md:p-10">
              <ul className="grid gap-6">
                {devList.map((item) => (
                  <li key={item.name} className="hair-b hair-b--ink pb-6 last:border-0 last:pb-0">
                    <p className="font-[500]">{item.name}</p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">
                      {item.line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners: named, carried as their own untampered marks, not
          as outgoing links. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.partnersBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2"
            data-sc-in
            data-sc-stagger="80"
          >
            {partners.map((p) => (
              <div key={p.id} className="bg-paper p-8 md:p-10">
                <span
                  className={`inline-flex h-8 items-center ${p.tone === "ink" ? "text-ink" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.id === "mendozer" ? "/partners/mendozer-logo-ink.svg" : p.logo}
                    alt={p.alt}
                    width={p.id === "tangison" ? 1383 : 1024}
                    height={p.id === "tangison" ? 296 : 401}
                    className="h-full w-auto"
                    loading="lazy"
                  />
                </span>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-soft">
                  {partnerNote(p.id)}
                </p>
              </div>
            ))}
          </div>
          <div className="hair-t mt-16 pt-10" data-sc-in>
            <Link href={A("/resources#bulletin")} className="btn--quiet">
              {t.readBulletin} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
