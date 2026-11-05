import Image from "next/image";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * The People section, shared by /about and /about/staff: one person
 * per hairline row, portrait or placeholder left, name, role and bio
 * right. Rows, never a card grid. Placeholders are honest: the
 * herb-sprig blank card, the exact "appointment to be announced"
 * wording, and no face on this site is generated. (STAFF-DIRECTORY.md)
 */

type StaffEntry = {
  slug: string;
  portrait: string;
  portraitAlt: string;
  portraitAltZh: string;
  name: string;
  nameZh: string;
  role: string;
  roleZh: string;
  bio: string;
  bioZh: string;
  email?: string;
};

const PRINCIPAL_PORTRAIT_ALT =
  "The founder walking away through dry golden grass toward a hazy treeline, hard light from the left";
const PRINCIPAL_PORTRAIT_ALT_ZH =
  "创始人背向镜头走过干燥的金色草野，走向朦胧的树线，硬光从左侧打来";
const PLACEHOLDER_ALT =
  "A blank cream card standing upright on dark walnut with a dried herb sprig across the corner, a deliberately visible placeholder";
const PLACEHOLDER_ALT_ZH =
  "一张立起的空白米色卡片放在深胡桃木上，角上斜放一枝干香草，一个刻意可见的占位";

export const staff: StaffEntry[] = [
  {
    slug: "tangi-iigonda",
    portrait: "/images/kinfolk/people/30-founder-walking.jpg",
    portraitAlt: PRINCIPAL_PORTRAIT_ALT,
    portraitAltZh: PRINCIPAL_PORTRAIT_ALT_ZH,
    name: site.principal.name,
    nameZh: site.principal.name,
    role: "Principal · Founder",
    roleZh: "院长 · 创始人",
    bio: "Founder and Principal of Oryx Institute. Before Oryx he founded Tangison Technologies, the Windhoek product studio behind the institute's identity, systems and build, and he directs it still. At Oryx he holds the research leadership, the applications to the NQA and the NTA, ventures oversight and the development of Corner Spa, and he reads every application personally. Based in Windhoek.",
    bioZh:
      "Oryx Institute 的创始人与院长。创办 Oryx 之前，他创立了学院形象、系统与搭建背后的温得和克产品工作室 Tangison Technologies，并至今主持它。在学院，他主持研究工作、向 NQA 与 NTA 提交认证申请、统筹各门实业，并且亲自阅读每一份申请。常驻温得和克。",
    email: site.email,
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltZh: PLACEHOLDER_ALT_ZH,
    slug: "lead-instructor-safety",
    name: "Lead instructor, safety programme",
    nameZh: "安全课程主任讲师",
    role: "Lead instructor · Safety programme",
    roleZh: "主任讲师 · 安全课程",
    bio: "Appointed once curriculum sign-off is complete. Credentials and biography will be published alongside the course outline on 15 November 2026.",
    bioZh:
      "课程大纲定稿后完成聘用。资历与简介将于 2026 年 11 月 15 日随课程大纲一并公布。",
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltZh: PLACEHOLDER_ALT_ZH,
    slug: "research-associate",
    name: "Research associate",
    nameZh: "研究助理",
    role: "Research · Bulletin editor",
    roleZh: "研究 · 公报编辑",
    bio: "Bulletin editor and research associate, appointment to be announced.",
    bioZh: "公报编辑与研究助理，任命待公布。",
  },
  {
    portrait: "/images/kinfolk/people/45-staff-placeholder.jpg",
    portraitAlt: PLACEHOLDER_ALT,
    portraitAltZh: PLACEHOLDER_ALT_ZH,
    slug: "corner-spa-lead",
    name: "Corner Spa lead",
    nameZh: "Corner Spa 负责人",
    role: "Ventures · Corner Spa",
    roleZh: "实业 · 水疗",
    bio: "Lead therapist and operations for Corner Spa, appointment to be announced once premises and licensing are confirmed.",
    bioZh:
      "这家水疗实业的主理疗师与运营负责人，待场地与执照确认后公布任命。",
  },
];

export function StaffRows({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <div className="staff-rows" data-sc-in data-sc-stagger="90">
      {staff.map((p) => (
        <article className="staff-row" key={p.name}>
          <div className="staff-row-portrait">
            <Image
              src={p.portrait}
              alt={zh ? p.portraitAltZh : p.portraitAlt}
              width={560}
              height={700}
              sizes="(min-width: 48rem) 11rem, 60vw"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div>
            <h3 className="h-sub">{zh ? p.nameZh : p.name}</h3>
            <p className="staff-role mt-2">{zh ? p.roleZh : p.role}</p>
            <p className="measure mt-4 text-soft">{zh ? p.bioZh : p.bio}</p>
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="link-type meta mt-4 inline-block"
              >
                {p.email}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
