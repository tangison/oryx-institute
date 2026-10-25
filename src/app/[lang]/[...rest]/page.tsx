import { notFound } from "next/navigation";

/** Anything under a locale that matches no page lands here and calls
 * the localized not-found boundary above it. */
export default function LangCatchAll() {
  notFound();
}
