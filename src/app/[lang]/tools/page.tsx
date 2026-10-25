import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { motto, toolsList } from "@/lib/content";
import { mottoAf, toolsListAf } from "@/lib/content-af";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Oryx Tools List",
      description:
        "You're only as good as your tools. We forge them. Every tool the institute runs on, published in the open: office stack, learner's spine, AI stack.",
      ogTitle: "The Oryx Tools List | Oryx Institute",
      ogDescription:
        "Every tool the institute runs on, published in the open, per the tagline: we forge them.",
    },
    head: {
      eyebrow: "Tools & method",
      title: "The tools, named.",
      mottoLead: "The institute's rule is the tagline's:",
      lede: "So the tools are named, not magic. What the institute runs on is listed here in the open, because a school that hides its tools is asking you to trust it blind.",
    },
    closeTitle: "The biggest tool thinks.",
    closeBody:
      "Every tool on this page multiplies the same instrument: a trained mind, working on evidence, finishing what it starts. The AI stack is the newest multiplier and it gets named like everything else, because the institute's rule does not have an exception for software. Learn the tools, then forget none of them.",
    seeSchools: "See the schools",
    askOffice: "Ask the office",
  },
  af: {
    meta: {
      title: "Die Oryx-gereedskapslys",
      description:
        "Jy is net so goed soos jou gereedskap. Ons smee dit. Elke gereedskap waarop die instituut loop, openlik gepubliseer: kantoorstelsel, leerder se ruggengraat, KI-stelsel.",
      ogTitle: "Die Oryx-gereedskapslys | Oryx Instituut",
      ogDescription:
        "Elke gereedskap waarop die instituut loop, openlik gepubliseer, volgens die slagspreuk: ons smee dit.",
    },
    head: {
      eyebrow: "Gereedskap en metode",
      title: "Die gereedskap, by die naam.",
      mottoLead: "Die instituut se reël is die slagspreuk s'n:",
      lede: "So word die gereedskap by die naam genoem, nie as towerkrag nie. Waarop die instituut loop staan hier openlik gelys, want 'n skool wat sy gereedskap wegsteek vra jou om dit blind te vertrou.",
    },
    closeTitle: "Die grootste gereedskap dink.",
    closeBody:
      "Elke gereedskap op hierdie bladsy vermenigvuldig dieselfde instrument: 'n opgeleide verstand, werkend op bewys, wat voltooi wat dit begin. Die KI-stelsel is die nuutste vermenigvuldiger en word soos alles anders by die naam genoem, want die instituut se reël het geen uitsondering vir sagteware nie. Leer die gereedskap, en vergeet dan geen van hulle nie.",
    seeSchools: "Sien die skole",
    askOffice: "Vra die kantoor",
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
    alternates: alternates(lang, "/tools", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        { url: "/brand/og/tools.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const list = af ? toolsListAf : toolsList;
  const m = af ? mottoAf : motto;
  const A = (path: string) => (af ? `/af${path}` : path);

  return (
    <>
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>
          {t.head.mottoLead} <em className="font-serif">{m.line}</em>{" "}
          {t.head.lede}
        </p>
      </PageHead>

      {/* The three registers, text only, no artifact theatre. Rows run
          flat: the ledger's date rail stays reserved for dates. */}
      {list.map((reg) => (
        <section key={reg.register} className="section">
          <div className="shell">
            <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
              <p className="eyebrow">{reg.register}</p>
              <p className="measure text-soft">{reg.intro}</p>
            </div>
            <div className="ledger mt-10" data-sc-in data-sc-stagger="60">
              {reg.items.map((item) => (
                <div className="ledger-row ledger-row--flat" key={item.name}>
                  <div>
                    <h2 className="h-sub">{item.name}</h2>
                    <p className="measure mt-3 text-soft">{item.what}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* The close: the spine made visible */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14" data-sc-in data-sc-stagger="70">
            <h2 className="h-section max-w-[16ch]">{t.closeTitle}</h2>
            <p className="measure mt-6 text-soft">{t.closeBody}</p>
            <div className="mt-9 flex flex-wrap gap-5">
              <Link href={A("/schools")} className="btn">
                {t.seeSchools}
              </Link>
              <a href={`mailto:${site.email}`} className="btn--quiet">
                {t.askOffice} <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
