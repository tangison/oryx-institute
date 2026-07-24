import Link from 'next/link';
import { OryxLogo } from '@/components/site/oryx-logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] flex flex-col">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="container-oryx py-6 flex items-center justify-between">
        <OryxLogo variant="dark" size="compact" linked />
        <Link href="/" className="text-sm text-[var(--color-brand-cream)]/70 hover:text-[var(--color-brand-cream)] transition-colors">
          Home
        </Link>
      </header>
      <main id="main" className="flex-1 flex items-center justify-center container-oryx">
        <div className="max-w-2xl text-center py-20">
          <p className="font-display text-[8rem] md:text-[12rem] leading-none text-[var(--color-brand-maroon)] font-medium">
            404
          </p>
          <p className="eyebrow text-[var(--color-brand-cream)]/70 mb-4 mt-4">Page not found</p>
          <h1 className="font-display text-3xl md:text-5xl font-medium leading-tight text-balance mb-6">
            This page could not be found.
          </h1>
          <p className="text-[var(--color-brand-cream)]/75 leading-relaxed text-pretty mb-10 max-w-xl mx-auto">
            The page you are looking for may have moved, been renamed, or never existed. Try the
            homepage or the sitemap to find what you need.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="btn-primary">Go home</Link>
            <Link
              href="/site-map"
              className="btn-secondary-dark"
            >
              View sitemap
            </Link>
          </div>
        </div>
      </main>
      <footer className="container-oryx py-8 border-t border-[var(--color-brand-cream)]/15 text-center">
        <p className="text-xs text-[var(--color-brand-cream)]/50">
          Made by{' '}
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-brand-cream)] hover:text-[var(--color-brand-cream)] underline-offset-4 hover:underline"
          >
            Tangison Studio
          </a>
        </p>
      </footer>
    </div>
  );
}
