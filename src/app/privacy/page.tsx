import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Oryx Polytechnic Institute collects, uses and protects personal information: the email handoff, what is never stored, and your rights over it.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Oryx Polytechnic Institute",
    description:
      "How the institute collects, uses and protects personal information.",
    images: [
      {
        url: "/brand/og/default.png",
        width: 1200,
        height: 630,
        alt: "Privacy policy, Oryx Polytechnic Institute",
      },
    ],
  },
};

const sections = [
  {
    h: "Who we are",
    body: [
      `This website is operated by ${site.legalName}, working from ${site.city}, ${site.country}. For any privacy question, write to ${site.email}.`,
    ],
  },
  {
    h: "What we collect",
    body: [
      "The application composer on this site does not store anything. When you press send, the message you have written opens in your own mail client addressed to the office, and from that moment it exists only in the conversation you started.",
      "If you contact us by email instead, we keep what you choose to give us: your name, your contact details, the field of interest you name, and the content of your message.",
    ],
  },
  {
    h: "Why we collect it",
    body: [
      "To read and answer your application, to arrange what follows it, and to keep the records an institute in Namibia is expected to keep. We do not sell, rent or trade personal information to anyone, and we do not run advertising or third-party analytics trackers on this site.",
    ],
  },
  {
    h: "Who we share it with",
    body: [
      "Nobody outside the Principal's office, unless you ask us to or the law requires it. This site sets no advertising cookies and builds no profiles.",
    ],
  },
  {
    h: "How long we keep it",
    body: [
      "Applications are kept while the conversation they opened is alive, and for as long as the institute's own record-keeping requires after that. Messages that do not lead anywhere are deleted once the exchange has run its course.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You may ask what personal information we hold about you, ask us to correct it, or ask us to delete it where no obligation requires us to keep it. Write to the email address above and a reasonable request will be acted on.",
    ],
  },
  {
    h: "Security",
    body: [
      "We keep personal information on systems we control and limit access to the people who need it. No method of storage is perfectly secure, but your information is treated with the care the law and the institute's own standards demand.",
    ],
  },
  {
    h: "Changes to this policy",
    body: [
      "If we change this policy, the updated version is published on this page. The policy applies from the date it is published.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHead eyebrow="Legal" title="Privacy policy.">
        <p>
          Plain language, because the policy behind it is simple: the
          application message you write is yours until you send it, and
          ours to keep safe afterwards.
        </p>
      </PageHead>

      <section className="section-lg">
        <div className="shell">
          <div className="article max-w-3xl">
            {sections.map((s) => (
              <div key={s.h} className="mt-12 first:mt-0" data-reveal>
                <h2 className="h-sub">{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
            <p className="meta mt-16">
              {site.legalName} · {site.city}, {site.country}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
