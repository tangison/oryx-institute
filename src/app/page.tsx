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
    blurb:
      'Vision, mission, values, and the case for a new vocational institution in Namibia.',
    href: '/about',
  },
  {
    number: '02',
    title: 'Schools',
    blurb:
      'Five planned schools spanning safety, administration, hospitality, digital, and future skills.',
    href: '/schools',
    status: 'Planned',
  },
  {
    number: '03',
    title: 'Programmes',
    blurb:
      'Certificate and diploma programmes, short courses, and the three learning pathways.',
    href: '/programmes',
    status: 'Subject to accreditation',
  },
  {
    number: '04',
    title: 'Updates',
    blurb:
      'Establishment milestones, public notices, and announcements as they happen.',
    href: '/updates',
  },
  {
    number: '05',
    title: 'The Founder',
    blurb:
      'Background, motivation, and the founding letter from Tangi Iigonda.',
    href: '/founder',
  },
  {
    number: '06',
    title: 'Research & Advisory',
    blurb:
      'Planned research agenda, white papers, and advisory work.',
    href: '/research',
    status: 'Planned',
  },
  {
    number: '07',
    title: 'Partners',
    blurb:
      'Employers, WIL hosts, funders, and how to partner with the Institute.',
    href: '/partners',
  },
  {
    number: '08',
    title: 'Brand',
    blurb:
      'Identity, palette, typography, and the visual system of the Institute.',
    href: '/brand',
  },
  {
    number: '09',
    title: 'Frequently Asked Questions',
    blurb:
      'Programmes, admissions, RPL, work-integrated learning, fees, and campus.',
    href: '/faq',
  },
  {
    number: '10',
    title: 'Contact',
    blurb:
      'Enquiries, employer and partner contact, and press.',
    href: '/contact',
  },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <EditorialHero />

        {/* Brief editorial intro — one paragraph, narrow measure, generous air */}
        <section className="container-oryx py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">A note from the founder</p>
            <p className="font-display text-2xl md:text-[1.75rem] leading-[1.35] tracking-[0.01em] text-[var(--color-brand-ink)] text-balance">
              Oryx Institute is being built for the work Namibia needs. Quiet,
              disciplined, and rooted in the Namibian landscape — a place for
              serious learning across five planned schools.
            </p>
            <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-[1.65] text-[var(--color-text-secondary)]">
              Programmes are planned. Accreditation is subject to approval.
              Applications are not yet open. This is a record of intent, not a
              prospectus — and an invitation to register interest as the
              institution takes shape.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-all duration-200"
            >
              Read the full vision
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Editorial Index — the table of contents */}
        <section
          aria-labelledby="index-heading"
          className="border-t border-[var(--color-border)]"
        >
          <div className="container-oryx py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow mb-4">Index</p>
                <h2
                  id="index-heading"
                  className="font-display uppercase text-[var(--color-brand-ink)] text-3xl md:text-4xl tracking-[0.04em] leading-[1.05]"
                >
                  Where to go next
                </h2>
              </div>
              <p className="max-w-sm text-[0.9375rem] leading-[1.6] text-[var(--color-text-secondary)]">
                Ten destinations. Each its own page, its own idea. Begin
                anywhere.
              </p>
            </div>
            <EditorialIndex entries={indexEntries} />
          </div>
        </section>

        {/* Pre-launch notice — quiet, honest */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]">
          <div className="container-oryx py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">Pre-Launch Status</p>
              <h2 className="font-display uppercase text-2xl md:text-[1.75rem] tracking-[0.03em] leading-[1.15] text-[var(--color-brand-ink)]">
                Applications are not yet open.
              </h2>
              <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.65] text-[var(--color-text-secondary)]">
                Oryx Institute is in the establishment phase. Programmes are
                planned, accreditation is subject to approval, and no
                applications are being accepted at this time. Register your
                interest to be notified when milestones are reached.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
