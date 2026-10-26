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
      title: "The Register",
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
  },
  zh: {
    meta: {
      title: "登记册",
      description:
        "Oryx 理工学院登记册：学院走过的每一步公开的路，说了就记下日期，最新的在前，随工作落定而更新。",
      ogTitle: "登记册 | Oryx 理工学院",
      ogDescription: "学院走过的每一步公开的路，说了就记下日期，最新的在前。",
    },
    head: {
      title: "登记册。",
      lede: "学院公之于众的东西，说了就记下日期。没有定数的事不公布；伙伴没同意被指名之前，这里不指名。还没有日期的行，印着\"日期待确认\"。",
    },
    closing:
      "随工作落定而更新。日期公开了就印出来；在那之前，这一行印\"日期待确认\"。",
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
          <p className="measure mt-12 text-soft">{t.closing}</p>
        </div>
      </section>
    </>
  );
}
