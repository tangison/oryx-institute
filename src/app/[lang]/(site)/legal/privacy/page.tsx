import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections(zh: boolean) {
  return zh
    ? [
        {
          h: "我们是谁",
          body: [
            `本网站由 ${site.legalName} 运营，在${site.country}${site.city}开展工作。任何隐私问题，写信到 ${site.email}。`,
          ],
        },
        {
          h: "我们收集什么",
          body: [
            "本站的申请拟稿器什么也不存。你按下发送时，你写的邮件在你自己的邮件客户端里打开，收件人是办公室；从那一刻起，它只存在于你开启的这段对话里。",
            "如果你改为直接邮件联系我们，我们保留你选择给出的东西：你的名字、联系方式、你写明的兴趣领域，以及你留言的内容。",
          ],
        },
        {
          h: "为什么收集",
          body: [
            "为了阅读并回复你的申请，安排其后的事，以及保存纳米比亚一所学院理应保存的记录。我们不向任何人出售、出租或交易个人信息，本站不跑广告，也没有第三方统计追踪。",
          ],
        },
        {
          h: "与谁共享",
          body: [
            "院长办公室之外的任何人都不给，除非你要求，或法律要求。本站不设广告 cookie，不建画像。",
          ],
        },
        {
          h: "保存多久",
          body: [
            "申请在其开启的对话存续期间保留，其后按学院自己的记录要求再保留一段时间。没有下文的往来，在告一段落之后删除。",
          ],
        },
        {
          h: "你的权利",
          body: [
            "你可以询问我们持有你的哪些个人信息，要求更正，或在无保留义务时要求删除。写信到上面的邮箱，合理的要求会得到执行。",
          ],
        },
        {
          h: "安全",
          body: [
            "个人信息保存在我们控制的系统上，访问只限需要它的人。没有哪种存储方式绝对安全，但你的信息会按法律与学院自身标准所要求的谨慎对待。",
          ],
        },
        {
          h: "政策的变更",
          body: [
            "如果本政策变更，更新后的版本发布在本页。政策自发布之日起适用。",
          ],
        },
      ]
    : [
        {
          h: "Who we are",
          body: [
            `This website is operated by ${site.legalName}, working from ${site.city}, ${site.country}. For any privacy question, write to ${site.email}.`,
          ],
        },
        {
          h: "What we collect",
          body: [
            "The application composer on this site does not store anything. When you press send, the message you have written opens in your own mail client addressed to the office, and from that moment it exists only in the conversation you started.",
            "If you contact us by email instead, we keep what you choose to give us: your name, your contact details, the field of interest you name, and the content of your message.",
          ],
        },
        {
          h: "Why we collect it",
          body: [
            "To read and answer your application, to arrange what follows it, and to keep the records an institute in Namibia is expected to keep. We do not sell, rent or trade personal information to anyone, and we do not run advertising or third-party analytics trackers on this site.",
          ],
        },
        {
          h: "Who we share it with",
          body: [
            "Nobody outside the Principal's office, unless you ask us to or the law requires it. This site sets no advertising cookies and builds no profiles.",
          ],
        },
        {
          h: "How long we keep it",
          body: [
            "Applications are kept while the conversation they opened is alive, and for as long as the institute's own record-keeping requires after that. Messages that do not lead anywhere are deleted once the exchange has run its course.",
          ],
        },
        {
          h: "Your rights",
          body: [
            "You may ask what personal information we hold about you, ask us to correct it, or ask us to delete it where no obligation requires us to keep it. Write to the email address above and a reasonable request will be acted on.",
          ],
        },
        {
          h: "Security",
          body: [
            "We keep personal information on systems we control and limit access to the people who need it. No method of storage is perfectly secure, but your information is treated with the care the law and the institute's own standards demand.",
          ],
        },
        {
          h: "Changes to this policy",
          body: [
            "If we change this policy, the updated version is published on this page. The policy applies from the date it is published.",
          ],
        },
      ];
}

const copy = {
  en: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Oryx Polytechnic Institute collects, uses and protects personal information: the email handoff, what is never stored, and your rights over it.",
      ogTitle: "Privacy Policy | Oryx Polytechnic Institute",
      ogDescription: "How the institute collects, uses and protects personal information.",
    },
    head: {
      eyebrow: "Legal",
      title: "Privacy policy.",
      lede: "Plain language, because the policy behind it is simple: the application message you write is yours until you send it, and ours to keep safe afterwards.",
    },
  },
  zh: {
    meta: {
      title: "隐私政策",
      description:
        "Oryx Polytechnic Institute 如何收集、使用与保护个人信息，逐条写明：本站不设统计、不设 cookie、不设账户；你的申请邮件在你按下发送之前并不存在，发出之后直达院长办公室的信箱；除回复所需外，学院不留存、不转交、不出售任何个人信息；你对自己的信息享有知情、更正与删除的权利。",
      ogTitle: "隐私政策 | Oryx Polytechnic Institute",
      ogDescription: "学院如何收集、使用与保护个人信息。",
    },
    head: {
      eyebrow: "法务",
      title: "隐私政策。",
      lede: "用平实的语言，因为它背后的政策很简单：你写的申请邮件在发送之前是你的，发送之后归我们妥善保管。",
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
    alternates: alternates(lang, "/legal/privacy", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: `${m.title}, Oryx Polytechnic Institute`,
        },
      ],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const t = copy[lang];

  return (
    <>
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="article max-w-3xl" data-sc-in data-sc-stagger="50">
            {sections(lang === "zh").map((s) => (
              <div key={s.h} className="mt-12 first:mt-0">
                <h2 className="h-sub">{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
            <p className="meta mt-16">
              {site.legalName} · {site.city}, {lang === "zh" ? "纳米比亚" : site.country}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
