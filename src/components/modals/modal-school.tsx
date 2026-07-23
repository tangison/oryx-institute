'use client';

import { ModalShell } from './modal-shell';
import { schools, programmes, type SchoolSlug } from '@/lib/content';
import { useModal } from '@/lib/modal-context';

export function SchoolModal({ slug }: { slug: SchoolSlug }) {
  const school = schools.find((s) => s.slug === slug);
  const { open } = useModal();

  if (!school) {
    return (
      <ModalShell eyebrow="School" title="School not found">
        <p className="text-[var(--muted-foreground)]">
          The school you are looking for could not be found.
        </p>
      </ModalShell>
    );
  }

  const schoolProgrammes = programmes.filter((p) => p.school === slug);

  return (
    <ModalShell
      eyebrow={school.eyebrow}
      title={school.name}
      size="wide"
    >
      <div className="space-y-10">
        <figure className="relative aspect-[16/9] overflow-hidden bg-[var(--oryx-warm-white)] border border-[var(--color-border)]">
          <img src={school.image} alt={school.alt} className="w-full h-full object-cover" />
          <span
            className={`absolute top-4 right-4 status-pill bg-white ${
              school.status === 'Planned'
                ? 'status-planned'
                : school.status === 'Subject to approval'
                  ? 'status-subject'
                  : 'status-tba'
            }`}
          >
            {school.status}
          </span>
        </figure>

        <section>
          <p className="eyebrow mb-3">Overview</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            {school.detail.what}
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Who this school serves</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            {school.detail.who}
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Pathways</p>
          <ul className="flex flex-wrap gap-2">
            {school.detail.pathways.map((p) => (
              <li key={p} className="px-3 py-2 border border-[var(--color-border)] text-sm bg-[var(--color-oryx-cream)]">
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="eyebrow mb-3">Planned programmes</p>
          {schoolProgrammes.length === 0 ? (
            <ul className="space-y-2">
              {school.detail.plannedProgrammes.map((p) => (
                <li key={p} className="grid grid-cols-[auto_1fr] gap-4 py-2 border-b border-[var(--color-border)]">
                  <span className="status-pill status-planned">Planned</span>
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {schoolProgrammes.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => open({ programme: p.slug })}
                    className="w-full text-left py-4 flex items-center justify-between gap-4 hover:bg-[var(--color-oryx-cream)]/50 transition-colors px-2"
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-base font-medium leading-tight">{p.name}</span>
                      <span className="block text-xs text-[var(--muted-foreground)] mt-1">
                        {p.level} · {p.delivery} · {p.status}
                      </span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="bg-[var(--color-oryx-cream)] p-6 border border-[var(--color-border)]">
          <p className="caption-oryx">
            All programmes in this school are planned and subject to approval. No programme is
            presented as an approved qualification until verified.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => {
              const el = document.getElementById('register-interest');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-primary"
          >
            Register Interest
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
