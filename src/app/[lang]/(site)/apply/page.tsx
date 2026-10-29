import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { ApplyForm } from "@/components/site/apply-form";
import { ApplyOfferMeta } from "@/components/site/apply-offer-meta";
import { site, offers } from "@/lib/site";
import { siteZh, offersZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Apply: Courses and the Practice",
      description:
        "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
      ogTitle: "Apply | Oryx Institute",
      ogDescription:
        "One message to the Principal's office in Windhoek starts your application.",
    },
    head: {
      eyebrow: "Apply",
      title: "Apply now.",
      lede: "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. The teaching is crash courses and short courses in business administration and IT and related fields. The practice books through the same desk: the Owner's Desk, market research and development, Rapid Response\u00A0Training.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares\u00A0it.",
      },
      {
        t: "The office replies",
        b: "The Principal's office reads every message and answers personally, usually within the\u00A0week.",
      },
      {
        t: "Talk, then decide",
        b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides\u00A0agree.",
      },
    ],
    composerTitle: "The application message",
    offersEyebrow: "What you can apply for",
    offersTitle: "Six doors, one desk.",
    offersNote:
      "Everything the institute runs today, listed as it runs. Name the one you are writing about; the office reads every application against its own\u00A0offer.",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail\u00A0client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The application exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Who reads it",
    readerBody: `${site.principal.name}, ${site.principal.role}, reads every application personally. The office answers every enquiry by email, and visits are arranged by\u00A0appointment.`,
  },
  zh: {
    meta: {
      title: "申请",
      description:
        "申请工商管理与信息技术的速成课和短期课程，或预约实务：经营者案头的一对一经营咨询、市场调研与快速响应培训。申请方式只有一种：给温得和克的院长办公室写一封邮件，写明姓名、回复方式与你感兴趣的领域。没有门户，也不排队；院长办公室亲自阅读每一封邮件，通常在一周之内回复。",
      ogTitle: "申请 | Oryx 理工学院",
      ogDescription: "给温得和克院长办公室的一封邮件，你的申请就开始了。",
    },
    head: {
      eyebrow: "申请",
      title: "现在申请。",
      lede: "没有门户，也不排队。直接给院长办公室写信，申请从你的第一封邮件开始。教学是工商管理、信息技术及相关领域的速成课与短期课程。实务经同一张案头预约：经营者案头、市场调研、快速响应培训。",
    },
    steps: [
      {
        t: "写一封邮件",
        b: "名字、一个便于回复的联系方式、你感兴趣的领域。下面的拟稿器替你准备好。",
      },
      {
        t: "办公室回复",
        b: "院长办公室阅读每一封邮件并亲自回复，通常在一周之内。",
      },
      {
        t: "先谈，再定",
        b: "邮件往来，或在温得和克见一面。双方同意之前，不会定下任何事。",
      },
    ],
    composerTitle: "申请邮件",
    offersEyebrow: "可以申请什么",
    offersTitle: "六扇门，同一张案头。",
    offersNote:
      "学院今日在营的一切，按现状列出。写明你申请的是哪一项；院长办公室会对照学院自己的清单阅读每一份申请。",
    composerBody: (email: string) => ({
      pre: "填好之后，它会以一封写给 ",
      post: " 的邮件打开。本站不存储任何东西；你在自己的邮件客户端里按下发送之前，什么都不会发生。",
    }),
    dataEyebrow: "零数据收集",
    dataBody:
      "本站不跑统计，不设 cookie，也没有账户。你的邮件客户端打开的那一刻，申请才存在；在那之前，它根本不存在。",
    readerEyebrow: "谁在读",
    readerBody: `${site.principal.name}，${siteZh.tradingName ? "院长" : "院长"}，亲自阅读每一份申请。办公室通过邮件回复每一项垂询，到访按预约安排。`,
    enLedger: {
      paras: [
        "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. Name, a contact for the reply, and the field you are interested in; the composer on this page prepares the message and opens it in your own mail client. Nothing is stored on this site, and nothing is sent until you press send.",
        "The teaching is crash courses and short courses in business administration and IT and related fields. Business Administration covers records, filings, registers and the everyday processes a business runs on. IT and Related Fields covers the systems and software work runs on, from first principles to confident use, and every tool is named. No long programme is offered until accreditation lands.",
        "The practice books through the same desk. The Owner's Desk is one-on-one business counselling, and the outcome is written down. Market R&D takes feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground and written to be used. Rapid Response Training brings a team up to standard on something new: Oryx sources the industry expert, structures the programme, and delivers it.",
        "Six offers are listed on this page in full, each in its own row: the Owner's Desk; Business Administration; IT & Related Fields; Market R&D; Rapid Response Training; and the Oryx Directory, free and open without an account. Name the one you are writing about in the first line of your message, and the office reads the application against that offer's own terms. If the right door is none of the six, write anyway and say what you need; the office answers, and it says so plainly when the answer is no.",
        "The office replies personally, usually within the week. A conversation follows, by email or an appointment in Windhoek, and nothing is committed until both sides agree. The site runs no analytics, no cookies and no accounts; the application exists the moment your email client opens it, and before that it does not exist at all.",
      ],
    },
  },
} as const;

