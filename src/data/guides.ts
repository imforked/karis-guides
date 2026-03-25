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
    summary: "Advanced wilderness life support reference.",
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
    summary: "U.S. Army survival field manual.",
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
  {
    id: "100-deadly-skills",
    title: "100 Deadly Skills",
    summary: "Survival and evasion skills reference.",
    fileName: "100-deadly-skills.pdf",
    tags: [
      "emergency",
      "urban",
      "wilderness",
      "tools",
      "knife",
      "medical",
      "navigation",
      "signaling",
      "improvisation",
      "repair",
    ],
  },
  {
    id: "nuclear-war-survival-skills",
    title: "Nuclear War Survival Skills",
    summary: "Civil defense shelter and fallout survival reference.",
    fileName: "nuclear-war-survival-skills.pdf",
    tags: [
      "emergency",
      "shelter",
      "water",
      "food",
      "medical",
      "preservation",
      "cooking",
      "urban",
    ],
  },
  {
    id: "encyclopedia-of-country-living",
    title: "The Encyclopedia of Country Living",
    summary: "Homesteading, food, and self-sufficiency reference.",
    fileName: "the-encyclopedia-of-country-living.pdf",
    tags: [
      "building",
      "containers",
      "cooking",
      "fire",
      "food",
      "foraging",
      "hunting",
      "fishing",
      "preservation",
      "medical",
      "shelter",
      "tools",
      "water",
      "wilderness",
      "improvisation",
      "repair",
      "maintenance",
    ],
  },
  {
    id: "humanure-handbook",
    title: "The Humanure Handbook",
    summary: "Composting human waste safely for sanitation and soil.",
    fileName: "the-humanure-handbook.pdf",
    tags: ["building", "water", "containers", "preservation"],
  },
  {
    id: "sas-survival-handbook",
    title: "The SAS Survival Handbook",
    summary: "Military-style wilderness and urban survival handbook.",
    fileName: "the-sas-survival-handbook.pdf",
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
      "wilderness",
      "urban",
      "emergency",
    ],
  },
  {
    id: "where-there-is-no-dentist",
    title: "Where There Is No Dentist",
    summary: "Community dental care where professional help is scarce.",
    fileName: "where-there-is-no-dentist.pdf",
    tags: ["medical", "emergency", "tools", "repair"],
  },
  {
    id: "where-there-is-no-doctor",
    title: "Where There Is No Doctor",
    summary: "Community health guide for low-resource settings.",
    fileName: "where-there-is-no-doctor.pdf",
    tags: [
      "medical",
      "emergency",
      "water",
      "shelter",
      "food",
      "cooking",
      "preservation",
    ],
  },
  {
    id: "marine-corps-martial-arts-program",
    title: "The Marine Corps Martial Arts Program",
    summary: "USMC close combat and martial arts program reference.",
    fileName: "the-marine-corps-martial-arts-program.pdf",
    tags: [
      "emergency",
      "urban",
      "wilderness",
      "knife",
      "medical",
      "tools",
      "improvisation",
      "repair",
    ],
  },
  {
    id: "put-em-down-take-em-out",
    title: "Put 'Em Down, Take 'Em Out",
    summary: "Knife fighting and close-quarters combatives reference.",
    fileName: "put-em-down-take-em-out.pdf",
    tags: ["emergency", "urban", "knife", "medical", "tools", "improvisation"],
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
