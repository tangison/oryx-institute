import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections(af: boolean) {
  return af
    ? [
        {
          h: "Wie ons is",
          body: [
            `Hierdie webwerf word bedryf deur ${site.legalName}, wat vanuit ${site.city}, ${site.country} werk. Vir enige privaatheidsvraag, skryf aan ${site.email}.`,
          ],
        },
        {
          h: "Wat ons versamel",
          body: [
            "Die aansoekkomponeerder op hierdie werf stoor niks nie. As jy op stuur druk, open die boodskap wat jy geskryf het in jou eie e-poskliënt, geadresseer aan die kantoor, en van daardie oomblik bestaan dit slegs in die gesprek wat jy begin het.",
            "As jy ons per e-pos kontak, hou ons wat jy kies om te gee: jou naam, jou kontakbesonderhede, die belangstellingsveld wat jy noem, en die inhoud van jou boodskap.",
          ],
        },
        {
          h: "Hoekom ons dit versamel",
          body: [
            "Om jou aansoek te lees en te antwoord, om te reël wat daarop volg, en om die rekords te hou wat van 'n instituut in Namibië verwag word. Ons verkoop, verhuur of verhandel geen persoonlike inligting aan iemand nie, en ons loop geen advertensies of derdeparty-analitiese spoorgitters op hierdie werf nie.",
          ],
        },
        {
          h: "Met wie ons dit deel",
          body: [
            "Met niemand buite die Prinsipaal se kantoor nie, tensy jy ons vra of die wet dit vereis. Hierdie werf stel geen advertensiekoekies nie en bou geen profiele nie.",
          ],
        },
        {
          h: "Hoe lank ons dit hou",
          body: [
            "Aansoeke word gehou terwyl die gesprek wat hulle geopen het lewendig is, en daarna so lank as wat die instituut se eie rekordhouding vereis. Boodskappe wat nergens heen lei nie, word geskrap sodra die uitruiling sy loop gehad het.",
          ],
        },
        {
          h: "Jou regte",
          body: [
            "Jy mag vra watter persoonlike inligting ons oor jou hou, vra dat ons dit korrigeer, of vra dat ons dit skrap waar geen verpligting ons noodsaak om dit te hou nie. Skryf aan die e-posadres hierbo en 'n redelike versoek word uitgevoer.",
          ],
        },
        {
          h: "Sekuriteit",
          body: [
            "Ons hou persoonlike inligting op stelsels wat ons beheer en beperk toegang tot die mense wat dit nodig het. Geen stoor metode is volmaak veilig nie, maar jou inligting word behandel met die sorg wat die wet en die instituut se eie standaarde eis.",
          ],
        },
        {
          h: "Veranderinge aan hierdie beleid",
          body: [
            "As ons hierdie beleid verander, word die opgedateerde weergawe op hierdie bladsy gepubliseer. Die beleid geld vanaf die datum van publikasie.",
          ],
        },
      ]
    : [
        {
          h: "Who we are",
          body: [
            `This website is operated by ${site.legalName}, working from ${site.city}, ${site.country}. For any privacy question, write to ${site.email}.`,
          ],
        },
        {
          h: "What we collect",
          body: [
            "The application composer on this site does not store anything. When you press send, the message you have written opens in your own mail client addressed to the office, and from that moment it exists only in the conversation you started.",
            "If you contact us by email instead, we keep what you choose to give us: your name, your contact details, the field of interest you name, and the content of your message.",
          ],
        },
        {
          h: "Why we collect it",
          body: [
            "To read and answer your application, to arrange what follows it, and to keep the records an institute in Namibia is expected to keep. We do not sell, rent or trade personal information to anyone, and we do not run advertising or third-party analytics trackers on this site.",
          ],
        },
        {
          h: "Who we share it with",
          body: [
            "Nobody outside the Principal's office, unless you ask us to or the law requires it. This site sets no advertising cookies and builds no profiles.",
          ],
        },
        {
          h: "How long we keep it",
          body: [
            "Applications are kept while the conversation they opened is alive, and for as long as the institute's own record-keeping requires after that. Messages that do not lead anywhere are deleted once the exchange has run its course.",
          ],
        },
        {
          h: "Your rights",
          body: [
            "You may ask what personal information we hold about you, ask us to correct it, or ask us to delete it where no obligation requires us to keep it. Write to the email address above and a reasonable request will be acted on.",
          ],
        },
        {
          h: "Security",
          body: [
            "We keep personal information on systems we control and limit access to the people who need it. No method of storage is perfectly secure, but your information is treated with the care the law and the institute's own standards demand.",
          ],
        },
        {
          h: "Changes to this policy",
          body: [
            "If we change this policy, the updated version is published on this page. The policy applies from the date it is published.",
          ],
        },
      ];
}

const copy = {
  en: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Oryx Polytechnic Institute collects, uses and protects personal information: the email handoff, what is never stored, and your rights over it.",
      ogTitle: "Privacy Policy | Oryx Polytechnic Institute",
      ogDescription: "How the institute collects, uses and protects personal information.",
    },
    head: {
      eyebrow: "Legal",
      title: "Privacy policy.",
      lede: "Plain language, because the policy behind it is simple: the application message you write is yours until you send it, and ours to keep safe afterwards.",
    },
  },
  af: {
    meta: {
      title: "Privaatheidsbeleid",
      description:
        "Hoe Oryx Polytechnic Institute persoonlike inligting versamel, gebruik en beskerm: die e-pos-oorhandiging, wat nooit gestoor word nie, en jou regte daaroor.",
      ogTitle: "Privaatheidsbeleid | Oryx Polytechnic Institute",
      ogDescription: "Hoe die instituut persoonlike inligting versamel, gebruik en beskerm.",
    },
    head: {
      eyebrow: "Regs",
      title: "Privaatheidsbeleid.",
      lede: "Eenvoudige taal, want die beleid daaragter is eenvoudig: die aansoekboodskap wat jy skryf is joune totdat jy dit stuur, en ons s'n om daarna veilig te hou.",
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
    alternates: alternates(lang, "/privacy", site.url),
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

export default async function PrivacyPage({
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
