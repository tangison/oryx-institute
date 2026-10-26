import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { appliedSpine, schools } from "@/lib/content";
import { appliedSpineAf, schoolsAf } from "@/lib/content-af";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Schools",
      description:
        "Three schools, one spine: Technology first, then Engineering, then Science, with applied problem-solving running through all of them. Open for enquiry.",
      ogTitle: "The Schools | Oryx Institute",
      ogDescription:
        "Three schools, one spine: Technology, Engineering, Science. Open for enquiry, honest about timing.",
      ldName: "The schools of Oryx Institute",
    },
    headTitle: "Three schools, one spine.",
    headLede:
      "The institute grows in order, not all at once: Technology first, because it needs the least; Engineering second, because the workshop has to be real; Science third, because the laboratory cannot be faked. Running through all three, the same spine: applied problem-solving, named on every certificate. Dates are confirmed by the Principal's office at the point of application, never printed in advance.",
    strip: "School of ",
    first: " first.",
    enquire: "Enquire to the office",
    spineEyebrow: "The fourth discipline",
    spineSuffix: ", everywhere.",
  },
  af: {
    meta: {
      title: "Die Skole",
      description:
        "Drie skole, een ruggengraat: Tegnologie eerste, dan Ingenieurswese, dan Wetenskap, met toegepaste probleemoplossing deur alles heen. Oop vir navraag.",
      ogTitle: "Die Skole | Oryx Instituut",
      ogDescription:
        "Drie skole, een ruggengraat: Tegnologie, Ingenieurswese, Wetenskap. Oop vir navraag, eerlik oor tydsberekening.",
      ldName: "Die skole van Oryx Instituut",
    },
    headTitle: "Drie skole, een ruggengraat.",
    headLede:
      "Die instituut groei in volgorde, nie alles gelyktydig nie: Tegnologie eerste, omdat dit die minste benodig; Ingenieurswese tweede, omdat die werkswinkel werklik moet wees; Wetenskap derde, omdat die laboratorium nie geveins kan word nie. Deur al drie loop dieselfde ruggengraat: toegepaste probleemoplossing, genoem op elke sertifikaat. Datums word by aansoek deur die Prinsipaal se kantoor bevestig, nooit vooraf gedruk nie.",
    strip: "Skool vir ",
    first: " eerste.",
    enquire: "Doen by die kantoor navraag",
    spineEyebrow: "Die vierde dissipline",
    spineSuffix: ", oral.",
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
    alternates: alternates(lang, "/schools", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/schools.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const list = af ? schoolsAf : schools;
  const spine = af ? appliedSpineAf : appliedSpine;
  const A = (path: string) => (af ? `/af${path}` : path);

  const schoolsLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.meta.ldName,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "EducationalOrganization",
        name: `${site.legalName}, ${s.name}`,
        url: `${site.url}${A("/schools")}#${s.id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolsLd) }}
      />

      <PageHead title={t.headTitle}>
        <p>{t.headLede}</p>
      </PageHead>

      {/* The place the schools will teach in: a plain classroom, held
          still, no text. Above the fold here, so it loads eagerly. */}
      <div className="divider overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="1.0">
          <Image
            src="/images/studio/studio-classroom.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* The three schools, status set in type weight, not pills */}
      {list.map((s) => (
        <section key={s.id} id={s.id} className="section">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                <p className="eyebrow">{s.phase}</p>
                <p className="lede text-soft">{s.status}</p>
              </div>
              <h2 className="h-section mt-5 max-w-[20ch]">
                {s.name.replace(t.strip, "")}
                {s.id === "technology" ? t.first : "."}
              </h2>
              <p className="lede measure mt-6">{s.lead}</p>
              <p className="measure mt-6 text-soft">{s.body}</p>
              <div className="mt-9">
                <Link href={A("/apply")} className="btn--quiet">
                  {t.enquire} <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* The spine: not a school */}
      <section className="cta-band section-lg on-ink">
        <div className="shell" data-sc-in data-sc-stagger="80">
          <p className="eyebrow eyebrow--ivory">{t.spineEyebrow}</p>
          <h2 className="h-section mt-5 max-w-[22ch]">
            {spine.name}
            {t.spineSuffix}
          </h2>
          <p className="measure mt-6 text-ivory-80">{spine.line}</p>
        </div>
      </section>
    </>
  );
}
