import { notFound } from "next/navigation";
import { LANGS, langFromParams, type Lang } from "@/lib/i18n";

/**
 * The locale segment. It validates the language and renders nothing
 * itself: the chrome lives one level down in the (site) group, so the
 * error boundaries beside this file render without a MENU button, per
 * the brief — error pages carry the wordmark and one line of footer,
 * nothing else.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
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
  return <>{children}</>;
}
