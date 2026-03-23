"use client";

import { GuideListItem } from "@/components/GuideListItem";
import { SearchBar } from "@/components/SearchBar";
import { filterGuidesByQuery } from "@/data/guides";
import { useMemo, useState } from "react";
import {
  BackLink,
  CodePath,
  EmptyState,
  List,
  Main,
  PageIntro,
  SearchFieldRow,
  Subtitle,
  Title,
} from "./CategoryGuideList.styles";
import type { CategoryGuideListProps } from "./CategoryGuideList.types";

export function CategoryGuideList({ tag, guides }: CategoryGuideListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = useMemo(
    () => filterGuidesByQuery(guides, searchQuery),
    [guides, searchQuery],
  );

  const subtitleText =
    guides.length === 0
      ? "No guides use this topic yet."
      : filteredGuides.length === guides.length
        ? `${guides.length} guide${guides.length === 1 ? "" : "s"}`
        : `${filteredGuides.length} of ${guides.length} guide${guides.length === 1 ? "" : "s"}`;

  return (
    <Main>
      <PageIntro>
        <BackLink href="/">← Home</BackLink>
        <Title>Topic: {tag}</Title>
        <Subtitle>{subtitleText}</Subtitle>
      </PageIntro>

      {guides.length === 0 ? (
        <EmptyState>
          Add entries in <CodePath>src/data/guides.ts</CodePath> and include
          this tag.
        </EmptyState>
      ) : (
        <>
          <SearchFieldRow>
            <SearchBar
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search this topic…"
              aria-label={`Search guides in ${tag}`}
              suggestions={filteredGuides.map((entry) => ({
                id: entry.id,
                title: entry.title,
                summary: entry.summary,
              }))}
              onSuggestionSelect={(suggestion) => {
                requestAnimationFrame(() => {
                  document
                    .getElementById(`guide-${suggestion.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                });
              }}
            />
          </SearchFieldRow>

          {filteredGuides.length === 0 ? (
            <EmptyState>No guides match your search in this topic.</EmptyState>
          ) : (
            <List>
              {filteredGuides.map((guide) => (
                <GuideListItem
                  key={guide.id}
                  guide={guide}
                  domId={`guide-${guide.id}`}
                  showTags={false}
                />
              ))}
            </List>
          )}
        </>
      )}
    </Main>
  );
}
