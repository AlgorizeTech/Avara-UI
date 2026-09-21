"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ==========================================
// AVATAR STACK
// A row of overlapping faces — the "people who…" cue under a headline or
// beside a count. Shows up to `max` faces, folds the rest into a "+N" disc,
// and takes an optional trailing action, like a follow button.
// ==========================================

export interface StackAvatar {
  src: string;
  alt?: string;
}

export type AvatarStackSize = "sm" | "md" | "lg";

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: StackAvatar[];
  size?: AvatarStackSize;
  /** Faces shown before the rest fold into a count. */
  max?: number;
  /** Colour of the gap between faces — match the surface they sit on. */
  ringClassName?: string;
  /** A trailing element that shares the stack's size, e.g. a "+" button. */
  action?: React.ReactNode;
  /** Faces slide apart a little when the stack is hovered. */
  spreadOnHover?: boolean;
  /** A hovered face rises above its neighbours and grows a touch, so it can be seen whole. */
  liftOnHover?: boolean;
}

const SIZES: Record<AvatarStackSize, { box: string; overlap: string; text: string }> = {
  sm: { box: "size-7", overlap: "-space-x-2", text: "text-[10px]" },
  md: { box: "size-9", overlap: "-space-x-2.5", text: "text-[11px]" },
  lg: { box: "size-11", overlap: "-space-x-3", text: "text-xs" },
};

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      avatars,
      size = "md",
      max = 4,
      ringClassName = "ring-white dark:ring-zinc-950",
      action,
      spreadOnHover = true,
      liftOnHover = true,
      className,
      ...props
    },
    ref,
  ) => {
    const s = SIZES[size];
    const shown = avatars.slice(0, max);
    const rest = avatars.length - shown.length;
    // Layering comes from `--as-z` so a hover class can still win over it.
    const disc = cn(
      "relative z-[var(--as-z)] grid shrink-0 place-items-center overflow-hidden rounded-full ring-2 transition-transform duration-300 ease-out",
      s.box,
      ringClassName,
      spreadOnHover && "group-hover:translate-x-[var(--as-shift)]",
      liftOnHover && "hover:z-50 hover:scale-115",
    );

    return (
      <div
        ref={ref}
        className={cn("group flex items-center", s.overlap, className)}
        {...props}
      >
        {shown.map((a, i) => (
          <span
            key={a.src}
            className={cn(disc, "bg-black/5")}
            // Each face slides a touch further than the last, so the row fans out.
            style={{ "--as-shift": `${i * 3}px`, "--as-z": shown.length - i } as React.CSSProperties}
          >
            <img src={a.src} alt={a.alt ?? ""} className="h-full w-full object-cover" />
          </span>
        ))}
        {rest > 0 && (
          <span
            className={cn(disc, "bg-[#141414] font-semibold text-white dark:bg-white dark:text-[#141414]", s.text)}
            style={{ "--as-shift": `${shown.length * 3}px`, "--as-z": 0 } as React.CSSProperties}
          >
            +{rest}
          </span>
        )}
        {action && (
          <span
            className={cn(disc, "overflow-visible ring-0")}
            style={{ "--as-shift": `${(shown.length + (rest > 0 ? 1 : 0)) * 3}px`, "--as-z": 0 } as React.CSSProperties}
          >
            {action}
          </span>
        )}
      </div>
    );
  },
);
AvatarStack.displayName = "AvatarStack";

export default AvatarStack;
