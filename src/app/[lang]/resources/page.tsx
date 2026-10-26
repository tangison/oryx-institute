import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { insights, resources } from "@/lib/content";
import { resourcesAf } from "@/lib/content-af";
import { directoryCourses, directoryTemplates } from "@/lib/directory";
import { site } from "@/lib/site";
import { alternates, chrome, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Oryx Directory & Bulletin",
      description:
        "Free Namibia-specific crash courses and fill-in business templates from the Oryx Directory, plus the Oryx Bulletin: cited essays on Namibia's skills and tools.",
      ogTitle: "The Oryx Directory & Bulletin | Oryx Institute",
      ogDescription:
        "The Oryx Directory: free crash courses and business templates, with the Bulletin's cited essays.",
      ldName: "The Oryx Directory and Bulletin",
    },
    head: {
      eyebrow: "Resources",
      title: "The Oryx Directory and Bulletin.",
      lede: "The institute writes down what it knows, and gives it away. The Directory carries the free resource library: Namibia-specific crash courses and business templates, live ahead of accreditation. The Bulletin carries the numbers behind the mission. Nothing here asks you to take a claim on faith.",
    },
    dirEyebrow: "The Oryx Directory",
    dirBody:
      "Free, Namibia-specific, and copyrighted to Oryx Polytechnic Institute: not open-source, but free to access. It is real value on day one, before accreditation, and proof of the rigor everything the institute charges for is held to. Every figure is sourced or labelled as an assumption. None of it is legal, tax, or financial advice.",
    coursesTitle: "Crash courses, Namibia first.",
    templatesTitle: "Business templates, ready to fill.",
    minuteRead: "minute read",
    updated: "Updated",
    coursesWord: "courses",
    templatesWord: "templates",
    registersEyebrow: "The registers",
    registersBody:
      "Everything the institute publishes, listed here. The prospectus is issued on request rather than left to go stale on a server.",
    registerWord: "Register",
    bulletinEyebrow: "The Oryx Bulletin",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools. Written the way the institute teaches: evidence first, decoration never.",
    closeTitle: "Set in ink, kept honest.",
    closeBody:
      "The Bulletin follows the institute's publishing rule: every figure carries its source, nothing is invented to fill a gap, and when a fact changes, the Bulletin changes with it.",
    applyNow: "Apply now",
    whatRuns: "What runs today",
  },
  af: {
    meta: {
      title: "Die Oryx-gids en Bulletin",
      description:
        "Gratis Namibië-spesifieke kondenskursusse en invul-besigheidssjablone uit die Oryx-gids, plus die Oryx Bulletin: aangehaalde opstelle oor Namibië se vaardighede en gereedskap.",
      ogTitle: "Die Oryx-gids en Bulletin | Oryx Instituut",
      ogDescription:
        "Die Oryx-gids: gratis kondenskursusse en besigheidssjablone, saam met die Bulletin se aangehaalde opstelle.",
      ldName: "Die Oryx-gids en Bulletin",
    },
    head: {
      eyebrow: "Hulpbronne",
      title: "Die Oryx-gids en Bulletin.",
      lede: "Die instituut skryf neer wat dit weet, en gee dit weg. Die Gids dra die gratis hulpbronbiblioteek: Namibië-spesifieke kondenskursusse en besigheidssjablone, lewendig voor akkreditering. Die Bulletin dra die syfers agter die missie. Niks hier vra om 'n bewering op geloof aan te neem nie.",
    },
    dirEyebrow: "Die Oryx-gids",
    dirBody:
      "Gratis, Namibië-spesifiek, en aan Oryx Polytechnic Institute kopiereg: nie oopbron nie, maar gratis toeganklik. Dit is werklike waarde op dag een, voor akkreditering, en bewys van die noukeurigheid waaraan alles wat die instituut hef, gehou word. Elke syfer het 'n bron, of word as aanname gemerk. Geen daarvan is regsaangedig, belasting- of finansiële advies nie.",
    coursesTitle: "Kondenskursusse, Namibië eerste.",
    templatesTitle: "Besigheidssjablone, reg om in te vul.",
    minuteRead: "minuut leesstof",
    updated: "Opgedateer",
    coursesWord: "kursusse",
    templatesWord: "sjablone",
    registersEyebrow: "Die registers",
    registersBody:
      "Alles wat die instituut publiseer, hier gelys. Die prospektus word op versoek uitgereik eerder as om op 'n bediener te verouder.",
    registerWord: "Register",
    bulletinEyebrow: "Die Oryx Bulletin",
    bulletinBody:
      "Aangehaalde opstelle oor die syfers, die metode en die gereedskap. Geskryf soos die instituut onderrig: bewys eerste, versiering nooit.",
    closeTitle: "In ink geset, eerlik gehou.",
    closeBody:
      "Die Bulletin volg die instituut se publiseringsreël: elke syfer dra sy bron, niks word uitgevin om 'n leemte te vul nie, en as 'n feit verander, verander die Bulletin saam.",
    applyNow: "Skryf nou in",
    whatRuns: "Wat vandag loop",
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
    alternates: alternates(lang, "/resources", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/resources.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const resList = af ? resourcesAf : resources;
  const A = (path: string) => (af ? `/af${path}` : path);

  const bulletinLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/resources")}`,
    publisher: {
      "@type": "EducationalOrganization",
      name: site.legalName,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bulletinLd) }}
      />

      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The Directory: crash courses */}
      <section id="directory" className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">
              {af ? `${chrome.af.directoryInEnglish} ${t.dirBody}` : t.dirBody}
            </p>
          </div>

          {/* The real count, printed, from the listings themselves. */}
          <p className="meta mt-8 tnum">
            {directoryCourses.length} {t.coursesWord} ·{" "}
            {directoryTemplates.length} {t.templatesWord}
          </p>

          <h2 className="h-section mt-14 max-w-[22ch]">{t.coursesTitle}</h2>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {directoryCourses.map((d) => (
              <Link href={A(`/resources/${d.slug}`)} className="ledger-row group" key={d.slug}>
                <p className="ledger-date">{d.no}</p>
                <div>
                  <h3 className="news-title">{d.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{d.standfirst}</p>
                  <p className="meta mt-3">
                    {d.readMinutes} {t.minuteRead}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="h-section mt-16 max-w-[22ch]">{t.templatesTitle}</h2>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {directoryTemplates.map((d) => (
              <Link href={A(`/resources/${d.slug}`)} className="ledger-row group" key={d.slug}>
                <p className="ledger-date">{d.no}</p>
                <div>
                  <h3 className="news-title">{d.title}</h3>
                  <p className="meta mt-2">
                    {d.readMinutes} min · {t.updated} {d.updated}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The other registers, in one place */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.registersBody}</p>
          </div>
          <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
            {resList.map((r) => (
              <Link
                href={r.action.href.startsWith("/") ? A(r.action.href) : r.action.href}
                className="ledger-row group"
                key={r.name}
              >
                <p className="ledger-date">{t.registerWord}</p>
                <div>
                  <h3 className="news-title">{r.name}</h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{r.what}</p>
                  <p className="meta mt-3">{r.action.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Bulletin. The essays publish in English; the AF page says so. */}
      <section id="bulletin" className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">
              {af ? `${chrome.af.bulletinInEnglish} ${t.bulletinBody}` : t.bulletinBody}
            </p>
          </div>

          <div className="mt-14 grid gap-20" data-sc-in data-sc-stagger="80">
            {insights.map((a) => (
              <article
                key={a.id}
                id={`bulletin-${a.id}`}
                className="hair-t grid gap-8 pt-12 scroll-mt-28 lg:grid-cols-[180px_1fr] lg:gap-16"
              >
                <div>
                  <p className="eyebrow">{a.no}</p>
                  <p className="meta mt-3">{a.date}</p>
                </div>
                <div className="min-w-0">
                  <h3 className="h-section max-w-[26ch]">{a.title}</h3>
                  <p className="lede measure mt-5 text-soft">{a.dek}</p>
                  <div className="article mt-8">
                    {a.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing rule close */}
      <section className="cta-band section-lg on-ink">
        <div className="shell" data-sc-in data-sc-stagger="80">
          <h2 className="h-section max-w-[20ch]">{t.closeTitle}</h2>
          <p className="measure mt-6 text-ivory-80">{t.closeBody}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={A("/apply")} className="btn">
              {t.applyNow}
            </Link>
            <Link href={A("/programmes")} className="btn--quiet btn--quiet--ivory">
              {t.whatRuns} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
