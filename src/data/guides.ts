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

/** Uniform random choice from `GUIDES`. */
export function pickRandomGuide(): Guide {
  if (GUIDES.length === 0) {
    throw new Error("pickRandomGuide: no guides registered");
  }
  const index = Math.floor(Math.random() * GUIDES.length);
  return GUIDES[index];
}

/**
 * Open a guide PDF in a new tab. For use from client event handlers only
 * (uses `document`).
 */
export function openGuidePdfInNewTab(guide: Guide): void {
  if (typeof document === "undefined") {
    return;
  }
  const anchor = document.createElement("a");
  anchor.href = guidePublicHref(guide.fileName);
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.click();
}

export const getGuidesByTag = (tag: CategoryTag): readonly Guide[] => {
  return GUIDES.filter((guide) => guide.tags.includes(tag));
};

/** Case-insensitive match on title, summary, and tags. */
export const filterGuidesByQuery = (
  guides: readonly Guide[],
  query: string
): Guide[] => {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return [...guides];
  }
  return guides.filter((entry) => {
    const tags = entry.tags.join(" ");
    const haystack = `${entry.title} ${entry.summary} ${tags}`.toLowerCase();
    return haystack.includes(normalized);
  });
};
