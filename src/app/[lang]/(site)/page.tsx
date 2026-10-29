import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, offers, register, ventures, schemaIds } from "@/lib/site";
import { siteZh, offersZh, registerZh, venturesZh } from "@/lib/site-zh";
import { insights } from "@/lib/content";
import { alternates, chrome, langFromParams } from "@/lib/i18n";
import {
  GlyphResearch,
  GlyphPractice,
  GlyphVentures,
} from "@/components/site/glyphs";

function Glyph({ name }: { name: "research" | "practice" | "ventures" }) {
  if (name === "research") return <GlyphResearch className="h-full w-full" />;
  if (name === "practice") return <GlyphPractice className="h-full w-full" />;
  return <GlyphVentures className="h-full w-full" />;
}

/**
 * The homepage, laid out as one scroll composition:
 *
 *   hero (scrub) · positioning (flow) · 03 silent divider (flow) ·
 *   the three kinds of work (PIN) · what runs today (flow) · practice
 *   peak (PIN) · research zigzag (flow) · ventures reverse-zigzag
 *   (flow) · 07 silent divider (flow) · the register (flow) · close
 *   (PIN) · footer.
 *
 * Three pins, two silent dividers, one pinned peak. No device twice in
 * a row. The core plates run in act order: 01, 02, 03, 05, 04, 08, 07,
 * 10 (Image Asset Manifest v4).
 */
