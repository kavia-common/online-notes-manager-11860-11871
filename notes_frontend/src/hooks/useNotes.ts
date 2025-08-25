"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Note, NoteInput } from "@/lib/types";
import {
  createNote as storageCreate,
  updateNote as storageUpdate,
  deleteNote as storageDelete,
  loadNotes,
  searchNotes as storageSearch,
} from "@/lib/storage";

/**
 * PUBLIC_INTERFACE
 * Hook that provides notes collection, selection, search, and CRUD actions.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // initial load
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  // computed filtered notes
  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    return storageSearch(query);
  }, [notes, query]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const selectNote = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const createNote = useCallback(() => {
    const created = storageCreate({ title: "Untitled", content: "" });
    setNotes(loadNotes());
    setSelectedId(created.id);
  }, []);

  const saveNote = useCallback((id: string, input: NoteInput) => {
    const updated = storageUpdate(id, input);
    if (updated) {
      setNotes(loadNotes());
      setSelectedId(updated.id);
    }
  }, []);

  const removeNote = useCallback((id: string) => {
    storageDelete(id);
    const next = loadNotes();
    setNotes(next);
    // adjust selection
    if (selectedId === id) {
      setSelectedId(next[0]?.id ?? null);
    }
  }, [selectedId]);

  const setSearchQuery = useCallback((q: string) => {
    setQuery(q);
  }, []);

  return {
    notes,
    filtered,
    selectedId,
    selectedNote,
    query,
    actions: {
      selectNote,
      createNote,
      saveNote,
      removeNote,
      setSearchQuery,
      refresh: () => setNotes(loadNotes()),
    },
  };
}
