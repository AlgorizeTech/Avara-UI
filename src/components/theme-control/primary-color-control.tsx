"use client";

import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { THEME_PRESETS } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

export function PrimaryColorControl() {
  const { activePreset, applyPreset, currentMode } = useThemeCustomizer();

  return (
    <div className="space-y-3 relative">
      <p className="text-sm font-medium">Theme Presets</p>
      <div className="flex flex-wrap gap-2">
        {THEME_PRESETS.map((preset) => {
          const isActive = activePreset === preset.name;
          const color = preset.colors[currentMode]["primary"];
          return (
            <div
              key={preset.name}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg border-2 p-0.5 cursor-pointer transition-all shrink-0",
                isActive
                  ? "border-primary/30 scale-105 shadow-sm bg-accent/30"
                  : "border-transparent hover:border-muted-foreground/30",
              )}
              onClick={() => applyPreset(preset.name)}
              title={preset.label}
            >
              <span
                className="w-full h-full rounded-md shadow-sm"
                style={{ backgroundColor: color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
