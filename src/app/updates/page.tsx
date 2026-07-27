import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { AnimatedSection } from '@/components/site/animated-section';
import { AnimatedStagger } from '@/components/site/animated-section';
import { UpdatesFeed } from '@/components/site/updates-feed';

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'Institutional updates from Oryx Institute. Verified milestones, programme announcements, public notices, and events as the institution is established.',
  alternates: { canonical: 'https://oryxinstitute.org/updates' },
};

export default function UpdatesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Updates"
        title="Institutional updates."
        lede="Verified milestones, programme announcements, public notices, and events. Published when there is something to say."
      />

      <Section tone="cream">
        <UpdatesFeed />
      </Section>

      <Section tone="dark">
        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="eyebrow text-[var(--color-brand-cream)] mb-4">What to expect</p>
            <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
              Honest updates, published when there is something to say.
            </p>
            <ul className="space-y-4 text-[var(--color-brand-cream)]/80">
              <li className="flex gap-4">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">01</span>
                <span className="leading-relaxed">Programme approval milestones, when reached.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">02</span>
                <span className="leading-relaxed">Campus and facility announcements, when confirmed.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">03</span>
                <span className="leading-relaxed">Admissions timelines, when published.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">04</span>
                <span className="leading-relaxed">Employer and institutional partnerships, when signed.</span>
              </li>
            </ul>
            <div className="mt-10">
              <Link href="/register" className="btn-secondary-dark">
                Register Interest
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
