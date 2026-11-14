import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { register, site, schemaIds } from "@/lib/site";
import { registerAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The register, in full: what the institute has made public, dated as
 * it was said, newest first. The same ledger the homepage carries, on
 * its own page, text only, per the Image Asset Manifest v4 (the
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
      "Read it top to bottom and the institute's shape appears: what was registered and when, which courses were published first, which partners agreed to be named, and what is still waiting on a signature. The register is written for three readers at once (a student checking that the institute is real, a partner checking a detail, and a journalist checking a claim), and no line asks the reader to take the institute's word where a document could speak instead.",
    ruleEyebrow: "The rules the register keeps",
    ruleBody:
      "Three rules hold every record on this page. Nothing is announced before it is certain: an intention is not an event. Nothing is given a day before it has happened; the register records, it does not promise. And no line is deleted: when timing moves or a plan changes, the record is corrected in place, because a register that quietly forgets is worth\u00A0nothing.",
    sourceEyebrow: "Where the rows come from",
    sourceBody:
      "Every record traces to a document the institute holds: a registration, a filing, a signed agreement, a published course. Where a partner is named, the naming was agreed in writing first. If you need the document behind a line (a journalist checking a fact, a partner confirming a detail), write to the office and the source is produced.",
  },
  af: {
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
      "Read it top to bottom and the institute's shape appears: what was registered and when, which courses were published first, which partners agreed to be named, and what is still waiting on a signature. The register is written for three readers at once (a student checking that the institute is real, a partner checking a detail, and a journalist checking a claim), and no line asks the reader to take the institute's word where a document could speak instead.",
    ruleEyebrow: "The rules the register keeps",
    ruleBody:
      "Three rules hold every record on this page. Nothing is announced before it is certain: an intention is not an event. Nothing is given a day before it has happened; the register records, it does not promise. And no line is deleted: when timing moves or a plan changes, the record is corrected in place, because a register that quietly forgets is worth\u00A0nothing.",
    sourceEyebrow: "Where the rows come from",
    sourceBody:
      "Every record traces to a document the institute holds: a registration, a filing, a signed agreement, a published course. Where a partner is named, the naming was agreed in writing first. If you need the document behind a line (a journalist checking a fact, a partner confirming a detail), write to the office and the source is produced.",
    enLedger: { paras: [] as string[] },
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
      url: `${site.url}${lang === "af" ? "/af" : ""}/register`,
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
  const af = lang === "af";
  const t = copy[lang];
  const s = af ? registerAf : register;

  const dateFmt = new Intl.DateTimeFormat(af ? "af-NA" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${af ? "/af/register" : "/register"}`,
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

      {/* The rubber stamp beside the ledger's intro: a ledger needs a
          stamp, and this one is the register's own instrument. Small,
          right-aligned, scrubbing gently. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell flex justify-end" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.12" style={{ maxWidth: "16rem" }}>
            <Image
              src="/images/kinfolk/inner/21-register-stamp.jpg"
              alt="A wooden-handled rubber date stamp beside an ink pad, centred on cream"
              width={1399}
              height={1124}
              priority
              sizes="(min-width: 1024px) 16rem, 60vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="60">
            {s.map((r, i) => (
              <div className="ledger-row" key={i}>
                <p className="ledger-date">
                  {r.date
                    ? dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                    : af ? "Date to be confirmed" : "Date to be confirmed"}
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

      {/* The English original, printed beneath the Afrikaans page. */}
      {false && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">Engelse oorspronklike · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {copy.af.enLedger.paras.map((p, i) => (
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
