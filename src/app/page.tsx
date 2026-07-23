'use client';

import { ModalProvider } from '@/lib/modal-context';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { Hero } from '@/components/site/hero';
import { InstituteIntro } from '@/components/site/section-institute-intro';
import { SchoolsSection } from '@/components/site/section-schools';
import { PathwaysSection } from '@/components/site/section-pathways';
import { PathwaysDetailSection } from '@/components/site/section-pathways-detail';
import { ProgrammesSection } from '@/components/site/section-programmes';
import { CampusSection } from '@/components/site/section-campus';
import { ResearchSection } from '@/components/site/section-research';
import { UpdatesSection } from '@/components/site/section-updates';
import { FounderSection } from '@/components/site/section-founder';
import { BrandSection } from '@/components/site/section-brand';
import { FaqSection } from '@/components/site/section-faq';
import { PartnerSection } from '@/components/site/section-partners';
import { MailingListSection } from '@/components/site/section-mailing-list';
import { RegisterInterestSection } from '@/components/site/section-register-interest';
import { FormHandler } from '@/components/site/form-handler';
import { ModalRouter } from '@/components/modals/modal-router';

export default function Home() {
  return (
    <ModalProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <InstituteIntro />
        <SchoolsSection />
        <PathwaysSection />
        <PathwaysDetailSection />
        <ProgrammesSection />
        <CampusSection />
        <ResearchSection />
        <FounderSection />
        <BrandSection />
        <UpdatesSection />
        <PartnerSection />
        <FaqSection />
        <MailingListSection />
        <RegisterInterestSection />
      </main>
      <SiteFooter />
      <FormHandler />
      <ModalRouter />
    </ModalProvider>
  );
}
