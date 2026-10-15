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
  /** Whether to enable a smooth pull-out animation sliding gently out from the trigger. Can also be set to "staggered" for sequential icon, title, and description entrance, or "expand" for dynamic height/width expansion. */
  animated?: boolean | "pull-out" | "staggered" | "expand";
  /** Whether to animate child elements (icon -> title -> description) in a staggered cascade. Defaults to false. */
  staggered?: boolean;
  /** Whether to start with only title space and smoothly expand height (for top/bottom) or width (for left/right) to unveil the description. Defaults to false. */
  expand?: boolean;
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

// Precise transform origin mapped to the pointer arrow anchor position.
const ARROW_ORIGINS: Record<
  NonNullable<TooltipContentProps["side"]>,
  Record<NonNullable<TooltipContentProps["align"]>, string>
> = {
  top: {
    center: "origin-bottom",
    start: "origin-bottom-left",
    end: "origin-bottom-right",
  },
  bottom: {
    center: "origin-top",
    start: "origin-top-left",
    end: "origin-top-right",
  },
  left: {
    center: "origin-right",
    start: "origin-top-right",
    end: "origin-bottom-right",
  },
  right: {
    center: "origin-left",
    start: "origin-top-left",
    end: "origin-bottom-left",
  },
};

// The entrance grows out of the trigger's edge: a tooltip above the trigger
// scales from its own bottom edge and slides up a touch, and so on.
const ENTER_FROM_SIDE: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "origin-bottom slide-in-from-bottom-1",
  bottom: "origin-top slide-in-from-top-1",
  left: "origin-right slide-in-from-right-1",
  right: "origin-left slide-in-from-left-1",
};

// Slower, smoother emergence for the staggered cascade variant.
const ENTER_STAGGERED: Record<NonNullable<TooltipContentProps["side"]>, string> = {
  top: "origin-bottom slide-in-from-bottom-3 zoom-in-90 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
  bottom: "origin-top slide-in-from-top-3 zoom-in-90 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
  left: "origin-right slide-in-from-right-3 zoom-in-90 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
  right: "origin-left slide-in-from-left-3 zoom-in-90 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
};

