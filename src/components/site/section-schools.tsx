'use client';

import Link from 'next/link';
import { schools, type School } from '@/lib/content';
import { useReveal } from '@/hooks/use-reveal';

function statusClass(status: string) {
  if (status === 'Planned') return 'status-planned';
  if (status === 'Subject to accreditation') return 'status-subject';
  if (status === 'Applications not yet open') return 'status-applications';
  if (status === 'Approved') return 'status-approved';
  return 'status-info';
}

function SchoolPanel({ school, variant }: { school: School; variant: 'left' | 'right' | 'full' }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (variant === 'full') {
    return (
      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[var(--color-surface-alt)] group`}
      >
        <img
          src={school.image}
          alt={school.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,23,23,0.85)] via-[rgba(23,23,23,0.3)] to-transparent" />
        <div className="absolute inset-0 container-oryx flex flex-col justify-end pb-10 md:pb-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--color-brand-cream)] mb-3">{school.eyebrow}</p>
            <h3 className="font-display text-3xl md:text-5xl text-[var(--color-brand-cream)] font-medium leading-tight uppercase tracking-[0.04em]">
              {school.name}
            </h3>
            <p className="mt-4 text-[var(--color-brand-cream)]/90 text-base md:text-lg max-w-xl text-pretty">
              {school.blurb}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className={`status-pill ${statusClass(school.status)} border-[var(--color-brand-cream)]/70 text-[var(--color-brand-cream)]`}>
                {school.status}
              </span>
              <Link
                href={`/schools/${school.slug}`}
                className="link-arrow text-[var(--color-brand-cream)] text-sm font-semibold uppercase tracking-wider"
              >
                View school
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} grid grid-cols-1 md:grid-cols-2 ${
        variant === 'right' ? 'md:[&>div:first-child]:order-2' : ''
      }`}
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden bg-[var(--color-surface-alt)] group">
        <img
          src={school.image}
          alt={school.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <p className="eyebrow mb-4">{school.eyebrow}</p>
        <h3 className="font-display text-2xl md:text-4xl font-medium leading-tight tracking-[0.04em] uppercase">
          {school.name}
        </h3>
        <p className="mt-5 text-[var(--color-text-secondary)] leading-relaxed text-pretty">
          {school.blurb}
        </p>
        <p className="caption-oryx mt-5">{school.caption}</p>
        <div className="mt-8 flex items-center gap-4">
          <span className={`status-pill ${statusClass(school.status)}`}>
            {school.status}
          </span>
          <Link
            href={`/schools/${school.slug}`}
            className="link-arrow text-[var(--color-brand-ink)] text-sm font-semibold uppercase tracking-wider"
          >
            View school
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SchoolsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="schools" className="bg-[var(--color-surface)] pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36">
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-4">Planned Schools</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-[0.04em] text-balance uppercase">
            Five schools. One discipline.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] text-pretty measure-body">
            Programmes are planned across five schools. Each school addresses a real Namibian need.
            No programme is presented as an approved qualification until verified.
          </p>
        </header>
      </div>

      {/* Full-bleed editorial panels — varied rhythm per Taste variance mandate */}
      <div className="flex flex-col gap-px bg-[var(--color-border)]">
        <SchoolPanel school={schools[0]} variant="full" />
        <SchoolPanel school={schools[1]} variant="left" />
        <SchoolPanel school={schools[2]} variant="right" />
        <SchoolPanel school={schools[3]} variant="left" />
        <SchoolPanel school={schools[4]} variant="full" />
      </div>

      <div className="container-oryx mt-14 md:mt-20">
        <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[var(--color-border)]">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight uppercase tracking-[0.04em]">
              Not sure which school fits?
            </h3>
            <p className="mt-2 text-[var(--color-text-secondary)] text-pretty">
              Register your interest and tell us what you want to study. We will be in touch.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Register Interest
          </Link>
        </div>
      </div>
    </section>
  );
}
