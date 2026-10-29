import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ventures, site, schemaIds } from "@/lib/site";
import { venturesZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Small Companies, Real Customers",
      description:
        "Small operating companies Oryx Institute opens to test sectors. Corner Spa, wellness and service operations, is the first.",
      ogTitle: "Ventures | Oryx Institute",
      ogDescription:
        "Small operating companies the institute opens to test sectors. Corner Spa is the first.",
      ldName: "Ventures",
      ldDescription:
        "The ventures at Oryx Institute: small operating companies opened to test sectors, starting with Corner Spa.",
    },
    howEyebrow: "How ventures work",
    lessonEyebrow: "The classroom on the floor",
    lessonBody:
      "Every venture doubles as a teaching site. Corner Spa is where bookkeeping is practised on real invoices, where scheduling is practised on real appointments, and where a service standard is written, followed and audited — not recited. Students rotate through the floor the way apprentices always have: they do the work under supervision, they write down what they did, and they hand the notes on. What a diploma claims, the venture shows.",
    exitLede:
      "A venture cannot be faked. It is judged by the two things that cannot lie: whether it works, and whether anyone pays for it.",
    exitBody:
      "Every course the institute teaches ends in something that works and something that sells. Ventures are how the institute holds itself to that rule: small companies, run to standard, their openings dated in the public register.",
    nextEyebrow: "Next",
    readRegister: "Read the register",
    briefUs: "Brief the ventures desk",
    futureNote:
      "More labs are opened as sectors warrant them. What is not ready, says so.",
  },
  zh: {
    meta: {
      title: "实业",
      description:
        "Oryx 理工学院的实业：学院想弄懂一个行业，就在其中开一家小公司，让真实的顾客决定它行不行。每一家实业同时是一间活的教室：学生在它的地板上学习。第一项是 Corner Spa，康养与服务运营，现以概念公布：场地、执照与服务单正在逐项推进；开业之日，登记册记下日期。",
      ogTitle: "实业 | Oryx 理工学院",
      ogDescription:
        "学院为弄懂一个行业而开设的小公司。Corner Spa 是第一项。",
      ldName: "实业",
      ldDescription:
        "Oryx 理工学院的实业：为检验行业而开的小型运营公司，从 Corner Spa 开始。",
    },
    howEyebrow: "实业怎么运作",
    lessonEyebrow: "地板上的教室",
    lessonBody:
      "每一间实业同时是一处教学现场。在 Corner Spa，簿记在真实发票上练习，排程在真实预约上练习，服务标准是写下来、执行下去、再接受审校的——不是背出来的。学生像历代学徒一样轮班上 floor：在督导下动手做事，把做过的事写下来，再把笔记交给下一个人。文凭上声称的，实业把它摆出来。",
    exitLede:
      "实业做不了假。它由两件不会说谎的事来评判：它能不能运转，以及有没有人愿意为它付钱。",
    exitBody:
      "学院教的每门课都结束于做得成、卖得掉的东西。实业就是学院对自己守这条规矩的方式：小公司，按标准经营，开业之日记入公开的登记册。",
    nextEyebrow: "下一项",
    readRegister: "读登记册",
    briefUs: "给实业案头写需求",
    futureNote:
      "行业到了该检验的时候，就再开一间。没准备好的，直说。",
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
    alternates: alternates(lang, "/ventures", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/ventures`,
      images: [
        {
          url: "/brand/og/ventures.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function VenturesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const v = zh ? venturesZh : ventures;
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/ventures")}`,
    description: t.meta.ldDescription,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero, a reverse-zigzag under scrub: the proposition on the
          left, the spa plate drifting at its own rate on the right. */}
      <section className="section" data-sc-act="scrub">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-16 lg:gap-24">
          <div data-sc-in>
            <h1 className="h-display max-w-[16ch]">{v.lead}</h1>
            <p className="measure mt-6 text-soft">{v.body}</p>
          </div>
          <figure className="plate-fig" data-sc-parallax="0.15">
            <Image
              src="/images/kinfolk/08-spa-dish.jpg"
              alt="A terracotta dish with folded linen, a river stone and a beeswax candle, centred on sand-beige linen"
              width={1000}
              height={1000}
              sizes="(min-width: 768px) 26rem, 88vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* How ventures work, wiped in from the left. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.howEyebrow}</p>
            <div data-sc-reveal>
              <p className="lede measure mt-6">{t.exitLede}</p>
            </div>
            <p className="measure mt-6 text-soft" data-sc-in>
              {t.exitBody}
            </p>
          </div>
          <div className="hair-t mt-12 pt-12">
            <p className="eyebrow eyebrow--ink">{t.lessonEyebrow}</p>
            <p className="measure mt-6 text-soft" data-sc-in>
              {t.lessonBody}
            </p>
          </div>
        </div>
      </section>

      {/* The peak: Corner Spa, named over its own plate on its own
          sand ground, pinned for two viewports. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div
            className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
            style={{ background: "var(--sand)" }}
            data-sc-scale
          >
            <Image
              src="/images/kinfolk/08-spa-dish.jpg"
              alt="A terracotta dish with folded linen, a river stone and a beeswax candle, centred on sand-beige linen"
              width={1000}
              height={1000}
              sizes="(min-width: 1024px) 44rem, 92vw"
              className="h-full w-auto max-w-full object-contain"
              loading="eager"
            />
            <div className="peak-scrim" data-sc-scrim>
              <p className="offer-tag">{v.cornerSpa.status}</p>
              <h2 className="h-section mt-3">{v.cornerSpa.name}</h2>
              <p className="peak-line">{v.cornerSpa.line}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The full story of the first venture, on cream. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <p className="measure text-soft">{v.cornerSpa.body}</p>
        </div>
      </section>

      {/* What comes next: silent, small. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 md:grid-cols-2">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.nextEyebrow}</p>
            <p className="lede measure mt-5">{v.futureLine}</p>
            <p className="measure mt-6 text-soft">{t.futureNote}</p>
            <div className="mt-8">
              <Link href={A("/register")} className="btn--quiet">
                {t.readRegister} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Manifest v4 assigns no plate beyond the spa shots above.
              TODO image (founder to commission, if wanted): a quiet
              ventures divider in the site register — e.g. a chalk line
              and folded ledger on walnut — to breathe before the close. */}
          <div className="hair-t pt-14" data-sc-in>
            <h2 className="h-section max-w-[20ch]">
              {zh ? "有一个你认为 Oryx 该检验的行业？" : "A sector you think Oryx should test?"}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={A("/apply#market-rd")} className="btn">
                {t.briefUs}
              </Link>
              <a href={`mailto:${site.email}`} className="btn--quiet">
                {zh ? "给办公室写信" : "Write to the office"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
