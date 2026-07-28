"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ==========================================
// 1. CONTEXT
// ==========================================
interface ContextMenuContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { x: number; y: number };
  setCoords: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface ContextMenuProps {
  children: React.ReactNode;
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

// ==========================================
// 3. TRIGGER (Intercepts Right-Click)
// ==========================================
export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContextMenuTrigger({ className, children, ...props }: ContextMenuTriggerProps) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuTrigger must be used within a ContextMenu");

  const { setOpen, setCoords } = context;

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Stop the native browser menu
    e.stopPropagation();
    setCoords({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={cn("w-full h-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. CONTENT (Portal Renderer with Collision)
// ==========================================
export type ContextMenuContentProps = React.HTMLAttributes<HTMLDivElement>

export function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuContent must be used within a ContextMenu");

  const { open, setOpen, coords } = context;
  const contentRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [adjustedCoords, setAdjustedCoords] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  // SSR Safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Position & Screen Boundaries
  useEffect(() => {
    if (!open || !contentRef.current) {
      setVisible(false);
      return;
    }

    const adjustPosition = () => {
      const menu = contentRef.current;
      if (!menu) return;

      // Resolve the window the menu actually lives in (supports iframe rendering).
      const win = menu.ownerDocument.defaultView ?? window;

      const rect = menu.getBoundingClientRect();
      let x = coords.x;
      let y = coords.y;

      // Prevent opening off the right edge
      if (x + rect.width > win.innerWidth) {
        x = win.innerWidth - rect.width - 8;
      }

      // Prevent opening off the bottom edge
      if (y + rect.height > win.innerHeight) {
        y = win.innerHeight - rect.height - 8;
      }

      setAdjustedCoords({ x, y });
      setVisible(true); // Fade in after coords are fixed to prevent flicker
    };

    // Minor delay to let DOM render and measure dimensions
    const timer = setTimeout(adjustPosition, 0);
    return () => clearTimeout(timer);
  }, [open, coords]);

  // Handle Outside Click, Scroll, & Escape
  useEffect(() => {
    if (!open) return;

    const handleInteractOutside = (e: MouseEvent | TouchEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleScroll = () => {
      setOpen(false); // Typically scrolling dismisses a context menu
    };

    // Listen on the document/window the menu actually lives in (supports iframe rendering).
    const doc = contentRef.current?.ownerDocument ?? document;
    const win = doc.defaultView ?? window;

    doc.addEventListener("mousedown", handleInteractOutside);
    doc.addEventListener("touchstart", handleInteractOutside);
    doc.addEventListener("keydown", handleEscape);
    win.addEventListener("scroll", handleScroll, true);

    return () => {
      doc.removeEventListener("mousedown", handleInteractOutside);
      doc.removeEventListener("touchstart", handleInteractOutside);
      doc.removeEventListener("keydown", handleEscape);
      win.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, setOpen]);

  if (!mounted || !open) return <span ref={anchorRef} hidden />;

  // Portal into the anchor's own document (supports iframe rendering).
  const portalTarget = anchorRef.current?.ownerDocument.body ?? document.body;

  return (
    <>
      <span ref={anchorRef} hidden />
      {createPortal(
    <div
      ref={contentRef}
      role="menu"
      style={{
        top: adjustedCoords.y,
        left: adjustedCoords.x,
        opacity: visible ? 1 : 0,
      }}
      className={cn(
        "fixed z-[9999] min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-md transition-opacity duration-150",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()} // Prevent nesting native menus
      {...props}
    >
      {children}
    </div>,
    portalTarget
      )}
    </>
  );
}

// ==========================================
// 5. SUB-COMPONENTS
// ==========================================
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  disabled?: boolean;
}

export function ContextMenuItem({ className, inset, disabled, onClick, children, ...props }: ContextMenuItemProps) {
  const context = useContext(ContextMenuContext);
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    context?.setOpen(false); // Close menu after clicking an item
  };

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        inset && "pl-8",
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 text-zinc-950 dark:text-zinc-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} {...props} />;
}

export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}

export function ContextMenuLabel({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return <div className={cn("px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400", inset && "pl-8", className)} {...props} />;
}