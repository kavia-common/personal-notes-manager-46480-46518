import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "Create, edit, and manage personal notes with a modern UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
