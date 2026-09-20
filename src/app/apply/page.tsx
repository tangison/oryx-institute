import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ApplyForm } from "@/components/site/apply-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to Oryx Politechnical Institute. One message to the Principal's office in Windhoek: your name, your contact and your field of interest.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply | Oryx Politechnical Institute",
    description:
      "One message to the Principal's office in Windhoek starts your application.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "Apply to Oryx Politechnical Institute",
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
          message.
        </p>
      </PageHero>

      <section className="chapter shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="rounded-[var(--r-card)] border border-rule bg-paper p-6 sm:p-10">
          <h2 className="display-section text-ink">The application message</h2>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
            Fill it in and send it on WhatsApp to {site.phoneDisplay}, or
            take the details and write to{" "}
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            . Nothing is stored on this site.
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
              {site.address}
              <br />
              <a href={`tel:${site.phoneHref}`} className="link-type">
                {site.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </address>
          </div>

          <div className="rounded-[var(--r-card)] bg-paper-2 p-8">
            <p className="display-statement text-ink">
              Looks harmless.{" "}
              <span className="em-serif text-accent">Isn&apos;t.</span>
            </p>
            <p className="photo-caption mt-4">
              The flyer&apos;s line. It reads as a promise about the
              education, not a warning about the animal.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
