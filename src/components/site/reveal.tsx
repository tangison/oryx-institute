"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * The site's one motion module. It mounts the GSAP reveal runner only
 * when the visitor has not asked for reduced motion — the runner itself
 * is code-split behind next/dynamic, so gsap never loads for anyone
 * else. With JavaScript off, or reduced motion on, every data-reveal
 * block is simply visible: nothing in CSS ever hides content.
 */
const RevealRunner = dynamic(() => import("./reveal-runner"), { ssr: false });

export function SiteMotion() {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setArmed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* The runner mounts on the visitor's first move: gsap never sits on
     the load path, and the reveals only matter once scrolling starts. */
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    if (!armed || moving) return;
    const arm = () => setMoving(true);
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("scroll", arm, opts);
    window.addEventListener("pointerdown", arm, opts);
    window.addEventListener("keydown", arm, opts);
    return () => {
      window.removeEventListener("scroll", arm);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [armed, moving]);

  if (!armed || !moving) return null;
  return <RevealRunner />;
}
