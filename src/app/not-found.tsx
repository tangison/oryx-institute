import type { Metadata } from "next";
import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-start justify-center py-24">
      <OryxLogo variant="emblem" tone="brand" className="h-24 w-auto" />
      <h1 className="h-display mt-8 max-w-[16ch]">Nothing here. Yet.</h1>
      <p className="measure mt-5 text-soft">
        The page you were looking for is not on the ground. Everything
        else is one click away.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <Link href="/" className="btn--outline btn">
          Back to the home page
        </Link>
        <Link href="/apply" className="btn--quiet">
          Apply now <span className="arr" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