/* The route stays statically generated: the per-offer variants used to
   await searchParams here, which forced a server render per ?for= deep
   link and showed up as five slow-TTFB errors in the crawl. The deep
   links are hash anchors now (the legacy ?for= form still works), and
   ApplyOfferMeta sets each offer's title and description after
   hydration. The clean URL stays the canonical for every variant. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  const ogTitle = m.ogTitle;

  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/apply", site.url),
    openGraph: {
      title: ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/apply`,
      images: [
        { url: "/brand/og/apply.png", width: 1200, height: 630, alt: ogTitle },
      ],
    },
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];

  return (
    <>
      <ApplyOfferMeta lang={lang} />

      {/* The opener, under scrub: the proposition on the left, the wax
          seal drifting at its own rate on the right. */}
      <section className="section" data-sc-act="scrub">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-16">
          <div>
            <p className="eyebrow eyebrow--ink">{t.head.eyebrow}</p>
            <h1 className="h-display mt-4 max-w-[14ch]">{t.head.title}</h1>
            <p className="measure mt-6 text-soft">{t.head.lede}</p>
          </div>
          <figure className="plate-fig" data-sc-parallax="0.15">
            <Image
              src="/images/kinfolk/10-wax-seal.jpg"
              alt="A cream envelope closed with a maroon wax seal and ribbon, centred on cream paper"
              width={1150}
              height={1150}
              sizes="(min-width: 768px) 18rem, 70vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* How the application runs, hairline ledger. The titles carry the
          sequence; the rows carry no numbers. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="70">
            {t.steps.map((s) => (
              <div className="ledger-row ledger-row--flat" key={s.t}>
                <div>
                  <h2 className="h-sub">{s.t}</h2>
                  <p className="measure mt-3 text-soft">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The six offers, in full: the same ledger the homepage
          carries, so every ?for= door lands on the whole list and no
          variant of this page reads thin. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.offersEyebrow}</p>
          <h2 className="h-section mt-4 max-w-[18ch]">{t.offersTitle}</h2>
          <p className="measure mt-6 text-soft">{t.offersNote}</p>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {(lang === "zh" ? offersZh : offers).map((o) => (
              <div
                className="ledger-row ledger-row--flat"
                key={o.id}
                id={o.id}
              >
                <div>
                  <p className="offer-tag">{o.tag}</p>
                  <h3 className="h-sub mt-2">{o.name}</h3>
                  <p className="measure mt-3 text-soft">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The composer */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="panel p-6 sm:p-10" data-sc-in>
            <h2 className="h-sub">{t.composerTitle}</h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              {t.composerBody(site.email).pre}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              {t.composerBody(site.email).post}
            </p>
            <div className="mt-8">
              <ApplyForm lang={lang} />
            </div>
          </div>

          <div className="grid gap-8" data-sc-in data-sc-stagger="70">
            {/* The office cup plate is not commissioned yet; the wax
                seal holds the small-plate slot.
                TODO image (founder to commission): inner/18 cup — an
                enamel office cup on cream, hard upper-left light —
                beside the zero-data copy. */}
            <figure className="apply-plate" data-sc-reveal>
              <Image
                src="/images/kinfolk/10-wax-seal.jpg"
                alt="A cream envelope closed with a maroon wax seal and ribbon, centred on cream paper"
                width={1150}
                height={1150}
                sizes="(min-width: 1024px) 15rem, 60vw"
                className="h-auto w-full"
                loading="eager"
              />
            </figure>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.dataEyebrow}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">
                {t.dataBody}
              </p>
            </div>
            <div className="hair-t pt-8">
              <p className="text-[0.95rem] leading-relaxed text-soft">
                {t.readerBody}
              </p>
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
