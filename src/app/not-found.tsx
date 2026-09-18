import type { Metadata } from "next";
import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-start justify-center py-32">
      <OryxLogo variant="emblem" tone="brand" className="h-24 w-auto" />
      <h1 className="display-hero mt-8 text-ink">
        Nothing here. <span className="em-serif text-accent">Yet.</span>
      </h1>
      <p className="measure mt-5 text-soft">
        The page you were looking for is not on the ground. Everything
        else is one click away.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <Link href="/" className="pill-ghost">
          Back to the home page
        </Link>
        <Link href="/apply" className="link-type text-[0.95rem]">
          Apply now
        </Link>
      </div>
    </section>
  );
}
