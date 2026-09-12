"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SidebarContext, useSidebar } from "./sidebar-context";

// ==========================================
// 1. PROVIDER & ROOT LAYOUT
// ==========================================
export interface SidebarProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  color?: string;
  className?: string;
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
  color = "primary",
  className,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ expanded, setExpanded, isMobileOpen, setIsMobileOpen, color }}
    >
      <div
        className={cn(
          "relative flex h-full min-h-screen w-full overflow-hidden bg-muted",
          className,
        )}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// ==========================================
// 2. MAIN SIDEBAR CONTAINER
// ==========================================
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "attached" | "floating";
}

export function Sidebar({
  variant = "attached",
  className,
  children,
  ...props
}: SidebarProps) {
  const { expanded, isMobileOpen, setIsMobileOpen } = useSidebar();

  return (
    <>
      {/* Backdrop stays mounted so it can fade both in and out with the drawer */}
      <div
        aria-hidden={!isMobileOpen}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden",
          "transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          isMobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col md:relative md:translate-x-0",
          // Mobile drawer glides in on a decelerating curve; desktop rail keeps the shorter width tween
          "transition-[width,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform motion-reduce:transition-none md:duration-300 md:ease-in-out",
          expanded ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          variant === "attached"
            ? "border-r border-border bg-white dark:bg-[#050505]"
            : "m-4 h-[calc(100vh-2rem)] rounded-2xl border border-border bg-white dark:bg-[#050505] shadow-sm",
          // Lifted off the backdrop while it is an open drawer (mobile only state)
          isMobileOpen && "shadow-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

// ==========================================
// 3. HEADER, FOOTER, BRAND
// ==========================================
export function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, setIsMobileOpen } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-16 shrink-0 items-center justify-between transition-all",
        expanded ? "px-4" : "justify-center px-0",
        className,
      )}
      {...props}
    >
      {children}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden p-1 text-muted-foreground hover:bg-muted rounded-md"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export function SidebarBrand({
  icon,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center font-black text-xl text-foreground",
        className,
      )}
      {...props}
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300",
          expanded
            ? "max-w-[200px] opacity-100 ml-2"
            : "max-w-0 opacity-0 ml-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex shrink-0 flex-col border-t border-border p-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. GROUPS & ITEMS
// ==========================================
export function SidebarGroup({
  label,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { label?: string }) {
  const { expanded } = useSidebar();

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {label && (
        <div
          className={cn(
            "px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 overflow-hidden",
            expanded
              ? "max-h-[20px] opacity-100 mb-1"
              : "max-h-0 opacity-0 mb-0",
          )}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

export function SidebarItem({
  icon,
  active,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { expanded, color } = useSidebar();

  return (
    <button
      className={cn(
        "group relative flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 outline-none",
        !expanded && "justify-center px-0",
        active
          ? color === "primary" || color === "default" || !color
            ? "bg-primary/10 text-primary font-medium"
            : `bg-${color}-50 text-${color}-600 dark:bg-${color}-500/10 dark:text-${color}-400`
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      {/* Icon Slot */}
      {icon && (
        <div
          className={cn(
            "shrink-0 transition-transform duration-200",
            active && "scale-110",
          )}
        >
          {icon}
        </div>
      )}

      {/* Label Slot (Uses max-w to force strict collapsing) */}
      <div
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300 text-left",
          expanded
            ? "max-w-[200px] opacity-100 ml-3"
            : "max-w-0 opacity-0 ml-0",
        )}
      >
        {children}
      </div>

      {/* Pure CSS Native Tooltip (Shows only when collapsed on hover) */}
      {!expanded && (
        <div className="absolute left-full ml-4 hidden rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground opacity-0 shadow-md group-hover:block group-hover:opacity-100 z-50">
          {children}
          <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-primary" />
        </div>
      )}
    </button>
  );
}

// ==========================================
// 5. UTILITY TRIGGERS
// ==========================================
export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded, setExpanded } = useSidebar();

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "hidden md:flex p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors",
        className,
      )}
      {...props}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

export function MobileSidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setIsMobileOpen } = useSidebar();

  return (
    <button
      onClick={() => setIsMobileOpen(true)}
      className={cn(
        "md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors",
        className,
      )}
      {...props}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
