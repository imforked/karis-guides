"use client";

import { Button } from "@/components/Button";
import { CategoryNav } from "@/components/CategoryNav";
import {
  DrawerRowActionButton,
  DrawerRowActionLink,
} from "@/components/DrawerRowAction";
import { Drawer } from "@/components/Drawer";
import { InstallHelpDialog } from "@/components/InstallHelpDialog";
import { PwaInstallBanner } from "@/components/PwaInstallBanner";
import { openGuidePdfInNewTab, pickRandomGuide } from "@/data/guides";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useState } from "react";
import {
  Brand,
  DrawerBody,
  DrawerCloseButton,
  DrawerScrollArea,
  DrawerSection,
  DrawerSectionNav,
  DrawerVisuallyHiddenTitle,
  DrawerSectionLabel,
  Header,
  Main,
  PlaceholderNav,
  Root,
} from "./AppFrame.styles";
import type { AppFrameProps } from "./AppFrame.types";

export function AppFrame({ children }: AppFrameProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pwa = usePwaInstall();

  const handleAddToHomeFromMenu = () => {
    setDrawerOpen(false);
    void pwa.promptInstall();
  };

  const handleRandomGuide = () => {
    setDrawerOpen(false);
    openGuidePdfInNewTab(pickRandomGuide());
  };

  return (
    <Root>
      <Header>
        <Brand href="/" onClick={() => setDrawerOpen(false)}>
          Kari&apos;s Guides
        </Brand>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-expanded={drawerOpen}
          aria-controls="app-menu-drawer"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          style={{ padding: "0.375rem" }}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable="false"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </Header>

      <Main>{children}</Main>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        aria-label="Navigation"
      >
        <DrawerBody id="app-menu-drawer">
          <DrawerVisuallyHiddenTitle id="app-menu-drawer-title">
            Main navigation
          </DrawerVisuallyHiddenTitle>
          <DrawerCloseButton
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            ×
          </DrawerCloseButton>

          <DrawerScrollArea>
            <DrawerSection aria-labelledby="drawer-section-quick">
              <DrawerSectionLabel id="drawer-section-quick">
                Quick links
              </DrawerSectionLabel>
              <DrawerSectionNav aria-label="Quick links">
                <DrawerRowActionLink
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                >
                  Back to Home
                </DrawerRowActionLink>
                <DrawerRowActionButton
                  type="button"
                  aria-label="Open a random guide PDF in a new tab"
                  onClick={handleRandomGuide}
                >
                  Get a Random Guide
                </DrawerRowActionButton>
                <DrawerRowActionLink
                  href="/morse-code"
                  onClick={() => setDrawerOpen(false)}
                >
                  Morse code generator
                </DrawerRowActionLink>
              </DrawerSectionNav>
            </DrawerSection>

            {pwa.mounted && !pwa.isStandalone ? (
              <DrawerSection aria-labelledby="drawer-section-app">
                <DrawerSectionLabel id="drawer-section-app">
                  Install
                </DrawerSectionLabel>
                <DrawerSectionNav aria-label="Install app">
                  <DrawerRowActionButton
                    type="button"
                    onClick={handleAddToHomeFromMenu}
                  >
                    Add to Home Screen
                  </DrawerRowActionButton>
                </DrawerSectionNav>
              </DrawerSection>
            ) : null}

            <DrawerSection aria-labelledby="drawer-section-map">
              <DrawerSectionLabel id="drawer-section-map">
                Map
              </DrawerSectionLabel>
              <PlaceholderNav>
                Vector map will open here when that feature ships. Works fully
                offline on your network.
              </PlaceholderNav>
            </DrawerSection>

            <DrawerSection aria-labelledby="drawer-section-topics">
              <DrawerSectionLabel id="drawer-section-topics">
                Browse by topic
              </DrawerSectionLabel>
              <CategoryNav onNavigate={() => setDrawerOpen(false)} />
            </DrawerSection>
          </DrawerScrollArea>
        </DrawerBody>
      </Drawer>

      {pwa.showBanner ? (
        <PwaInstallBanner
          onAdd={() => {
            void pwa.promptInstall();
          }}
          onHowTo={pwa.openHelp}
          onDismiss={pwa.dismissBanner}
        />
      ) : null}

      <InstallHelpDialog
        open={pwa.helpOpen}
        onClose={pwa.closeHelp}
        isIos={pwa.isIos}
      />
    </Root>
  );
}
