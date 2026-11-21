import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { register, site, schemaIds } from "@/lib/site";
import { registerAf } from "@/lib/site-af";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
        "The Oryx Institute register: dated public institutional updates, including its current NTA-registration work and non-accredited status.",
      ogTitle: "The Register | Oryx Institute",
      ogDescription:
        "Dated public institutional updates, stated without promising future approvals.",
    },
    head: {
      title: "The register.",
      lede: "Dated institutional updates. Each entry records a confirmed public fact.",
    },
    closing:
      "The register is updated when a public fact is confirmed. For the current regulatory disclosure, read Institutional Status.",
    currentStatus: "Read the current institutional status",
    readingEyebrow: "How to read this register",
    readingBody:
      "Use the register to check a published institutional fact and when it was recorded. Institutional Status carries the current regulatory disclosure in full.",
    ruleEyebrow: "How entries are handled",
    ruleBody:
      "An entry is published only after the fact is confirmed. The register dates events that have happened; it does not announce intentions as events. If timing or a plan changes, the entry is corrected in place.",
    sourceEyebrow: "Where the rows come from",
    sourceBody:
      "Each record is based on a legal record, filing, written agreement or confirmed publication. Where a relationship is named, it is stated for its actual scope. For a question about a listed fact, write to the Oryx office.",
  },
  af: {
    meta: {
      title: "Die openbare register",
      description:
        "Die Oryx Instituut-register: gedateerde openbare institusionele opdaterings, insluitend NTA-registrasiewerk en ongeakkrediteerde status.",
      ogTitle: "Die register | Oryx Instituut",
      ogDescription:
        "Gedateerde openbare institusionele opdaterings, sonder beloftes oor toekomstige goedkeurings.",
    },
    head: {
      title: "Die register.",
      lede: "Gedateerde institusionele opdaterings. Elke inskrywing teken ’n bevestigde openbare feit aan.",
    },
    closing:
      "Die register word bygewerk wanneer ’n openbare feit bevestig is. Lees Institusionele Status vir die huidige regulatoriese verklaring.",
    currentStatus: "Lees die huidige institusionele status",
    readingEyebrow: "Hoe om hierdie register te lees",
    readingBody:
      "Gebruik die register om ’n gepubliseerde institusionele feit en die datum daarvan na te gaan. Institusionele Status bevat die volledige huidige regulatoriese verklaring.",
    ruleEyebrow: "Hoe inskrywings hanteer word",
    ruleBody:
      "’n Inskrywing word eers gepubliseer wanneer die feit bevestig is. Die register dateer gebeurtenisse wat reeds plaasgevind het; dit maak nie voornemens tot gebeurtenisse nie. Wanneer tydsberekening of ’n plan verander, word die inskrywing in plek reggestel.",
    sourceEyebrow: "Waar die rye vandaan kom",
    sourceBody:
      "Elke rekord is op 'n regsrekord, indiening, skriftelike ooreenkoms of bevestigde publikasie gegrond. Waar 'n verhouding genoem word, word dit volgens die werklike omvang daarvan gestel. Skryf aan die Oryx-kantoor met 'n vraag oor 'n genoemde feit.",
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
  return pageMetadata({
    lang,
    path: "/register",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle },
  });
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
  const A = (href: string) => (af ? `/af${href}` : href);

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
          <Link href={A("/status")} className="link-type mt-5 inline-block">
            {t.currentStatus}
          </Link>
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
