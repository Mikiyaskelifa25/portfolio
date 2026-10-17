export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[];

/**
 * Tiny class-name joiner. Keeps the bundle free of extra dependencies while
 * giving us conditional styling in a readable way.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}

/**
 * A link is only rendered as a real anchor when it actually points somewhere.
 * Empty strings (the documented placeholders in `data/portfolio.ts`) are treated
 * as "not configured yet" so we never ship a dead button.
 */
export function isConfigured(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Normalises a bare domain / handle into an absolute https URL. */
export function normalizeUrl(value: string): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("mailto:")) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}
