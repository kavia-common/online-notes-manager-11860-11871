"use client";

import React from "react";

type Props = {
  onCreate: () => void;
  query: string;
  onQueryChange: (q: string) => void;
};

export default function TopBar({ onCreate, query, onQueryChange }: Props) {
  return (
    <div className="w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
        <div className="flex-1 text-sm sm:text-base font-medium tracking-wide text-neutral-800">
          Online Notes
        </div>
        <div className="hidden sm:flex flex-1 max-w-lg items-center">
          <div className="relative w-full">
            <input
              aria-label="Search notes"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
              ⌘K
            </span>
          </div>
        </div>
        <button
          onClick={onCreate}
          className="rounded-md bg-[#34a853] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#2e8b46] active:translate-y-[1px] transition"
        >
          New Note
        </button>
      </div>
    </div>
  );
}
