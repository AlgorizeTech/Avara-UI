"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export const DEFAULT_SHOWCASE_COLOR = "primary";

interface ShowcaseColorContextValue {
  color: string;
  setColor: (color: string) => void;
  /**
   * First caller wins and becomes the page's picker. Idempotent — the same id
   * keeps ownership across re-renders, so React can retry a render freely.
   */
  claimPicker: (id: string) => boolean;
}

const ShowcaseColorContext = createContext<ShowcaseColorContextValue | null>(null);

/**
 * Holds the accent color for a whole docs page. Every `ExampleShowcase` on the
 * page reads and writes this one value, and only the first one to render draws
 * the control — so a page has a single picker at the top that repaints every
 * preview below it instead of one picker per section.
 */
export function ShowcaseColorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [color, setColor] = useState(DEFAULT_SHOWCASE_COLOR);
  const pickerOwnerRef = useRef<string | null>(null);

  useEffect(() => {
    pickerOwnerRef.current = null;
    setColor(DEFAULT_SHOWCASE_COLOR);
  }, [pathname]);

  const claimPicker = useCallback((id: string) => {
    if (pickerOwnerRef.current === null) pickerOwnerRef.current = id;
    return pickerOwnerRef.current === id;
  }, []);

  const value = useMemo(
    () => ({ color, setColor, claimPicker }),
    [color, claimPicker],
  );

  return (
    <ShowcaseColorContext.Provider value={value}>{children}</ShowcaseColorContext.Provider>
  );
}

/** Null outside the docs layout, where a showcase falls back to local state. */
export function useShowcaseColorContext() {
  return useContext(ShowcaseColorContext);
}
