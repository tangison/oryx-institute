import type { Metadata } from "next";
import { PageHead } from "@/components/site/page-head";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

function sections() {
  return [
        {
          h: "What this website is",
          body: [
            `This website presents ${site.legalName} and invites applications by enquiry. It is operated from ${site.city}, ${site.country}. It takes no payments, creates no accounts, and stores no messages: the application composer prepares an email in your own mail client, where the conversation continues.`,
          ],
        },
        {
          h: "What an enquiry means",
          body: [
            "Sending the application message asks the Principal's office to read it and reply. It does not create a place, a promise of a place, or any obligation on either side. Admission, programme placement and study arrangements are confirmed only in the written reply from the institute.",
          ],
        },
        {
          h: "The content on these pages",
          body: [
            "The site describes the institute's disciplines, brand and printed matter as they are published by the institute itself. The disciplines describe direction, not a catalogue of offerings: programme and course specifics are confirmed at the point of application, and the certificate is issued on completion.",
          ],
        },
        {
          h: "Intellectual property",
          body: [
            "The wordmark, the shield emblem, the print kit imagery and the text of this website belong to the institute. You may quote them with attribution and link to this website; you may not republish them as your own or use them to imply any association with the institute.",
          ],
        },
        {
          h: "External channels",
          body: [
            "This site hands the application to your own mail client. Once your message leaves this site, it travels under the terms of the service you chose to use, not under these terms.",
          ],
        },
        {
          h: "Liability",
          body: [
            "The site is offered as it stands. The institute is not liable for decisions made on the strength of this site alone: the authoritative channel for anything that matters is the written reply from the Principal's office.",
          ],
        },
        {
          h: "Changes",
          body: [
            "These terms may be updated as the institute grows. The current version is always the one published on this page.",
          ],
        },
      ];
}

const copy = {
  en: {
    meta: {
      title: "Terms of Service",
      description:
        "The terms on which this website is offered: what the website does, what an enquiry means, what the certificates claim, and what the institute does not promise.",
      ogTitle: "Terms of Service | Oryx Polytechnic Institute",
      ogDescription: "What the website does, what an application means, and what it does not promise.",
    },
    head: {
      eyebrow: "Legal",
      title: "Terms of service.",
      lede: "Short terms, because the website does little: it shows the institute and carries one message at a time.",
    },
  },
  af: {
    meta: {
      title: "Terms of Service",
      description:
        "The terms on which this website is offered: what the website does, what an enquiry means, what the certificates claim, and what the institute does not promise.",
      ogTitle: "Terms of Service | Oryx Polytechnic Institute",
      ogDescription: "What the website does, what an application means, and what it does not promise.",
    },
    head: {
      eyebrow: "Legal",
      title: "Terms of service.",
      lede: "Short terms, because the website does little: it shows the institute and carries one message at a time.",
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
    alternates: alternates(lang, "/legal/terms", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/legal/terms`,
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

export default async function TermsPage({
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
