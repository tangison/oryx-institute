import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { ApplyForm } from "@/components/site/apply-form";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const afRole = "Prinsipaal";

const copy = {
  en: {
    meta: {
      title: "Apply",
      description:
        "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
      ogTitle: "Apply | Oryx Institute",
      ogDescription:
        "One message to the Principal's office in Windhoek starts your application.",
    },
    head: {
      eyebrow: "Apply",
      title: "Apply now.",
      lede: "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. The teaching is crash courses and short courses in business administration and IT and related fields. The practice books through the same desk: the Owner's Desk, market research and development, Rapid Response Training.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares it.",
      },
      {
        t: "The office replies",
        b: "The Principal's office reads every message and answers personally, usually within the week.",
      },
      {
        t: "Talk, then decide",
        b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides agree.",
      },
    ],
    composerTitle: "The application message",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The application exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Who reads it",
    readerBody: `${site.principal.name}, ${site.principal.role}, reads every application personally. The office answers every enquiry by email, and visits are arranged by appointment.`,
  },
  af: {
    meta: {
      title: "Skryf in",
      description:
        "Meld aan vir kondens- en kortkursusse in besigheidsadministrasie en IT, of bespreek die praktyk: die Eienaar se Lessenaar, marknavorsing, Spoedreaksie-opleiding.",
      ogTitle: "Skryf in | Oryx Instituut",
      ogDescription:
        "Een boodskap aan die Prinsipaal se kantoor in Windhoek begin jou aansoek.",
    },
    head: {
      eyebrow: "Skryf in",
      title: "Meld nou aan.",
      lede: "Daar is geen portaal en geen tou nie. Skryf direk aan die Prinsipaal se kantoor, en die aansoek begin met jou eerste boodskap. Die onderrig is kondens- en kortkursusse in besigheidsadministrasie en IT en verwante velde. Die praktyk bespreek deur dieselfde lessenaar: die Eienaar se Lessenaar, marknavorsing en -ontwikkeling, Spoedreaksie-opleiding.",
    },
    steps: [
      {
        t: "Skryf een boodskap",
        b: "Naam, 'n kontak vir die antwoord, en die veld waarin jy belangstel. Die komponeerder hieronder berei dit voor.",
      },
      {
        t: "Die kantoor antwoord",
        b: "Die Prinsipaal se kantoor lees elke boodskap en antwoord persoonlik, gewoonlik binne die week.",
      },
      {
        t: "Praat, besluit dan",
        b: "'n Gesprek per e-pos of 'n afspraak in Windhoek. Niks word bevestig voordat albei kante saamstem nie.",
      },
    ],
    composerTitle: "Die aansoekboodskap",
    composerBody: (email: string) => ({
      pre: "Vul dit in en dit open as 'n e-pos geadresseer aan ",
      post: ". Niks word op hierdie werf gestoor nie; niks word gestuur voordat jy self in jou e-poskliënt op stuur druk nie.",
    }),
    dataEyebrow: "Geen data-insameling nie",
    dataBody:
      "Die werf loop geen analitika, koekies of rekeninge nie. Die aansoek bestaan die oomblik dat jou e-poskliënt dit open; voor daardie oomblik bestaan dit nie eens nie.",
    readerEyebrow: "Wie lees dit",
    readerBody: `${site.principal.name}, ${afRole}, lees elke aansoek persoonlik. Die kantoor antwoord elke navraag per e-pos, en besoeke word per afspraak gereël.`,
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
    alternates: alternates(lang, "/apply", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        { url: "/brand/og/apply.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const t = copy[lang];

  return (
    <>
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* How the application runs, hairline ledger. The titles carry the
          sequence; the rows carry no numbers. */}
      <section className="section">
        <div className="shell">
          <div className="ledger" data-sc-in data-sc-stagger="70">
            {t.steps.map((s) => (
              <div className="ledger-row ledger-row--flat" key={s.t}>
                <div>
                  <h2 className="h-sub">{s.t}</h2>
                  <p className="measure mt-3 text-soft">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The composer */}
      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="panel p-6 sm:p-10" data-sc-in>
            <h2 className="h-sub">{t.composerTitle}</h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              {t.composerBody(site.email).pre}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              {t.composerBody(site.email).post}
            </p>
            <div className="mt-8">
              <ApplyForm lang={lang} />
            </div>
          </div>

          <div className="grid gap-8" data-sc-in data-sc-stagger="70">
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.dataEyebrow}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                {t.dataBody}
              </p>
            </div>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.readerEyebrow}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                {t.readerBody}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
