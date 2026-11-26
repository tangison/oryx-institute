import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { recruitment } from "@/lib/careers";
import { site } from "@/lib/site";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
          "Die navraagvorm stoor niks op hierdie webwerf nie. Wanneer jy stuur, open jou eie e-posprogram ’n boodskap aan die kantoor. Daarna bestaan dit slegs in die gesprek wat jy begin het.",
          "As jy per e-pos skryf, ontvang ons net wat jy kies om te gee: jou naam, kontakbesonderhede, belangstellingsveld en die inhoud van jou boodskap.",
          `As jy vir ’n vakature aansoek doen, open die vorm ’n konsep in jou eie e-posprogram aan ${recruitment.email}. Die webwerf ontvang nie die vorm nie. Wanneer jy die e-pos stuur, kan die werwingspan jou naam, kontakbesonderhede, CV en enige inligting wat jy kies om in te sluit ontvang.`,
        ],
      },
      {
        h: "Waarom ons dit gebruik",
        body: [
          "Om jou navraag te lees en te beantwoord, die volgende stap te reël, en rekords te hou waar dit nodig is. Vir werwing gebruik ons aansoek-inligting om die rolpasvorm te oorweeg, die proses te bestuur en met jou te kommunikeer. Ons verkoop, verhuur of verhandel nie persoonlike inligting nie. Die Oryx-webwerf gebruik nie advertensie- of derdeparty-nasporing in sy eie bladsye nie.",
          "Corner Spa se toonbank is ’n afsonderlike diens wat deur Mendozer by spa.mendozer.com bedien word. Dit laai eers wanneer jy kies om dit oop te maak. Sodra jy dit oopmaak, geld daardie diens se eie hantering van inligting.",
        ],
      },
      {
        h: "Wie dit sien",
        body: ["Niemand buite die kantoor wat die navraag moet hanteer nie, tensy jy vra of die wet dit vereis. Vir ’n werwingsaansoek beteken dit mense wat die betrokke rol en keuring moet hanteer. Die webwerf stel geen advertensiekoekies nie en bou geen profiele nie."],
      },
      {
        h: "Hoe lank dit bly",
        body: ["Navrae bly vir die duur van die gesprek en vir enige rekordhoudingstyd wat daarna nodig is. Boodskappe wat nêrens heen lei nie, word verwyder wanneer die uitruil afgehandel is."],
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
        "The enquiry composer stores nothing on this site. When you send, your own mail client opens a message to the office. From then on, it exists only in the conversation you started.",
        "If you write by email, we receive only what you choose to give: your name, contact details, field of interest and the content of your message.",
        `If you apply for a vacancy, the form opens a draft in your own mail client addressed to ${recruitment.email}. The website does not receive the form. Once you send the email, the recruitment team may receive your name, contact details, CV and anything else you choose to include.`,
      ],
    },
    {
      h: "Why we use it",
      body: [
        "To read and answer your enquiry, arrange what follows, and keep records where that is required. For recruitment, we use application information to consider role fit, administer the process and communicate with you. We do not sell, rent or trade personal information. The Oryx website runs no advertising or third-party tracking on its own pages.",
        "The Corner Spa counter is a separate service served by Mendozer at spa.mendozer.com. It loads only when you choose to open it. Once opened, that service applies its own information handling.",
      ],
    },
    {
      h: "Who sees it",
      body: ["Nobody outside the office that needs to handle your enquiry, unless you ask us to or the law requires it. For a recruitment application, that means people who need to handle the relevant role and selection process. The site sets no advertising cookies and builds no profiles."],
    },
    {
      h: "How long it stays",
      body: ["Enquiries are kept for the life of the conversation and for any record-keeping period required afterwards. Messages that lead nowhere are deleted once the exchange has run its course."],
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
      eyebrow: "Privacy information",
      title: "Privacy policy.",
      lede: "This page explains what the site receives when you choose to send an email.",
    },
    summary: "At a glance",
    summaryBody: "The site has no accounts, payments or advertising profile. An enquiry reaches the office only when you send the email.",
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
      eyebrow: "Privaatheidsinligting",
      title: "Privaatheidsbeleid.",
      lede: "Hierdie blad verduidelik wat die webwerf ontvang wanneer jy kies om ’n e-pos te stuur.",
    },
    summary: "Kortliks",
    summaryBody: "Die webwerf het geen rekeninge, betalings of advertensieprofiel nie. ’n Navraag bereik die kantoor eers wanneer jy die e-pos stuur.",
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
  return pageMetadata({
    lang,
    path: "/legal/privacy",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: `${m.title}, Oryx Institute` },
  });
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
