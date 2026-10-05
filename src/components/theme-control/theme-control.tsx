"use client";

import { GripVertical, MoveVertical, Palette, Settings, TimerReset } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/custom/ui/sheet";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  useThemeContext,
} from "@/contexts/theme-context";
import {
  clearFontFamily,
  FONT_FAMILY_STORAGE_KEY,
} from "@/hooks/use-google-fonts";

import { DarkModeControl } from "./darkmode-control";
import { FontFamilyControl } from "./font-family-control";
import { FontSizeControl } from "./font-size-control";
import { ThemePresetSelector } from "./theme-preset-selector";
import { RadiusPicker } from "./radius-picker";

type TriggerSide = "left" | "right";

const TRIGGER_SIDE_STORAGE_KEY = "themeControlSide";
const TRIGGER_OFFSET_STORAGE_KEY = "themeControlOffset";
// Pointer travel before a press counts as a drag rather than a click.
const DRAG_THRESHOLD = 4;
// How far one ArrowUp/ArrowDown press moves the tab along its edge.
const KEYBOARD_OFFSET_STEP = 0.05;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Where the customizer tab sits: always on the left or right edge, at any
 * height along it. The reader drags the tab anywhere; on release it snaps to
 * the nearer side edge and keeps the height it was dropped at. Both are
 * persisted. Until they pick, it follows the document direction and the
 * default height as before.
 */
function useTriggerPosition(dir: string) {
  const [storedSide, setStoredSide] = useState<TriggerSide | null>(null);
  // 0 = top of the viewport, 1 = bottom; null keeps the default height.
  const [offset, setOffsetState] = useState<number | null>(null);

  // Read after mount so the server render and first client render agree.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRIGGER_SIDE_STORAGE_KEY);
      if (stored === "left" || stored === "right") setStoredSide(stored);
      const storedOffset = Number.parseFloat(
        localStorage.getItem(TRIGGER_OFFSET_STORAGE_KEY) ?? "",
      );
      if (Number.isFinite(storedOffset)) setOffsetState(clamp(storedOffset, 0, 1));
    } catch {
      // Storage blocked: keep the direction-based default
    }
  }, []);

  function setSide(next: TriggerSide) {
    setStoredSide(next);
    try {
      localStorage.setItem(TRIGGER_SIDE_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only
    }
  }

  function setOffset(next: number) {
    const value = clamp(next, 0, 1);
    setOffsetState(value);
    try {
      localStorage.setItem(TRIGGER_OFFSET_STORAGE_KEY, String(value));
    } catch {
      // Storage blocked: the choice lasts for this page view only
    }
  }

  const side: TriggerSide = storedSide ?? (dir === "rtl" ? "left" : "right");
  return { side, setSide, offset, setOffset };
}

