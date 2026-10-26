import type { Metadata } from "next";
import { ErrorScreen } from "@/components/site/error-screen";
import { langFromParams } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "404", robots: { index: false, follow: false } };
}

/** The localized 404, rendered inside the chromeless [lang] layout:
 * wordmark, shield, the brief's copy, one-line footer. */
export default async function LangNotFound({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  return <ErrorScreen status={404} lang={lang === "zh" ? "zh" : "en"} />;
}
