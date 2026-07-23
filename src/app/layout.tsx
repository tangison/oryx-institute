import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://oryxinstitute.na"),
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
  authors: [{ name: "Oryx Institute", url: "https://oryxinstitute.na" }],
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
    url: "https://oryxinstitute.na",
    siteName: "Oryx Institute",
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oryx Institute — Vocational Training in Windhoek, Namibia",
    description:
      "A multidisciplinary vocational education and training institution being established in Windhoek.",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://oryxinstitute.na",
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
        className={`${cinzel.variable} ${sourceSans3.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
