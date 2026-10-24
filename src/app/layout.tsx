import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * The coming-soon layout: the approved type system, self-hosted, one
 * request per family, and nothing else — no providers, no chrome, no
 * client script. Radley carries display, Inter carries text.
 */
const serif = localFont({
  variable: "--font-serif-loaded",
  src: [
    { path: "../fonts/radley-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/radley-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const sans = localFont({
  variable: "--font-sans-loaded",
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Coming soon | Oryx Institute",
    template: "%s | Oryx Institute",
  },
  description:
    "The Oryx Institute site is being rebuilt. The office answers at info@oryxinstitute.org — Windhoek, Namibia.",
  applicationName: site.tradingName,
  authors: [{ name: site.principal.name }],
  openGraph: {
    type: "website",
    siteName: site.tradingName,
    locale: "en_NA",
    url: site.url,
    title: "Coming soon | Oryx Institute",
    description:
      "The Oryx Institute site is being rebuilt. The office answers at info@oryxinstitute.org — Windhoek, Namibia.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Institute, Windhoek, Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming soon | Oryx Institute",
    description:
      "The Oryx Institute site is being rebuilt. The office answers at info@oryxinstitute.org — Windhoek, Namibia.",
    images: ["/images/og-default.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFF8EE" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <body className="antialiased bg-paper text-ink">{children}</body>
    </html>
  );
}
