'use client';

import Link from 'next/link';
import { useScrollReveal, useStaggerReveal } from '@/lib/motion';

const schoolShowcase = [
  { slug: 'safety', name: 'Safety', image: '/images/schools/safety-01.webp', alt: 'Safety training tools and equipment.', href: '/schools/safety' },
  { slug: 'administration', name: 'Administration', image: '/images/schools/administration-01.webp', alt: 'Office administration and commerce.', href: '/schools/administration' },
  { slug: 'hospitality', name: 'Hospitality', image: '/images/schools/hospitality-01.webp', alt: 'Hospitality and service skills.', href: '/schools/hospitality' },
  { slug: 'digital', name: 'Digital', image: '/images/schools/digital-01.webp', alt: 'Digital and technology training.', href: '/schools/digital' },
  { slug: 'future', name: 'Future Schools', image: '/images/campus/arched-corridor.webp', alt: 'Future skills and emerging disciplines.', href: '/schools/future' },
];

const indexEntries = [
  { number: '01', title: 'About the Institute', blurb: 'Vision, mission, and the case for vocational education in Namibia.', href: '/about' },
  { number: '02', title: 'Schools', blurb: 'Five planned schools spanning safety, administration, hospitality, digital, and future skills.', href: '/schools', status: 'Planned' },
  { number: '03', title: 'Programmes', blurb: 'Certificate programmes, short courses, and three learning pathways.', href: '/programmes', status: 'Subject to accreditation' },
  { number: '04', title: 'Updates', blurb: 'Establishment milestones and public announcements.', href: '/updates' },
  { number: '05', title: 'The Founder', blurb: 'Background and the founding letter from Tangi Iigonda.', href: '/founder' },
  { number: '06', title: 'Research & Advisory', blurb: 'Planned research agenda and advisory work.', href: '/research', status: 'Planned' },
  { number: '07', title: 'Partners', blurb: 'Employers, WIL hosts, funders, and partnership pathways.', href: '/partners' },
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
      {/* ─── Schools ─── */}
      <section
        ref={schoolsRef as React.RefObject<HTMLElement>}
        id="schools"
        aria-labelledby="schools-heading"
        className="border-t border-[var(--color-border)]"
      >
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
            <h2 id="schools-heading" className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05]">
              Five planned schools
            </h2>
            <Link href="/schools" className="hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-maroon)] border-b border-[var(--color-brand-maroon)] pb-1 hover:gap-3 transition-[gap] duration-200">
              All Schools <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div ref={schoolGridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
            {schoolShowcase.map((school) => (
              <Link key={school.slug} href={school.href} className="group relative overflow-hidden aspect-[3/4] bg-[var(--color-brand-ink)]">
                <img src={school.image} alt={school.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-brand-ink)]/70 to-transparent pt-8 pb-3 px-2 md:px-3">
                  <span className="font-display text-[0.625rem] md:text-[0.75rem] uppercase tracking-[0.08em] text-[var(--color-brand-cream)] leading-tight">{school.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <section
        ref={visionRef as React.RefObject<HTMLElement>}
        id="vision"
        aria-labelledby="vision-heading"
        className="border-t border-[var(--color-border)] bg-[var(--color-brand-ink)]"
        data-dark-surface
      >
        <div className="container-oryx py-14 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/images/campus/corridor-windows.webp" alt="Architectural corridor with warm light and strong shadows." className="w-full h-full object-cover opacity-90" loading="lazy" />
              </div>
            </div>
            <div className="lg:col-span-7 max-w-[34rem]">
              <h2 id="vision-heading" className="font-display uppercase text-[var(--color-brand-cream)] text-2xl md:text-3xl tracking-[0.04em] leading-[1.05] mb-2">
                Built for the work Namibia needs
              </h2>
              <p className="eyebrow text-[var(--color-brand-cream)] mb-5">From the founder</p>
              <p className="font-display normal-case text-lg md:text-xl leading-[1.35] tracking-[0.01em] text-[var(--color-brand-cream)] text-balance">
                Quiet, disciplined, and rooted in the Namibian landscape.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-brand-cream)] border-b border-[var(--color-brand-cream)] pb-1 hover:gap-3 transition-[gap] duration-200">
                Read the full vision <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Explore ─── */}
      <section
        ref={exploreRef as React.RefObject<HTMLElement>}
        id="explore"
        aria-labelledby="explore-heading"
        className="border-t border-[var(--color-border)]"
      >
        <div className="container-oryx py-14 md:py-20">
          <h2 id="explore-heading" className="font-display uppercase text-[var(--color-brand-ink)] text-xl md:text-2xl tracking-[0.04em] leading-[1.05] mb-8 md:mb-12">
            Explore the Institute
          </h2>
          <div ref={exploreListRef}>
            {indexEntries.map((entry) => (
              <Link key={entry.number} href={entry.href} className="group flex items-baseline gap-4 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-brand-cream)] transition-colors duration-200">
                <span className="font-display text-sm text-[var(--color-brand-maroon)] tabular-nums">{entry.number}</span>
                <span className="font-display text-base md:text-lg uppercase tracking-[0.04em] text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors duration-200">{entry.title}</span>
                <span className="text-sm text-[var(--color-brand-ink)]/60 hidden md:inline">{entry.blurb}</span>
                <span className="ml-auto text-[var(--color-brand-ink)]/40 group-hover:text-[var(--color-brand-maroon)] group-hover:translate-x-1 transition-all duration-200" aria-hidden="true">→</span>
                {entry.status && <span className="status-pill ml-2 hidden md:inline-flex">{entry.status}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pre-Launch ─── */}
      <section
        ref={statusRef as React.RefObject<HTMLElement>}
        id="status"
        aria-labelledby="status-heading"
        className="border-t border-[var(--color-border)] bg-[var(--color-brand-maroon)]"
      >
        <div className="container-oryx py-14 md:py-20">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-display uppercase text-[var(--color-brand-cream)] text-xl md:text-[1.75rem] tracking-[0.04em] leading-[1.15]" id="status-heading">
              Applications are not yet open.
            </h2>
            <p className="mt-3 max-w-[55ch] mx-auto md:mx-0 text-[1.0625rem] leading-[1.65] text-[var(--color-brand-cream)]/80">
              Register your interest to be notified when milestones are reached.
            </p>
            <div className="mt-6">
              <Link href="/register" className="btn-secondary-dark justify-center">
                Register Interest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
