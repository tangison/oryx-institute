import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { EditorialHero } from '@/components/site/editorial-hero';
import { EditorialIndex } from '@/components/site/editorial-index';

export const metadata: Metadata = {
  title: 'Oryx Institute — Vocational Training in Windhoek, Namibia',
  description:
    'A multidisciplinary vocational education and training institution being established in Windhoek. Planned schools, programmes, recognition of prior learning, and work-integrated learning.',
  alternates: { canonical: 'https://oryxinstitute.na' },
};

const indexEntries = [
  {
    number: '01',
    title: 'About the Institute',
    blurb: 'Vision, mission, values, and the case for a new vocational institution in Namibia.',
    href: '/about',
  },
  {
    number: '02',
    title: 'Schools',
    blurb: 'Five planned schools spanning safety, administration, hospitality, digital, and future skills.',
    href: '/schools',
    status: 'Planned',
  },
  {
    number: '03',
    title: 'Programmes',
    blurb: 'Certificate and diploma programmes, short courses, and the three learning pathways.',
    href: '/programmes',
    status: 'Subject to accreditation',
  },
  {
    number: '04',
    title: 'Updates',
    blurb: 'Establishment milestones, public notices, and announcements as they happen.',
    href: '/updates',
  },
  {
    number: '05',
    title: 'The Founder',
    blurb: 'Background, motivation, and the founding letter from Tangi Iigonda.',
    href: '/founder',
  },
  {
    number: '06',
    title: 'Research & Advisory',
    blurb: 'Planned research agenda, white papers, and advisory work.',
    href: '/research',
    status: 'Planned',
  },
  {
    number: '07',
    title: 'Partners',
    blurb: 'Employers, WIL hosts, funders, and how to partner with the Institute.',
    href: '/partners',
  },
  {
    number: '08',
    title: 'Brand',
    blurb: 'Identity, palette, typography, and the visual system of the Institute.',
    href: '/brand',
  },
  {
    number: '09',
    title: 'Frequently Asked Questions',
    blurb: 'Programmes, admissions, RPL, work-integrated learning, fees, and campus.',
    href: '/faq',
  },
  {
    number: '10',
    title: 'Contact',
    blurb: 'Enquiries, employer and partner contact, and press.',
    href: '/contact',
  },
];

