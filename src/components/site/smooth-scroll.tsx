"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * SmoothScroll — Lenis owns the window scroll for the whole session and
 * is driven by GSAP's ticker so Lenis, ScrollTrigger and every
 * scrubbed tween on the site share one clock. That single clock is the
 * difference between scroll effects that float and scroll effects that
 * stutter.
 *
 * - `anchors: true` hands in-page # links to Lenis with the fixed
 *   header offset respected.
 * - Reduced-motion visitors keep the browser's native scroll; nothing
 *   is instantiated for them.
 * - Route changes hard-jump to the top (immediate, no tween fighting
 *   the navigation) and re-measure every ScrollTrigger.
 * - The instance is exposed as window.__lenis so overlay components
 *   can stop and start the scroll loop when they cover the page.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
