import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * The self-hosted type system uses Radley for display text and Inter for
 * body and interface text. Both published languages use the same Latin
 * families, which keeps the English-first wordmark consistent.
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oryxinstitute.org"),
  title: {
    default: "Oryx Institute | A New Polytechnic for Namibia",
    template: "%s | Oryx Institute",
  },
  /* Icons sit at the root so every route carries them, including the
     bare Corner Spa frame route, which renders outside the (site)
     chrome and would otherwise ship no favicon at all. */
  icons: {
    icon: [
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      className={`${serif.variable} ${sans.variable}`}
    >
      <body className="antialiased bg-paper text-ink min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
