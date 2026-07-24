'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * EditorialHero — Single seamless infinite video loop.
 *
 * Per the brand spec:
 *   - ONE video element with loop enabled (no duplicate same-source nodes)
 *   - When only one unique video exists, render one <video> with loop
 *   - Responsive dimensions: mobile 78svh max 860px, tablet 82svh, desktop 88svh max 980px
 *   - Contrast overlay: permanent responsive gradient (not dependent on video frame)
 *     Desktop: linear-gradient(90deg, rgba(23,23,23,0.78) 0%, rgba(23,23,23,0.44) 48%, rgba(23,23,23,0.10) 78%),
 *               linear-gradient(0deg, rgba(23,23,23,0.48) 0%, transparent 58%)
 *     Mobile: linear-gradient(0deg, rgba(23,23,23,0.82) 0%, rgba(23,23,23,0.34) 62%, rgba(23,23,23,0.12) 100%)
 *   - Copy: headline "Education. Skills. Impact."
 *     Desktop: clamp(3.5rem, 6vw, 4.75rem), max-width 12-14ch, bottom-left placement
 *     Mobile: clamp(2.35rem, 11vw, 3.15rem), max-width 10-12ch
 *   - Pause video when hero leaves viewport
 *   - Reduced-motion: hide video, show poster only
 *   - Video attributes: muted, playsInline, preload="metadata", poster, loop
 */

const VIDEO_SRC = {
  webm: '/hero/oryx-loop.webm',
  mp4: '/hero/oryx-loop.mp4',
  poster: '/hero/oryx-loop-poster.jpg',
};

export function EditorialHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause video when hero leaves viewport, resume when it re-enters
  useEffect(() => {
    if (reducedMotion || !videoRef.current || !heroRef.current) return;
    const video = videoRef.current;
    const hero = heroRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-[var(--color-brand-ink)]"
      style={{ minHeight: '78svh', maxHeight: '860px' }}
    >
      {/* Responsive height override for larger viewports */}
      <style>{`
        @media (min-width: 768px) { 
          [aria-labelledby="hero-heading"] { min-height: 82svh !important; } 
        }
        @media (min-width: 1024px) { 
          [aria-labelledby="hero-heading"] { min-height: 88svh !important; max-height: 980px !important; } 
        }
      `}</style>

      {/* Layer 1 — still poster (LCP element, permanent fallback) */}
      <img
        src={VIDEO_SRC.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Layer 2 — SINGLE video element with loop */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover hero-video"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster={VIDEO_SRC.poster}
          aria-hidden="true"
        >
          <source src={VIDEO_SRC.webm} type="video/webm" />
          <source src={VIDEO_SRC.mp4} type="video/mp4" />
        </video>
      )}

      {/* Layer 3 — contrast overlay (permanent, responsive)
          Desktop: directional gradient + bottom gradient
          Mobile: vertical gradient from bottom */}
      {/* Desktop contrast overlay */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          background: [
            'linear-gradient(90deg, rgba(23,23,23,0.78) 0%, rgba(23,23,23,0.44) 48%, rgba(23,23,23,0.10) 78%)',
            'linear-gradient(0deg, rgba(23,23,23,0.48) 0%, transparent 58%)',
          ].join(', '),
        }}
      />
      {/* Mobile contrast overlay */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          background: 'linear-gradient(0deg, rgba(23,23,23,0.82) 0%, rgba(23,23,23,0.34) 62%, rgba(23,23,23,0.12) 100%)',
        }}
      />

      {/* Layer 4 — content */}
      <div className="relative w-full container-oryx pb-16 md:pb-24 pt-32 flex flex-col items-start justify-end min-h-[inherit]">
        <h1
          id="hero-heading"
          className="font-display uppercase text-[var(--color-brand-cream)] font-medium leading-[1.02] tracking-[0.04em] hero-headline-shadow"
          style={{
            fontSize: 'clamp(2.35rem, 11vw, 3.15rem)',
            maxWidth: '12ch',
          }}
        >
          Education.<br />
          Skills. Impact.
        </h1>

        {/* Desktop size override */}
        <style>{`
          @media (min-width: 768px) {
            #hero-heading {
              font-size: clamp(3.5rem, 6vw, 4.75rem) !important;
              max-width: 14ch !important;
            }
          }
        `}</style>

        <p className="mt-6 max-w-xl text-base md:text-[1.0625rem] text-[var(--color-brand-cream)] leading-[1.6] text-pretty hero-body-shadow">
          A vocational education and training institution being established in Windhoek, Namibia.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="btn-primary justify-center">
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
    </section>
  );
}
