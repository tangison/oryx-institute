'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function PathwaysDetailSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();

  const blocks = [
    {
      id: 'classroom',
      label: 'Classroom learning',
      body:
        'Classroom learning at Oryx Institute will be structured, focused, and disciplined. Small cohorts. Minimal, warm classrooms. Trainers who combine teaching with current workplace practice. Every classroom module feeds into assessment and progression.',
      cta: null,
    },
    {
      id: 'rpl',
      label: 'Recognition of Prior Learning',
      body:
        'Recognition of Prior Learning (RPL) assesses demonstrated competence against recognised standards. RPL is for experienced workers who can show what they can do. RPL is not automatic certification. Every RPL candidate completes the same assessment as classroom learners.',
      cta: { label: 'Submit RPL enquiry', modal: 'partner-wil' as const },
    },
    {
      id: 'wil',
      label: 'Work-integrated learning',
      body:
        'Work-integrated learning (WIL) places learners in real workplaces for supervised practice. WIL is not work experience. WIL is structured, assessed, and credited. Employer partners host learners, supervise their practice, and contribute to assessment.',
      cta: { label: 'Submit WIL enquiry', modal: 'partner-wil' as const },
    },
    {
      id: 'assessment',
      label: 'Assessment',
      body:
        'Every pathway at Oryx Institute leads to assessment. Assessment is not automatic. Assessment verifies that a learner can demonstrate competence against recognised standards. Assessment methods depend on the programme and may include written checks, practical observation, and workplace evidence.',
      cta: null,
    },
    {
      id: 'progression',
      label: 'Progression',
      body:
        'Oryx Institute intends to support progression from short courses to certificates to diplomas. Progression depends on programme approval, learner numbers, and institutional capacity. No progression is guaranteed until programmes are approved.',
      cta: null,
    },
  ];

  return (
    <section id="pathways-detail" className="bg-white py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-4">Pathways in detail</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            How learners move through the institution.
          </h2>
        </header>

        <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {blocks.map((b, i) => (
            <li key={b.id} id={b.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 scroll-mt-24">
              <div className="md:col-span-3">
                <span className="font-display text-3xl md:text-4xl text-[var(--color-brand-maroon)] font-medium tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 eyebrow">{b.label}</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
                  {b.body}
                </p>
              </div>
              <div className="md:col-span-2 flex md:justify-end md:items-end">
                {b.cta && (
                  <button onClick={() => open(b.cta!.modal)} className="btn-ghost">
                    {b.cta.label}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
