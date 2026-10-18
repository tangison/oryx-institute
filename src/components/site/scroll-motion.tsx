"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollMotion — the site-wide motion pass, mounted once in the root
 * layout so every route is covered, on first paint and after every
 * navigation (the pathname dependency re-runs the setup).
 *
 * Three declarative hooks, all opt-in via data attributes in the pages:
 * - [data-reveal]        fades and rises once as it enters the viewport
 * - [data-reveal-group]  staggers its direct children the same way
 * - [data-parallax]      drifts a background image against the scroll
 *
 * The rules of the register: motion is quiet, one ease, no bouncing,
 * and everything stays readable with prefers-reduced-motion (the whole
 * pass switches off and the page renders static).
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 26,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const kids = Array.from(group.children) as HTMLElement[];
        if (kids.length === 0) return;
        gsap.from(kids, {
          opacity: 0,
          y: 22,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const section = el.closest("section") ?? el;
        gsap.fromTo(
          el,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Rules and keylines grow with the scroll: the page's own
      // print rules draw themselves in, scrubbed, origin left.
      gsap.utils.toArray<HTMLElement>("[data-line-grow]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
