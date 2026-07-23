'use client';

import { useMemo, useState } from 'react';
import { programmes, schools, type ProgrammeStatus } from '@/lib/content';
import { useModal } from '@/lib/modal-context';
import { useReveal } from '@/hooks/use-reveal';

const STATUS_OPTIONS: ('All' | ProgrammeStatus)[] = [
  'All',
  'Planned',
  'Subject to approval',
  'Register your interest',
];
const LEVEL_OPTIONS = ['All', 'Certificate', 'Diploma', 'Short Course', 'To be confirmed'];
const DELIVERY_OPTIONS = ['All', 'Classroom', 'Blended', 'Workplace', 'Online'];

export function ProgrammesSection() {
  const { open } = useModal();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [school, setSchool] = useState<'All' | string>('All');
  const [level, setLevel] = useState('All');
  const [delivery, setDelivery] = useState('All');
  const [status, setStatus] = useState<'All' | ProgrammeStatus>('All');

  const filtered = useMemo(() => {
    return programmes.filter((p) => {
      if (school !== 'All' && p.school !== school) return false;
      if (level !== 'All' && p.level !== level) return false;
      if (delivery !== 'All' && p.delivery !== delivery) return false;
      if (status !== 'All' && p.status !== status) return false;
      return true;
    });
  }, [school, level, delivery, status]);

  const clearAll = () => {
    setSchool('All');
    setLevel('All');
    setDelivery('All');
    setStatus('All');
  };

  return (
    <section id="programmes" className="bg-white py-20 md:py-28 lg:py-32">
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Planned Programmes</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            Programmes taking shape.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
            A selection of planned programmes. Every programme is subject to approval. Fees and
            intake dates to be confirmed. Register your interest for updates.
          </p>
        </header>

        {/* Filters */}
        <div className="border border-[var(--color-border)] bg-[var(--color-oryx-cream)] p-5 md:p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="filter-school" className="label-oryx">School</label>
              <select
                id="filter-school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="input-oryx"
              >
                <option value="All">All schools</option>
                {schools.filter((s) => s.slug !== 'future').map((s) => (
                  <option key={s.slug} value={s.slug}>{s.shortName}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-level" className="label-oryx">Level</label>
              <select
                id="filter-level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="input-oryx"
              >
                {LEVEL_OPTIONS.map((l) => (
                  <option key={l} value={l}>{l === 'All' ? 'All levels' : l}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-delivery" className="label-oryx">Delivery</label>
              <select
                id="filter-delivery"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="input-oryx"
              >
                {DELIVERY_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d === 'All' ? 'All delivery' : d}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-status" className="label-oryx">Status</label>
              <select
                id="filter-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'All' | ProgrammeStatus)}
                className="input-oryx"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All statuses' : s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'programme' : 'programmes'}
            </p>
            <button
              onClick={clearAll}
              className="text-sm font-medium uppercase tracking-wider text-[var(--oryx-maroon)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Programme list */}
        {filtered.length === 0 ? (
          <div className="border border-[var(--color-border)] bg-[var(--color-oryx-cream)] p-12 text-center">
            <p className="font-display text-xl mb-2">No programmes match your filters.</p>
            <p className="text-[var(--muted-foreground)]">Try adjusting or clearing filters.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {filtered.map((p) => (
              <li key={p.slug} className="bg-white">
                <button
                  onClick={() => open({ programme: p.slug })}
                  className="group w-full text-left p-6 md:p-8 lg:p-10 flex flex-col h-full hover:bg-[var(--color-oryx-cream)]/50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="eyebrow">{p.schoolName}</span>
                    <span
                      className={`status-pill whitespace-nowrap ${
                        p.status === 'Planned'
                          ? 'status-planned'
                          : p.status === 'Subject to approval'
                            ? 'status-subject'
                            : 'status-interest'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed text-pretty flex-1">
                    {p.description}
                  </p>
                  <dl className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border)]">
                    <div>
                      <dt className="eyebrow mb-1">Level</dt>
                      <dd className="text-sm">{p.level}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1">Delivery</dt>
                      <dd className="text-sm">{p.delivery}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1">Duration</dt>
                      <dd className="text-sm">{p.duration}</dd>
                    </div>
                  </dl>
                  <span className="mt-6 link-arrow text-[var(--oryx-maroon)] text-sm font-medium uppercase tracking-wider">
                    View programme
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 bg-[var(--color-oryx-cream)] p-8 md:p-12 border border-[var(--color-border)]">
          <p className="caption-oryx">
            All programmes are planned and subject to approval. Fees, intake dates, and final
            programme structure to be confirmed. No programme is presented as an approved
            qualification until verified.
          </p>
        </div>
      </div>
    </section>
  );
}
