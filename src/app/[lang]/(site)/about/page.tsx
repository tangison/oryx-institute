import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, status, schemaIds } from "@/lib/site";
import { statusAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";
import { StaffRows } from "@/components/site/staff-rows";

/**
 * About: where you meet who built it. The founder opens the page
 * full-bleed under scrub, the proposition on a scrim bottom left; the
 * People section states the team in rows: the Principal's real
 * portrait, and the honest placeholder card for every appointment
 * still pending; the horns hold the polytechnic block; the desert plate
 * breathes before the standing; the colophon carries the Tangison
 * disclosure in prose beside the nib. (Image Bible v6, STAFF-DIRECTORY,
 * CONTENT-CORRECTIONS §5-§6.)
 */
const copy = {
  en: {
    meta: {
      title: "About the Institute",
      description:
        "Oryx Institute: the oryx, the word Polytechnic, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
      ogTitle: "About the Institute | Oryx Institute",
      ogDescription:
        "The oryx, the word Polytechnic, the Principal's office in Windhoek, and the temper the institute teaches by.",
    },
    headTitle: "Built for hard ground.",
    headLede: {
      pre: "The institute is named for the oryx: Namibia's own antelope, straight-horned, unhurried and impossible to starve out of dry country. The wordmark adds ",
      post: ", science and engineering, set in the logo exactly where the two belong.",
    },
    readBulletin: "Read Bulletin No. 1",
    peopleEyebrow: "People",
    peopleTitle: "Who is building it.",
    peopleBody:
      "The register below is the honest state of the team: one Principal, and the appointments the register will date as they land. Placeholder portraits are placeholders on purpose: a real photograph replaces each one the day a real person takes the seat.",
    practiceEyebrow: "The practice",
    practiceBody:
      "Today the institute works as a consultancy. The Owner's Desk runs business counselling from the Principal's office; market research and development work is taken on per engagement; Rapid Response Training brings teams up to standard. The schools follow the practice in order, as accreditation progresses.",
    temperEyebrow: "The temper",
    temperBody:
      "The institute's own flyer says it in three words: looks harmless, isn't. Graduates are measured the same way the certificate measures them, on innovation and applied problem-solving. Quiet work, decisive finishes.",
    officeEyebrow: "The office",
    officeBody: {
      pre: "The institute works from Windhoek, Namibia, and does not operate public premises yet, so no street address is printed. Reach the office by email at ",
      post: ".",
    },
    standsEyebrow: "Where the institute stands",
    standsTitle: "Prelaunch, and honest about it.",
    standsBody: {
      pre: " Legal name: Oryx Polytechnic Institute. The institute is being established in Windhoek; what runs today is what works today.",
    },
    liveNow: "Live now",
    inDevelopment: "In development",
    partnershipsEyebrow: "Partnerships",
    partnershipsPost: " and say what you have in mind.",
    colophonEyebrow: "Identity, system, and build",
    colophonBody:
      "The Oryx Institute identity, website, and learning platform are built and maintained by Tangison Technologies, a Windhoek-based product studio. The Principal of Oryx Institute is also the founder of Tangison Technologies. Tangison provides design, engineering, and hosting services to Oryx under a service agreement; student data submitted to Oryx remains the property of Oryx Institute; Tangison does not sell or share applicant data. Tangison is also Oryx's delivery partner for the upcoming AI training programme. AI curriculum IP is held by Oryx Institute under an assignment agreement.",
    colophonLine: "Identity and build by Tangison · Windhoek",
    legalEyebrow: "Legal",
    legalBipa: {
      pre: "Oryx Polytechnic Institute is registered with the Business and Intellectual Property Authority (BIPA), Namibia. ",
      post: " Registration number and certificate will be published within 14 days of collection from BIPA.",
    },
    legalImagery:
      "The imagery on this site is illustrative, set in the institute's own register, and will be replaced by real photography from Windhoek as it is shot. It is not a depiction of a campus: the institute has no premises to photograph yet, and it does not borrow one. Images carry no captions and make no claims of their own.",
    closeLine: "What is not ready, says so.",
    privacy: "Privacy",
    terms: "Terms",
    staffLink: "The people, on one page",
  },
  af: {
    meta: {
      title: "About the Institute",
      description:
        "Oryx Institute: the oryx, the word Polytechnic, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
      ogTitle: "About the Institute | Oryx Institute",
      ogDescription:
        "The oryx, the word Polytechnic, the Principal's office in Windhoek, and the temper the institute teaches by.",
    },
    headTitle: "Built for hard ground.",
    headLede: {
      pre: "The institute is named for the oryx: Namibia's own antelope, straight-horned, unhurried and impossible to starve out of dry country. The wordmark adds ",
      post: ", science and engineering, set in the logo exactly where the two belong.",
    },
    readBulletin: "Read Bulletin No. 1",
    peopleEyebrow: "People",
    peopleTitle: "Who is building it.",
    peopleBody:
      "The register below is the honest state of the team: one Principal, and the appointments the register will date as they land. Placeholder portraits are placeholders on purpose: a real photograph replaces each one the day a real person takes the seat.",
    practiceEyebrow: "The practice",
    practiceBody:
      "Today the institute works as a consultancy. The Owner's Desk runs business counselling from the Principal's office; market research and development work is taken on per engagement; Rapid Response Training brings teams up to standard. The schools follow the practice in order, as accreditation progresses.",
    temperEyebrow: "The temper",
    temperBody:
      "The institute's own flyer says it in three words: looks harmless, isn't. Graduates are measured the same way the certificate measures them, on innovation and applied problem-solving. Quiet work, decisive finishes.",
    officeEyebrow: "The office",
    officeBody: {
      pre: "The institute works from Windhoek, Namibia, and does not operate public premises yet, so no street address is printed. Reach the office by email at ",
      post: ".",
    },
    standsEyebrow: "Where the institute stands",
    standsTitle: "Prelaunch, and honest about it.",
    standsBody: {
      pre: " Legal name: Oryx Polytechnic Institute. The institute is being established in Windhoek; what runs today is what works today.",
    },
    liveNow: "Live now",
    inDevelopment: "In development",
    partnershipsEyebrow: "Partnerships",
    partnershipsPost: " and say what you have in mind.",
    colophonEyebrow: "Identity, system, and build",
    colophonBody:
      "The Oryx Institute identity, website, and learning platform are built and maintained by Tangison Technologies, a Windhoek-based product studio. The Principal of Oryx Institute is also the founder of Tangison Technologies. Tangison provides design, engineering, and hosting services to Oryx under a service agreement; student data submitted to Oryx remains the property of Oryx Institute; Tangison does not sell or share applicant data. Tangison is also Oryx's delivery partner for the upcoming AI training programme. AI curriculum IP is held by Oryx Institute under an assignment agreement.",
    colophonLine: "Identity and build by Tangison · Windhoek",
    legalEyebrow: "Legal",
    legalBipa: {
      pre: "Oryx Polytechnic Institute is registered with the Business and Intellectual Property Authority (BIPA), Namibia. ",
      post: " Registration number and certificate will be published within 14 days of collection from BIPA.",
    },
    legalImagery:
      "The imagery on this site is illustrative, set in the institute's own register, and will be replaced by real photography from Windhoek as it is shot. It is not a depiction of a campus: the institute has no premises to photograph yet, and it does not borrow one. Images carry no captions and make no claims of their own.",
    closeLine: "What is not ready, says so.",
    privacy: "Privacy",
    terms: "Terms",
    staffLink: "The people, on one page",
    enLedger: { paras: [] as string[] },
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
      images: [
        { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

/** The Polytechnic paragraph, drawn verbatim from Bulletin No. 1, the
    institute's own published explanation of the word. */
const polytechnicEssay = insights[0].body[0];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const st = af ? statusAf : status;
  const A = (path: string) => (af ? `/af${path}` : path);

  /* Truthful structured data: this is the about page of one
     organization, referenced by the same id every other page uses. */
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero: the founder, walking, full-bleed under scrub, the
          proposition on a scrim block bottom left. About is where you
          meet who built it. */}
      <section className="safety-hero" data-sc-act="scrub">
        <div className="safety-hero-media" aria-hidden="true">
          <div className="absolute inset-[-8%]" data-sc-parallax="0.5">
            <Image
              src="/images/kinfolk/people/30-founder-walking.jpg"
              alt=""
              width={1402}
              height={1122}
              priority
              fetchPriority="high"
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="safety-hero-scrim shell">
          <h1 className="h-section max-w-[18ch]">{t.headTitle}</h1>
          <p className="peak-line mt-5">
            {t.headLede.pre}
            <span className="font-[500] text-maroon">POLYTECHNIC</span>
            {t.headLede.post}
          </p>
        </div>
      </section>

      {/* The name, the practice, the temper, the office: one column of
          plain paragraphs. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-10" data-sc-in data-sc-stagger="70">
          <div>
            <p className="eyebrow eyebrow--ink">{t.practiceEyebrow}</p>
            <p className="measure mt-4 text-soft">{t.practiceBody}</p>
          </div>
          <div>
            <p className="eyebrow eyebrow--ink">{t.temperEyebrow}</p>
            <p className="measure mt-4 text-soft">{t.temperBody}</p>
          </div>
          <div>
            <p className="eyebrow eyebrow--ink">{t.officeEyebrow}</p>
            <p className="measure mt-4 text-soft">
              {t.officeBody.pre}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              {t.officeBody.post}
            </p>
          </div>
        </div>
      </section>

      {/* The Polytechnic plate wipes in left to right on its own cream plate,
          the published explanation beside it, the horns holding the
          right of the block. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div
            className="polytechnic-plate grid place-items-center border-y border-rule py-16 md:py-24"
            data-sc-reveal
            aria-hidden="true"
          >
            <p className="text-center text-[clamp(2rem,6vw,5rem)] tracking-[0.14em] leading-none text-maroon">
              POLYTECHNIC
            </p>
          </div>
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">
              {af ? "What Polytechnic stands for" : "What Polytechnic stands for"}
            </p>
            <p className="measure body-lg mt-5">{polytechnicEssay}</p>
            <Link
              href={A("/resources#bulletin-what-a-polytechnic-is")}
              className="btn--quiet mt-6"
            >
              {t.readBulletin} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The wordmark paragraph, beside the horns. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig md:order-2" data-sc-in>
            <Image
              src="/images/kinfolk/core/09-horns.jpg"
              alt="Two shed oryx horns lying parallel, centred on cream paper"
              width={1402}
              height={1122}
              sizes="(min-width: 768px) 22rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div className="md:order-1" data-sc-in>
            <p className="measure text-soft">
              Oryx Institute. In the wordmark the middle word is
              <span className="font-[500] text-maroon"> POLYTECHNIC</span>,
              naming the institute's science-and-engineering purpose. The seal
              above it is the maroon shield, and the whole lockup sets in a
              classic serif, as printed on the institute&apos;s letterhead.
            </p>
          </div>
        </div>
      </section>

      {/* People: the team as hairline rows. Real portrait for the
          Principal; the honest placeholder card for every appointment
          still pending. Never a card grid; never an invented face. */}
      <section className="section" id="staff" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.peopleEyebrow}</p>
            <h2 className="h-section mt-4 max-w-[20ch]">{t.peopleTitle}</h2>
            <p className="measure mt-6 text-soft">{t.peopleBody}</p>
          </div>
          <div className="mt-12">
            <StaffRows lang={lang} />
          </div>
          <p className="meta mt-8">
            <Link href={A("/about/staff")} className="link-type">
              {t.staffLink} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* A silent breath: the desert, full viewport, no text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/inner/25-about-desert.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Where the institute stands */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.standsEyebrow}</p>
            <h2 className="h-section mt-4 max-w-[22ch]">{t.standsTitle}</h2>
            <p className="measure mt-6 text-soft">
              {st.accreditation}
              {t.standsBody.pre}
            </p>

            <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
              {st.liveNow.map((item) => (
                <div className="ledger-row" key={item.name}>
                  <p className="ledger-date">{t.liveNow}</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
              {st.inDevelopment.map((item) => (
                <div className="ledger-row" key={item.name}>
                  <p className="ledger-date">{t.inDevelopment}</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel mt-12 p-8 md:p-10" data-sc-in>
              <p className="measure text-[1.0rem] leading-relaxed">
                {st.partnerships}{" "}
                {af ? "Write to the office at " : "Write to the office at "}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>
                {t.partnershipsPost}
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

      {/* The colophon: the Tangison relationship in prose, beside the
          nib. Text only, no partner marks on this site. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-reveal>
            <Image
              src="/images/kinfolk/texture/34-partner-nib.jpg"
              alt={
                af ? "A brass dip-pen nib, centred on cream paper" : "A brass dip-pen nib, centred on cream paper"
              }
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 13rem, 55vw"
              className="h-auto w-full"
              loading="lazy"
            />
          </figure>
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.colophonEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.colophonBody}</p>
            <p className="meta mt-6">{t.colophonLine}</p>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <div className="measure grid gap-5 text-[0.92rem] leading-relaxed text-soft">
              <p>
                {t.legalBipa.pre}
                {/* Awaiting the founder: print the BIPA registration number when
                    the certificate is in hand. */}
                {t.legalBipa.post}
              </p>
              <p>{st.accreditation}</p>
              <p>{t.legalImagery}</p>
              <p className="flex flex-wrap gap-x-8 gap-y-2">
                <Link href={A("/legal/privacy")} className="link-type">{t.privacy}</Link>
                <Link href={A("/legal/terms")} className="link-type">{t.terms}</Link>
                <a href={`mailto:${site.email}`} className="link-type">{site.email}</a>
              </p>
            </div>
            <p className="measure mt-14 text-ink">{t.closeLine}</p>
          </div>
        </div>
      </section>
    </>
  );
}
