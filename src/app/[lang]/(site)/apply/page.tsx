import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { ApplyForm } from "@/components/site/apply-form";
import { site } from "@/lib/site";
import { siteZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Apply",
      description:
        "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
      ogTitle: "Apply | Oryx Institute",
      ogDescription:
        "One message to the Principal's office in Windhoek starts your application.",
    },
    head: {
      eyebrow: "Apply",
      title: "Apply now.",
      lede: "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. The teaching is crash courses and short courses in business administration and IT and related fields. The practice books through the same desk: the Owner's Desk, market research and development, Rapid Response Training.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares it.",
      },
      {
        t: "The office replies",
        b: "The Principal's office reads every message and answers personally, usually within the week.",
      },
      {
        t: "Talk, then decide",
        b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides agree.",
      },
    ],
    composerTitle: "The application message",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The application exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Who reads it",
    readerBody: `${site.principal.name}, ${site.principal.role}, reads every application personally. The office answers every enquiry by email, and visits are arranged by appointment.`,
  },
  zh: {
    meta: {
      title: "申请",
      description:
        "申请工商管理与信息技术的速成课和短期课程，或预约实务：经营者案头、市场调研、快速响应培训。",
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
    composerBody: (email: string) => ({
      pre: "填好之后，它会以一封写给 ",
      post: " 的邮件打开。本站不存储任何东西；你在自己的邮件客户端里按下发送之前，什么都不会发生。",
    }),
    dataEyebrow: "零数据收集",
    dataBody:
      "本站不跑统计，不设 cookie，也没有账户。你的邮件客户端打开的那一刻，申请才存在；在那之前，它根本不存在。",
    readerEyebrow: "谁在读",
    readerBody: `${site.principal.name}，${siteZh.tradingName ? "院长" : "院长"}，亲自阅读每一份申请。办公室通过邮件回复每一项垂询，到访按预约安排。`,
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
    alternates: alternates(lang, "/apply", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        { url: "/brand/og/apply.png", width: 1200, height: 630, alt: m.ogTitle },
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
  const t = copy[lang];

  return (
    <>
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
              width={1254}
              height={1254}
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
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 15rem, 60vw"
                className="h-auto w-full"
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
    </>
  );
}
