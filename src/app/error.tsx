'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--oryx-ink)] text-[var(--oryx-cream)] flex flex-col">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="container-oryx py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/oryx-mark.png" alt="" aria-hidden="true" className="h-10 w-auto" />
          <span className="font-display text-base font-medium">Oryx Institute</span>
        </Link>
      </header>
      <main id="main" className="flex-1 flex items-center justify-center container-oryx">
        <div className="max-w-2xl text-center py-20">
          <p className="font-display text-[8rem] md:text-[12rem] leading-none text-[var(--oryx-maroon)] font-medium">
            500
          </p>
          <p className="eyebrow text-[var(--oryx-warm-white)]/70 mb-4 mt-4">Something went wrong</p>
          <h1 className="font-display text-3xl md:text-5xl font-medium leading-tight text-balance mb-6">
            An unexpected error occurred.
          </h1>
          <p className="text-[var(--oryx-warm-white)]/75 leading-relaxed text-pretty mb-10 max-w-xl mx-auto">
            Something went wrong on our end. Try again, or go back to the homepage. If the problem
            persists, please use the contact form to let us know.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={reset} className="btn-primary">Try again</button>
            <Link
              href="/"
              className="btn-secondary"
              style={{ color: 'var(--oryx-cream)', borderColor: 'var(--oryx-cream)' }}
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <footer className="container-oryx py-8 border-t border-[var(--oryx-warm-white)]/15 text-center">
        <p className="text-xs text-[var(--oryx-warm-white)]/50">
          Made by{' '}
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--oryx-warm-white)] hover:text-[var(--oryx-cream)] underline-offset-4 hover:underline"
          >
            Tangison Studio
          </a>
        </p>
      </footer>
    </div>
  );
}
