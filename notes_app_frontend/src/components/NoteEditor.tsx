"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { useNotes } from "@/lib/notes-store";
import { oceanTheme } from "@/lib/theme";

// PUBLIC_INTERFACE
export default function NoteEditor() {
  /** Editor/view for the selected note */
  const { notes, selectedId, save, remove } = useNotes();
  const note = useMemo(() => notes.find((n) => n.id === selectedId) || null, [notes, selectedId]);
  const titleId = useId();
  const contentId = useId();

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note?.id, note?.title, note?.content]);

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className="rounded-lg p-8 max-w-md text-center"
          style={{ background: oceanTheme.colors.surface, boxShadow: oceanTheme.shadow.md }}
        >
          <p className="text-sm" style={{ color: oceanTheme.colors.mutedText }}>
            Select a note from the left, or create a new one.
          </p>
        </div>
      </div>
    );
  }

  async function handleSave() {
    if (!note) return;
    setSaving(true);
    setErr(null);
    try {
      await save({ id: note.id, title, content });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to save";
      setErr(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!note) return;
    if (!confirm("Delete this note?")) return;
    try {
      await remove(note.id);
    } catch {
      // No-op; error handled by store refresh
    }
  }

  return (
    <section className="h-full overflow-auto">
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div
          className="rounded-xl p-4 sm:p-6"
          style={{ background: oceanTheme.colors.surface, boxShadow: oceanTheme.shadow.md }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label htmlFor={titleId} className="sr-only">
                Title
              </label>
              <input
                id={titleId}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full text-xl font-semibold outline-none"
                style={{ color: oceanTheme.colors.text, borderBottom: `1px solid ${oceanTheme.colors.border}` }}
                aria-label="Note title"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-2 rounded-md text-sm text-white"
                style={{ background: oceanTheme.colors.primary, boxShadow: oceanTheme.shadow.sm, opacity: saving ? 0.7 : 1 }}
                aria-busy={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 rounded-md text-sm"
                style={{ color: oceanTheme.colors.error, border: `1px solid ${oceanTheme.colors.border}` }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor={contentId} className="sr-only">
              Content
            </label>
            <textarea
              id={contentId}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={16}
              className="w-full resize-y p-3 rounded-md outline-none"
              style={{
                background: "white",
                border: `1px solid ${oceanTheme.colors.border}`,
                color: oceanTheme.colors.text,
              }}
              aria-label="Note content"
            />
          </div>

          {err && (
            <div
              className="mt-4 p-3 rounded text-sm"
              role="alert"
              style={{ background: "#FEF2F2", color: oceanTheme.colors.error, border: `1px solid ${oceanTheme.colors.border}` }}
            >
              {err}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
