"use client";

import { ErrorScreen, statusFromError } from "@/components/site/error-screen";

/** The root render-error boundary: same screen, English chrome. */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: unknown; statusCode?: unknown };
  reset: () => void;
}) {
  return <ErrorScreen status={statusFromError(error)} lang="en" onReset={reset} />;
}
