import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Prose, ProseSection } from '@/components/site/prose';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Oryx Institute handles your data on this website. Pre-launch version.',
  alternates: { canonical: 'https://oryx-institute.vercel.app/legal/privacy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How Oryx Institute handles your data on this website. The institution is in pre-launch. This policy will be reviewed and updated when the institution is established."
      />
      <Section tone="cream">
        <div className="max-w-3xl">
          <Prose>
            <ProseSection eyebrow="What we collect">
              <p>
                We collect the information you submit through our forms. The Register Interest form
                collects your name, email, phone, region, programme of interest, and optional
                information about your education, employment, RPL interest, and preferred schedule.
                The mailing list form collects your name and email. Enquiry forms collect your name,
                email, optional phone, organisation, role, and message. We do not collect data
                automatically beyond what is necessary to operate the website.
              </p>
            </ProseSection>
            <ProseSection eyebrow="How we use your data">
              <p>
                We use the information you submit to contact you about Oryx Institute, including
                admissions, programmes, and institutional updates. We do not sell your data. We do
                not share your data with third parties for marketing. We may share your data with
                service providers who help us operate the website, such as hosting and email
                providers, under appropriate data processing agreements.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Where your data is stored">
              <p>
                In pre-launch, form submissions are stored locally on the website server as a record
                of your interest. This is clearly marked in the form confirmation. When the
                institution is established, your data will be migrated to a secure learner
                relationship system. The website is hosted on Vercel or an equivalent provider. Data
                may be processed outside Namibia. We will update this policy with full hosting
                details when operations begin.
              </p>
            </ProseSection>
            <ProseSection eyebrow="How long we keep your data">
              <p>
                We keep your data for as long as is necessary to contact you about Oryx Institute.
                If you ask us to delete your data, we will do so within a reasonable time. You can
                unsubscribe from the mailing list at any time using the link in any email or by
                contacting us.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Your rights">
              <p>
                You have the right to access, correct, or delete your personal data. You have the
                right to object to processing. You have the right to withdraw consent at any time.
                To exercise any of these rights, contact us using the contact form.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Cookies">
              <p>
                This website uses only essential cookies necessary for its operation. We do not use
                tracking cookies, advertising cookies, or third-party analytics cookies in
                pre-launch. When analytics are introduced, this policy will be updated and consent
                will be sought where required.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Children">
              <p>
                Oryx Institute does not intentionally collect data from children under 16. If you
                believe we have collected data from a child under 16, please contact us.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Changes to this policy">
              <p>
                We may update this policy as the institution is established. We will indicate the
                date of the latest review below. Material changes will be communicated through the
                website.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Contact">
              <p>
                To ask any question about this policy or your data, use the contact form on this
                website. Contact details will be published when the institution is established.
              </p>
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
