"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ==========================================
// 1. CONTEXT
// ==========================================
interface PopoverContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}
const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface PopoverProps {
  children: React.ReactNode;
}

export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

// ==========================================
// 3. TRIGGER
// ==========================================
export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: PopoverTriggerProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used within a Popover");

  const { open, setOpen, triggerRef } = context;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if placed inside another clickable element
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div
      ref={triggerRef}
      onClick={handleClick}
      className={cn("inline-block", className)}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. CONTENT (Portal Renderer)
// ==========================================
export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  /**
   * Flip to the opposite side and shift the panel back into view when the
   * preferred placement would overflow the viewport. Set to false to pin the
   * panel to `side`/`align` even when it gets cropped.
   */
  avoidCollisions?: boolean;
  /** Minimum gap (px) kept between the panel and the viewport edges. */
  collisionPadding?: number;
}

const OPPOSITE_SIDE = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
} as const;

// `max` drops below `min` when the panel is larger than the viewport; pin to
// `min` there so the panel starts at the top/left edge instead of jumping past it.
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, Math.max(min, max)));

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  avoidCollisions = true,
  collisionPadding = 8,
  className,
  children,
  ...props
}: PopoverContentProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used within a Popover");

  const { open, setOpen, triggerRef } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // SSR Safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Position Updates
  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    // Resolve the document/window the trigger actually lives in, so the
    // popover works when rendered inside an iframe (e.g. docs device preview).
    const doc = triggerRef.current.ownerDocument;
    const win = doc.defaultView ?? window;

    const updatePosition = () => {
      const triggerEl = triggerRef.current;
      const contentEl = contentRef.current;
      if (!triggerEl || !contentEl) return;

      const viewportWidth = doc.documentElement.clientWidth || win.innerWidth;
      const viewportHeight = doc.documentElement.clientHeight || win.innerHeight;
      const padding = avoidCollisions ? collisionPadding : 0;
      const trigger = triggerEl.getBoundingClientRect();

      // The panel's uncapped size, read from the scroll box. Clearing the caps
      // and re-measuring would resize the element on every scroll frame and
      // re-trigger the ResizeObserver below.
      const chromeY = contentEl.offsetHeight - contentEl.clientHeight;
      const chromeX = contentEl.offsetWidth - contentEl.clientWidth;
      const naturalHeight = contentEl.scrollHeight + chromeY;
      const naturalWidth = contentEl.scrollWidth + chromeX;

      // Room between each trigger edge and the viewport edge, already minus the
      // gap the panel keeps off the trigger — so this is the space the panel can
      // occupy WITHOUT covering the control that opened it.
      const space = {
        top: trigger.top - padding - sideOffset,
        bottom: viewportHeight - trigger.bottom - padding - sideOffset,
        left: trigger.left - padding - sideOffset,
        right: viewportWidth - trigger.right - padding - sideOffset,
      };

      let resolvedSide = side;
      if (avoidCollisions) {
        const wantsVertical = side === "top" || side === "bottom";
        const needed = wantsVertical ? naturalHeight : naturalWidth;
        const flipped = OPPOSITE_SIDE[side];

        // 1. Flip to the opposite edge when the preferred one is too tight and
        //    the other is roomier.
        if (space[side] < needed && space[flipped] > space[side])
          resolvedSide = flipped;

        // 2. A 288px panel rarely fits beside a trigger on a phone. When neither
        //    horizontal side can hold it, drop to the vertical axis, where the
        //    panel gets the full width instead of a useless slice of it.
        if (!wantsVertical && space[resolvedSide] < naturalWidth)
          resolvedSide = space.bottom >= space.top ? "bottom" : "top";

        // 3. Cap the panel to the room on the side it ended up on, and scroll
        //    the remainder. This is what keeps the trigger visible: without it a
        //    panel taller than the space below has to be pushed back up over the
        //    trigger to fit on screen, hiding the button that was just pressed.
        const onVertical = resolvedSide === "top" || resolvedSide === "bottom";
        const across = onVertical
          ? viewportWidth - padding * 2
          : viewportHeight - padding * 2;
        const along = Math.max(0, space[resolvedSide]);
        contentEl.style.maxWidth = `${Math.max(0, onVertical ? across : along)}px`;
        contentEl.style.maxHeight = `${Math.max(0, onVertical ? along : across)}px`;
        contentEl.style.overflowY =
          contentEl.scrollHeight > contentEl.clientHeight ? "auto" : "";
        contentEl.style.overflowX =
          contentEl.scrollWidth > contentEl.clientWidth ? "auto" : "";
      }

      // Measured after the cap. offsetWidth/Height are the untransformed layout
      // box; getBoundingClientRect would report the shrunken size while the
      // zoom-in entrance animation runs, throwing the alignment off a few pixels.
      const width = contentEl.offsetWidth;
      const height = contentEl.offsetHeight;

      let top = 0;
      let left = 0;

      // 2. Calculate Side
      if (resolvedSide === "top") top = trigger.top - height - sideOffset;
      if (resolvedSide === "bottom") top = trigger.bottom + sideOffset;
      if (resolvedSide === "left") left = trigger.left - width - sideOffset;
      if (resolvedSide === "right") left = trigger.right + sideOffset;

      // 3. Calculate Align
      if (resolvedSide === "top" || resolvedSide === "bottom") {
        if (align === "center")
          left = trigger.left + trigger.width / 2 - width / 2;
        if (align === "start") left = trigger.left;
        if (align === "end") left = trigger.right - width;
      } else {
        if (align === "center")
          top = trigger.top + trigger.height / 2 - height / 2;
        if (align === "start") top = trigger.top;
        if (align === "end") top = trigger.bottom - height;
      }

      // 4. Shift whatever still hangs off an edge back into view — but only
      //    ACROSS the side axis. Alignment is a preference, not a guarantee, so
      //    an align="start"/"end" panel near an edge slides back. Shifting along
      //    the side axis is what used to drag the panel over its own trigger;
      //    the cap in step 3 owns that axis now.
      if (avoidCollisions) {
        if (resolvedSide === "top" || resolvedSide === "bottom") {
          left = clamp(left, padding, viewportWidth - width - padding);
        } else {
          top = clamp(top, padding, viewportHeight - height - padding);
        }
      }

      const nextTop = top + win.scrollY;
      const nextLeft = left + win.scrollX;
      setCoords((prev) =>
        prev.top === nextTop && prev.left === nextLeft
          ? prev
          : { top: nextTop, left: nextLeft },
      );
    };

    updatePosition();
    win.addEventListener("scroll", updatePosition, true);
    win.addEventListener("resize", updatePosition);
    // The visual viewport shrinks when the mobile keyboard opens over an input
    // inside the panel, and changes on pinch-zoom — neither fires window resize.
    win.visualViewport?.addEventListener("resize", updatePosition);
    win.visualViewport?.addEventListener("scroll", updatePosition);

    // Reposition when the panel or trigger changes size (content loading, the
    // max-height cap applied above, a responsive breakpoint crossing).
    const sizeObserver = new (win.ResizeObserver ?? ResizeObserver)(
      updatePosition,
    );
    sizeObserver.observe(contentRef.current);
    sizeObserver.observe(triggerRef.current);

    return () => {
      sizeObserver.disconnect();
      win.removeEventListener("scroll", updatePosition, true);
      win.removeEventListener("resize", updatePosition);
      win.visualViewport?.removeEventListener("resize", updatePosition);
      win.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, [
    open,
    side,
    align,
    sideOffset,
    avoidCollisions,
    collisionPadding,
    triggerRef,
  ]);

  // Handle Click Outside & Escape Key
  useEffect(() => {
    if (!open) return;

    const handleInteractOutside = (e: MouseEvent | TouchEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    // Listen on the document the trigger actually lives in (supports iframe rendering).
    const doc = triggerRef.current?.ownerDocument ?? document;

    doc.addEventListener("mousedown", handleInteractOutside);
    doc.addEventListener("touchstart", handleInteractOutside);
    doc.addEventListener("keydown", handleEscape);

    return () => {
      doc.removeEventListener("mousedown", handleInteractOutside);
      doc.removeEventListener("touchstart", handleInteractOutside);
      doc.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!mounted || !open) return null;

  // Portal into the trigger's own document (supports iframe rendering).
  const portalTarget = triggerRef.current?.ownerDocument.body ?? document.body;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      className={cn(
        // Below lg the panel competes with the screen for room: smaller type and
        // padding buy back the height that would otherwise have to be scrolled.
        // Width stays a single class so an overriding `className="w-48"` wins at
        // every breakpoint instead of only below lg.
        "absolute z-[9999] w-72 max-w-[calc(100vw-1rem)] p-3 lg:p-4 text-sm lg:text-base outline-none text-zinc-950 dark:text-zinc-50 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200",
        className,
      )}
      style={{ top: coords.top, left: coords.left }}
      // Stop clicks inside the popover from bubbling up to the document
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>,
    portalTarget,
  );
}
