"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { getThemeStyles } from "./scroll-area-theme";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type ScrollAreaVariant = "default" | "minimal" | "glass";
export type ScrollAreaColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

// ==========================================
// SCROLL AREA COMPONENT
// ==========================================
export interface ScrollAreaBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: ScrollAreaColor;
  variant?: ScrollAreaVariant;
  orientation?: "vertical" | "horizontal" | "both";
  hideTrack?: boolean;
  autoHide?: boolean;
}

export const ScrollAreaBlock = forwardRef<HTMLDivElement, ScrollAreaBlockProps>(
  (
    {
      children,
      color = "primary",
      variant = "default",
      orientation = "vertical",
      hideTrack = false,
      autoHide = false,
      className,
      ...props
    },
    ref,
  ) => {
    const { style } = getThemeStyles(color as string);

    const instanceId = React.useId().replace(/:/g, "");
    const uniqueClass = `custom-scroll-${instanceId}`;

    const variantStyles = {
      default: {
        width: "10px",
        height: "12px",
        radius: "8px",
        border: "2px solid transparent",
      },
      minimal: {
        width: "6px",
        height: "8px",
        radius: "4px",
        border: "none",
      },
      glass: {
        width: "12px",
        height: "14px",
        radius: "10px",
        border: "2px solid transparent",
      },
    };

    const v = variantStyles[variant];

    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-auto",
      both: "overflow-auto",
    }[orientation];

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          overflowClass,
          uniqueClass,
          autoHide && "auto-hide-scroll",
          className,
        )}
        style={style}
        {...props}
      >
        <style>{`
          /* Webkit Browsers (Chrome, Safari, Edge) */
          .${uniqueClass}::-webkit-scrollbar {
            width: ${v.width};
            height: 7px !important;
            display: block !important;
          }
          .${uniqueClass}::-webkit-scrollbar:horizontal {
            height: 7px !important;
            display: block !important;
          }
          .${uniqueClass}::-webkit-scrollbar-track {
            background-color: ${hideTrack ? "transparent" : variant === "glass" ? "rgba(255,255,255,0.12)" : "rgba(228, 228, 231, 0.7)"} !important;
            border-radius: ${v.radius};
            display: block !important;
          }
          .dark .${uniqueClass}::-webkit-scrollbar-track {
            background-color: ${hideTrack ? "transparent" : variant === "glass" ? "rgba(255,255,255,0.12)" : "rgba(39, 39, 42, 0.7)"} !important;
          }
          .${uniqueClass}::-webkit-scrollbar-thumb {
            background-color: var(--scroll-thumb, #71717a) !important;
            border-radius: ${v.radius};
            min-width: 40px !important;
            display: block !important;
          }
          .${uniqueClass}::-webkit-scrollbar-thumb:hover {
            background-color: var(--scroll-thumb-hover, #52525b) !important;
          }

          /* Firefox standard */
          .${uniqueClass} {
            scrollbar-width: auto !important;
            scrollbar-color: var(--scroll-thumb, #71717a) ${hideTrack ? "transparent" : "var(--scroll-track, rgba(161, 161, 170, 0.25))"} !important;
          }

          /* Auto-Hide Logic for Webkit */
          .auto-hide-scroll::-webkit-scrollbar-thumb {
            background-color: transparent !important;
            transition: background-color 0.3s;
          }
          .auto-hide-scroll:hover::-webkit-scrollbar-thumb {
            background-color: var(--scroll-thumb, #71717a) !important;
          }
        `}</style>
        {children}
      </div>
    );
  },
);
ScrollAreaBlock.displayName = "ScrollAreaBlock";
