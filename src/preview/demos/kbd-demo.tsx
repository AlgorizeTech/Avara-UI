"use client";

import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function KbdDemo({
  size = "md",
  example,
}: {
  size?: "sm" | "md" | "lg";
  /** Single-example modes; omitted renders the shortcut combination list. */
  example?: "single" | "sizes" | "inline";
}) {
  if (example === "single") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <Kbd size={size}>⌘</Kbd>
      </div>
    );
  }

  // Scalar prop — every size shares a single frame.
  if (example === "sizes") {
    return (
      <div className="w-full flex items-center justify-center gap-4 min-h-[300px] relative z-10">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Kbd key={s} size={s}>
            ⌘
          </Kbd>
        ))}
      </div>
    );
  }

  if (example === "inline") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] px-6 relative z-10">
        <p className="max-w-sm text-center text-sm leading-7 text-foreground/80">
          Press <Kbd size={size}>⌘</Kbd> <Kbd size={size}>K</Kbd> to open the
          command palette, or <Kbd size={size}>Esc</Kbd> to dismiss it.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-8 relative z-10">
      {/* Combinations Example */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground mb-2">Common Combinations</p>
        <div className="flex items-center gap-2 text-foreground/80">
          <span className="text-sm">Save file:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>⌘</Kbd>
            <Kbd size={size}>S</Kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 text-foreground/80">
          <span className="text-sm">Force Reload:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>⇧</Kbd>
            <Kbd size={size}>⌘</Kbd>
            <Kbd size={size}>R</Kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 text-foreground/80">
          <span className="text-sm">Open Terminal:</span>
          <div className="flex items-center gap-1">
            <Kbd size={size}>Ctrl</Kbd>
            <span className="text-xs text-muted-foreground">+</span>
            <Kbd size={size}>~</Kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
