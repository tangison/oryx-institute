import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { offers, site, schemaIds } from "@/lib/site";
import { offersZh, siteZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The practice, on its own page. The maker's hands open the page as
 * the full-bleed pinned peak (the same plate that closes the
 * homepage's practice act, held longer here because this page is the
 * peak itself); the offers run as hairline rows; the stone carries
 * the equipment note; the page ends on the intake door.
 */
const copy = {
  en: {
    meta: {
      title: "The Practice: Work That Holds",
      description:
        "The practice at Oryx Institute: Owner's Desk counselling, market R&D, and Rapid Response Training, delivered to Namibian standards from Windhoek.",
      ogTitle: "Practice | Oryx Institute",
      ogDescription:
        "Owner's Desk counselling, market R&D, and Rapid Response Training, delivered to standard.",
    },
    heroLine: "Work that holds.",
    heroSub: "Measured and finished to standard. Every tool named, not magic.",
    runsTitle: "What the practice runs.",
    holdsTitle: "The outcome is written down.",
    holdsBody: [
      "Every engagement ends the same way: on paper. Counselling sessions close with what was decided and what happens next, written down. Research engagements close with findings, options and the decision they support, gathered on Namibian ground with sources named. Training engagements close with a programme structured around the need that asked for it, delivered by the industry expert the need calls for.",
      "Nothing here promises a credential; the promise is the work itself. Fees are confirmed by the Principal's office at the point of enquiry, and the first reply names what the institute can and cannot do for you.",
    ],
    kitEyebrow: "The working kit",
    kitBody:
      "The practice runs on named, ordinary tools: a metre rule, a bench, the office stack published in the open, and notebooks kept in the institute's own hand. Nothing in the room is decorative; if a thing cannot be named, it is not used. Courses list their tools before enrolment, out loud, never by implication.",
    apprenticeship:
      "The apprenticeship bench is not open yet. What is not ready, says so.",
    enquire: "Enquire about the next intake",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
  },
  zh: {
    meta: {
      title: "实务",
      description:
        "Oryx 理工学院的实务：经营者案头的一对一经营咨询，专挑代价最高的时刻，结果落在纸面：定了什么，接下来做什么；对外接单的市场调研与开发，可行性、市场规模与通路设计，在纳米比亚的地面上采集；快速响应培训，为团队补上下一步所需。一切从温得和克交付，按学院自己的标准：立得住的活。",
      ogTitle: "实务 | Oryx 理工学院",
      ogDescription: "经营者案头咨询、市场调研、快速响应培训，按标准交付。",
    },
    heroLine: "立得住的活。",
    heroSub: "有度量，按标准收尾。每一件工具都有名字，不玩虚的。",
    runsTitle: "实务今天在运转的。",
    holdsTitle: "结果落在纸面。",
    holdsBody: [
      "每一段委托都以同一种方式收尾：纸上。咨询面谈收尾时写下定了什么、接下来做什么。调研委托收尾时交出发现、选项与它们支撑的决策，取材自纳米比亚的土地，出处指名道姓。培训委托收尾时交付一份围绕需求搭好的课程，由需求所指的行家来讲。",
      "这里不承诺任何资质；承诺的是活本身。费用在垂询时由院长办公室确认，第一封回信会讲明学院能做什么、不能做什么。",
    ],
    kitEyebrow: "家伙什",
    kitBody:
      "实务靠叫得出名字的普通工具运转：一把米尺、一张工作台、公开的办公家什，以及用学院自己的手写法记的笔记本。屋里没有装饰品；叫不出名字的东西，就不用。每门课在报名前把工具列出来，明说，绝不暗示。",
    apprenticeship: "学徒台还没有开放。没准备好的，直说。",
    enquire: "垂询下一期",
    writeOffice: "给办公室写信",
    readFaq: "读常见问题",
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
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/practice`,
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
  const zh = lang === "zh";
  const t = copy[lang];
  const all = zh ? offersZh : offers;
  const rows = PRACTICE_IDS.map((id) => all.find((o) => o.id === id)!);
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/practice")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The peak: the maker's hands, full bleed from the very top,
          pinned for three and a half viewports. The line arrives on a
          small cream block, bottom left. */}
      <section className="peak" data-sc-act="pin" data-sc-span="3.5">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/kinfolk/05-hands-peak.jpg"
              alt="A pair of dark-skinned hands holding a chisel at an oak bench in window light"
              width={1250}
              height={1000}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h1 className="h-section">{t.heroLine}</h1>
            <p className="peak-line">{t.heroSub}</p>
          </div>
        </div>
      </section>

      {/* The practice offers: hairline rows, no images. */}
      <section className="section-lg" data-sc-act="flow">
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
          </div>
        </div>
      </section>

      {/* The working kit: the note beside the stone, the plate unmasking
          from its left edge. The brass calipers plate is not
          commissioned yet; the stone carries the reveal until it is.
          TODO image (founder to commission): inner/17 brass calipers —
          an engineer's calipers closed, dead centre on cream, hard
          upper-left light — as the detail plate for this section. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16 lg:gap-24">
          <figure
            className="plate-fig md:order-2"
            data-sc-reveal
          >
            <Image
              src="/images/kinfolk/02-stone.jpg"
              alt="One weathered stone specimen, centred on cream paper"
              width={1150}
              height={1150}
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
    </>
  );
}
