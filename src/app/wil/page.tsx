import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section, SectionHeader } from '@/components/site/section';
import { AnimatedSection, AnimatedStagger } from '@/components/site/animated-section';

export const metadata: Metadata = {
  title: 'Work-Integrated Learning (WIL)',
  description:
    'Work-Integrated Learning at Oryx Institute. Learners practise their skills in real workplaces under supervision. Employers host, assess, and help shape the training.',
  alternates: { canonical: 'https://oryxinstitute.org/wil' },
};

export default function WILPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Pathways"
        title="Work-Integrated Learning."
        lede="Learners practise their skills in real workplaces under supervision. Employers host, assess, and help shape the training. WIL is structured, credited, and assessed."
        image="/images/partners/collaboration.webp"
        alt="Professionals collaborating over documents on a wooden table."
      />

      <Section tone="cream">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">What is WIL</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance mb-6 uppercase tracking-[0.04em]">
            Real workplaces. Supervised practice. Credited learning.
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-6">
            Work-Integrated Learning (WIL) is a structured educational strategy that integrates
            academic learning with practical workplace experience. Learners spend part of their
            programme in a real workplace, performing tasks relevant to their qualification under
            the supervision of a workplace mentor. The work they do is assessed and credited
            toward their qualification, not treated as optional or supplementary experience.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-6">
            WIL is not an internship in the informal sense. It is a formal, assessed component
            of a qualification. The workplace host, the institution, and the learner all have
            defined responsibilities. The learning outcomes are specified. The assessment is
            rigorous. The credit earned is equivalent to classroom-based modules.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Oryx Institute intends to make WIL available across its planned programmes, particularly
            in the School of Safety and the School of Hospitality and Tourism. No WIL placements
            are available yet. The institution is being established. When WIL placements open,
            details will be published here and on the relevant programme pages.
          </p>
        </div>
        </AnimatedSection>
      </Section>

      <Section tone="light">
        <AnimatedSection>
        <SectionHeader
          eyebrow="For learners"
          title="How WIL will work for learners."
          lede="A structured placement with defined learning outcomes, supervision, and assessment."
        />
        </AnimatedSection>
        <AnimatedStagger stagger={100}>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          <li className="bg-white p-6 md:p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">01</p>
            <p className="font-display text-lg font-medium mb-2">Structured placement</p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              Learners are placed in a workplace relevant to their programme. The placement has
              defined learning outcomes, a fixed duration, and a clear scope of work. It is not
              casual or ad hoc.
            </p>
          </li>
          <li className="bg-white p-6 md:p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">02</p>
            <p className="font-display text-lg font-medium mb-2">Supervised practice</p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              A workplace mentor supervises the learner. The mentor ensures the learner performs
              tasks safely and competently. The institution provides an academic supervisor who
              monitors progress against the learning outcomes.
            </p>
          </li>
          <li className="bg-white p-6 md:p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">03</p>
            <p className="font-display text-lg font-medium mb-2">Assessed and credited</p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              The work performed during the placement is assessed against the qualification's
              learning outcomes. Credits are awarded for demonstrated competence. The assessment
              is evidence-based and documented.
            </p>
          </li>
          <li className="bg-white p-6 md:p-8">
            <p className="font-display text-5xl text-[var(--color-brand-maroon)] mb-4">04</p>
            <p className="font-display text-lg font-medium mb-2">Employer-connected</p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              WIL placements connect learners to employers in their field. Many learners complete
              their qualification with a professional network and a track record of workplace
              competence that employers value.
            </p>
          </li>
        </ul>
        </AnimatedStagger>
      </Section>

      <Section tone="dark">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Status</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            WIL is planned. No placements are available yet.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
            Oryx Institute intends to offer WIL across its planned programmes. The institution is
            being established. WIL placements will open when the institution is operational and
            programmes are approved. Employers interested in hosting WIL learners can use the
            partnership enquiry form. Learners can register their interest.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Register Interest
            </Link>
            <Link href="/partners/wil" className="btn-secondary-dark">
              WIL Partnership
            </Link>
          </div>
        </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
