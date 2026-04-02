import type { Guide } from "@/data/guides";
import { GUIDES } from "@/data/guides";

const STORAGE_KEY = "karis-guides-recent";
const MAX_ENTRIES = 10;
const CHANGED_EVENT = "karis-guides-recent-changed";

const validGuideIds = new Set(GUIDES.map((g) => g.id));

const EMPTY_STORE_SNAPSHOT: Array<{ guide: Guide; openedAt: string }> = [];

let storeSnapshotCache: Array<{ guide: Guide; openedAt: string }> =
  EMPTY_STORE_SNAPSHOT;
let storeSnapshotKey = "";

function snapshotKeyFromEntries(entries: RecentGuideEntry[]): string {
  if (entries.length === 0) {
    return "";
  }
  return entries.map((e) => `${e.id}\0${e.openedAt}`).join("\n");
}

export type RecentGuideEntry = {
  id: string;
  openedAt: string;
  title: string;
};

function dispatchChanged(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

function tryPersist(entries: RecentGuideEntry[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Private mode / quota
  }
}

function parseStored(): RecentGuideEntry[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const out: RecentGuideEntry[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item === "object" &&
        "id" in item &&
        "openedAt" in item &&
        "title" in item &&
        typeof item.id === "string" &&
        typeof item.openedAt === "string" &&
        typeof item.title === "string"
      ) {
        out.push({
          id: item.id,
          openedAt: item.openedAt,
          title: item.title,
        });
      }
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Reads stored recent views, drops entries that no longer exist in the catalog,
 * and persists if the list changed.
 */
export function readRecentViewedEntries(): RecentGuideEntry[] {
  const raw = parseStored();
  const pruned = raw.filter((e) => validGuideIds.has(e.id)).slice(0, MAX_ENTRIES);
  if (pruned.length !== raw.length) {
    tryPersist(pruned);
  }
  return pruned;
}

export function recordGuideViewed(guide: Guide): void {
  if (typeof window === "undefined") {
    return;
  }
  const existing = readRecentViewedEntries();
  const filtered = existing.filter((e) => e.id !== guide.id);
  const next: RecentGuideEntry[] = [
    {
      id: guide.id,
      openedAt: new Date().toISOString(),
      title: guide.title,
    },
    ...filtered,
  ].slice(0, MAX_ENTRIES);
  tryPersist(next);
  dispatchChanged();
}

/**
 * Stable snapshot for `useSyncExternalStore`: returns the same array reference
 * when underlying recent-list data is unchanged (required by React).
 */
export function getRecentViewedStoreSnapshot(): Array<{
  guide: Guide;
  openedAt: string;
}> {
  const entries = readRecentViewedEntries();
  const nextKey = snapshotKeyFromEntries(entries);
  if (nextKey === storeSnapshotKey) {
    return storeSnapshotCache;
  }
  storeSnapshotKey = nextKey;
  if (entries.length === 0) {
    storeSnapshotCache = EMPTY_STORE_SNAPSHOT;
    return storeSnapshotCache;
  }
  const byId = new Map(GUIDES.map((g) => [g.id, g]));
  storeSnapshotCache = entries
    .map((e) => {
      const guide = byId.get(e.id);
      return guide ? { guide, openedAt: e.openedAt } : null;
    })
    .filter((row): row is { guide: Guide; openedAt: string } => row !== null);
  return storeSnapshotCache;
}

export function subscribeRecentViewedChanged(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => onChange();
  window.addEventListener(CHANGED_EVENT, handler);
  return () => window.removeEventListener(CHANGED_EVENT, handler);
}
