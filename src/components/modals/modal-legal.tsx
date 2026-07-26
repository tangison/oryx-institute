'use client';

import { ModalShell } from './modal-shell';

export function PrivacyModal() {
  return (
    <ModalShell eyebrow="Legal" title="Privacy Policy">
      <div className="prose-oryx space-y-6 text-[var(--muted-foreground)] leading-relaxed">
        <p className="text-pretty">
          Oryx Institute respects your privacy. This policy explains how we handle your data on this
          website. The institution is in pre-launch. This policy will be reviewed and updated when
          the institution is established and operations begin.
        </p>

        <div>
          <p className="eyebrow mb-2">What we collect</p>
          <p className="text-pretty">
            We collect the information you submit through our forms. The Register Interest form
            collects your name, email, phone, region, programme of interest, and optional
            information about your education, employment, RPL interest, and preferred schedule. The
            mailing list form collects your name and email. Enquiry forms collect your name, email,
            optional phone, organisation, role, and message. We do not collect data automatically
            beyond what is necessary to operate the website.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">How we use your data</p>
          <p className="text-pretty">
            We use the information you submit to contact you about Oryx Institute, including
            admissions, programmes, and institutional updates. We do not sell your data. We do not
            share your data with third parties for marketing. We may share your data with service
            providers who help us operate the website, such as hosting and email providers, under
            appropriate data processing agreements.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Where your data is stored</p>
          <p className="text-pretty">
            In pre-launch, form submissions are stored locally on the website server as a record of
            your interest. This is clearly marked in the form confirmation. When the institution is
            established, your data will be migrated to a secure learner relationship system. The
            website is hosted on Vercel or an equivalent provider. Data may be processed outside
            Namibia. We will update this policy with full hosting details when operations begin.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">How long we keep your data</p>
          <p className="text-pretty">
            We keep your data for as long as is necessary to contact you about Oryx Institute. If
            you ask us to delete your data, we will do so within a reasonable time. You can
            unsubscribe from the mailing list at any time using the link in any email or by
            contacting us.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Your rights</p>
          <p className="text-pretty">
            You have the right to access, correct, or delete your personal data. You have the right
            to object to processing. You have the right to withdraw consent at any time. To exercise
            any of these rights, contact us using the contact form.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Cookies</p>
          <p className="text-pretty">
            This website uses only essential cookies necessary for its operation. We do not use
            tracking cookies, advertising cookies, or third-party analytics cookies in pre-launch.
            When analytics are introduced, this policy will be updated and consent will be sought
            where required.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Children</p>
          <p className="text-pretty">
            Oryx Institute does not intentionally collect data from children under 16. If you
            believe we have collected data from a child under 16, please contact us.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Changes to this policy</p>
          <p className="text-pretty">
            We may update this policy as the institution is established. We will indicate the date
            of the latest review below. Material changes will be communicated through the website.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Contact</p>
          <p className="text-pretty">
            To ask any question about this policy or your data, use the contact form on this
            website. Contact details will be published when the institution is established.
          </p>
        </div>

        <p className="text-xs text-[var(--muted-foreground)]/70 pt-6 border-t border-[var(--color-border)]">
          Last reviewed: July 2026. Pre-launch version.
        </p>
      </div>
    </ModalShell>
  );
}

