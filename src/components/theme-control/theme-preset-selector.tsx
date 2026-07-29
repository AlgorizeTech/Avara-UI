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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        {isCustom && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            Custom
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {THEME_PRESETS.map((preset) => {
          const isActive = activePreset === preset.name;
          const presetColors = preset.colors[currentMode];
          const previewColors = [
            presetColors['primary'],
            presetColors['secondary'],
            presetColors['accent'],
            presetColors['background'],
            presetColors['muted'],
          ];

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.name)}
              className={cn(
                "relative group flex flex-col p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer",
                "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
                isActive
                  ? "bg-zinc-50 border-zinc-900 shadow-sm dark:bg-zinc-900 dark:border-zinc-300"
                  : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
              )}
            >
              <div className="flex -space-x-1 mb-2.5">
                {previewColors.map((colorStr, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-4 h-4 rounded-full border shadow-sm ring-1 ring-white dark:ring-zinc-950",
                      i === 3 ? "border-zinc-300 dark:border-zinc-700" : "border-transparent"
                    )}
                    style={{
                      backgroundColor: colorStr,
                      zIndex: 5 - i,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between w-full">
                <span className={cn(
                  "text-xs font-medium",
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                )}>
                  {preset.label}
                </span>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
