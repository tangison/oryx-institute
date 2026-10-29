import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { insights, resources } from "@/lib/content";
import { resourcesZh } from "@/lib/content-zh";
import { directoryCourses, directoryTemplates } from "@/lib/directory";
import { site, schemaIds } from "@/lib/site";
import { alternates, chrome, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Oryx Directory & Bulletin",
      description:
        "Free Namibia-specific crash courses and fill-in business templates from the Oryx Directory, plus the Oryx Bulletin: cited essays on Namibia's skills and tools.",
      ogTitle: "The Oryx Directory & Bulletin | Oryx Institute",
      ogDescription:
        "The Oryx Directory: free crash courses and business templates, with the Bulletin's cited essays.",
      ldName: "The Oryx Directory and Bulletin",
    },
    head: {
      title: "The Oryx Directory and Bulletin.",
      lede: "The institute writes down what it knows, and gives it away. The Directory carries the free resource library: Namibia-specific crash courses and business templates, live ahead of accreditation. The Bulletin carries the numbers behind the work. Nothing here asks you to take a claim on faith.",
    },
    dirEyebrow: "The Oryx Directory",
    dirBody:
      "Free, Namibia-specific, and copyrighted to Oryx Polytechnic Institute: not open-source, but free to access. It is real value on day one, before accreditation, and proof of the rigor everything the institute charges for is held to. Every figure is sourced or labelled as an assumption. None of it is legal, tax, or financial advice.",
    coursesTitle: "Crash courses, Namibia first.",
    templatesTitle: "Business templates, ready to fill.",
    minuteRead: "minute read",
    updated: "Updated",
    coursesWord: "courses",
    templatesWord: "templates",
    registersEyebrow: "The registers",
    registersBody:
      "Everything the institute publishes, listed here. The prospectus is issued on request rather than left to go stale on a server.",
    registerWord: "Register",
    bulletinEyebrow: "The Oryx Bulletin",
    bulletinLine: "Dated. Public. Every figure carries its source.",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools. Written the way the institute teaches: evidence first, decoration never.",
    closeTitle: "Set in ink, kept honest.",
    closeBody:
      "The Bulletin follows the institute's publishing rule: every figure carries its source, nothing is invented to fill a gap, and when a fact changes, the Bulletin changes with it.",
    applyNow: "Apply now",
    whatRuns: "What runs today",
  },
  zh: {
    meta: {
      title: "Oryx 资源目录与公报",
      description:
        "Oryx 资源目录，全部免费，无需账户：四门纳米比亚专题的速成课（在纳米比亚注册公司、NQA 与 NTA 认证解读、纳米比亚劳动法基础、纳米比亚保险），七份可填写的商业模板（信笺、商业计划、财务预测、报价单、保密协议、雇佣合同、会议纪要），另有 Oryx 公报：注明出处的文章，写纳米比亚真实的技能与工具。",
      ogTitle: "Oryx 资源目录与公报 | Oryx 理工学院",
      ogDescription:
        "Oryx 资源目录：免费速成课与商业模板，附公报的注明出处的文章。",
      ldName: "Oryx 资源目录与公报",
    },
    head: {
      title: "Oryx 资源目录与公报。",
      lede: "学院把自己知道的写下来，然后送出去。资源目录承载免费资源库：纳米比亚专题的速成课与商业模板，先于认证上线。公报承载这些工作背后的数字。这里没有任何一句话要你凭空相信。",
    },
    dirEyebrow: "Oryx 资源目录",
    dirBody:
      "免费、纳米比亚专题、版权归 Oryx Polytechnic Institute：不是开源，但免费取用。它在第一天就有真价值，先于认证，也是学院收费之物所守严谨的证明。每个数字注明出处，或标明为假设。这里没有法律、税务或财务建议。",
    coursesTitle: "速成课，纳米比亚优先。",
    templatesTitle: "商业模板，拿来就填。",
    minuteRead: "分钟读完",
    updated: "更新于",
    coursesWord: "门课程",
    templatesWord: "套模板",
    registersEyebrow: "各个登记册",
    registersBody:
      "学院发布的所有东西，都列在这里。课程手册按需提供，不在服务器上放旧。",
    registerWord: "登记册",
    bulletinEyebrow: "Oryx 公报",
    bulletinLine: "带日期。公开。每个数字注明出处。",
    bulletinBody:
      "注明出处的文章，写数字、方法与工具。写作方式即学院的教学方式：证据在先，绝无装饰。",
    closeTitle: "以墨设定，保持诚实。",
    closeBody:
      "公报遵守学院的发布规矩：每个数字注明出处，不为填空而编造，事实变了，公报跟着变。",
    applyNow: "现在申请",
    whatRuns: "今天在运转的",
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
    alternates: alternates(lang, "/resources", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/resources`,
      images: [
        {
          url: "/brand/og/resources.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const resList = zh ? resourcesZh : resources;
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const bulletinLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/resources")}`,
    publisher: { "@type": "EducationalOrganization", "@id": schemaIds.org },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bulletinLd) }}
      />

      {/* The opener is typographic on cream. The journal-detail plate
          (open journal with dip pen) is not commissioned yet.
          TODO image (founder to commission): inner/16 journal detail,
          an open journal with a dip pen resting in the fold, hard
          upper-left light, cream ground, subject centred with margin —
          as the page hero at roughly 70vh. */}
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The Directory: crash courses */}
      <section id="directory" className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.dirEyebrow}</p>
            <p className="measure mt-5 text-soft">
              {zh ? `${chrome.zh.directoryInEnglish} ${t.dirBody}` : t.dirBody}
            </p>
          </div>

          {/* The real count, printed, from the listings themselves. */}
          <p className="meta mt-8 tnum">
            {directoryCourses.length} {t.coursesWord} ·{" "}
            {directoryTemplates.length} {t.templatesWord}
          </p>

          <h2 className="h-section mt-14 max-w-[22ch]">{t.coursesTitle}</h2>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {directoryCourses.map((d) => (
              <Link href={A(`/resources/${d.slug}`)} className="ledger-row group" key={d.slug}>
                <p className="ledger-date">{d.no}</p>
                <div>
                  <h3 className="news-title">{d.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{d.standfirst}</p>
                  <p className="meta mt-3">
                    {d.readMinutes} {t.minuteRead}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page breath: the game plays out to an outcome. No text,
          no overlay, one full viewport. */}
      <div className="divider divider--full overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="0.8">
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

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[22ch]">{t.templatesTitle}</h2>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {directoryTemplates.map((d) => (
              <Link href={A(`/resources/${d.slug}`)} className="ledger-row group" key={d.slug}>
                <p className="ledger-date">{d.no}</p>
                <div>
                  <h3 className="news-title">{d.title}</h3>
                  <p className="meta mt-2">
                    {d.readMinutes} min · {t.updated} {d.updated}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The other registers, in one place: hairline grid, two columns
          on desktop, one on mobile. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.registersEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.registersBody}</p>
          </div>
          <div className="ledger mt-10 grid gap-x-16 md:grid-cols-2" data-sc-in data-sc-stagger="60">
            {resList.map((r) => (
              <Link
                href={r.action.href.startsWith("/") ? A(r.action.href) : r.action.href}
                className="ledger-row group"
                key={r.name}
              >
                <p className="ledger-date">{t.registerWord}</p>
                <div>
                  <h3 className="news-title">{r.name}</h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{r.what}</p>
                  <p className="meta mt-3">{r.action.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The peak: the Bulletin named on its own cream plate, pinned
          for two viewports; the line arrives over the pin. */}
      <section className="peak" id="bulletin" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="shell flex h-full flex-col justify-center py-24">
            <div data-sc-scrim>
              <p className="eyebrow eyebrow--ink">{t.bulletinEyebrow}</p>
              <p className="pull-quote mt-6 max-w-[22ch]">{t.bulletinLine}</p>
              <p className="measure mt-6 text-soft">
                {zh ? `${chrome.zh.bulletinInEnglish} ` : ""}
                {t.bulletinBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The essays themselves. They publish in English. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="mt-4 grid gap-20" data-sc-in data-sc-stagger="80">
            {insights.map((a) => (
              <article
                key={a.id}
                id={`bulletin-${a.id}`}
                className="hair-t grid gap-8 pt-12 scroll-mt-28 lg:grid-cols-[180px_1fr] lg:gap-16"
              >
                <div>
                  <p className="eyebrow">{a.no}</p>
                  <p className="meta mt-3">{a.date}</p>
                </div>
                <div className="min-w-0">
                  <h3 className="h-section max-w-[26ch]">{a.title}</h3>
                  <p className="lede measure mt-5 text-soft">{a.dek}</p>
                  <div className="article mt-8">
                    {a.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing rule close, on cream: the footer is the only ink
          ground on the site. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <h2 className="h-section max-w-[20ch]">{t.closeTitle}</h2>
          <p className="measure mt-6 text-soft">{t.closeBody}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={A("/apply")} className="btn">
              {t.applyNow}
            </Link>
            <Link href={A("/practice")} className="btn--quiet">
              {t.whatRuns} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
