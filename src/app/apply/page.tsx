import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { ApplyForm } from "@/components/site/apply-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply | Oryx Institute",
    description:
      "One message to the Principal's office in Windhoek starts your application.",
    images: [
      {
        url: "/brand/og/apply.png",
        width: 1200,
        height: 630,
        alt: "Apply to Oryx Institute",
      },
    ],
  },
};

const steps = [
  {
    n: "01",
    t: "Write one message",
    b: "Name, a contact for the reply, and the field you are interested in. The composer below prepares it.",
  },
  {
    n: "02",
    t: "The office replies",
    b: "The Principal's office reads every message and answers personally, usually within the week.",
  },
  {
    n: "03",
    t: "Talk, then decide",
    b: "A conversation by email or an appointment in Windhoek. Nothing is committed until both sides agree.",
  },
] as const;

export default function ApplyPage() {
  return (
    <>
      <PageHead eyebrow="Apply" title="Apply now.">
        <p>
          There is no portal and no queue. Write to the Principal&apos;s
          office directly, and the application starts with your first
          message. The teaching is crash courses and short courses in
          business administration and IT and related fields. The practice
          books through the same desk: the Owner&apos;s Desk, market
          research and development, Rapid Response Training.
        </p>
      </PageHead>

      {/* How the application runs — three steps, hairline ledger */}
      <section className="section">
        <div className="shell">
          <div className="ledger">
            {steps.map((s) => (
              <div className="ledger-row" key={s.n} data-reveal>
                <p className="ledger-date">{s.n}</p>
                <div>
                  <h2 className="h-sub">{s.t}</h2>
                  <p className="measure mt-3 text-soft">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The composer */}
      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="panel p-6 sm:p-10">
            <h2 className="h-sub">The application message</h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-soft">
              Fill it in and it opens as an email addressed to{" "}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
              . Nothing is stored on this site; nothing is sent until you
              press send in your own mail client.
            </p>
            <div className="mt-8">
              <ApplyForm />
            </div>
          </div>

          <div className="grid gap-8">
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">Zero data collection</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                The site runs no analytics, no cookies and no accounts.
                The application exists the moment your email client opens
                it — before that, it does not exist at all.
              </p>
            </div>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">Who reads it</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                {site.principal.name}, {site.principal.role}, reads every
                application personally. The office answers every enquiry
                by email, and visits are arranged by appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
