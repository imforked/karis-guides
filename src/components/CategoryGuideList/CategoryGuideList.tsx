"use client";

import type { CategoryTag } from "@/data/categories";
import type { Guide } from "@/data/guides";
import { guidePublicHref } from "@/data/guides";
import Link from "next/link";
import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1rem 2rem;
  background: ${({ theme }) => theme.color.background};
`;

const TopBar = styled.header`
  padding: 0.75rem 1rem;
  margin: -1.25rem -1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.textMuted};
  margin-bottom: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.color.foreground};
  }
`;

const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.45;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GuideCard = styled.li`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.shadow};
`;

const GuideTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

const GuideSummary = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};
  margin-bottom: 0.65rem;
`;

const OpenPdf = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.earth};
  text-decoration: underline;
  text-underline-offset: 2px;
`;

const EmptyState = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.5;
`;

export type CategoryGuideListProps = {
  tag: CategoryTag;
  guides: readonly Guide[];
};

export function CategoryGuideList({ tag, guides }: CategoryGuideListProps) {
  return (
    <Main>
      <TopBar>
        <BackLink href="/">← All categories</BackLink>
        <Title>Category: {tag}</Title>
        <Subtitle>
          {guides.length === 0
            ? "No guides are tagged with this category yet."
            : `${guides.length} guide${guides.length === 1 ? "" : "s"} tagged with “${tag}”.`}
        </Subtitle>
      </TopBar>

      {guides.length === 0 ? (
        <EmptyState>
          Add a guide to the registry in{" "}
          <code style={{ fontSize: "0.8125rem" }}>src/data/guides.ts</code> and
          include this tag.
        </EmptyState>
      ) : (
        <List>
          {guides.map((guide) => (
            <GuideCard key={guide.id}>
              <GuideTitle>{guide.title}</GuideTitle>
              <GuideSummary>{guide.summary}</GuideSummary>
              <OpenPdf
                href={guidePublicHref(guide.fileName)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF
              </OpenPdf>
            </GuideCard>
          ))}
        </List>
      )}
    </Main>
  );
}