const copy = {
  en: {
    meta: {
      title: "A New Polytechnic for Namibia",
      description: site.description,
    },
    positioning:
      "A new polytechnic for Namibia, working from Windhoek. Prelaunch, and pursuing accreditation with the NQA and the NTA. Every step is dated on the register below.",
    aboutLink: "About the institute",
    kinds: [
      {
        key: "research" as const,
        name: "Research",
        body: "Fieldwork, bulletin essays, and cited papers on Namibia's working realities. Free before anything is charged.",
        link: "Read the research",
      },
      {
        key: "practice" as const,
        name: "Practice",
        body: "Crash courses, business counselling, market R&D, rapid response training. Delivered to Namibian standards.",
        link: "See the practice",
      },
      {
        key: "ventures" as const,
        name: "Ventures",
        body: "Small operating companies the institute opens to test sectors. Each one is a live classroom and a live lab.",
        link: "See the ventures",
      },
    ],
    kindsTitle: "How the institute works.",
    runsTitle: "What runs today.",
    runsBody:
      "Six offers, live from the office in Windhoek. Two teaching departments run crash and short courses only; the practice and the free Directory run beside them. What they promise is work, because credentials come only after accreditation.",
    researchTitle: "Research runs from day one.",
    researchLine:
      "No buildings are needed for this work, so no buildings delay it.",
    practiceTitle: "Practice.",
    practiceBody:
      "Work measured and finished to standard, with every tool named.",
    venturesTitle: "Small companies, real customers.",
    registerMeta: "Dated as the work lands, public to read.",
    closeTitle: "One email starts it.",
    closeBody:
      "Applications, research enquiries, partnerships and press all begin with one message, and the reply comes from a person. Nothing is committed until both sides agree.",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
    seeWhatRuns: "See what runs now",
    apply: "Apply",
    read: "Read",
    dateTbc: "Date to be confirmed",
  },
  zh: {
    meta: {
      title: "纳米比亚的一所新理工学校，温得和克",
      description: siteZh.description,
    },
    positioning:
      "纳米比亚的一所新理工学校，在温得和克开展工作。开办之前，正在向 NQA 与 NTA 申请认证。每一步都带日期，记在下面的登记册里。",
    aboutLink: "关于学院",
    kinds: [
      {
        key: "research" as const,
        name: "研究",
        body: "田野调查、公报文章，以及注明出处的论文，写纳米比亚真实的营商现实。在收取任何费用之前，先免费公开。",
        link: "阅读研究",
      },
      {
        key: "practice" as const,
        name: "实务",
        body: "速成课、经营咨询、市场调研、快速响应培训，按纳米比亚的标准交付。",
        link: "看实务",
      },
      {
        key: "ventures" as const,
        name: "实业",
        body: "学院为了检验一个行业而开设的小型运营公司。每一项都是一间活的课堂，一个实作实验室。",
        link: "看实业",
      },
    ],
    kindsTitle: "这个学院怎么做事。",
    runsTitle: "今天在运转的。",
    runsBody:
      "六项服务，从温得和克的办公室直接开工。两个教学系只开速成课与短期课程；实务与免费的资源目录在旁运转。它们承诺的是活儿，因为资质要等认证之后。",
    researchTitle: "研究从第一天就开始。",
    researchLine:
      "这件事不需要房子，房子也就耽误不了它。",
    practiceTitle: "实务。",
    practiceBody:
      "做出来、立得住的活，有度量，按标准收尾，每一件工具都有名字。",
    venturesTitle: "小公司，真客户。",
    registerMeta: "工作落定之日，即是入册之时，人人可读。",
    closeTitle: "一封邮件，事情就开始。",
    closeBody:
      "申请、调研委托、合作与媒体，都从一封邮件开始，回信的是人。双方同意之前，不会定下任何事。",
    writeOffice: "给办公室写信",
    readFaq: "读常见问题",
    seeWhatRuns: "看今天在运转的",
    apply: "申请",
    read: "阅读",
    dateTbc: "日期待确认",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  return {
    title: copy[lang].meta.title,
    description: copy[lang].meta.description,
    alternates: alternates(lang, "/", site.url),
    openGraph: {
      title: copy[lang].meta.title,
      description: copy[lang].meta.description,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/`,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: copy[lang].meta.title,
        },
      ],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const s = zh
    ? {
        headline: siteZh.headline,
        heroSub: siteZh.heroSub,
        offers: offersZh,
        register: registerZh,
        ventures: venturesZh,
      }
    : {
        headline: site.headline,
        heroSub: site.heroSub,
        offers,
        register,
        ventures,
      };
  const latest = insights[insights.length - 1];
  const kindHref: Record<string, string> = {
    research: zh ? "/zh/research" : "/research",
    practice: zh ? "/zh/practice" : "/practice",
    ventures: zh ? "/zh/ventures" : "/ventures",
  };

  const dateFmt = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
        alternateName: zh ? siteZh.tradingName : site.tradingName,
        url: site.url,
        email: site.email,
        foundingDate: "2026",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "NA",
        },
        sameAs: site.socials.map((x) => x.href),
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        url: site.url,
        /* One WebSite entity, one canonical name, in both locales:
           the localized name rides as alternateName so the graph does
           not disagree with itself. */
        name: site.tradingName,
        alternateName: siteZh.tradingName,
        publisher: { "@id": schemaIds.org },
        inLanguage: lang,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Hero: the oryx on the terracotta field, three planes moving at
          three rates. The photograph breathes at its own depth; the
          nameplate recedes a hair; the line beneath it drifts. */}
      <section className="hero" data-sc-act="scrub">
        <div className="hero-media" data-sc-parallax="0.45" aria-hidden="true">
          <Image
            src="/images/kinfolk/01-hero-oryx.jpg"
            alt=""
            width={1122}
            height={1402}
            priority
            fetchPriority="high"
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="hero-content shell">
          <div data-sc-parallax="-0.06">
            <h1 className="hero-title max-w-[13ch]">{s.headline}</h1>
          </div>
          <div className="mt-6" data-sc-parallax="0.08">
            <p className="hero-sub max-w-[44ch]">{s.heroSub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#what-runs" className="btn btn--cream">
                {t.seeWhatRuns}
              </a>
              <Link
                href={zh ? "/zh/apply" : "/apply"}
                className="btn btn--cream"
              >
                {t.apply}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning: the sentence, with the stone beside it. The
          about link gives the institute page a contextual inbound
          route, not only the chrome. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell positioning">
          <p className="lede measure text-ink">{t.positioning}</p>
          <Link
            href={zh ? "/zh/about" : "/about"}
            className="link-type mt-6 inline-block"
          >
            {t.aboutLink} <span className="arr" aria-hidden="true">→</span>
          </Link>
          <p className="meta mt-10">
            <Link href={zh ? "/" : "/zh"} className="link-type">
              {chrome[lang].langNote}
            </Link>
          </p>
          <figure className="positioning-plate" data-sc-in>
            <Image
              src="/images/kinfolk/02-stone.jpg"
              alt="One weathered stone specimen, centred on cream paper"
              width={1150}
              height={1150}
              sizes="(min-width: 1024px) 22rem, min(78vw, 26rem)"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* First silent divider: wood and rope, a breath before the
          three kinds of work. No text, no overlay, one full viewport. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/03-wood-rope-divider.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The three kinds of work, pinned: one row at a time,
          cross-faded. Ink ground, no cards, each row answers with its
          own page. */}
      <section
        className="on-ink"
        style={{ background: "var(--ink)", color: "var(--ivory)" }}
        data-sc-act="pin"
        data-sc-span="2.5"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="shell flex h-full flex-col justify-center py-24">
            <h2 className="h-section max-w-[18ch]">{t.kindsTitle}</h2>
            <div className="engine-rows mt-16 md:mt-24" data-sc-rows>
              {t.kinds.map((e) => (
                <article className="engine-row" data-sc-row key={e.key}>
                  <div className="engine-row-mark" aria-hidden="true">
                    <Glyph name={e.key} />
                  </div>
                  <div className="engine-row-body">
                    <h3 className="engine-row-name">{e.name}</h3>
                    <p className="mt-5 max-w-[46ch] body-lg leading-relaxed">
                      {e.body}
                    </p>
                    <Link
                      href={kindHref[e.key]}
                      className="btn--quiet btn--quiet--ivory mt-7"
                      aria-label={zh ? `${e.link}${e.name}` : `${e.link} ${e.name}`}
                    >
                      {e.link}{" "}
                      <span className="arr" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What runs today: six offers, hairline ledger, no images.
          The tag sits far right; the verbal CTA ends the sentence. */}
      <section id="what-runs" className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <p className="measure mt-6 text-soft">{t.runsBody}</p>
          <div className="offers mt-14" data-sc-in data-sc-stagger="80">
            {s.offers.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="offer-line">
                    {o.line}{" "}
                    <Link
                      href={
                        o.cta.href.startsWith("/")
                          ? `${zh ? "/zh" : ""}${o.cta.href}`
                          : o.cta.href
                      }
                      className="offer-cta"
                      aria-label={zh ? `${o.name}，${o.cta.label}` : `${o.cta.label} ${o.name}`}
                    >
                      {o.cta.label}{" "}
                      <span className="arr" aria-hidden="true">→</span>
                    </Link>
                  </p>
                </div>
                <p className="offer-tag">{o.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice peak: maker's hands, pinned for three viewports.
          The copy arrives on a small cream block, bottom left. */}
      <section className="peak" data-sc-act="pin" data-sc-span="3">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/kinfolk/05-hands-peak.jpg"
              alt="A pair of hands mid-task in a shaft of hard daylight"
              width={1250}
              height={1000}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h2 className="h-section">{t.practiceTitle}</h2>
            <p className="peak-line">{t.practiceBody}</p>
          </div>
        </div>
      </section>

      {/* Research pull: the notebook plate, the latest Bulletin. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-in>
            <Image
              src="/images/kinfolk/04-notebook.jpg"
              alt="A bound maroon notebook with ribbon, centred on cream paper"
              width={1250}
              height={1000}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div>
            <h2 className="h-section max-w-[20ch]">{t.researchTitle}</h2>
            <p className="measure mt-6 text-soft">{latest.dek}</p>
            <div className="panel mt-8 p-7 md:p-9" data-sc-in>
              <p className="eyebrow--ink eyebrow">{latest.no}</p>
              <h3 className="h-sub mt-3">{latest.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
                {latest.body[0].slice(0, 220)}…
              </p>
              <Link
                href={zh ? "/zh/resources#bulletin" : "/resources#bulletin"}
                className="btn--quiet mt-6"
              >
                {zh ? "阅读公报" : "Read the Bulletin"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="lede measure mt-10 text-ink">{t.researchLine}</p>
          </div>
        </div>
      </section>

      {/* Ventures: paragraph left, the spa plate right. Corner Spa is
          the first venture lab, named. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig md:order-2" data-sc-in>
            <Image
              src="/images/kinfolk/08-spa-dish.jpg"
              alt="Folded linen, a stone and a ceramic bowl, centred on cream paper"
              width={1000}
              height={1000}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
            />
          </figure>
          <div className="md:order-1">
            <h2 className="h-section max-w-[16ch]">{t.venturesTitle}</h2>
            <p className="measure mt-6 text-soft">{s.ventures.body}</p>
            <div className="hair-t mt-10 pt-8" data-sc-in>
              <p className="offer-tag">{s.ventures.cornerSpa.status}</p>
              <h3 className="h-sub mt-2">{s.ventures.cornerSpa.name}</h3>
              <p className="mt-3 max-w-[44ch] text-soft">
                {s.ventures.cornerSpa.line}
              </p>
              <Link
                href={zh ? "/zh/ventures" : "/ventures"}
                className="btn--quiet mt-5"
              >
                {zh ? "阅读 Corner Spa" : "Read about Corner Spa"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second silent divider: Windhoek, a breath before the
          ledger. No text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/07-windhoek-divider.jpg"
            alt=""
            width={1250}
            height={1000}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The register: dated, public, updated as the work lands. The
          ledger stamps in one row at a time. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">
              {zh ? "登记册。" : "The register."}
            </h2>
            <p className="meta">{t.registerMeta}</p>
          </div>
          <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
            {s.register.map((r, i) => (
              <div className="ledger-row" key={i}>
                <p className="ledger-date">
                  {r.date
                    ? dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                    : t.dateTbc}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close: the wax seal, pinned for two viewports. One email
          starts it, on a small cream block, maroon button. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/kinfolk/10-wax-seal.jpg"
              alt="A maroon wax seal with ribbon, centred on cream paper"
              width={1150}
              height={1150}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h2 className="h-section">{t.closeTitle}</h2>
            <p className="peak-line">{t.closeBody}</p>
            <a href={`mailto:${site.email}`} className="btn mt-8">
              {t.writeOffice}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
