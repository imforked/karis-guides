import type { CategoryTag } from "./categories";

export type Guide = {
  id: string;
  title: string;
  summary: string;
  /** File name under `public/guides/` */
  fileName: string;
  tags: readonly CategoryTag[];
};

/**
 * Registry of PDF guides and their category tags.
 * Paths resolve to static files in `public/guides/`.
 */
export const GUIDES: readonly Guide[] = [
  {
    id: "awls",
    title: "AWLS — Advanced Wilderness Life Support",
    summary: "Advanced wilderness life support reference (PDF).",
    fileName: "AWLS - Advanced Wilderness Life Support.pdf",
    tags: [
      "water",
      "fire",
      "shelter",
      "food",
      "medical",
      "navigation",
      "signaling",
      "tools",
      "repair",
      "improvisation",
      "urban",
      "wilderness",
      "emergency",
    ],
  },
  {
    id: "fm21-76",
    title: "FM 21-76 — Survival Manual",
    summary: "U.S. Army survival field manual (PDF).",
    fileName: "FM21-76_SurvivalManual.pdf",
    tags: [
      "water",
      "fire",
      "shelter",
      "food",
      "medical",
      "navigation",
      "signaling",
      "tools",
      "knife",
      "cordage",
      "containers",
      "firestarter",
      "repair",
      "maintenance",
      "improvisation",
      "knots",
      "building",
      "cooking",
      "preservation",
      "foraging",
      "hunting",
      "fishing",
      "tracking",
      "trapping",
    ],
  },
];

export const guidePublicHref = (fileName: string): string => {
  return `/guides/${encodeURIComponent(fileName)}`;
};

export const getGuidesByTag = (tag: CategoryTag): readonly Guide[] => {
  return GUIDES.filter((guide) => guide.tags.includes(tag));
};
