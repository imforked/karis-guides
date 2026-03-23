import type { Guide } from "@/data/guides";

export type GuideListItemProps = {
  guide: Guide;
  domId?: string;
  showTags?: boolean;
};
