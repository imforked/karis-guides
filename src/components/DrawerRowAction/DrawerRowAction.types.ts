import type Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type DrawerRowActionLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type DrawerRowActionButtonProps =
  ComponentPropsWithoutRef<"button">;
