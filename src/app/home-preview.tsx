"use client";

import { Button } from "@/components/Button";
import { CategoryNav } from "@/components/CategoryNav";
import { Drawer } from "@/components/Drawer";
import { SearchBar } from "@/components/SearchBar";
import { GUIDES } from "@/data/guides";
import { useMemo, useState } from "react";
import styled from "styled-components";

const PreviewMain = styled.main`
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

const Card = styled.section`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.shadow};
`;

const CardTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardBody = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ClickFeedback = styled.p`
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.foreground};
`;

const EdgeHint = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.75rem;
  text-align: center;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.4;
`;

const DrawerDemoBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DrawerDemoText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textMuted};
`;

const SearchFieldRow = styled.div`
  margin-top: 0.75rem;
`;

const SearchSelection = styled.p`
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.foreground};
`;

export function HomePreview() {
  const [lastClick, setLastClick] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuideLabel, setSelectedGuideLabel] = useState<string | null>(
    null,
  );

  const searchMatches = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (normalized === "") {
      return [...GUIDES];
    }
    return GUIDES.filter((entry) => {
      const tags = entry.tags.join(" ");
      const haystack = `${entry.title} ${entry.summary} ${tags}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchQuery]);

  return (
    <PreviewMain>
      <TopBar>
        <Title>Kari&apos;s Guides</Title>
        <Subtitle>
          Narrow column on a wide window = max-width shell is working. Side
          margins are the page background.
        </Subtitle>
      </TopBar>

      <Card>
        <CardTitle>Sample guide block</CardTitle>
        <CardBody>
          Placeholder copy so you can scroll and confirm the content stays
          inside the centered phone-width column on desktop.
        </CardBody>
        <ButtonRow>
          <Button type="button" onClick={() => setLastClick("Primary")}>
            Primary
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setLastClick("Secondary")}
          >
            Secondary
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLastClick("Ghost")}
          >
            Ghost
          </Button>
          <Button type="button" size="sm" onClick={() => setLastClick("Small")}>
            Small
          </Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={() => setLastClick("Large")}
          >
            Large
          </Button>
          <Button type="button" disabled>
            Disabled
          </Button>
        </ButtonRow>
        <ClickFeedback>
          {lastClick === null
            ? "Click a button above — the label you pressed will show here."
            : `You clicked: ${lastClick}`}
        </ClickFeedback>
      </Card>

      <Card>
        <CardTitle>Categories</CardTitle>
        <CardBody>
          Tap a tag to see every guide that lists that category. Tags are the
          single source of truth in{" "}
          <code style={{ fontSize: "0.8125rem" }}>src/data/guides.ts</code>.
        </CardBody>
        <CategoryNav />
      </Card>

      <Card>
        <CardTitle>Search</CardTitle>
        <CardBody>
          Focus the field or type to open a dropdown of matches from the guide
          registry (title, summary, and tags).
        </CardBody>
        <SearchFieldRow>
          <SearchBar
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search guides…"
            aria-label="Search guides"
            suggestions={searchMatches.map((entry) => ({
              id: entry.id,
              title: entry.title,
              summary: entry.summary,
            }))}
            onSuggestionSelect={(suggestion) => {
              setSelectedGuideLabel(
                `${suggestion.title} — ${suggestion.summary ?? ""}`.trim(),
              );
            }}
          />
        </SearchFieldRow>
        <SearchSelection>
          {selectedGuideLabel === null
            ? "No guide selected yet — pick one from the dropdown."
            : `Selected: ${selectedGuideLabel}`}
        </SearchSelection>
      </Card>

      <Card>
        <CardTitle>Drawer</CardTitle>
        <CardBody>
          Opens a left sheet (mobile-style navigation). Tap the backdrop, press
          Escape, or use Close to dismiss.
        </CardBody>
        <ButtonRow>
          <Button type="button" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
        </ButtonRow>
      </Card>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        aria-label="Preview drawer"
      >
        <DrawerDemoBody>
          <DrawerDemoText>
            Example panel content — e.g. folder tree or filters. Scroll if you
            add a long list here.
          </DrawerDemoText>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setDrawerOpen(false)}
          >
            Close
          </Button>
        </DrawerDemoBody>
      </Drawer>

      <EdgeHint>
        Tip: widen the browser — you should see empty gutters left and right.
      </EdgeHint>
    </PreviewMain>
  );
}
