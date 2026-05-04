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
interface TooltipContextType {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
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
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <TooltipContext.Provider
      value={{ open, handleOpen, handleClose, triggerRef }}
    >
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

  return (
    <div
      ref={context.triggerRef}
      onMouseEnter={context.handleOpen}
      onMouseLeave={context.handleClose}
      onFocus={context.handleOpen}
      onBlur={context.handleClose}
      className={cn("inline-block", className)}
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={context.open}
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

  const { open, triggerRef } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // SSR safety for Portals
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current!.getBoundingClientRect();
      const content = contentRef.current!.getBoundingClientRect();
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

      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    };

    updatePosition();
    // Use capture phase for scroll to ensure it updates during nested scroll containers
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, side, align, sideOffset]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="tooltip"
      className={cn(
        "absolute z-[9999] px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white rounded-md shadow-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none",
        className,
      )}
      style={{ top: coords.top, left: coords.left }}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}
