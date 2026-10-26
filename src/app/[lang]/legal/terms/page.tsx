import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections(af: boolean) {
  return af
    ? [
        {
          h: "Wat hierdie werf is",
          body: [
            `Hierdie webwerf stel ${site.legalName} voor en nooi aansoeke deur navraag uit. Dit word bedryf vanuit ${site.city}, ${site.country}. Dit neem geen betalings nie, maak geen rekeninge nie en stoor geen boodskappe nie: die aansoekkomponeerder berei 'n e-pos in jou eie e-poskliënt voor, waar die gesprek voortgaan.`,
          ],
        },
        {
          h: "Wat 'n navraag beteken",
          body: [
            "Om die aansoekboodskap te stuur, vra die Prinsipaal se kantoor om dit te lees en te antwoord. Dit skep nie 'n plek nie, 'n belofte van 'n plek nie, of enige verpligting aan enige kant nie. Toelating, programplasing en studiereëlings word slegs in die geskrewe antwoord van die instituut bevestig.",
          ],
        },
        {
          h: "Die inhoud op hierdie bladsye",
          body: [
            "Die werf beskryf die instituut se dissiplines, handelsmerk en drukwerk soos die instituut dit self publiseer. Die dissiplines beskryf 'n rigting, nie 'n katalogus van aanbiedinge nie: program- en kursusbesonderhede word by aansoek bevestig, en die sertifikaat word by voltooiing uitgereik.",
          ],
        },
        {
          h: "Intellektuele eiendom",
          body: [
            "Die woordmerk, die skildembleem, die drupakket-beelde en die teks van hierdie werf behoort aan die instituut. Jy mag dit aanhaal met erkenning en na hierdie werf skakel; jy mag dit nie as jou eie herpubliseer nie of dit gebruik om enige assosiasie met die instituut te impliseer nie.",
          ],
        },
        {
          h: "Eksterne kanale",
          body: [
            "Hierdie werf gee die aansoek aan jou eie e-poskliënt oor. Sodra jou boodskap hierdie werf verlaat, reis dit onder die voorwaardes van die diens wat jy gekies het om te gebruik, nie onder hierdie voorwaardes nie.",
          ],
        },
        {
          h: "Aanspreeklikheid",
          body: [
            "Die werf word aangebore soos hy staan. Die instituut is nie aanspreeklik vir besluite geneem op die sterkte van hierdie werf alleen nie: die gesagskanaal vir enigiets wat saak maak, is die geskrewe antwoord van die Prinsipaal se kantoor.",
          ],
        },
        {
          h: "Veranderinge",
          body: [
            "Hierdie voorwaardes kan opgedateer word namate die instituut groei. Die huidige weergawe is altyd die een wat op hierdie bladsy gepubliseer staan.",
          ],
        },
      ]
    : [
        {
          h: "What this site is",
          body: [
            `This website presents ${site.legalName} and invites applications by enquiry. It is operated from ${site.city}, ${site.country}. It takes no payments, creates no accounts, and stores no messages: the application composer prepares an email in your own mail client, where the conversation continues.`,
          ],
        },
        {
          h: "What an enquiry means",
          body: [
            "Sending the application message asks the Principal's office to read it and reply. It does not create a place, a promise of a place, or any obligation on either side. Admission, programme placement and study arrangements are confirmed only in the written reply from the institute.",
          ],
        },
        {
          h: "The content on these pages",
          body: [
            "The site describes the institute's disciplines, brand and printed matter as they are published by the institute itself. The disciplines describe direction, not a catalogue of offerings: programme and course specifics are confirmed at the point of application, and the certificate is issued on completion.",
          ],
        },
        {
          h: "Intellectual property",
          body: [
            "The wordmark, the shield emblem, the print kit imagery and the text of this site belong to the institute. You may quote them with attribution and link to this site; you may not republish them as your own or use them to imply any association with the institute.",
          ],
        },
        {
          h: "External channels",
          body: [
            "This site hands the application to your own mail client. Once your message leaves this site, it travels under the terms of the service you chose to use, not under these terms.",
          ],
        },
        {
          h: "Liability",
          body: [
            "The site is offered as it stands. The institute is not liable for decisions made on the strength of this site alone: the authoritative channel for anything that matters is the written reply from the Principal's office.",
          ],
        },
        {
          h: "Changes",
          body: [
            "These terms may be updated as the institute grows. The current version is always the one published on this page.",
          ],
        },
      ];
}

const copy = {
  en: {
    meta: {
      title: "Terms of Service",
      description:
        "The terms on which this website is offered: what the site does, what an enquiry means, what the certificates claim, and what the institute does not promise.",
      ogTitle: "Terms of Service | Oryx Polytechnic Institute",
      ogDescription: "What the site does, what an application means, and what it does not promise.",
    },
    head: {
      eyebrow: "Legal",
      title: "Terms of service.",
      lede: "Short terms, because the site does little: it shows the institute and carries one message at a time.",
    },
  },
  af: {
    meta: {
      title: "Diensvoorwaardes",
      description:
        "Die voorwaardes waarop hierdie webwerf aangebied word: wat die werf doen, wat 'n navraag beteken, wat die sertifikate beweer, en wat die instituut nie belowe nie.",
      ogTitle: "Diensvoorwaardes | Oryx Polytechnic Institute",
      ogDescription: "Wat die werf doen, wat 'n aansoek beteken, en wat dit nie belowe nie.",
    },
    head: {
      eyebrow: "Regs",
      title: "Diensvoorwaardes.",
      lede: "Kort voorwaardes, want die werf doen min: dit stel die instituut voor en dra een boodskap op 'n keer.",
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
    alternates: alternates(lang, "/legal/terms", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: `${m.title}, Oryx Polytechnic Institute`,
        },
      ],
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
    <>
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="article max-w-3xl" data-sc-in data-sc-stagger="50">
            {sections(lang === "af").map((s) => (
              <div key={s.h} className="mt-12 first:mt-0">
                <h2 className="h-sub">{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
            <p className="meta mt-16">
              {site.legalName} · {site.city}, {lang === "af" ? "Namibië" : site.country}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
