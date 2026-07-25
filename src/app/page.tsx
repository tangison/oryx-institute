import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { EditorialHero } from '@/components/site/editorial-hero';
import { websiteLd, videoLd, combineLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Oryx Institute — Vocational Training in Windhoek, Namibia',
  description:
    'A multidisciplinary vocational education and training institution being established in Windhoek. Planned schools, programmes, recognition of prior learning, and work-integrated learning.',
  alternates: { canonical: 'https://oryxinstitute.org' },
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combineLd([websiteLd(), videoLd()]) }}
      />
      <SiteHeader />
      <main id="main">
        <section id="hero" aria-labelledby="hero-heading">
          <EditorialHero />
        </section>
        {/* Animated sections loaded as client component */}
        <ClientHomeSections />
      </main>
      <SiteFooter />
    </>
  );
}

// Client component boundary — all motion hooks run only on client
function ClientHomeSections() {
  // This will be imported from animated-home.tsx which is 'use client'
  // but we need to avoid SSR prerendering issues
  const { AnimatedHomeContent } = require('@/components/site/animated-home');
  return <AnimatedHomeContent />;
}
