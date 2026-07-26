import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section, SectionHeader } from '@/components/site/section';
import { AnimatedSection, AnimatedStagger } from '@/components/site/animated-section';

export const metadata: Metadata = {
  title: 'Recognition of Prior Learning (RPL)',
  description:
    'Recognition of Prior Learning at Oryx Institute. Adults with existing skills and work experience can earn recognised qualifications without repeating what they already know.',
  alternates: { canonical: 'https://oryxinstitute.org/rpl' },
};

export default function RPLPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Pathways"
        title="Recognition of Prior Learning."
        lede="Adults with existing skills and work experience can earn recognised qualifications without repeating what they already know. RPL is central to how Oryx Institute will operate."
        image="/images/campus/arched-corridor.webp"
        alt="A sunlit arched corridor with warm stone walls and rhythmic shadow patterns."
      />

      <Section tone="cream">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">What is RPL</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance mb-6 uppercase tracking-[0.04em]">
            Skills you already have. Qualifications you can earn.
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-6">
            Recognition of Prior Learning (RPL) is a process that allows adults to have their
            existing skills, knowledge, and work experience formally assessed and credited toward
            a recognised qualification. Instead of starting a programme from the beginning, a
            learner who can demonstrate competence in a subject may be granted credits or placed
            at an advanced level, reducing the time and cost required to complete a qualification.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-6">
            RPL is not a shortcut. It is a rigorous assessment. The learner must demonstrate
            that their existing knowledge and skills meet the same learning outcomes as the
            qualification they are seeking. The assessment is evidence-based: portfolios, work
            samples, supervisor attestations, challenge tests, and structured interviews are
            all valid assessment methods under the Namibia Qualifications Authority framework.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute intends to make RPL available across its planned programmes. No RPL
            assessment is available yet. The institution is being established. When RPL services
            open, details will be published here and on the relevant programme pages.
          </p>
        </div>
        </AnimatedSection>
      </Section>

      <Section tone="light">
        <AnimatedSection>
        <SectionHeader
          eyebrow="How it will work"
          title="The RPL process at Oryx Institute."
          lede="A structured, evidence-based assessment pathway. Planned and subject to NQA approval."
        />
        </AnimatedSection>
        <AnimatedStagger stagger={100}>
        <ol className="mt-10 space-y-px bg-[var(--color-border)]">
          <li className="bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="font-display text-3xl text-[var(--color-brand-maroon)] tabular-nums shrink-0">01</span>
              <div>
                <p className="font-display text-lg font-medium mb-2">Enquiry and eligibility check</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  A prospective learner contacts Oryx Institute to determine whether their existing
                  skills and experience are relevant to a planned qualification. An initial
                  eligibility check identifies which programme(s) may benefit from RPL.
                </p>
              </div>
            </div>
          </li>
          <li className="bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="font-display text-3xl text-[var(--color-brand-maroon)] tabular-nums shrink-0">02</span>
              <div>
                <p className="font-display text-lg font-medium mb-2">Evidence portfolio preparation</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  The learner gathers evidence of their competence: work samples, certificates,
                  supervisor attestations, project documentation, and any other material that
                  demonstrates they meet the learning outcomes of the qualification.
                </p>
              </div>
            </div>
          </li>
          <li className="bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="font-display text-3xl text-[var(--color-brand-maroon)] tabular-nums shrink-0">03</span>
              <div>
                <p className="font-display text-lg font-medium mb-2">Assessment and credit decision</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  An assessor evaluates the portfolio against the qualification's learning outcomes.
                  Where full competence is demonstrated, credits are granted. Where gaps exist,
                  the learner is advised on what additional study or assessment is needed.
                </p>
              </div>
            </div>
          </li>
          <li className="bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="font-display text-3xl text-[var(--color-brand-maroon)] tabular-nums shrink-0">04</span>
              <div>
                <p className="font-display text-lg font-medium mb-2">Qualification completion</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  The learner completes the remaining modules or assessments required by the
                  qualification. The time and cost saved depend on how many credits were granted
                  through RPL. The qualification earned is the same as the one earned through
                  full-time study.
                </p>
              </div>
            </div>
          </li>
        </ol>
        </AnimatedStagger>
      </Section>

      <Section tone="dark">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Status</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            RPL is planned. No assessments are available yet.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
            Oryx Institute intends to offer RPL across its planned programmes. The institution is
            being established. RPL services will open when the institution is operational and
            programmes are approved. Register your interest to be informed when RPL assessments
            become available.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Register Interest
            </Link>
            <Link href="/faq" className="btn-secondary-dark">
              Read the FAQ
            </Link>
          </div>
        </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
