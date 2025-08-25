"use client";

import React, { useEffect, useState } from "react";
import { Note } from "@/lib/types";

type Props = {
  note: Note | null;
  onSave: (id: string, data: { title: string; content: string }) => void;
  onDelete: (id: string) => void;
};

export default function NoteEditor({ note, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const canSave = !!note && (title !== note.title || content !== note.content);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    // We depend on the full note object so that switching notes or external updates reflect here.
  }, [note?.id, note?.title, note?.content]);

  if (!note) {
    return (
      <div className="h-[calc(100dvh-3.5rem)] sm:h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-neutral-700">
            Select or create a note
          </div>
          <div className="mt-1 text-sm text-neutral-500">
            Use the sidebar to choose a note or click “New Note”.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] sm:h-screen flex-col">
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-2">
        <button
          onClick={() => onDelete(note.id)}
          className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 active:translate-y-[1px] transition"
          aria-label="Delete note"
          title="Delete note"
        >
          Delete
        </button>
        <div className="flex-1" />
        <button
          disabled={!canSave}
          onClick={() => onSave(note.id, { title, content })}
          className={`rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm transition ${
            canSave
              ? "bg-[#1a73e8] hover:bg-[#155fc1] active:translate-y-[1px]"
              : "bg-neutral-300 cursor-not-allowed"
          }`}
          aria-label="Save note"
          title="Save note"
        >
          Save
        </button>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full text-2xl font-semibold outline-none placeholder:text-neutral-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="mt-3 h-[calc(100%-3rem)] w-full resize-none border-0 bg-transparent text-base leading-7 outline-none placeholder:text-neutral-400 focus:ring-0"
        />
      </div>
      <div className="border-t border-neutral-200 bg-white/60 px-4 py-2 text-xs text-neutral-500">
        Updated {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
