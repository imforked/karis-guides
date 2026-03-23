"use client";

import { Button } from "@/components/Button";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Body,
  CloseRow,
  Hint,
  Overlay,
  Panel,
  Title,
} from "./InstallHelpDialog.styles";
import type { InstallHelpDialogProps } from "./InstallHelpDialog.types";

export function InstallHelpDialog({
  open,
  onClose,
  isIos,
}: InstallHelpDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <Overlay role="presentation" aria-hidden onClick={onClose} />
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-help-title"
      >
        <Title id="install-help-title">Add to Home Screen</Title>
        {isIos ? (
          <Body>
            <p>
              On <strong>Safari</strong> (iPhone or iPad):
            </p>
            <ol>
              <li>Tap the Share button (square with an arrow).</li>
              <li>Scroll and tap <strong>Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong>.</li>
            </ol>
          </Body>
        ) : (
          <Body>
            <p>
              Look for <strong>Add to Home screen</strong>,{" "}
              <strong>Install app</strong>, or <strong>Install</strong> in your
              browser menu (often <strong>⋮</strong> or <strong>⋯</strong>).
              Wording varies by browser.
            </p>
            <Hint>
              If you don&apos;t see it, the site may need to be opened in the
              browser app (not an in-app web view).
            </Hint>
          </Body>
        )}
        <CloseRow>
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </CloseRow>
      </Panel>
    </>,
    document.body,
  );
}
