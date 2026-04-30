"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
          "flex h-10 items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-sm",
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
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-colors",
        isOpen
          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50",
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

  if (!rootContext || !menuContext)
    throw new Error("MenubarContent must be used within MenubarMenu");

  if (rootContext.activeMenu !== menuContext.value) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-md animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150",
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
          : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 focus:bg-indigo-50 dark:focus:bg-indigo-500/10",
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
      className={cn("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className)}
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
        "ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400",
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
        "px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}
