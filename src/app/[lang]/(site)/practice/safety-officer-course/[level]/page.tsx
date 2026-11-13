import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";
import { getSafetyLevel, safetyLevels } from "@/lib/safety";

/**
 * One level of the safety officer course: the plate hero under a
 * gentle scrub, the module outline as hairline rows (H3 per module),
 * the module's own plate where the bible assigns one, assessment and
 * outcomes as lists, the fee and date fields printing their
 * publication date rather than a guess, the concrete tail plate, and
 * the register-interest door.
 */

const DURATION_LABEL = {
  en: { "level-1-induction": "1 day", "level-2-officer": "5 days", "level-3-management": "10 days, modular" },
  zh: { "level-1-induction": "一天", "level-2-officer": "五天", "level-3-management": "十天，模块化" },
} as const;

const CRUMB = {
  en: { practice: "Practice", course: "Safety officer course" },
  zh: { practice: "实务", course: "安全员课程" },
} as const;

const CLOSE = {
  en: {
    title: "One message holds your place.",
    body: "Register your interest through the application form selecting 'Safety training'. The office replies within three working days, and you hear the intake dates the moment they are set.",
  },
  zh: {
    title: "一封邮件，占住你的位置。",
    body: "在申请表中选择“安全培训”登记意向。办公室三个工作日内回复，开班日期一定，你第一时间知道。",
  },
} as const;

const HERO_ALT = {
  "level-1-induction": {
    en: "A matte forest-green hard hat seen from underneath, the X-strap suspension centred on cream paper",
    zh: "一顶哑光森林绿安全帽的仰视图，X 形帽带悬吊系统居中于米色纸上",
  },
  "level-2-officer": {
    en: "A green hard hat resting on a brown leather steel-toe boot on red gravel, under a hazy industrial sky",
    zh: "一顶绿色安全帽搁在棕色皮革钢头靴上，红砾石地面，远处是朦胧的工业天际",
  },
  "level-3-management": {
    en: "A steel clipboard with a blank cream sheet and a graphite pencil, centred on cream paper",
    zh: "一块带空白米色纸与石墨铅笔的钢制写字板，居中于米色纸上",
  },
} as const;

export function generateStaticParams() {
  return safetyLevels.flatMap((l) => [
    { lang: "en", level: l.slug },
    { lang: "zh", level: l.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; level: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, level } = await params;
  const lang = langFromParams({ lang: rawLang });
  const l = getSafetyLevel(level);
  if (!l) return {};
  const t = l[lang];
  return {
    /* Absolute: the spec'd titles already carry the brand, and the
       root template would print it twice. */
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: alternates(
      lang,
      `/practice/safety-officer-course/${l.slug}`,
      site.url
    ),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/practice/safety-officer-course/${l.slug}`,
      images: [
        {
          url: `/brand/og/safety-${l.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: t.metaTitle,
        },
      ],
    },
  };
}

