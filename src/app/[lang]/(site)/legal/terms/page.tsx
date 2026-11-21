import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

type LegalSection = { h: string; body: string[] };

function sections(lang: "en" | "af"): LegalSection[] {
  if (lang === "af") {
    return [
      {
        h: "Wat hierdie webwerf doen",
        body: ["Hierdie webwerf stel Oryx Institute voor en nooi navrae uit. Dit neem geen betaling nie, skep geen rekening nie en hou nie ’n navraag in die webwerf self nie: die vorm berei ’n e-pos in jou eie e-posprogram voor."],
      },
      {
        h: "Wat ’n navraag beteken",
        body: ["’n Boodskap vra die kantoor om dit te lees en te antwoord. Dit skep nie ’n plek, ’n inname, ’n kwalifikasie-eis of ’n verpligting aan enige kant nie. Die kantoor stel die huidige posisie skriftelik."],
      },
      {
        h: "Wat die bladsy sê",
        body: ["Die webwerf beskryf die instituut se rigting, huidige praktyk en gepubliseerde materiaal soos dit tans bestaan. ’n Rigting is nie ’n katalogus van aanbiedinge nie. Oryx werk aan NTA-opleidingsverskafferregistrasie en beweer nie geakkrediteerde programme, NQF-krediete of ’n openbare kampus nie."],
      },
      {
        h: "Die werk op die blad",
        body: ["Die woordmerk, skild, drukmateriaal en skryfwerk behoort aan die instituut. Jy mag daarna verwys met erkenning en na hierdie webwerf skakel. Jy mag dit nie as jou eie publiseer of ’n verbintenis met Oryx impliseer nie."],
      },
      {
        h: "Kanale buite hierdie webwerf",
        body: ["Die webwerf gee die navraag aan jou eie e-posprogram. Wanneer die boodskap hierdie webwerf verlaat, geld die diensvoorwaardes van die diens wat jy gekies het."],
      },
      {
        h: "Aanspreeklikheid",
        body: ["Die webwerf word aangebied soos dit staan. Vir ’n besluit wat saak maak, is die geskrewe antwoord van die kantoor die gesaghebbende kanaal."],
      },
      {
        h: "Veranderinge",
        body: ["Hierdie voorwaardes kan verander soos die instituut groei. Die huidige weergawe is altyd die weergawe op hierdie blad."],
      },
    ];
  }

  return [
    {
      h: "What this website does",
      body: ["This website introduces Oryx Institute and invites enquiries. It takes no payment, creates no account and holds no enquiry inside the site itself: the form prepares an email in your own mail client."],
    },
    {
      h: "What an enquiry means",
      body: ["A message asks the office to read and reply. It does not create a place, an intake, a qualification claim or an obligation on either side. The office states the current position in writing."],
    },
    {
      h: "What the page says",
      body: ["The site describes the institute’s direction, current practice and published material as they stand. A direction is not a catalogue of offerings. Oryx is working toward NTA training-provider registration and does not claim accredited programmes, NQF credits or a public campus."],
    },
    {
      h: "The work on the page",
      body: ["The wordmark, shield, print material and writing belong to the institute. You may quote them with attribution and link to this site. You may not republish them as your own or imply an association with Oryx."],
    },
    {
      h: "Channels beyond this site",
      body: ["The site hands an enquiry to your own mail client. Once the message leaves this site, it travels under the terms of the service you chose."],
    },
    {
      h: "Liability",
      body: ["The site is offered as it stands. For any decision that matters, the written reply from the office is the authoritative channel."],
    },
    {
      h: "Changes",
      body: ["These terms may change as the institute grows. The current version is always the version published on this page."],
    },
  ];
}

const copy = {
  en: {
    meta: {
      title: "Terms of Service",
      description: "The short, plain-language terms for using the Oryx Institute website and making an enquiry.",
      ogTitle: "Terms of Service | Oryx Institute",
      ogDescription: "What the website does, what an enquiry means, and where confirmation happens.",
    },
    head: {
      eyebrow: "Legal information",
      title: "Terms of use.",
      lede: "These terms explain how this website and its enquiry route work.",
    },
    summary: "At a glance",
    summaryBody: "An enquiry opens a conversation. The office confirms any scope in writing.",
    detail: "Read this part",
    close: "If the work matters, ask the office and keep the answer in writing.",
  },
  af: {
    meta: {
      title: "Diensvoorwaardes",
      description: "Die kort diensvoorwaardes in gewone taal vir die gebruik van die Oryx Instituut-webwerf en ’n navraag.",
      ogTitle: "Diensvoorwaardes | Oryx Instituut",
      ogDescription: "Wat die webwerf doen, wat ’n navraag beteken, en waar bevestiging gebeur.",
    },
    head: {
      eyebrow: "Regsinligting",
      title: "Gebruiksvoorwaardes.",
      lede: "Hierdie voorwaardes verduidelik hoe die webwerf en sy navraagroete werk.",
    },
    summary: "Kortliks",
    summaryBody: "’n Navraag begin ’n gesprek. Die kantoor bevestig enige omvang skriftelik.",
    detail: "Lees hierdie deel",
    close: "As die werk saak maak, vra die kantoor en hou die antwoord skriftelik.",
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
    alternates: alternates(lang, "/legal/terms", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/legal/terms`,
      images: [{ url: "/brand/og/default.png", width: 1200, height: 630, alt: `${m.title}, Oryx Institute` }],
    },
  };
}

export default async function TermsPage({
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
