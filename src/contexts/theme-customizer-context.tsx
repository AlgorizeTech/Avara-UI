"use client";

/**
 * ThemeCustomizerProvider — manages full CSS variable customization.
 *
 * This is a separate context from the existing ThemeContextProvider.
 * It handles all 19 color tokens + border radius + preset management,
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
} from "@/lib/theme-presets";

// ─── Types ───────────────────────────────────────────────────────

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
  generateCSS: () => string;
  // Current mode awareness
  currentMode: "light" | "dark";
}

const STORAGE_KEY = "theme-customizer-state";

// ─── Helpers ─────────────────────────────────────────────────────

function getDefaultPreset(): ThemePreset {
  return (
    THEME_PRESETS.find((p) => p.name === DEFAULT_PRESET) ?? THEME_PRESETS[0]
  );
}

function getInitialState(): ThemeCustomizerState {
  const preset = getDefaultPreset();
  return {
    colors: {
      light: { ...preset.colors.light },
      dark: { ...preset.colors.dark },
    },
    radius: 0.625,
    activePreset: DEFAULT_PRESET,
  };
}

function loadState(): ThemeCustomizerState {
  if (typeof window === "undefined") return getInitialState();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ThemeCustomizerState;
      // Validate that all tokens exist
      const hasAllTokens = COLOR_TOKENS.every(
        (t) => t in parsed.colors.light && t in parsed.colors.dark
      );
      if (hasAllTokens && typeof parsed.radius === "number") {
        return parsed;
      }
    }
  } catch {
    // Corrupted data, use defaults
  }
  return getInitialState();
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

  // Inject radius
  root.style.setProperty("--radius", `${radius}rem`);
}

function clearInjectedCSS() {
  const root = document.documentElement;
  for (const token of COLOR_TOKENS) {
    root.style.removeProperty(`--${token}`);
  }
  root.style.removeProperty("--radius");
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
  const { theme, resolvedTheme } = useTheme();
  const [activeMode, setActiveMode] = useState<"light" | "dark">("dark");

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

  // Re-inject CSS variables whenever state or mode changes
  useEffect(() => {
    if (!hydrated) return;
    const modeColors = state.colors[currentMode];
    injectCSSVariables(modeColors, state.radius);
    saveState(state);
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
      return state.colors[mode][token] ?? "";
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
      colors: {
        light: { ...preset.colors.light },
        dark: { ...preset.colors.dark },
      },
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

  const generateCSS = useCallback((): string => {
    const indent = "  ";
    const lightVars = COLOR_TOKENS.map(
      (token) => `${indent}--${token}: ${state.colors.light[token]};`
    ).join("\n");

    const darkVars = COLOR_TOKENS.map(
      (token) => `${indent}--${token}: ${state.colors.dark[token]};`
    ).join("\n");

    const themeBlock = `@theme inline {\n  --radius-xs: min(calc(var(--radius) - 6px), var(--radius));\n  --radius-sm: min(calc(var(--radius) - 4px), var(--radius));\n  --radius-md: min(calc(var(--radius) - 2px), var(--radius));\n  --radius-lg: var(--radius);\n  --radius-xl: calc(var(--radius) + 4px);\n  --radius-2xl: calc(var(--radius) * 1.5);\n  --radius-3xl: calc(var(--radius) * 2);\n  --radius: var(--radius);\n  --color-background: var(--background);\n  --color-foreground: var(--foreground);\n  --color-card: var(--card);\n  --color-card-foreground: var(--card-foreground);\n  --color-popover: var(--popover);\n  --color-popover-foreground: var(--popover-foreground);\n  --color-primary: var(--primary);\n  --color-primary-foreground: var(--primary-foreground);\n  --color-secondary: var(--secondary);\n  --color-secondary-foreground: var(--secondary-foreground);\n  --color-muted: var(--muted);\n  --color-muted-foreground: var(--muted-foreground);\n  --color-accent: var(--accent);\n  --color-accent-foreground: var(--accent-foreground);\n  --color-destructive: var(--destructive);\n  --color-border: var(--border);\n  --color-input: var(--input);\n  --color-ring: var(--ring);\n}`;

    return `@import "tailwindcss";\n\n:root {\n${lightVars}\n${indent}--radius: ${state.radius}rem;\n}\n\n.dark {\n${darkVars}\n${indent}--radius: ${state.radius}rem;\n}\n\n${themeBlock}`;
  }, [state]);

  // ─── Memoized Value ──────────────────────────────────────────

  const value = useMemo<ThemeCustomizerContextValue>(
    () => ({
      state,
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
