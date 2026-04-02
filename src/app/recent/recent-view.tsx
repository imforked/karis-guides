"use client";

import type { Guide } from "@/data/guides";
import { openGuidePdfWithHistory } from "@/lib/openGuidePdfWithHistory";
import {
  getRecentViewedStoreSnapshot,
  subscribeRecentViewedChanged,
} from "@/lib/recentlyViewedGuides";
import { useSyncExternalStore } from "react";
import {
  BackLink,
  EmptyState,
  Item,
  ItemTitle,
  List,
  Main,
  OpenPdfButton,
  OpenedAt,
  PageIntro,
  Subtitle,
  Title,
} from "./recent-view.styles";

const EMPTY_SERVER_SNAPSHOT: Array<{ guide: Guide; openedAt: string }> = [];

function formatOpenedAt(iso: string): string {
  const opened = new Date(iso).getTime();
  if (Number.isNaN(opened)) {
    return "";
  }
  const diffSec = Math.round((Date.now() - opened) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const absSec = Math.abs(diffSec);
  if (absSec < 60) {
    return rtf.format(-diffSec, "second");
  }
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) {
    return rtf.format(-diffMin, "minute");
  }
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 48) {
    return rtf.format(-diffHour, "hour");
  }
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffDay) < 30) {
    return rtf.format(-diffDay, "day");
  }
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) {
    return rtf.format(-diffMonth, "month");
  }
  const diffYear = Math.round(diffDay / 365);
  return rtf.format(-diffYear, "year");
}

export function RecentView() {
  const rows = useSyncExternalStore(
    subscribeRecentViewedChanged,
    getRecentViewedStoreSnapshot,
    () => EMPTY_SERVER_SNAPSHOT
  );

  return (
    <Main>
      <PageIntro>
        <BackLink href="/">← Home</BackLink>
        <Title>Recently Viewed</Title>
        <Subtitle>
          Guides you opened recently. History is stored only on this device.
        </Subtitle>
      </PageIntro>

      {rows.length === 0 ? (
        <EmptyState>
          No guides yet. Open a PDF from the home list, a topic page, or
          &quot;Get a random guide&quot; to build your history.
        </EmptyState>
      ) : (
        <List>
          {rows.map(({ guide, openedAt }) => (
            <Item key={guide.id}>
              <ItemTitle>{guide.title}</ItemTitle>
              <OpenedAt>Opened {formatOpenedAt(openedAt)}</OpenedAt>
              <OpenPdfButton
                type="button"
                onClick={() => openGuidePdfWithHistory(guide)}
              >
                Open PDF
              </OpenPdfButton>
            </Item>
          ))}
        </List>
      )}
    </Main>
  );
}
