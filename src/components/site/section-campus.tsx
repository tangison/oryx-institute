'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function CampusSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();

  return (
    <section id="campus" className="bg-[var(--color-brand-cream)] py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Campus Concept</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              A lean Windhoek micro-campus.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              A planned campus designed for focus. Reception that supports front-office training.
              Flexible classrooms. A mobile laptop laboratory. Secure learner-record facilities.
              Future modular classrooms. Images are architectural concepts, not completed facilities.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                { t: 'Reception', d: 'Designed to support front-office training.' },
                { t: 'Flexible classrooms', d: 'Horseshoe layouts. Movable furniture.' },
                { t: 'Mobile laptop laboratory', d: 'For digital skills anywhere on campus.' },
                { t: 'Learner-record facilities', d: 'Secure storage for learner evidence.' },
                { t: 'Future modular classrooms', d: 'Expandable as the institution grows.' },
              ].map((item) => (
                <li key={item.t} className="grid grid-cols-[1fr_2fr] gap-4 pt-4 border-t border-[var(--color-border)]">
                  <span className="font-display text-base md:text-lg">{item.t}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">{item.d}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const el = document.getElementById('campus-detail');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="mt-10 btn-secondary"
            >
              View Campus Concept
            </button>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <figure className="relative aspect-[16/10] overflow-hidden bg-white border border-[var(--color-border)]">
              <img
                src="/images/campus/campus-1.png"
                alt="An architectural concept sketch of a minimalist Windhoek campus in pencil on cream paper."
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-[rgba(15,14,13,0.7)] text-[var(--color-brand-cream)] text-xs px-4 py-2 m-3">
                Architectural concept. Not a completed facility.
              </figcaption>
            </figure>
            <figure id="campus-detail" className="relative aspect-[16/10] overflow-hidden bg-white border border-[var(--color-border)]">
              <img
                src="/images/campus/campus-2.png"
                alt="An architectural concept interior of a small classroom with horseshoe desks and a tall window."
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-[rgba(15,14,13,0.7)] text-[var(--color-brand-cream)] text-xs px-4 py-2 m-3">
                Architectural concept interior. Not a completed facility.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
