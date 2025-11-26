"use client";

import React from "react";
import { oceanTheme } from "@/lib/theme";

// PUBLIC_INTERFACE
export default function EmptyState({ title, description }: { title: string; description?: string }) {
  /** Neutral empty state card */
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="rounded-lg p-8 max-w-md text-center"
        style={{ background: oceanTheme.colors.surface, boxShadow: oceanTheme.shadow.md }}
      >
        <h2 className="text-lg font-medium" style={{ color: oceanTheme.colors.text }}>
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm" style={{ color: oceanTheme.colors.mutedText }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
