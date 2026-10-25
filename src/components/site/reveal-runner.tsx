"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The reveal runner: GSAP ScrollTrigger, transform + opacity only,
 * interruptible, once per block. Blocks already inside the viewport on
 * load stay static — the top of every page lands still, by design.
 */
export default function RevealRunner() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (els.length === 0) return;

    const ctx = gsap.context(() => {
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const alreadySeen = rect.top < window.innerHeight * 0.9;
        if (alreadySeen) continue;

        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
