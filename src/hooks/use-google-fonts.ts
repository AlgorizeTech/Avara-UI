"use client";

import { useEffect, useState } from "react";

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

export function loadGoogleFont(fontFamily: string | null | undefined) {
  // "Inter" is the docs project's optimized font via next/font — skip dynamic load
  if (!fontFamily || fontFamily === "Inter") return;
  if (typeof document === "undefined") return;
  const linkId = "dynamic-google-font";
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  const fontParam = fontFamily.replace(/ /g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@400;500;600;700&display=swap`;
}
