import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { offers, site } from "@/lib/site";
import { offersZh, siteZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The practice, on its own page. The hands-peak belongs to the
 * homepage now (Image Bible v6), so this page opens on cream — the
 * proposition in type — and the working hands arrive as the mid-detail
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
        "The practice at Oryx Institute: Owner's Desk counselling, market R&D, Rapid Response Training, and safety officer training for Namibian sites, delivered to standard from Windhoek.",
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
    safetyCta: "See the curriculum",
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
    enquire: "Enquire about the next intake",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
  },
  zh: {
    meta: {
      title: "实务",
      description:
        "Oryx 理工学院的实务：经营者案头的一对一经营咨询、按项目接单的市场调研、快速响应培训，以及面向纳米比亚现场的安全员培训，一切从温得和克按标准交付：立得住的活。",
      ogTitle: "实务 | Oryx 理工学院",
      ogDescription: "经营者案头咨询、市场调研、快速响应培训与安全员培训，按标准交付。",
    },
    heroLine: "立得住的活。",
    heroSub: "有度量，按标准收尾。每一件工具都有名字，不玩虚的。",
    runsTitle: "实务今天在运转的。",
    safetyName: "安全员培训",
    safetyLine:
      "面向纳米比亚现场的职业安全培训，一天、五天与十天：由注册安全专家授课，纸面笔试加现场实操考核。",
    safetyCta: "看课程大纲",
    safetyTag: "新",
    holdsTitle: "结果落在纸面。",
    holdsBody: [
      "每一段委托都以同一种方式收尾：纸上。咨询面谈收尾时写下定了什么、接下来做什么。调研委托收尾时交出发现、选项与它们支撑的决策，取材自纳米比亚的土地，出处指名道姓。培训委托收尾时交付一份围绕需求搭好的课程，由需求所指的行家来讲。",
      "这里不承诺任何资质；承诺的是活本身。费用在垂询时由院长办公室确认，第一封回信会讲明学院能做什么、不能做什么。",
    ],
    kitEyebrow: "家伙什",
    kitBody:
      "实务靠叫得出名字的普通工具运转：一把米尺、一张工作台、公开的办公家什，以及用学院自己的手写法记的笔记本。屋里没有装饰品；叫不出名字的东西，就不用。每门课在报名前把工具列出来，明说，绝不暗示。",
    standsEyebrow: "实务的资质现状",
    standsBody:
      "实务引擎目前以商业服务协议提供收费的企业咨询、市场调研与公司快速响应培训。正式的职业教育课程，包括工商管理国家职业标准，将在获得 NTA 培训机构注册之后才会开始。注册资格的 NQA 认证正在同步申请中，结果将在公开登记册上公布。",
    apprenticeship: "学徒台还没有开放。没准备好的，直说。",
    enquire: "垂询下一期",
    writeOffice: "给办公室写信",
    readFaq: "读常见问题",
    enLedger: {
      paras: [
        "The practice delivers work measured and finished to standard, with every tool named. Three lines run from the desk in Windhoek. The Owner's Desk is one-on-one business counselling for an owner at a decision: the outcome is written down, what was decided and what happens next. Market research and development is taken on per engagement: feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground with sources named, written to be used and not shelved.",
        "Rapid Response Training exists for the moment a business needs a team trained on something new: Oryx sources the industry expert the need calls for, structures the programme around it, and delivers it. Training engagements close with a programme structured around the need that asked for it, not around a catalogue.",
        "Beside the three, a fourth line is announced: safety officer training for Namibian sites. One, five, and ten days of occupational safety training — worker induction, safety officer certification, and advanced safety management — taught by a registered safety professional and examined on paper and on site. The curriculum is published; enrolments open with Cohort 1.",
        "The working kit is named, ordinary tools: a metre rule, a bench, the office stack published in the open, and notebooks kept in the institute's own hand. Nothing in the room is decorative; if a thing cannot be named, it is not used. Courses list their tools before enrolment, out loud, never by\u00A0implication.",
        "Three engagements, one standard. A counselling engagement at the Owner's Desk closes on paper with what was decided and what happens next. A research engagement closes with findings, options and the decision they support, gathered on Namibian ground with sources named. A training engagement closes with a programme structured around the need that asked for it, delivered by the industry expert the need calls for. Enquiries name the field, the office replies with what is possible, and fees are confirmed before any work is booked, never after.",
        "Nothing here promises a credential; the promise is the work itself. The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register. The apprenticeship bench is not open yet, and the page says so.",
      ],
    },
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
          fourth row — safety officer training, tagged NEW with its
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
                zh
                  ? "一双手在硬光下操作一台手动工具，正在干活的中景"
                  : "A pair of hands working a hand tool in hard daylight, mid-task"
              }
              width={1122}
              height={1402}
              sizes="(min-width: 768px) 20rem, 88vw"
              className="h-auto w-full"
              loading="lazy"
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
                zh
                  ? "一把干净的单头扳手，居中放在米色纸上"
                  : "A clean single-end wrench, centred on cream paper"
              }
              width={1402}
              height={1122}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              loading="lazy"
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
