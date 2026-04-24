"use client";

import { Button } from "@/components/Button";
import { Body, Panel, Title, Actions } from "./PwaInstallBanner.styles";
import type { PwaInstallBannerProps } from "./PwaInstallBanner.types";

export function PwaInstallBanner({
  onAdd,
  onHowTo,
  onDismiss,
}: PwaInstallBannerProps) {
  return (
    <div role="dialog" aria-labelledby="pwa-install-title" aria-live="polite">
      <Panel>
        <Title id="pwa-install-title">Add to Home Screen</Title>
        <Body>
          Install Kari&apos;s Guides on you home screen.
        </Body>
        <Actions>
          <Button type="button" size="sm" onClick={onAdd}>
            Add now
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={onHowTo}>
            How to add
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onDismiss}>
            Not now
          </Button>
        </Actions>
      </Panel>
    </div>
  );
}
