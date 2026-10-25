import type { Metadata } from "next";
import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { chrome, langFromParams, langPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "404", robots: { index: false, follow: false } };
}

export default async function LangNotFound({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const t = chrome[lang];
  return (
    <section className="shell flex min-h-[70vh] flex-col items-start justify-center py-24">
      <OryxLogo variant="emblem" tone="brand" className="h-24 w-auto" />
      <h1 className="h-display mt-8 max-w-[16ch]">{t.notFoundTitle}</h1>
      <p className="measure mt-5 text-soft">{t.notFoundBody}</p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <Link href={langPath(lang, "/")} className="btn--outline btn">
          {t.backHome}
        </Link>
        <Link href={langPath(lang, "/apply")} className="btn--quiet">
          {lang === "af" ? "Skryf in" : "Apply now"}{" "}
          <span className="arr" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
