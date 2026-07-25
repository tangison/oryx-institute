'use client';

import { ModalShell } from './modal-shell';
import { values } from '@/lib/content';
import { useModal } from '@/lib/modal-context';

export function InstituteModal() {
  const { open } = useModal();

  return (
    <ModalShell
      eyebrow="The Institute"
      title="About Oryx Institute"
      size="wide"
    >
      <div className="space-y-12">
        <section>
          <p className="eyebrow mb-3">Introduction</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
            A Namibian institution taking shape.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute is being developed as a multidisciplinary training, research, and
            advisory institution rooted in Namibia. It is being established in Windhoek. It is not
            yet operating. Programmes are subject to approval.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Mission</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            To give Namibians practical, recognised skills.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute will deliver vocational education that is rigorous, practical, and
            shaped by Namibia's working realities. It will train, assess, research, and advise across
            multiple disciplines. It will serve learners, employers, and the wider Namibian economy.
            These are intentions. They are not yet achievements.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Vision</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            An institution built to last.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute intends to become a recognised Namibian institution known for rigour,
            restraint, and honest work. It will grow carefully, not quickly. It will add schools,
            programmes, and services as the institution proves its capacity. No timeline is claimed.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-4">Values</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-6">
            What the institution stands for.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {values.map((v) => (
              <li key={v.title} className="bg-white p-6">
                <p className="font-display text-lg font-medium mb-2">{v.title}</p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{v.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="eyebrow mb-3">What is becoming</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Five schools. Multiple pathways. One campus.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Five planned schools. Classroom learning, recognition of prior learning, work-integrated
            learning, assessment, and progression. A lean Windhoek micro-campus. Applied research
            and advisory services, small at launch. All planned. All subject to approval. No claim
            of current operation.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">What it is not</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Clear about the limits.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Not yet registered. Not yet accredited. Not yet enrolling learners. Not yet offering
            qualifications. Not a university. Not a franchise. Not a technology startup. Not a
            school template. These are not permanent limits. They are honest descriptions of where
            the institution stands today.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Founder</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Tangi Iigonda.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Tangi Iigonda is the founder of Oryx Institute. The institution is being established
            under his direction.
          </p>
          <button onClick={() => open('founder')} className="mt-4 btn-ghost">
            Read About the Founder
          </button>
        </section>

        <section>
          <p className="eyebrow mb-3">The journey</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Being established, step by step.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Public marketing begins approximately four months before classes open. No dates are
            published until verified. The institution will share updates as it progresses. Subscribe
            to the mailing list or register your interest to follow.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => {
              const el = document.getElementById('schools');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-primary"
          >
            Explore Schools
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('register-interest');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="btn-secondary"
          >
            Register Interest
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
