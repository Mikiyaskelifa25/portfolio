import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";

/**
 * A sitemap needs absolute URLs, so it is only generated once the production
 * domain is set in `data/portfolio.ts` (`site.url`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];

  const base = site.url.replace(/\/$/, "");

  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
