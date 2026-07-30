"use client";

/**
 * Theme Customizer Sidebar — the main control panel on the /themes page.
 *
 * Sections: Mode Toggle, Preset Themes, Color Editors, Radius, Typography, Actions.
 */

import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { TOKEN_GROUPS, type ColorToken } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Monitor,
  Moon,
  RotateCcw,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ColorTokenPicker } from "./color-token-picker";
import { CSSExportDialog } from "./css-export-dialog";
import { FontFamilyControl } from "./font-family-control";
import { FontSizeControl } from "./font-size-control";
import { RadiusPicker } from "./radius-picker";
import { ThemePresetSelector } from "./theme-preset-selector";

// ─── Mode Toggle ─────────────────────────────────────────────────

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? theme ?? "system" : "system";

  const modes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className="space-y-2.5">
      <SectionLabel>Mode</SectionLabel>
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-muted/50 border border-border">
        {modes.map((mode) => {
          const active = current === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => setTheme(mode.value)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all cursor-pointer",
                active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <mode.icon className="h-3.5 w-3.5" />
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Collapsible Color Section ───────────────────────────────────

function ColorSection({
  label,
  tokens,
  mode,
  defaultOpen = false,
}: {
  label: string;
  tokens: ColorToken[];
  mode: "light" | "dark";
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
          {tokens.map((token) => (
            <ColorTokenPicker key={token} token={token} mode={mode} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Label ───────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

// ─── Divider ─────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-border" />;
}

// ─── Main Sidebar Component ─────────────────────────────────────

export function ThemeCustomizerSidebar() {
  const { resetToDefaults, currentMode } = useThemeCustomizer();

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Customize
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pick a preset or fine-tune individual tokens
          </p>
        </div>

        {/* Mode */}
        <ModeToggle />

        <Divider />

        {/* Presets */}
        <div className="space-y-2.5">
          <SectionLabel>Theme</SectionLabel>
          <ThemePresetSelector />
        </div>

        <Divider />

        {/* Colors */}
        <div className="space-y-2.5">
          <SectionLabel>Colors</SectionLabel>
          <div className="space-y-2">
            {TOKEN_GROUPS.map((group, i) => (
              <ColorSection
                key={group.label}
                label={group.label}
                tokens={group.tokens}
                mode={currentMode}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>

        <Divider />

        {/* Radius */}
        <div className="space-y-2.5">
          <SectionLabel>Radius</SectionLabel>
          <RadiusPicker />
        </div>

        <Divider />

        {/* Font Size */}
        <div className="space-y-2.5">
          <SectionLabel>Font Size</SectionLabel>
          <FontSizeControl />
        </div>

        <Divider />

        {/* Font Family */}
        <div className="space-y-2.5">
          <SectionLabel>Font Family</SectionLabel>
          <FontFamilyControl />
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="border-t border-border p-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm">
        <CSSExportDialog />
        <button
          onClick={resetToDefaults}
          className="flex items-center justify-center gap-1.5 h-9 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
}
