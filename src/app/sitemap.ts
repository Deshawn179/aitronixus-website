import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

/** Single-page experience: one canonical URL. Sections are in-page anchors. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
