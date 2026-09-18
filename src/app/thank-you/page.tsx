import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Your application to Oryx Politechnical Institute has been prepared.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero title="Thank you.">
        <p>
          Your message has been prepared in WhatsApp. Press send there and
          the Principal&apos;s office will pick it up. If WhatsApp did not
          open, use the details below.
        </p>
      </PageHero>
      <section className="shell pb-32">
        <div className="flex flex-wrap items-center gap-7">
          <a href={site.whatsapp} className="pill-ghost">
            Open WhatsApp
          </a>
          <a href={`tel:${site.phoneHref}`} className="link-type text-[0.95rem]">
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="link-type text-[0.95rem]">
            {site.email}
          </a>
        </div>
        <p className="mt-10 text-soft">
          While you wait, read{" "}
          <Link href="/programmes" className="link-type">
            how the disciplines run
          </Link>
          .
        </p>
      </section>
    </>
  );
}
