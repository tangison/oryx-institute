"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Scrubbing text reveal: every word of the statement begins at low
 * ink and is raised to full opacity in sequence as the reader scrolls
 * through the section. The words are real DOM text, so the statement
 * reads normally without JavaScript and for search engines.
 */
export function ScrubReveal({
  text,
  className,
  start = "top 78%",
  end = "bottom 42%",
}: {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}) {
  const scope = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = scope.current?.querySelectorAll<HTMLElement>(".scrub-word");
      if (!words || words.length === 0) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.6,
        scrollTrigger: {
          trigger: scope.current,
          start,
          end,
          scrub: 0.6,
        },
      });
    },
    { scope, revertOnUpdate: true }
  );

  const words = text.split(" ");

  return (
    <p ref={scope} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="scrub-word">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}
