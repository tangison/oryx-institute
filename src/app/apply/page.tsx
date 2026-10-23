import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { ApplyForm } from "@/components/site/apply-form";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply to Oryx Institute",
  description:
    "Apply to Oryx Institute, or book the practice: counselling, business administration, IT, market research, Rapid Response Training. One message.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply | Oryx Institute",
    description:
      "One message to the Principal's office in Windhoek starts your application.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Apply to Oryx Institute",
      },
    ],
  },
};

export default function ApplyPage() {
  return (
    <>
      <PageHero title="Apply" accent="now.">
        <p>
          There is no portal and no queue. Write to the Principal&apos;s
          office directly, and the application starts with your first
          message. The practice books through the same desk:
          counselling, business administration, IT, market research and
          development, Rapid Response Training.
        </p>
      </PageHero>

      {/* The application path, carried horizontally. */}
      <section className="shell pt-16">
        <HorizontalScroll label="How the application runs">
          {[
            {
              n: "01",
              t: "Write one message",
              b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares it.",
              c: "tint-blush",
            },
            {
              n: "02",
              t: "The office replies",
              b: "The Principal's office reads every message and answers personally, usually within the week.",
              c: "tint-warm",
            },
            {
              n: "03",
              t: "Talk, then decide",
              b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides agree.",
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

      <section className="chapter shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper p-6 sm:p-10">
          <h2 className="display-section text-ink">The application message</h2>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
            Fill it in and it opens as an email addressed to{" "}
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            . Nothing is stored on this site; nothing is sent until you
            press send in your own mail client.
          </p>
          <div className="mt-10">
            <ApplyForm />
          </div>
        </div>

        <aside className="grid gap-8">
          <div className="keyline">
            <p className="label-caps text-soft">What to include</p>
            <ul className="mt-4 grid gap-2 text-[0.98rem] leading-relaxed text-soft">
              <li>Your name, as you sign it.</li>
              <li>A phone number or email address for the reply.</li>
              <li>The field of interest, or &ldquo;not sure yet&rdquo;.</li>
              <li>Where you are coming from, if you want it read.</li>
            </ul>
          </div>

          <div className="keyline">
            <p className="label-caps text-soft">Where it goes</p>
            <address className="mt-4 not-italic text-[0.98rem] leading-relaxed text-soft">
              {site.principal.name}, {site.principal.role}
              <br />
              {site.city}, {site.country} — by appointment
              <br />
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </address>
          </div>

          <div className="rounded-[var(--r-card)] tint-warm p-8">
            <p className="display-statement text-ink">
              Looks harmless.{" "}
              <span className="em-serif text-accent">Isn&apos;t.</span>
            </p>
          </div>

          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-8" data-reveal>
            <Image
              src="/images/register/cutouts/cutout_16.webp"
              alt="A maroon wax seal, the kind the institute's certificates carry"
              width={274}
              height={184}
              sizes="320px"
              className="h-auto w-full max-w-[280px] rounded-[calc(var(--r-card)-0.5rem)] object-cover"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
