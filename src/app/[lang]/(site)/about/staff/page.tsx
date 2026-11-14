import type { Metadata } from "next";
import Link from "next/link";
import { site, schemaIds } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";
import { StaffRows, staff } from "@/components/site/staff-rows";

/**
 * The people, on one page: the standalone URL for the staff section
 * /about carries, so the register and the course pages can link
 * straight to a name. Same rows, same honesty: real portrait for the
 * Principal, the placeholder card for pending appointments, and no
 * invented face anywhere. (STAFF-DIRECTORY.md)
 *
 * The page declares itself as AboutPage structured data with the staff
 * as Person nodes, and carries the appointment policy in full, so the
 * register reads as the institution's own record rather than a stub.
 */

const copy = {
  en: {
    meta: {
      title: "Staff and appointments · Oryx Institute",
      description:
        "The people building Oryx Institute in Windhoek: the Principal and every appointment as it is confirmed. Open roles are stated plainly until a name is published.",
    },
    headTitle: "The people.",
    headLede:
      "Who is building Oryx Institute, stated as it stands. Credentials and responsibilities are published as appointments are confirmed; the register dates each one the day it lands.",
    registerTitle: "The register of names.",
    policyEyebrow: "How appointments are recorded",
    policy: [
      "The hiring bar is written down before it is used. Every seat the institute needs is listed on this page, filled or not, and every row states what the person actually holds: a role, a credential, a responsibility. Nothing is dressed up. A row that reads appointment to be announced means the seat is genuinely empty, not that a name is being withheld.",
      "An appointment is published the day it is signed, never before. The public register carries the same entry with its date, and where a document exists behind a name, a contract, a registration, a signed agreement, the register names the document. Corrections happen in place: if a role changes or a date moves, the row and the register are corrected together, and nothing is quietly deleted.",
      "Credentials are printed with the person they belong to. The lead instructor for the safety programme is appointed only once curriculum sign-off is complete, and the credentials are published with the name, not after it. This page, the register and the course pages are kept consistent by hand, and the office answers any question about a row by producing the paper behind it.",
    ],
    aboutLink: "About the institute",
    closeLine: "What is not ready, says so.",
  },
  af: {
    meta: {
      title: "Staff and appointments · Oryx Institute",
      description:
        "The people building Oryx Institute in Windhoek: the Principal and every appointment as it is confirmed. Open roles are stated plainly until a name is published.",
    },
    headTitle: "The people.",
    headLede:
      "Who is building Oryx Institute, stated as it stands. Credentials and responsibilities are published as appointments are confirmed; the register dates each one the day it lands.",
    registerTitle: "The register of names.",
    policyEyebrow: "How appointments are recorded",
    policy: [
      "The hiring bar is written down before it is used. Every seat the institute needs is listed on this page, filled or not, and every row states what the person actually holds: a role, a credential, a responsibility. Nothing is dressed up. A row that reads appointment to be announced means the seat is genuinely empty, not that a name is being withheld.",
      "An appointment is published the day it is signed, never before. The public register carries the same entry with its date, and where a document exists behind a name, a contract, a registration, a signed agreement, the register names the document. Corrections happen in place: if a role changes or a date moves, the row and the register are corrected together, and nothing is quietly deleted.",
      "Credentials are printed with the person they belong to. The lead instructor for the safety programme is appointed only once curriculum sign-off is complete, and the credentials are published with the name, not after it. This page, the register and the course pages are kept consistent by hand, and the office answers any question about a row by producing the paper behind it.",
    ],
    aboutLink: "About the institute",
    closeLine: "What is not ready, says so.",
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
    /* Absolute: the title carries the brand in the site's own register;
       the template would print it a second time. */
    title: { absolute: m.title },
    description: m.description,
    alternates: alternates(lang, "/about/staff", site.url),
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/about/staff`,
      images: [
        { url: "/brand/og/about.png", width: 1200, height: 630, alt: m.title },
      ],
    },
  };
}

export default async function StaffPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}${A("/about/staff")}#about`,
    name: t.meta.title,
    url: `${site.url}${A("/about/staff")}`,
    inLanguage: af ? "af-NA" : "en",
    isPartOf: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.legalName,
    },
    about: staff.filter((p) => !p.appointmentPending).map((p) => ({
      "@type": "Person",
      /* One node per person per language: the af page states the same
         row in Afrikaans, so the node is language-scoped rather than
         shared with disagreeing name properties. */
      "@id": `${site.url}${A("/about/staff")}#${p.slug}`,
      name: af ? p.nameAf : p.name,
      jobTitle: af ? p.roleAf : p.role,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The head, on cream. */}
      <section className="section-lg screen-intro" data-sc-act="flow">
        <div className="shell">
          <h1 className="h-display max-w-[16ch]">{t.headTitle}</h1>
          <p className="lede measure mt-6 text-soft">{t.headLede}</p>
        </div>
      </section>

      {/* The rows, under their own section heading so the page reads
          h1 into h2 without a skip. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.registerTitle}</h2>
          <div className="mt-12">
            <StaffRows lang={lang} />
          </div>
          <p className="meta mt-10">
            <Link href={A("/about")} className="link-type">
              {t.aboutLink} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* How appointments are recorded: the policy, in prose. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8" data-sc-in data-sc-stagger="70">
          <p className="eyebrow eyebrow--ink">{t.policyEyebrow}</p>
          {t.policy.map((p, i) => (
            <p key={i} className="measure text-soft">
              {p}
            </p>
          ))}
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

      {/* The close. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <p className="lede measure">{t.closeLine}</p>
        </div>
      </section>
    </>
  );
}
