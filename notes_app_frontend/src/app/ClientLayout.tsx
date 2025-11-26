"use client";

import React from "react";
import Header from "@/components/Header";
import { NotesProvider } from "@/lib/notes-store";
import { backendAvailable } from "@/lib/api";
import { oceanTheme, parseFeatureFlags } from "@/lib/theme";

/**
 * PUBLIC_INTERFACE
 * ClientLayout wraps the app with client-only providers and header.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  /** This is a public function. */
  const flags = parseFeatureFlags(process.env.NEXT_PUBLIC_FEATURE_FLAGS || "");
  return (
    <NotesProvider>
      <div className="min-h-screen flex flex-col" style={{ background: oceanTheme.colors.bg }}>
        <Header flags={flags} backend={backendAvailable()} />
        {children}
      </div>
    </NotesProvider>
  );
}
