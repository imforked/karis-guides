"use client";

import { CATEGORY_TAGS } from "@/data/categories";
import { TagGrid, TagLink } from "./CategoryNav.styles";
import type { CategoryNavProps } from "./CategoryNav.types";

export function CategoryNav({ onNavigate }: CategoryNavProps) {
  return (
    <TagGrid role="navigation" aria-label="Guide categories">
      {CATEGORY_TAGS.map((tag) => (
        <TagLink
          key={tag}
          href={`/category/${tag}`}
          onClick={() => onNavigate?.()}
        >
          {tag}
        </TagLink>
      ))}
    </TagGrid>
  );
}
