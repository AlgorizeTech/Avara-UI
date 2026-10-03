"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { LanguageType } from "@/components/site/code-copy";

/**
 * The language code panels are shown in: TypeScript or the JavaScript the
 * TSX→JSX transform strips it to.
 *
 * Like the motion library it changes only what is SHOWN, so it lives in a
 * context and localStorage. One pick then follows the reader across every
 * Sandbox Usage/Code tab and standalone code block, on this page and the next.
 */
export const DEFAULT_CODE_LANGUAGE: LanguageType = "tsx";

const STORAGE_KEY = "code-language";

const isLanguageType = (value: unknown): value is LanguageType =>
  value === "tsx" || value === "jsx";

interface CodeLanguageContextValue {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const CodeLanguageContext = createContext<CodeLanguageContextValue | null>(null);

export function CodeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>(DEFAULT_CODE_LANGUAGE);

  // Read after mount so the server render and first paint always show the
  // default; a saved JavaScript pick swaps in on the next frame.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLanguageType(stored)) setLanguageState(stored);
    } catch {
      // Storage blocked (private mode, sandboxed frame) — keep the default.
    }
  }, []);

  const setLanguage = useCallback((next: LanguageType) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted, but the page still follows the pick.
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return (
    <CodeLanguageContext.Provider value={value}>{children}</CodeLanguageContext.Provider>
  );
}

/**
 * The reader's pick. Outside the docs layout there is no provider, so the
 * caller keeps a pick of its own for as long as it is mounted.
 */
export function useCodeLanguage(): CodeLanguageContextValue {
  const context = useContext(CodeLanguageContext);
  const [language, setLanguage] = useState<LanguageType>(DEFAULT_CODE_LANGUAGE);
  return context ?? { language, setLanguage };
}
