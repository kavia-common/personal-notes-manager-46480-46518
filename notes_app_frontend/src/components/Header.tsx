"use client";

import React from "react";
import { oceanTheme } from "@/lib/theme";

// PUBLIC_INTERFACE
export default function Header({ flags, backend }: { flags: Record<string, boolean>; backend: boolean }) {
  /** Branded top header with Ocean Professional style and environment status. */
  return (
    <header
      className="w-full border-b"
      style={{ borderColor: oceanTheme.colors.border, background: oceanTheme.colors.surface }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="h-9 w-9 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${oceanTheme.colors.primary}20, ${oceanTheme.colors.secondary}20)`,
              boxShadow: oceanTheme.shadow.sm,
            }}
          >
            <span className="text-xl" aria-hidden>
              🐚
            </span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold" style={{ color: oceanTheme.colors.text }}>
              Ocean Notes
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: oceanTheme.colors.mutedText }}>
              Personal notes with a modern, accessible UI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded text-xs"
            style={{
              background: backend ? "#DCFCE7" : "#FEF3C7",
              color: backend ? "#166534" : "#92400E",
              border: `1px solid ${oceanTheme.colors.border}`,
            }}
            aria-live="polite"
          >
            {backend ? "Backend connected" : "In-memory mode"}
          </span>
          {Object.keys(flags).length > 0 && (
            <span
              className="px-2 py-1 rounded text-xs"
              style={{
                background: "#DBEAFE",
                color: oceanTheme.colors.primaryHover,
                border: `1px solid ${oceanTheme.colors.border}`,
              }}
              title={Object.entries(flags)
                .map(([k, v]) => `${k}:${v}`)
                .join(", ")}
            >
              Flags on
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
