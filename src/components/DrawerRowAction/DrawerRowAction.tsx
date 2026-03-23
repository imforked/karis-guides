"use client";

import {
  StyledDrawerRowActionButton,
  StyledDrawerRowActionLink,
} from "./DrawerRowAction.styles";
import type {
  DrawerRowActionButtonProps,
  DrawerRowActionLinkProps,
} from "./DrawerRowAction.types";

export function DrawerRowActionLink(props: DrawerRowActionLinkProps) {
  return <StyledDrawerRowActionLink {...props} />;
}

export function DrawerRowActionButton(props: DrawerRowActionButtonProps) {
  return <StyledDrawerRowActionButton {...props} />;
}
