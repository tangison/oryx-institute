'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function FounderSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();

  return (
    <section id="founder" className="bg-[var(--oryx-warm-white)] py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <figure className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-white border border-[var(--color-border)]">
            <img
              src="/images/founder/founder-1.png"
              alt="An empty leather chair beside a wooden desk in warm afternoon light, with a single open notebook."
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[rgba(15,14,13,0.7)] text-[var(--oryx-cream)] text-xs px-4 py-2 m-3">
              Founder&apos;s study. No photograph of the founder is published at this stage.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Founder</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              Tangi Iigonda.
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--muted-foreground)] text-pretty">
              Founder of Oryx Institute. The institution is being established in Windhoek under his
              direction. No biography, credentials, or photograph are published at this stage.
            </p>

            <blockquote className="mt-10 pl-6 border-l-2 border-[var(--oryx-maroon)]">
              <p className="font-display text-xl md:text-2xl font-medium italic leading-snug text-balance">
                &ldquo;Oryx Institute is being built to give Namibians practical, recognised skills
                through vocational education rooted in the Namibian landscape.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-[var(--muted-foreground)]">
                Tangi Iigonda, Founder
              </footer>
            </blockquote>

            <p className="mt-10 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              The institution will train, assess, research, and advise. It will grow carefully. It
              will not rush. These are intentions stated by the founder.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={() => open('founder')} className="btn-secondary">
                Read About the Founder
              </button>
              <button onClick={() => open('contact')} className="btn-ghost">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
