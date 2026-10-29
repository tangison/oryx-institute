import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { site, status } from "@/lib/site";
import { siteZh, statusZh } from "@/lib/site-zh";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "About the Institute",
      description:
        "Oryx Institute: the oryx, the characters 理工, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
      ogTitle: "About the Institute | Oryx Institute",
      ogDescription:
        "The oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
    },
    headTitle: "Built for hard ground.",
    headLede: {
      pre: "The institute is named for the oryx: Namibia's own antelope, straight-horned, unhurried and impossible to starve out of dry country. The wordmark adds ",
      post: ", science and engineering, set in the logo exactly where the two belong.",
    },
    readBulletin: "Read Bulletin No. 1",
    practiceEyebrow: "The practice",
    practiceBody:
      "Today the institute works as a consultancy. The Owner's Desk runs business counselling from the Principal's office; market research and development work is taken on per engagement; Rapid Response Training brings teams up to standard. The schools follow the practice in order, as accreditation progresses.",
    temperEyebrow: "The temper",
    temperBody:
      "The institute's own flyer says it in three words: looks harmless, isn't. Graduates are measured the same way the certificate measures them, on innovation and applied problem-solving. Quiet work, decisive finishes.",
    officeEyebrow: "The office",
    officeBody: {
      pre: "The institute works from Windhoek, Namibia, and does not operate public premises yet, so no street address is printed. Reach the office by email at ",
      post: ".",
    },
    principalBody:
      "Reads every application personally. Holds the standard the certificate prints: excellence in innovation and applied problem-solving.",
    portraitMeta: "Portrait to come · Windhoek",
    standsEyebrow: "Where the institute stands",
    standsTitle: "Prelaunch, and honest about it.",
    standsBody: {
      pre: " Legal name: Oryx Polytechnic Institute. The institute is being established in Windhoek; what runs today is what works today.",
    },
    liveNow: "Live now",
    inDevelopment: "In development",
    partnershipsEyebrow: "Partnerships",
    partnershipsPost: " and say what you have in mind.",
    legalEyebrow: "Legal",
    legalBipa: {
      pre: "Oryx Polytechnic Institute is registered with the Business and Intellectual Property Authority (BIPA), Namibia. ",
      post: " The registration number prints here when the certificate is in hand.",
    },
    legalImagery:
      "The imagery on this site is illustrative, set in the institute's own register, and will be replaced by real photography from Windhoek as it is shot. It is not a depiction of a campus: the institute has no premises to photograph yet, and it does not borrow one. Images carry no captions and make no claims of their own.",
    closeLine: "What is not ready, says so.",
    privacy: "Privacy",
    terms: "Terms",
  },
  zh: {
    meta: {
      title: "关于学院",
      description:
        "Oryx 理工学院：羚羊、理工二字、温得和克的院长办公室、在营的咨询实务，以及学院教书育人的脾气。理工，科学和工程二字，站在全名里理工学院的位置；字标三体并立，校长是 Tangi Iigonda，学院尚在开办，正向 NQA 与 NTA 申请认证，一切如实陈述。",
      ogTitle: "关于学院 | Oryx 理工学院",
      ogDescription:
        "羚羊、理工二字、温得和克的院长办公室，以及学院教书育人的脾气。",
    },
    headTitle: "为硬地而生。",
    headLede: {
      pre: "学院以羚羊为名：那是纳米比亚自己的羚羊，直角、不慌不忙，旱地里饿不倒。字标又加上",
      post: "二字，即科学与工程，印在标志里它们本来的位置上。",
    },
    readBulletin: "读公报第一号",
    practiceEyebrow: "实务",
    practiceBody:
      "学院今天以咨询实务运转。经营者案头在院长办公室做经营咨询；市场调研按项目接单；快速响应培训把团队带到标准。各个学校随认证进展，依次而来。",
    temperEyebrow: "脾气",
    temperBody:
      "学院自己的传单用三个字说完：看着无害，并不是。毕业生按证书的尺子量：创新与实用解题。安静的活，利落的尾。",
    officeEyebrow: "办公室",
    officeBody: {
      pre: "学院在纳米比亚温得和克开展工作，暂无对外场地，所以不印街道地址。给办公室写信：",
      post: "。",
    },
    principalBody:
      "亲自阅读每一份申请。守住证书上印的标准：以创新与实用解题见长。",
    portraitMeta: "肖像待拍 · 温得和克",
    standsEyebrow: "学院站在哪里",
    standsTitle: "开办之前，并且如实说。",
    standsBody: {
      pre: " 法定名称：Oryx Polytechnic Institute。学院正在温得和克筹建；今天在运转的，就是今天有用的。",
    },
    liveNow: "在营",
    inDevelopment: "在建",
    partnershipsEyebrow: "合作",
    partnershipsPost: "，讲讲你的想法。",
    legalEyebrow: "法务",
    legalBipa: {
      pre: "Oryx Polytechnic Institute 已在纳米比亚商业与知识产权管理局（BIPA）注册。",
      post: " 拿到证书之日，注册编号会印在这里。",
    },
    legalImagery:
      "本站图像为示意，按学院自己的语域拍摄，并将随实拍推进换为温得和克的真实照片。它们不是校园写照：学院还没有可拍的房子，也不借别人的。图像不带说明，也不作声明。",
    closeLine: "没准备好的，直说。",
    privacy: "隐私",
    terms: "条款",
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
    alternates: alternates(lang, "/about", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/about`,
      images: [
        { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

/** The 理工 paragraph, drawn verbatim from Bulletin No. 1, the
    institute's own published explanation of the word. */
const liGongEssay = insights[0].body[0];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const st = zh ? statusZh : status;
  const A = (path: string) => (zh ? `/zh${path}` : path);

  return (
    <>
      <PageHead title={t.headTitle}>
        <p>
          {t.headLede.pre}
          <span className="wordmark-cjk">理工</span>
          {t.headLede.post}
        </p>
      </PageHead>

      {/* The hero plate: the stone, full measure, drifting at a gentler
          rate than the page — the scrub act. The head above it holds
          still; the photograph breathes. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/kinfolk/02-stone.jpg"
              alt="One weathered stone specimen, centred on cream paper"
              width={1150}
              height={1150}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* The peak: 理工 wipes in left to right on its own cream plate,
          the published explanation beside it. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div
            className="ligong-plate grid place-items-center border-y border-rule py-16 md:py-24"
            data-sc-reveal
            aria-hidden="true"
          >
            <p className="wordmark-cjk text-[clamp(5rem,14vw,11rem)] leading-none">
              理工
            </p>
          </div>
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">
              {zh ? "理工代表什么" : "What 理工 stands for"}
            </p>
            <p className="measure body-lg mt-5">{liGongEssay}</p>
            <Link
              href={A("/resources#bulletin-what-a-polytechnic-is")}
              className="btn--quiet mt-6"
            >
              {t.readBulletin} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The name, the practice, the temper, the office: one column of
          plain paragraphs. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-10" data-sc-in data-sc-stagger="70">
          <p className="measure text-soft">
            {zh ? (
              <>
                Oryx 理工学院。字标中间一词是中文：
                <span className="wordmark-cjk">理工</span>
                （li gong），科学与工程。上方的印章是栗色盾徽，整组字标以古典衬线体排印，一如学院信笺上的印法。
              </>
            ) : (
              <>
                Oryx Institute. In the wordmark the middle word stands in
                Chinese: <span className="wordmark-cjk">理工</span> (li gong),
                the characters for science and engineering. The seal above
                them is the maroon shield, and the whole lockup sets in a
                classic serif, the way it is printed on the institute&apos;s
                letterhead.
              </>
            )}
          </p>
          <div>
            <p className="eyebrow eyebrow--ink">{t.practiceEyebrow}</p>
            <p className="measure mt-4 text-soft">{t.practiceBody}</p>
          </div>
          <div>
            <p className="eyebrow eyebrow--ink">{t.temperEyebrow}</p>
            <p className="measure mt-4 text-soft">{t.temperBody}</p>
          </div>
          <div>
            <p className="eyebrow eyebrow--ink">{t.officeEyebrow}</p>
            <p className="measure mt-4 text-soft">
              {t.officeBody.pre}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              {t.officeBody.post}
            </p>
          </div>
        </div>
      </section>

      {/* The founder: the horns beside the plain bio, reverse-zigzag.
          The portrait slot stays a TODO until the Windhoek shoot. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-in>
            <Image
              src="/images/kinfolk/09-horns.jpg"
              alt="Two shed oryx horns lying parallel, centred on cream paper"
              width={1250}
              height={1000}
              sizes="(min-width: 768px) 22rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div data-sc-in>
            <h2 className="h-sub">{site.principal.name}</h2>
            <p className="meta mt-2">
              {zh ? "院长" : site.principal.role}
            </p>
            <p className="measure mt-5 text-soft">{t.principalBody}</p>
            <p className="meta mt-6">{t.portraitMeta}</p>
            {/* TODO founder: Principal portrait, window light from the
                side, dark top, editorial register. */}
          </div>
        </div>
      </section>

      {/* Where the institute stands */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.standsEyebrow}</p>
            <h2 className="h-section mt-4 max-w-[22ch]">{t.standsTitle}</h2>
            <p className="measure mt-6 text-soft">
              {st.accreditation}
              {t.standsBody.pre}
            </p>

            <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
              {st.liveNow.map((item) => (
                <div className="ledger-row" key={item.name}>
                  <p className="ledger-date">{t.liveNow}</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
              {st.inDevelopment.map((item) => (
                <div className="ledger-row" key={item.name}>
                  <p className="ledger-date">{t.inDevelopment}</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel mt-12 p-8 md:p-10" data-sc-in>
              <p className="measure text-[1.0rem] leading-relaxed">
                {st.partnerships}{" "}
                {zh ? "给办公室写信：" : "Write to the office at "}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>
                {t.partnershipsPost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <div className="measure grid gap-5 text-[0.92rem] leading-relaxed text-soft">
              <p>
                {t.legalBipa.pre}
                {/* TODO founder: print the BIPA registration number when
                    the certificate is in hand. */}
                {t.legalBipa.post}
              </p>
              <p>{st.accreditation}</p>
              <p>{t.legalImagery}</p>
              <p className="flex flex-wrap gap-x-8 gap-y-2">
                <Link href={A("/legal/privacy")} className="link-type">{t.privacy}</Link>
                <Link href={A("/legal/terms")} className="link-type">{t.terms}</Link>
                <a href={`mailto:${site.email}`} className="link-type">{site.email}</a>
              </p>
            </div>
            <p className="measure mt-14 text-ink">{t.closeLine}</p>
          </div>
        </div>
      </section>
    </>
  );
}
