/**
 * JSON-LD structured data for Oryx Institute.
 *
 * Provides Organization/EducationalOrganization schema on every page,
 * WebSite schema on homepage, and Course schema on programme detail pages.
 *
 * Resolves: SquirrelScan `schema/video` and `Structured Data` score (44→target 80+),
 * website-audit CRITICAL finding #3 ("No structured data").
 */

export const SITE_URL = 'https://oryx-institute.vercel.app';

/** Base Organization schema — embedded on every page */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: 'Oryx Institute',
    alternateName: 'Oryx',
    url: SITE_URL,
    logo: `${SITE_URL}/oryx-shield.png`,
    description:
      'A multidisciplinary vocational education and training institution being established in Windhoek, Namibia.',
    foundingDate: '2026',
    foundingLocation: {
      '@type': 'Place',
      name: 'Windhoek, Namibia',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Windhoek',
        addressCountry: 'NA',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@oryxinstitute.org',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [],
    areaServed: {
      '@type': 'Country',
      name: 'Namibia',
    },
  };
}

/** WebSite schema — homepage only */
export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Oryx Institute',
    url: SITE_URL,
    description:
      'A multidisciplinary vocational education and training institution being established in Windhoek, Namibia.',
    publisher: {
      '@type': 'Organization',
      name: 'Oryx Institute',
    },
  };
}

/** Course schema — programme detail pages */
export function courseLd(course: {
  name: string;
  slug: string;
  description: string;
  level: string;
  delivery: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: `${SITE_URL}/programmes/${course.slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Oryx Institute',
      url: SITE_URL,
    },
    educationalLevel: course.level,
    courseMode: course.delivery === 'Blended' ? 'blended' : course.delivery === 'Workplace' ? 'onsite' : 'offline',
    isAccessibleForFree: false,
    availability: 'https://schema.org/InStoreOnly', // not yet available — planned
    coursePrerequisites: 'To be confirmed',
  };
}

/** VideoObject schema — homepage hero video */
export function videoLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Oryx Institute — Institutional Overview',
    description: 'Visual overview of the Oryx Institute campus and vocational training vision.',
    contentUrl: `${SITE_URL}/hero/oryx-loop.webm`,
    thumbnailUrl: `${SITE_URL}/hero/oryx-loop-poster.jpg`,
    uploadDate: '2026-07-01',
    duration: 'PT30S',
    isFamilyFriendly: true,
  };
}

/**
 * Combine multiple LD blocks into a single script tag contents.
 * Usage: <script type="application/ld+json">{combineLd([...blocks])}</script>
 */
export function combineLd(blocks: object[]) {
  return JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
}
