import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { ApplyForm } from "@/components/site/apply-form";
import { ApplyOfferMeta } from "@/components/site/apply-offer-meta";
import { site, offers } from "@/lib/site";
import { siteAf, offersAf } from "@/lib/site-af";
import type { Lang } from "@/lib/i18n";
import { applyOfferIntro, type ApplyOfferSlug } from "@/lib/apply-offers";

/**
 * The application page body, shared by /apply and every /apply/<offer>
 * deep link. The hub renders it bare; the offer routes pass preselect,
 * which drives the composer's field of interest from the route segment
 * instead of the legacy query string. The per-offer metadata is set by
 * each route's own generateMetadata, so the client-side title switch
 * only runs where a variant arrives without its own route.
 */

const copy = {
  en: {
    head: {
      eyebrow: "Apply",
      title: "Apply now.",
      lede: "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. The teaching is crash courses and short courses in business administration and IT and related fields. The practice books through the same desk: the Owner's Desk, market research and development, Rapid Response\u00A0Training.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares\u00A0it.",
      },
      {
        t: "The office replies",
        b: "The Principal's office reads every message and answers personally, usually within the\u00A0week.",
      },
      {
        t: "Talk, then decide",
        b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides\u00A0agree.",
      },
    ],
    composerTitle: "The application message",
    offersEyebrow: "What you can apply for",
    offersTitle: "Six doors, one desk.",
    offersNote:
      "Everything the institute runs today, listed as it runs. Name the one you are writing about; the office reads every application against its own\u00A0offer.",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail\u00A0client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The application exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Who reads it",
    readerBody: `${site.principal.name}, ${site.principal.role}, reads every application personally. The office answers every enquiry by email, and visits are arranged by\u00A0appointment.`,
  },
  af: {
    head: {
      eyebrow: "Apply",
      title: "Apply now.",
      lede: "There is no portal and no queue. Write to the Principal's office directly, and the application starts with your first message. The teaching is crash courses and short courses in business administration and IT and related fields. The practice books through the same desk: the Owner's Desk, market research and development, Rapid Response\u00A0Training.",
    },
    steps: [
      {
        t: "Write one message",
        b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares\u00A0it.",
      },
      {
        t: "The office replies",
        b: "The Principal's office reads every message and answers personally, usually within the\u00A0week.",
      },
      {
        t: "Talk, then decide",
        b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides\u00A0agree.",
      },
    ],
    composerTitle: "The application message",
    offersEyebrow: "What you can apply for",
    offersTitle: "Six doors, one desk.",
    offersNote:
      "Everything the institute runs today, listed as it runs. Name the one you are writing about; the office reads every application against its own\u00A0offer.",
    composerBody: (email: string) => ({
      pre: "Fill it in and it opens as an email addressed to ",
      post: ". Nothing is stored on this site; nothing is sent until you press send in your own mail\u00A0client.",
    }),
    dataEyebrow: "Zero data collection",
    dataBody:
      "The site runs no analytics, no cookies and no accounts. The application exists the moment your email client opens it; before that, it does not exist at all.",
    readerEyebrow: "Who reads it",
    readerBody: `${site.principal.name}, ${site.principal.role}, reads every application personally. The office answers every enquiry by email, and visits are arranged by\u00A0appointment.`,
    enLedger: { paras: [] as string[] },
  },
} as const;

export function ApplyBody({
  lang,
  preselect,
}: {
  lang: Lang;
  preselect?: ApplyOfferSlug;
}) {
  const af = lang === "af";
  const t = copy[lang];
  const offerIntro = preselect ? applyOfferIntro(preselect, lang) : null;

  return (
    <>
      {/* Per-offer client metadata only on the hub: the offer routes
          carry their own server-rendered metadata. */}
      {!preselect && <ApplyOfferMeta lang={lang} />}

      {/* The opener, under scrub: the proposition on the left, the wax
          seal drifting at its own rate on the right. */}
      <section className="section" data-sc-act="scrub">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-16">
          <div>
            <p className="eyebrow eyebrow--ink">{t.head.eyebrow}</p>
            <h1 className="h-display mt-4 max-w-[14ch]">{t.head.title}</h1>
            <p className="measure mt-6 text-soft">{t.head.lede}</p>
          </div>
          <figure className="plate-fig" data-sc-parallax="0.15">
            <Image
              src="/images/kinfolk/core/10-wax-seal.jpg"
              alt="A cream envelope closed with a maroon wax seal and ribbon, centred on cream paper"
              width={1150}
              height={1150}
              sizes="(min-width: 768px) 18rem, 70vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* Each deep-link route names the offer before showing the shared
          message composer. The distinct proposition keeps the route
          useful on its own for people and search engines alike. */}
      {offerIntro && (
        <section className="section-sm" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-12" data-sc-in>
              <p className="eyebrow eyebrow--ink">{offerIntro.eyebrow}</p>
              <h2 className="h-section mt-4 max-w-[20ch]">{offerIntro.title}</h2>
              <p className="measure mt-6 text-soft">{offerIntro.body}</p>
            </div>
          </div>
        </section>
      )}

      {/* How the application runs, hairline ledger. The titles carry the
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

      {/* The six offers, in full: the same ledger the homepage
          carries, so every deep link lands on the whole list and no
          variant of this page reads thin. */}
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
              <ApplyForm lang={lang} preselect={preselect} />
            </div>
          </div>

          <div className="grid gap-8" data-sc-in data-sc-stagger="70">
            {/* The applicant's hand beside the zero-data copy: the
              human plate /apply carries. (Image Audit: k32 beside the
              zero-data line; the wax seal holds the hero above.) */}
            <figure className="apply-plate" data-sc-reveal>
              <Image
                src="/images/kinfolk/people/32-applicant-writing.jpg"
                alt="A hand writing an application letter with a pen on paper in hard window light"
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
