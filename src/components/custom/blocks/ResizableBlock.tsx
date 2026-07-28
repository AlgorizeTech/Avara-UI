"use client";

import { cn } from "@/lib/utils";
import { GripHorizontal, GripVertical } from "lucide-react";
import React, { createContext, useContext, useRef } from "react";

// ==========================================
// 1. CONTEXT
// ==========================================
interface ResizableContextType {
  direction: "horizontal" | "vertical";
}
const ResizableContext = createContext<ResizableContextType | null>(null);

function useResizable() {
  const context = useContext(ResizableContext);
  if (!context) throw new Error("Must be used within a ResizablePanelGroup");
  return context;
}

// ==========================================
// 2. PANEL GROUP
// ==========================================
export interface ResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <div
        className={cn(
          "flex h-full w-full overflow-hidden",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

// ==========================================
// 3. PANEL
// ==========================================
export interface ResizablePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number; // Percentage (0-100)
  minSize?: number; // Percentage (0-100)
  maxSize?: number; // Percentage (0-100)
}

export function ResizablePanel({
  defaultSize = 50,
  minSize = 0,
  maxSize = 100,
  className,
  children,
  ...props
}: ResizablePanelProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden",
        className,
      )}
      style={{
        // Use flex-basis to control relative sizing seamlessly
        flex: `${defaultSize} ${defaultSize} 0%`,
      }}
      // Store constraints in dataset so the Handle can read them without React renders
      data-panel
      data-flex-size={defaultSize}
      data-min-size={minSize}
      data-max-size={maxSize}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. RESIZE HANDLE
// ==========================================
export interface ResizableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
}

export function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: ResizableHandleProps) {
  const { direction } = useResizable();
  const isHorizontal = direction === "horizontal";
  const handleRef = useRef<HTMLDivElement>(null);

  // --- DIRECT DOM DRAG ENGINE (60FPS Smooth) ---
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const handle = handleRef.current;
    if (!handle) return;

    // Resolve the document/window the handle actually lives in (supports iframe rendering).
    const doc = handle.ownerDocument;
    const win = doc.defaultView ?? window;

    const prev = handle.previousElementSibling as HTMLElement;
    const next = handle.nextElementSibling as HTMLElement;
    if (
      !prev ||
      !next ||
      !prev.hasAttribute("data-panel") ||
      !next.hasAttribute("data-panel")
    )
      return;

    const startPos = isHorizontal ? e.clientX : e.clientY;
    const prevStartFlex = parseFloat(
      prev.getAttribute("data-flex-size") || "50",
    );
    const nextStartFlex = parseFloat(
      next.getAttribute("data-flex-size") || "50",
    );
    const totalFlex = prevStartFlex + nextStartFlex;

    const prevRect = prev.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    const totalPixels = isHorizontal
      ? prevRect.width + nextRect.width
      : prevRect.height + nextRect.height;

    const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
    const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
    const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
    const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

    doc.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    doc.body.style.userSelect = "none";

    const onPointerMove = (moveEvent: PointerEvent) => {
      const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
      const deltaPixels = currentPos - startPos;
      const deltaPercentage = (deltaPixels / totalPixels) * totalFlex;

      let newPrevFlex = prevStartFlex + deltaPercentage;
      let newNextFlex = nextStartFlex - deltaPercentage;

      // Apply constraints
      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      newNextFlex = totalFlex - newPrevFlex;

      // Direct DOM manipulation bypasses React render cycle for zero latency
      prev.style.flex = `${newPrevFlex} ${newPrevFlex} 0%`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());

      next.style.flex = `${newNextFlex} ${newNextFlex} 0%`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    };

    const onPointerUp = () => {
      doc.body.style.cursor = "";
      doc.body.style.userSelect = "";
      win.removeEventListener("pointermove", onPointerMove);
      win.removeEventListener("pointerup", onPointerUp);
    };

    win.addEventListener("pointermove", onPointerMove);
    win.addEventListener("pointerup", onPointerUp);
  };

  // --- ACCESSIBILITY: KEYBOARD NAVIGATION ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const handle = handleRef.current;
    if (!handle) return;

    const prev = handle.previousElementSibling as HTMLElement;
    const next = handle.nextElementSibling as HTMLElement;
    if (!prev || !next) return;

    let delta = 0;
    const step = 5; // Move by 5% on each keystroke

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") delta = -step;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") delta = step;

    if (delta !== 0) {
      e.preventDefault();

      const prevStartFlex = parseFloat(
        prev.getAttribute("data-flex-size") || "50",
      );
      const nextStartFlex = parseFloat(
        next.getAttribute("data-flex-size") || "50",
      );
      const totalFlex = prevStartFlex + nextStartFlex;

      const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
      const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
      const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
      const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

      let newPrevFlex = prevStartFlex + delta;

      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      const newNextFlex = totalFlex - newPrevFlex;

      prev.style.flex = `${newPrevFlex} ${newPrevFlex} 0%`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());

      next.style.flex = `${newNextFlex} ${newNextFlex} 0%`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    }
  };

  return (
    <div
      ref={handleRef}
      role="separator"
      tabIndex={0}
      aria-orientation={direction}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-zinc-200 dark:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize",
        className,
      )}
      {...props}
    >
      {/* Invisible wider grab area for easier clicking */}
      <div
        className={cn(
          "absolute z-10",
          isHorizontal ? "inset-y-0 -inset-x-2" : "inset-x-0 -inset-y-2",
        )}
      />

      {withHandle && (
        <div
          className={cn(
            "z-20 flex items-center justify-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm",
            isHorizontal ? "h-6 w-3" : "h-3 w-6",
          )}
        >
          {isHorizontal ? (
            <GripVertical className="h-2.5 w-2.5 text-zinc-500" />
          ) : (
            <GripHorizontal className="h-2.5 w-2.5 text-zinc-500" />
          )}
        </div>
      )}
    </div>
  );
}
