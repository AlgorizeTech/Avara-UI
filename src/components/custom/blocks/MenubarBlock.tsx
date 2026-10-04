"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// Positioning has to be measured before paint, but layout effects don't run on
// the server — fall back to useEffect there so SSR stays warning-free.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ==========================================
// CONTEXT & STATE MANAGEMENT
// ==========================================
interface MenubarContextType {
  activeMenu: string | null;
  setActiveMenu: (value: string | null) => void;
}
const MenubarContext = createContext<MenubarContextType | undefined>(undefined);

interface MenuContextType {
  value: string;
}
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// ==========================================
// 1. ROOT MENUBAR
// ==========================================
export type MenubarProps = React.HTMLAttributes<HTMLDivElement>;

export function Menubar({ className, children, ...props }: MenubarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menubarRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menubarRef.current &&
        !menubarRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeMenu]);

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div
        ref={menubarRef}
        className={cn(
          // min-h rather than a fixed height: a bar with more menus than the
          // container can hold wraps to a second row instead of being cropped.
          "flex min-h-10 flex-wrap items-center gap-y-1 space-x-1 rounded-md border border-border bg-card text-card-foreground p-1 shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

// ==========================================
// 2. MENU WRAPPER
// ==========================================
export interface MenubarMenuProps {
  value: string;
  children: React.ReactNode;
}

export function MenubarMenu({ value, children }: MenubarMenuProps) {
  return (
    <MenuContext.Provider value={{ value }}>
      <div className="relative inline-block text-left">{children}</div>
    </MenuContext.Provider>
  );
}

// ==========================================
// 3. MENU TRIGGER
// ==========================================
export function MenubarTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const rootContext = useContext(MenubarContext);
  const menuContext = useContext(MenuContext);

  if (!rootContext || !menuContext)
    throw new Error("MenubarTrigger must be used within MenubarMenu");

  const { activeMenu, setActiveMenu } = rootContext;
  const { value } = menuContext;
  const isOpen = activeMenu === value;

  const handleMouseEnter = () => {
    // If ANY menu is currently open, seamlessly switch to this one on hover
    if (activeMenu !== null && activeMenu !== value) {
      setActiveMenu(value);
    }
  };

  const handleClick = () => {
    setActiveMenu(isOpen ? null : value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(
        // Tighter horizontal padding on phones — same type scale, so every
        // trigger in the bar still reads as one set.
        "flex cursor-default select-none items-center whitespace-nowrap rounded-sm px-2 sm:px-3 py-1.5 text-sm font-medium outline-none transition-colors",
        isOpen
          ? "bg-muted text-foreground"
          : "text-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ==========================================
// 4. MENU CONTENT (DROPDOWN)
// ==========================================
export interface MenubarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "center";
}

export function MenubarContent({
  className,
  align = "start",
  children,
  ...props
}: MenubarContentProps) {
  const rootContext = useContext(MenubarContext);
  const menuContext = useContext(MenuContext);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen =
    !!rootContext && !!menuContext && rootContext.activeMenu === menuContext.value;

  // A trigger near the right edge would otherwise open its menu off screen, and
  // a long menu near the bottom would run past the fold. Both are measured from
  // the real geometry after mount, so the menu adapts to the actual viewport
  // instead of guessing from a breakpoint. marginLeft (not transform) does the
  // nudging, so it composes with the `align` classes.
  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!isOpen || !el) return;

    const fit = () => {
      el.style.marginLeft = "0px";
      el.style.maxHeight = "";

      // offsetLeft/offsetWidth are layout values, so the open animation's
      // scale + slide can't skew them the way a client rect would.
      const anchor = el.offsetParent as HTMLElement | null;
      const anchorRect = anchor?.getBoundingClientRect();
      const fallback = anchorRect ? null : el.getBoundingClientRect();
      const left = anchorRect
        ? anchorRect.left + anchor!.clientLeft + el.offsetLeft
        : fallback!.left;
      const top = anchorRect
        ? anchorRect.top + anchor!.clientTop + el.offsetTop
        : fallback!.top;
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const margin = 8;

      let shift = 0;
      if (left + width > window.innerWidth - margin) {
        shift = window.innerWidth - margin - (left + width);
      }
      if (left + shift < margin) shift = margin - left;
      if (shift) el.style.marginLeft = `${shift}px`;

      const room = window.innerHeight - top - margin;
      if (height > room) el.style.maxHeight = `${Math.max(room, 96)}px`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [isOpen]);

  if (!rootContext || !menuContext)
    throw new Error("MenubarContent must be used within MenubarMenu");

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 mt-1 min-w-[12rem] max-w-[calc(100vw-1rem)] overflow-y-auto overflow-x-hidden rounded-md border border-border bg-popover text-popover-foreground p-1 shadow-md animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150",
        align === "start" && "left-0",
        align === "end" && "right-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 5. MENU ITEMS
// ==========================================
export interface MenubarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
}

export function MenubarItem({
  className,
  inset,
  children,
  onClick,
  disabled,
  ...props
}: MenubarItemProps) {
  const rootContext = useContext(MenubarContext);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        if (onClick) onClick(e);
        rootContext?.setActiveMenu(null); // Auto-close on click
      }}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        inset && "pl-8",
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:bg-primary/10 hover:text-primary focus:bg-primary/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ==========================================
// 6. UTILITIES (Separator, Shortcut, Checkbox)
// ==========================================
export function MenubarSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
    />
  );
}

export function MenubarShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function MenubarLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}
