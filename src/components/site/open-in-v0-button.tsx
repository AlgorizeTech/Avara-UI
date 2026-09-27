"use client";

import { useEffect, useState } from "react";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { DEFAULT_PRESET, FONT_FAMILY_STORAGE_KEY } from "@/lib/theme-presets";
import { isDefaultAccent } from "@/lib/accent";
import { V0_FALLBACK_ORIGIN, openInV0Url, type V0Theme } from "@/lib/open-in-v0";
import v0Items from "@/preview/v0-items.json";

/** Preview name → example id → the v0 chat title. */
const ITEMS = v0Items as Record<string, Record<string, string>>;

/** The v0 item key for one showcase example, or undefined when none was built. */
export function v0ItemFor(previewName: string, exampleId: string): string | undefined {
  return ITEMS[previewName]?.[exampleId] ? `${previewName}/${exampleId}` : undefined;
}

/** The endpoint lives on the deployment; a local page borrows production's. */
function useEndpointOrigin() {
  const [origin, setOrigin] = useState(V0_FALLBACK_ORIGIN);
  useEffect(() => {
    const { hostname, origin: own } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") setOrigin(own);
  }, []);
  return origin;
}

/** The customizer's font pick lives in localStorage, outside its context. */
function useFontOverride() {
  const [font, setFont] = useState<string>();
  useEffect(() => {
    const read = () => {
      try {
        setFont(localStorage.getItem(FONT_FAMILY_STORAGE_KEY) ?? undefined);
      } catch {
        setFont(undefined);
      }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  return font;
}

/**
 * Opens the example in a new v0 chat: the preview's own code, props and
 * variant (built per example), in the theme the reader is looking at.
 */
export function OpenInV0Button({
  item,
  accent,
  className,
}: {
  /** `<preview name>/<example id>` — see v0ItemFor. */
  item: string;
  /** The page colour-picker value the preview is showing. */
  accent?: string;
  className?: string;
}) {
  const { state, currentMode } = useThemeCustomizer();
  const origin = useEndpointOrigin();
  const font = useFontOverride();
  const [previewName, exampleId] = item.split("/");
  const title = ITEMS[previewName]?.[exampleId];

  const theme: V0Theme = {
    preset: state.activePreset || DEFAULT_PRESET,
    colors: state.colors,
    radius: state.radius,
    accent: isDefaultAccent(accent) ? undefined : accent,
    mode: currentMode,
    font,
  };

  return (
    <a
      href={openInV0Url(origin, item, theme, title)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Open in v0"
      aria-label="Open in v0 (opens in a new tab)"
    >
      <svg viewBox="0 0 40 20" fill="none" aria-hidden="true" className="h-2.5 w-5">
        <path
          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
          fill="currentColor"
        />
        <path
          d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
