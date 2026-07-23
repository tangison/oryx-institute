'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { heroSlides } from '@/lib/content';

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    []
  );

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(next, 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, next]);

  const slide = heroSlides[index];

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="Oryx Institute introduction"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[var(--oryx-ink)]"
    >
      {/* Slide images */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,14,13,0.92)] via-[rgba(15,14,13,0.45)] to-[rgba(15,14,13,0.35)]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(15,14,13,0.55)] to-transparent" />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative h-full container-oryx flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--oryx-warm-white)] mb-4">
            Windhoek · Namibia · Pre-Launch
          </p>
          <h1
            key={`title-${index}`}
            className="hero-slide font-display text-[var(--oryx-cream)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight text-balance"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            {slide.headline}
          </h1>
          <p
            key={`body-${index}`}
            className="hero-slide mt-6 max-w-xl text-base md:text-lg text-[var(--oryx-warm-white)] leading-relaxed text-pretty"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
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
              className="btn-secondary justify-center"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--oryx-cream)',
                borderColor: 'var(--oryx-cream)',
              }}
            >
              Explore the Institute
            </Link>
          </div>
        </div>
      </div>

      {/* Slide controls — bottom right */}
      <div className="absolute bottom-6 md:bottom-8 right-0 container-oryx flex items-center justify-end gap-3">
        <button
          onClick={prev}
          className="w-10 h-10 inline-flex items-center justify-center border border-[var(--oryx-cream)]/50 text-[var(--oryx-cream)] hover:bg-[var(--oryx-cream)] hover:text-[var(--oryx-ink)] transition-colors duration-200"
          aria-label="Previous slide"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-10 h-10 inline-flex items-center justify-center border border-[var(--oryx-cream)]/50 text-[var(--oryx-cream)] hover:bg-[var(--oryx-cream)] hover:text-[var(--oryx-ink)] transition-colors duration-200"
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="3" height="10" fill="currentColor" />
              <rect x="7" y="1" width="3" height="10" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 1L11 6L2 11V1Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          onClick={next}
          className="w-10 h-10 inline-flex items-center justify-center border border-[var(--oryx-cream)]/50 text-[var(--oryx-cream)] hover:bg-[var(--oryx-cream)] hover:text-[var(--oryx-ink)] transition-colors duration-200"
          aria-label="Next slide"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      {/* Slide position indicator — bottom left */}
      <div
        className="absolute bottom-6 md:bottom-8 left-0 container-oryx flex items-center gap-3"
        aria-live="polite"
      >
        <span className="font-display text-[var(--oryx-cream)] text-sm tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-[var(--oryx-cream)]/60 text-sm">/</span>
        <span className="text-[var(--oryx-cream)]/60 text-sm tabular-nums">
          {String(heroSlides.length).padStart(2, '0')}
        </span>
        <span className="sr-only">
          Slide {index + 1} of {heroSlides.length}
        </span>
        <div className="hidden md:block w-32 h-px bg-[var(--oryx-cream)]/30 ml-4">
          <div
            className="h-px bg-[var(--oryx-cream)] transition-all duration-300"
            style={{ width: `${((index + 1) / heroSlides.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
