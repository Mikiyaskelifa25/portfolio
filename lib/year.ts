import { cacheLife } from "next/cache";

/**
 * Reading `new Date()` during prerender is treated as an unstable value by
 * Cache Components. Wrapping the read in `"use cache"` captures it once, at
 * build time, into the static shell — which is exactly what a copyright year
 * should do.
 */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
