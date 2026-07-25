import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Partner with Oryx Institute. Employers, WIL partners, corporate training clients, research clients, and funding partners are welcome.',
  alternates: { canonical: 'https://oryxinstitute.org/partners' },
};

const partnerTypes = [
  {
    slug: 'employers',
    type: 'employer-enquiry',
    eyebrow: 'For Employers',
    title: 'Employer Enquiry',
    description: 'Recruit trained staff, host WIL learners, or contribute to programme design. Tell us about your organisation and what you need.',
  },
  {
    slug: 'wil',
    type: 'wil-enquiry',
    eyebrow: 'For WIL Partners',
    title: 'WIL Partner Enquiry',
    description: 'Host learners in real workplaces for supervised practice. WIL is structured, assessed, and credited. Tell us about your workplace and capacity to host.',
  },
  {
    slug: 'corporate',
    type: 'corporate-training-enquiry',
    eyebrow: 'For Corporate Training Clients',
    title: 'Corporate Training Enquiry',
    description: 'Commission bespoke organisational training designed and delivered for your workforce. Tell us what your team needs.',
  },
  {
    slug: 'research',
    type: 'research-advisory-enquiry',
    eyebrow: 'For Research and Advisory Clients',
    title: 'Research and Advisory Enquiry',
    description: 'Commission applied research, workforce studies, or advisory services. Tell us about the question or challenge you need addressed.',
  },
  {
    slug: 'funding',
    type: 'funding-partnership-enquiry',
    eyebrow: 'For Funding and Institutional Partners',
    title: 'Funding and Partnership Enquiry',
    description: 'Support the establishment of a lasting Namibian institution. Donors, development finance institutions, public skills funds, and academic partners are welcome.',
  },
];

export default function PartnersPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Partners"
        title="Partner with Oryx Institute."
        lede="Employers, WIL partners, corporate training clients, research clients, and funding partners. We will respond to genuine enquiries."
        image="/images/partners/collaboration.webp"
        alt="Professionals collaborating over documents spread across a wooden table."
      />
      <Section tone="cream">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          {partnerTypes.map((p, i) => (
            <li key={p.slug} className="bg-white p-8 md:p-10">
              <span className="font-display text-2xl text-[var(--color-brand-maroon)] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="eyebrow mt-4 mb-2">{p.eyebrow}</p>
              <h2 className="font-display text-2xl font-medium leading-tight mb-3">{p.title}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-pretty mb-6">
                {p.description}
              </p>
              <Link href={`/partners/${p.slug}`} className="btn-ghost">
                Start enquiry
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="dark">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">A note on partnership</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Partnership is built on committed work, not logos on a page.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty">
            Oryx Institute will work with partners who share its commitment to rigorous, practical
            training and honest outcomes. No partnership is announced until signed. No partner is
            listed on this site until the partnership is formal. If you are committed to working
            with the institution, use the relevant enquiry form above.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
