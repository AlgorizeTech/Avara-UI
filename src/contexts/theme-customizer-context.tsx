"use client";

/**
 * ThemeCustomizerProvider — manages full CSS variable customization.
 *
 * This is a separate context from the existing ThemeContextProvider.
 * It handles all 32 shadcn color tokens (core, chart, sidebar) + border radius
 * + preset management,
 * persisting to localStorage and injecting CSS variables onto <html>.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import {
  type ColorToken,
  type ThemePreset,
  COLOR_TOKENS,
  THEME_PRESETS,
  DEFAULT_PRESET,
  THEME_CUSTOMIZER_STORAGE_KEY,
  resolvePresetColors,
} from "@/lib/theme-presets";
import { buildThemeCss, type ExportMode } from "@/lib/theme-css";

// ─── Types ───────────────────────────────────────────────────────

export type { ExportMode };

export interface ThemeCustomizerState {
  colors: {
    light: Record<ColorToken, string>;
    dark: Record<ColorToken, string>;
  };
  radius: number;
  activePreset: string;
}

interface ThemeCustomizerContextValue {
  state: ThemeCustomizerState;
  hydrated: boolean;
  // Color manipulation
  setColorToken: (
    mode: "light" | "dark",
    token: ColorToken,
    value: string
  ) => void;
  getColorToken: (mode: "light" | "dark", token: ColorToken) => string;
  // Radius
  setRadius: (value: number) => void;
  // Presets
  applyPreset: (presetName: string) => void;
  activePreset: string;
  // Actions
  resetToDefaults: () => void;
  generateCSS: (exportMode?: ExportMode) => string;
  // Current mode awareness
  currentMode: "light" | "dark";
}

// Shared with ThemeInitScript, which reads the same key before first paint.
const STORAGE_KEY = THEME_CUSTOMIZER_STORAGE_KEY;

// ─── Helpers ─────────────────────────────────────────────────────

function getDefaultPreset(): ThemePreset {
  return (
    THEME_PRESETS.find((p) => p.name === DEFAULT_PRESET) ?? THEME_PRESETS[0]
  );
}

function presetColors(preset: ThemePreset): ThemeCustomizerState["colors"] {
  return {
    light: resolvePresetColors(preset.colors.light, "light"),
    dark: resolvePresetColors(preset.colors.dark, "dark"),
  };
}

function getInitialState(): ThemeCustomizerState {
  return {
    radius: 0.625,
    activePreset: DEFAULT_PRESET,
    colors: presetColors(getDefaultPreset()),
  };
}

function loadState(): ThemeCustomizerState {
  if (typeof window === "undefined") return getInitialState();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ThemeCustomizerState;
      // A named preset is re-resolved from its current definition rather than
      // trusted from storage: the stored colours are a snapshot from whenever
      // the reader last visited, and once a preset's palette is edited in code
      // every returning reader would otherwise be pinned to the old one. Only
      // "custom" carries colours the reader actually chose. An empty name is
      // a reader who never picked anything — state used to be saved that way —
      // so they follow the current default rather than a snapshot of the old.
      const preset =
        parsed.activePreset !== "custom"
          ? THEME_PRESETS.find(
              (p) => p.name === (parsed.activePreset || DEFAULT_PRESET),
            )
          : undefined;
      if (preset && typeof parsed.radius === "number") {
        return {
          radius: parsed.radius,
          activePreset: preset.name,
          colors: presetColors(preset),
        };
      }
      // A preset that has since been removed: fall back to the default rather
      // than keep a snapshot no preset card matches.
      if (parsed.activePreset !== "custom") {
        return {
          ...getInitialState(),
          radius:
            typeof parsed.radius === "number"
              ? parsed.radius
              : getInitialState().radius,
        };
      }
      // Validate that all tokens exist
      const hasAllTokens = COLOR_TOKENS.every(
        (t) => t in parsed.colors.light && t in parsed.colors.dark
      );
      if (hasAllTokens && typeof parsed.radius === "number") {
        return parsed;
      }
      // State saved before the chart/sidebar tokens existed: keep the user's
      // colors and derive the missing tokens from them, rather than throwing
      // the whole customization away.
      if (
        parsed.colors?.light &&
        parsed.colors?.dark &&
        typeof parsed.radius === "number"
      ) {
        return {
          ...parsed,
          colors: {
            light: resolvePresetColors(parsed.colors.light, "light"),
            dark: resolvePresetColors(parsed.colors.dark, "dark"),
          },
        };
      }
    }
  } catch {
    // Corrupted data, use defaults
  }
  return getInitialState();
}

/**
 * Read the mode ThemeInitScript already committed to <html> rather than
 * defaulting to "dark". next-themes resolves `resolvedTheme` in its own mount
 * effect, which runs *after* this provider's — so a light-mode reader would
 * otherwise get one commit of dark colors injected before the sync catches up.
 */
