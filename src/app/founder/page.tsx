import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Founder',
  description:
    'Tangi Iigonda is the founder of Oryx Institute. The institution is being established in Windhoek under his direction.',
  alternates: { canonical: 'https://oryxinstitute.na/founder' },
};

export default function FounderPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Founder"
        title="Tangi Iigonda"
        lede="Founder of Oryx Institute. The institution is being established in Windhoek under his direction."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <figure className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
            <img
              src="/images/founder/founder-1.png"
              alt="An empty leather chair beside a wooden desk in warm afternoon light."
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[rgba(15,14,13,0.7)] text-[var(--color-brand-cream)] text-xs px-4 py-2 m-3">
              No photograph of the founder is published at this stage.
            </figcaption>
          </figure>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="eyebrow mb-3">Founder</p>
              <p className="font-display text-3xl md:text-4xl font-medium leading-tight mb-4">
                Tangi Iigonda.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                Founder of Oryx Institute. The institution is being established in Windhoek under his
                direction. No biography, credentials, or photograph are published at this stage. The
                founder's position is that the institution should be known by its work, not by the
                personality of its founder. When the institution reaches its next milestone, more
                will be shared.
              </p>
            </div>

            <blockquote className="pl-6 border-l-2 border-[var(--color-brand-maroon)]">
              <p className="font-display text-lg md:text-xl italic leading-snug text-balance">
                &ldquo;Oryx Institute is being built to give Namibians practical, recognised skills
                through vocational education rooted in the Namibian landscape. The institution will
                train, assess, research, and advise. It will grow carefully. It will not rush. These
                are intentions stated by the founder.&rdquo;
              </p>
            </blockquote>

            <div>
              <p className="eyebrow mb-3">Why this institution</p>
              <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
                A serious institution, built to last.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                Oryx Institute is being built to give Namibians practical, recognised skills through
                vocational education rooted in the Namibian landscape. The institution will train,
                assess, research, and advise. It will grow carefully. It will not rush. These are
                intentions stated by the founder. The work of building a serious institution is slow,
                and the founder has chosen to share the institution's progress through verified
                updates rather than promises.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)]">
              <p className="eyebrow mb-3">Contact</p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-4">
                Investors, partners, and institutional contacts are welcome to reach out. Use the
                contact form for serious enquiries.
              </p>
              <Link href="/contact" className="btn-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
