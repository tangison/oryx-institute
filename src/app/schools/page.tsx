import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section } from '@/components/site/section';
import { schools } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Schools',
  description:
    'Five planned schools: Safety, Administration and Commerce, Hospitality and Tourism, Information and Digital Skills, and Future Schools. All subject to approval.',
  alternates: { canonical: 'https://oryx-institute.vercel.app/schools' },
};

export default function SchoolsPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Schools"
        title="Five planned schools."
        lede="Each school serves a different part of the Namibian economy. Each is being built with employers and standards in mind. All programmes are planned and subject to approval."
        image="/images/campus/corridor-windows.webp"
        alt="A sunlit corridor with rhythmic arched windows casting warm light."
      />

      <Section tone="cream">
        <ul className="space-y-px bg-[var(--color-border)]">
          {schools.map((school) => (
            <li key={school.slug} className="bg-white">
              <Link
                href={`/schools/${school.slug}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-6 md:p-8 hover:bg-[var(--color-brand-cream)]/40 transition-colors group"
              >
                <div className="md:col-span-4 relative aspect-[16/9] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
                  <img
                    src={school.image}
                    alt={school.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
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
                  <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-2 group-hover:text-[var(--color-brand-maroon)] transition-colors">
                    {school.name}
                  </h2>
                  <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                    {school.blurb}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:flex-col items-end justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors"
                  >
                    <path d="M2 10H18M18 10L10 2M18 10L10 18" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">A note on planning</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Every school here is a plan, not a promise.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
            Schools will open as programmes are approved, employers confirm partnerships, and the
            institution proves its capacity. No school is presented as operating until it is. Register
            your interest to be informed when a school reaches its next milestone.
          </p>
          <Link href="/register" className="btn-primary">
            Register Interest
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
