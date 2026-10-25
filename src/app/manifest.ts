import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.tradingName,
    short_name: "Oryx",
    description: site.description,
    start_url: "/",
    display: "standalone",
    /** The register's own ground and theme: cream canvas, ink chrome. */
    background_color: "#F4EEE4",
    theme_color: "#181713",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
