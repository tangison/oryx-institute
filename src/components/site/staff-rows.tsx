import Image from "next/image";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/** Shared people rows for /about and /about/staff. */
type StaffEntry = {
  slug: string;
  portrait: string;
  portraitAlt: string;
  portraitAltAf: string;
  name: string;
  nameAf: string;
  role: string;
  roleAf: string;
  bio: string;
  bioAf: string;
  email?: string;
};

const PRINCIPAL_PORTRAIT_ALT =
  "The founder walking away through dry golden grass toward a hazy treeline, hard light from the left";
const PRINCIPAL_PORTRAIT_ALT_AF =
  "Die stigter stap weg deur droë goue gras na 'n wasige boomlyn, met harde lig van links";
const PLACEHOLDER_ALT =
  "A blank cream card standing upright on dark walnut with a dried herb sprig across the corner, a deliberately visible placeholder";
const PLACEHOLDER_ALT_AF =
  "'n Leë roomkaart wat regop op donker okkerneuthout staan, met 'n gedroogde kruietakkie oor die hoek";

export const staff: StaffEntry[] = [
  {
    slug: "tangi-iigonda",
    portrait: "/images/kinfolk/people/30-founder-walking.jpg",
    portraitAlt: PRINCIPAL_PORTRAIT_ALT,
    portraitAltAf: PRINCIPAL_PORTRAIT_ALT_AF,
    name: site.principal.name,
    nameAf: site.principal.name,
    role: "Principal · Founder",
    roleAf: "Prinsipaal · Stigter",
    bio: "Founder and Principal of Oryx Institute. Before Oryx he founded Tangison Technologies, the Windhoek product studio behind the institute's identity, systems and build, and he directs it still. At Oryx he holds the research leadership, the applications to the NQA and the NTA, ventures oversight and the development of Corner Spa, and he reads every application personally. Based in Windhoek.",
    bioAf: "Stigter en Prinsipaal van Oryx Instituut. Voor Oryx het hy Tangison Technologies gestig, die Windhoek-produkstudio agter die instituut se identiteit, stelsels en bouwerk. By Oryx lei hy navorsing, die NQA- en NTA-aansoeke, ondernemings en die ontwikkeling van Corner Spa; hy lees elke aansoek persoonlik.",
    email: site.email,
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltAf: PLACEHOLDER_ALT_AF,
    slug: "lead-instructor-safety",
    name: "Lead instructor, safety programme",
    nameAf: "Hoofinstrukteur, veiligheidsprogram",
    role: "Lead instructor · Safety programme",
    roleAf: "Hoofinstrukteur · Veiligheidsprogram",
    bio: "Appointed once curriculum sign-off is complete. Credentials and biography will be published alongside the course outline on 15 November 2026.",
    bioAf: "Aangestel wanneer die kurrikulum goedgekeur is. Geloofsbriewe en 'n biografie word saam met die kursusoorsig op 15 November 2026 gepubliseer.",
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltAf: PLACEHOLDER_ALT_AF,
    slug: "research-associate",
    name: "Research associate",
    nameAf: "Navorsingsassistent",
    role: "Research · Bulletin editor",
    roleAf: "Navorsing · Bulletin-redakteur",
    bio: "Bulletin editor and research associate, appointment to be announced.",
    bioAf: "Bulletin-redakteur en navorsingsassistent; aanstelling moet nog aangekondig word.",
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltAf: PLACEHOLDER_ALT_AF,
    slug: "corner-spa-lead",
    name: "Corner Spa lead",
    nameAf: "Corner Spa-leier",
    role: "Ventures · Corner Spa",
    roleAf: "Ondernemings · Corner Spa",
    bio: "Lead therapist and operations for Corner Spa, appointment to be announced once premises and licensing are confirmed.",
    bioAf: "Hoofterapeut en bedryfsleier vir Corner Spa; die aanstelling word aangekondig wanneer perseel en lisensiëring bevestig is.",
  },
];

export function StaffRows({ lang }: { lang: Lang }) {
  const af = lang === "af";
  return (
    <div className="staff-rows" data-sc-in data-sc-stagger="90">
      {staff.map((p) => (
        <article className="staff-row" key={p.name}>
          <div className="staff-row-portrait">
            <Image
              src={p.portrait}
              alt={af ? p.portraitAltAf : p.portraitAlt}
              width={560}
              height={700}
              sizes="(min-width: 48rem) 11rem, 60vw"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div>
            <h3 className="h-sub">{af ? p.nameAf : p.name}</h3>
            <p className="staff-role mt-2">{af ? p.roleAf : p.role}</p>
            <p className="measure mt-4 text-soft">{af ? p.bioAf : p.bio}</p>
            {p.email && (
              <a href={`mailto:${p.email}`} className="link-type meta mt-4 inline-block">
                {p.email}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
