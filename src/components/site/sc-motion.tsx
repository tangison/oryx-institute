"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The scroll layer, on GSAP + ScrollTrigger.
 *
 * The page states its motion declaratively and this component wires it:
 *
 *   data-sc-act="flow" | "scrub"   a scroll region; parallax layers inside
 *                                  it are scrubbed across its crossing.
 *   data-sc-act="pin"               a pinned act: the [data-sc-stage]
 *                                  child is pinned by ScrollTrigger for
 *                                  data-sc-span viewports (2.5 = 250vh).
 *   data-sc-parallax="<rate>"       translateY = rate x (progress - .5) x
 *                                  100px across the act. Negative recedes.
 *   data-sc-in                      fade+rise once on entry (CSS class
 *                                  .sc-in; with data-sc-stagger="ms" the
 *                                  children reveal in a stagger instead).
 *   data-sc-row                     inside a pinned stage: rows cross-fade
 *                                  one at a time across the pin.
 *   data-sc-scrim                   inside a pinned stage: the copy block
 *                                  fades and rises over the first fifth
 *                                  of the pin, then holds.
 *   data-sc-scale                   inside a pinned stage: the media
 *                                  eases from 1.06 to 1 across the pin.
 *
 * With JavaScript off, or reduced motion on, nothing in CSS hides
 * content: the hiding is gated on html.sc-ready, a class only this
 * engine adds, and the reduced-motion path never adds it. Pins,
 * parallax and scrub simply do not exist in those modes; every block
 * stands in normal flow, fully visible.
 */

type Engine = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let enginePromise: Promise<Engine> | null = null;

function loadEngine(): Promise<Engine> {
  if (!enginePromise) {
    enginePromise = (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsapMod.gsap.registerPlugin(stMod.ScrollTrigger);
      return { gsap: gsapMod.gsap, ScrollTrigger: stMod.ScrollTrigger };
    })();
  }
  return enginePromise;
}

/** Armed stays true for the session: the first interaction pays the
 * load, every route after builds immediately. */
let armed = false;

function reduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Everything the CSS pre-hides, shown at once: the no-motion state. */
function revealAll(root: Document) {
  root.querySelectorAll<HTMLElement>("[data-sc-in]").forEach((el) => {
    el.classList.add("sc-in", "sc-instant");
    if (el.hasAttribute("data-sc-stagger")) {
      Array.from(el.children).forEach((c) =>
        c.classList.add("sc-in", "sc-instant")
      );
    }
  });
}

function build(root: Document, engine: Engine) {
  const { gsap, ScrollTrigger } = engine;
  const mobile = window.innerWidth < 768;

  return gsap.context(() => {
    /* Pins first: later triggers measure against them. */
    root.querySelectorAll<HTMLElement>('[data-sc-act="pin"]').forEach((act) => {
      const stage = act.querySelector<HTMLElement>("[data-sc-stage]");
      if (!stage) return;

      let span = parseFloat(act.getAttribute("data-sc-span") || "2");
      if (!Number.isFinite(span) || span <= 0) span = 2;
      if (mobile) span = Math.max(1, span * 0.45);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: act,
          start: "top top",
          end: () => "+=" + Math.round(span * window.innerHeight),
          pin: stage,
          scrub: true,
          anticipatePin: 1,
        },
      });

      /* Cross-faded rows: one engine at a time, no sliding. */
      const rows = gsap.utils.toArray<HTMLElement>("[data-sc-row]", stage);
      if (rows.length > 1) {
        gsap.set(rows.slice(1), { autoAlpha: 0, y: 14 });
        const seg = 1 / (rows.length - 1);
        rows.slice(1).forEach((row, i) => {
          const at = (i + 1 - 0.62) * seg;
          tl.to(rows[i], { autoAlpha: 0, y: -10, duration: seg * 0.24 }, at).to(
            row,
            { autoAlpha: 1, y: 0, duration: seg * 0.24 },
            at
          );
        });
      }

      /* The copy block over a full-bleed photograph: in over the
         first fifth, then it holds while the pin plays out. */
      stage.querySelectorAll<HTMLElement>("[data-sc-scrim]").forEach((el) => {
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.02
        );
      });

      /* The photograph settles a hair as the pin runs: depth,
         not decoration. */
      stage.querySelectorAll<HTMLElement>("[data-sc-scale]").forEach((el) => {
        tl.fromTo(el, { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "none" }, 0);
      });
    });

    /* Parallax inside flow and scrub acts, scrubbed across the
       act's full crossing of the viewport. */
    root.querySelectorAll<HTMLElement>("[data-sc-act]").forEach((act) => {
      if (act.getAttribute("data-sc-act") === "pin") return;
      act.querySelectorAll<HTMLElement>("[data-sc-parallax]").forEach((el) => {
        const rate = parseFloat(el.getAttribute("data-sc-parallax") || "0");
        if (!Number.isFinite(rate) || rate === 0) return;
        const travel = rate * 50 * (mobile ? 0.5 : 1);
        gsap.fromTo(
          el,
          { y: -travel },
          {
            y: travel,
            ease: "none",
            scrollTrigger: {
              trigger: act,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    /* In-view reveals. Blocks already inside the viewport land
       still, by design: the landing view never animates in. */
    const vh = window.innerHeight;
    root.querySelectorAll<HTMLElement>("[data-sc-in]").forEach((el) => {
      const kids = el.hasAttribute("data-sc-stagger")
        ? Array.from(el.children)
        : null;
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add("sc-in", "sc-instant");
        kids?.forEach((c) => c.classList.add("sc-in", "sc-instant"));
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          /* The container itself reveals too: the CSS pre-hides both
             the block and, for staggered groups, its children. */
          el.classList.add("sc-in");
          if (kids) {
            const step = parseFloat(el.getAttribute("data-sc-stagger") || "70");
            kids.forEach((c, i) =>
              window.setTimeout(
                () => c.classList.add("sc-in"),
                Number.isFinite(step) ? i * step : i * 70
              )
            );
          }
        },
      });
    });
  }, root);
}

export function SCMotion() {
  const pathname = usePathname();

  useEffect(() => {
    /* Reduced motion: no engine, no pins, no scrub, no hiding.
       Everything reads immediately, exactly as printed. */
    if (reduced()) {
      document.documentElement.classList.remove("sc-ready");
      revealAll(document);
      return;
    }

    let dead = false;
    let ctx: { revert: () => void } | null = null;

    const start = async () => {
      if (dead) return;
      let engine: Engine;
      try {
        engine = await loadEngine();
      } catch {
        return; /* The page reads perfectly without the layer. */
      }
      if (dead) return;
      armed = true;
      document.documentElement.classList.add("sc-ready");
      ctx = build(document, engine);
    };

    if (armed) {
      start();
    } else {
      /* The engine mounts on the visitor's first move: it never
         sits on the load path. */
      const arm = () => {
        if (dead) return;
        cleanupArm();
        start();
      };
      const opts = { once: true, passive: true } as AddEventListenerOptions;
      const armEvents: (keyof WindowEventMap)[] = [
        "scroll",
        "pointerdown",
        "keydown",
        "touchstart",
      ];
      function cleanupArm() {
        armEvents.forEach((e) => window.removeEventListener(e, arm));
      }
      armEvents.forEach((e) => window.addEventListener(e, arm, opts));
      return () => {
        dead = true;
        cleanupArm();
        ctx?.revert();
      };
    }

    return () => {
      dead = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
