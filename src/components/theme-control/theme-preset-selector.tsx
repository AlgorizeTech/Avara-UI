'use client';

import * as React from 'react';
import { useThemeCustomizer } from '@/contexts/theme-customizer-context';
import { THEME_PRESETS } from '@/lib/theme-presets';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export function ThemePresetSelector() {
  const { activePreset, applyPreset, currentMode } = useThemeCustomizer();

  const isCustom = activePreset === 'custom';

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Theme Presets
        </span>
        {isCustom && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            Custom
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {THEME_PRESETS.map((preset) => {
          const isActive = activePreset === preset.name;
          const presetColors = preset.colors[currentMode];
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
                "relative group flex flex-col justify-between p-2.5 rounded-lg border text-left transition-all duration-150 cursor-pointer h-[76px]",
                isActive
                  ? "bg-white dark:bg-zinc-900 shadow-sm"
                  : "bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700"
              )}
            >
              {/* Row of Color Swatches */}
              <div className="flex items-center gap-1">
                {previewColors.map((colorStr, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-[3px] border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: colorStr }}
                  />
                ))}
              </div>

              {/* Title & Checkmark */}
              <div className="flex items-center justify-between w-full mt-2">
                <span className={cn(
                  "text-[11.5px] font-medium leading-none",
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
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
