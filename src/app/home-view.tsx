"use client";

import { Button } from "@/components/Button";
import { GuideListItem } from "@/components/GuideListItem";
import { SearchBar } from "@/components/SearchBar";
import { GUIDES, filterGuidesByQuery, pickRandomGuide } from "@/data/guides";
import { openGuidePdfWithHistory } from "@/lib/openGuidePdfWithHistory";
import { useMemo, useState } from "react";
import {
  EmptyState,
  Intro,
  List,
  Main,
  RandomGuideRow,
  SearchFieldRow,
  SectionTitle,
  VisuallyHiddenH1,
} from "./home-view.styles";

export function HomeView() {
  const [draftQuery, setDraftQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const listGuides = useMemo(
    () => filterGuidesByQuery(GUIDES, appliedQuery),
    [appliedQuery]
  );

  const suggestionGuides = useMemo(
    () => filterGuidesByQuery(GUIDES, draftQuery),
    [draftQuery]
  );

  return (
    <Main>
      <VisuallyHiddenH1>Kari&apos;s Guides</VisuallyHiddenH1>
      <Intro>
        Survival and field guides when you don't have internet.
      </Intro>

      <RandomGuideRow>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          aria-label="Open a random guide PDF in a new tab"
          onClick={() => {
            openGuidePdfWithHistory(pickRandomGuide());
          }}
        >
          Get a random guide
        </Button>
      </RandomGuideRow>

      <div>
        <SearchFieldRow>
          <SearchBar
            value={draftQuery}
            onChange={(event) => {
              const value = event.target.value;
              setDraftQuery(value);
              if (value.trim() === "") {
                setAppliedQuery("");
              }
            }}
            onSearch={() => setAppliedQuery(draftQuery)}
            searchButtonAriaLabel="Filter the guide list"
            placeholder="Search guides…"
            aria-label="Search guides"
            suggestions={suggestionGuides.map((entry) => ({
              id: entry.id,
              title: entry.title,
              summary: entry.summary,
            }))}
            onSuggestionSelect={(suggestion) => {
              const guide = GUIDES.find((g) => g.id === suggestion.id);
              if (guide) {
                openGuidePdfWithHistory(guide);
              }
            }}
          />
        </SearchFieldRow>
      </div>

      <section aria-labelledby="guides-heading">
        <SectionTitle id="guides-heading">
          Guides ({listGuides.length})
        </SectionTitle>
        {listGuides.length === 0 ? (
          <EmptyState>No guides match your search.</EmptyState>
        ) : (
          <List>
            {listGuides.map((guide) => (
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
