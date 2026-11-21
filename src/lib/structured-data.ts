import { getPost } from "@/lib/blog";
import { getCareerRole, careerRoleName } from "@/lib/careers";
import { langPath, type Lang } from "@/lib/i18n";
import { schemaIds, site } from "@/lib/site";

type JsonLd = Record<string, unknown>;

type Breadcrumb = {
  name: string;
  path: string;
};

const labels = {
  en: {
    about: "About",
    apply: "Enquire",
    blog: "Notes from the practice",
    brand: "Brand register",
    careers: "Careers",
    contact: "Contact",
    faq: "Questions and answers",
    legal: "Legal",
    privacy: "Privacy notice",
    terms: "Terms of service",
    links: "Oryx links",
    practice: "Practice",
    register: "Public register",
    research: "Research and development",
    status: "Institutional status",
    ventures: "Ventures",
    cornerSpa: "Corner Spa",
  },
  af: {
    about: "Oor Oryx",
    apply: "Doen navraag",
    blog: "Notas uit die praktyk",
    brand: "Handelsmerkregister",
    careers: "Loopbane",
    contact: "Kontak",
    faq: "Vrae en antwoorde",
    legal: "Regsaangeleenthede",
    privacy: "Privaatheidskennisgewing",
    terms: "Diensvoorwaardes",
    links: "Oryx-skakels",
    practice: "Praktyk",
    register: "Openbare register",
    research: "Navorsing en ontwikkeling",
    status: "Institusionele status",
    ventures: "Ondernemings",
    cornerSpa: "Corner Spa",
  },
} as const;

function pageUrl(lang: Lang, path: string): string {
  return `${site.url}${langPath(lang, path)}`;
}

/**
 * One factual entity graph, rendered once in the shared site layout.
 * It intentionally identifies only the published postal address. No
 * public street address, campus, founder or founding date is asserted.
 */
export function siteGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
        legalName: site.legalName,
        alternateName: [site.tradingName, site.wordmark.middle],
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Close Corporation registration number",
          value: site.registrationNumber,
        },
        url: site.url,
        description: site.description,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/brand/oryx-lockup.svg`,
          width: 646,
          height: 223,
        },
        email: site.email,
        telephone: site.phoneE164,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phoneE164,
            contactType: "customer service",
            email: site.email,
            availableLanguage: ["English", "Afrikaans"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          postOfficeBoxNumber: site.postalAddress.postOfficeBox,
          addressCountry: "NA",
        },
        areaServed: { "@type": "Country", name: site.country },
        sameAs: [...site.socials.map((channel) => channel.href), site.googleReviewUrl],
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        url: site.url,
        name: site.tradingName,
        alternateName: [site.legalName, "Oryx Instituut"],
        publisher: { "@id": schemaIds.org },
        inLanguage: ["en-NA", "af-NA"],
      },
    ],
  };
}

function breadcrumbsFor(lang: Lang, path: string): Breadcrumb[] {
  const t = labels[lang];
  const normalized = path.replace(/^\/(?:af\/)?/, "").replace(/\/$/, "");
  if (!normalized) return [];
  const segments = normalized.split("/");
  const items: Breadcrumb[] = [];
  const add = (name: string, href: string) => items.push({ name, path: href });

  switch (segments[0]) {
    case "about": add(t.about, "/about"); break;
    case "apply": add(t.apply, "/apply"); break;
    case "blog": {
      add(t.blog, "/blog");
      if (segments[1]) {
        const post = getPost(segments[1]);
        add(lang === "af" ? post?.titleAf ?? segments[1] : post?.title ?? segments[1], `/blog/${segments[1]}`);
      }
      break;
    }
    case "brand": add(t.brand, "/brand"); break;
    case "careers": {
      add(t.careers, "/careers");
      if (segments[1]) {
        const role = getCareerRole(segments[1]);
        add(role ? careerRoleName(role) : segments[1], `/careers/${segments[1]}`);
      }
      break;
    }
    case "contact": add(t.contact, "/contact"); break;
    case "faq": add(t.faq, "/faq"); break;
    case "links": add(t.links, "/links"); break;
    case "practice": add(t.practice, "/practice"); break;
    case "register": add(t.register, "/register"); break;
    case "research": add(t.research, "/research"); break;
    case "status": add(t.status, "/status"); break;
    case "ventures": {
      add(t.ventures, "/ventures");
      if (segments[1] === "corner-spa") add(t.cornerSpa, "/ventures/corner-spa");
      break;
    }
    case "legal": {
      add(t.legal, "/legal");
      if (segments[1] === "privacy") add(t.privacy, "/legal/privacy");
      if (segments[1] === "terms") add(t.terms, "/legal/terms");
      break;
    }
    default:
      return [];
  }
  return items;
}

/** A BreadcrumbList is emitted on every nested indexable page. It uses
 * clean public URLs rather than the internal /en rewrite paths. */
export function breadcrumbGraph(lang: Lang, path: string): JsonLd | null {
  const breadcrumbs = breadcrumbsFor(lang, path);
  if (!breadcrumbs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "af" ? "Tuis" : "Home",
        item: pageUrl(lang, "/"),
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: pageUrl(lang, crumb.path),
      })),
    ],
  };
}
