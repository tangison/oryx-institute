'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { heroSlides } from '@/lib/content';

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    []
  );

  // Detect reduced-motion preference (DESIGN.md §14: disable autoplay)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    timer.current = setInterval(next, 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, next, reducedMotion]);

  const slide = heroSlides[index];

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="Oryx Institute introduction"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[var(--color-brand-ink)]"
    >
      {/* Slide images */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt={i === index ? s.alt : ''}
            className="w-full h-full object-cover"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* DESIGN.md §6.4 gradient-photo-dark token */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(90deg, rgba(23, 23, 23, 0.92) 0%, rgba(74, 7, 16, 0.68) 52%, rgba(74, 7, 16, 0.20) 100%)' }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(23,23,23,0.55)] to-transparent" />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative h-full container-oryx flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">
            Windhoek · Namibia · Pre-Launch
          </p>
          <h1
            key={`title-${index}`}
            className={`hero-slide font-display text-[var(--color-brand-cream)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-[0.04em] text-balance hero-headline-shadow ${reducedMotion ? '' : 'uppercase'}`}
          >
            {slide.headline}
          </h1>
          <p
            key={`body-${index}`}
            className="hero-slide mt-6 max-w-xl text-base md:text-lg text-[var(--color-brand-cream)] leading-relaxed text-pretty hero-body-shadow"
          >
            {slide.supporting}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/register"
              className="btn-primary justify-center"
            >
              Register Interest
            </Link>
            <Link
              href="/about"
              className="btn-secondary justify-center hero-secondary-btn"
            >
              Explore the Institute
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal slide controls — appear on hover, bottom right, 44px touch targets */}
      <div className="absolute bottom-6 md:bottom-8 right-0 container-oryx flex items-center justify-end gap-2 opacity-60 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <button
          onClick={prev}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] transition-colors duration-200"
          aria-label="Previous slide"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] transition-colors duration-200"
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="3" height="10" fill="currentColor" />
              <rect x="7" y="1" width="3" height="10" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 1L11 6L2 11V1Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          onClick={next}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] transition-colors duration-200"
          aria-label="Next slide"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      {/* Slide position indicator — bottom left, minimal */}
      <div
        className="absolute bottom-6 md:bottom-8 left-0 container-oryx flex items-center gap-3"
        aria-live="polite"
      >
        <span className="font-display text-[var(--color-brand-cream)] text-sm tabular-nums tracking-[0.04em]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-[var(--color-brand-cream)]/40 text-sm">/</span>
        <span className="text-[var(--color-brand-cream)]/40 text-sm tabular-nums">
          {String(heroSlides.length).padStart(2, '0')}
        </span>
        <span className="sr-only">
          Slide {index + 1} of {heroSlides.length}
        </span>
      </div>
    </section>
  );
}
