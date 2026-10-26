import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { register, site, schemaIds } from "@/lib/site";
import { registerAf } from "@/lib/site-af";
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
      title: "The Register",
      description:
        "The Oryx Institute register: every public step the institute has taken, dated as it was said, newest first. Dated, public, and updated as the work lands.",
      ogTitle: "The Register | Oryx Institute",
      ogDescription:
        "Every public step the institute has taken, dated as it was said, newest first.",
    },
    head: {
      title: "The register.",
      lede: "What the institute has made public, dated as it was said. Nothing is announced before it is certain, and nothing here names a partner before that partner has agreed to be named. Rows without a date yet print \"Date to be confirmed\".",
    },
    closing:
      "Updated as the work lands. When a date is public, it is printed; until then, the row says so plainly.",
  },
  af: {
    meta: {
      title: "Die Register",
      description:
        "Die Oryx Instituut-register: elke openbare stap wat die instituut geneem het, gedateer soos dit gesê is, nuutste eerste. Gedateer, openbaar, en opgedateer namate die werk land.",
      ogTitle: "Die Register | Oryx Instituut",
      ogDescription:
        "Elke openbare stap wat die instituut geneem het, gedateer soos dit gesê is, nuutste eerste.",
    },
    head: {
      title: "Die register.",
      lede: "Wat die instituut publiek gemaak het, gedateer soos dit gesê is. Niks word aangekondig voordat dit seker is nie, en niks hier noem 'n vennoot voordat daardie vennoot ingestem het om genoem te word nie. Rye sonder 'n datum druk \"Datum moet nog bevestig word\".",
    },
    closing:
      "Opgedateer namate die werk land. Wanneer 'n datum publiek is, word dit gedruk; tot dan sê die ry dit self.",
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

  const dateFmt = new Intl.DateTimeFormat(af ? "af" : "en-GB", {
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

      <section className="section-lg">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="60">
            {s.map((r, i) => (
              <div className="ledger-row" key={i}>
                <p className="ledger-date">
                  {r.date
                    ? dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                    : af
                      ? "Datum moet nog bevestig word"
                      : "Date to be confirmed"}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
          <p className="measure mt-12 text-soft">{t.closing}</p>
        </div>
      </section>
    </>
  );
}
