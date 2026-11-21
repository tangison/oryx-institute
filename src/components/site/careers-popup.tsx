"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { formatRecruitmentDeadline, recruitment } from "@/lib/careers";
import type { Lang } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Careers at Oryx",
    title: "Nine roles are open in Ongwediva.",
    body: (deadline: string) => `Applications close ${deadline}.`,
    action: "View careers",
    close: "Close",
  },
  af: {
    eyebrow: "Loopbane by Oryx",
    title: "Nege rolle is oop in Ongwediva.",
    body: (deadline: string) => `Aansoeke sluit ${deadline}.`,
    action: "Sien loopbane",
    close: "Sluit",
  },
} as const;

/**
 * A homepage-only recruitment notice. A visitor may dismiss it for the
 * current page view; it stores no visitor data and disappears at the CAT cutoff.
 */
export function CareersPopup({ lang }: { lang: Lang }) {
  const [dismissed, setDismissed] = useState(false);
  const closesAt = new Date(recruitment.closesAt).getTime();
  const active = useSyncExternalStore(
    (onStoreChange) => {
      const remaining = closesAt - Date.now();
      if (remaining <= 0) return () => undefined;
      const timer = window.setTimeout(onStoreChange, remaining);
      return () => window.clearTimeout(timer);
    },
    () => Date.now() < closesAt,
    () => false
  );
  const t = copy[lang];
  const deadline = formatRecruitmentDeadline(lang);

  if (!active || dismissed) return null;

  const href = lang === "af" ? "/af/careers" : "/careers";

  return (
    <aside
      aria-label={t.eyebrow}
      className="fixed inset-x-4 bottom-4 z-[90] border border-rule bg-ivory p-5 text-ink shadow-2xl sm:left-auto sm:right-6 sm:max-w-md sm:p-6"
    >
      <button
        type="button"
        className="absolute right-4 top-3 text-sm text-soft underline decoration-rule underline-offset-4 hover:text-ink"
        onClick={() => setDismissed(true)}
      >
        {t.close}
      </button>
      <p className="eyebrow eyebrow--ink pr-12">{t.eyebrow}</p>
      <h2 className="h-sub mt-4 max-w-[22ch]">{t.title}</h2>
      <p className="mt-3 max-w-[42ch] leading-relaxed text-soft">{t.body(deadline)}</p>
      <Link href={href} className="btn mt-6">
        {t.action} <span className="arr" aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
