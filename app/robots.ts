import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(site.url
      ? { sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`, host: site.url }
      : {}),
  };
}
