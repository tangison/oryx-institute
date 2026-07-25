import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Prose, ProseSection } from '@/components/site/prose';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing your use of the Oryx Institute website. Pre-launch version.',
  alternates: { canonical: 'https://oryxinstitute.org/legal/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lede="These terms govern your use of the Oryx Institute website. By using this website, you agree to these terms. The institution is in pre-launch."
      />
      <Section tone="cream">
        <div className="max-w-3xl">
          <Prose>
            <ProseSection eyebrow="About Oryx Institute">
              <p>
                Oryx Institute is a multidisciplinary vocational education and training institution
                being established in Windhoek, Namibia. The institution is not yet operating.
                Programmes are planned and subject to approval. No accreditation, registration
                number, campus address, fees, or intake dates are claimed until verified.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Use of this website">
              <p>
                You may use this website for personal, non-commercial purposes. You may not use this
                website to submit false, misleading, or harmful content. You may not attempt to
                disrupt the operation of the website. You may not use automated tools to scrape,
                harvest, or collect data from this website without permission.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Intellectual property">
              <p>
                The Oryx Institute name, logo, shield, brand system, written content, and original
                photography on this website are the property of Oryx Institute. You may not
                reproduce, distribute, or use these materials without permission, except for
                personal, non-commercial use. The Tangison Studio credit link is required on every
                public page and may not be removed.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Form submissions">
              <p>
                When you submit a form on this website, you consent to the handling of your data as
                described in the Privacy Policy. In pre-launch, form submissions are stored locally
                on the website server. This is clearly marked in the form confirmation.
              </p>
            </ProseSection>
            <ProseSection eyebrow="No guarantees">
              <p>
                Information on this website is provided as a description of what is being built. No
                programme, fee, intake date, accreditation, or partnership is guaranteed until
                verified and published as such. The institution reserves the right to add, change,
                or withdraw any planned programme or service without notice.
              </p>
            </ProseSection>
            <ProseSection eyebrow="External links">
              <p>
                This website may contain links to external websites. Oryx Institute is not
                responsible for the content or privacy practices of external websites.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Liability">
              <p>
                Oryx Institute is not liable for any loss or damage arising from your use of this
                website, except where such liability cannot be excluded under applicable law.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Changes to these terms">
              <p>
                We may update these terms as the institution is established. We will indicate the
                date of the latest review below. Continued use of the website after changes
                constitutes acceptance of the updated terms.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Governing law">
              <p>These terms are governed by the laws of the Republic of Namibia.</p>
            </ProseSection>
          </Prose>
          <p className="mt-12 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--muted-foreground)]">
            Last reviewed: July 2026. Pre-launch version.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
