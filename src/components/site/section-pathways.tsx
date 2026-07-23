'use client';

import { pathways } from '@/lib/content';
import { useModal } from '@/lib/modal-context';
import { useReveal } from '@/hooks/use-reveal';

export function PathwaysSection() {
  const { open } = useModal();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="pathways" className="bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] py-20 md:py-28 lg:py-32">
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Learning Pathways</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            More than one way to qualify.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-brand-cream)]/80 text-pretty">
            Oryx Institute will support learners through classroom learning, recognition of prior
            learning, work-integrated learning, assessment, and progression. RPL assesses
            demonstrated competence. RPL is not automatic certification. Every pathway leads to
            assessment.
          </p>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-brand-cream)]/15">
          {pathways.map((p, i) => (
            <li
              key={p.index}
              className="bg-[var(--color-brand-ink)] p-6 md:p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-5xl md:text-6xl text-[var(--color-brand-maroon)] font-medium leading-none">
                  {p.index}
                </span>
                <div className="flex-1 h-px bg-[var(--color-brand-cream)]/20" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-brand-cream)]/75 leading-relaxed">
                {p.caption}
              </p>
              {i === 1 && (
                <button
                  onClick={() => {
                    const el = document.getElementById('rpl');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="mt-6 link-arrow text-[var(--color-brand-cream)] text-xs font-medium uppercase tracking-wider self-start"
                >
                  Learn about RPL
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              )}
              {i === 2 && (
                <button
                  onClick={() => open('partner-wil')}
                  className="mt-6 link-arrow text-[var(--color-brand-cream)] text-xs font-medium uppercase tracking-wider self-start"
                >
                  WIL partnership
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--color-brand-cream)]/15">
          {pathways.slice(0, 3).map((p) => (
            <div key={`detail-${p.index}`} className="bg-[var(--color-brand-ink)] p-8 md:p-10">
              <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-3">In detail</p>
              <h4 className="font-display text-lg mb-3">{p.title}</h4>
              <p className="text-sm text-[var(--color-brand-cream)]/75 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
