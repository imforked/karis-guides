"use client";

import { CATEGORY_TAGS } from "@/data/categories";
import Link from "next/link";
import styled from "styled-components";

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const TagLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.foreground};
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.earth};
    background: ${({ theme }) => theme.color.background};
  }
`;

export function CategoryNav() {
  return (
    <TagGrid role="navigation" aria-label="Guide categories">
      {CATEGORY_TAGS.map((tag) => (
        <TagLink key={tag} href={`/category/${tag}`}>
          {tag}
        </TagLink>
      ))}
    </TagGrid>
  );
}
