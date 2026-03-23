"use client";

import { Button } from "@/components/Button";
import { CategoryNav } from "@/components/CategoryNav";
import { Drawer } from "@/components/Drawer";
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
  NavLink,
  PlaceholderNav,
  Root,
} from "./AppFrame.styles";
import type { AppFrameProps } from "./AppFrame.types";

export function AppFrame({ children }: AppFrameProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              <NavLink href="/" onClick={() => setDrawerOpen(false)}>
                Back to Home
              </NavLink>
            </nav>

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
    </Root>
  );
}
