'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * EditorialHero — Collins-style restraint, seamless infinite video loop.
 *
 * Dual-video cross-fade eliminates the visible stutter/gap that native
 * <video loop> produces when the browser seeks back to start. Two identical
 * <video> elements are stacked; when the active one reaches ~200ms before
 * its end, the other starts from time 0 and fades in, then roles swap.
 *
 * Gradient overlays use CSS custom-property tokens from globals.css,
 * not inline rgba() improvisation (Hallmark P0-1 fix).
 */

const VIDEO_SRC = {
  webm: '/hero/oryx-loop.webm',
  mp4: '/hero/oryx-loop.mp4',
};

const FADE_TRIGGER_S = 0.25; // seconds before end to trigger cross-fade
const FADE_DURATION_MS = 150;

export function EditorialHero() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<'A' | 'B'>('A'); // which video is currently front
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frontVideo, setFrontVideo] = useState<'A' | 'B'>('A'); // for rendering opacity

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Seamless loop engine
  useEffect(() => {
    if (reducedMotion) return;

    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const startLoop = () => {
      // Ensure we have a valid duration
      const dur = videoA.duration;
      if (!dur || dur === Infinity || dur <= 0) return;

      // Start A playing, B paused at 0
      videoA.currentTime = 0;
      videoA.play().catch(() => {});
      videoB.currentTime = 0;
      videoB.pause();

      const monitor = () => {
        const currentActive = activeRef.current;
        const front = currentActive === 'A' ? videoARef.current : videoBRef.current;
        const back = currentActive === 'A' ? videoBRef.current : videoARef.current;

        if (!front || !back) {
          rafRef.current = requestAnimationFrame(monitor);
          return;
        }

        const remaining = dur - front.currentTime;

        if (remaining <= FADE_TRIGGER_S) {
          // Cross-fade: start back video from 0, swap active
          back.currentTime = 0;
          back.play().catch(() => {});

          const newActive = currentActive === 'A' ? 'B' : 'A';
          activeRef.current = newActive;
          setFrontVideo(newActive); // update render state for opacity

          // After fade completes, pause old front video
          const oldFront = front;
          setTimeout(() => {
            oldFront.pause();
            oldFront.currentTime = 0;
          }, FADE_DURATION_MS + 80);

          // Continue monitoring with new front video after settling
          setTimeout(() => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(monitor);
          }, FADE_DURATION_MS + 120);
          return;
        }

        rafRef.current = requestAnimationFrame(monitor);
      };

      rafRef.current = requestAnimationFrame(monitor);
    };

    // Wait for video metadata before starting the loop
    if (videoA.readyState >= 1 && videoA.duration > 0 && videoA.duration !== Infinity) {
      startLoop();
    } else {
      videoA.addEventListener('loadedmetadata', startLoop, { once: true });
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  // Fallback: if any video ends unexpectedly, restart it immediately
  const handleVideoEnded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!reducedMotion) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[88svh] flex items-end overflow-hidden bg-[var(--color-brand-ink)]"
    >
      {/* Layer 1 — still poster (LCP element, permanent fallback) */}
      <img
        src="/hero/oryx-loop-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Layer 2a — Video A */}
      <video
        ref={videoARef}
        className="absolute inset-0 w-full h-full object-cover hero-video"
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onEnded={handleVideoEnded}
        style={{
          opacity: frontVideo === 'A' ? 1 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms linear`,
          zIndex: frontVideo === 'A' ? 2 : 1,
        }}
      >
        <source src={VIDEO_SRC.webm} type="video/webm" />
        <source src={VIDEO_SRC.mp4} type="video/mp4" />
      </video>

      {/* Layer 2b — Video B */}
      <video
        ref={videoBRef}
        className="absolute inset-0 w-full h-full object-cover hero-video"
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onEnded={handleVideoEnded}
        style={{
          opacity: frontVideo === 'B' ? 1 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms linear`,
          zIndex: frontVideo === 'B' ? 2 : 1,
        }}
      >
        <source src={VIDEO_SRC.webm} type="video/webm" />
        <source src={VIDEO_SRC.mp4} type="video/mp4" />
      </video>

      {/* Layer 3 — gradient-photo-dark-strong token */}
      <div className="absolute inset-0 gradient-photo-dark-strong" />

      {/* Layer 4a — bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 gradient-fade-bottom" />
      {/* Layer 4b — top fade */}
      <div className="absolute inset-x-0 top-0 h-32 gradient-fade-top" />

      {/* Layer 5 — content */}
      <div className="relative w-full container-oryx pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-5">
            Windhoek · Namibia · Pre-Launch
          </p>
          <h1
            id="hero-heading"
            className="font-display uppercase text-[var(--color-brand-cream)] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[0.04em] text-balance hero-headline-shadow"
          >
            Education.<br />
            Skills. Impact.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-[1.0625rem] text-[var(--color-brand-cream)] leading-[1.6] text-pretty hero-body-shadow">
            A multidisciplinary vocational education and training institution
            being established in Windhoek, Namibia.
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
      </div>
    </section>
  );
}