export default async function SafetyLevelPage({
  params,
}: {
  params: Promise<{ lang: string; level: string }>;
}) {
  const { lang: rawLang, level } = await params;
  const lang = langFromParams({ lang: rawLang });
  const zh = lang === "zh";
  const l = getSafetyLevel(level);
  if (!l) notFound();
  const t = l[lang];
  const A = (path: string) => (zh ? `/zh${path}` : path);
  const crumb = CRUMB[lang];
  const close = CLOSE[lang];
  const heroAlt = HERO_ALT[l.slug][lang];
  /* The per-offer apply route: /apply/safety-level-N preselects the
     field of interest in the composer without a query string. */
  const applyHref =
    l.slug === "level-1-induction"
      ? "/apply/safety-level-1"
      : l.slug === "level-2-officer"
        ? "/apply/safety-level-2"
        : "/apply/safety-level-3";

  /* The English original, printed beneath the Chinese page: the same
     fields the English route renders, assembled as ledger paragraphs
     so the zh page carries its own full curriculum text. */
  const enLedger = zh
    ? [
        l.en.lede,
        l.en.audience.body,
        ...l.en.modules.map((m) => `${m.no}. ${m.name}. ${m.line}`),
        `Assessment: ${l.en.assessment.join(" ")}`,
        `Outcomes: ${l.en.outcomes.join("; ")}.`,
        `${l.en.credential}: ${l.en.credentialNote}`,
        `Fee: ${l.en.fee} Dates: ${l.en.dates}`,
      ]
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${site.url}${A(`/practice/safety-officer-course/${l.slug}`)}#course`,
        name: t.h1.replace(".", ""),
        description: t.metaDescription,
        courseCode: l.code,
        inLanguage: "en-NA",
        educationalCredentialAwarded: t.credential,
        provider: {
          "@type": "EducationalOrganization",
          "@id": schemaIds.org,
          name: site.legalName,
          address: {
            "@type": "PostalAddress",
            addressLocality: site.city,
            addressCountry: "NA",
          },
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: {
            "@type": "Place",
            name: `${site.city}, ${site.country}`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: crumb.practice,
            item: `${site.url}${A("/practice")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: crumb.course,
            item: `${site.url}${A("/practice/safety-officer-course")}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t.navName,
            item: `${site.url}${A(`/practice/safety-officer-course/${l.slug}`)}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero plate: the level's own object, full measure,
          drifting at a gentler rate than the page. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src={l.hero.src}
              alt={heroAlt}
              width={l.hero.width}
              height={l.hero.height}
              priority
              fetchPriority="high"
              quality={80}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* The head: what this level is, and who sits it. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="meta">{t.navName} · {DURATION_LABEL[lang][l.slug]}</p>
          <h1 className="h-display mt-4 max-w-[18ch]">{t.h1}</h1>
          <p className="lede measure mt-6 text-soft">{t.lede}</p>
          <div className="hair-t mt-12 pt-10" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.audience.label}</p>
            <p className="measure mt-4 text-soft">{t.audience.body}</p>
          </div>
        </div>
      </section>

      {/* The outline: one hairline row per module. The module the
          bible assigns a plate to carries it, unmasking from its
          left edge. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.outlineEyebrow}</p>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {t.modules.map((m) => (
              <div className="ledger-row ledger-row--flat" key={m.no} id={`module-${m.no}`}>
                <p className="ledger-date">{m.no}</p>
                <div>
                  <h2 className="h-sub">{m.name}</h2>
                  <p className="mt-3 max-w-[62ch] text-soft">{m.line}</p>
                  {m.plate && (
                    <figure className="plate-fig module-plate" data-sc-reveal>
                      <Image
                        src={m.plate.src}
                        alt={zh ? m.plate.altZh : m.plate.alt}
                        width={1122}
                        height={1402}
                        sizes="(min-width: 768px) 16rem, 60vw"
                        className="h-auto w-full"
                        loading="eager"
                      />
                    </figure>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment, outcomes, the document, the fee, the dates: the
          facts a buyer needs, in public HTML, ungated. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid gap-12" data-sc-in data-sc-stagger="70">
          <div>
            <p className="eyebrow eyebrow--ink">{t.assessmentEyebrow}</p>
            <ol className="mt-5 grid gap-3 text-soft">
              {t.assessment.map((a, i) => (
                <li key={i} className="max-w-[62ch]">{a}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow eyebrow--ink">{t.outcomesEyebrow}</p>
            <ul className="mt-5 grid gap-3 text-soft">
              {t.outcomes.map((o, i) => (
                <li key={i} className="max-w-[62ch]">{o}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-8 md:p-10">
            <p className="eyebrow eyebrow--ink">{t.credentialEyebrow}</p>
            <h2 className="h-sub mt-3">{t.credential}</h2>
            <p className="measure mt-4 text-soft">{t.credentialNote}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.feeEyebrow}</p>
              <p className="measure mt-4 text-soft">{t.fee}</p>
            </div>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.datesEyebrow}</p>
              <p className="measure mt-4 text-soft">{t.dates}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The tail plate: concrete, silent, full-bleed, no text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/texture/47-concrete.jpg"
            alt=""
            width={1254}
            height={1254}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The English original, printed beneath the Chinese page. */}
      {zh && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">英文原文 · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {enLedger.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The close: the register-interest door for this level. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <h2 className="h-section max-w-[20ch]">{close.title}</h2>
          <p className="measure mt-6 text-soft">{close.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={A(applyHref)} className="btn">
              {t.applyCta}
            </Link>
            <Link
              href={A("/practice/safety-officer-course")}
              className="btn--quiet"
            >
              {zh ? "看安全员培训全部课程" : "See the Safety Officer Training programme"}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link href={A("/register")} className="btn--quiet">
              {zh ? "读公开登记册" : "Read the register"}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
