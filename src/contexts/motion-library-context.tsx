"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * The animation library a dual component is shown in.
 *
 * Components whose animation needs a library ship two builds with identical
 * props and markup — GSAP (the default item) and Framer Motion (`<name>-framer`)
 * — and the docs show one at a time. This is the reader's pick.
 *
 * Unlike the framework it is not route state: it changes what is SHOWN (the
 * preview, the Code tab, the install command), never what is built, so it lives
 * in a context and localStorage like the package manager rather than the URL.
 */
export type MotionLibrary = "gsap" | "framer";

export const MOTION_LIBRARIES: readonly MotionLibrary[] = ["gsap", "framer"];

/** GSAP is the default build — the item that keeps the bare name. */
export const DEFAULT_MOTION_LIBRARY: MotionLibrary = "gsap";

export const MOTION_LIBRARY_LABEL: Record<MotionLibrary, string> = {
  gsap: "GSAP",
  framer: "Motion",
};

const STORAGE_KEY = "motion-library";

const isMotionLibrary = (value: unknown): value is MotionLibrary =>
  value === "gsap" || value === "framer";

interface MotionLibraryContextValue {
  library: MotionLibrary;
  setLibrary: (library: MotionLibrary) => void;
}

const MotionLibraryContext = createContext<MotionLibraryContextValue | null>(null);

export function MotionLibraryProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibraryState] = useState<MotionLibrary>(DEFAULT_MOTION_LIBRARY);

  // Read after mount so the server render and first paint always show the
  // default; a saved Framer pick swaps in on the next frame.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isMotionLibrary(saved)) setLibraryState(saved);
    } catch {
      // Storage blocked (private mode, sandboxed frame) — keep the default.
    }
  }, []);

  const setLibrary = useCallback((next: MotionLibrary) => {
    setLibraryState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted, but the page still follows the pick.
    }
  }, []);

  const value = useMemo(() => ({ library, setLibrary }), [library, setLibrary]);

  return (
    <MotionLibraryContext.Provider value={value}>{children}</MotionLibraryContext.Provider>
  );
}

/**
 * The reader's pick. Outside the docs layout there is no provider, and a
 * component there simply shows the default build.
 */
export function useMotionLibrary(): MotionLibraryContextValue {
  const context = useContext(MotionLibraryContext);
  return context ?? { library: DEFAULT_MOTION_LIBRARY, setLibrary: () => {} };
}
