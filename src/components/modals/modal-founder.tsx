'use client';

import { ModalShell } from './modal-shell';
import { useModal } from '@/lib/modal-context';

export function FounderModal() {
  const { open } = useModal();

  return (
    <ModalShell eyebrow="Founder" title="Tangi Iigonda">
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <figure className="md:col-span-5 relative aspect-[3/4] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
            <img
              src="/images/research/leather-books.webp"
              alt="An empty leather chair beside a wooden desk in warm afternoon light."
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 gradient-overlay-caption text-[var(--color-brand-cream)] text-xs px-4 py-2 m-3">
              No photograph of the founder is published at this stage.
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <p className="eyebrow mb-3">Founder</p>
            <p className="font-display text-3xl md:text-4xl font-medium leading-tight mb-4">
              Tangi Iigonda.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              Founder of Oryx Institute. The institution is being established in Windhoek under his
              direction. No biography, credentials, or photograph are published at this stage.
            </p>

            <blockquote className="mt-8 pl-6 border-l-2 border-[var(--color-brand-maroon)]">
              <p className="font-display text-lg md:text-xl italic leading-snug text-balance">
                &ldquo;Oryx Institute is being built to give Namibians practical, recognised skills
                through vocational education shaped by Namibia's working realities. The institution will
                train, assess, research, and advise. It will grow carefully. It will not rush. These
                are intentions stated by the founder.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <section>
          <p className="eyebrow mb-3">Why this institution</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Why this institution.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute is being built to give Namibians practical, recognised skills through
            vocational education shaped by Namibia's working realities. The institution will train,
            assess, research, and advise. It will grow carefully. It will not rush. These are
            intentions stated by the founder.
          </p>
        </section>

        <section>
          <p className="eyebrow mb-3">Contact</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
            Genuine enquiries.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Investors, partners, and institutional contacts are welcome to reach out. Use the
            contact form.
          </p>
          <button onClick={() => open('contact')} className="mt-4 btn-primary">
            Contact
          </button>
        </section>
      </div>
    </ModalShell>
  );
}
