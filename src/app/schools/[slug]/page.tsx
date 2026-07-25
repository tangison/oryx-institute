import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/page-shell';
import { BackLink, Breadcrumbs } from '@/components/site/back-link';
import { Section } from '@/components/site/section';
import { schools, programmes, type SchoolSlug } from '@/lib/content';

export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug);
  if (!school) return { title: 'School not found' };
  return {
    title: school.name,
    description: school.blurb,
    alternates: { canonical: `https://oryx-institute.vercel.app/schools/${school.slug}` },
    openGraph: { url: `https://oryx-institute.vercel.app/schools/${school.slug}` },
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = schools.find((s) => s.slug === slug as SchoolSlug);
  if (!school) notFound();

  const schoolProgrammes = programmes.filter((p) => p.school === school.slug);
  const siblings = schools.filter((s) => s.slug !== school.slug);

  return (
    <PageShell>
      <Section tone="cream" className="pt-28 md:pt-36 pb-0">
        <div className="container-oryx">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Schools', href: '/schools' },
              { label: school.shortName },
            ]}
            className="mb-8"
          />
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-2xl text-[var(--color-brand-maroon)] tabular-nums">
              {school.index}
            </span>
            <span
              className={`status-pill ${
                school.status === 'Planned'
                  ? 'status-planned'
                  : school.status === 'Subject to accreditation'
                    ? 'status-subject'
                    : 'status-tba'
              }`}
            >
              {school.status}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance">
            {school.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed text-pretty max-w-2xl">
            {school.blurb}
          </p>
        </div>

        <figure className="mt-12 relative aspect-[16/9] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
          <img
            src={school.image}
            alt={school.alt}
            className="w-full h-full object-cover"
          />
          <figcaption className="absolute bottom-0 inset-x-0 gradient-overlay-caption text-[var(--color-brand-cream)] text-xs px-4 py-3">
            {school.caption}
          </figcaption>
        </figure>
      </Section>

      <Section tone="light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Overview</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
              What this school will do.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              {school.detail.what}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Who this school serves</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
              Who this school is for.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
              {school.detail.who}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="eyebrow mb-4">Pathways</p>
          <ul className="flex flex-wrap gap-2">
            {school.detail.pathways.map((p) => (
              <li
                key={p}
                className="px-4 py-2 border border-[var(--color-border)] text-sm bg-[var(--color-brand-cream)]"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream">
        <p className="eyebrow mb-4">Planned programmes</p>
        {schoolProgrammes.length === 0 ? (
          <ul className="space-y-px bg-[var(--color-border)]">
            {school.detail.plannedProgrammes.map((p) => (
              <li
                key={p}
                className="bg-white grid grid-cols-[auto_1fr] gap-4 p-5 items-center"
              >
                <span className="status-pill status-planned">Planned</span>
                <span className="text-sm md:text-base">{p}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {schoolProgrammes.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="w-full text-left py-5 flex items-center justify-between gap-4 hover:bg-white transition-colors px-2 group"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-lg font-medium leading-tight group-hover:text-[var(--color-brand-maroon)] transition-colors">
                      {p.name}
                    </span>
                    <span className="block text-xs text-[var(--muted-foreground)] mt-1">
                      {p.level} · {p.delivery} · {p.status}
                    </span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors">
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 bg-white p-6 border border-[var(--color-border)]">
          <p className="caption-oryx">
            All programmes in this school are planned and subject to approval. No programme is
            presented as an approved qualification until verified.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Register Interest</p>
            <p className="font-display text-3xl md:text-4xl font-medium leading-tight text-balance mb-6">
              Interested in this school?
            </p>
            <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
              Register your interest to be informed when programmes in this school open for
              admissions. We will contact you with next steps.
            </p>
            <Link href="/register" className="btn-primary">
              Register Interest
            </Link>
          </div>
          <div>
            <p className="eyebrow text-[var(--color-brand-cream)]/70 mb-4">Other schools</p>
            <ul className="space-y-px bg-[var(--color-brand-cream)]/10">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/schools/${s.slug}`}
                    className="flex items-center justify-between gap-4 p-4 hover:bg-[var(--color-brand-cream)]/10 transition-colors group"
                  >
                    <span className="font-display text-base text-[var(--color-brand-cream)] group-hover:text-white transition-colors">
                      {s.shortName}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-[var(--color-brand-cream)]/60">
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="cream" className="py-8">
        <BackLink href="/schools" label="All schools" />
      </Section>
    </PageShell>
  );
}
