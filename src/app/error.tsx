"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-start justify-center py-24">
      <h1 className="h-display max-w-[16ch]">Something broke. Quietly.</h1>
      <p className="measure mt-5 text-soft">
        A page on our side failed to load. Try again, and if it keeps
        failing, tell the office directly.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <button type="button" onClick={reset} className="btn">
          Try again
        </button>
        <Link href="/" className="btn--quiet">
          Back to the home page{" "}
          <span className="arr" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