export function ThemeControl() {
  const { dir, setFontSize, setFontFamily } =
    useThemeContext();
  const { resetToDefaults } = useThemeCustomizer();
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const { side, setSide, offset, setOffset } = useTriggerPosition(dir);
  // Offset while the tab is being dragged; 0 when at rest.
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
  } | null>(null);
  // Set when a press turned into a drag, so the release doesn't open the sheet.
  const didDrag = useRef(false);

  // The home page keeps its own fixed typography (see .font-site-sans), so the
  // customizer tab is hidden there along with the pages that host their own.
  if (
    pathname === "/" ||
    pathname === "/themes" ||
    pathname?.startsWith("/preview")
  ) {
    return null;
  }

  function resetThemeCustomization() {
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("fontSize");
    localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);

    const root = window.document.documentElement;
    root.style.fontSize = DEFAULT_FONT_SIZE + "%";
    clearFontFamily();

    resetToDefaults();
    setFontSize(DEFAULT_FONT_SIZE);
    setFontFamily(DEFAULT_FONT_FAMILY);
    setTheme("system");
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
      top: rect.top,
    };
    didDrag.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const start = dragStart.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (!didDrag.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    didDrag.current = true;
    setIsDragging(true);
    // Keep the tab on screen: sideways it can only travel toward the opposite
    // edge, and vertically it stops at the top and bottom of the viewport.
    const travel = window.innerWidth - start.width;
    setDrag({
      x: side === "right" ? clamp(dx, -travel, 0) : clamp(dx, 0, travel),
      y: clamp(dy, -start.top, window.innerHeight - start.height - start.top),
    });
  }

  function endDrag() {
    dragStart.current = null;
    setIsDragging(false);
    setDrag({ x: 0, y: 0 });
  }

  // Snap to whichever half of the viewport the tab was dropped in, keeping
  // the height it was dropped at.
  function handlePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    const start = dragStart.current;
    if (!start) return;
    if (didDrag.current) {
      setSide(e.clientX < window.innerWidth / 2 ? "left" : "right");
      const range = window.innerHeight - start.height;
      const top = clamp(start.top + e.clientY - start.y, 0, range);
      if (range > 0) setOffset(top / range);
    }
    endDrag();
  }

  // The browser took the gesture over: return the tab to where it was.
  function handlePointerCancel() {
    didDrag.current = false;
    endDrag();
  }

  // Arrow keys move the tab too, for readers who can't drag: left/right
  // switch edges, up/down slide it along the edge.
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setSide(e.key === "ArrowLeft" ? "left" : "right");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const current =
        offset ?? rect.top / Math.max(1, window.innerHeight - rect.height);
      const step = e.key === "ArrowUp" ? -KEYBOARD_OFFSET_STEP : KEYBOARD_OFFSET_STEP;
      setOffset(current + step);
    }
  }

  return (
    <div
      /* Default: bottom edge on phones so it doesn't cover content toolbars;
         edge tab at top-40 from sm up. Once the reader has moved it, `top` plus
         a -offset% translate keeps it at that fraction of the viewport, fully
         on screen at both extremes. Anchored by `left` on both sides so
         switching edges can transition; the vertical move lives in the
         untransitioned `translate`, so a drop lands exactly where released. */
      className={cn(
        "fixed z-40",
        offset === null && "bottom-24 top-auto sm:top-40 sm:bottom-auto",
        !isDragging && "motion-safe:transition-[left,transform] motion-safe:duration-300 motion-safe:ease-out",
      )}
      style={{
        left: side === "left" ? "0%" : "100%",
        top: offset === null ? undefined : `${offset * 100}dvh`,
        transform: `translateX(calc(${side === "left" ? "0%" : "-100%"} + ${drag.x}px))`,
        translate: `0 calc(${offset === null ? 0 : -offset * 100}% + ${drag.y}px)`,
      }}
    >
      <Sheet>
        <SheetTrigger
          asChild
          onClick={(e) => {
            // A drag ends in a click on the same element; don't open for it.
            if (didDrag.current) {
              e.preventDefault();
              didDrag.current = false;
            }
          }}
        >
          <button
            type="button"
            aria-label="Open customization (drag or use arrow keys to move along the left or right edge)"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={handleKeyDown}
            className={cn(
              "group relative bg-primary text-primary-foreground hover:opacity-95 transition-opacity rounded px-3 py-2.5 shadow-md touch-none select-none flex items-center justify-center",
              side === "left" ? "rounded-l-none" : "rounded-r-none",
              isDragging ? "cursor-grabbing" : "cursor-pointer",
            )}
          >
            <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />

            {/* Drag Tooltip */}
            {!isDragging && (
              <div
                className={cn(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out z-50",
                  side === "right"
                    ? "right-full mr-3.5 translate-x-1 group-hover:translate-x-0"
                    : "left-full ml-3.5 -translate-x-1 group-hover:translate-x-0",
                )}
              >
                <div className="relative flex items-center gap-2 rounded-full bg-background/95 dark:bg-zinc-900/95 backdrop-blur-xl pl-1.5 pr-3 py-1 text-xs text-foreground border border-border/80 shadow-[0_0_16px_rgba(0,0,0,0.12)] dark:shadow-[0_0_20px_rgba(0,0,0,0.6)] ring-1 ring-foreground/5 select-none">
                  {/* Arrow Caret */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 size-2 rotate-45 bg-background dark:bg-zinc-900",
                      side === "right"
                        ? "-right-1 border-r border-t border-border/80"
                        : "-left-1 border-l border-b border-border/80",
                    )}
                  />

                  {/* Micro Accent Badge */}
                  <div className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20 shadow-xs">
                    <MoveVertical className="size-3" />
                  </div>

                  {/* Text */}
                  <span className="text-[11px] font-semibold tracking-wide text-foreground/90">
                    Drag to Move
                  </span>
                </div>
              </div>
            )}
          </button>
        </SheetTrigger>

        {/* Added flex flex-col to ensure the footer button can push to the very bottom */}
        <SheetContent side={side} className="hide-scroll z-[101] overflow-y-auto flex flex-col justify-between">
          <div>
            <SheetHeader className="border-b border-foreground/[0.06] pb-4">
              <SheetTitle className="font-serif text-lg font-normal">Customization</SheetTitle>
              <SheetDescription className="text-[13px] text-foreground/50">
                Customize and preview in real time
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-8 px-4 py-6">
              <ThemePresetSelector />
              <RadiusPicker />
              <DarkModeControl />
              <FontSizeControl />
              <FontFamilyControl />
            </div>
          {/* Theme Customizer Link + Reset Button Footer */}
          <div className="mt-auto pt-4 pb-10 px-4 border-t border-foreground/[0.06] flex items-center justify-between gap-3">
            <Link
              href="/themes"
              className="flex-1 flex items-center justify-center gap-2 h-9 px-4 active:scale-[0.98] rounded-full bg-foreground text-background text-[13px] font-semibold tracking-[0.3px] hover:opacity-90 transition-all cursor-pointer"
            >
              <Palette className="w-4 h-4" />
              <span>Theme Customizer</span>
            </Link>
            <button
              onClick={resetThemeCustomization}
              className="flex items-center justify-center gap-1.5 h-9 px-4 shrink-0 rounded-full bg-foreground/[0.04] hover:bg-foreground/10 text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
              <TimerReset className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}
