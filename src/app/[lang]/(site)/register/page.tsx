import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { register, site, schemaIds } from "@/lib/site";
import { registerZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The register, in full: what the institute has made public, dated as
 * it was said, newest first. The same ledger the homepage carries, on
 * its own page — text only, per the Image Asset Manifest v4 (the
 * register is a ledger, not a plate).
 */
const copy = {
  en: {
    meta: {
      title: "The Public Register",
      description:
        "The Oryx Institute register: every public step the institute has taken, dated as it was said, newest first, updated as the work lands.",
      ogTitle: "The Register | Oryx Institute",
      ogDescription:
        "Every public step the institute has taken, dated as it was said, newest first.",
    },
    head: {
      title: "The register.",
      lede: "What the institute has made public, dated as it was said. Nothing is announced before it is certain, and nothing here names a partner before that partner has agreed to be named. Rows without a date yet print \"Date to be confirmed\".",
    },
    closing:
      "Updated as the work lands. When a date is public, it is printed; until then, the row prints \"Date to be confirmed\".",
    readingEyebrow: "How to read this register",
    readingBody:
      "Read it top to bottom and the institute's shape appears: what was registered and when, which courses were published first, which partners agreed to be named, and what is still waiting on a signature. The register is written for three readers at once — a student checking that the institute is real, a partner checking a detail, and a journalist checking a claim — and no entry asks the reader to take the institute's word where a document could speak instead.",
    ruleEyebrow: "The rules the register keeps",
    ruleBody:
      "Three rules hold every entry on this page. Nothing is announced before it is certain — an intention is not an event. Nothing is given a day before it has happened — the register records, it does not promise. And no entry is deleted: when timing moves or a plan changes, the entry is corrected in place, because a register that quietly forgets is worth\u00A0nothing.",
    sourceEyebrow: "Where the rows come from",
    sourceBody:
      "Every entry traces to a document the institute holds: a registration, a filing, a signed agreement, a published course. Where a partner is named, the naming was agreed in writing first. If you need the document behind an entry — a journalist checking a fact, a partner confirming a detail — write to the office and the entry's source is produced.",
  },
  zh: {
    meta: {
      title: "登记册",
      description:
        "Oryx 理工学院的登记册：学院公开走过的每一步，说了就记下，记下就带日期，最新的排在最前。2026年10月25日，BIPA 注册确认，网站重新上线；10月18日，与 Tangison Technologies 公布 AI 培训课程。尚未落定的事，如实写明日期待确认。",
      ogTitle: "登记册 | Oryx 理工学院",
      ogDescription: "学院走过的每一步公开的路，说了就记下日期，最新的在前。",
    },
    head: {
      title: "登记册。",
      lede: "学院公之于众的东西，说了就记下日期。没有定数的事不公布；伙伴没同意被指名之前，这里不指名。还没有日期的行，印着\"日期待确认\"。",
    },
    closing:
      "随工作落定而更新。日期公开了就印出来；在那之前，这一行印\"日期待确认\"。",
    readingEyebrow: "怎么读这本登记册",
    readingBody:
      "从头读到尾，学院的形状就出来了：哪一天注册了什么，哪些课程先发布，哪些伙伴同意被指名，哪些还在等一纸签署。这本册子同时为三种读者而写——想确认学院真实存在的学生、核对细节的伙伴、核实说法的记者——凡是文件能说话的地方，没有一行要求读者只凭学院的一面之词。",
    ruleEyebrow: "登记册守的规矩",
    ruleBody:
      "三条规矩管着这里的每一行。没有定数的事不公布——意图不是事件。没有发生的事不写日期——登记册记录，不许诺。任何一行都不删除：日期变了、计划变了，就在原处更正，因为会悄悄忘事的登记册一文不值。",
    sourceEyebrow: "每一行从哪里来",
    sourceBody:
      "每一行都对应学院持有的一份文件：一件注册、一份备案、一份签署的协议、一门已发布的课程。凡提到伙伴之名，都是先有书面同意再写。如果你需要某一行背后的文件——记者核对日期、伙伴确认细节——给办公室写信，该行的出处会呈上。",
    enLedger: {
      paras: [
        "What the institute has made public, dated as it was said. Nothing is announced before it is certain, and nothing here names a partner before that partner has agreed to be named. Rows without a date yet print \"Date to be confirmed\".",
        "Read it top to bottom and the institute's shape appears: what was registered and when, which courses were published first, which partners agreed to be named, and what is still waiting on a signature. The register is written for three readers at once — a student checking that the institute is real, a partner checking a detail, and a journalist checking a claim — and no entry asks the reader to take the institute's word where a document could speak instead.",
        "Three rules hold every entry on this page. Nothing is announced before it is certain — an intention is not an event. Nothing is given a day before it has happened — the register records, it does not promise. And no entry is deleted: when timing moves or a plan changes, the entry is corrected in place, because a register that quietly forgets is worth\u00A0nothing.",
        "The register on this page is the same ledger the homepage carries and the same one the English site prints; the entries are not translated summaries but the record itself, kept in both languages. When a date is public it is printed in both; until then the row says so. Corrections happen in place, and the entry's source \u2014 a registration, a filing, a signed agreement, a published course \u2014 is produced on request to the office.",
        "Every entry traces to a document the institute holds: a registration, a filing, a signed agreement, a published course. Where a partner is named, the naming was agreed in writing first. If you need the document behind an entry — a journalist checking a fact, a partner confirming a detail — write to the office and the entry's source is produced. Updated as the work lands.",
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
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/register", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/register`,
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

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const s = zh ? registerZh : register;

  const dateFmt = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${zh ? "/zh/register" : "/register"}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="60">
            {s.map((r, i) => (
              <div className="ledger-row" key={i}>
                <p className="ledger-date">
                  {r.date
                    ? dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                    : zh
                      ? "日期待确认"
                      : "Date to be confirmed"}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
          {/* How to read the register, then the rules it keeps: the page
              explains the practice, not only the entries it prints. */}
          <div className="hair-t mt-14 pt-12">
            <p className="eyebrow eyebrow--ink">{t.readingEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.readingBody}</p>
          </div>
          <div className="hair-t mt-12 pt-12">
            <p className="eyebrow eyebrow--ink">{t.ruleEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.ruleBody}</p>
          </div>
          <div className="hair-t mt-12 pt-12">
            <p className="eyebrow eyebrow--ink">{t.sourceEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.sourceBody}</p>
          </div>
          <p className="measure mt-12 text-soft">{t.closing}</p>
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