export function TermsModal() {
  return (
    <ModalShell eyebrow="Legal" title="Terms of Use">
      <div className="space-y-6 text-[var(--muted-foreground)] leading-relaxed">
        <p className="text-pretty">
          These terms govern your use of the Oryx Institute website. By using this website, you
          agree to these terms. The institution is in pre-launch. These terms will be reviewed and
          updated when the institution is established.
        </p>

        <div>
          <p className="eyebrow mb-2">About Oryx Institute</p>
          <p className="text-pretty">
            Oryx Institute is a multidisciplinary vocational education and training institution
            being established in Windhoek, Namibia. The institution is not yet operating.
            Programmes are planned and subject to approval. No accreditation, registration number,
            campus address, fees, or intake dates are claimed until verified.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Use of this website</p>
          <p className="text-pretty">
            You may use this website for personal, non-commercial purposes. You may not use this
            website to submit false, misleading, or harmful content. You may not attempt to disrupt
            the operation of the website. You may not use automated tools to scrape, harvest, or
            collect data from this website without permission.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Intellectual property</p>
          <p className="text-pretty">
            The Oryx Institute name, logo, shield, brand system, written content, and original
            photography on this website are the property of Oryx Institute. You may not reproduce,
            distribute, or use these materials without permission, except for personal,
            non-commercial use. The Tangison Studio credit link is required on every public page
            and may not be removed.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Form submissions</p>
          <p className="text-pretty">
            When you submit a form on this website, you consent to the handling of your data as
            described in the Privacy Policy. In pre-launch, form submissions are stored locally on
            the website server. This is clearly marked in the form confirmation.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">No guarantees</p>
          <p className="text-pretty">
            Information on this website is provided as a description of what is being built. No
            programme, fee, intake date, accreditation, or partnership is guaranteed until verified
            and published as such. The institution reserves the right to add, change, or withdraw
            any planned programme or service without notice.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">External links</p>
          <p className="text-pretty">
            This website may contain links to external websites. Oryx Institute is not responsible
            for the content or privacy practices of external websites.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Liability</p>
          <p className="text-pretty">
            Oryx Institute is not liable for any loss or damage arising from your use of this
            website, except where such liability cannot be excluded under applicable law.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Changes to these terms</p>
          <p className="text-pretty">
            We may update these terms as the institution is established. We will indicate the date
            of the latest review below. Continued use of the website after changes constitutes
            acceptance of the updated terms.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Governing law</p>
          <p className="text-pretty">
            These terms are governed by the laws of the Republic of Namibia.
          </p>
        </div>

        <p className="text-xs text-[var(--muted-foreground)]/70 pt-6 border-t border-[var(--color-border)]">
          Last reviewed: July 2026. Pre-launch version.
        </p>
      </div>
    </ModalShell>
  );
}

export function AccessibilityModal() {
  return (
    <ModalShell eyebrow="Legal" title="Accessibility Statement">
      <div className="space-y-6 text-[var(--muted-foreground)] leading-relaxed">
        <p className="text-pretty">
          Oryx Institute is committed to making this website accessible to everyone, including
          people with disabilities. This statement explains the accessibility of the pre-launch
          website.
        </p>

        <div>
          <p className="eyebrow mb-2">Standard</p>
          <p className="text-pretty">
            This website aims to meet WCAG 2.2 AA as a minimum. Where the brand system allows, the
            website also meets AAA. Most brand colour pairings achieve AAA contrast. Two pairings
            are prohibited under the brand system because they fail AA: ink on maroon and ink on
            earth.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">What we do</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>Semantic HTML with proper heading hierarchy.</li>
            <li>Keyboard navigation for all interactive elements.</li>
            <li>Visible focus indicators (2 px maroon outline with 2 px offset).</li>
            <li>ARIA labels where native semantics are insufficient.</li>
            <li>Alt text for all meaningful images. Empty alt for decorative images.</li>
            <li>Form labels associated with inputs. Error messages associated via ARIA.</li>
            <li>Reduced-motion respected. All motion disabled when prefers-reduced-motion is set.</li>
            <li>Skip-to-content link at the top of every page.</li>
            <li>Live regions for dynamic form feedback.</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-2">Known limitations</p>
          <p className="text-pretty">
            Some third-party content or future integrations may not be fully accessible. The
            pre-launch website does not include video, audio, or complex interactive widgets. When
            such features are added, accessibility will be considered from the start.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Reporting an issue</p>
          <p className="text-pretty">
            If you encounter an accessibility issue on this website, please use the contact form to
            report it. Include the page, the issue, and the assistive technology you are using. We
            treat accessibility reports with urgency and will respond promptly.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-2">Compatibility</p>
          <p className="text-pretty">
            This website is tested on current versions of Chrome, Firefox, Safari, and Edge at
            screen widths of 320, 375, 414, 768, 1024, 1280, and 1440 pixels. The website is
            designed to be usable with screen readers including NVDA, VoiceOver, and TalkBack.
          </p>
        </div>

        <p className="text-xs text-[var(--muted-foreground)]/70 pt-6 border-t border-[var(--color-border)]">
          Last reviewed: July 2026. Pre-launch version.
        </p>
      </div>
    </ModalShell>
  );
}
