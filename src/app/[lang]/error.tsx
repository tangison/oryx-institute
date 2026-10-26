"use client";

import { ErrorScreen, statusFromError } from "@/components/site/error-screen";

/**
 * The render-error boundary. Next.js hands us the thrown error; the
 * status map picks the variant when the error carries one, and the
 * copy falls back to the 500 screen. Rendered inside the chromeless
 * [lang] layout, so it carries no MENU button.
 */
export default function LangError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: unknown; statusCode?: unknown };
  reset: () => void;
}) {
  const status = statusFromError(error);
  const lang =
    typeof window !== "undefined" &&
    document.documentElement.lang.startsWith("zh")
      ? "zh"
      : "en";
  return <ErrorScreen status={status} lang={lang} onReset={reset} />;
}
