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
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useState } from "react";
import {
  Brand,
  DrawerBody,
  DrawerCloseButton,
  DrawerScrollArea,
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
        >
          Menu
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
            <nav aria-label="Primary">
              <DrawerRowActionLink
                href="/"
                onClick={() => setDrawerOpen(false)}
              >
                Back to Home
              </DrawerRowActionLink>
            </nav>

            {pwa.mounted && !pwa.isStandalone ? (
              <div>
                <DrawerSectionLabel>App</DrawerSectionLabel>
                <nav aria-label="App">
                  <DrawerRowActionButton
                    type="button"
                    onClick={handleAddToHomeFromMenu}
                  >
                    Add to Home Screen
                  </DrawerRowActionButton>
                </nav>
              </div>
            ) : null}

            <div>
              <DrawerSectionLabel>Map</DrawerSectionLabel>
              <PlaceholderNav>
                Vector map will open here when that feature ships. Works fully
                offline on your network.
              </PlaceholderNav>
            </div>

            <div>
              <DrawerSectionLabel>Browse by topic</DrawerSectionLabel>
              <CategoryNav onNavigate={() => setDrawerOpen(false)} />
            </div>
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
