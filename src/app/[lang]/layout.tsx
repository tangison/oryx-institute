import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SCMotion } from "@/components/site/sc-motion";
import { LangSync } from "@/components/site/lang-sync";
import { LANGS, chrome, langFromParams, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { siteAf } from "@/lib/site-af";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const name = af ? siteAf.tradingName : site.tradingName;
  const description = af ? siteAf.description : site.description;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: af
        ? "Oryx Instituut | Nuwe politegniek vir Namibië"
        : "Oryx Institute | A New Polytechnic for Namibia",
      template: af ? `%s | ${name}` : "%s | Oryx Institute",
    },
    description,
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
      siteName: name,
      locale: af ? "af_NA" : "en_NA",
      url: site.url,
      title: name,
      description,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: af
            ? "Oryx Instituut: 'n nuwe politegniek vir Namibië"
            : "Oryx Institute: a new polytechnic for Namibia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: ["/brand/og/default.png"],
    },
    alternates: {
      canonical: lang === "af" ? "/af" : "/",
      types: {
        "application/rss+xml": `${site.url}/feed.xml`,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = langFromParams(await params);
  if (!LANGS.includes(lang as Lang)) notFound();
  const t = chrome[lang];

  return (
    <>
      {/* The root layout carries lang="en" statically; AF routes set the
          real language before first paint with this two-byte script. */}
      {lang === "af" ? (
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="af"` }}
        />
      ) : null}
      <SCMotion />
      <LangSync lang={lang} />
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <SiteHeader lang={lang} />
      <main id="main" className="w-full max-w-full overflow-x-clip flex-1">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
