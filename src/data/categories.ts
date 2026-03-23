/**
 * Canonical browseable categories. Each tag maps to `/category/<tag>`.
 * Includes context tags used by specific guides (e.g. AWLS: urban, wilderness, emergency).
 */
export const CATEGORY_TAGS = [
  "building",
  "containers",
  "cooking",
  "cordage",
  "emergency",
  "fire",
  "firestarter",
  "fishing",
  "food",
  "foraging",
  "hunting",
  "improvisation",
  "knots",
  "knife",
  "maintenance",
  "medical",
  "navigation",
  "preservation",
  "repair",
  "shelter",
  "signaling",
  "tools",
  "tracking",
  "trapping",
  "urban",
  "water",
  "wilderness",
] as const;

export type CategoryTag = (typeof CATEGORY_TAGS)[number];

export function isCategoryTag(value: string): value is CategoryTag {
  return (CATEGORY_TAGS as readonly string[]).includes(value);
}
