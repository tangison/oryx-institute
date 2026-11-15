import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, status, schemaIds } from "@/lib/site";
import { siteAf, statusAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * About is a visual statement of direction, not a prospectus. It names
 * what exists, keeps future work visibly future, and lets the broader
 * institute be understood through three connected kinds of work.
 */
const copy = {
  en: {
    meta: {
      title: "About Oryx Institute",
      description: "Oryx Institute is a new Namibian polytechnic in formation: research, practical learning and ventures that let the work prove itself.",
      ogTitle: "About Oryx Institute",
      ogDescription: "A new Namibian polytechnic in formation. Research, practical learning and ventures that prove the work.",
    },
    hero: {
      eyebrow: "Oryx Institute · Namibia",
      title: "Built on ground.\nNot held there.",
      lede: "Oryx is being made for work that has to travel: from a question, to a tool, to a room full of people using it well.",
    },
    apply: "Start a conversation",
    readWork: "See the public work",
    beginning: {
      eyebrow: "A beginning, not a border",
      title: "More than one place.\nOne standard.",
      body: "The institute begins where it can be useful, then grows outward with care. Windhoek is where the first venture works with real customers. The Directory is published online. Future learning environments are planned on their own timelines, and only become public when there is something real to say.",
      caption: "A person walking across open ground.",
    },
    work: {
      eyebrow: "The work, joined",
      title: "Research asks. Practice tests. Ventures answer.",
      body: "None of these stand alone. Evidence should change what is taught. What is taught should survive contact with real work. A venture should return a better question.",
      items: [
        { name: "Research", line: "Questions with evidence behind them. Feasibility, market reads and practical development work." },
        { name: "Practice", line: "Useful learning for people and teams: short courses, direct counsel and training shaped around the work at hand." },
        { name: "Ventures", line: "Small operating companies where service, systems and decisions can meet the customer before they become theory." },
      ],
    },
    nowNext: {
      eyebrow: "What is true now",
      title: "The work has a present tense.\nThe future has a label.",
      now: "Working now",
      next: "In development",
      noSite: "Oryx does not present a planned centre as an open campus. The work earns its space before the sign goes up.",
      directory: "The Oryx Directory is free, Namibia-specific, and available online now.",
      cornerSpa: "Corner Spa is the first operating venture, working with Mendozer in Windhoek.",
      imageCaption: "The animal named in the institute’s mark, held in its own ground.",
    },
    people: {
      eyebrow: "People and proof",
      title: "Names arrive with the work.",
      body: "One Principal is named today. Other roles stay openly vacant until a person, a responsibility and the record that supports both can be published together.",
      action: "Meet the people",
      imageAlt: "Hands trimming a sheet of paper at a workbench",
    },
    disclosures: {
      status: "What the institute can and cannot claim",
      statusBody: "Oryx is pursuing accreditation and does not claim accredited programmes before that process is complete. Course, enrolment and credential details are confirmed in writing by the office.",
      relationships: "How the work is built",
      relationshipsBody: "Oryx works with named collaborators where that work is public. Tangison provides the institute’s identity, technology and learning-platform services under agreement. Corner Spa operates with Mendozer. Each relationship is stated for what it is, not enlarged into a promise.",
      image: "Why the oryx",
      imageBody: "The oryx is not a decorative substitute for the institute. It is a reminder of the posture: alert, measured and able to hold its ground.",
      read: "Open note",
    },
    close: {
      line: "What is not ready says so.\nWhat is ready gets to work.",
      body: "For a partnership, a programme or a question that needs a real answer, write to the office.",
      action: "Write to the office",
    },
  },
  af: {
    meta: {
      title: "Oor Oryx Instituut",
      description: "Oryx Instituut is ’n nuwe Namibiese politegniese instituut in wording: navorsing, praktiese leer en ondernemings wat die werk laat bewys word.",
      ogTitle: "Oor Oryx Instituut",
      ogDescription: "’n Nuwe Namibiese politegniese instituut in wording. Navorsing, praktiese leer en ondernemings wat die werk bewys.",
    },
    hero: {
      eyebrow: "Oryx Instituut · Namibië",
      title: "Op grond gebou.\nNie daardeur begrens nie.",
      lede: "Oryx word gemaak vir werk wat moet kan reis: van ’n vraag, na ’n werktuig, na ’n vertrek vol mense wat dit goed gebruik.",
    },
    apply: "Begin ’n gesprek",
    readWork: "Sien die openbare werk",
    beginning: {
      eyebrow: "’n Begin, nie ’n grens nie",
      title: "Meer as een plek.\nEen standaard.",
      body: "Die instituut begin waar dit nuttig kan wees en groei dan versigtig na buite. Windhoek is waar die eerste onderneming met werklike kliënte werk. Die Directory word aanlyn gepubliseer. Toekomstige leeromgewings word op hul eie tydlyne beplan en word eers openbaar wanneer daar iets werkliks is om te sê.",
      caption: "’n Persoon wat oor oop grond loop.",
    },
    work: {
      eyebrow: "Die werk, verbind",
      title: "Navorsing vra. Praktyk toets. Ondernemings antwoord.",
      body: "Nie een staan alleen nie. Bewyse moet verander wat geleer word. Wat geleer word, moet werklike werk oorleef. ’n Onderneming moet ’n beter vraag teruggee.",
      items: [
        { name: "Navorsing", line: "Vrae met bewyse daaragter. Uitvoerbaarheid, marklesings en praktiese ontwikkelingswerk." },
        { name: "Praktyk", line: "Bruikbare leer vir mense en spanne: kortkursusse, direkte advies en opleiding rondom die werk wat voorlê." },
        { name: "Ondernemings", line: "Klein bedrywighede waar diens, stelsels en besluite die kliënt ontmoet voordat dit teorie word." },
      ],
    },
    nowNext: {
      eyebrow: "Wat nou waar is",
      title: "Die werk het ’n teenwoordige tyd.\nDie toekoms het ’n etiket.",
      now: "Werk nou",
      next: "In ontwikkeling",
      noSite: "Oryx stel nie ’n beplande sentrum voor as ’n oop kampus nie. Die werk verdien sy ruimte voordat die bord opgaan.",
      directory: "Die Oryx Directory is gratis, Namibië-spesifiek en nou aanlyn beskikbaar.",
      cornerSpa: "Corner Spa is die eerste bedrywige onderneming, saam met Mendozer in Windhoek.",
      imageCaption: "Die dier in die instituut se merk, op eie grond.",
    },
    people: {
      eyebrow: "Mense en bewys",
      title: "Name kom saam met die werk.",
      body: "Een Prinsipaal word vandag genoem. Ander rolle bly openlik vakant totdat ’n persoon, ’n verantwoordelikheid en die rekord wat albei dra, saam gepubliseer kan word.",
      action: "Ontmoet die mense",
      imageAlt: "Hande wat ’n vel papier by ’n werkbank sny",
    },
    disclosures: {
      status: "Wat die instituut kan en nie kan beweer nie",
      statusBody: "Oryx streef akkreditasie na en beweer nie geakkrediteerde programme voordat dié proses voltooi is nie. Kursus-, inskrywings- en sertifikaatbesonderhede word deur die kantoor skriftelik bevestig.",
      relationships: "Hoe die werk gebou word",
      relationshipsBody: "Oryx werk met genoemde medewerkers waar daardie werk openbaar is. Tangison verskaf die instituut se identiteit, tegnologie en leerplatform ingevolge ooreenkoms. Corner Spa werk saam met Mendozer. Elke verhouding word gestel vir wat dit is, nie vergroot tot ’n belofte nie.",
      image: "Waarom die oriks",
      imageBody: "Die oriks is nie ’n dekoratiewe plaasvervanger vir die instituut nie. Dit herinner aan die houding: wakker, afgemeet en in staat om grond te hou.",
      read: "Open nota",
    },
    close: {
      line: "Wat nie gereed is nie, sê so.\nWat gereed is, gaan werk.",
      body: "Vir ’n vennootskap, ’n program of ’n vraag wat ’n werklike antwoord nodig het, skryf aan die kantoor.",
      action: "Skryf aan die kantoor",
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
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/about", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/about`,
      images: [{ url: "/brand/og/about.png", width: 1200, height: 630, alt: m.ogTitle }],
    },
  };
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
  const A = (path: string) => (af ? `/af${path}` : path);
  const skillsCamp = st.inDevelopment.find((item) => item.name.toLowerCase().includes("skills camp"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/about")}`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    mainEntity: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
      alternateName: site.tradingName,
      url: site.url,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "NA",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="about-hero" data-sc-act="scrub">
        <div className="about-hero__media" aria-hidden="true">
          <div className="absolute inset-[-7%]" data-sc-parallax="0.26">
            <Image
              src="/images/kinfolk/people/30-founder-walking.jpg"
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
            <Link href={A("/resources")} className="btn--quiet btn--quiet--ivory">
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
              alt="An oryx standing in open Namibian ground"
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
              <p className="about-status__note">{t.nowNext.directory}</p>
            </div>
            <div className="about-status__list" data-sc-in>
              <p className="meta">{t.nowNext.next}</p>
              <div className="ledger mt-5">
                <div className="ledger-row">
                  <h3 className="h-sub">Ongwediva</h3>
                  <p className="text-soft">{plannedCentre}</p>
                </div>
                {skillsCamp ? (
                  <div className="ledger-row">
                    <h3 className="h-sub">{skillsCamp.name}</h3>
                    <p className="text-soft">{skillsCamp.line}</p>
                  </div>
                ) : null}
              </div>
              <p className="about-status__note">{t.nowNext.noSite}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-people section-lg" data-sc-act="flow">
        <div className="shell about-people__grid">
          <figure className="about-people__image" data-sc-reveal>
            <Image
              src="/images/kinfolk/people/31-hands-working.jpg"
              alt={t.people.imageAlt}
              width={1122}
              height={1402}
              sizes="(min-width: 70rem) 38vw, 100vw"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <div className="about-people__copy" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.people.eyebrow}</p>
            <h2 className="h-section mt-5 max-w-[15ch]">{t.people.title}</h2>
            <p className="measure mt-6 text-soft">{t.people.body}</p>
            <p className="h-sub mt-10">{site.principal.name}</p>
            <p className="meta mt-2">{site.principal.role}</p>
            <Link href={A("/about/staff")} className="btn--quiet mt-8">
              {t.people.action} <span className="arr" aria-hidden="true">→</span>
            </Link>
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
            <a href={`mailto:${site.email}`} className="btn--cream btn mt-8">{t.close.action}</a>
          </div>
        </div>
      </section>
    </>
  );
}
