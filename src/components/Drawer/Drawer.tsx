"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Panel } from "./Drawer.styles";
import type { DrawerProps } from "./Drawer.types";

export function Drawer({
  open,
  onOpenChange,
  children,
  side = "left",
  closeOnBackdrop = true,
  "aria-label": ariaLabel = "Menu",
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onBackdropPointerDown = useCallback(() => {
    if (closeOnBackdrop) onOpenChange(false);
  }, [closeOnBackdrop, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <Backdrop
        $open={open}
        onPointerDown={onBackdropPointerDown}
        aria-hidden
      />
      <Panel
        $open={open}
        $side={side}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-hidden={!open}
      >
        {children}
      </Panel>
    </>,
    document.body
  );
}
