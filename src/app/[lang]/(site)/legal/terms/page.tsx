import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections(zh: boolean) {
  return zh
    ? [
        {
          h: "本站是什么",
          body: [
            `本网站介绍 ${site.legalName}，并通过垂询接受申请。运营地在${site.country}${site.city}。它不收款、不开账户、不存储留言：申请拟稿器在你自己的邮件客户端里准备一封邮件，对话在那里继续。`,
          ],
        },
        {
          h: "垂询意味着什么",
          body: [
            "发送申请邮件，是请院长办公室阅读并回复。它不创造名额，不承诺名额，也不在任何一方产生义务。录取、课程安排与修读安排，只以学院的书面回复为准。",
          ],
        },
        {
          h: "本页内容",
          body: [
            "本站按学院自己的发布呈现其学科、品牌与印刷品。学科描述的是一个方向，不是课程价目表：课程细节在申请时确认，证书在结业时颁发。",
          ],
        },
        {
          h: "知识产权",
          body: [
            "字标、盾徽、印刷套件图像与本站文字归学院所有。你可以注明出处引用，也可以链接到本站；不得冒名重发，不得用它暗示与学院存在任何关联。",
          ],
        },
        {
          h: "外部渠道",
          body: [
            "本站把申请交给你自己的邮件客户端。你的留言一旦离开本站，就按你所选服务的条款传输，不受本条款约束。",
          ],
        },
        {
          h: "责任",
          body: [
            "本站按现状呈现。对于仅凭本站作出的决定，学院不承担责任：任何要紧事的权威渠道，是院长办公室的书面回复。",
          ],
        },
        {
          h: "变更",
          body: [
            "本条款随学院成长而更新。当前版本始终是本页发布的这一版。",
          ],
        },
      ]
    : [
        {
          h: "What this site is",
          body: [
            `This website presents ${site.legalName} and invites applications by enquiry. It is operated from ${site.city}, ${site.country}. It takes no payments, creates no accounts, and stores no messages: the application composer prepares an email in your own mail client, where the conversation continues.`,
          ],
        },
        {
          h: "What an enquiry means",
          body: [
            "Sending the application message asks the Principal's office to read it and reply. It does not create a place, a promise of a place, or any obligation on either side. Admission, programme placement and study arrangements are confirmed only in the written reply from the institute.",
          ],
        },
        {
          h: "The content on these pages",
          body: [
            "The site describes the institute's disciplines, brand and printed matter as they are published by the institute itself. The disciplines describe direction, not a catalogue of offerings: programme and course specifics are confirmed at the point of application, and the certificate is issued on completion.",
          ],
        },
        {
          h: "Intellectual property",
          body: [
            "The wordmark, the shield emblem, the print kit imagery and the text of this site belong to the institute. You may quote them with attribution and link to this site; you may not republish them as your own or use them to imply any association with the institute.",
          ],
        },
        {
          h: "External channels",
          body: [
            "This site hands the application to your own mail client. Once your message leaves this site, it travels under the terms of the service you chose to use, not under these terms.",
          ],
        },
        {
          h: "Liability",
          body: [
            "The site is offered as it stands. The institute is not liable for decisions made on the strength of this site alone: the authoritative channel for anything that matters is the written reply from the Principal's office.",
          ],
        },
        {
          h: "Changes",
          body: [
            "These terms may be updated as the institute grows. The current version is always the one published on this page.",
          ],
        },
      ];
}

const copy = {
  en: {
    meta: {
      title: "Terms of Service",
      description:
        "The terms on which this website is offered: what the site does, what an enquiry means, what the certificates claim, and what the institute does not promise.",
      ogTitle: "Terms of Service | Oryx Polytechnic Institute",
      ogDescription: "What the site does, what an application means, and what it does not promise.",
    },
    head: {
      eyebrow: "Legal",
      title: "Terms of service.",
      lede: "Short terms, because the site does little: it shows the institute and carries one message at a time.",
    },
  },
  zh: {
    meta: {
      title: "服务条款",
      description:
        "本网站依此条款提供：本站做什么、垂询意味着什么、证书声明什么，以及学院不承诺什么。",
      ogTitle: "服务条款 | Oryx Polytechnic Institute",
      ogDescription: "本站做什么、申请意味着什么，以及它不承诺什么。",
    },
    head: {
      eyebrow: "法务",
      title: "服务条款。",
      lede: "条款很短，因为本站做的事很少：呈现学院，一次传递一封邮件。",
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
    alternates: alternates(lang, "/legal/terms", site.url),
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

export default async function TermsPage({
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
