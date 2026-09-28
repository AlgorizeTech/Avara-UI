'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import { THEME_PRESETS } from '@/lib/theme-presets';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
export function ThemePresetSelector() {
  const { activePreset, applyPreset, currentMode, hydrated } = useThemeCustomizer();

  const isCustom = hydrated && activePreset === 'custom';

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
          Theme Presets
        </span>
        {isCustom && (
          <span className="text-[10px] font-semibold leading-4 px-1.5 rounded-md bg-primary/15 text-primary">
            Custom
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {THEME_PRESETS.map((preset) => {
          const isActive = hydrated && activePreset === preset.name;
          // The server can't know the reader's mode and renders dark; until
          // hydration is done the swatches match it, or React keeps the
          // server's inline colours (it never patches mismatched attributes).
          const presetColors = preset.colors[hydrated ? currentMode : 'dark'];
          const previewColors = [
            presetColors['primary'],
            presetColors['secondary'],
            presetColors['accent'],
            presetColors['background'],
          ];

          const primaryColor = presetColors['primary'];

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.name)}
              style={
                isActive
                  ? { borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}` }
                  : undefined
              }
              className={cn(
                "relative group flex flex-col justify-between p-2.5 rounded-lg border text-left transition-all duration-150 cursor-pointer h-[76px] focus:outline-none focus-visible:outline-none",
                isActive
                  ? "bg-card shadow-sm"
                  : "bg-foreground/[0.03] border-foreground/[0.06] hover:bg-foreground/[0.05] hover:border-foreground/10"
              )}
            >
              {/* Row of Color Swatches */}
              <div className="flex items-center gap-1">
                {previewColors.map((colorStr, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-[3px] border border-foreground/10 shrink-0"
                    style={{ backgroundColor: colorStr }}
                  />
                ))}
              </div>

              {/* Title & Checkmark */}
              <div className="flex items-center justify-between w-full mt-2">
                <span className={cn(
                  "text-[12px] font-medium leading-none transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/55 group-hover:text-foreground"
                )}>
                  {preset.label}
                </span>

                {isActive && (
                  <Check
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: primaryColor }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
