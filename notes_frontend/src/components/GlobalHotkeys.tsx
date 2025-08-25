"use client";

import { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * A global hotkeys component that listens for Cmd/Ctrl+K and dispatches a
 * custom 'focus-search' event so interested components can focus the search box.
 */
export default function GlobalHotkeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isK && isCmdOrCtrl) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("focus-search"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
}
