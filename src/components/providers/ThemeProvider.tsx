"use client";

import { ReactNode } from "react";

// Theme system removed — single static theme only.
// This file is kept temporarily while callsites are migrated. Delete when unused.

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  return { theme: "light" as const, toggleTheme: () => {}, mounted: true };
}
