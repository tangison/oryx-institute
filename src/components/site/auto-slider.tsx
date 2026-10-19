"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export type SliderSlide = {
  src: string;
  alt: string;
};

/**
 * AutoSlider — the home hero's automatic register. Full-bleed plates
 * crossfade with a slow Ken Burns push; no dots, no arrows, no
 * captions, nothing to operate. It simply runs, like a gallery wall
 * that changes itself.
 *
 * - GSAP crossfade + scale, one ease, no bounce.
 * - Pauses while the tab is hidden (no invisible battery drain).
 * - Reduced motion: the first plate renders and stays.
 * - The first slide is priority-loaded; the rest follow on idle.
 */
export function AutoSlider({
  slides,
  className = "",
}: {
  slides: readonly SliderSlide[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const frames = Array.from(
      root.querySelectorAll<HTMLElement>("[data-slide]")
    );
    if (frames.length < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frames.forEach((f, i) => {
        f.style.opacity = i === 0 ? "1" : "0";
      });
      return;
    }

    frames.forEach((f, i) => {
      gsap.set(f, { opacity: i === 0 ? 1 : 0 });
    });

    const inner = frames[0].firstElementChild as HTMLElement | null;
    let tween: gsap.core.Tween | null = null;
    if (inner) {
      tween = gsap.fromTo(
        inner,
        { scale: 1 },
        {
          scale: 1.07,
          duration: 7.4,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );
    }

    let index = 0;
    let timer = 0;
    let hidden = document.visibilityState === "hidden";

    const show = (next: number) => {
      const prev = frames[index];
      const upcoming = frames[next];
      gsap.to(prev, { opacity: 0, duration: 1.3, ease: "power2.inOut" });
      gsap.to(upcoming, { opacity: 1, duration: 1.3, ease: "power2.inOut" });
      index = next;
    };

    const tick = () => {
      if (hidden) return;
      show((index + 1) % frames.length);
    };

    const start = () => {
      if (timer) return;
      timer = window.setInterval(tick, 5200);
    };
    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };

    const onVisibility = () => {
      hidden = document.visibilityState === "hidden";
      if (hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      tween?.kill();
      gsap.killTweensOf(frames);
    };
  }, [slides.length]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="false"
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          data-slide
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={i === 0 ? s.alt : ""}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            sizes="(min-width: 64rem) 46vw, 100vw"
            className="object-cover will-change-transform"
          />
        </div>
      ))}
    </div>
  );
}
