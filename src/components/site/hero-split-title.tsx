"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

/**
 * HeroSplitTitle — the React Bits × GSAP SplitText pass on every inner
 * page's headline. The h1 markup is identical to the static version
 * (same classes, same accent span, same SSR text for search engines);
 * after hydration the words rise once, on mount, one ease, no bounce.
 *
 * GSAP 3.13+'s SplitText handles the nested accent span: the em-serif
 * words inside it keep their italic serif face and maroon colour while
 * animating. Reduced-motion visitors get the static headline, exactly
 * as rendered.
 */
export function HeroSplitTitle({
  title,
  accent,
  className = "display-hero max-w-[16ch] text-ink",
}: {
  title: string;
  accent?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const split = SplitText.create(ref.current, {
        type: "words",
        wordsClass: "hero-word",
      });
      gsap.from(split.words, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.05,
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <h1 ref={ref} className={className}>
      {title}
      {accent ? <span className="em-serif text-accent"> {accent}</span> : null}
    </h1>
  );
}
