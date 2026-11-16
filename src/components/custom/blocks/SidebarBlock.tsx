"use client";

import { cn } from "@/lib/utils";
import { Menu, X, Lock, ChevronsUpDown, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SidebarContext, useSidebar } from "./sidebar-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "./TooltipBlock";

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
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden",
          "transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col md:relative md:translate-x-0",
          // Mobile drawer glides smoothly and slowly in and out
          "transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform motion-reduce:transition-none md:transition-[width] md:duration-300 md:ease-in-out",
          expanded ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          variant === "attached"
            ? "border-r border-border bg-card text-card-foreground"
            : "m-4 h-[calc(100vh-2rem)] rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
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
        type="button"
        aria-label="Close sidebar"
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors ml-2 shrink-0"
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
        "flex items-center font-bold text-xl text-foreground",
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

const SidebarContentContext = React.createContext<{ animatedPill?: boolean }>({
  animatedPill: false,
});

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  animatedPill?: boolean;
}

export function SidebarContent({
  className,
  animatedPill = false,
  children,
  ...props
}: SidebarContentProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    top: number;
    height: number;
    opacity: number;
  }>({
    top: 0,
    height: 0,
    opacity: 0,
  });

  React.useEffect(() => {
    if (!animatedPill) return;
    const container = containerRef.current;
    if (!container) return;

    const updateIndicator = () => {
      const activeEl = container.querySelector<HTMLElement>(
        "[data-pill-active='true']",
      );
      if (activeEl) {
        const isInsideClosed = activeEl.closest('[data-state="closed"]');
        const activeRect = activeEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (
          isInsideClosed ||
          activeRect.height === 0 ||
          activeEl.offsetParent === null
        ) {
          setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        } else {
          const top = activeRect.top - containerRect.top + container.scrollTop;
          setIndicatorStyle({
            top,
            height: activeRect.height,
            opacity: 1,
          });
        }
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(() => {
      updateIndicator();
    });
    mutationObserver.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-state"],
    });

    const handleTransition = () => {
      updateIndicator();
    };
    container.addEventListener("transitionrun", handleTransition);
    container.addEventListener("transitionstart", handleTransition);
    container.addEventListener("transitionend", handleTransition);

    const timeout = setTimeout(updateIndicator, 50);
    return () => {
      clearTimeout(timeout);
      container.removeEventListener("transitionrun", handleTransition);
      container.removeEventListener("transitionstart", handleTransition);
      container.removeEventListener("transitionend", handleTransition);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  });

  return (
    <SidebarContentContext.Provider value={{ animatedPill }}>
      <div
        ref={containerRef}
        className={cn(
          "relative flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
        {...props}
      >
        {/* Sliding Active Pill Indicator - Only enabled when animatedPill is true */}
        {animatedPill && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-3 right-3 rounded-lg bg-primary/10 dark:bg-primary/20 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              top: `${indicatorStyle.top}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        )}
        {children}
      </div>
    </SidebarContentContext.Provider>
  );
}

// ==========================================
// 4. GROUPS & ITEMS
// ==========================================
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function SidebarGroup({
  label,
  collapsible = false,
  defaultOpen = true,
  className,
  children,
  ...props
}: SidebarGroupProps) {
  const { expanded } = useSidebar();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isVisible = !collapsible || isOpen || !expanded;

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {label && (
        <div
          onClick={() => collapsible && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 select-none",
            collapsible && "cursor-pointer hover:text-foreground",
            expanded
              ? "max-h-[24px] opacity-100 mb-1"
              : "max-h-0 opacity-0 mb-0 pointer-events-none",
          )}
        >
          <span>{label}</span>
          {collapsible && expanded && (
            <svg
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                !isOpen && "-rotate-90",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      )}
      {collapsible ? (
        <div
          data-state={isVisible ? "open" : "closed"}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isVisible
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none",
          )}
        >
          <div
            className={cn(
              "overflow-hidden flex flex-col gap-1 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isVisible ? "translate-y-0" : "-translate-y-2",
            )}
          >
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  pill?: boolean;
}

export function SidebarItem({
  icon,
  active,
  badge,
  pill,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { expanded, color } = useSidebar();
  const { animatedPill } = React.useContext(SidebarContentContext);
  const isPill = pill ?? animatedPill;

  const item = (
    <button
      data-pill-active={isPill && active ? "true" : undefined}
      className={cn(
        "group relative flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 outline-none",
        isPill && "z-10 transition-colors",
        !expanded && "justify-center px-0",
        isPill
          ? active
            ? color === "primary" || color === "default" || !color
              ? "text-primary font-semibold"
              : `text-${color}-600 dark:text-${color}-400 font-semibold`
            : "text-muted-foreground hover:text-foreground"
          : active
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
            active && (isPill ? "scale-105" : "scale-110"),
          )}
        >
          {icon}
        </div>
      )}

      {/* Label Slot (Uses max-w to force strict collapsing) */}
      <div
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300 text-left flex-1",
          expanded
            ? "max-w-[200px] opacity-100 ml-3"
            : "max-w-0 opacity-0 ml-0",
        )}
      >
        {children}
      </div>

      {/* Badge Slot */}
      {badge !== undefined && expanded && (
        <div className="ml-auto shrink-0 transition-opacity duration-300">
          {typeof badge === "string" || typeof badge === "number" ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500/15 px-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}
    </button>
  );

  // Collapsed rail: the label moves into a Tooltip. It portals to the body,
  // so it is never clipped by the rail's overflow the way an absolutely
  // positioned label would be.
  if (expanded) return item;
  return (
    <Tooltip delayDuration={100}>
      {/* The button is the tab stop; the trigger wrapper only listens. */}
      <TooltipTrigger className="block w-full" tabIndex={-1}>
        {item}
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={12} className="font-semibold">
        {children}
      </TooltipContent>
    </Tooltip>
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

// ==========================================
// 6. HIGH-LEVEL CATEGORIZED DASHBOARD SIDEBAR
// ==========================================
export interface SidebarRouteItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
}

export interface SidebarRouteGroup {
  label: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  items: SidebarRouteItem[];
}

export interface SidebarWorkspace {
  id?: string;
  name: string;
  badge?: string;
  tierDescription?: string;
  isPrivate?: boolean;
  user: string;
  userEmail?: string;
  avatar?: string;
}

export interface CategorizedSidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  workspace: SidebarWorkspace;
  workspaces?: SidebarWorkspace[];
  onWorkspaceChange?: (workspace: SidebarWorkspace) => void;
  groups: SidebarRouteGroup[];
  activeRoute: string;
  onRouteChange?: (routeId: string) => void;
  breadcrumb?: string;
  greeting?: string;
}

export function CategorizedSidebar({
  workspace,
  workspaces,
  onWorkspaceChange,
  groups,
  activeRoute,
  onRouteChange,
  breadcrumb,
  greeting,
  className,
  ...props
}: CategorizedSidebarProps) {
  const [selectedWs, setSelectedWs] = useState<SidebarWorkspace>(workspace);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedWs(workspace);
  }, [workspace]);

  const activeWs = workspaces ? selectedWs : workspace;
  const availableWorkspaces = workspaces || [workspace];

  return (
    <Sidebar variant="attached" className={className} {...props}>
      {/* 1. Header with workspace dropdown switcher */}
      <SidebarHeader className="h-16 px-4 border-b border-border/40 relative">
        <button
          type="button"
          onClick={() => {
            if (availableWorkspaces.length > 1) {
              setIsDropdownOpen(!isDropdownOpen);
            }
          }}
          className={cn(
            "flex flex-1 min-w-0 items-center justify-between gap-2 p-1 rounded-xl transition-colors text-left outline-none group",
            availableWorkspaces.length > 1 && "cursor-pointer",
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
              {activeWs.avatar || activeWs.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-foreground truncate">
                  {activeWs.name}
                </span>
                {activeWs.badge && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                      activeWs.badge === "Pro"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {activeWs.badge}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Lock className="w-2.5 h-2.5" />{" "}
                {activeWs.isPrivate ?? true ? "Private" : "Public"}
              </span>
            </div>
          </div>
          {availableWorkspaces.length > 1 && (
            <ChevronsUpDown
              className={cn(
                "w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-200",
                isDropdownOpen && "rotate-180 text-primary",
              )}
            />
          )}
        </button>

        {/* WORKSPACE DROPDOWN POPOVER */}
        {isDropdownOpen && availableWorkspaces.length > 1 && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute top-full left-3 right-3 mt-1.5 z-40 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-xl p-1.5 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Select Plan
              </div>
              <div className="space-y-0.5 mt-1">
                {availableWorkspaces.map((ws) => {
                  const isSelected =
                    (ws.id || ws.name) === (activeWs.id || activeWs.name);
                  return (
                    <button
                      key={ws.id || ws.name}
                      type="button"
                      onClick={() => {
                        setSelectedWs(ws);
                        onWorkspaceChange?.(ws);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors outline-none",
                        isSelected
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={cn(
                            "h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {ws.badge ? ws.badge.charAt(0) : ws.name.charAt(0)}
                        </div>
                        <div className="flex flex-col truncate">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "truncate",
                                isSelected
                                  ? "text-foreground font-semibold"
                                  : "text-foreground/80",
                              )}
                            >
                              {ws.name}
                            </span>
                            {ws.badge && (
                              <span
                                className={cn(
                                  "text-[9px] px-1 py-0.2 rounded-full font-bold",
                                  isSelected
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                {ws.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {ws.tierDescription || ws.user}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 shrink-0 ml-1.5 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </SidebarHeader>

      {/* 2. Menu Content with Groups & Active Sliding Pill */}
      <SidebarContent animatedPill className="p-3 space-y-4">
        {/* Welcome Back Greeting */}
        <div className="px-3 pt-1 pb-1 text-left">
          <p className="text-[10px] text-muted-foreground font-medium">
            {breadcrumb || `${activeWs.name} > Dashboard`}
          </p>
          <h3 className="text-base font-bold tracking-tight text-foreground mt-0.5 leading-snug">
            {greeting ? (
              greeting
            ) : (
              <>
                Welcome Back,
                <br />
                {activeWs.user} 👋
              </>
            )}
          </h3>
        </div>

        {/* Groups */}
        {groups.map((group) => (
          <SidebarGroup
            key={group.label}
            label={group.label}
            collapsible={group.collapsible ?? true}
            defaultOpen={group.defaultOpen ?? true}
          >
            {group.items.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                active={activeRoute === item.id}
                badge={item.badge}
                onClick={() => onRouteChange?.(item.id)}
              >
                {item.label}
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* 3. Footer Profile */}
      <SidebarFooter className="border-t border-border/40 p-3">
        <div className="flex items-center gap-2.5 w-full">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 border border-primary/20">
            {activeWs.user
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex flex-col text-left min-w-0 flex-1">
            <span className="text-xs font-semibold text-foreground truncate">
              {activeWs.user}
            </span>
            {activeWs.userEmail && (
              <span className="text-[10px] text-muted-foreground truncate">
                {activeWs.userEmail}
              </span>
            )}
          </div>
          <span className="text-muted-foreground hover:text-foreground cursor-pointer text-xs font-bold">
            ••
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
