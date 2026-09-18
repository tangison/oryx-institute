import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Three families, self-hosted, one request each:
 * - Tinos, the Times-metric serif the wordmark itself is drawn in,
 *   carries display type (400, 700, plus the italic for emphasis).
 * - Geist, the variable sans, carries UI and body text.
 * - A two-glyph Noto Serif SC subset carries 理工 set as live text.
 */
const serif = localFont({
  variable: "--font-serif-loaded",
  src: [
    { path: "../fonts/tinos-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/tinos-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/tinos-latin-700-normal.woff2", weight: "700", style: "normal" },
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
      "Oryx Politechnical Institute | Windhoek, Namibia",
    template: "%s | Oryx Politechnical Institute",
  },
  description: site.description,
  applicationName: site.tradingName,
  authors: [{ name: site.principal.name }],
  keywords: [
    "Oryx Politechnical Institute",
    "Oryx Institute",
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
    title: "Oryx Politechnical Institute",
    description: site.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Politechnical Institute, Windhoek, Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oryx Politechnical Institute",
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
      className={`${serif.variable} ${cjk.variable} ${GeistSans.variable}`}
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
