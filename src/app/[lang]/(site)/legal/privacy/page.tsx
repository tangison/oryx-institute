import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

type LegalSection = { h: string; body: string[] };

function sections(lang: "en" | "af"): LegalSection[] {
  if (lang === "af") {
    return [
      {
        h: "Wie ons is",
        body: [`Hierdie webwerf word deur ${site.legalName} bedryf. Vir ’n privaatheidsvraag, skryf aan ${site.email}.`],
      },
      {
        h: "Wat ons ontvang",
        body: [
          "Die aansoekvorm stoor niks op hierdie webwerf nie. Wanneer jy stuur, open jou eie e-posprogram ’n boodskap aan die kantoor. Daarna bestaan dit slegs in die gesprek wat jy begin het.",
          "As jy per e-pos skryf, ontvang ons net wat jy kies om te gee: jou naam, kontakbesonderhede, belangstellingsveld en die inhoud van jou boodskap.",
        ],
      },
      {
        h: "Waarom ons dit gebruik",
        body: ["Om jou navraag te lees en te beantwoord, die volgende stap te reël, en rekords te hou waar dit nodig is. Ons verkoop, verhuur of verhandel nie persoonlike inligting nie. Hierdie webwerf gebruik nie advertensie- of derdeparty-nasporing nie."],
      },
      {
        h: "Wie dit sien",
        body: ["Niemand buite die kantoor wat die navraag moet hanteer nie, tensy jy vra of die wet dit vereis. Die webwerf stel geen advertensiekoekies nie en bou geen profiele nie."],
      },
      {
        h: "Hoe lank dit bly",
        body: ["Aansoeke bly vir die duur van die gesprek en vir enige rekordhoudingstyd wat daarna nodig is. Boodskappe wat nêrens heen lei nie, word verwyder wanneer die uitruil afgehandel is."],
      },
      {
        h: "Jou regte",
        body: ["Jy kan vra watter persoonlike inligting ons hou, ’n regstelling vra, of skrapping versoek waar geen verpligting vereis dat ons dit hou nie. Skryf aan die kantoor; ’n redelike versoek word hanteer."],
      },
      {
        h: "Sekuriteit",
        body: ["Ons beperk toegang tot die mense wat die inligting nodig het en gebruik stelsels onder ons beheer. Geen berging is volkome veilig nie; jou inligting word egter met die nodige sorg hanteer."],
      },
      {
        h: "Veranderinge",
        body: ["Wanneer hierdie beleid verander, word die huidige weergawe op hierdie blad gepubliseer. Dit geld vanaf publikasie."],
      },
    ];
  }

  return [
    {
      h: "Who we are",
      body: [`This website is operated by ${site.legalName}. For a privacy question, write to ${site.email}.`],
    },
    {
      h: "What we receive",
      body: [
        "The application composer stores nothing on this site. When you send, your own mail client opens a message to the office. From then on, it exists only in the conversation you started.",
        "If you write by email, we receive only what you choose to give: your name, contact details, field of interest and the content of your message.",
      ],
    },
    {
      h: "Why we use it",
      body: ["To read and answer your enquiry, arrange what follows, and keep records where that is required. We do not sell, rent or trade personal information. This site runs no advertising or third-party tracking."],
    },
    {
      h: "Who sees it",
      body: ["Nobody outside the office that needs to handle your enquiry, unless you ask us to or the law requires it. The site sets no advertising cookies and builds no profiles."],
    },
    {
      h: "How long it stays",
      body: ["Applications are kept for the life of the conversation and for any record-keeping period required afterwards. Messages that lead nowhere are deleted once the exchange has run its course."],
    },
    {
      h: "Your rights",
      body: ["You may ask what personal information we hold, ask us to correct it, or ask us to delete it where no obligation requires us to keep it. Write to the office; a reasonable request will be acted on."],
    },
    {
      h: "Security",
      body: ["We limit access to the people who need the information and use systems we control. No storage is perfectly secure; your information is treated with the care it deserves."],
    },
    {
      h: "Changes",
      body: ["If this policy changes, the current version is published on this page. It applies from publication."],
    },
  ];
}

const copy = {
  en: {
    meta: {
      title: "Privacy Policy",
      description: "The plain-language privacy policy for Oryx Institute: what an enquiry shares, what the site does not track, and how to ask a question.",
      ogTitle: "Privacy Policy | Oryx Institute",
      ogDescription: "A plain-language account of what the site receives, does not track, and keeps safe.",
    },
    head: {
      eyebrow: "Legal, in plain language",
      title: "Privacy, without the fog.",
      lede: "A message begins with you. This site does not collect it until you decide to send it.",
    },
    summary: "The short version",
    summaryBody: "No accounts. No payments. No advertising profile. An enquiry becomes a conversation only when you send an email to the office.",
    detail: "Read this part",
    close: "A question about privacy deserves a direct answer.",
  },
  af: {
    meta: {
      title: "Privaatheidsbeleid",
      description: "Die Oryx Instituut se privaatheidsbeleid in gewone taal: wat ’n navraag deel, wat die webwerf nie volg nie, en hoe om ’n vraag te vra.",
      ogTitle: "Privaatheidsbeleid | Oryx Instituut",
      ogDescription: "’n Eenvoudige verduideliking van wat die webwerf ontvang, nie volg nie, en veilig hou.",
    },
    head: {
      eyebrow: "Reg, in gewone taal",
      title: "Privaatheid, sonder die mis.",
      lede: "’n Boodskap begin by jou. Hierdie webwerf ontvang dit nie voordat jy kies om te stuur nie.",
    },
    summary: "Die kort weergawe",
    summaryBody: "Geen rekeninge. Geen betalings. Geen advertensieprofiel. ’n Navraag word eers ’n gesprek wanneer jy ’n e-pos aan die kantoor stuur.",
    detail: "Lees hierdie deel",
    close: "’n Vraag oor privaatheid verdien ’n direkte antwoord.",
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
    alternates: alternates(lang, "/legal/privacy", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/legal/privacy`,
      images: [{ url: "/brand/og/default.png", width: 1200, height: 630, alt: `${m.title}, Oryx Institute` }],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const t = copy[lang];

  return (
    <div className="page-tone--ink on-ink">
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title} tone="ink">
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="reading-page section-lg" data-sc-act="flow">
        <div className="shell reading-page__grid">
          <aside className="reading-page__aside" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.summary}</p>
            <p className="pull mt-5">{t.summaryBody}</p>
            <a href={`mailto:${site.email}`} className="btn--quiet mt-8">
              {site.email} <span className="arr" aria-hidden="true">→</span>
            </a>
          </aside>

          <div className="legal-disclosures" data-sc-in data-sc-stagger="35">
            {sections(lang).map((section, index) => (
              <details key={section.h} open={index === 0}>
                <summary>
                  <span>{section.h}</span>
                  <span className="legal-disclosures__verb">{t.detail}</span>
                  <span className="faq-sign" aria-hidden="true">+</span>
                </summary>
                <div className="legal-disclosures__body">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="shell">
          <p className="reading-page__close">{t.close}</p>
        </div>
      </section>
    </div>
  );
}
