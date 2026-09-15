"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  applyFontFamily,
  FONT_FAMILY_STORAGE_KEY,
} from "@/hooks/use-google-fonts";

export const DEFAULT_PRIMARY_COLOR = "#6356d1";
export const DEFAULT_FONT_SIZE = "100";
/**
 * The body font (see src/assets/fonts). Also a Google font, but the default is
 * bundled via next/font, so picking it in the customizer clears the override
 * rather than loading it again. Headings stay in Cooper regardless.
 */
export const DEFAULT_FONT_FAMILY = "DM Sans";

type ThemeContextValue = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  dir: "ltr" | "rtl";
  setDir: (dir: "ltr" | "rtl") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState<string>(
    DEFAULT_PRIMARY_COLOR,
  );
  const [fontSize, setFontSize] = useState<string>(DEFAULT_FONT_SIZE);
  const [fontFamily, setFontFamily] = useState<string>(DEFAULT_FONT_FAMILY);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const storedFontSize = localStorage.getItem("fontSize");
    const storedFontFamily = localStorage.getItem(FONT_FAMILY_STORAGE_KEY);
    const storedDir = localStorage.getItem("dir") as "ltr" | "rtl" | null;
    const root = window.document.documentElement;

    if (storedFontSize) {
      setFontSize(storedFontSize);
      root.style.fontSize = storedFontSize + "%";
    }
    if (storedFontFamily) {
      setFontFamily(storedFontFamily);
      applyFontFamily(storedFontFamily);
    }
    if (storedDir) {
      setDir(storedDir);
      root.setAttribute("dir", storedDir);
    }
  }, []);



  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        dir,
        setDir,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );
  }
  return context;
}
