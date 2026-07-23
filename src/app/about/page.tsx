import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Prose, ProseSection } from '@/components/site/prose';
import { Section } from '@/components/site/section';
import { values } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Oryx Institute is being developed as a multidisciplinary training, research, and advisory institution rooted in Namibia. Mission, vision, values, and what is being built.',
  alternates: { canonical: 'https://oryxinstitute.na/about' },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The Institute"
        title="About Oryx Institute"
        lede="A Namibian institution taking shape. Multidisciplinary vocational education, rooted in place, built for the work Namibia needs."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Prose>
              <ProseSection eyebrow="Introduction" heading="A Namibian institution taking shape.">
                <p>
                  Oryx Institute is being developed as a multidisciplinary training, research, and
                  advisory institution rooted in Namibia. It is being established in Windhoek. It is
                  not yet operating. Programmes are subject to approval. The institution is being
                  built carefully, with discipline, and with honesty about what is ready and what is
                  not.
                </p>
                <p>
                  The work of building a serious institution is slow. Accreditation takes time.
                  Programme design takes time. Employer partnerships take time. The institution will
                  not rush any of these. What you see on this website is a description of what is
                  being built, not a claim of what exists today.
                </p>
              </ProseSection>

              <ProseSection eyebrow="Mission" heading="To give Namibians practical, recognised skills.">
                <p>
                  Oryx Institute will deliver vocational education that is disciplined, practical,
                  and rooted in the Namibian landscape. It will train, assess, research, and advise
                  across multiple disciplines. It will serve learners, employers, and the wider
                  Namibian economy. These are intentions. They are not yet achievements.
                </p>
                <p>
                  The mission is narrow on purpose. Practical skills. Recognised standards. Real
                  assessment. No shortcuts. The institution will not promise what it cannot deliver,
                  and it will not deliver what it has not been built to sustain.
                </p>
              </ProseSection>

              <ProseSection eyebrow="Vision" heading="A serious institution, built to last.">
                <p>
                  Oryx Institute intends to become a recognised Namibian institution known for
                  discipline, restraint, and honest work. It will grow carefully, not quickly. It
                  will add schools, programmes, and services as the institution proves its capacity.
                  No timeline is claimed.
                </p>
                <p>
                  The vision is not to be the biggest. It is to be trusted. Trust is earned through
                  years of consistent work, verified outcomes, and graduates who carry the
                  institution's discipline into their workplaces. That is the work ahead.
                </p>
              </ProseSection>
            </Prose>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="bg-white border border-[var(--color-border)] p-8">
              <p className="eyebrow mb-4">At a glance</p>
              <dl className="space-y-5">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Status</dt>
                  <dd className="font-display text-lg">Being established</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Location</dt>
                  <dd className="font-display text-lg">Windhoek, Namibia</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Schools</dt>
                  <dd className="font-display text-lg">Five planned</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Founder</dt>
                  <dd className="font-display text-lg">
                    <Link href="/founder" className="hover:text-[var(--color-brand-maroon)] transition-colors">
                      Tangi Iigonda
                    </Link>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <Link href="/register" className="btn-primary w-full justify-center">
                  Register Interest
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light">
        <p className="eyebrow mb-4">Values</p>
        <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance mb-12 max-w-3xl uppercase tracking-[0.04em]">
          What the institution stands for.
        </h2>
        <ol className="divide-y divide-[var(--color-border)]">
          {values.map((v, i) => (
            <li key={v.title} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-baseline">
              <div className="md:col-span-2">
                <span className="font-display text-3xl md:text-4xl text-[var(--color-brand-maroon)] tabular-nums tracking-[0.04em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="md:col-span-4">
                <p className="font-display text-xl md:text-2xl font-medium uppercase tracking-[0.04em]">{v.title}</p>
              </div>
              <div className="md:col-span-6">
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed text-pretty">{v.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="eyebrow mb-3">What is becoming</p>
            <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
              Five schools. Multiple pathways. One campus.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              Five planned schools. Classroom learning, recognition of prior learning,
              work-integrated learning, assessment, and progression. A lean Windhoek micro-campus.
              Applied research and advisory services, small at launch. All planned. All subject to
              approval. No claim of current operation.
            </p>
            <Link href="/schools" className="mt-6 btn-ghost">
              Explore the Schools
            </Link>
          </div>
          <div>
            <p className="eyebrow mb-3">What it is not</p>
            <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
              Clear about the limits.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              Not yet registered. Not yet accredited. Not yet enrolling learners. Not yet offering
              qualifications. Not a university. Not a franchise. Not a technology startup. Not a
              school template. These are not permanent limits. They are honest descriptions of where
              the institution stands today.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">The journey</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-balance mb-6">
            Being established, step by step.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 text-lg leading-relaxed text-pretty mb-8">
            Public marketing begins approximately four months before classes open. No dates are
            published until verified. The institution will share updates as it progresses. Subscribe
            to the mailing list or register your interest to follow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Register Interest
            </Link>
            <Link
              href="/updates"
              className="btn-secondary"
              style={{ color: 'var(--color-brand-cream)', borderColor: 'var(--color-brand-cream)' }}
            >
              View Updates
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
