import type { Metadata } from "next";
import { Cinzel, Source_Sans_3, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/lib/modal-context";
import { organizationLd, combineLd } from "@/lib/structured-data";

// DESIGN.md §7.1: Display face = Trajan Pro 3 (licensed) or Cinzel (open fallback).
// All-capitals display. Weights 400-700.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// DESIGN.md §7.1: Body and interface family = Source Sans 3.
// Weights 300-700 for full hierarchy.
const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Greek wordmark serif — verified polytonic Greek glyph coverage.
// Used for ὄρυξ rendering where Cinzel lacks the required diacritics.
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// DOMAIN DECISION: oryxinstitute.org is the permanent canonical domain.
// The Vercel subdomain (oryx-institute.vercel.app) serves as the deployment host;
// all canonical URLs, metadata, CSP origins, and sitemap entries reference oryxinstitute.org.
// When DNS is configured: verify TLS, redirects, and that Vercel serves the custom domain.
// Vercel preview deploys (*.vercel.app) differ from the canonical domain; this is expected.
export const metadata: Metadata = {
  metadataBase: new URL("https://oryxinstitute.org"),
  title: {
    default: "Oryx Institute — Vocational Training in Windhoek, Namibia",
    template: "%s — Oryx Institute",
  },
  description:
    "A multidisciplinary vocational education and training institution being established in Windhoek. Planned schools, programmes, recognition of prior learning, and work-integrated learning.",
  keywords: [
    "Oryx Institute",
    "vocational training Namibia",
    "Windhoek training institution",
    "RPL Namibia",
    "work-integrated learning Namibia",
    "skills training Windhoek",
  ],
  authors: [{ name: "Oryx Institute", url: "https://oryxinstitute.org" }],
  creator: "Oryx Institute",
  publisher: "Oryx Institute",
  icons: {
    icon: [
      { url: "/oryx-shield.png", type: "image/png" },
    ],
    apple: [{ url: "/oryx-shield.png", type: "image/png" }],
  },
  openGraph: {
    title: "Oryx Institute — Vocational Training in Windhoek, Namibia",
    description:
      "A multidisciplinary vocational education and training institution being established in Windhoek. Planned schools, programmes, RPL, and work-integrated learning.",
    url: "https://oryxinstitute.org",
    siteName: "Oryx Institute",
    locale: "en_NA",
    type: "website",
    images: [{ url: "/hero/oryx-loop-poster.jpg", width: 1920, height: 1080, alt: "Oryx Institute — vocational training in Windhoek, Namibia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oryx Institute — Vocational Training in Windhoek, Namibia",
    description:
      "A multidisciplinary vocational education and training institution being established in Windhoek.",
    images: ["/hero/oryx-loop-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://oryxinstitute.org",
  },
  other: {
    // Vercel web design guidelines: theme-color must match page background
    "theme-color": "#FFF8EF",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${sourceSans3.variable} ${notoSerif.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* JSON-LD: Organization schema on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: combineLd([organizationLd()]) }}
        />
        <ModalProvider>{children}</ModalProvider>
        <Toaster />
      </body>
    </html>
  );
}
