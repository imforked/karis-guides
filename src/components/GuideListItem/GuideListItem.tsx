"use client";

import { guidePublicHref } from "@/data/guides";
import {
  OpenPdf,
  Root,
  Summary,
  TagChip,
  TagRow,
  Title,
} from "./GuideListItem.styles";
import type { GuideListItemProps } from "./GuideListItem.types";

export function GuideListItem({
  guide,
  domId,
  showTags = true,
}: GuideListItemProps) {
  return (
    <Root id={domId}>
      <Title>{guide.title}</Title>
      <Summary>{guide.summary}</Summary>
      {showTags && guide.tags.length > 0 ? (
        <TagRow aria-label="Topics">
          {guide.tags.map((tag) => (
            <TagChip key={tag} href={`/category/${tag}`}>
              {tag}
            </TagChip>
          ))}
        </TagRow>
      ) : null}
      <OpenPdf
        href={guidePublicHref(guide.fileName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF
      </OpenPdf>
    </Root>
  );
}
