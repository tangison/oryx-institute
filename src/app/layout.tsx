import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteMotion } from "@/components/site/reveal";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * The approved master-package type system, self-hosted, latin subsets:
 * - Radley (Regular + Italic), the brand serif, carries display type.
 * - Inter (Regular, Medium, SemiBold), the body face, carries UI and
 *   body text.
 * - A two-glyph Noto Serif SC subset carries 理工 set as live text (the
 *   wordmark itself is drawn as vector paths, no font involved).
 * The two critical families are preloaded; the CJK subset loads on
 * demand (it renders on a handful of pages).
 */
const serif = localFont({
  variable: "--font-serif-loaded",
  src: [
    { path: "../fonts/radley-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/radley-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  preload: true,
});

const sans = localFont({
  variable: "--font-sans-loaded",
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  preload: true,
});

const cjk = localFont({
  variable: "--font-cjk-loaded",
  src: [{ path: "../fonts/noto-serif-sc-li-gong.woff2", weight: "400" }],
  display: "swap",
  /* A two-glyph subset under 1KB: preloading costs nothing and keeps
     the 理工 characters from flashing in their fallback serif. */
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Oryx Institute | A New Polytechnic for Namibia",
    template: "%s | Oryx Institute",
  },
  description: site.description,
  applicationName: site.tradingName,
  authors: [{ name: site.principal.name }],
  keywords: [
    "Oryx Institute",
    "Oryx Polytechnic Institute",
    "polytechnic Namibia",
    "Windhoek crash courses",
    "business administration Windhoek",
    "IT courses Windhoek",
    "market research Namibia",
    "理工 Namibia",
  ],
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.tradingName,
    locale: "en_NA",
    url: site.url,
    title: "Oryx Institute",
    description: site.description,
    images: [
      {
        url: "/brand/og/default.png",
        width: 1200,
        height: 630,
        alt: "Oryx Institute — a new polytechnic for Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oryx Institute",
    description: site.description,
    images: ["/brand/og/default.png"],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${site.url}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4EEE4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${cjk.variable}`}
    >
      <body className="antialiased bg-paper text-ink min-h-screen flex flex-col">
        {/* The one motion module: GSAP ScrollTrigger, code-split, loaded
            only for visitors who have not asked for reduced motion. */}
        <SiteMotion />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="w-full max-w-full overflow-x-clip flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
