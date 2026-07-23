'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function PartnerSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();

  const partners = [
    {
      eyebrow: 'For Employers',
      title: 'Recruit trained staff. Host WIL learners.',
      body: 'Oryx Institute intends to partner with Namibian employers across industry, hospitality, retail, administration, safety, and digital sectors. Commission bespoke organisational training, host work-integrated learning placements, or contribute to programme design.',
      primary: { label: 'Submit employer enquiry', modal: 'partner-employer' as const },
      secondary: { label: 'Corporate training', modal: 'partner-corporate' as const },
    },
    {
      eyebrow: 'For WIL Partners',
      title: 'Host learners. Supervise practice. Contribute to assessment.',
      body: 'Work-integrated learning partners provide real workplaces where learners practise under supervision. WIL is not work experience. WIL is structured, assessed, and credited. Partners contribute to assessment against recognised standards.',
      primary: { label: 'Submit WIL enquiry', modal: 'partner-wil' as const },
      secondary: null,
    },
    {
      eyebrow: 'For Research and Advisory Clients',
      title: 'Commission applied research, workforce studies, or advisory services.',
      body: 'Government departments, NGOs, industry associations, and employers can commission applied research, workforce studies, organisational training, and advisory services. Small at launch. Growing with the institution.',
      primary: { label: 'Submit research enquiry', modal: 'partner-research' as const },
      secondary: null,
    },
    {
      eyebrow: 'For Funding and Institutional Partners',
      title: 'Support the establishment of a serious Namibian institution.',
      body: 'Donors, development finance institutions, public skills funds, and academic partners are welcome to register interest in supporting the institution during its establishment phase. No funding is claimed. No partnership is announced until verified.',
      primary: { label: 'Submit funding enquiry', modal: 'partner-funding' as const },
      secondary: null,
    },
  ];

  return (
    <section id="partners" className="bg-[var(--color-brand-cream)] py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-4">Partners and Clients</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            Build with Oryx Institute.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
            Employers, WIL partners, corporate training clients, research and advisory clients, and
            funding and institutional partners are welcome to register interest. Every enquiry is
            reviewed. No partnership is announced until verified.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          {partners.map((p) => (
            <li key={p.eyebrow} className="bg-white p-8 md:p-10 lg:p-12 flex flex-col">
              <p className="eyebrow mb-4">{p.eyebrow}</p>
              <h3 className="font-display text-xl md:text-2xl font-medium leading-tight text-balance">
                {p.title}
              </h3>
              <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed text-pretty flex-1">
                {p.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => open(p.primary.modal)} className="btn-primary">
                  {p.primary.label}
                </button>
                {p.secondary && (
                  <button onClick={() => open(p.secondary!.modal)} className="btn-secondary">
                    {p.secondary.label}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
