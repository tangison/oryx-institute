'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal, useStaggerReveal } from '@/lib/motion';

const schoolShowcase = [
  { slug: 'safety', name: 'School of Safety', shortName: 'Safety', image: '/images/schools/safety-01.webp', alt: 'Safety training tools and equipment.', caption: 'Occupational safety, first aid, and emergency response qualifications.', href: '/schools/safety' },
  { slug: 'administration', name: 'School of Administration', shortName: 'Administration', image: '/images/schools/administration-01.webp', alt: 'Office administration and commerce.', caption: 'Business administration, office management, and commerce qualifications.', href: '/schools/administration' },
  { slug: 'hospitality', name: 'School of Hospitality', shortName: 'Hospitality', image: '/images/schools/hospitality-01.webp', alt: 'Hospitality and service skills.', caption: 'Hospitality, tourism, and food service qualifications.', href: '/schools/hospitality' },
  { slug: 'digital', name: 'School of Digital', shortName: 'Digital', image: '/images/schools/digital-01.webp', alt: 'Digital and technology training.', caption: 'Digital skills, IT, and technology qualifications.', href: '/schools/digital' },
  { slug: 'future', name: 'Future Schools', shortName: 'Future', image: '/images/campus/arched-corridor.webp', alt: 'Future skills and emerging disciplines.', caption: 'Additional schools planned as demand and accreditation develop.', href: '/schools/future' },
];

const indexEntries = [
  { number: '01', title: 'About the Institute', blurb: 'Vision, mission, and the case for vocational education in Namibia.', href: '/about' },
  { number: '02', title: 'Schools', blurb: 'Five planned schools spanning safety, administration, hospitality, digital, and future skills.', href: '/schools', status: 'Planned' },
  { number: '03', title: 'Programmes', blurb: 'Certificate programmes, short courses, and three learning pathways.', href: '/programmes', status: 'Subject to accreditation' },
  { number: '04', title: 'RPL', blurb: 'Recognition of Prior Learning: turning existing experience into formal qualifications.', href: '/rpl', status: 'Planned' },
  { number: '05', title: 'Work-Integrated Learning', blurb: 'Employer-connected learning that embeds students in real workplaces.', href: '/wil', status: 'Planned' },
  { number: '06', title: 'Advisory & Research', blurb: 'Employer advisory, applied research, and sector consultation.', href: '/advisory-research', status: 'Planned' },
  { number: '07', title: 'Updates', blurb: 'Establishment milestones and public announcements.', href: '/updates' },
  { number: '08', title: 'The Founder', blurb: 'Background and the founding letter from Tangi Iigonda.', href: '/founder' },
  { number: '09', title: 'Partners', blurb: 'Employer, WIL, research, and funding partnerships.', href: '/partners' },
];

