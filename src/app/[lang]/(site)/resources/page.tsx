import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageHead } from "@/components/site/page-head";
import { insights, resources } from "@/lib/content";
import { resourcesAf } from "@/lib/content-af";
import { directoryCourses, directoryTemplates } from "@/lib/directory";
import { site, schemaIds } from "@/lib/site";
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
      title: "The Oryx Directory and Bulletin.",
      lede: "The institute writes down what it knows, and gives it away. The Directory carries the free resource library: Namibia-specific crash courses and business templates, live ahead of accreditation. The Bulletin carries the numbers behind the work. Nothing here asks you to take a claim on faith.",
    },
    dirEyebrow: "The Oryx Directory",
    dirBody:
      "Free, Namibia-specific, and copyrighted to Oryx Polytechnic Institute: not open-source, but free to access. It is real value on day one, before accreditation, and proof of the rigor everything the institute charges for is held to. Every legal or regulatory page links its checkable source; every worked number is sourced or labelled as an assumption. None of it is legal, tax, or financial advice.",
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
    bulletinLine: "Dated. Public. Every figure carries its source.",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools. Written the way the institute teaches: evidence first, decoration never.",
    closeTitle: "Set in ink, kept honest.",
    closeBody:
      "The Bulletin follows the institute's publishing rule: every figure carries its source, nothing is invented to fill a gap, and when a fact changes, the Bulletin changes with it.",
    applyNow: "Apply now",
    whatRuns: "See the Practice",
  },
  af: {
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
      title: "The Oryx Directory and Bulletin.",
      lede: "The institute writes down what it knows, and gives it away. The Directory carries the free resource library: Namibia-specific crash courses and business templates, live ahead of accreditation. The Bulletin carries the numbers behind the work. Nothing here asks you to take a claim on faith.",
    },
    dirEyebrow: "The Oryx Directory",
    dirBody:
      "Free, Namibia-specific, and copyrighted to Oryx Polytechnic Institute: not open-source, but free to access. It is real value on day one, before accreditation, and proof of the rigor everything the institute charges for is held to. Every legal or regulatory page links its checkable source; every worked number is sourced or labelled as an assumption. None of it is legal, tax, or financial advice.",
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
    bulletinLine: "Dated. Public. Every figure carries its source.",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools. Written the way the institute teaches: evidence first, decoration never.",
    closeTitle: "Set in ink, kept honest.",
    closeBody:
      "The Bulletin follows the institute's publishing rule: every figure carries its source, nothing is invented to fill a gap, and when a fact changes, the Bulletin changes with it.",
    applyNow: "Apply now",
    whatRuns: "See the Practice",
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
    alternates: alternates(lang, "/resources", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/resources`,
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
    publisher: { "@type": "EducationalOrganization", "@id": schemaIds.org },
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

      {/* The opener: the journal detail: an open journal with a dip
          pen resting in the fold, the library's own document, at
          roughly 70vh under a gentle scrub. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.14">
            <Image
              src="/images/kinfolk/inner/16-journal-detail.jpg"
              alt="An open journal with a dip pen resting in the fold, centred on cream"
              width={1402}
              height={1122}
              priority
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* The Directory: crash courses */}
      <section id="directory" className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.dirEyebrow}</p>
            <p className="measure mt-5 text-soft">
              {af ? `${chrome.af.directoryInEnglish} ${t.dirBody}` : t.dirBody}
            </p>
          </div>

          {/* The real count, printed, from the listings themselves. */}
          <p className="meta mt-8 tnum">
            {directoryCourses.length} {t.coursesWord} ·{" "}
            {directoryTemplates.length} {t.templatesWord}
          </p>

          <h2 className="h-section mt-14 max-w-[22ch]">{t.coursesTitle}</h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-start">
            <figure className="plate-fig" data-sc-reveal>
              <Image
                src="/images/kinfolk/inner/26-course-paper.jpg"
                alt="A stack of printed course pages with a red pencil, centred on cream"
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 16rem, 60vw"
                className="h-auto w-full"
                loading="eager"
              />
            </figure>
            <div className="ledger" data-sc-in data-sc-stagger="60">
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
          </div>
        </div>
      </section>

      {/* Mid-page breath: the template ruler: measuring, marking,
          the template's own instrument. No text, full viewport. */}
      <div className="divider divider--full overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="0.8">
          <Image
            src="/images/kinfolk/inner/27-template-ruler.jpg"
            alt=""
            width={1402}
            height={1122}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[22ch]">{t.templatesTitle}</h2>
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

      {/* The other registers, in one place: hairline grid, two columns
          on desktop, one on mobile. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.registersEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.registersBody}</p>
          </div>
          <div className="ledger mt-10 grid gap-x-16 md:grid-cols-2" data-sc-in data-sc-stagger="60">
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

      {/* The peak: the Bulletin named over the reader: a person
          reading a pamphlet, the one human plate the Directory carries
          pinned for two viewports, the line arriving over the pin. */}
      <section className="peak" id="bulletin" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale aria-hidden="true">
            <Image
              src="/images/kinfolk/people/35-bulletin-reader.jpg"
              alt=""
              width={1122}
              height={1402}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="shell flex h-full flex-col justify-center py-24">
            <div data-sc-scrim>
              <p className="eyebrow eyebrow--ink">{t.bulletinEyebrow}</p>
              <p className="pull-quote mt-6 max-w-[22ch]">{t.bulletinLine}</p>
              <p className="measure mt-6 text-soft">
                {af ? `${chrome.af.bulletinInEnglish} ` : ""}
                {t.bulletinBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The essays themselves. They publish in English. Each essay
          ends on the red ground: a silent, full-bleed tail plate that
          gives the reader a place to land before the next piece
          (Image Audit: one breath per essay, no text over it). */}
      {insights.map((a) => (
        <Fragment key={a.id}>
          <section className="section" data-sc-act="flow">
            <div className="shell">
              <article
                id={`bulletin-${a.id}`}
                className="hair-t grid gap-8 pt-12 scroll-mt-28 lg:grid-cols-[180px_1fr] lg:gap-16"
                data-sc-in
              >
                <div>
                  <p className="eyebrow">{a.no}</p>
                  <p className="meta mt-3">{a.date}</p>
                  {/* Review metadata (CONTENT-CORRECTIONS §11): author,
                      review date, reviewer, and the error door. */}
                  <p className="meta mt-6">{af ? "Written by Tangi Iigonda, Principal" : "Written by Tangi Iigonda, Principal"}</p>
                  <p className="meta mt-2">{af ? "Last reviewed 1 November 2026 · Reviewed by Tangi Iigonda, Principal" : "Last reviewed 1 November 2026 · Reviewed by Tangi Iigonda, Principal"}</p>
                  <a
                    href="mailto:corrections@oryxinstitute.org?subject=Bulletin%20correction"
                    className="link-type meta mt-3 inline-block"
                  >
                    {af ? "Report an error" : "Report an error"}{" "}
                    <span className="arr" aria-hidden="true">→</span>
                  </a>
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
            </div>
          </section>
          <div
            className="divider overflow-hidden"
            data-sc-act="flow"
            aria-hidden="true"
          >
            <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
              <Image
                src="/images/kinfolk/texture/39-red-ground.jpg"
                alt=""
                width={1254}
                height={1254}
                quality={62}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Fragment>
      ))}

      {/* Publishing rule close, on cream: the footer is the only ink
          ground on the site. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <h2 className="h-section max-w-[20ch]">{t.closeTitle}</h2>
          <p className="measure mt-6 text-soft">{t.closeBody}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href={A("/apply")} className="btn">
              {t.applyNow}
            </Link>
            <Link href={A("/practice")} className="btn--quiet">
              {t.whatRuns} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
