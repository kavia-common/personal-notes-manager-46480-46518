"use client";

import React, { useId } from "react";
import { useNotes } from "@/lib/notes-store";
import { oceanTheme, cn } from "@/lib/theme";

// PUBLIC_INTERFACE
export default function NotesList() {
  /** Sidebar list of notes with search and create controls */
  const { notes, selectedId, select, create, search, setSearch, isLoading, error } = useNotes();
  const searchId = useId();

  return (
    <aside
      className="h-full flex flex-col"
      aria-label="Notes list"
      style={{ borderRight: `1px solid ${oceanTheme.colors.border}` }}
    >
      <div className="p-3 border-b" style={{ borderColor: oceanTheme.colors.border }}>
        <label htmlFor={searchId} className="sr-only">
          Search notes
        </label>
        <input
          id={searchId}
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md px-3 py-2 text-sm outline-none"
          aria-label="Search notes"
          style={{
            background: oceanTheme.colors.surface,
            border: `1px solid ${oceanTheme.colors.border}`,
          }}
        />
        <button
          className="mt-3 w-full text-sm font-medium rounded-md px-3 py-2 transition-colors"
          onClick={() => create()}
          style={{
            color: "white",
            background: oceanTheme.colors.primary,
            boxShadow: oceanTheme.shadow.sm,
          }}
          aria-label="Create a new note"
        >
          + New note
        </button>
      </div>

      <div className="flex-1 overflow-auto" role="list" aria-busy={isLoading}>
        {isLoading && (
          <div className="p-4 text-sm" style={{ color: oceanTheme.colors.mutedText }}>
            Loading notes…
          </div>
        )}
        {error && (
          <div
            className="m-3 p-3 rounded text-sm"
            role="alert"
            style={{ background: "#FEF2F2", color: oceanTheme.colors.error, border: `1px solid ${oceanTheme.colors.border}` }}
          >
            {error}
          </div>
        )}
        {!isLoading && !error && notes.length === 0 && (
          <div className="p-4 text-sm" style={{ color: oceanTheme.colors.mutedText }}>
            No notes found. Create your first note.
          </div>
        )}
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <button
                className={cn(
                  "w-full text-left px-4 py-3 transition-colors focus:outline-none focus:ring-2",
                  selectedId === n.id ? "bg-blue-50" : "hover:bg-gray-50"
                )}
                onClick={() => select(n.id)}
                aria-current={selectedId === n.id ? "true" : undefined}
                style={{
                  color: oceanTheme.colors.text,
                }}
              >
                <div className="text-sm font-medium truncate">{n.title || "Untitled"}</div>
                <div className="text-xs truncate" style={{ color: oceanTheme.colors.mutedText }}>
                  {new Date(n.updatedAt).toLocaleString()}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
