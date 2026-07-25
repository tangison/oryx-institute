import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/page-shell';
import { Breadcrumbs, BackLink } from '@/components/site/back-link';
import { Section } from '@/components/site/section';
import { EnquiryForm, type EnquiryType } from '@/components/site/forms/enquiry-form';

const partnerTypes: Record<string, {
  type: EnquiryType;
  eyebrow: string;
  title: string;
  intro: string;
  submitLabel: string;
}> = {
  employers: {
    type: 'employer-enquiry',
    eyebrow: 'For Employers',
    title: 'Employer Enquiry',
    intro: 'Recruit trained staff, host WIL learners, or contribute to programme design. Tell us about your organisation and what you need. We will respond to serious enquiries.',
    submitLabel: 'Submit Employer Enquiry',
  },
  wil: {
    type: 'wil-enquiry',
    eyebrow: 'For WIL Partners',
    title: 'WIL Partner Enquiry',
    intro: 'Host learners in real workplaces for supervised practice. WIL is structured, assessed, and credited. Tell us about your workplace and capacity to host.',
    submitLabel: 'Submit WIL Enquiry',
  },
  corporate: {
    type: 'corporate-training-enquiry',
    eyebrow: 'For Corporate Training Clients',
    title: 'Corporate Training Enquiry',
    intro: 'Commission bespoke organisational training designed and delivered for your workforce. Tell us what your team needs.',
    submitLabel: 'Submit Corporate Training Enquiry',
  },
  research: {
    type: 'research-advisory-enquiry',
    eyebrow: 'For Research and Advisory Clients',
    title: 'Research and Advisory Enquiry',
    intro: 'Commission applied research, workforce studies, or advisory services. Tell us about the question or challenge you need addressed.',
    submitLabel: 'Submit Research Enquiry',
  },
  funding: {
    type: 'funding-partnership-enquiry',
    eyebrow: 'For Funding and Institutional Partners',
    title: 'Funding and Partnership Enquiry',
    intro: 'Support the establishment of a serious Namibian institution. Donors, development finance institutions, public skills funds, and academic partners are welcome to register interest.',
    submitLabel: 'Submit Funding Enquiry',
  },
};

export function generateStaticParams() {
  return Object.keys(partnerTypes).map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const p = partnerTypes[type];
  if (!p) return { title: 'Partner enquiry not found' };
  return {
    title: p.title,
    description: p.intro,
    alternates: { canonical: `https://oryxinstitute.org/partners/${type}` },
  };
}

export default async function PartnerTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = partnerTypes[type];
  if (!config) notFound();

  return (
    <PageShell>
      <Section tone="cream" className="pt-28 md:pt-36 pb-0">
        <div className="container-oryx">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Partners', href: '/partners' },
              { label: config.title },
            ]}
            className="mb-8"
          />
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="max-w-4xl">
          <p className="eyebrow mb-3">{config.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[0.98] tracking-tight text-balance">
            {config.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed text-pretty max-w-2xl">
            {config.intro}
          </p>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">What to include</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
              Help us respond well.
            </p>
            <ul className="space-y-3 text-[var(--muted-foreground)] leading-relaxed">
              <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Your organisation and your role.</li>
              <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> What you need from Oryx Institute.</li>
              <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Any timeline or constraints we should know about.</li>
              <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> A phone number if you prefer a call.</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm type={config.type} />
          </div>
        </div>
      </Section>

      <Section tone="cream" className="py-8">
        <BackLink href="/partners" label="All partner enquiries" />
      </Section>
    </PageShell>
  );
}
