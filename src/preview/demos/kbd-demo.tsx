"use client";

import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function KbdDemo({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-8 relative z-10">
      {/* Combinations Example */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-zinc-500 mb-2">Common Combinations</p>
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <span className="text-sm">Save file:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>⌘</Kbd>
            <Kbd size={size}>S</Kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <span className="text-sm">Force Reload:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>⇧</Kbd>
            <Kbd size={size}>⌘</Kbd>
            <Kbd size={size}>R</Kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <span className="text-sm">Open Terminal:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>Ctrl</Kbd>
            <span className="text-xs text-zinc-400">+</span>
            <Kbd size={size}>~</Kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
