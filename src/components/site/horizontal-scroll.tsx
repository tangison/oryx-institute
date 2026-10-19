"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalScroll — the horizontal scroll craft, used on every page.
 *
 * Desktop (>= 1024px, motion allowed): the section pins and the track
 * translates horizontally while the visitor scrolls vertically — the
 * scrubbed, gallery-drawer feel. Track length is measured from the
 * real content, so any mix of cards and plates works.
 *
 * Small screens and reduced-motion visitors: the same track renders as
 * a native overflow-x row — swipeable, no pinning, no JS dependency.
 * Content is server-rendered visible either way.
 */
export function HorizontalScroll({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  /** Accessible name for the strip. */
  label: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = !window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || narrow) return; // native swipe row, no pinning

    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(0, track.scrollWidth - section.clientWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + section.clientHeight * 0.6}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hs-wrap overflow-hidden ${className}`}
      aria-label={label}
    >
      <div
        ref={trackRef}
        className="hs-track flex w-max gap-5 px-[var(--gutter)] max-lg:overflow-x-auto max-lg:pb-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {children}
      </div>
    </section>
  );
}
