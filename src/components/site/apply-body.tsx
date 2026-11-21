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
      title: "Write to the Oryx office.",
      lede: "Use this form to prepare an email about business counselling, market research or a future learning area.",
    },
    steps: [
      {
        t: "Write your enquiry",
        b: "Include your name, a contact detail and the area you want to discuss. The composer below prepares the email.",
      },
      {
        t: "Send it from your mail client",
        b: "The website does not submit the form. You decide whether to send the draft.",
      },
      {
        t: "Receive a reply",
        b: "The Oryx office replies through the published public contact channel.",
      },
    ],
    composerTitle: "Your enquiry",
    offersEyebrow: "Current work",
    offersTitle: "Current work.",
    offersNote:
      "The current services are listed below. For future learning, write to the office for the current position.",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail\u00A0client.",
    }),
    dataEyebrow: "Your message stays with you until you send it",
    dataBody:
      "This site has no accounts or enquiry storage. The composer opens a draft in your mail client; the office receives it only if you send it.",
    readerEyebrow: "Where it goes",
    readerBody: "The Oryx office receives enquiries through the approved public mailbox. No physical address or visiting instructions are published.",
  },
  af: {
    head: {
      eyebrow: "Doen navraag",
      title: "Skryf aan die Oryx-kantoor.",
      lede: "Gebruik hierdie vorm om ’n e-pos oor besigheidsadvies, marknavorsing of ’n toekomstige leerarea voor te berei.",
    },
    steps: [
      {
        t: "Skryf jou navraag",
        b: "Sluit jou naam, ’n kontakbesonderheid en die area wat jy wil bespreek in. Die samesteller hieronder berei die e-pos voor.",
      },
      {
        t: "Stuur dit uit jou e-posprogram",
        b: "Die webwerf dien nie die vorm in nie. Jy besluit of jy die konsep stuur.",
      },
      {
        t: "Ontvang ’n antwoord",
        b: "Die Oryx-kantoor antwoord deur die gepubliseerde openbare kontakroete.",
      },
    ],
    composerTitle: "Jou navraag",
    offersEyebrow: "Huidige werk",
    offersTitle: "Huidige werk.",
    offersNote:
      "Die huidige dienste word hieronder gelys. Skryf aan die kantoor oor toekomstige leer vir die huidige posisie.",
    composerBody: (email: string) => ({
      pre: "Vul dit in en dit open as 'n e-pos aan ",
      post: ". Niks word op hierdie webwerf gestoor nie; niks word gestuur voordat jy in jou eie e-posprogram stuur nie.",
    }),
    dataEyebrow: "Jou boodskap bly by jou totdat jy dit stuur",
    dataBody:
      "Hierdie webwerf het geen rekeninge of berging van navrae nie. Die samesteller open ’n konsep in jou e-posprogram; die kantoor ontvang dit eers as jy dit stuur.",
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
            {/* A correspondence plate gives the privacy note a quieter
              visual anchor than the former hand-led image. */}
            <figure className="apply-plate" data-sc-reveal>
              <Image
                src="/images/editorial/home-correspondence.jpg"
                alt="A blank cream envelope and brass paper clip on a terracotta work surface"
                width={1264}
                height={848}
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
