"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ==========================================
// 0. COLOR THEMES
// ==========================================
export type ContextMenuColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, { itemHover: string; triggerHover: string }> = {
  primary: {
    itemHover: "hover:bg-primary/10 hover:text-primary text-foreground",
    triggerHover: "hover:border-primary/50",
  },
  indigo: {
    itemHover: "hover:bg-indigo-500/15 hover:text-indigo-600 dark:hover:text-indigo-400 text-foreground",
    triggerHover: "hover:border-indigo-500/50",
  },
  rose: {
    itemHover: "hover:bg-rose-500/15 hover:text-rose-600 dark:hover:text-rose-400 text-foreground",
    triggerHover: "hover:border-rose-500/50",
  },
  emerald: {
    itemHover: "hover:bg-emerald-500/15 hover:text-emerald-600 dark:hover:text-emerald-400 text-foreground",
    triggerHover: "hover:border-emerald-500/50",
  },
  blue: {
    itemHover: "hover:bg-blue-500/15 hover:text-blue-600 dark:hover:text-blue-400 text-foreground",
    triggerHover: "hover:border-blue-500/50",
  },
  zinc: {
    itemHover: "hover:bg-zinc-500/15 hover:text-zinc-900 dark:hover:text-zinc-100 text-foreground",
    triggerHover: "hover:border-zinc-500/50",
  },
};

function getContextMenuTheme(color?: ContextMenuColor) {
  const c = color || "primary";
  const isCustomHex = c.startsWith("#") || c.startsWith("rgb") || c.startsWith("hsl");

  if (isCustomHex) {
    return {
      isCustomHex: true,
      customVars: {
        "--ctx-color": c,
        "--ctx-color-15": c.startsWith("#") && c.length === 7 ? `${c}26` : c,
      } as React.CSSProperties,
      itemHover: "hover:bg-[var(--ctx-color-15)] hover:text-[var(--ctx-color)] text-foreground",
      triggerHover: "hover:border-[var(--ctx-color)]",
    };
  }

  const preset = colorThemes[c] || colorThemes.primary;
  return {
    isCustomHex: false,
    customVars: {} as React.CSSProperties,
    itemHover: preset.itemHover,
    triggerHover: preset.triggerHover,
  };
}

// ==========================================
// 1. CONTEXT
// ==========================================
interface ContextMenuContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { x: number; y: number };
  setCoords: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  color: ContextMenuColor;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface ContextMenuProps {
  children: React.ReactNode;
  color?: ContextMenuColor;
}

export function ContextMenu({ children, color = "primary" }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords, color }}>
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

  const { setOpen, setCoords, color } = context;
  const theme = getContextMenuTheme(color);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenuAt = (x: number, y: number) => {
    setCoords({ x, y });
    setOpen(true);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Stop the native browser menu
    e.stopPropagation();
    openMenuAt(e.clientX, e.clientY);
  };

  // Long press for mobile touch screens
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      timerRef.current = setTimeout(() => {
        openMenuAt(x, y);
      }, 500); // 500ms long press
    }
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Also trigger on left click if desired for user convenience
    openMenuAt(e.clientX, e.clientY);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{ ...theme.customVars, ...props.style }}
      className={cn("w-full h-full select-none cursor-pointer transition-colors", theme.triggerHover, className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. CONTENT (Portal Renderer with Collision)
// ==========================================
export type ContextMenuVariant = "default" | "minimal" | "glass";

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContextMenuVariant;
}

export function ContextMenuContent({
  variant = "default",
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuContent must be used within a ContextMenu");

  const { open, setOpen, coords, color } = context;
  const theme = getContextMenuTheme(color);
  const contentRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [adjustedCoords, setAdjustedCoords] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  // Resolves the document this menu actually lives in, which is not always the
  // global one — previews portal components into an iframe. Resolving in a
  // callback ref rather than reading a ref during render keeps render pure, and
  // a null target doubles as the "not mounted yet" signal that guards SSR.
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
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

      // Resolve the window & viewport width the menu lives in (supports iframe rendering).
      const win = menu.ownerDocument.defaultView ?? window;
      const viewportWidth = win.document.documentElement.clientWidth || win.innerWidth;
      const viewportHeight = win.document.documentElement.clientHeight || win.innerHeight;

      const rect = menu.getBoundingClientRect();
      let x = coords.x;
      let y = coords.y;

      // On small screens, if clicking near the right half or if menu extends near right edge, shift left
      if (x + rect.width > viewportWidth - 16 || (viewportWidth < 640 && x > viewportWidth / 2)) {
        x = Math.max(12, x - rect.width);
        if (x + rect.width > viewportWidth - 12) {
          x = Math.max(12, viewportWidth - rect.width - 16);
        }
      }
      // Prevent opening off the left edge
      if (x < 12) {
        x = 12;
      }

      // Prevent opening off the bottom edge
      if (y + rect.height > viewportHeight - 16) {
        y = Math.max(12, viewportHeight - rect.height - 16);
      }
      // Prevent opening off the top edge
      if (y < 12) {
        y = 12;
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

  const variantClasses: Record<ContextMenuVariant, string> = {
    default: "border-border bg-popover text-popover-foreground shadow-md",
    minimal: "border-border/50 bg-popover/95 text-popover-foreground shadow-sm backdrop-blur-xs",
    glass: "border-foreground/10 bg-popover/80 text-popover-foreground backdrop-blur-xl shadow-xl",
  };

  if (!portalTarget || !open) {
    return <span ref={setAnchor} className="hidden" style={{ display: "none" }} aria-hidden="true" />;
  }

  return (
    <>
      <span ref={setAnchor} className="hidden" style={{ display: "none" }} aria-hidden="true" />
      {createPortal(
        <div
          ref={contentRef}
          role="menu"
          style={{
            top: adjustedCoords.y,
            left: adjustedCoords.x,
            opacity: visible ? 1 : 0,
            ...theme.customVars,
            ...props.style,
          }}
          className={cn(
            "fixed z-[9999] w-48 sm:w-64 max-w-[calc(100vw-24px)] max-h-[calc(100vh-24px)] overflow-y-auto rounded-md border p-1 transition-opacity duration-150 text-xs sm:text-sm",
            variantClasses[variant],
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
  const theme = getContextMenuTheme(context?.color);
  
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
        "group relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        inset && "pl-8",
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : theme.itemHover,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border/60 dark:bg-border", className)} {...props} />;
}

export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground group-hover:text-primary/80 transition-colors", className)} {...props} />;
}

export function ContextMenuLabel({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return <div className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", inset && "pl-8", className)} {...props} />;
}