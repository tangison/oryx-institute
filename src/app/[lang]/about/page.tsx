import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site, status } from "@/lib/site";
import { siteAf, statusAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "About the Institute",
      description:
        "Oryx Institute: the oryx, the characters 理工, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
      ogTitle: "About the Institute | Oryx Institute",
      ogDescription:
        "The oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
    },
    headTitle: "Built for hard ground.",
    headLede: {
      pre: "The institute is named for the oryx: Namibia's own antelope, straight-horned, unhurried and impossible to starve out of dry country. The wordmark adds ",
      post: ", science and engineering, set in the logo exactly where the two belong.",
    },
    nameEyebrow: "The name",
    nameBody: {
      pre: "Oryx Institute. In the wordmark the middle word stands in Chinese: ",
      post: " (li gong), the characters for science and engineering. The seal above them is the maroon shield, and the whole lockup sets in a classic serif, the way it is printed on the institute's letterhead.",
    },
    ligongEyebrow: "What 理工 stands for",
    readBulletin: "Read Bulletin No. 1",
    practiceEyebrow: "The practice",
    practiceBody:
      "Today the institute works as a consultancy. The Owner's Desk runs business counselling from the Principal's office; market research and development work is taken on per engagement; Rapid Response Training brings teams up to standard. The schools are phased in behind the practice, in order, as accreditation progresses, not before.",
    temperEyebrow: "The temper",
    temperBody:
      "The institute's own flyer says it in three words: looks harmless, isn't. Graduates are measured the same way the certificate measures them, on innovation and applied problem-solving. Quiet work, decisive finishes.",
    officeEyebrow: "The office",
    officeBody: {
      pre: "The institute works from Windhoek, Namibia, and does not operate public premises yet, so no street address is printed. The Principal, Tangi Iigonda, reads every application personally. Reach the office by email at ",
      post: ".",
    },
    principalBody:
      "Reads every application personally. Holds the standard the certificate prints: excellence in innovation and applied problem-solving.",
    portraitMeta: "Portrait to come · Windhoek",
    standsEyebrow: "Where the institute stands",
    standsTitle: "Prelaunch, and honest about it.",
    standsBody: {
      pre: " Legal name: Oryx Polytechnic Institute. The institute is being established in Windhoek; what runs today is what works today.",
    },
    liveNow: "Live now",
    inDevelopment: "In development",
    partnershipsEyebrow: "Partnerships",
    partnershipsPost: " and say what you have in mind.",
    legalEyebrow: "Legal",
    legalBipa: {
      pre: "Oryx Polytechnic Institute is registered with the Business and Intellectual Property Authority (BIPA), Namibia. ",
      post: " The registration number prints here when the certificate is in hand.",
    },
    legalImagery:
      "The imagery on this site is illustrative, set in the institute's own register, and will be replaced by real photography from Windhoek as it is shot. It is not a depiction of a campus: the institute has no premises to photograph yet, and it does not borrow one. Images carry no captions and make no claims of their own.",
    privacy: "Privacy",
    terms: "Terms",
  },
  af: {
    meta: {
      title: "Oor die Instituut",
      description:
        "Oryx Instituut: die oryx, die karakters 理工, die Prinsipaal se kantoor in Windhoek, die konsultasiepraktyk, en die geaardheid waarmee die instituut onderrig.",
      ogTitle: "Oor die Instituut | Oryx Instituut",
      ogDescription:
        "Die oryx, die karakters 理工, die Prinsipaal se kantoor in Windhoek, en die geaardheid waarmee die instituut onderrig.",
    },
    headTitle: "Gebou vir harde grond.",
    headLede: {
      pre: "Die instituut is genoem na die oryx: Namibië se eie antilope, reggehoornd, onhaastig en onmoontlik om uit droë land uit te honger. Die woordmerk voeg by ",
      post: ", wetenskap en ingenieurswese, in die logo presies waar die twee hoort.",
    },
    nameEyebrow: "Die naam",
    nameBody: {
      pre: "Oryx Instituut. In die woordmerk staan die middelste woord in Chinees: ",
      post: " (li gong), die karakters vir wetenskap en ingenieurswese. Die seël daarbo is die maroen-skild, en die hele sluitstel word in 'n klassieke serif geset, soos dit op die instituut se briefhoof gedruk word.",
    },
    ligongEyebrow: "Waartoe 理工 staan",
    readBulletin: "Lees Bulletin No. 1",
    practiceEyebrow: "Die praktyk",
    practiceBody:
      "Vandag werk die instituut as 'n konsultasiepraktyk. Die Eienaar se Lessenaar loop besigheidsberading vanuit die Prinsipaal se kantoor; marknavorsings- en -ontwikkelingswerk word per opdrag aangeneem; Spoedreaksie-opleiding bring spanne tot standaard. Die skole tree agter die praktyk in, in volgorde, namate akkreditering vorder, nie vantevore nie.",
    temperEyebrow: "Die geaardheid",
    temperBody:
      "Die instituut se eie flieër sê dit in drie woorde: lyk onskuldig, is dit nie. Gegradueerdes word gemeet net soos die sertifikaat hulle meet, op innovasie en toegepaste probleemoplossing. Stille werk, beslisse eindes.",
    officeEyebrow: "Die kantoor",
    officeBody: {
      pre: "Die instituut werk vanuit Windhoek, Namibië, en bedryf nog geen openbare perseel nie, dus word geen straatadres gedruk nie. Die Prinsipaal, Tangi Iigonda, lees elke aansoek persoonlik. Bereik die kantoor per e-pos by ",
      post: ".",
    },
    principalBody:
      "Lees elke aansoek persoonlik. Hou die standaard wat die sertifikaat druk: uitmuntendheid in innovasie en toegepaste probleemoplossing.",
    portraitMeta: "Portret volg nog · Windhoek",
    standsEyebrow: "Waar die instituut staan",
    standsTitle: "Voorlansering, en eerlik daaroor.",
    standsBody: {
      pre: " Wetlike naam: Oryx Polytechnic Institute. Die instituut word in Windhoek gestig; wat vandag loop, is wat vandag werk.",
    },
    liveNow: "Lewendig nou",
    inDevelopment: "In ontwikkeling",
    partnershipsEyebrow: "Vennootskappe",
    partnershipsPost: " en sê wat jy voor het.",
    legalEyebrow: "Regs",
    legalBipa: {
      pre: "Oryx Polytechnic Institute is geregistreer by die Business and Intellectual Property Authority (BIPA), Namibië. ",
      post: " Die registrasienommer verskyn hier sodra die sertifikaat in die hand is.",
    },
    legalImagery:
      "Die beeldmateriaal op hierdie werf is illustratief, geset in die instituut se eie register, en sal vervang word met werklike fotografie uit Windhoek namate dit geskiet word. Dit is geen uitbeelding van 'n kampus nie: die instituut het nog geen perseel om te fotografeer nie, en dit leen geen nie. Beelde dra geen opskrifte nie en maak geen eise nie.",
    privacy: "Privaatheid",
    terms: "Voorwaardes",
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
      images: [
        { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

/** The 理工 paragraph, drawn verbatim from Bulletin No. 1, the
    institute's own published explanation of the word. */
const liGongEssay = insights[0].body[0];

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

  return (
    <>
      <PageHead title={t.headTitle}>
        <p>
          {t.headLede.pre}
          <span className="wordmark-cjk">理工</span>
          {t.headLede.post}
        </p>
      </PageHead>

      {/* The name and the 理工 paragraph */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="grid gap-10" data-sc-in data-sc-stagger="70">
            <div>
              <p className="eyebrow eyebrow--ink">{t.nameEyebrow}</p>
              <p className="measure mt-5 text-soft">
                {t.nameBody.pre}
                <span className="wordmark-cjk">理工</span>
                {t.nameBody.post}
              </p>
            </div>

            <div>
              <p className="eyebrow eyebrow--ink">{t.ligongEyebrow}</p>
              <p className="measure mt-5 body-lg">{liGongEssay}</p>
              <Link
                href={A("/resources#bulletin-what-a-polytechnic-is")}
                className="btn--quiet mt-5"
              >
                {t.readBulletin} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>

            <div>
              <p className="eyebrow eyebrow--ink">{t.practiceEyebrow}</p>
              <p className="measure mt-5 text-soft">{t.practiceBody}</p>
            </div>

            <div>
              <p className="eyebrow eyebrow--ink">{t.temperEyebrow}</p>
              <p className="measure mt-5 text-soft">{t.temperBody}</p>
            </div>

            <div>
              <p className="eyebrow eyebrow--ink">{t.officeEyebrow}</p>
              <p className="measure mt-5 text-soft">
                {t.officeBody.pre}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>
                {t.officeBody.post}
              </p>
            </div>
          </div>

          {/* The Principal: the shield holds the portrait slot until
              the Windhoek photoshoot lands. */}
          <div className="quiet-card" data-sc-in>
            {/* TODO founder: Principal portrait, window light from the
                side, dark top, editorial register. Until then the
                maroon shield holds the slot at large size on ivory. */}
            <div className="grid place-items-center border-b border-rule bg-white p-14">
              <OryxLogo variant="emblem" tone="brand" className="h-52 w-auto" />
            </div>
            <div className="p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">
                {af ? "Prinsipaal" : site.principal.role}
              </p>
              <h2 className="h-sub mt-3">{site.principal.name}</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                {t.principalBody}
              </p>
              <p className="meta mt-6">{t.portraitMeta}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where the institute stands */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow">{t.standsEyebrow}</p>
            <h2 className="h-section mt-5 max-w-[22ch]">{t.standsTitle}</h2>
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
              <p className="eyebrow eyebrow--ink">{t.partnershipsEyebrow}</p>
              <p className="measure mt-4 text-[1.0rem] leading-relaxed">
                {st.partnerships}{" "}
                {af ? "Skryf aan die kantoor by " : "Write to the office at "}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>
                {t.partnershipsPost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.legalEyebrow}</p>
            <div className="measure mt-6 grid gap-5 text-[0.92rem] leading-relaxed text-soft">
              <p>
                {t.legalBipa.pre}
                {/* TODO founder: print the BIPA registration number when
                    the certificate is in hand. */}
                {t.legalBipa.post}
              </p>
              <p>{st.accreditation}</p>
              <p>{t.legalImagery}</p>
              <p className="flex flex-wrap gap-x-8 gap-y-2">
                <Link href={A("/privacy")} className="link-type">{t.privacy}</Link>
                <Link href={A("/terms")} className="link-type">{t.terms}</Link>
                <a href={`mailto:${site.email}`} className="link-type">{site.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
