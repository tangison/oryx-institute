import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site, status } from "@/lib/site";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "Oryx Institute: the oryx, the characters 理工, the Principal's office in Windhoek, the consulting practice, and the temper the institute teaches by.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About the Institute | Oryx Institute",
    description:
      "The oryx, the characters 理工, the Principal's office in Windhoek, and the temper the institute teaches by.",
    images: [
      {
        url: "/brand/og/about.png",
        width: 1200,
        height: 630,
        alt: "About Oryx Institute",
      },
    ],
  },
};

/** The 理工 paragraph, drawn verbatim from Bulletin No. 1, the
    institute's own published explanation of the word. */
const liGongEssay = insights[0].body[0];

export default function AboutPage() {
  return (
    <>
      <PageHead title="Built for hard ground.">
        <p>
          The institute is named for the oryx: Namibia&apos;s own antelope,
          straight-horned, unhurried and impossible to starve out of dry
          country. The wordmark adds{" "}
          <span className="wordmark-cjk">理工</span>, science and
          engineering, set in the logo exactly where the two belong.
        </p>
      </PageHead>

      {/* The name and the 理工 paragraph */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="grid gap-10">
            <div data-reveal>
              <p className="eyebrow eyebrow--ink">The name</p>
              <p className="measure mt-5 text-soft">
                Oryx Institute. In the wordmark the middle word stands in
                Chinese:{" "}
                <span className="wordmark-cjk">理工</span> (li gong), the
                characters for science and engineering. The seal above
                them is the maroon shield, and the whole lockup sets in a
                classic serif, the way it is printed on the institute&apos;s
                letterhead.
              </p>
            </div>

            <div data-reveal>
              <p className="eyebrow eyebrow--ink">What 理工 stands for</p>
              <p className="measure mt-5 body-lg">{liGongEssay}</p>
              <Link href="/resources#bulletin-what-a-polytechnic-is" className="btn--quiet mt-5">
                Read Bulletin No. 1{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>

            <div data-reveal>
              <p className="eyebrow eyebrow--ink">The practice</p>
              <p className="measure mt-5 text-soft">
                Today the institute works as a consultancy. The
                Owner&apos;s Desk runs business counselling from the
                Principal&apos;s office; market research and development
                work is taken on per engagement; Rapid Response Training
                brings teams up to standard. The schools are phased in
                behind the practice, in order, as accreditation
                progresses, not before.
              </p>
            </div>

            <div data-reveal>
              <p className="eyebrow eyebrow--ink">The temper</p>
              <p className="measure mt-5 text-soft">
                The institute&apos;s own flyer says it in three words:
                looks harmless, isn&apos;t. Graduates are measured the same
                way the certificate measures them, on innovation and
                applied problem-solving. Quiet work, decisive finishes.
              </p>
            </div>

            <div data-reveal>
              <p className="eyebrow eyebrow--ink">The office</p>
              <p className="measure mt-5 text-soft">
                The institute works from {site.city}, {site.country}, and
                does not operate public premises yet, so no street address
                is printed. The Principal, {site.principal.name}, reads
                every application personally. Reach the office by email at{" "}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>

          {/* The Principal — the shield holds the portrait slot until
              the Windhoek photoshoot lands. */}
          <div className="quiet-card" data-reveal>
            {/* TODO founder: Principal portrait — window light from the
                side, dark top, editorial register. Until then the
                maroon shield holds the slot at large size on ivory. */}
            <div className="grid place-items-center border-b border-rule bg-white p-14">
              <OryxLogo variant="emblem" tone="brand" className="h-52 w-auto" />
            </div>
            <div className="p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{site.principal.role}</p>
              <h2 className="h-sub mt-3">{site.principal.name}</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                Reads every application personally. Holds the standard the
                certificate prints: excellence in innovation and applied
                problem-solving.
              </p>
              <p className="meta mt-6">
                Portrait to come · Windhoek
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where the institute stands */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow">Where the institute stands</p>
            <h2 className="h-section mt-5 max-w-[22ch]" data-reveal>
              Prelaunch, and honest about it.
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              {status.accreditation} Legal name: {site.legalName}. The
              institute is being established in Windhoek; what runs today
              is what works today.
            </p>

            <div className="ledger mt-12">
              {status.liveNow.map((item) => (
                <div className="ledger-row" key={item.name} data-reveal>
                  <p className="ledger-date">Live now</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
              {status.inDevelopment.map((item) => (
                <div className="ledger-row" key={item.name} data-reveal>
                  <p className="ledger-date">In development</p>
                  <div>
                    <h3 className="h-sub">{item.name}</h3>
                    <p className="mt-2 max-w-[60ch] text-soft">{item.line}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel mt-12 p-8 md:p-10" data-reveal>
              <p className="eyebrow eyebrow--ink">Partnerships</p>
              <p className="measure mt-4 text-[1.0rem] leading-relaxed">
                {status.partnerships} Write to the office at{" "}
                <a href={`mailto:${site.email}`} className="link-type">
                  {site.email}
                </a>{" "}
                and say what you have in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">Legal</p>
            <div className="measure mt-6 grid gap-5 text-[0.92rem] leading-relaxed text-soft">
              <p>
                {site.legalName} is registered with the Business and
                Intellectual Property Authority (BIPA), Namibia.{" "}
                {/* TODO founder: print the BIPA registration number when
                    the certificate is in hand. */}
                The registration number prints here when the certificate
                is in hand.
              </p>
              <p>
                {status.accreditation}
              </p>
              <p>
                The imagery on this site is illustrative, set in the
                institute&apos;s own register, and will be replaced by real
                photography from Windhoek as it is shot. It is not a
                depiction of a campus: the institute has no premises to
                photograph yet, and it does not borrow one. Images carry
                no captions and make no claims of their own.
              </p>
              <p className="flex flex-wrap gap-x-8 gap-y-2">
                <Link href="/privacy" className="link-type">Privacy</Link>
                <Link href="/terms" className="link-type">Terms</Link>
                <a href={`mailto:${site.email}`} className="link-type">{site.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
