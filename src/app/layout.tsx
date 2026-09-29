import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * The approved master-package type system, self-hosted, one request per
 * family:
 * - Radley (Regular + Italic), the brand serif named in the master
 *   package and used by the published homepage, carries display type.
 * - Inter (Regular, Medium, SemiBold, Bold), the package's body face,
 *   carries UI and body text.
 * - A two-glyph Noto Serif SC subset carries 理工 set as live text (the
 *   wordmark itself is drawn as vector paths, no font involved).
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

const cjk = localFont({
  variable: "--font-cjk-loaded",
  src: [{ path: "../fonts/noto-serif-sc-li-gong.woff2", weight: "400" }],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Oryx Institute | Windhoek, Namibia",
    template: "%s | Oryx Institute",
  },
  description: site.description,
  applicationName: site.tradingName,
  authors: [{ name: site.principal.name }],
  keywords: [
    "Oryx Institute",
    "Oryx Polytechnic Institute",
    "polytechnic Namibia",
    "engineering Windhoek",
    "applied problem-solving",
    "理工 Namibia",
  ],
  openGraph: {
    type: "website",
    siteName: site.tradingName,
    locale: "en_NA",
    url: site.url,
    title: "Oryx Institute",
    description: site.description,
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
    title: "Oryx Institute",
    description: site.description,
    images: ["/images/og-default.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#181713" },
  ],
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
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${cjk.variable}`}
    >
      <body className="antialiased bg-paper text-ink">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="w-full max-w-full overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
