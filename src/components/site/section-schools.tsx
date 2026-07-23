'use client';

import { schools, type School } from '@/lib/content';
import { useModal } from '@/lib/modal-context';
import { useReveal } from '@/hooks/use-reveal';

function SchoolPanel({ school, variant }: { school: School; variant: 'left' | 'right' | 'full' }) {
  const { open } = useModal();
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (variant === 'full') {
    return (
      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[var(--oryx-warm-white)] group`}
      >
        <img
          src={school.image}
          alt={school.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,14,13,0.85)] via-[rgba(15,14,13,0.3)] to-transparent" />
        <div className="absolute inset-0 container-oryx flex flex-col justify-end pb-10 md:pb-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--oryx-warm-white)] mb-3">{school.eyebrow}</p>
            <h3 className="font-display text-3xl md:text-5xl text-[var(--oryx-cream)] font-medium leading-tight">
              {school.name}
            </h3>
            <p className="mt-4 text-[var(--oryx-warm-white)]/90 text-base md:text-lg max-w-xl text-pretty">
              {school.blurb}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span
                className={`status-pill ${
                  school.status === 'Planned'
                    ? 'status-planned'
                    : school.status === 'Subject to approval'
                      ? 'status-subject'
                      : 'status-tba'
                } border-[var(--oryx-warm-white)]/70 text-[var(--oryx-warm-white)]`}
              >
                {school.status}
              </span>
              <button
                onClick={() => open({ school: school.slug })}
                className="link-arrow text-[var(--oryx-cream)] text-sm font-medium uppercase tracking-wider"
              >
                View school
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
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
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden bg-[var(--oryx-warm-white)] group">
        <img
          src={school.image}
          alt={school.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <p className="eyebrow mb-4">{school.eyebrow}</p>
        <h3 className="font-display text-2xl md:text-4xl font-medium leading-tight tracking-tight">
          {school.name}
        </h3>
        <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed text-pretty">
          {school.blurb}
        </p>
        <p className="caption-oryx mt-5">{school.caption}</p>
        <div className="mt-8 flex items-center gap-4">
          <span
            className={`status-pill ${
              school.status === 'Planned'
                ? 'status-planned'
                : school.status === 'Subject to approval'
                  ? 'status-subject'
                  : 'status-tba'
            }`}
          >
            {school.status}
          </span>
          <button
            onClick={() => open({ school: school.slug })}
            className="link-arrow text-[var(--oryx-ink)] text-sm font-medium uppercase tracking-wider"
          >
            View school
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SchoolsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="schools" className="bg-[var(--color-oryx-cream)] py-20 md:py-28 lg:py-32">
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-4">Planned Schools</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            Five schools. One discipline.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
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
            <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight">
              Not sure which school fits?
            </h3>
            <p className="mt-2 text-[var(--muted-foreground)] text-pretty">
              Register your interest and tell us what you want to study. We will be in touch.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('register-interest');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-primary whitespace-nowrap"
          >
            Register Interest
          </button>
        </div>
      </div>
    </section>
  );
}
