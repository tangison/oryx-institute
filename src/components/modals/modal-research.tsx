'use client';

import { ModalShell } from './modal-shell';
import { useModal } from '@/lib/modal-context';

export function ResearchModal() {
  const { open } = useModal();

  const services = [
    {
      title: 'Applied research',
      body: 'Practical research questions rooted in Namibian industry and public service. Small at launch. Growing with the institution.',
    },
    {
      title: 'Workforce studies',
      body: 'Sector and regional workforce studies commissioned by employers, industry associations, and government.',
    },
    {
      title: 'Organisational training',
      body: 'Bespoke training designed and delivered for employers. Built around the employer\u2019s operational reality.',
    },
    {
      title: 'Advisory services',
      body: 'Advisory engagements on training design, assessment, and skills system development.',
    },
  ];

  return (
    <ModalShell eyebrow="Research and Advisory" title="Research and Advisory" size="wide">
      <div className="space-y-10">
        <section>
          <p className="eyebrow mb-3">Overview</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
            More than a classroom.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Applied research, workforce studies, organisational training, and advisory services.
            Small at launch. Growing with the institution. No completed research is claimed.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-4">Services</p>
          <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {services.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-6">
                <span className="font-display text-2xl md:text-3xl text-[var(--oryx-maroon)] font-medium tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed text-pretty">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[var(--color-oryx-cream)] p-6 border border-[var(--color-border)]">
          <p className="caption-oryx">
            Research and advisory services are in active development. No completed research is
            claimed. No client list is published. Engagements will be announced when verified.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <button onClick={() => open('partner-research')} className="btn-primary">
            Submit Research Enquiry
          </button>
          <button onClick={() => open('partner-funding')} className="btn-secondary">
            Funding and Partnership
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
