'use client';

import { useModal } from '@/lib/modal-context';
import { InstituteModal } from './modal-institute';
import { FounderModal } from './modal-founder';
import { BrandModal } from './modal-brand';
import { ProgrammeModal } from './modal-programme';
import { SchoolModal } from './modal-school';
import { EnquiryModal } from './modal-enquiry';
import { SitemapModal } from './modal-sitemap';
import { ResearchModal } from './modal-research';
import { PrivacyModal, TermsModal, AccessibilityModal } from './modal-legal';

export function ModalRouter() {
  const { modal } = useModal();

  if (!modal) return null;

  if (modal === 'institute') return <InstituteModal />;
  if (modal === 'founder') return <FounderModal />;
  if (modal === 'brand') return <BrandModal />;
  if (modal === 'research') return <ResearchModal />;
  if (modal === 'contact') return <EnquiryModal type="contact" />;
  if (modal === 'partner-employer') return <EnquiryModal type="employer-enquiry" />;
  if (modal === 'partner-wil') return <EnquiryModal type="wil-enquiry" />;
  if (modal === 'partner-corporate') return <EnquiryModal type="corporate-training-enquiry" />;
  if (modal === 'partner-research') return <EnquiryModal type="research-advisory-enquiry" />;
  if (modal === 'partner-funding') return <EnquiryModal type="funding-partnership-enquiry" />;
  if (modal === 'legal-privacy') return <PrivacyModal />;
  if (modal === 'legal-terms') return <TermsModal />;
  if (modal === 'legal-accessibility') return <AccessibilityModal />;
  if (modal === 'legal-sitemap') return <SitemapModal />;

  if (typeof modal === 'object' && modal !== null) {
    if ('programme' in modal) return <ProgrammeModal slug={modal.programme} />;
    if ('school' in modal) return <SchoolModal slug={modal.school} />;
  }

  return null;
}
