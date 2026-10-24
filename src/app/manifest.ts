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
    theme_color: "#FFF8EE",
    icons: [
      /** True-size PNGs, one file per declared size (the audit caught
          a 512 file declared as 192). 192 for browser UI, 512 for
          installs; both also declared maskable with safe padding. */
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
