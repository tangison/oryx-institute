"use client";

import { ErrorScreen, statusFromError } from "@/components/site/error-screen";

/**
 * The last-resort boundary: when the root layout itself throws, this
 * component owns the whole document, so it renders its own html and
 * body around the shared error screen.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: unknown; statusCode?: unknown };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        {/* This boundary owns the whole document; without a title here
            the tab falls back to Next's default error string. */}
        <title>Something broke at the printer. | Oryx Institute</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          background: "#F4EEE4",
          color: "#1A1410",
          fontFamily: "Georgia, serif",
        }}
      >
        <ErrorScreen status={statusFromError(error)} lang="en" onReset={reset} />
      </body>
    </html>
  );
}
