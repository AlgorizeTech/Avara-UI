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
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 8,
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

      setCoords({ top: top + win.scrollY, left: left + win.scrollX });
    };

    updatePosition();
    win.addEventListener("scroll", updatePosition, true);
    win.addEventListener("resize", updatePosition);

    return () => {
      win.removeEventListener("scroll", updatePosition, true);
      win.removeEventListener("resize", updatePosition);
    };
  }, [open, side, align, sideOffset]);

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
        "absolute z-[9999] w-72 p-4 outline-none text-zinc-950 dark:text-zinc-50 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200",
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