export function AnimatedHomeContent() {
  const schoolsRef = useScrollReveal({ delay: 100 });
  const schoolGridRef = useStaggerReveal({ stagger: 100 });
  const visionRef = useScrollReveal({ delay: 200 });
  const exploreRef = useScrollReveal({ delay: 100 });
  const exploreListRef = useStaggerReveal({ stagger: 60 });
  const statusRef = useScrollReveal({ delay: 150 });

  return (
    <>
      {/* ─── Schools — editorial layout, not generic cards ─── */}
      <section
        ref={schoolsRef as React.RefObject<HTMLElement>}
        id="schools"
        aria-labelledby="schools-heading"
        className="border-t border-[var(--color-border)]"
      >
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          {/* Section header — editorial, not generic */}
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <p className="eyebrow mb-3">Planned</p>
              <h2 id="schools-heading" className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05]">
                Five schools for the work Namibia needs
              </h2>
            </div>
            <Link href="/schools" className="hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-[gap] duration-200">
              All Schools <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile: editorial list with image — one-column, not squeezed grid */}
          <div className="hidden md:grid lg:hidden" ref={schoolGridRef as React.RefObject<HTMLDivElement>}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}
          >
            {schoolShowcase.map((school) => (
              <Link key={school.slug} href={school.href} className="group relative overflow-hidden aspect-[3/4] bg-[var(--color-brand-ink)]">
                <img src={school.image} alt={school.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-brand-ink)]/80 via-[var(--color-brand-ink)]/40 to-transparent pt-12 pb-4 px-3">
                  <span className="font-display text-[0.75rem] md:text-[0.8125rem] uppercase tracking-[0.08em] text-[var(--color-brand-cream)] leading-tight font-semibold">{school.shortName}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: 5-column editorial grid */}
          <div ref={schoolGridRef as React.RefObject<HTMLDivElement>} className="hidden lg:grid lg:grid-cols-5 gap-3">
            {schoolShowcase.map((school) => (
              <Link key={school.slug} href={school.href} className="group relative overflow-hidden aspect-[3/4] bg-[var(--color-brand-ink)]">
                <img src={school.image} alt={school.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-brand-ink)]/80 via-[var(--color-brand-ink)]/30 to-transparent pt-16 pb-4 px-3">
                  <span className="font-display text-[0.75rem] uppercase tracking-[0.08em] text-[var(--color-brand-cream)] leading-tight font-semibold">{school.shortName}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile: editorial list — large image rows */}
          <div className="md:hidden space-y-0">
            {schoolShowcase.slice(0, 4).map((school) => (
              <Link
                key={school.slug}
                href={school.href}
                className="group flex items-center gap-4 min-h-[44px] py-4 border-b border-[var(--color-border)] transition-colors duration-200 hover:bg-[var(--color-surface-alt)]/50"
              >
                <div className="w-[88px] h-[66px] flex-shrink-0 overflow-hidden bg-[var(--color-brand-ink)]">
                  <Image
                    src={school.image}
                    alt=""
                    aria-hidden="true"
                    width={88}
                    height={66}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-display text-sm uppercase tracking-[0.06em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 font-semibold">
                    {school.shortName}
                  </span>
                  <span className="text-[0.8125rem] text-[var(--color-text-secondary)] leading-[1.4] line-clamp-2">
                    {school.caption}
                  </span>
                </div>
                <span className="ml-auto text-[var(--color-brand-ink)]/30 group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 flex-shrink-0" aria-hidden="true">→</span>
              </Link>
            ))}
            <Link href="/schools" className="group flex items-center gap-2 py-4 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] hover:gap-3 transition-[gap] duration-200">
              Future Schools <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Vision — editorial, not generic side-by-side ─── */}
      <section
        ref={visionRef as React.RefObject<HTMLElement>}
        id="vision"
        aria-labelledby="vision-heading"
        className="border-t border-[var(--color-border)] bg-[var(--color-brand-ink)]"
        data-dark-surface
      >
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Image — portrait aspect, editorial feel */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/images/campus/corridor-windows.webp"
                  alt="Architectural corridor with warm light and strong shadows through arched windows."
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
                {/* Subtle editorial accent: thin line overlay */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[var(--color-brand-maroon)]/60" aria-hidden="true" />
              </div>
            </div>
            {/* Text — editorial layout with pull-quote style */}
            <div className="lg:col-span-7 max-w-[34rem]">
              <p className="eyebrow text-[var(--color-brand-maroon)] mb-4">From the founder</p>
              <h2 id="vision-heading" className="font-display uppercase text-[var(--color-brand-cream)] text-2xl md:text-3xl tracking-[0.04em] leading-[1.05] mb-4">
                Built for the work Namibia needs
              </h2>
              <p className="font-display normal-case text-lg md:text-xl leading-[1.35] tracking-[0.01em] text-[var(--color-brand-cream)] text-balance mb-4">
                Quiet, rigorous, and shaped by Namibia's working realities.
              </p>
              <p className="text-[1.0625rem] leading-[1.65] text-[var(--color-brand-cream)]/70 max-w-[52ch]">
                Oryx Institute is being established to deliver recognised qualifications that carry weight with employers and accreditation bodies, not certificates that look impressive on paper but mean nothing in practice.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="btn-secondary-dark justify-center">
                  Read the full vision
                </Link>
                <Link href="/founder" className="inline-flex items-center gap-2 text-sm text-[var(--color-brand-cream)]/70 hover:text-[var(--color-brand-cream)] font-medium uppercase tracking-[0.06em] transition-colors duration-200 border-b border-[var(--color-brand-cream)]/30 pb-1">
                  The founding letter <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RPL + WIL pathways — editorial feature strip ─── */}
      <section
        className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]"
        aria-labelledby="pathways-heading"
      >
        <div className="container-oryx py-12 md:py-16 lg:py-20">
          <p className="eyebrow mb-3">Pathways</p>
          <h2 id="pathways-heading" className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05] mb-6">
            Two pathways that change how qualifications work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* RPL card */}
            <Link href="/rpl" className="group block bg-[var(--color-surface-raised)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-brand-maroon)] transition-colors duration-200">
              <div className="flex items-start gap-6 p-6">
                <div className="flex-shrink-0">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-[var(--color-brand-maroon)] text-[var(--color-brand-cream)]">
                    <span className="font-display text-[1.125rem] font-semibold">RPL</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-[0.04em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 leading-[1.1]">
                    Recognition of Prior Learning
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.55] text-[var(--color-text-secondary)]">
                    Existing skills and work experience can count toward formal qualifications. RPL makes experience official.
                  </p>
                  <span className="status-pill status-planned mt-1">Planned</span>
                </div>
                <span className="ml-auto text-[var(--color-brand-ink)]/30 group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 flex-shrink-0 self-center" aria-hidden="true">→</span>
              </div>
            </Link>

            {/* WIL card */}
            <Link href="/wil" className="group block bg-[var(--color-surface-raised)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-brand-maroon)] transition-colors duration-200">
              <div className="flex items-start gap-6 p-6">
                <div className="flex-shrink-0">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-[var(--color-brand-maroon)] text-[var(--color-brand-cream)]">
                    <span className="font-display text-[1.125rem] font-semibold">WIL</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-[0.04em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 leading-[1.1]">
                    Work-Integrated Learning
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.55] text-[var(--color-text-secondary)]">
                    Learning embedded in real workplaces. Students build capability alongside employers, not only in classrooms.
                  </p>
                  <span className="status-pill status-planned mt-1">Planned</span>
                </div>
                <span className="ml-auto text-[var(--color-brand-ink)]/30 group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 flex-shrink-0 self-center" aria-hidden="true">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Explore — numbered editorial index, not generic link list ─── */}
      <section
        ref={exploreRef as React.RefObject<HTMLElement>}
        id="explore"
        aria-labelledby="explore-heading"
        className="border-t border-[var(--color-border)]"
      >
        <div className="container-oryx py-14 md:py-20">
          <p className="eyebrow mb-3">Index</p>
          <h2 id="explore-heading" className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05] mb-8 md:mb-12">
            Explore the Institute
          </h2>
          <div ref={exploreListRef as React.RefObject<HTMLDivElement>}>
            {indexEntries.map((entry) => (
              <Link
                key={entry.number}
                href={entry.href}
                className="group flex items-baseline gap-4 py-5 border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-alt)]/60 transition-colors duration-200"
              >
                <span className="font-display text-sm text-[var(--color-brand-maroon)] tabular-nums flex-shrink-0 w-[2.25rem]">{entry.number}</span>
                <span className="font-display text-base md:text-lg uppercase tracking-[0.04em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200 font-semibold">{entry.title}</span>
                <span className="text-[0.875rem] text-[var(--color-text-secondary)] hidden md:inline ml-2">{entry.blurb}</span>
                <span className="ml-auto text-[var(--color-brand-ink)]/30 group-hover:text-[var(--color-brand-maroon)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" aria-hidden="true">→</span>
                {entry.status && <span className="status-pill ml-2 hidden md:inline-flex">{entry.status}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pre-Launch — editorial, not generic maroon block ─── */}
      <section
        ref={statusRef as React.RefObject<HTMLElement>}
        id="status"
        aria-labelledby="status-heading"
        className="border-t border-[var(--color-border)] bg-[var(--color-brand-maroon)]"
        data-dark-surface
      >
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Status statement — editorial, one fact, one explanation, one action */}
            <div className="lg:col-span-8 max-w-2xl">
              <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-4">Status</p>
              <h2 className="font-display uppercase text-[var(--color-brand-cream)] text-xl md:text-[1.75rem] tracking-[0.04em] leading-[1.15]" id="status-heading">
                Applications are not yet open.
              </h2>
              <p className="mt-4 max-w-[55ch] text-[1.0625rem] leading-[1.65] text-[var(--color-brand-cream)]/75">
                Oryx Institute is in the pre-launch phase. Register your interest to be notified when accreditation milestones are reached and applications open.
              </p>
              <div className="mt-8">
                <Link href="/register" className="btn-secondary-dark">
                  Register Interest
                </Link>
              </div>
            </div>
            {/* Thin maroon accent strip on desktop */}
            <div className="lg:col-span-4 hidden lg:flex lg:justify-end">
              <div className="w-[3px] h-[180px] bg-[var(--color-brand-cream)]/30" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
