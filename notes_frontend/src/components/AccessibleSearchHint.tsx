"use client";

/**
 * PUBLIC_INTERFACE
 * Returns a visually hidden hint text for screen readers to describe the search shortcut.
 * Usage: include alongside a search input to announce "Press Command or Control and K to focus search".
 */
export default function AccessibleSearchHint() {
  return (
    <span className="sr-only">
      Press Command or Control and K to focus the search field.
    </span>
  );
}
