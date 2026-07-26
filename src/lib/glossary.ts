/**
 * Oryx Institute — Glossary content model.
 *
 * Namibian vocational education terms with high search value.
 * All definitions are Namibia-specific. No generic AI phrasing.
 * Institutional restraint throughout.
 */

export type GlossarySlug = 'rpl' | 'wil' | 'nqa' | 'vet' | 'accreditation' | 'nqf';

export interface GlossaryEntry {
  slug: GlossarySlug;
  term: string;
  abbreviation?: string;
  summary: string;
  definition: string;
  relatedTerms: GlossarySlug[];
  relatedPages: { label: string; href: string }[];
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: 'rpl',
    term: 'Recognition of Prior Learning',
    abbreviation: 'RPL',
    summary:
      'Assesses demonstrated competence against recognised standards for experienced workers without formal qualifications.',
    definition:
      'Recognition of Prior Learning (RPL) assesses demonstrated competence against recognised standards in Namibia. RPL is for experienced workers who can show what they can do, not for automatic certification. Every RPL candidate completes the same assessment as classroom learners. The Namibian Qualifications Authority oversees RPL standards. Workers in safety, administration, hospitality, and digital roles who have years of practical experience but no formal qualification can use RPL to gain recognised certification without repeating training they already command.',
    relatedTerms: ['nqa', 'nqf', 'vet'],
    relatedPages: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Programmes', href: '/programmes' },
      { label: 'Register Interest', href: '/register' },
    ],
  },
  {
    slug: 'wil',
    term: 'Work-Integrated Learning',
    abbreviation: 'WIL',
    summary:
      'Structured, assessed, and credited workplace practice as part of a formal vocational programme.',
    definition:
      'Work-integrated learning (WIL) places learners in real workplaces for supervised practice. WIL is not work experience. WIL is structured, assessed, and credited as part of a formal programme. Employer partners host learners, supervise their practice, and contribute to assessment against recognised standards. In Namibia, WIL connects vocational training directly to the industries that need trained staff. Oryx Institute intends to use WIL across all its planned programmes, linking classroom learning to real workplace demands from the first cohort.',
    relatedTerms: ['vet', 'nqa', 'accreditation'],
    relatedPages: [
      { label: 'Programmes', href: '/programmes' },
      { label: 'WIL Partners', href: '/partners/wil' },
      { label: 'Schools', href: '/schools' },
    ],
  },
  {
    slug: 'nqa',
    term: 'Namibian Qualifications Authority',
    abbreviation: 'NQA',
    summary:
      'The statutory body that oversees the National Qualifications Framework, registers qualifications, and accredits providers.',
    definition:
      'The Namibian Qualifications Authority (NQA) is the statutory body responsible for overseeing the National Qualifications Framework in Namibia. The NQA registers qualifications, accredits education and training providers, and ensures that qualifications meet national standards. No programme at Oryx Institute is accredited until the NQA confirms it. The NQA also sets the standards for Recognition of Prior Learning assessments. Any institution offering vocational qualifications in Namibia must operate within the NQA framework.',
    relatedTerms: ['nqf', 'rpl', 'accreditation'],
    relatedPages: [
      { label: 'Programmes', href: '/programmes' },
      { label: 'Schools', href: '/schools' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    slug: 'vet',
    term: 'Vocational Education and Training',
    abbreviation: 'VET',
    summary:
      'Practical, occupation-specific learning that prepares people for trades, crafts, and technical roles.',
    definition:
      'Vocational Education and Training (VET) prepares people for specific trades, crafts, and technical roles through practical, occupation-specific learning. VET differs from academic education by focusing on workplace competence rather than theoretical knowledge. In Namibia, VET addresses the gap between school completion and employment by giving learners skills that employers recognise and need. VET qualifications range from certificates to diplomas, each aligned to the National Qualifications Framework. Oryx Institute intends to offer VET programmes across five schools when established and accredited.',
    relatedTerms: ['nqf', 'nqa', 'wil'],
    relatedPages: [
      { label: 'Schools', href: '/schools' },
      { label: 'Programmes', href: '/programmes' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    slug: 'accreditation',
    term: 'Accreditation',
    summary:
      'The formal NQA process that verifies a programme, qualification, or provider meets national standards.',
    definition:
      'Accreditation in Namibia is the formal process by which the Namibian Qualifications Authority verifies that a programme, qualification, or training provider meets national standards. Accreditation is not assumed. No programme is accredited until the NQA confirms it, and no institution may claim accredited status until verification is complete. Oryx Institute programmes are planned and subject to accreditation. Any status label on this site reflects the current planning status, not formal accreditation.',
    relatedTerms: ['nqa', 'nqf', 'vet'],
    relatedPages: [
      { label: 'Programmes', href: '/programmes' },
      { label: 'Schools', href: '/schools' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    slug: 'nqf',
    term: 'National Qualifications Framework',
    abbreviation: 'NQF',
    summary:
      'Namibia\u2019s structured system that classifies qualifications by level, ensuring comparability and transferability.',
    definition:
      'The National Qualifications Framework (NQF) is Namibia\u2019s structured system that classifies qualifications by level, from basic certificates (Level 1) to advanced diplomas and degrees. The NQF ensures that qualifications from different providers are comparable and transferable. When a learner completes a Level 3 certificate at one institution, that qualification carries the same national standing as a Level 3 certificate from any other accredited provider. The NQA administers the NQF and registers every accredited qualification against its appropriate level.',
    relatedTerms: ['nqa', 'vet', 'rpl'],
    relatedPages: [
      { label: 'Programmes', href: '/programmes' },
      { label: 'Schools', href: '/schools' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

/** Look up a glossary entry by slug */
export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug as GlossarySlug);
}

/** All valid slugs (for generateStaticParams) */
export function glossarySlugs(): GlossarySlug[] {
  return glossaryEntries.map((e) => e.slug);
}
