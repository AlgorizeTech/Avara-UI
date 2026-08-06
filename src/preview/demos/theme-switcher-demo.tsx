"use client";

import {
  ThemeSwitcher,
  ThemeVariant,
} from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function ThemeSwitcherDemo({
  variant = "pill",
}: {
  variant?: ThemeVariant;
}) {
  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden">
      {/* Render the component based on active state */}
      <div className="flex flex-col items-center gap-8">
        <ThemeSwitcher variant={variant} />

        {/* Helper text for the dropdown specifically */}
        {variant === "dropdown" && (
          <span className="text-xs text-zinc-400 font-medium">
            Click to open menu
          </span>
        )}
      </div>
    </div>
  );
}