// School showcase data — visual-driven, minimal text
const schoolShowcase = [
  {
    slug: 'safety',
    name: 'Safety',
    image: '/images/schools/safety-01.webp',
    alt: 'Safety training tools and equipment.',
    href: '/schools/safety',
  },
  {
    slug: 'administration',
    name: 'Administration',
    image: '/images/schools/administration-01.webp',
    alt: 'Office administration and commerce.',
    href: '/schools/administration',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    image: '/images/schools/hospitality-01.webp',
    alt: 'Hospitality and service skills.',
    href: '/schools/hospitality',
  },
  {
    slug: 'digital',
    name: 'Digital',
    image: '/images/schools/digital-01.webp',
    alt: 'Digital and technology training.',
    href: '/schools/digital',
  },
  {
    slug: 'future',
    name: 'Future Skills',
    image: '/images/campus/arched-corridor.webp',
    alt: 'Future skills and emerging disciplines.',
    href: '/schools/future',
  },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main">

        {/* ─── Section 1: Hero ───
            Single seamless infinite video loop. No carousel. No duplication.
            Video NEVER stops. Collins-style restraint: minimal text, maximum visual impact. */}
        <section id="hero" aria-labelledby="hero-heading">
          <EditorialHero />
        </section>

        {/* ─── Section 2: Schools ───
            Visual-driven showcase. Five schools presented as image cards.
            Collins-style: more visuals, fewer words. Each card is a
            single image + school name. The grid IS the design. */}
        <section
          id="schools"
          aria-labelledby="schools-heading"
          className="border-t border-[var(--color-border)]"
        >
          <div className="container-oryx py-16 md:py-24 lg:py-28">
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
              <div>
                <h2
                  id="schools-heading"
                  className="font-display uppercase text-[var(--color-brand-ink)] text-2xl md:text-3xl tracking-[0.04em] leading-[1.05]"
                >
                  Five planned schools
                </h2>
              </div>
              <Link
                href="/schools"
                className="hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-all duration-200"
              >
                All Schools
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* School image grid — 5 columns on desktop, 2 on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {schoolShowcase.map((school) => (
                <Link
                  key={school.slug}
                  href={school.href}
                  className="group relative overflow-hidden aspect-[3/4] bg-[var(--color-brand-ink)]"
                >
                  <img
                    src={school.image}
                    alt={school.alt}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  {/* Bottom overlay with school name */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-brand-ink)]/70 to-transparent pt-8 pb-3 px-3">
                    <span className="font-display text-[0.6875rem] md:text-[0.8125rem] uppercase tracking-[0.08em] text-[var(--color-brand-cream)] leading-tight">
                      {school.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Vision ───
            Founder's note — editorial, narrow measure, generous air.
            Collins-style: visual accent + minimal text. */}
        <section
          id="vision"
          aria-labelledby="vision-heading"
          className="border-t border-[var(--color-border)] bg-[var(--color-brand-ink)]"
          data-dark-surface
        >
          <div className="container-oryx py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Visual accent — campus image */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/campus/corridor-windows.webp"
                    alt="Architectural corridor with warm light and strong shadows."
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text block */}
              <div className="lg:col-span-7 max-w-xl">
                <h2
                  id="vision-heading"
                  className="font-display uppercase text-[var(--color-brand-cream)] text-3xl md:text-4xl tracking-[0.04em] leading-[1.05] mb-2"
                >
                  Built for the work Namibia needs
                </h2>
                <p className="eyebrow text-[var(--color-brand-cream)] mb-6">From the founder</p>
                <p className="font-display text-xl md:text-[1.5rem] leading-[1.35] tracking-[0.01em] text-[var(--color-brand-cream)] text-balance">
                  Quiet, disciplined, and rooted in the Namibian landscape.
                </p>
                <p className="mt-5 max-w-[55ch] text-[1.0625rem] leading-[1.65] text-[var(--color-brand-cream)]/75">
                  Programmes are planned. Accreditation is subject to approval.
                  Applications are not yet open.
                </p>
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-cream)] border-b border-[var(--color-brand-cream)] pb-1 hover:gap-3 transition-all duration-200"
                >
                  Read the full vision
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Explore ───
            Editorial Index — the table of contents. Collins-style: the list IS the design. */}
        <section
          id="explore"
          aria-labelledby="explore-heading"
          className="border-t border-[var(--color-border)]"
        >
          <div className="container-oryx py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <h2
                  id="explore-heading"
                  className="font-display uppercase text-[var(--color-brand-ink)] text-2xl md:text-3xl tracking-[0.04em] leading-[1.05]"
                >
                  Explore the Institute
                </h2>
              </div>
              <p className="max-w-sm text-[0.9375rem] leading-[1.6] text-[var(--color-text-secondary)]">
                Ten destinations. Each its own page, its own idea. Begin anywhere.
              </p>
            </div>
            <EditorialIndex entries={indexEntries} />
          </div>
        </section>

        {/* ─── Section 5: Pre-Launch ───
            Honest, quiet pre-launch notice + Register Interest CTA.
            Collins-style: minimal text, strong visual accent with maroon. */}
        <section
          id="status"
          aria-labelledby="status-heading"
          className="border-t border-[var(--color-border)] bg-[var(--color-brand-maroon)]"
        >
          <div className="container-oryx py-16 md:py-24">
            <div className="max-w-2xl text-center md:text-left">
              <h2
                className="font-display uppercase text-[var(--color-brand-cream)] text-2xl md:text-[1.75rem] tracking-[0.04em] leading-[1.15]"
                id="status-heading"
              >
                Applications are not yet open.
              </h2>
              <p className="mt-4 max-w-[55ch] mx-auto md:mx-0 text-[1.0625rem] leading-[1.65] text-[var(--color-brand-cream)]/80">
                Register your interest to be notified when milestones are reached.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/register" className="btn-secondary-dark justify-center">
                  Register Interest
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-[var(--color-brand-cream)] font-sans text-sm font-semibold uppercase tracking-[0.04em] border-b border-[var(--color-brand-cream)] pb-1 hover:gap-3 transition-all duration-200"
                >
                  Contact
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
