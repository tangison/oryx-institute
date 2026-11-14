import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections() {
  return [
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
}

const copy = {
  en: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Oryx Polytechnic Institute collects, uses and protects personal information: the email handoff, what is never stored, and your rights over it.",
      ogTitle: "Privacy Policy | Oryx Polytechnic Institute",
      ogDescription: "How the institute collects, uses and protects personal information.",
    },
    head: {
      eyebrow: "Legal",
      title: "Privacy policy.",
      lede: "Plain language, because the policy behind it is simple: the application message you write is yours until you send it, and ours to keep safe afterwards.",
    },
  },
  af: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Oryx Polytechnic Institute collects, uses and protects personal information: the email handoff, what is never stored, and your rights over it.",
      ogTitle: "Privacy Policy | Oryx Polytechnic Institute",
      ogDescription: "How the institute collects, uses and protects personal information.",
    },
    head: {
      eyebrow: "Legal",
      title: "Privacy policy.",
      lede: "Plain language, because the policy behind it is simple: the application message you write is yours until you send it, and ours to keep safe afterwards.",
    },
    enLedger: { paras: [] as string[] },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/legal/privacy", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/legal/privacy`,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: `${m.title}, Oryx Polytechnic Institute`,
        },
      ],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];

  return (
    <>
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The shared plate above the legalese: the brass scale: the
          law's own instrument, small and centred, so the pages do not
          open into a wall of text. (Image Audit: one shared plate for
          /legal/*.) */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.12" style={{ maxWidth: "18rem" }}>
            <Image
              src="/images/kinfolk/inner/22-legal-scale.jpg"
              alt="A brass balance scale with two pans, centred on cream paper"
              width={1401}
              height={1123}
              priority
              sizes="(min-width: 1024px) 18rem, 65vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="section-lg">
        <div className="shell">
          <div className="article max-w-3xl" data-sc-in data-sc-stagger="50">
            {sections().map((s) => (
              <div key={s.h} className="mt-12 first:mt-0">
                <h2 className="h-sub">{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
            {/* The authoritative English text, printed beneath the
                Afrikaans rendering: on legal pages the English original
                is the text that governs, and the page says so. */}
            {false && (
              <div className="hair-t mt-16 pt-12" lang="en">
                <p className="eyebrow eyebrow--ink">
                  Engelse oorspronklike · The authoritative English text
                </p>
                {sections().map((s) => (
                  <div key={s.h} className="mt-12 first:mt-0">
                    <h2 className="h-sub">{s.h}</h2>
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <p className="meta mt-16">
              {site.legalName} · {site.city}, {site.country}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
