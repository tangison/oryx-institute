import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/page-shell';
import { Breadcrumbs, BackLink } from '@/components/site/back-link';
import { Section } from '@/components/site/section';
import { programmes, schools } from '@/lib/content';

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return { title: 'Programme not found' };
  return {
    title: programme.name,
    description: programme.description.slice(0, 160),
    alternates: { canonical: `https://oryxinstitute.na/programmes/${programme.slug}` },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  const school = schools.find((s) => s.slug === programme.school);
  const relatedProgrammes = programmes
    .filter((p) => p.school === programme.school && p.slug !== programme.slug)
    .slice(0, 4);

  return (
    <PageShell>
      <Section tone="cream" className="pt-28 md:pt-36 pb-0">
        <div className="container-oryx">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Programmes', href: '/programmes' },
              { label: programme.name },
            ]}
            className="mb-8"
          />
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="max-w-4xl">
          <span
            className={`status-pill mb-4 ${
              programme.status === 'Planned'
                ? 'status-planned'
                : programme.status === 'Subject to accreditation'
                  ? 'status-subject'
                  : 'status-interest'
            }`}
          >
            {programme.status}
          </span>
          <p className="eyebrow mb-3">{programme.schoolName}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance">
            {programme.name}
          </h1>
        </div>

        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)]">
          <div className="bg-white p-5">
            <dt className="eyebrow mb-1">School</dt>
            <dd className="text-sm font-medium">{programme.schoolName}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="eyebrow mb-1">Level</dt>
            <dd className="text-sm font-medium">{programme.level}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="eyebrow mb-1">Delivery</dt>
            <dd className="text-sm font-medium">{programme.delivery}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="eyebrow mb-1">Duration</dt>
            <dd className="text-sm font-medium">{programme.duration}</dd>
          </div>
        </dl>
      </Section>

      <Section tone="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">About this programme</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
              What this programme will cover.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              {programme.description}
            </p>

            <div className="mt-12">
              <p className="eyebrow mb-4">Planned outcomes</p>
              <ul className="space-y-4">
                {programme.outcomes.map((o, i) => (
                  <li key={i} className="grid grid-cols-[auto_1fr] gap-5 items-start">
                    <span className="font-display text-2xl text-[var(--color-brand-maroon)] tabular-nums leading-none pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">{o}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="eyebrow mb-3">Assessment</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  {programme.assessment}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Progression</p>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  {programme.progression}
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            {school && (
              <div className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
                <p className="eyebrow mb-2">Part of</p>
                <Link
                  href={`/schools/${school.slug}`}
                  className="font-display text-lg font-medium hover:text-[var(--color-brand-maroon)] transition-colors block mb-2"
                >
                  {school.name}
                </Link>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  {school.blurb}
                </p>
              </div>
            )}

            <div className="bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] p-6">
              <p className="eyebrow text-[var(--color-brand-cream)] mb-3">Register Interest</p>
              <p className="text-sm text-[var(--color-brand-cream)]/80 leading-relaxed mb-4">
                Interested in this programme? Register your interest to be informed when admissions
                open.
              </p>
              <Link href="/register" className="btn-primary w-full justify-center">
                Register Interest
              </Link>
            </div>

            <div className="bg-white p-6 border border-[var(--color-border)]">
              <p className="caption-oryx">
                All programmes are planned and subject to approval. Fees, intake dates, and final
                programme structure to be confirmed. No programme is presented as an approved
                qualification until verified.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {relatedProgrammes.length > 0 && (
        <Section tone="cream">
          <p className="eyebrow mb-4">Related programmes</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {relatedProgrammes.map((p) => (
              <li key={p.slug} className="bg-white">
                <Link
                  href={`/programmes/${p.slug}`}
                  className="block p-5 hover:bg-[var(--color-brand-cream)]/40 transition-colors group"
                >
                  <h3 className="font-display text-base font-medium group-hover:text-[var(--color-brand-maroon)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {p.level} · {p.delivery}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="cream" className="py-8">
        <BackLink href="/programmes" label="All programmes" />
      </Section>
    </PageShell>
  );
}
