import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { offers, disciplines, site, schemaIds } from "@/lib/site";
import { offersAf, disciplinesAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Programmes: What Runs Today",
      description:
        "Six offers live at Oryx Institute: the Owner's Desk, crash and short courses in business administration and IT, market R&D, Rapid Response Training, and the free Oryx Directory.",
      ogTitle: "What Runs Today | Oryx Institute",
      ogDescription:
        "Six offers, live from Windhoek: teaching departments, the practice, and the free Directory.",
    },
    head: {
      eyebrow: "What runs today",
      title: "What runs today.",
      lede: "A polytechnic education stands on four legs. The institute teaches them together, because a problem never arrives divided into subjects. Today the teaching runs as crash courses and short courses in business administration and IT and related fields; the schools phase in behind as accreditation progresses.",
    },
    besideEyebrow: "Beside the disciplines",
    besideBody:
      "The disciplines describe the education being phased in; today the teaching runs as crash courses and short courses in business administration and IT and related fields, and nothing longer. Beside the teaching, the practice (the Owner's Desk, market research and development, Rapid Response Training) is live, and everything books the same way: one message to the Principal's office. The research and development page names what the institute is building behind it, and with whom.",
    readEyebrow: "How to read this page",
    readBody:
      "The disciplines describe direction, not a fixed catalogue. Programme and course offerings are confirmed by the Principal's office at the point of application, and the certificate is issued on completion. If your interest sits between two fields, say so in your message: applied problem-solving is itself one of the four.",
    applyNow: "Apply now",
    seeRnD: "See Research & Development",
    panelTitle: "Apply in one message",
    panelBody:
      "Applications are read by the Principal's office in Windhoek. Send your name, your contact and your field of interest.",
  },
  af: {
    meta: {
      title: "Programme: Wat Vandag Loop",
      description:
        "Ses aanbiedings lewendig by Oryx Instituut: die Eienaar se Lessenaar, kondens- en kortkursusse in besigheidsadministrasie en IT, marknavorsing, Spoedreaksie-opleiding, en die gratis Oryx-gids.",
      ogTitle: "Wat Vandag Loop | Oryx Instituut",
      ogDescription:
        "Ses aanbiedings, lewendig vanuit Windhoek: onderrigdepartemente, die praktyk, en die gratis Gids.",
    },
    head: {
      eyebrow: "Wat vandag loop",
      title: "Wat vandag loop.",
      lede: "'n Politegniek-opleiding staan op vier bene. Die instituut onderrig hulle saam, want 'n probleem kom nooit in vakke verdeel aan nie. Vandag loop die onderrig as kondens- en kortkursusse in besigheidsadministrasie en IT en verwante velde; die skole tree agteraan in namate akkreditering vorder.",
    },
    besideEyebrow: "Langs die dissiplines",
    besideBody:
      "Die dissiplines beskryf die opleiding wat ingestel word; vandag loop die onderrig as kondens- en kortkursusse in besigheidsadministrasie en IT en verwante velde, en niks langer nie. Langs die onderrig loop die praktyk (die Eienaar se Lessenaar, marknavorsing en -ontwikkeling, Spoedreaksie-opleiding) lewendig, en alles bespreek op dieselfde manier: een boodskap aan die Prinsipaal se kantoor. Die navorsings- en ontwikkelingsblad noem wat die instituut daaragter bou, en saam met wie.",
    readEyebrow: "Hoe om hierdie bladsy te lees",
    readBody:
      "Die dissiplines beskryf 'n rigting, nie 'n vaste katalogus nie. Program- en kursusaanbiedings word by aansoek deur die Prinsipaal se kantoor bevestig, en die sertifikaat word by voltooiing uitgereik. As jou belangstelling tussen twee velde val, sê so in jou boodskap: toegepaste probleemoplossing is self een van die vier.",
    applyNow: "Skryf nou in",
    seeRnD: "Sien navorsing en ontwikkeling",
    panelTitle: "Meld in een boodskap aan",
    panelBody:
      "Aansoeke word deur die Prinsipaal se kantoor in Windhoek gelees. Stuur jou naam, jou kontak en jou belangstellingsveld.",
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
    alternates: alternates(lang, "/programmes", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/programmes.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function ProgrammesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const offerList = af ? offersAf : offers;
  const disciplineList = af ? disciplinesAf : disciplines;
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.meta.ogTitle,
    itemListElement: offerList.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type":
          o.id === "business-administration" || o.id === "it"
            ? "Course"
            : "Service",
        name: o.name,
        description: o.line,
        provider: { "@type": "EducationalOrganization", "@id": schemaIds.org },
        url: `${site.url}${A("/programmes")}#${o.id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The six offers, in full */}
      <section className="section">
        <div className="shell">
          <div className="offers" data-sc-in data-sc-stagger="70">
            {offerList.map((o) => (
              <div className="offer" id={o.id} key={o.id}>
                <p className="offer-tag">{o.tag}</p>
                <h2 className="offer-name">{o.name}</h2>
                <p className="max-w-[46ch] text-soft">{o.line}</p>
                <p className="measure mt-3 text-[0.95rem] leading-relaxed text-soft">
                  {o.body}
                </p>
                <Link
                  href={o.cta.href.startsWith("/") ? A(o.cta.href) : o.cta.href}
                  className="btn--quiet mt-3"
                >
                  {o.cta.label} <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The measures: the ruler, the standard, the rigging. One quiet
          strip between the offers and the disciplines. */}
      <div className="shell grid grid-cols-3 gap-3 sm:gap-5" data-sc-act="flow" data-sc-in data-sc-stagger="80" aria-hidden="true">
        <figure className="plate aspect-[3/4]">
          <div className="plate-media" data-sc-parallax="0.35">
            <Image
              src="/images/studio/studio-rule.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 20rem, 34vw"
              className="object-cover"
            />
          </div>
        </figure>
        <figure className="plate mt-8 aspect-[3/4] sm:mt-12">
          <div className="plate-media" data-sc-parallax="0.25">
            <Image
              src="/images/studio/studio-horns.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 20rem, 34vw"
              className="object-cover"
            />
          </div>
        </figure>
        <figure className="plate aspect-[3/4]">
          <div className="plate-media" data-sc-parallax="0.4">
            <Image
              src="/images/studio/studio-rope.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 20rem, 34vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>

      {/* The disciplines the offers sit inside */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow eyebrow--ink">{t.besideEyebrow}</p>
            <p className="measure text-soft">{t.besideBody}</p>
          </div>

          <div
            className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4"
            data-sc-in
            data-sc-stagger="70"
          >
            {disciplineList.map((d) => (
              <div key={d.id} className="bg-paper p-8">
                <span
                  className={`text-[1.7rem] leading-none ${
                    d.glyph.length > 2 ? "font-serif" : "wordmark-cjk"
                  }`}
                  aria-hidden="true"
                >
                  {d.glyph}
                </span>
                <h3 className="mt-5 font-[500]">{d.name}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-soft">
                  {d.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to read this page + the apply close */}
      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="hair-t pt-14" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.readEyebrow}</p>
            <p className="measure mt-6 text-soft">{t.readBody}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href={A("/apply")} className="btn">
                {t.applyNow}
              </Link>
              <Link href={A("/research")} className="btn--quiet">
                {t.seeRnD} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10" data-sc-in>
            <h2 className="h-sub">{t.panelTitle}</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
              {t.panelBody}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="btn--quiet mt-6"
            >
              {site.email} <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
