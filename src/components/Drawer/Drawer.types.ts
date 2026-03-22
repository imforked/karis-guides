import type { ReactNode } from "react";

export type DrawerSide = "left" | "right" | "bottom";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  side?: DrawerSide;
  closeOnBackdrop?: boolean;
  "aria-label"?: string;
};
