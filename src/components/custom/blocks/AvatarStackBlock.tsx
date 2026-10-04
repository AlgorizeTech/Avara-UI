"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

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
  /** Whether to show a tooltip with the avatar's alt text on hover. Defaults to true. */
  showTooltip?: boolean;
  /** Alias for showTooltip. */
  tooltip?: boolean;
}

const SIZES: Record<AvatarStackSize, { box: string; overlap: string; text: string }> = {
  sm: { box: "size-7", overlap: "-space-x-2", text: "text-[10px]" },
  md: { box: "size-9", overlap: "-space-x-2.5", text: "text-[11px]" },
  lg: { box: "size-11", overlap: "-space-x-3", text: "text-xs" },
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src: string;
  alt?: string;
  size?: AvatarStackSize;
  /** Colour of the ring around the face — match the surface it sits on. */
  ringClassName?: string;
}

/**
 * One face, the same disc the stack is built from. A span, so it can sit
 * inline in running text — a byline, a credit, a "made with" line.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt = "", size = "md", ringClassName = "ring-background", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-muted ring-2",
        SIZES[size].box,
        ringClassName,
        className,
      )}
      {...props}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </span>
  ),
);
Avatar.displayName = "Avatar";

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      avatars,
      size = "md",
      max = 4,
      ringClassName = "ring-background",
      action,
      spreadOnHover = true,
      liftOnHover = true,
      showTooltip = true,
      tooltip = true,
      className,
      ...props
    },
    ref,
  ) => {
    const s = SIZES[size];
    const shown = avatars.slice(0, max);
    const rest = avatars.length - shown.length;
    const enableTooltip = showTooltip && tooltip;
    // Layering comes from `--as-z` so a hover class can still win over it.
    const disc = cn(
      "relative z-[var(--as-z)] grid shrink-0 place-items-center overflow-hidden rounded-full ring-2 transition-transform duration-300 ease-out cursor-pointer",
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
        {shown.map((a, i) => {
          const avatarElement = (
            <span
              key={a.src}
              className={cn(disc, "bg-muted")}
              // Each face slides a touch further than the last, so the row fans out.
              style={{ "--as-shift": `${i * 3}px`, "--as-z": shown.length - i } as React.CSSProperties}
            >
              <img src={a.src} alt={a.alt ?? ""} className="h-full w-full object-cover" />
            </span>
          );

          if (enableTooltip && a.alt) {
            return (
              <Tooltip key={a.src}>
                <TooltipTrigger asChild>{avatarElement}</TooltipTrigger>
                <TooltipContent side="top">{a.alt}</TooltipContent>
              </Tooltip>
            );
          }

          return avatarElement;
        })}
        {rest > 0 && (
          <span
            className={cn(disc, "bg-primary font-semibold text-primary-foreground", s.text)}
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
