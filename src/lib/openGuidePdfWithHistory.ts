import { openGuidePdfInNewTab, type Guide } from "@/data/guides";
import { recordGuideViewed } from "@/lib/recentlyViewedGuides";

export function openGuidePdfWithHistory(guide: Guide): void {
  recordGuideViewed(guide);
  openGuidePdfInNewTab(guide);
}
