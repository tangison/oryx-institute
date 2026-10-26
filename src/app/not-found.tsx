import type { Metadata } from "next";
import { ErrorScreen } from "@/components/site/error-screen";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** The root 404: anything outside a valid locale lands here. Cream
 * paper, the shield, the brief's copy, no MENU button. */
export default function NotFound() {
  return <ErrorScreen status={404} lang="en" />;
}
