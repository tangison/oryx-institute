"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Behaviour for the off-canvas menu. The menu itself is a checkbox
 * disclosure: it opens, navigates and closes with JavaScript off. This
 * module adds what a keyboard and a single-page app expect: a scroll
 * lock while it is open, Escape to close, close on navigation, focus
 * landing on the first link, and the search overlay stepping aside
 * when the menu opens.
 */
export function MenuBehaviour() {
  const pathname = usePathname();

  useEffect(() => {
    const toggle = document.getElementById(
      "site-menu-toggle"
    ) as HTMLInputElement | null;
    if (!toggle) return;
    const panel = document.getElementById("site-menu-panel");

    const sync = (open: boolean) => {
      document.body.classList.toggle("menu-locked", open);
      if (open) {
        document.dispatchEvent(new CustomEvent("oryx:menu-open"));
        panel
          ?.querySelector<HTMLElement>("[data-menu-first]")
          ?.focus({ preventScroll: true });
      }
    };

    const onChange = () => sync(toggle.checked);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && toggle.checked) {
        toggle.checked = false;
        sync(false);
        toggle.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!toggle.checked) return;
      const link = (e.target as HTMLElement).closest("a");
      if (link && panel?.contains(link)) {
        toggle.checked = false;
        sync(false);
      }
    };

    /* Route changes close the menu; the panel never survives a
       navigation it just caused. */
    toggle.checked = false;
    document.body.classList.remove("menu-locked");

    toggle.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      toggle.removeEventListener("change", onChange);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.body.classList.remove("menu-locked");
    };
  }, [pathname]);

  return null;
}
