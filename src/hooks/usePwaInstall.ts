"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const DISMISS_KEY = "karis-pwa-home-tip-dismissed-v1";

function readStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

function readIos(): boolean {
  if (typeof navigator === "undefined") return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return (
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1
  );
}

export function usePwaInstall() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [helpOpen, setHelpOpen] = useState(false);

  const isStandalone = useMemo(
    () => (mounted ? readStandalone() : false),
    [mounted],
  );
  const isIos = useMemo(() => (mounted ? readIos() : false), [mounted]);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [mounted]);

  const showBanner = mounted && !isStandalone && !dismissed;

  const dismissBanner = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    setDismissed(true);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) {
      setHelpOpen(true);
      return;
    }
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }, [deferred]);

  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  return {
    mounted,
    showBanner,
    dismissBanner,
    canPromptInstall: deferred !== null,
    isIos,
    isStandalone,
    helpOpen,
    openHelp,
    closeHelp,
    promptInstall,
  };
}
