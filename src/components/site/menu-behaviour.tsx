"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Behaviour for the off-canvas menu. The menu remains a checkbox
 * disclosure when JavaScript is unavailable. Once JavaScript is running,
 * it becomes a proper modal: it locks page scroll, keeps focus inside the
 * open panel, makes the reading surface inert and returns focus to the
 * trigger when it closes.
 */
export function MenuBehaviour() {
  const pathname = usePathname();

  useEffect(() => {
    const toggle = document.getElementById(
      "site-menu-toggle"
    ) as HTMLInputElement | null;
    const panel = document.getElementById("site-menu-panel");
    const main = document.getElementById("main");
    const footer = document.querySelector(".site-footer");
    const skipLink = document.querySelector(".skip-link");
    if (!toggle || !panel) return;

    const setInert = (element: Element | null, inert: boolean) => {
      if (!element) return;
      element.toggleAttribute("inert", inert);
    };

    const sync = (open: boolean, restoreFocus = false) => {
      document.body.classList.toggle("menu-locked", open);
      toggle.setAttribute("aria-expanded", String(open));
      panel.toggleAttribute("inert", !open);
      panel.setAttribute("aria-hidden", String(!open));

      if (open) {
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-modal", "true");
        setInert(main, true);
        setInert(footer, true);
        setInert(skipLink, true);
        document.dispatchEvent(new CustomEvent("oryx:menu-open"));
        requestAnimationFrame(() => {
          panel
            .querySelector<HTMLElement>("[data-menu-first]")
            ?.focus({ preventScroll: true });
        });
      } else {
        panel.removeAttribute("role");
        panel.removeAttribute("aria-modal");
        setInert(main, false);
        setInert(footer, false);
        setInert(skipLink, false);
        if (restoreFocus) {
          requestAnimationFrame(() => toggle.focus({ preventScroll: true }));
        }
      }
    };

    /* A route change always resolves the disclosure. This also establishes
       the hidden panel's initial inert/ARIA state on first hydration. */
    toggle.checked = false;
    let wasOpen = false;
    sync(false);

    const close = (restoreFocus = false) => {
      toggle.checked = false;
      wasOpen = false;
      sync(false, restoreFocus);
    };

    const onChange = () => {
      const open = toggle.checked;
      const returningFromMenu = wasOpen && !open;
      wasOpen = open;
      sync(open, returningFromMenu);
    };

    const onKey = (event: KeyboardEvent) => {
      if (!toggle.checked) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.getClientRects().length > 0
      );
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!toggle.checked) return;
      const link = (event.target as HTMLElement).closest("a");
      if (link && panel.contains(link)) close();
    };

    const onSearchOpen = () => {
      if (toggle.checked) close();
    };

    toggle.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.addEventListener("oryx:search-open", onSearchOpen);

    return () => {
      toggle.removeEventListener("change", onChange);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.removeEventListener("oryx:search-open", onSearchOpen);
      document.body.classList.remove("menu-locked");
      setInert(main, false);
      setInert(footer, false);
      setInert(skipLink, false);
      panel.removeAttribute("inert");
      panel.removeAttribute("aria-hidden");
      panel.removeAttribute("role");
      panel.removeAttribute("aria-modal");
    };
  }, [pathname]);

  return null;
}
