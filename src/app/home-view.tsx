"use client";

import { GuideListItem } from "@/components/GuideListItem";
import { SearchBar } from "@/components/SearchBar";
import { GUIDES, filterGuidesByQuery } from "@/data/guides";
import { useMemo, useState } from "react";
import {
  EmptyState,
  Intro,
  List,
  Main,
  SearchFieldRow,
  SectionTitle,
  VisuallyHiddenH1,
} from "./home-view.styles";

export function HomeView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = useMemo(
    () => filterGuidesByQuery(GUIDES, searchQuery),
    [searchQuery],
  );

  return (
    <Main>
      <VisuallyHiddenH1>Kari&apos;s Guides</VisuallyHiddenH1>
      <Intro>
        Survival and field references for offline use. Search or open the menu
        to browse by topic. PDFs open in a new tab.
      </Intro>

      <div>
        <SearchFieldRow>
          <SearchBar
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search guides…"
            aria-label="Search guides"
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
      </div>

      <section aria-labelledby="guides-heading">
        <SectionTitle id="guides-heading">
          Guides ({filteredGuides.length})
        </SectionTitle>
        {filteredGuides.length === 0 ? (
          <EmptyState>No guides match your search.</EmptyState>
        ) : (
          <List>
            {filteredGuides.map((guide) => (
              <GuideListItem
                key={guide.id}
                guide={guide}
                domId={`guide-${guide.id}`}
                showTags
              />
            ))}
          </List>
        )}
      </section>
    </Main>
  );
}
