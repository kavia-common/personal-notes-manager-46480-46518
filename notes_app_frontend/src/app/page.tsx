"use client";

import React from "react";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { oceanTheme } from "@/lib/theme";
import { useNotes } from "@/lib/notes-store";

export default function Home() {
  const { backend } = useNotes();
  return (
    <main className="flex-1">
      {!backend && (
        <div
          className="w-full text-center text-sm py-2"
          role="status"
          style={{ background: "#FFFBEB", color: "#92400E", borderBottom: `1px solid ${oceanTheme.colors.border}` }}
        >
          No backend configured. Running in in-memory mode. Set NEXT_PUBLIC_API_BASE to enable persistence.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div style={{ background: oceanTheme.colors.surface }}>
          <NotesList />
        </div>
        <div style={{ background: oceanTheme.colors.bg }}>
          <NoteEditor />
        </div>
      </div>
    </main>
  );
}
