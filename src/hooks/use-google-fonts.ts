"use client";

import { useEffect, useState } from "react";
import { FONT_FAMILY_STORAGE_KEY } from "@/lib/theme-presets";

export const FALLBACK_FONTS = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Nunito",
  "Ubuntu",
  "Merriweather",
  "Playfair Display",
  "Source Sans 3",
  "PT Sans",
  "Noto Sans",
  "Work Sans",
  "DM Sans",
  "Quicksand",
  "Fira Sans",
  "Mulish",
];

const CACHE_KEY = "google-fonts-all";
const CACHE_TIMESTAMP_KEY = "google-fonts-all-timestamp";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

export type FontOption = { value: string; label: string };

function cacheToLocalStorage(fontList: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(fontList));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // localStorage quota exceeded or unavailable — ignore silently
  }
}

function toOptions(list: string[]): FontOption[] {
  return list.map((font) => ({ value: font, label: font }));
}

export function useGoogleFonts(): { fonts: FontOption[]; isLoading: boolean } {
  const [fonts, setFonts] = useState<FontOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      if (cacheAge < ONE_MONTH_MS) {
        try {
          const parsed = JSON.parse(cachedData) as string[];
          setFonts(toOptions(parsed));
          setIsLoading(false);
          return;
        } catch {
          // fall through to refetch
        }
      }
    }

    if (!apiKey) {
      cacheToLocalStorage(FALLBACK_FONTS);
      setFonts(toOptions(FALLBACK_FONTS));
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const params = new URLSearchParams({ key: apiKey });
        const res = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?${params.toString()}`,
        );
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as { items?: { family: string }[] };
        const fontList = data.items?.map((item) => item.family) ?? FALLBACK_FONTS;
        if (cancelled) return;
        cacheToLocalStorage(fontList);
        setFonts(toOptions(fontList));
      } catch {
        if (cancelled) return;
        cacheToLocalStorage(FALLBACK_FONTS);
        setFonts(toOptions(FALLBACK_FONTS));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { fonts, isLoading };
}

export { FONT_FAMILY_STORAGE_KEY };

const DYNAMIC_FONT_LINK_ID = "dynamic-google-font";

export function loadGoogleFont(fontFamily: string | null | undefined) {
  if (!fontFamily) return;
  if (typeof document === "undefined") return;
  let link = document.getElementById(DYNAMIC_FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = DYNAMIC_FONT_LINK_ID;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  // Keep this URL shape in sync with ThemeInitScript, which builds the same
  // link before first paint so the stylesheet is already in flight by now.
  const fontParam = fontFamily.replace(/ /g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@400;500;600;700&display=swap`;
}

/**
 * Override the site default font (Cooper) with a Google font, site-wide.
 * Tailwind's preflight puts `var(--font-sans)` on <html>, so an inline
 * `--font-sans` on <html> outranks the @theme default and every `font-sans`
 * utility follows along too.
 */
export function applyFontFamily(fontFamily: string) {
  loadGoogleFont(fontFamily);
  document.documentElement.style.setProperty(
    "--font-sans",
    `"${fontFamily}", sans-serif`,
  );
}

/** Drop the override so the site falls back to Cooper. */
export function clearFontFamily() {
  document.documentElement.style.removeProperty("--font-sans");
  document.getElementById(DYNAMIC_FONT_LINK_ID)?.remove();
}
