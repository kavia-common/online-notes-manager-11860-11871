"use client";

import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import NoteEditor from "@/components/NoteEditor";
import GlobalHotkeys from "@/components/GlobalHotkeys";
import { useEffect, useRef } from "react";
import { useNotes } from "@/hooks/useNotes";

export default function Home() {
  const { filtered, notes, selectedId, selectedNote, query, actions } =
    useNotes();

  // Allow focusing the search input from GlobalHotkeys
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const focus = () => searchInputRef.current?.focus();
    window.addEventListener("focus-search", focus as EventListener);
    return () => window.removeEventListener("focus-search", focus as EventListener);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <GlobalHotkeys />
      {/* Top Bar */}
      <TopBar
        onCreate={actions.createNote}
        query={query}
        onQueryChange={actions.setSearchQuery}
      />

      {/* Content */}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 sm:grid-cols-[20rem_1fr]">
        <Sidebar
          notes={query.trim() ? filtered : notes}
          selectedId={selectedId}
          onSelect={actions.selectNote}
          query={query}
          onQueryChange={actions.setSearchQuery}
        />
        <section className="min-h-[calc(100dvh-3.5rem)]">
          <NoteEditor
            note={selectedNote}
            onSave={actions.saveNote}
            onDelete={actions.removeNote}
          />
        </section>
      </div>
    </main>
  );
}
