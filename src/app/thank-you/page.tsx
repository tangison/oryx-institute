import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Your application to Oryx Institute has been prepared.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero title="Thank you.">
        <p>
          Your application has been prepared in your own mail client,
          addressed to the office. Press send there and the
          Principal&apos;s office will pick it up. If the client did not
          open, write to the address below.
        </p>
      </PageHero>
      <section className="shell pt-16">
        <HorizontalScroll label="What happens next">
          {[
            {
              n: "01",
              t: "Send the email",
              b: "It is prepared and addressed to the office already. Press send in your mail client.",
              c: "tint-blush",
            },
            {
              n: "02",
              t: "Watch your inbox",
              b: "The office replies personally, usually within the week.",
              c: "tint-warm",
            },
            {
              n: "03",
              t: "Read meanwhile",
              b: "The Directory is free: four crash courses and seven templates, written to be used.",
              c: "tint-sand",
            },
          ].map((s) => (
            <article key={s.n} className={`hs-card hover-lift ${s.c}`}>
              <p className="display-hero text-accent/90" aria-hidden>{s.n}</p>
              <p className="mt-3 text-[1.1rem] font-semibold text-ink">{s.t}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{s.b}</p>
            </article>
          ))}
        </HorizontalScroll>
      </section>

      <section className="shell pb-32">
        <div className="flex flex-wrap items-center gap-7">
          <a href={`mailto:${site.email}`} className="pill-ghost">
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