function getInitialMode(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function saveState(state: ThemeCustomizerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded, silently fail
  }
}

// ─── CSS Variable Injection ─────────────────────────────────────

function injectCSSVariables(
  colors: Record<ColorToken, string>,
  radius: number
) {
  const root = document.documentElement;

  // Inject all color tokens
  for (const token of COLOR_TOKENS) {
    if (colors[token]) {
      root.style.setProperty(`--${token}`, colors[token]);
    }
  }

  // Inject radius. At 0 the flag also squares every corner (see the
  // `[data-radius-zero]` rule in globals.css).
  root.style.setProperty("--radius", `${radius}rem`);
  root.toggleAttribute("data-radius-zero", radius === 0);
}

function clearInjectedCSS() {
  const root = document.documentElement;
  for (const token of COLOR_TOKENS) {
    root.style.removeProperty(`--${token}`);
  }
  root.style.removeProperty("--radius");
  root.removeAttribute("data-radius-zero");
}

// ─── Context ─────────────────────────────────────────────────────

const ThemeCustomizerContext =
  createContext<ThemeCustomizerContextValue | null>(null);

export function ThemeCustomizerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<ThemeCustomizerState>(getInitialState);
  const [hydrated, setHydrated] = useState(false);
  const { resolvedTheme } = useTheme();
  const [activeMode, setActiveMode] = useState<"light" | "dark">(getInitialMode);

  // Keep activeMode strictly synced with resolvedTheme
  useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setActiveMode(resolvedTheme);
    }
  }, [resolvedTheme]);

  const currentMode: "light" | "dark" = activeMode;

  // Hydrate from localStorage on mount
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setHydrated(true);
  }, []);

  // The docs previews are same-origin iframes running their own copy of this
  // provider, and each only reads localStorage once, on mount. A `storage`
  // event fires in every *other* same-origin document when the key changes, so
  // this is what carries a sidebar edit into previews that are already open —
  // without it they keep whatever palette they booted with until reloaded.
  useEffect(() => {
    // e.key is null on localStorage.clear(), which we also want to follow.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      const next = loadState();
      // Bail out when nothing actually changed. Re-injecting also re-saves,
      // which would fire another storage event back the other way and ping-pong
      // between the parent and its frames; keeping `prev` stops the render.
      setState((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Re-inject CSS variables whenever state or mode changes
  useEffect(() => {
    if (!hydrated) return;
    const modeColors = state.colors[currentMode];
    injectCSSVariables(modeColors, state.radius);
    if (window.parent === window) {
      saveState(state);
    }
  }, [state, currentMode, hydrated]);

  // ─── Actions ─────────────────────────────────────────────────

  const setColorToken = useCallback(
    (mode: "light" | "dark", token: ColorToken, value: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          activePreset: "custom",
          colors: {
            ...prev.colors,
            [mode]: {
              ...prev.colors[mode],
              [token]: value,
            },
          },
        };
        saveState(next);
        return next;
      });
    },
    []
  );

  const getColorToken = useCallback(
    (mode: "light" | "dark", token: ColorToken): string => {
      return state.colors?.[mode]?.[token] ?? "";
    },
    [state.colors]
  );

  const setRadius = useCallback((value: number) => {
    setState((prev) => {
      const next = {
        ...prev,
        radius: value,
        activePreset: prev.activePreset === "custom" ? "custom" : prev.activePreset,
      };
      saveState(next);
      return next;
    });
  }, []);

  const applyPreset = useCallback((presetName: string) => {
    const preset = THEME_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;

    const nextState: ThemeCustomizerState = {
      radius: state.radius,
      activePreset: presetName,
      colors: presetColors(preset),
    };

    saveState(nextState);
    setState(nextState);
  }, [state.radius]);

  const resetToDefaults = useCallback(() => {
    clearInjectedCSS();
    const initial = getInitialState();
    setState(initial);
    saveState(initial);
  }, []);

  const generateCSS = useCallback(
    (exportMode: ExportMode = "both"): string => buildThemeCss(state, exportMode),
    [state],
  );

  // ─── Memoized Value ──────────────────────────────────────────

  const value = useMemo<ThemeCustomizerContextValue>(
    () => ({
      state,
      hydrated,
      setColorToken,
      getColorToken,
      setRadius,
      applyPreset,
      activePreset: state.activePreset,
      resetToDefaults,
      generateCSS,
      currentMode,
    }),
    [
      state,
      hydrated,
      setColorToken,
      getColorToken,
      setRadius,
      applyPreset,
      resetToDefaults,
      generateCSS,
      currentMode,
    ]
  );

  return (
    <ThemeCustomizerContext.Provider value={value}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext);
  if (!context) {
    throw new Error(
      "useThemeCustomizer must be used within a ThemeCustomizerProvider"
    );
  }
  return context;
}
