"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The scroll layer. The scrollcraft engine is vendored byte-identical
 * into public/scrollcraft and loaded as a script; the page never edits
 * it, it only themes it. Client-side navigation destroys the previous
 * instance through the engine's own teardown so no listener or observer
 * survives a route change. With JavaScript off, or reduced motion on,
 * nothing in CSS hides content: the hiding is gated on html.sc-ready,
 * a class only the engine can add.
 */
declare global {
  interface Window {
    ScrollCraft?: {
      mount: (root?: Document | HTMLElement | string) => {
        destroy: () => void;
      };
      reduce: boolean;
      instances: unknown[];
    };
  }
}

let enginePromise: Promise<void> | null = null;

function loadEngine(): Promise<void> {
  if (window.ScrollCraft) return Promise.resolve();
  if (!enginePromise) {
    enginePromise = new Promise<void>((resolve, reject) => {
      const el = document.createElement("script");
      el.src = "/scrollcraft/scrollcraft.js";
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error("scrollcraft failed to load"));
      document.head.appendChild(el);
    });
  }
  return enginePromise;
}

export function SCMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let dead = false;
    let api: { destroy: () => void } | null = null;

    /* The engine mounts on the visitor's first move: it never sits on
       the load path, and the devices only matter once scrolling starts. */
    let armed = false;
    const arm = () => {
      if (armed || dead) return;
      armed = true;
      cleanupArm();
      (async () => {
        try {
          await loadEngine();
        } catch {
          return; /* The page reads perfectly without the layer. */
        }
        if (dead || !window.ScrollCraft) return;

        /* The top of every page lands still, by design: blocks already
           inside the viewport get their reveal class without the
           transition, so the landing view never animates itself in. */
        const vh = window.innerHeight;
        document.querySelectorAll<HTMLElement>("[data-sc-in]").forEach((el) => {
          if (el.getBoundingClientRect().top < vh * 0.9) {
            el.classList.add("sc-in", "sc-instant");
          }
        });

        api = window.ScrollCraft.mount();
      })();
    };
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    const armEvents: (keyof WindowEventMap)[] = ["scroll", "pointerdown", "keydown", "touchstart"];
    function cleanupArm() {
      armEvents.forEach((e) => window.removeEventListener(e, arm));
    }
    armEvents.forEach((e) => window.addEventListener(e, arm, opts));

    return () => {
      dead = true;
      cleanupArm();
      api?.destroy();
    };
  }, [pathname]);

  return null;
}
