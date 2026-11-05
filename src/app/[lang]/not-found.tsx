import type { Metadata } from "next";
import { ErrorScreen } from "@/components/site/error-screen";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "404", robots: { index: false, follow: false } };
}

/** The localized 404, rendered inside the chromeless [lang] layout:
 * wordmark, shield, the brief's copy, one-line footer. */
export default async function LangNotFound() {
  /* not-found boundaries receive no route params, so the locale comes
     from the hint the edge proxy stamps on every request. */
  const h = await headers();
  const lang = h.get("x-oryx-lang") === "zh" ? "zh" : "en";
  return <ErrorScreen status={404} lang={lang} />;
}
