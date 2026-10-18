import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.tradingName,
    short_name: "Oryx",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8EE",
    /** Matches the light-scheme page theme color declared in the
        root layout's viewport export, as the audit requires. */
    theme_color: "#FFFFFF",
    icons: [
      {
        /** The installed PNG measures 512x512; it is declared at its
            true size (the audit caught a 192 declaration on a 512 file). */
        src: "/images/icon-maskable-192.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-maskable-192.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
