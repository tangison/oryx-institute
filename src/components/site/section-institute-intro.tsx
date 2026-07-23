'use client';

import { useModal } from '@/lib/modal-context';
import { useReveal } from '@/hooks/use-reveal';

export function InstituteIntro() {
  const { open } = useModal();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="institute-intro" className="bg-white py-20 md:py-28 lg:py-32">
      <div
        ref={ref}
        className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--oryx-warm-white)]">
              <img
                src="/images/institute/institute-1.png"
                alt="An institutional crest carved in sandstone, weathered, with warm afternoon light."
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="caption-oryx mt-3">
              Restraint, permanence, and place. The visual vocabulary of the institution.
            </p>
          </div>

          {/* Text column */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <p className="eyebrow mb-4">The Institute</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              A Namibian institution taking shape.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              Oryx Institute is being developed as a multidisciplinary training, research, and
              advisory institution rooted in Namibia. It will deliver classroom learning, recognise
              prior learning, and place learners in real workplaces. Programmes are planned across
              five schools. All are subject to approval.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-8">
              <div>
                <dt className="eyebrow mb-2">Location</dt>
                <dd className="font-display text-lg">Windhoek, Namibia</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Status</dt>
                <dd className="font-display text-lg">Being established</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Schools</dt>
                <dd className="font-display text-lg">Five planned</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Pathways</dt>
                <dd className="font-display text-lg">Classroom, RPL, WIL</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={() => open('institute')} className="btn-primary">
                Explore the Institute
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('schools');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-secondary"
              >
                View Schools
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
