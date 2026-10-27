import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  metadataBase: new URL("https://www.oryxinstitute.org"),
  title: {
    default: "Oryx Institute | A New Polytechnic for Namibia",
    template: "%s | Oryx Institute",
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
        {children}
      </body>
    </html>
  );
}
