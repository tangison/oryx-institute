"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-start justify-center py-32">
      <h1 className="display-hero text-ink">
        Something broke. <span className="em-serif text-accent">Quietly.</span>
      </h1>
      <p className="measure mt-5 text-soft">
        A page on our side failed to load. Try again, and if it keeps
        failing, tell the office directly.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <button type="button" onClick={reset} className="pill-ghost">
          Try again
        </button>
        <Link href="/" className="link-type text-[0.95rem]">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
