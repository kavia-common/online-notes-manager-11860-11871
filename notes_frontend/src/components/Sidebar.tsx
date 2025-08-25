"use client";

import React from "react";
import { Note } from "@/lib/types";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  query,
  onQueryChange,
}: Props) {
  return (
    <aside className="w-full sm:w-80 border-r border-neutral-200 bg-white">
      <div className="sm:hidden p-3 border-b border-neutral-200">
        <input
          aria-label="Search notes"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition"
        />
      </div>
      <div className="overflow-y-auto h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-0px)]">
        {notes.length === 0 ? (
          <div className="p-4 text-sm text-neutral-500">No notes yet.</div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => onSelect(n.id)}
                  className={`group block w-full text-left px-4 py-3 transition ${
                    selectedId === n.id
                      ? "bg-[#e8f0fe]"
                      : "hover:bg-neutral-50 active:bg-neutral-100"
                  }`}
                >
                  <div className="line-clamp-1 text-sm font-medium text-neutral-800">
                    {n.title || "Untitled"}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500 flex items-center gap-2">
                    <span>{formatDate(n.updatedAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span className="line-clamp-1">
                      {n.content ? n.content : "No content"}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
