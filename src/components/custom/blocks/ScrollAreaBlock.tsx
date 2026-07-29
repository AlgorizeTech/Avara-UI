"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

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

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    thumb: "var(--primary)",
    thumbHover: "var(--primary)",
    track: "rgba(var(--primary), 0.1)",
  },
  indigo: {
    thumb: "#4f46e5",
    thumbHover: "#4338ca",
    track: "rgba(79, 70, 229, 0.1)",
  },
  rose: {
    thumb: "#e11d48",
    thumbHover: "#be123c",
    track: "rgba(225, 29, 72, 0.1)",
  },
  emerald: {
    thumb: "#10b981",
    thumbHover: "#059669",
    track: "rgba(16, 185, 129, 0.1)",
  },
  zinc: {
    thumb: "#52525b",
    thumbHover: "#3f3f46",
    track: "rgba(113, 113, 122, 0.1)",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      style: {
        "--scroll-thumb": color,
        "--scroll-thumb-hover": `rgba(${rgb}, 0.8)`,
        "--scroll-track": `rgba(${rgb}, 0.1)`,
      } as React.CSSProperties,
    };
  }
  const theme = colorThemes[color] || colorThemes.primary;
  return {
    style: {
      "--scroll-thumb": theme.thumb,
      "--scroll-thumb-hover": theme.thumbHover,
      "--scroll-track": theme.track,
    } as React.CSSProperties,
  };
};

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

    // Generate dynamic class name to avoid conflicts if multiple variants exist on one page
    const uniqueClass = `custom-scroll-${variant}-${orientation}`;

    const variantStyles = {
      default: {
        width: "8px",
        height: "8px",
        radius: "8px",
        border: "2px solid transparent",
      },
      minimal: {
        width: "4px",
        height: "4px",
        radius: "4px",
        border: "none",
      },
      glass: {
        width: "10px",
        height: "10px",
        radius: "10px",
        border: "2px solid transparent",
      },
    };

    const v = variantStyles[variant];

    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
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
            height: ${v.height};
          }
          .${uniqueClass}::-webkit-scrollbar-track {
            background: ${hideTrack ? "transparent" : variant === "glass" ? "rgba(255,255,255,0.05)" : "var(--scroll-track)"};
            border-radius: ${v.radius};
            backdrop-filter: ${variant === "glass" ? "blur(8px)" : "none"};
          }
          .${uniqueClass}::-webkit-scrollbar-thumb {
            background-color: var(--scroll-thumb);
            border-radius: ${v.radius};
            border: ${v.border};
            background-clip: padding-box;
          }
          .${uniqueClass}::-webkit-scrollbar-thumb:hover {
            background-color: var(--scroll-thumb-hover);
          }

          /* Firefox standard */
          .${uniqueClass} {
            scrollbar-width: ${variant === "minimal" ? "thin" : "auto"};
            scrollbar-color: var(--scroll-thumb) ${hideTrack ? "transparent" : "var(--scroll-track)"};
          }

          /* Auto-Hide Logic for Webkit */
          .auto-hide-scroll::-webkit-scrollbar-thumb {
            background-color: transparent;
            transition: background-color 0.3s;
          }
          .auto-hide-scroll:hover::-webkit-scrollbar-thumb {
            background-color: var(--scroll-thumb);
          }
        `}</style>
        {children}
      </div>
    );
  },
);
ScrollAreaBlock.displayName = "ScrollAreaBlock";
