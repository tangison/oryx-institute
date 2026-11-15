import Image from "next/image";
import { ApplyForm } from "@/components/site/apply-form";
import { site, offers } from "@/lib/site";
import { offersAf } from "@/lib/site-af";
import type { Lang } from "@/lib/i18n";

/**
 * The enquiry page keeps one direct public route to the Oryx office.
 * It describes current commercial work without presenting a learning
 * catalogue, intake or qualification.
 */

const copy = {
  en: {
    head: {
      eyebrow: "Enquire",
      title: "Start with a conversation.",
      lede: "There is no portal and no queue. Write to the Oryx office directly. Current work includes business counselling and market research. Future learning pathways are not accredited qualifications and will be announced only when formally confirmed.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares\u00A0it.",
      },
      {
        t: "The office responds",
        b: "The Oryx office replies through the published public contact channel.",
      },
      {
        t: "Confirm what is available",
        b: "The reply states what Oryx can and cannot offer at the time of your enquiry.",
      },
    ],
    composerTitle: "Your enquiry",
    offersEyebrow: "Current work",
    offersTitle: "One public office.",
    offersNote:
      "Current work is listed below. For future learning, write to the office and the reply will state the current position without promising an intake or qualification.",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail\u00A0client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The enquiry exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Where it goes",
    readerBody: "The Oryx office receives enquiries through the approved public mailbox. No physical address or visiting instructions are published.",
  },
  af: {
    head: {
      eyebrow: "Doen navraag",
      title: "Begin met 'n gesprek.",
      lede: "Daar is geen portaal of wagtyd nie. Skryf direk aan die Oryx-kantoor. Huidige werk sluit besigheidsadvies en marknavorsing in. Toekomstige leerpaaie is nie geakkrediteerde kwalifikasies nie en word slegs aangekondig wanneer dit formeel bevestig is.",
    },
    steps: [
      {
        t: "Skryf een boodskap",
        b: "Noem jou naam, 'n kontakbesonderheid vir die antwoord en die area waarin jy belangstel. Die samesteller hieronder berei dit voor.",
      },
      {
        t: "Die kantoor antwoord",
        b: "Die Oryx-kantoor antwoord deur die gepubliseerde openbare kontakroete.",
      },
      {
        t: "Bevestig wat beskikbaar is",
        b: "Die antwoord stel wat Oryx op die tyd van jou navraag kan en nie kan aanbied nie.",
      },
    ],
    composerTitle: "Jou navraag",
    offersEyebrow: "Huidige werk",
    offersTitle: "Een openbare kantoor.",
    offersNote:
      "Huidige werk word hieronder gelys. Skryf aan die kantoor oor toekomstige leer en die antwoord sal die huidige posisie stel sonder 'n inname of kwalifikasiebelofte.",
    composerBody: (email: string) => ({
      pre: "Vul dit in en dit open as 'n e-pos aan ",
      post: ". Niks word op hierdie webwerf gestoor nie; niks word gestuur voordat jy in jou eie e-posprogram stuur nie.",
    }),
    dataEyebrow: "Geen dataversameling",
    dataBody:
      "Die webwerf gebruik geen ontleding, koekies of rekeninge nie. Die navraag bestaan eers wanneer jou e-posprogram open.",
    readerEyebrow: "Waarheen dit gaan",
    readerBody: "Die Oryx-kantoor ontvang navrae deur die goedgekeurde openbare posbus. Geen fisiese adres of besoekinligting word gepubliseer nie.",
    enLedger: { paras: [] as string[] },
  },
} as const;

export function ApplyBody({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <>
      {/* The opener, under scrub: the proposition on the left, a quiet
          correspondence plate drifting at its own rate on the right. */}
      <section className="section screen-intro" data-sc-act="scrub">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-16">
          <div>
            <p className="eyebrow eyebrow--ink">{t.head.eyebrow}</p>
            <h1 className="h-display mt-4 max-w-[14ch]">{t.head.title}</h1>
            <p className="measure mt-6 text-soft">{t.head.lede}</p>
          </div>
          <figure className="plate-fig" data-sc-parallax="0.15">
            <Image
              src="/images/kinfolk/inner/29-envelope-cream.jpg"
              alt="A plain cream envelope on a neutral ground"
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 18rem, 70vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* How the enquiry runs, hairline ledger. The titles carry the
          sequence; the rows carry no numbers. */}
      <section className="section" data-sc-act="flow">
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

      {/* Current work, in full. Future learning is not presented as a
          course catalogue before the relevant registration exists. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.offersEyebrow}</p>
          <h2 className="h-section mt-4 max-w-[18ch]">{t.offersTitle}</h2>
          <p className="measure mt-6 text-soft">{t.offersNote}</p>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {(lang === "af" ? offersAf : offers).map((o) => (
              <div
                className="ledger-row ledger-row--flat"
                key={o.id}
                id={o.id}
              >
                <div>
                  <p className="offer-tag">{o.tag}</p>
                  <h3 className="h-sub mt-2">{o.name}</h3>
                  <p className="measure mt-3 text-soft">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The composer */}
      <section className="section-lg" data-sc-act="flow">
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
            {/* The applicant's hand beside the zero-data copy: the
              human plate /apply carries. (Image Audit: k32 beside the
              zero-data line; the wax seal holds the hero above.) */}
            <figure className="apply-plate" data-sc-reveal>
              <Image
                src="/images/kinfolk/people/32-applicant-writing.jpg"
                alt="A hand writing an enquiry letter with a pen on paper in hard window light"
                width={1402}
                height={1122}
                sizes="(min-width: 1024px) 15rem, 60vw"
                className="h-auto w-full"
                loading="eager"
              />
            </figure>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.dataEyebrow}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">
                {t.dataBody}
              </p>
            </div>
            <div className="hair-t pt-8">
              <p className="text-[0.95rem] leading-relaxed text-soft">
                {t.readerBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Afrikaans page. */}
      {false && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">Engelse oorspronklike · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {copy.af.enLedger.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
