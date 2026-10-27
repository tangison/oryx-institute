import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.tradingName,
    short_name: "Oryx",
    description: site.description,
    start_url: "/",
    display: "standalone",
    /** The register's own ground and theme: cream canvas, cream
        chrome. The theme matches the pages' own meta theme-color, so
        the browser paints one colour everywhere. */
    background_color: "#F4EEE4",
    theme_color: "#F4EEE4",
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
      {
        /* Android crops maskable icons into a circle: the maroon
           ground with the ivory shield inside the safe zone. */
        src: "/brand/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
