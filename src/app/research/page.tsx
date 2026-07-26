import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section, SectionHeader } from '@/components/site/section';
import { AnimatedSection, AnimatedStagger } from '@/components/site/animated-section';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Applied research and advisory services planned at Oryx Institute. Workforce studies, sector research, and advisory services for Namibian employers and institutions.',
  alternates: { canonical: 'https://oryxinstitute.org/research' },
};

export default function ResearchPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Research"
        title="Research and advisory."
        lede="Applied research and advisory services, planned small at launch. Workforce studies, sector research, and advisory for Namibian employers and institutions."
        image="/images/research/leather-books.webp"
        alt="A stack of leather-bound books in warm natural light."
      />

      <Section tone="cream">
        <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <figure className="lg:col-span-6 relative aspect-[4/3] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
            <img
              src="/images/research/archival-calipers.webp"
              alt="An archival box with brass calipers and a wax-seal stamp arranged on a surface."
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="eyebrow mb-3">What is planned</p>
              <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
                Applied research that serves Namibian employers and institutions.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                Oryx Institute intends to conduct applied research and advisory work alongside its
                teaching. Research will be small in scale at launch, focused on workforce studies,
                sector needs analysis, and advisory services for employers, donors, and public
                institutions. No research project is confirmed at this stage. All research will be
                commissioned and paid for, not speculative.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">How it will work</p>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                Employers, donors, development finance institutions, and public bodies may
                commission research or advisory work. The institution will take on work it can
                deliver to a high standard. Research outputs will be published where appropriate and
                retained as confidential where required by the commissioning party. No research is
                conducted until the institution is established.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)]">
              <Link href="/partners/research" className="btn-primary">
                Commission Research
              </Link>
            </div>
          </div>
        </div>
        </AnimatedSection>
      </Section>

      <Section tone="dark">
        <AnimatedSection>
        <SectionHeader
          eyebrow="Principles"
          title="How the research will be conducted."
          tone="dark"
        />
        </AnimatedSection>
        <AnimatedStagger stagger={100}>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-brand-cream)]/15">
          <li className="bg-[var(--color-brand-ink)] p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">01</p>
            <p className="font-display text-lg font-medium text-[var(--color-brand-cream)] mb-2">Commissioned, not speculative</p>
            <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
              Research is commissioned by organisations with real questions. No research is
              conducted without a clear purpose and audience.
            </p>
          </li>
          <li className="bg-[var(--color-brand-ink)] p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">02</p>
            <p className="font-display text-lg font-medium text-[var(--color-brand-cream)] mb-2">Honest and verifiable</p>
            <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
              Research findings are reported as found, not as the commissioning party wishes. Methods
              are documented. Sources are cited.
            </p>
          </li>
          <li className="bg-[var(--color-brand-ink)] p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">03</p>
            <p className="font-display text-lg font-medium text-[var(--color-brand-cream)] mb-2">Namibian first</p>
            <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
              Research serves Namibian employers, institutions, and learners first. International
              comparison is welcome. International substitution is not.
            </p>
          </li>
        </ul>
        </AnimatedStagger>
      </Section>
    </PageShell>
  );
}
