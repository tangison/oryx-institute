"use client";

import { useEffect, useRef, useState } from "react";
import { chrome, type Lang } from "@/lib/i18n";

/**
 * The two scroll widgets, one listener between them.
 *
 * The progress hairline sits under the header bar and fills left to
 * right as the page is read; the top button waits in the corner and
 * only steps forward once the visitor is a viewport and a half down,
 * and steps back the moment they are near the top. Neither ever
 * appears "out of the blue": both arrive on the page's own ease, and
 * both leave the flow to keyboard and screen readers when hidden.
 *
 * With JavaScript off both stay display:none. Reduced motion gets the
 * same hairline and an instant (unsmoothed) scroll to the top; only
 * the travel smoothing is removed, never the control.
 */

const SHOW_AFTER = 640; /* px of scroll before the button steps out */

export function ScrollChrome({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const progress = bar.current;
    let mounted = true;

    const paint = () => {
      raf.current = 0;
      if (!mounted) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (progress) {
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progress.style.transform = `scaleX(${p})`;
      }
      setShow(y > SHOW_AFTER);
    };

    const onScroll = () => {
      if (!raf.current) raf.current = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      mounted = false;
      if (raf.current) window.cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  const label = chrome[lang].toTop;

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__fill" ref={bar} />
      </div>
      <button
        type="button"
        className={show ? "scroll-top is-shown" : "scroll-top"}
        onClick={toTop}
        tabIndex={show ? 0 : -1}
        aria-hidden={show ? undefined : true}
        aria-label={label}
        title={label}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
          <path
            d="M8 13.5V2.5M8 2.5L3.5 7M8 2.5L12.5 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
