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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  /** Whether to render a pointer arrow anchoring to the trigger. Defaults to false. */
  showArrow?: boolean;
  /** Custom classes for the pointer arrow element. */
  arrowClassName?: string;
  /** Whether to enable a smooth pull-out animation sliding gently out from the trigger. */
  animated?: boolean;
  /** Optional title header displayed in bold. */
  title?: React.ReactNode;
  /** Optional description text. */
  description?: React.ReactNode;
  /** Shorthand alias for description. */
  des?: React.ReactNode;
  /** Optional leading icon displayed next to the content. */
  icon?: React.ReactNode;
  /** Optional custom classes for the icon background container. */
  iconClassName?: string;
}

interface TooltipContentContextType {
  side: NonNullable<TooltipContentProps["side"]>;
  align: NonNullable<TooltipContentProps["align"]>;
}

const TooltipContentContext = createContext<TooltipContentContextType | null>(null);

const ARROW_POSITIONS: Record<
  NonNullable<TooltipContentProps["side"]>,
  Record<NonNullable<TooltipContentProps["align"]>, string>
> = {
  top: {
    center: "-bottom-1 left-1/2 -translate-x-1/2",
    start: "-bottom-1 left-3",
    end: "-bottom-1 right-3",
  },
  bottom: {
    center: "-top-1 left-1/2 -translate-x-1/2",
    start: "-top-1 left-3",
    end: "-top-1 right-3",
  },
  left: {
    center: "-right-1 top-1/2 -translate-y-1/2",
    start: "-right-1 top-3",
    end: "-right-1 bottom-3",
  },
  right: {
    center: "-left-1 top-1/2 -translate-y-1/2",
    start: "-left-1 top-3",
    end: "-left-1 bottom-3",
  },
};

const ARROW_BORDERS: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "border-b border-r",
  bottom: "border-t border-l",
  left: "border-t border-r",
  right: "border-b border-l",
};

export interface TooltipArrowProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function TooltipArrow({ className, ...props }: TooltipArrowProps) {
  const context = useContext(TooltipContentContext);
  const side = context?.side ?? "top";
  const align = context?.align ?? "center";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute w-2 h-2 rotate-45 bg-inherit border-inherit pointer-events-none",
        ARROW_POSITIONS[side][align],
        ARROW_BORDERS[side],
        className,
      )}
      {...props}
    />
  );
}

// The entrance grows out of the trigger's edge: a tooltip above the trigger
// scales from its own bottom edge and slides up a touch, and so on.
const ENTER_FROM_SIDE: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "origin-bottom slide-in-from-bottom-1",
  bottom: "origin-top slide-in-from-top-1",
  left: "origin-right slide-in-from-right-1",
  right: "origin-left slide-in-from-left-1",
};

// Smooth pull-out animation that emerges gently out from the trigger.
const ENTER_PULL_OUT: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "origin-bottom slide-in-from-bottom-3 zoom-in-75 duration-300 ease-out",
  bottom: "origin-top slide-in-from-top-3 zoom-in-75 duration-300 ease-out",
  left: "origin-right slide-in-from-right-3 zoom-in-75 duration-300 ease-out",
  right: "origin-left slide-in-from-left-3 zoom-in-75 duration-300 ease-out",
};

export function TooltipContent({
  side = "top",
  align = "center",
  sideOffset = 6,
  showArrow = false,
  arrowClassName,
  animated = false,
  title,
  description,
  des,
  icon,
  iconClassName,
  className,
  children,
  ...props
}: TooltipContentProps) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within a Tooltip");

  const effectiveOffset = sideOffset === 6 && showArrow ? 8 : sideOffset;
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
      if (side === "top") top = trigger.top - content.height - effectiveOffset;
      if (side === "bottom") top = trigger.bottom + effectiveOffset;
      if (side === "left") left = trigger.left - content.width - effectiveOffset;
      if (side === "right") left = trigger.right + effectiveOffset;

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

      // Clamp within viewport padding to prevent overflowing screen edges
      const viewportPadding = 8;
      const docWidth = doc.documentElement.clientWidth || win.innerWidth;
      const maxLeft = Math.max(viewportPadding, docWidth - content.width - viewportPadding);
      left = Math.max(viewportPadding, Math.min(left, maxLeft));

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
  }, [open, side, align, effectiveOffset, triggerEl]);

  // triggerEl is null until the trigger commits, which also covers SSR: there
  // is no document to portal into on the server.
  if (!triggerEl || !open) return null;

  // Portal into the trigger's own document (supports iframe rendering).
  const portalTarget = triggerEl.ownerDocument.body;

  const resolvedDes = description ?? des;
  const hasStructured = Boolean(title || resolvedDes || icon);

  return createPortal(
    <TooltipContentContext.Provider value={{ side, align }}>
      <div
        ref={contentRef}
        role="tooltip"
        className={cn(
          "absolute z-[9999] text-xs text-primary-foreground bg-primary shadow-md pointer-events-none",
          title
            ? "px-3.5 py-2.5 rounded-lg max-w-xs"
            : "px-3 py-1.5 rounded-md font-medium",
          // `duration-150` sets transition-duration too, and the browser default
          // transition-property is `all` — without `transition-none` top/left
          // would tween from the placeholder coordinates, sliding the tooltip
          // across the screen instead of opening in place.
          "transition-none animate-in fade-in",
          animated
            ? ENTER_PULL_OUT[side]
            : cn("zoom-in-95 duration-150", ENTER_FROM_SIDE[side]),
          className,
        )}
        style={{
          top: coords.top,
          left: coords.left,
          visibility: positioned ? "visible" : "hidden",
        }}
        {...props}
      >
        {hasStructured ? (
          <div className="flex items-center gap-2.5 max-w-xs">
            {icon && (
              <div
                className={cn(
                  "size-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0 text-current [&_svg]:size-4 shadow-2xs",
                  iconClassName,
                )}
              >
                {icon}
              </div>
            )}
            <div className="flex flex-col min-w-0 justify-center">
              {title && (
                <div className="font-semibold text-xs leading-tight tracking-tight text-primary-foreground truncate whitespace-nowrap">
                  {title}
                </div>
              )}
              {resolvedDes && (
                <div
                  className={cn(
                    "text-xs leading-tight truncate whitespace-nowrap",
                    title
                      ? "opacity-85 text-[11px] mt-0.5"
                      : "font-medium opacity-95",
                  )}
                >
                  {resolvedDes}
                </div>
              )}
              {children}
            </div>
          </div>
        ) : (
          children
        )}
        {showArrow && <TooltipArrow className={arrowClassName} />}
      </div>
    </TooltipContentContext.Provider>,
    portalTarget,
  );
}
