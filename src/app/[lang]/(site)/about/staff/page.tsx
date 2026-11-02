import type { Metadata } from "next";
import Link from "next/link";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";
import { StaffRows, staff } from "@/components/site/staff-rows";

/**
 * The people, on one page: the standalone URL for the staff section
 * /about carries, so the register and the course pages can link
 * straight to a name. Same rows, same honesty: real portrait for the
 * Principal, the placeholder card for pending appointments, and no
 * invented face anywhere. (STAFF-DIRECTORY.md)
 *
 * The page declares itself as AboutPage structured data with the staff
 * as Person nodes, and carries the appointment policy in full, so the
 * register reads as the institution's own record rather than a stub.
 */

const copy = {
  en: {
    meta: {
      title: "Staff and appointments · Oryx Institute",
      description:
        "The people building Oryx Institute in Windhoek: the Principal, and every appointment as it is confirmed. Placeholder portraits are placeholders on purpose.",
    },
    headTitle: "The people.",
    headLede:
      "Who is building Oryx Institute, stated as it stands. Credentials and responsibilities are published as appointments are confirmed; the register dates each one the day it lands.",
    registerTitle: "The register of names.",
    policyEyebrow: "How appointments are recorded",
    policy: [
      "The hiring bar is written down before it is used. Every seat the institute needs is listed on this page, filled or not, and every row states what the person actually holds: a role, a credential, a responsibility. Nothing is dressed up. A row that reads appointment to be announced means the seat is genuinely empty, not that a name is being withheld.",
      "An appointment is published the day it is signed, never before. The public register carries the same entry with its date, and where a document exists behind a name, a contract, a registration, a signed agreement, the register names the document. Corrections happen in place: if a role changes or a date moves, the row and the register are corrected together, and nothing is quietly deleted.",
      "Credentials are printed with the person they belong to. The lead instructor for the safety programme is appointed only once curriculum sign-off is complete, and the credentials are published with the name, not after it. This page, the register and the course pages are kept consistent by hand, and the office answers any question about a row by producing the paper behind it.",
    ],
    aboutLink: "About the institute",
    closeLine: "What is not ready, says so.",
  },
  zh: {
    meta: {
      title: "教职员与聘任名册 · Oryx 理工学院 · Oryx Institute",
      description:
        "在温得和克建设 Oryx Institute 的人：院长 Tangi Iigonda 主持研究、认证申请与各门实业统筹；安全课程主任讲师、研究助理与公报编辑、水疗实业负责人，任命一一确认之后公布在名册与登记册，资历与职责随任命一同印出。占位肖像即占位，绝无虚构面孔。",
    },
    headTitle: "名册。",
    headLede:
      "是谁在建 Oryx Institute，现状如何。任命确认之后，资历与职责随之公布；每落定一项，登记册当天记上一笔。",
    registerTitle: "名册。",
    policyEyebrow: "任命如何记录",
    policy: [
      "聘任的门槛先写下，再使用。学院需要的每一个席位都列在这一页上，无论是否已有人：每一行写明此人实际持有什么——一个职务、一项资历、一份职责，不加修饰。写着“任命待公布”的行，意思是这个席位确实还空着，而不是有什么名字被扣住不发。",
      "任命在签署当天公布，绝不提前。公开登记册带着日期记下同一笔；凡是有文件在名字背后的——合同、注册、已签的协议——登记册写明是哪份文件。更正在原处进行：职务变了、日期动了，名册与登记册一并更正，任何一笔都不会被悄悄删掉。",
      "资历与它的主人印在一起。安全课程主任讲师只在课程大纲定稿之后到任，资历与姓名同时公布，不会先后两截。这一页、登记册与课程页由人工保持一致；对任何一行有疑问，办公室会拿出背后的文件来回答。",
    ],
    aboutLink: "关于学院",
    closeLine: "没准备好的，直说。",
    enLedger: {
      paras: [
        "The people building Oryx Institute in Windhoek, stated as it stands. Tangi Iigonda is Principal and founder: he holds the research leadership, the applications to the NQA and the NTA, ventures oversight and the development of the spa venture, and he reads every application personally. Before Oryx he founded Tangison Technologies, the Windhoek product studio behind the institute's identity, systems and build, and he directs it still. Based in Windhoek.",
        "The appointments still pending are stated as pending. The lead instructor for the safety programme is appointed once curriculum sign-off is complete, with credentials and biography published on 15 November 2026. A research associate and Bulletin editor is an appointment to be announced, and so is the lead for the spa venture. Placeholder portraits are placeholders on purpose: a real photograph replaces each one the day a real person takes the seat. No face on this site is generated, and no biography is invented.",
        "The hiring bar is written down before it is used. Every seat the institute needs is listed on this page, filled or not, and every row states what the person actually holds: a role, a credential, a responsibility. A row that reads appointment to be announced means the seat is genuinely empty, not that a name is being withheld. An appointment is published the day it is signed, never before; the public register carries the same record with its date, and where a document exists behind a name, a contract, a registration, a signed agreement, the register names the document. Corrections happen in place, and nothing is quietly deleted.",
        "Who reads this page and why it is kept public. Students and parents check that the people in front of the classroom are real and named before they enrol; partners check a name and a role before they sign; journalists check a claim against a person who actually holds it. The page is kept deliberately short: the Principal, the seats the institute is hiring for, and the policy that governs both. When the seats fill, the rows change; the honesty does not. A name joins this register the day its paper is signed, and until then the placeholder stands in, visibly, on purpose.",
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
    /* Absolute: the title carries the brand in the site's own register;
       the template would print it a second time. */
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}${A("/about/staff")}#about`,
    name: t.meta.title,
    url: `${site.url}${A("/about/staff")}`,
    inLanguage: zh ? "zh-Hans" : "en",
    isPartOf: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
    },
    about: staff.map((p) => ({
      "@type": "Person",
      /* One node per person per language: the zh page states the same
         row in Chinese, so the node is language-scoped rather than
         shared with disagreeing name properties. */
      "@id": `${site.url}${A("/about/staff")}#${p.slug}`,
      name: zh ? p.nameZh : p.name,
      jobTitle: zh ? p.roleZh : p.role,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The head, on cream. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <h1 className="h-display max-w-[16ch]">{t.headTitle}</h1>
          <p className="lede measure mt-6 text-soft">{t.headLede}</p>
        </div>
      </section>

      {/* The rows, under their own section heading so the page reads
          h1 into h2 without a skip. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.registerTitle}</h2>
          <div className="mt-12">
            <StaffRows lang={lang} />
          </div>
          <p className="meta mt-10">
            <Link href={A("/about")} className="link-type">
              {t.aboutLink} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* How appointments are recorded: the policy, in prose. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8" data-sc-in data-sc-stagger="70">
          <p className="eyebrow eyebrow--ink">{t.policyEyebrow}</p>
          {t.policy.map((p, i) => (
            <p key={i} className="measure text-soft">
              {p}
            </p>
          ))}
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
