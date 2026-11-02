import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";
import { StaffRows } from "@/components/site/staff-rows";

/**
 * The people, on one page: the standalone URL for the staff section
 * /about carries, so the register and the course pages can link
 * straight to a name. Same rows, same honesty: real portrait for the
 * Principal, the placeholder card for pending appointments, and no
 * invented face anywhere. (STAFF-DIRECTORY.md, SEO: title 23 chars.)
 */
const copy = {
  en: {
    meta: {
      title: "People · Oryx Institute",
      description:
        "The people building Oryx Institute in Windhoek. Principal, instructors, researchers, and ventures leads. Credentials and responsibilities are published as appointments are confirmed.",
    },
    headTitle: "The people.",
    headLede:
      "Who is building Oryx Institute, stated as it stands. Credentials and responsibilities are published as appointments are confirmed; the register dates each one the day it lands.",
    aboutLink: "About the institute",
    closeLine: "What is not ready, says so.",
  },
  zh: {
    meta: {
      title: "名册 · Oryx 理工学院",
      description:
        "在温得和克建设 Oryx Institute 的人：院长 Tangi Iigonda 主持研究、认证申请与实业统筹；安全课程主任讲师、公报编辑与 Corner Spa 负责人，任命一一确认之后，资历与职责随之公布在登记册。占位肖像即占位，绝无虚构面孔。",
    },
    headTitle: "名册。",
    headLede:
      "是谁在建 Oryx Institute，现状如何。任命确认之后，资历与职责随之公布；每落定一项，登记册当天记上一笔。",
    aboutLink: "关于学院",
    closeLine: "没准备好的，直说。",
    enLedger: {
      paras: [
        "The people building Oryx Institute in Windhoek, stated as it stands. Tangi Iigonda is Principal and founder: he holds the research leadership, the applications to the NQA and the NTA, ventures oversight and the development of Corner Spa, and he reads every application personally. Before Oryx he founded Tangison Technologies, the Windhoek product studio behind the institute's identity, systems and build.",
        "The appointments still pending are stated as pending: the lead instructor for the safety officer programme is appointed once curriculum sign-off is complete, with credentials and biography published on 15 November 2026; a research associate and Bulletin editor, and the Corner Spa lead, are appointments to be announced. Placeholder portraits are placeholders on purpose — a real photograph replaces each one the day a real person takes the seat. No face on this site is generated, and no biography is invented.",
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
    /* Absolute: "People · Oryx Institute" is the whole title (23
       chars, intentional); the template would double the brand. */
    title: { absolute: m.title },
    description: m.description,
    alternates: alternates(lang, "/about/staff", site.url),
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/about/staff`,
      images: [
        { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.title },
      ],
    },
  };
}

export default async function StaffPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const A = (path: string) => (zh ? `/zh${path}` : path);

  return (
    <>
      {/* The head, on cream. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <h1 className="h-display max-w-[16ch]">{t.headTitle}</h1>
          <p className="lede measure mt-6 text-soft">{t.headLede}</p>
        </div>
      </section>

      {/* The rows. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <StaffRows lang={lang} />
          <p className="meta mt-10">
            <Link href={A("/about")} className="link-type">
              {t.aboutLink} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </p>
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

      {/* The close. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <p className="lede measure">{t.closeLine}</p>
        </div>
      </section>
    </>
  );
}