export function TooltipContent({
  side = "top",
  align = "center",
  sideOffset = 6,
  showArrow = false,
  arrowClassName,
  animated = false,
  staggered = false,
  expand = false,
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
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const resolvedDes = description ?? des;
  const isExpand = Boolean(expand || animated === "expand");
  const isStaggered = Boolean(!isExpand && (staggered || animated === "staggered"));
  const isArrowEmerge = Boolean(!isExpand && !isStaggered && (animated === true || animated === "pull-out"));

  // Forget the measurement on close, so the next open cannot flash at last
  // time’s coordinates before the layout effect re-measures.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) {
      setPositioned(false);
      setExpanded(false);
    }
  }

  // Expand variant: first emerges out of the arrow (animated=true style), then smoothly expands width & height
  useEffect(() => {
    if (!open || !isExpand) {
      setExpanded(false);
      return;
    }
    const timer = setTimeout(() => {
      setExpanded(true);
    }, 350);
    return () => clearTimeout(timer);
  }, [open, isExpand]);

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
      const extraLeftShift =
        isExpand && side === "left"
          ? 146
          : isExpand && (side === "top" || side === "bottom")
            ? 73
            : 0;
      const minLeft = viewportPadding + extraLeftShift;
      const maxLeft = Math.max(
        minLeft,
        docWidth - content.width - (isExpand && (side === "top" || side === "bottom") ? 73 : 0) - viewportPadding,
      );
      left = Math.max(minLeft, Math.min(left, maxLeft));

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
  }, [open, side, align, effectiveOffset, triggerEl, isExpand]);

  // triggerEl is null until the trigger commits, which also covers SSR: there
  // is no document to portal into on the server.
  if (!triggerEl || !open) return null;

  // Portal into the trigger's own document (supports iframe rendering).
  const portalTarget = triggerEl.ownerDocument.body;

  const hasStructured = Boolean(title || resolvedDes || icon);

  // Slim, snug dimensions for the expand variant:
  // Starts as a compact badge (150px wide, 42px high) showing icon and title.
  // Expands in width to 296px (+146px) across ALL directions (top, bottom, left, right),
  // with a gentle, slim height increase (42px -> 56px, only +14px) to fit the description underneath.
  const expandWidth = expanded ? "296px" : "150px";
  const expandHeight = expanded ? "56px" : "42px";

  let expandTransform = "none";
  if (isExpand) {
    const alignCenter = align === "center";
    if (side === "top") {
      // Offset width expansion symmetrically by 73px to keep centered on trigger
      // Offset 14px height expansion to keep bottom edge and arrow pinned
      const tx = alignCenter ? (expanded ? "-73px" : "0px") : "0px";
      const ty = expanded ? "-14px" : "0px";
      expandTransform = `translateX(${tx}) translateY(${ty})`;
    } else if (side === "bottom") {
      // Offset width expansion symmetrically by 73px to keep centered on trigger
      // Natural downward height expansion keeps top edge and arrow pinned
      const tx = alignCenter ? (expanded ? "-73px" : "0px") : "0px";
      expandTransform = `translateX(${tx}) translateY(0px)`;
    } else if (side === "left") {
      // Offset full 146px width expansion to keep right edge and arrow pinned
      // Offset 7px vertical shift to keep arrow centered
      const tx = expanded ? "-146px" : "0px";
      const ty = alignCenter ? (expanded ? "-7px" : "0px") : "0px";
      expandTransform = `translateX(${tx}) translateY(${ty})`;
    } else if (side === "right") {
      // Natural rightward width expansion keeps left edge pinned
      // Offset 7px vertical shift to keep arrow centered
      const ty = alignCenter ? (expanded ? "-7px" : "0px") : "0px";
      expandTransform = `translateX(0px) translateY(${ty})`;
    }
  }

  if (isExpand) {
    return createPortal(
      <TooltipContentContext.Provider value={{ side, align }}>
        <div
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            visibility: positioned ? "visible" : "hidden",
            zIndex: 9999,
            pointerEvents: "none",
            transformOrigin: ARROW_ORIGINS[side]?.[align] ?? "center",
            animation: positioned
              ? `tooltip-emerge-${side} 480ms cubic-bezier(0.16, 1, 0.3, 1) both`
              : undefined,
            willChange: "transform, opacity",
          }}
        >
          <div
            ref={contentRef}
            role="tooltip"
            className={cn(
              "relative text-xs text-primary-foreground bg-primary shadow-md pointer-events-none box-border px-3.5 rounded-lg flex items-center overflow-visible",
              className,
            )}
            style={{
              width: expandWidth,
              height: expandHeight,
              transform: expandTransform,
              transition:
                "width 1200ms cubic-bezier(0.16, 1, 0.3, 1), height 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "width, height, transform",
            }}
            {...props}
          >
            <style>{`
              @keyframes tooltip-emerge-top {
                0% {
                  opacity: 0;
                  transform: translateY(12px) scale(0.08);
                }
                25% {
                  opacity: 1;
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes tooltip-emerge-bottom {
                0% {
                  opacity: 0;
                  transform: translateY(-12px) scale(0.08);
                }
                25% {
                  opacity: 1;
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes tooltip-emerge-left {
                0% {
                  opacity: 0;
                  transform: translateX(12px) scale(0.08);
                }
                25% {
                  opacity: 1;
                }
                100% {
                  opacity: 1;
                  transform: translateX(0) scale(1);
                }
              }
              @keyframes tooltip-emerge-right {
                0% {
                  opacity: 0;
                  transform: translateX(-12px) scale(0.08);
                }
                25% {
                  opacity: 1;
                }
                100% {
                  opacity: 1;
                  transform: translateX(0) scale(1);
                }
              }
              @media (prefers-reduced-motion: reduce) {
                * {
                  animation: none !important;
                }
              }
            `}</style>
            <div className="flex items-center gap-2.5 w-full h-full min-w-0">
              {icon && (
                <div
                  className={cn(
                    "size-7 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0 text-current [&_svg]:size-3.5 shadow-2xs",
                    iconClassName,
                  )}
                >
                  {icon}
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0 justify-center">
                {title && (
                  <div className="font-semibold text-xs leading-none tracking-tight text-primary-foreground truncate whitespace-nowrap">
                    {title}
                  </div>
                )}
                {resolvedDes && (
                  <div
                    className="overflow-hidden min-h-0"
                    style={{
                      maxHeight: expanded ? "18px" : "0px",
                      opacity: expanded ? 0.85 : 0,
                      transform: expanded ? "translateY(0)" : "translateY(-3px)",
                      transition:
                        "max-height 1200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "max-height, opacity, transform",
                    }}
                  >
                    <div className="text-[11px] leading-tight text-primary-foreground/85 pt-1 truncate whitespace-nowrap">
                      {resolvedDes}
                    </div>
                  </div>
                )}
                {children}
              </div>
            </div>
            {showArrow && <TooltipArrow className={arrowClassName} />}
          </div>
        </div>
      </TooltipContentContext.Provider>,
      portalTarget,
    );
  }

  // Classic and Staggered variants
  const entranceClass = isArrowEmerge
    ? ""
    : isStaggered
      ? ENTER_STAGGERED[side]
      : cn("zoom-in-95 duration-150", ENTER_FROM_SIDE[side]);

  return createPortal(
    <TooltipContentContext.Provider value={{ side, align }}>
      <div
        ref={contentRef}
        role="tooltip"
        className={cn(
          "absolute z-[9999] text-xs text-primary-foreground bg-primary shadow-md pointer-events-none box-border",
          isArrowEmerge && (ARROW_ORIGINS[side]?.[align] ?? "origin-center"),
          title
            ? "px-3.5 py-2.5 rounded-lg max-w-xs"
            : "px-3 py-1.5 rounded-md font-medium",
          !isArrowEmerge && "transition-none",
          entranceClass,
          className,
        )}
        style={
          {
            top: coords.top,
            left: coords.left,
            visibility: positioned ? "visible" : "hidden",
            ...(isArrowEmerge
              ? {
                  animation: positioned
                    ? `tooltip-emerge-${side} 600ms cubic-bezier(0.16, 1, 0.3, 1) both`
                    : undefined,
                  willChange: "transform, opacity",
                }
              : undefined),
          } as React.CSSProperties
        }
        {...props}
      >
        {isArrowEmerge && (
          <style>{`
            @keyframes tooltip-emerge-top {
              0% {
                opacity: 0;
                transform: translateY(12px) scale(0.08);
              }
              25% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes tooltip-emerge-bottom {
              0% {
                opacity: 0;
                transform: translateY(-12px) scale(0.08);
              }
              25% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes tooltip-emerge-left {
              0% {
                opacity: 0;
                transform: translateX(12px) scale(0.08);
              }
              25% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            @keyframes tooltip-emerge-right {
              0% {
                opacity: 0;
                transform: translateX(-12px) scale(0.08);
              }
              25% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              * {
                animation: none !important;
              }
            }
          `}</style>
        )}
        {isStaggered && (
          <style>{`
            @keyframes tooltip-icon-pop {
              0% {
                opacity: 0;
                transform: scale(0.3) translateY(4px);
              }
              65% {
                opacity: 1;
                transform: scale(1.08) translateY(-1px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            @keyframes tooltip-title-in {
              0% {
                opacity: 0;
                transform: translateY(6px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes tooltip-des-in {
              0% {
                opacity: 0;
                transform: translateY(6px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .tooltip-anim-icon,
              .tooltip-anim-title,
              .tooltip-anim-des {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `}</style>
        )}
        {hasStructured ? (
          isExpand ? (
            <div className="flex items-center gap-2.5 w-full h-full min-w-0">
              {icon && (
                <div
                  className={cn(
                    "size-7 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0 text-current [&_svg]:size-3.5 shadow-2xs",
                    iconClassName,
                  )}
                >
                  {icon}
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0 justify-center">
                {title && (
                  <div className="font-semibold text-xs leading-none tracking-tight text-primary-foreground truncate whitespace-nowrap">
                    {title}
                  </div>
                )}
                {resolvedDes && (
                  <div
                    className="overflow-hidden min-h-0"
                    style={{
                      maxHeight: expanded ? "18px" : "0px",
                      opacity: expanded ? 0.85 : 0,
                      transform: expanded ? "translateY(0)" : "translateY(-3px)",
                      transition:
                        "max-height 1200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "max-height, opacity, transform",
                    }}
                  >
                    <div className="text-[11px] leading-tight text-primary-foreground/85 pt-1 truncate whitespace-nowrap">
                      {resolvedDes}
                    </div>
                  </div>
                )}
                {children}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 max-w-xs">
              {icon && (
                <div
                  className={cn(
                    "size-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0 text-current [&_svg]:size-4 shadow-2xs",
                    isStaggered && "tooltip-anim-icon",
                    iconClassName,
                  )}
                  style={
                    isStaggered
                      ? {
                          animation: "tooltip-icon-pop 380ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both",
                          willChange: "transform, opacity",
                        }
                      : undefined
                  }
                >
                  {icon}
                </div>
              )}
              <div className="flex flex-col min-w-0 justify-center">
                {title && (
                  <div
                    className={cn(
                      "font-semibold text-xs leading-tight tracking-tight text-primary-foreground truncate whitespace-nowrap",
                      isStaggered && "tooltip-anim-title",
                    )}
                    style={
                      isStaggered
                        ? {
                            animation: "tooltip-title-in 360ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both",
                            willChange: "transform, opacity",
                          }
                        : undefined
                    }
                  >
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
                      isStaggered && "tooltip-anim-des",
                    )}
                    style={
                      isStaggered
                        ? {
                            animation: `tooltip-des-in 380ms cubic-bezier(0.16, 1, 0.3, 1) ${title ? 320 : 200}ms both`,
                            willChange: "transform, opacity",
                          }
                        : undefined
                    }
                  >
                    {resolvedDes}
                  </div>
                )}
                {children}
              </div>
            </div>
          )
        ) : (
          children
        )}
        {showArrow && <TooltipArrow className={arrowClassName} />}
      </div>
    </TooltipContentContext.Provider>,
    portalTarget,
  );
}
