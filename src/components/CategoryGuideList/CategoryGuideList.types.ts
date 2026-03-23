import type { CategoryTag } from "@/data/categories";
import type { Guide } from "@/data/guides";

export type CategoryGuideListProps = {
  tag: CategoryTag;
  guides: readonly Guide[];
};
