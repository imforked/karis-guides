"use client";

import { ItemSummary, ItemTitle, StyledItem } from "./Item.styles";
import type { ItemProps } from "./Item.types";

export function Item({
  title,
  summary,
  type = "button",
  children,
  ...rest
}: ItemProps) {
  return (
    <StyledItem type={type} {...rest}>
      <ItemTitle>{title}</ItemTitle>
      {summary !== undefined &&
      summary !== null &&
      summary !== "" ? (
        <ItemSummary>{summary}</ItemSummary>
      ) : null}
      {children}
    </StyledItem>
  );
}
