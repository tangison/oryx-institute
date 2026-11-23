import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, status, schemaIds } from "@/lib/site";
import { siteAf, statusAf } from "@/lib/site-af";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/**
 * About is a visual statement of direction, not a prospectus. It names
 * what exists, keeps future work visibly future, and lets the broader
 * institute be understood through three connected kinds of work.
 */
const copy = {
  en: {
    meta: {
      title: "About Oryx Institute, a New Namibian Polytechnic",
      description: "Learn how Oryx Institute connects applied research, business practice and ventures in Namibia, while future learning remains subject to approval.",
      ogTitle: "About Oryx Institute",
      ogDescription: "A new Namibian polytechnic working through research, practice and ventures.",
    },
    hero: {
      eyebrow: "Oryx Institute · Namibia",
      title: "Made for Namibia.\nBuilt to travel.",
      lede: "Oryx connects questions, tools and practical work for people who need to use them.",
    },
    apply: "Start a conversation",
    readWork: "See the public work",
    beginning: {
      eyebrow: "Where the work begins",
      title: "More than one place.\nOne standard.",
      body: "The institute begins where it can be useful and will grow as the work develops. The first venture serves customers in Windhoek. Future learning environments are planned separately and will be published when confirmed.",
      caption: "An oryx standing on open, rocky ground.",
    },
    work: {
      eyebrow: "The work, joined",
      title: "Research, practice and ventures.",
      body: "Research informs current work. Ventures offer direct experience of serving customers. Future learning remains separate from current practice until formal approval.",
      items: [
        { name: "Research", line: "Feasibility, market research and practical development work." },
        { name: "Practice", line: "Business counselling and market-research engagements, scoped through the Oryx office." },
        { name: "Ventures", line: "Operating companies where service, systems and decisions meet real customers." },
      ],
    },
    nowNext: {
      eyebrow: "What is true now",
      title: "What is current and what is planned.",
      now: "Working now",
      next: "In development",
      noSite: "Future sites are not open campuses. Details are published only when they are formally confirmed.",
      plannedCampus: "Untag Guesthouse · a future hospitality-focused campus",
      plannedCampusMap: "View Untag Guesthouse site",
      cornerSpa: "Corner Spa is the first operating venture, working with Mendozer in Windhoek.",
      imageCaption: "The animal named in the institute’s mark, held in its own ground.",
    },
    disclosures: {
      status: "What the institute can and cannot claim",
      statusBody: "Oryx is working toward NTA training-provider registration. It is not registered or accredited and does not claim accredited programmes, NQF credits or a public campus.",
      relationships: "How the work is built",
      relationshipsBody: "Oryx names collaborators only where the work is public. Tangison provides identity, technology and learning-platform services under agreement. Corner Spa operates with Mendozer.",
      image: "Why the oryx",
      imageBody: "The oryx in the institute’s mark suggests an alert, measured presence on its own ground.",
      read: "Open note",
    },
    close: {
      line: "Write to the office.",
      body: "For a partnership, programme or question, write to the Oryx office.",
      action: "Write to the office",
      review: "Leave a Google review",
    },
  },
  af: {
    meta: {
      title: "Oor Oryx Instituut, ’n Nuwe Namibiese Politegnikum",
      description: "Lees hoe Oryx Instituut navorsing, besigheidspraktyk en ondernemings in Namibië verbind, met toekomstige leer onderhewig aan goedkeuring.",
      ogTitle: "Oor Oryx Instituut",
      ogDescription: "’n Nuwe Namibiese politegniese instituut met navorsing, praktyk en ondernemings.",
    },
    hero: {
      eyebrow: "Oryx Instituut · Namibië",
      title: "Vir Namibië gemaak.\nGebou om te reis.",
      lede: "Oryx verbind vrae, gereedskap en praktiese werk vir mense wat dit moet gebruik.",
    },
    apply: "Begin ’n gesprek",
    readWork: "Sien die openbare werk",
    beginning: {
      eyebrow: "Waar die werk begin",
      title: "Meer as een plek.\nEen standaard.",
      body: "Die instituut begin waar dit nuttig kan wees en sal groei soos die werk ontwikkel. Die eerste onderneming bedien kliënte in Windhoek. Toekomstige leeromgewings word afsonderlik beplan en sal gepubliseer word wanneer dit bevestig is.",
      caption: "’n Oriks wat op oop, klipperige grond staan.",
    },
    work: {
      eyebrow: "Die werk, verbind",
      title: "Navorsing, praktyk en ondernemings.",
      body: "Navorsing rig huidige werk. Ondernemings gee direkte ervaring van diens aan kliënte. Toekomstige leer bly apart van huidige praktyk totdat dit formeel goedgekeur is.",
      items: [
        { name: "Navorsing", line: "Uitvoerbaarheid, marknavorsing en praktiese ontwikkelingswerk." },
        { name: "Praktyk", line: "Besigheidsadvies- en marknavorsingsopdragte, met omvang deur die Oryx-kantoor bevestig." },
        { name: "Ondernemings", line: "Bedrywighede waar diens, stelsels en besluite werklike kliënte ontmoet." },
      ],
    },
    nowNext: {
      eyebrow: "Wat nou waar is",
      title: "Wat nou bestaan en wat beplan word.",
      now: "Werk nou",
      next: "In ontwikkeling",
      noSite: "Toekomstige terreine is nie oop kampusse nie. Besonderhede word eers gepubliseer wanneer dit formeel bevestig is.",
      plannedCampus: "Untag Guesthouse · ’n toekomstige kampus met ’n gasvryheidsfokus",
      plannedCampusMap: "Sien Untag Guesthouse-terrein",
      cornerSpa: "Corner Spa is die eerste bedrywige onderneming, saam met Mendozer in Windhoek.",
      imageCaption: "Die dier in die instituut se merk, op eie grond.",
    },
    disclosures: {
      status: "Wat die instituut kan en nie kan beweer nie",
      statusBody: "Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie en beweer nie geakkrediteerde programme, NQF-krediete of 'n openbare kampus nie.",
      relationships: "Hoe die werk gebou word",
      relationshipsBody: "Oryx noem medewerkers slegs waar die werk openbaar is. Tangison verskaf identiteit-, tegnologie- en leerplatformdienste ingevolge ooreenkoms. Corner Spa werk saam met Mendozer.",
      image: "Waarom die oriks",
      imageBody: "Die oriks in die instituut se merk dui op ’n wakker, afgemete teenwoordigheid op eie grond.",
      read: "Open nota",
    },
    close: {
      line: "Skryf aan die kantoor.",
      body: "Skryf aan die Oryx-kantoor oor ’n vennootskap, program of vraag.",
      action: "Skryf aan die kantoor",
      review: "Laat ’n Google-resensie",
    },
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
    path: "/about",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.ogTitle },
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const st = af ? statusAf : status;
  const plannedCentre = af ? siteAf.plannedCentre : site.plannedCentre;
  const plannedCampus = af ? siteAf.plannedCampus : site.plannedCampus;
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/about")}`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    mainEntity: { "@id": schemaIds.org },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="about-hero" data-sc-act="scrub">
        <div className="about-hero__media" aria-hidden="true">
          <div className="absolute inset-[-7%]" data-sc-parallax="0.26">
            <Image
              src="/images/kinfolk/inner/25-about-desert.jpg"
              alt=""
              width={1402}
              height={1682}
              priority
              fetchPriority="high"
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="shell about-hero__copy" data-sc-in>
          <p className="eyebrow eyebrow--ivory">{t.hero.eyebrow}</p>
          <h1 className="about-hero__title">{t.hero.title}</h1>
          <p className="about-hero__lede">{t.hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-5">
            <Link href={A("/apply")} className="btn--cream btn">{t.apply}</Link>
            <Link href={A("/research")} className="btn--quiet btn--quiet--ivory">
              {t.readWork} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-prologue section-lg" data-sc-act="flow">
        <div className="shell about-prologue__grid">
          <div className="about-prologue__copy" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.beginning.eyebrow}</p>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.beginning.title}</h2>
            <p className="measure body-lg mt-7 text-soft">{t.beginning.body}</p>
          </div>
          <figure className="about-prologue__image" data-sc-reveal>
            <Image
              src="/images/editorial/about-grounded-field.jpg"
              alt="An oryx standing on open, rocky ground"
              width={1264}
              height={848}
              sizes="(min-width: 70rem) 46vw, 100vw"
              className="h-full w-full object-cover"
            />
            <figcaption>{t.beginning.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-work section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="about-work__intro" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.work.eyebrow}</p>
            <h2 className="h-section mt-5 max-w-[19ch]">{t.work.title}</h2>
            <p className="measure mt-6 text-[var(--ivory-80)]">{t.work.body}</p>
          </div>
          <div className="about-work__rows" data-sc-in data-sc-stagger="70">
            {t.work.items.map((item, index) => (
              <article className="about-work__row" key={item.name}>
                <p className="about-work__index">0{index + 1}</p>
                <h3>{item.name}</h3>
                <p>{item.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-status section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="about-status__head" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.nowNext.eyebrow}</p>
            <h2 className="h-section mt-5 max-w-[20ch] whitespace-pre-line">{t.nowNext.title}</h2>
          </div>
          <div className="about-status__grid mt-14">
            <div className="about-status__list" data-sc-in>
              <p className="meta">{t.nowNext.now}</p>
              <div className="ledger mt-5">
                {st.liveNow.map((item) => (
                  <div className="ledger-row" key={item.name}>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="text-soft">{item.line}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-status__list" data-sc-in>
              <p className="meta">{t.nowNext.next}</p>
              <div className="ledger mt-5">
                <div className="ledger-row">
                  <h3 className="h-sub">Ongwediva</h3>
                  <p className="text-soft">{plannedCentre}</p>
                </div>
                <div className="ledger-row">
                  <h3 className="h-sub">{t.nowNext.plannedCampus}</h3>
                  <p className="text-soft">{plannedCampus}</p>
                  <a
                    href={site.plannedCampusMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-type"
                  >
                    {t.nowNext.plannedCampusMap} <span className="arr" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <p className="about-status__note">{t.nowNext.noSite}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-notes section-lg" data-sc-act="flow">
        <div className="shell about-notes__grid">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.disclosures.image}</p>
            <h2 className="h-section mt-5 max-w-[13ch]">{t.disclosures.imageBody}</h2>
          </div>
          <div className="about-notes__details" data-sc-in data-sc-stagger="50">
            <details>
              <summary>
                <span>{t.disclosures.status}</span>
                <span className="faq-sign" aria-hidden="true">+</span>
              </summary>
              <p>{t.disclosures.statusBody}</p>
            </details>
            <details>
              <summary>
                <span>{t.disclosures.relationships}</span>
                <span className="faq-sign" aria-hidden="true">+</span>
              </summary>
              <p>{t.disclosures.relationshipsBody}</p>
            </details>
          </div>
        </div>
      </section>

      <section className="about-close section-lg on-ink" data-sc-act="flow">
        <div className="shell about-close__grid" data-sc-in>
          <h2 className="h-section whitespace-pre-line">{t.close.line}</h2>
          <div>
            <p className="measure text-[var(--ivory-80)]">{t.close.body}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={`mailto:${site.email}`} className="btn--cream btn">{t.close.action}</a>
              <a
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn--quiet btn--quiet--ivory"
              >
                {t.close.review} <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
