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
  /**
   * Horizontal areas only: a mouse wheel moves the content sideways, so
   * scrolling up/down pans left/right. The wheel is handed back to the page
   * once the area reaches either end. Default true.
   */
  wheelToHorizontal?: boolean;
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
      wheelToHorizontal = true,
      className,
      onScroll,
      ...props
    },
    ref,
  ) => {
    const { style } = getThemeStyles(color as string);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const scrollTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const nodeRef = React.useRef<HTMLDivElement | null>(null);

    const assignRef = (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    // Wheel → sideways pan. Registered natively with passive:false because
    // React's onWheel is passive and could not preventDefault the page scroll.
    React.useEffect(() => {
      const node = nodeRef.current;
      if (!node || orientation !== "horizontal" || !wheelToHorizontal) return;

      const onWheel = (e: WheelEvent) => {
        // A trackpad swipe or shift+wheel already scrolls sideways natively.
        if (e.shiftKey || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
        // deltaMode 1 = lines (Firefox); ~16px per line reads like Chrome.
        const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        const max = node.scrollWidth - node.clientWidth;
        if (max <= 0) return;
        const atStart = node.scrollLeft <= 0 && delta < 0;
        const atEnd = node.scrollLeft >= max - 1 && delta > 0;
        // At an edge, leave the wheel to the page so the user is never trapped.
        if (atStart || atEnd) return;
        e.preventDefault();
        node.scrollLeft += delta;
      };

      node.addEventListener("wheel", onWheel, { passive: false });
      return () => node.removeEventListener("wheel", onWheel);
    }, [orientation, wheelToHorizontal]);

    const instanceId = React.useId().replace(/:/g, "");
    const uniqueClass = `custom-scroll-${instanceId}`;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (autoHide) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
      onScroll?.(e);
    };

    React.useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    const variantStyles = {
      default: {
        width: "6px",
        height: "6px",
        radius: "9999px",
      },
      minimal: {
        width: "4px",
        height: "4px",
        radius: "9999px",
      },
      glass: {
        width: "7px",
        height: "7px",
        radius: "9999px",
      },
    };

    const v = variantStyles[variant] || variantStyles.default;

    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }[orientation];

    return (
      <div
        ref={assignRef}
        onScroll={handleScroll}
        className={cn(
          "relative",
          overflowClass,
          uniqueClass,
          autoHide && "auto-hide-scroll",
          isScrolling && "is-scrolling",
          className,
        )}
        style={style}
        {...props}
      >
        <style>{`
          /* Webkit Browsers (Chrome, Safari, Edge) */
          .${uniqueClass}::-webkit-scrollbar {
            width: ${v.width} !important;
            height: ${v.height} !important;
            display: block !important;
          }

          /* Light Mode Track & Thumb */
          .${uniqueClass}::-webkit-scrollbar-track {
            background-color: ${hideTrack ? "transparent" : variant === "glass" ? "rgba(0, 0, 0, 0.06)" : "var(--scroll-track, rgba(0, 0, 0, 0.05))"} !important;
            border-radius: ${v.radius};
            display: block !important;
            border: none !important;
            box-shadow: none !important;
          }
          .${uniqueClass}::-webkit-scrollbar-thumb {
            background-color: ${variant === "glass" ? "rgba(0, 0, 0, 0.35)" : "var(--scroll-thumb, rgba(0, 0, 0, 0.22))"} !important;
            border-radius: ${v.radius};
            min-height: 24px !important;
            min-width: 24px !important;
            display: block !important;
          }
          .${uniqueClass}::-webkit-scrollbar-thumb:hover {
            background-color: ${variant === "glass" ? "rgba(0, 0, 0, 0.55)" : "var(--scroll-thumb-hover, rgba(0, 0, 0, 0.4))"} !important;
          }

          /* Dark Mode Track & Thumb */
          .dark .${uniqueClass}::-webkit-scrollbar-track,
          html.dark .${uniqueClass}::-webkit-scrollbar-track,
          [data-theme="dark"] .${uniqueClass}::-webkit-scrollbar-track {
            background-color: ${hideTrack ? "transparent" : variant === "glass" ? "rgba(255, 255, 255, 0.12)" : "var(--scroll-track, rgba(255, 255, 255, 0.08))"} !important;
          }
          .dark .${uniqueClass}::-webkit-scrollbar-thumb,
          html.dark .${uniqueClass}::-webkit-scrollbar-thumb,
          [data-theme="dark"] .${uniqueClass}::-webkit-scrollbar-thumb {
            background-color: ${variant === "glass" ? "rgba(255, 255, 255, 0.45)" : "var(--scroll-thumb, rgba(255, 255, 255, 0.28))"} !important;
          }
          .dark .${uniqueClass}::-webkit-scrollbar-thumb:hover,
          html.dark .${uniqueClass}::-webkit-scrollbar-thumb:hover,
          [data-theme="dark"] .${uniqueClass}::-webkit-scrollbar-thumb:hover {
            background-color: ${variant === "glass" ? "rgba(255, 255, 255, 0.7)" : "var(--scroll-thumb-hover, rgba(255, 255, 255, 0.5))"} !important;
          }

          /* Firefox standard */
          .${uniqueClass} {
            scrollbar-width: thin !important;
            scrollbar-color: ${variant === "glass" ? "rgba(0, 0, 0, 0.35)" : "var(--scroll-thumb, rgba(0, 0, 0, 0.22))"} ${hideTrack ? "transparent" : "var(--scroll-track, rgba(0, 0, 0, 0.05))"} !important;
          }
          .dark .${uniqueClass},
          html.dark .${uniqueClass},
          [data-theme="dark"] .${uniqueClass} {
            scrollbar-color: ${variant === "glass" ? "rgba(255, 255, 255, 0.45)" : "var(--scroll-thumb, rgba(255, 255, 255, 0.28))"} ${hideTrack ? "transparent" : "var(--scroll-track, rgba(255, 255, 255, 0.08))"} !important;
          }

          /* Auto-Hide Logic: Hide when idle, show on hover/focus/scroll */
          .${uniqueClass}.auto-hide-scroll:not(:hover):not(:focus-within):not(.is-scrolling)::-webkit-scrollbar-thumb {
            background-color: transparent !important;
          }
          .${uniqueClass}.auto-hide-scroll:not(:hover):not(:focus-within):not(.is-scrolling)::-webkit-scrollbar-track {
            background-color: transparent !important;
          }
          .${uniqueClass}.auto-hide-scroll:not(:hover):not(:focus-within):not(.is-scrolling) {
            scrollbar-color: transparent transparent !important;
          }
        `}</style>
        {children}
      </div>
    );
  },
);
ScrollAreaBlock.displayName = "ScrollAreaBlock";
