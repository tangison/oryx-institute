import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";
import { site } from "@/lib/site";

/**
 * Coming soon. The full site is being rebuilt; until it returns, this
 * page is the institute: the mark, the fact, the one mailbox. Zero
 * client JavaScript — every movement is CSS, every line of text is in
 * the server HTML, so the page reads with styles alone and no script.
 */
export const metadata: Metadata = {
  title: "Coming soon | Oryx Institute",
  description:
    "The Oryx Institute site is being rebuilt. The office answers at info@oryxinstitute.org — Windhoek, Namibia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coming soon | Oryx Institute",
    description:
      "The Oryx Institute site is being rebuilt. The office answers at info@oryxinstitute.org — Windhoek, Namibia.",
    url: site.url,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Institute, Windhoek, Namibia",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.legalName,
  alternateName: site.tradingName,
  url: site.url,
  email: site.email,
  areaServed: site.areaServed,
};

export default function ComingSoonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComingSoon />
    </>
  );
}
