'use client';

import { ModalShell } from './modal-shell';
import { programmes, schools } from '@/lib/content';
import { useModal } from '@/lib/modal-context';

export function ProgrammeModal({ slug }: { slug: string }) {
  const programme = programmes.find((p) => p.slug === slug);
  const { close } = useModal();

  if (!programme) {
    return (
      <ModalShell eyebrow="Programme" title="Programme not found">
        <p className="text-[var(--muted-foreground)]">
          The programme you are looking for could not be found.
        </p>
      </ModalShell>
    );
  }

  const school = schools.find((s) => s.slug === programme.school);

  const handleRegister = () => {
    close();
    setTimeout(() => {
      const el = document.getElementById('register-interest');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const select = document.getElementById('ri-programme') as HTMLSelectElement | null;
      if (select) select.value = programme.slug;
    }, 200);
  };

  return (
    <ModalShell
      eyebrow={programme.schoolName}
      title={programme.name}
      size="wide"
    >
      <div className="space-y-10">
        {programme.image && (
          <figure className="relative aspect-[16/9] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
            <img src={programme.image} alt={programme.alt || programme.name} className="w-full h-full object-cover" />
            <span
              className={`absolute top-4 right-4 status-pill bg-white ${
                programme.status === 'Planned'
                  ? 'status-planned'
                  : programme.status === 'Subject to accreditation'
                    ? 'status-subject'
                    : 'status-interest'
              }`}
            >
              {programme.status}
            </span>
          </figure>
        )}

        <section>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)]">
            <div className="bg-white p-4">
              <dt className="eyebrow mb-1">School</dt>
              <dd className="text-sm font-medium">{programme.schoolName}</dd>
            </div>
            <div className="bg-white p-4">
              <dt className="eyebrow mb-1">Level</dt>
              <dd className="text-sm font-medium">{programme.level}</dd>
            </div>
            <div className="bg-white p-4">
              <dt className="eyebrow mb-1">Delivery</dt>
              <dd className="text-sm font-medium">{programme.delivery}</dd>
            </div>
            <div className="bg-white p-4">
              <dt className="eyebrow mb-1">Duration</dt>
              <dd className="text-sm font-medium">{programme.duration}</dd>
            </div>
          </dl>
        </section>

        <section>
          <p className="eyebrow mb-3">About this programme</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            {programme.description}
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Planned outcomes</p>
          <ul className="space-y-3">
            {programme.outcomes.map((o, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <span className="font-display text-base text-[var(--color-brand-maroon)] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">{o}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="eyebrow mb-3">Assessment</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            {programme.assessment}
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Progression</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            {programme.progression}
          </p>
        </section>

        {school && (
          <section className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
            <p className="eyebrow mb-2">Part of</p>
            <p className="font-display text-lg font-medium mb-2">{school.name}</p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-pretty">
              {school.blurb}
            </p>
          </section>
        )}

        <div className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
          <p className="caption-oryx">
            All programmes are planned and subject to approval. Fees, intake dates, and final
            programme structure to be confirmed. No programme is presented as an approved
            qualification until verified.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <button onClick={handleRegister} className="btn-primary">
            Register Interest for this Programme
          </button>
          <button onClick={close} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
