"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * Positioning has to happen before the browser paints, or the tooltip shows up
 * at its placeholder coordinates for one frame and then jumps into place.
 * useLayoutEffect warns when it runs on the server, and TooltipContent renders
 * nothing until the trigger has committed, so falling back to useEffect there
 * costs nothing.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ==========================================
// 1. CONTEXT
// ==========================================
interface TooltipContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  delayDuration: number;
  /**
   * The trigger node itself, held in state rather than a ref. A ref shared
   * through context makes every read of this context a ref read during render;
   * a plain node lets the content position and portal itself without one.
   */
  trigger: HTMLDivElement | null;
  setTrigger: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}
const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

// ==========================================
// 2. PROVIDER (Optional: For wrapping the app)
// ==========================================
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// ==========================================
// 3. TOOLTIP ROOT (State Manager)
// ==========================================
export interface TooltipProps {
  children: React.ReactNode;
  delayDuration?: number;
}

export function Tooltip({ children, delayDuration = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLDivElement | null>(null);

  // The open/close delay is owned by the trigger, not shared through context:
  // a timeout ref captured by a context handler would make every read of this
  // context look like a ref read during render.
  const value = useMemo(
    () => ({ open, setOpen, delayDuration, trigger, setTrigger }),
    [open, delayDuration, trigger],
  );

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
}

// ==========================================
// 4. TRIGGER
// ==========================================
export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function TooltipTrigger({
  children,
  className,
  ...props
}: TooltipTriggerProps) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within a Tooltip");

  const { open, setOpen, delayDuration, setTrigger } = context;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [setOpen, delayDuration]);

  const handleClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  }, [setOpen]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <div
      ref={setTrigger}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      className={cn("inline-block", className)}
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={open}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 5. CONTENT (Portal Renderer)
// ==========================================
export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

// The entrance grows out of the trigger's edge: a tooltip above the trigger
// scales from its own bottom edge and slides up a touch, and so on.
const ENTER_FROM_SIDE: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "origin-bottom slide-in-from-bottom-1",
  bottom: "origin-top slide-in-from-top-1",
  left: "origin-right slide-in-from-right-1",
  right: "origin-left slide-in-from-left-1",
};

export function TooltipContent({
  side = "top",
  align = "center",
  sideOffset = 6,
  className,
  children,
  ...props
}: TooltipContentProps) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within a Tooltip");

  const { open, trigger: triggerEl } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  // Stale coordinates from the previous open would otherwise paint first.
  const [positioned, setPositioned] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Forget the measurement on close, so the next open cannot flash at last
  // time’s coordinates before the layout effect re-measures.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setPositioned(false);
  }

  useIsomorphicLayoutEffect(() => {
    if (!open || !triggerEl || !contentRef.current) return;

    // Resolve the document/window the trigger actually lives in, so the
    // tooltip works when rendered inside an iframe (e.g. docs device preview).
    const doc = triggerEl.ownerDocument;
    const win = doc.defaultView ?? window;

    const updatePosition = () => {
      const trigger = triggerEl.getBoundingClientRect();
      // offsetWidth/Height are the untransformed layout box; a bounding rect
      // would report the shrunken size while the zoom-in entrance runs.
      const content = {
        width: contentRef.current!.offsetWidth,
        height: contentRef.current!.offsetHeight,
      };
      let top = 0;
      let left = 0;

      // 1. Calculate Side
      if (side === "top") top = trigger.top - content.height - sideOffset;
      if (side === "bottom") top = trigger.bottom + sideOffset;
      if (side === "left") left = trigger.left - content.width - sideOffset;
      if (side === "right") left = trigger.right + sideOffset;

      // 2. Calculate Align
      if (side === "top" || side === "bottom") {
        if (align === "center")
          left = trigger.left + trigger.width / 2 - content.width / 2;
        if (align === "start") left = trigger.left;
        if (align === "end") left = trigger.right - content.width;
      } else {
        if (align === "center")
          top = trigger.top + trigger.height / 2 - content.height / 2;
        if (align === "start") top = trigger.top;
        if (align === "end") top = trigger.bottom - content.height;
      }

      setCoords({ top: top + win.scrollY, left: left + win.scrollX });
      setPositioned(true);
    };

    updatePosition();
    // Use capture phase for scroll to ensure it updates during nested scroll containers
    win.addEventListener("scroll", updatePosition, true);
    win.addEventListener("resize", updatePosition);
    return () => {
      win.removeEventListener("scroll", updatePosition, true);
      win.removeEventListener("resize", updatePosition);
    };
  }, [open, side, align, sideOffset, triggerEl]);

  // triggerEl is null until the trigger commits, which also covers SSR: there
  // is no document to portal into on the server.
  if (!triggerEl || !open) return null;

  // Portal into the trigger's own document (supports iframe rendering).
  const portalTarget = triggerEl.ownerDocument.body;

  return createPortal(
    <div
      ref={contentRef}
      role="tooltip"
      className={cn(
        "absolute z-[9999] px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md pointer-events-none",
        // `duration-150` sets transition-duration too, and the browser default
        // transition-property is `all` — without `transition-none` top/left
        // would tween from the placeholder coordinates, sliding the tooltip
        // across the screen instead of opening in place.
        "transition-none animate-in fade-in zoom-in-95 duration-150",
        ENTER_FROM_SIDE[side],
        className,
      )}
      style={{
        top: coords.top,
        left: coords.left,
        visibility: positioned ? "visible" : "hidden",
      }}
      {...props}
    >
      {children}
    </div>,
    portalTarget,
  );
}
