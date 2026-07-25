'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false — motion hooks (GSAP ScrollTrigger) must
// run only on the client. Using a client wrapper so the server page.tsx
// stays a Server Component (metadata must be exported from there).
const AnimatedHomeContent = dynamic(
  () => import('@/components/site/animated-home').then((mod) => mod.AnimatedHomeContent),
  { ssr: false },
);

export function ClientHomeSections() {
  return <AnimatedHomeContent />;
}
