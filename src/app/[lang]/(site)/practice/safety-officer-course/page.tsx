import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, schemaIds } from "@/lib/site";
import { siteZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";
import { safetyLevels, safetyLanding } from "@/lib/safety";

/**
 * The safety officer course, on its own landing: the officer portrait
 * opens the page full-bleed under scrub with the proposition on a
 * scrim block; the three levels run as hairline rows (no card grids);
 * the concrete plate breathes between the levels and the instructor;
 * the page closes on the register-interest door.
 *
 * Nothing here invents a fee, a date, or a name: the fields that are
 * not yet confirmed print their publication date (15 November 2026)
 * and the register records the rest as it lands.
 */

const EN_LEDGER = [
  "A Namibian occupational programme, taught in Windhoek and examined on paper and on site. Three levels: a one-day General Worker Safety Induction (hazard identification, PPE, emergency procedures, legal duties; a 20-question multiple-choice test at 80 percent), a five-day Safety Representative and Site Safety Officer course (the legal framework, HIRA methodology, incident investigation, construction-site hazards, the safety file, and a practical site walkthrough), and a ten-day modular Advanced Safety Management programme (SHEQ systems, construction and mining regulations in depth, contractor management, root-cause investigation, auditing, and training of trainers).",
  "How we teach: examinations are written on paper; practical assessments run against a rubric the learner sees in advance; results arrive within five working days. Every learner receives the printed course manual, a clipboard and a pen on day one, and Level 2 upwards adds the green hard hat. Courses run at a hired training venue in Windhoek, disclosed as a hired venue, and the practical walkthroughs happen at a real partner site.",
  "The lead instructor is a Namibian professional with recognised credentials — Saiosh, SAMTRAC or equivalent — hired and named before Cohort 1 opens. Oryx does not teach the subject without a credentialed lead instructor. Curriculum and pricing publish on 15 November 2026; Cohort 1 is planned for January 2027.",
  "What you need to know: the programme is industry-orientated professional development. Certificates issued before accreditation are internal records of completion, not NQF-credit-bearing qualifications. Formal vocational training programmes commence only after NTA provider registration has been granted; NQA accreditation is being pursued in parallel and will be announced on the public register.",
  "What a learner leaves with, level by level. The one-day induction sends a worker back to the gate able to name the hazards of their own patch, wear and inspect the protection the task requires, and raise an alarm the way the emergency plan expects. The five-day officer course ends with a written examination, a risk assessment written at the partner worksite, a toolbox talk delivered to the cohort, and a walkthrough scored against the published rubric; the graduate keeps registers, permits and certificates current, and can stand in front of an inspector with the file in order.",
  "The ten-day management programme is modular by design: each module is examined on its own, modules can be taken singly and priced singly, and the certificate comes only when the set is complete. It is built for the person who signs the paperwork: SHEQ systems, the construction and mining regulations read in depth, contractor control, root-cause investigation, audit technique, and a module on training others. Employers who need one seat on one module book exactly that seat; employers who need an officer for the whole file book the set.",
];

const DURATIONS = {
  en: {
    "level-1-induction": "1 day",
    "level-2-officer": "5 days",
    "level-3-management": "10 days, modular",
  },
  zh: {
    "level-1-induction": "一天",
    "level-2-officer": "五天",
    "level-3-management": "十天，模块化",
  },
} as const;

const SHORT_DESC = {
  en: {
    "level-1-induction":
      "Every new employee on any site: hazards, PPE, emergencies, legal duties. One day, one certificate of attendance.",
    "level-2-officer":
      "Representatives and site supervisors: HIRA, incident investigation, construction hazards, the safety file, and a practical walkthrough.",
    "level-3-management":
      "Senior officers and SHE managers: SHEQ systems, regulation in depth, contractor control, root cause, audit. Modular.",
  },
  zh: {
    "level-1-induction":
      "任何工地上的每一位新员工：危险源、防护装备、应急程序、法律义务。一天，一份结业证书。",
    "level-2-officer":
      "安全代表与现场主管：HIRA、事故调查、施工安全、安全档案，加一次实操巡查。",
    "level-3-management":
      "高级安全员与 SHE 经理：SHEQ 体系、条例深读、承包商管控、根因分析、审计。模块化。",
  },
} as const;

const CRUMB = {
  en: { practice: "Practice", course: "Safety officer course" },
  zh: { practice: "实务", course: "安全员课程" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const t = safetyLanding[lang];
  return {
    /* Absolute: the spec'd titles already carry the brand, and the
       root template would print it twice. */
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: alternates(lang, "/practice/safety-officer-course", site.url),
    openGraph: {
      title: t.ogTitle,
      description: t.metaDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/practice/safety-officer-course`,
      images: [
        {
          url: "/brand/og/safety-officer-course.jpg",
          width: 1200,
          height: 630,
          alt: t.ogTitle,
        },
      ],
    },
  };
}

export default async function SafetyLandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = safetyLanding[lang];
  const A = (path: string) => (zh ? `/zh${path}` : path);
  const dur = DURATIONS[lang];
  const desc = SHORT_DESC[lang];
  const crumb = CRUMB[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
        alternateName: zh ? siteZh.tradingName : site.tradingName,
        url: site.url,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "NA",
        },
        hasCourse: safetyLevels.map((l) => ({
          "@type": "Course",
          "@id": `${site.url}${A("/practice/safety-officer-course")}/${l.slug}#course`,
          name: l[lang].h1,
          description: l[lang].metaDescription,
          courseCode: l.code,
          inLanguage: "en-NA",
          provider: { "@id": schemaIds.org },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            location: {
              "@type": "Place",
              name: `${site.city}, ${site.country}`,
            },
          },
        })),
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

      {/* The hero: the officer portrait full-bleed under scrub, the
          proposition on a scrim block bottom left, the two doors. */}
      <section className="safety-hero" data-sc-act="scrub">
        <div className="safety-hero-media" aria-hidden="true">
          <div className="absolute inset-[-8%]" data-sc-parallax="0.5">
            <Image
              src="/images/kinfolk/safety/44-safety-officer.jpg"
              alt=""
              width={1402}
              height={1122}
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={80}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="safety-hero-scrim shell">
          <h1 className="h-section max-w-[20ch]">{t.h1}</h1>
          <p className="peak-line mt-5">{t.lede}</p>
          <p className="meta mt-5">{t.statusLine}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href={A("/apply/safety")} className="btn">
              {t.applyCta}
            </Link>
            <a href="#levels" className="btn--quiet">
              {t.seeCurriculum}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* The three levels, hairline rows: duration, the short of it,
          the outline door. No card grids, per the register. */}
      <section id="levels" className="section-lg" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.levelsEyebrow}</p>
          <h2 className="h-section mt-4 max-w-[18ch]">{t.levelsTitle}</h2>
          <div className="ledger mt-14" data-sc-in data-sc-stagger="80">
            {safetyLevels.map((l, i) => (
              <div className="ledger-row ledger-row--flat" key={l.slug}>
                <p className="ledger-date">{dur[l.slug]}</p>
                <div>
                  <h3 className="h-sub">
                    <Link
                      href={A(`/practice/safety-officer-course/${l.slug}`)}
                      className="link-type"
                    >
                      {l[lang].h1.replace(".", "")}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-soft">{desc[l.slug]}</p>
                  <Link
                    href={A(`/practice/safety-officer-course/${l.slug}`)}
                    className="btn--quiet mt-5"
                    aria-label={`${(lang === "zh"
                      ? ["一级大纲", "二级大纲", "三级大纲"]
                      : ["Level 1 outline", "Level 2 outline", "Level 3 outline"]
                    )[i]}: ${l[lang].h1}`}
                  >
                    {(lang === "zh"
                      ? ["一级大纲", "二级大纲", "三级大纲"]
                      : ["Level 1 outline", "Level 2 outline", "Level 3 outline"]
                    )[i]}{" "}
                    <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we teach: the delivery model, in prose. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8" data-sc-in data-sc-stagger="70">
          <p className="eyebrow eyebrow--ink">{t.howEyebrow}</p>
          {t.howBody.map((p, i) => (
            <p key={i} className="measure text-soft">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* A small silent divider: concrete, container-width, no text. */}
      <div
        className="divider divider--narrow overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.5">
          <Image
            src="/images/kinfolk/texture/47-concrete.jpg"
            alt=""
            width={1254}
            height={1254}
            sizes="(min-width: 768px) 70ch, 92vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The instructor, honestly a placeholder until the appointment
          lands: the herb-sprig card, the exact promise, no invented
          name and no AI face. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-reveal>
            <Image
              src="/images/kinfolk/people/45-staff-placeholder.jpg"
              alt={
                zh
                  ? "一张立起的空白米色卡片放在深胡桃木上，角上斜放一枝干香草——讲师肖像的诚实占位"
                  : "A blank cream card standing on dark walnut with a dried herb sprig across the corner, the honest placeholder for the instructor portrait"
              }
              width={1122}
              height={1402}
              sizes="(min-width: 768px) 14rem, 60vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.instructorEyebrow}</p>
            <h2 className="h-sub mt-4">{t.instructorName}</h2>
            <p className="meta mt-2">{t.instructorRole}</p>
            <p className="measure mt-5 text-soft">{t.instructorBody}</p>
          </div>
        </div>
      </section>

      {/* What you need to know: the NTA standing and the certificate
          clarification, stated exactly as the corrections demand. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.knowEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.knowNta}</p>
            <p className="measure mt-5 text-soft">{t.knowCertificate}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href={A("/register")} className="btn--quiet">
                {zh ? "读公开登记册" : "Read the public register"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link href={A("/faq")} className="btn--quiet">
                {zh ? "读常见问题" : "Read the FAQ"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The close: one door, the register-interest form. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <h2 className="h-section max-w-[20ch]">
            {zh ? "开班那天，第一时间知道。" : "First to know, the day enrolments open."}
          </h2>
          <p className="measure mt-6 text-soft">
            {zh
              ? "在申请表中选择“安全培训”登记意向，报名一开放，办公室当天与你联系。没有邮件列表，没有自动营销。"
              : "Register your interest through the application form selecting 'Safety training', and the office contacts you the day enrolments open. No mailing list, no automated marketing."}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={A("/apply/safety")} className="btn">
              {t.applyCta}
            </Link>
            <a href={`mailto:${site.email}`} className="btn--quiet">
              {zh ? "给办公室写信" : "Write to the office"}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Chinese page. */}
      {zh && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">英文原文 · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {EN_LEDGER.map((p, i) => (
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
