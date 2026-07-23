'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function ResearchSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
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
    <section id="research" className="bg-white py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Research and Advisory</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              More than a classroom.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              Applied research, workforce studies, organisational training, and advisory services.
              Small at launch. Growing with the institution. No completed research is claimed.
            </p>

            <figure className="mt-10 relative aspect-[4/3] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
              <img
                src="/images/research/research-1.png"
                alt="An open research notebook with handwritten notes and a brass ruler in warm desk lamp light."
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => open('partner-research')} className="btn-primary">
                Submit Research Enquiry
              </button>
              <button onClick={() => open('partner-funding')} className="btn-secondary">
                Funding and Partnership
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {services.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-6 md:py-8">
                  <span className="font-display text-2xl md:text-3xl text-[var(--color-brand-maroon)] font-medium tabular-nums">
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

            <div className="mt-10 bg-[var(--color-brand-cream)] p-6 md:p-8 border border-[var(--color-border)]">
              <p className="caption-oryx">
                Research and advisory services are in active development. No completed research is
                claimed. No client list is published. Engagements will be announced when verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
