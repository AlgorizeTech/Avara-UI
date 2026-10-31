"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { accentStyle } from "@/lib/accent";
import {
  BookOpen,
  Home,
  LayoutGrid,
  Compass,
  Sparkles,
  ArrowRight,
  Activity,
  Search,
  Cpu,
  Radio,
  Zap,
} from "lucide-react";

export type NotFoundVariant =
  | "hyperspace"
  | "animated-beam-border"
  | "quantum-hologram";

export interface ShortcutItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface NotFoundAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface NotFoundSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Visual variant: classic "hyperspace" or vibrant "animated-beam-border" */
  variant?: NotFoundVariant;
  /** Numerical error code, defaults to "404" */
  code?: string;
  /** Floating badge text */
  badge?: string;
  /** Main heading title */
  title?: string;
  /** Explanatory description */
  description?: string;
  /** Primary button action */
  primaryAction?: NotFoundAction;
  /** Secondary button action */
  secondaryAction?: NotFoundAction;
  /** Section heading for shortcut quicklinks */
  shortcutsTitle?: string;
  /** List of shortcut links */
  shortcuts?: ShortcutItem[];
  /** Toggle visibility of shortcut quicklinks card */
  showShortcuts?: boolean;
  /** Optional theme accent color string */
  color?: string;
}

/* ========================================================================== */
/*  VARIANT 1: CLASSIC HYPERSPACE 404 SECTION                                 */
/* ========================================================================== */

export function HyperspaceNotFoundSection({
  code = "404",
  badge = "Error 404 • Page Not Found",
  title = "Lost in Hyperspace?",
  description = "The page you are looking for doesn't exist, was relocated, or is temporarily unavailable in this documentation.",
  primaryAction = {
    label: "Explore Documentation",
    href: "/docs",
    icon: <BookOpen className="h-4 w-4" />,
  },
  secondaryAction = {
    label: "Back to Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  shortcutsTitle = "Popular Shortcuts",
  shortcuts = [
    {
      label: "All Components",
      href: "/docs",
      icon: <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-primary" />,
    },
    {
      label: "Installation",
      href: "/docs",
      icon: <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />,
    },
  ],
  showShortcuts = true,
  color,
  className,
  ...props
}: NotFoundSectionProps) {
  const dynamicAccent = accentStyle(color);

  const renderAction = (action?: NotFoundAction, isPrimary = false) => {
    if (!action) return null;

    const baseClass = isPrimary
      ? "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-[14px] font-semibold tracking-[0.3px] text-background transition-all hover:bg-foreground/90 active:scale-[0.98] cursor-pointer"
      : "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground/[0.04] px-7 py-3 text-[14px] font-medium text-foreground transition-all hover:bg-foreground/10 active:scale-[0.98] cursor-pointer";

    if (action.href) {
      return (
        <a
          href={action.href}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
          className={baseClass}
        >
          {action.icon}
          <span>{action.label}</span>
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={action.onClick}
        className={baseClass}
      >
        {action.icon}
        <span>{action.label}</span>
      </button>
    );
  };

  return (
    <section
      style={dynamicAccent}
      className={cn(
        "relative flex min-h-[580px] sm:min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-12 text-center transition-colors duration-300 font-sans",
        className
      )}
      {...props}
    >
      {/* Ambient Radial Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]"
      />

      {/* Grid Pattern Background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="flex w-full max-w-2xl flex-col items-center justify-center">
        {/* Status Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3.5 py-1 text-[12px] text-foreground/90 backdrop-blur border border-foreground/[0.06] select-none">
            <Compass
              className="h-3.5 w-3.5 animate-spin text-primary"
              style={{ animationDuration: "10s" }}
            />
            <span>{badge}</span>
          </div>
        )}

        {/* Big Code Heading */}
        <h1 className="mt-6 select-none font-serif font-normal text-[clamp(88px,20vw,168px)] leading-none tracking-[-0.04em] text-primary">
          {code}
        </h1>

        {/* Title & Description */}
        <div className="mt-6 max-w-lg">
          <h2 className="font-serif font-normal text-[clamp(26px,3.6vw,46px)] leading-[1.15] tracking-[-0.02em] text-foreground mb-3">
            {title}
          </h2>
          <p className="mx-auto max-w-[490px] text-[14px] sm:text-[15px] leading-[1.65] text-foreground/60">
            {description}
          </p>
        </div>

        {/* Primary Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-7 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row">
            {renderAction(primaryAction, true)}
            {renderAction(secondaryAction, false)}
          </div>
        )}

        {/* Quick Links Footer Card */}
        {showShortcuts && shortcuts && shortcuts.length > 0 && (
          <div className="mt-12 w-full max-w-md border-t border-foreground/[0.06] pt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/30 select-none">
              {shortcutsTitle}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {shortcuts.map((shortcut, idx) => {
                const ItemTag = shortcut.href ? "a" : "button";
                return (
                  <ItemTag
                    key={idx}
                    href={shortcut.href}
                    onClick={shortcut.onClick}
                    className="flex items-center gap-2.5 rounded-lg bg-foreground/[0.04] p-2.5 text-left text-[13px] text-foreground/70 transition-all hover:bg-foreground/[0.07] hover:text-foreground cursor-pointer border border-transparent hover:border-foreground/[0.04]"
                  >
                    {shortcut.icon}
                    <span className="truncate font-medium">{shortcut.label}</span>
                  </ItemTag>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  VARIANT 2: ARCHITECTURAL MODULAR CAD BLUEPRINT 404 SECTION                */
/* ========================================================================== */

const ANIMATED_BORDER_KEYFRAMES = `
@keyframes not-found-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes not-found-ruler-scan {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(500%); }
  100% { transform: translateX(-100%); }
}
`;

export function AnimatedBeamNotFoundSection({
  code = "404",
  badge = "CAD SPEC // 0x404 ROUTE EXCEPTION",
  title = "Lost in the Digital Architecture?",
  description = "The requested navigation vector has collapsed or relocated to an unindexed partition. Re-anchor to safety using the architectural directory below.",
  primaryAction = {
    label: "Explore Documentation",
    href: "/docs",
    icon: <BookOpen className="h-4 w-4" />,
  },
  secondaryAction = {
    label: "Return to Homepage",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  shortcutsTitle = "Tactical Navigation Directory",
  shortcuts = [
    {
      label: "All Components",
      href: "/docs",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      label: "Installation Guide",
      href: "/docs",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: "Templates Library",
      href: "/docs",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      label: "Live Changelog",
      href: "/",
      icon: <Activity className="h-4 w-4" />,
    },
  ],
  showShortcuts = true,
  color,
  className,
  ...props
}: NotFoundSectionProps) {
  const dynamicAccent = accentStyle(color);
  const [searchVal, setSearchVal] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setSearchStatus(`Scanning vector "${searchVal.trim()}"... 4 verified healthy routes identified.`);
    setTimeout(() => setSearchStatus(null), 3500);
  };

  const renderAction = (action?: NotFoundAction, isPrimary = false) => {
    if (!action) return null;

    const baseClass = isPrimary
      ? "group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[var(--radius-xl,0.875rem)] bg-primary text-primary-foreground font-semibold px-5 sm:px-6 py-2.5 text-xs sm:text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none"
      : "relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[var(--radius-xl,0.875rem)] border border-border bg-background hover:bg-muted hover:border-primary/40 hover:scale-[1.02] text-foreground font-medium px-5 sm:px-6 py-2.5 text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer select-none";

    if (action.href) {
      return (
        <a
          href={action.href}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
          className={baseClass}
        >
          {action.icon}
          <span>{action.label}</span>
          {isPrimary && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          )}
        </a>
      );
    }

    return (
      <button type="button" onClick={action.onClick} className={baseClass}>
        {action.icon}
        <span>{action.label}</span>
        {isPrimary && (
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
        )}
      </button>
    );
  };

  return (
    <section
      style={dynamicAccent}
      className={cn(
        "relative flex min-h-[640px] sm:min-h-[720px] w-full flex-col items-center justify-center overflow-hidden px-3 sm:px-6 lg:px-8 py-8 sm:py-14 text-left transition-colors duration-300 font-sans select-none bg-background",
        className
      )}
      {...props}
    >
      <style>{ANIMATED_BORDER_KEYFRAMES}</style>

      {/* Crisp Architectural Background Grid (Zero Blur Blobs) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      {/* Architectural CAD Blueprint Master Container (Zero Shadow) */}
      <div className="relative w-full max-w-5xl rounded-[var(--radius-3xl,1.5rem)] bg-card border border-border overflow-hidden transition-all flex flex-col">
        {/* ================================================================== */}
        {/* TOP SPEC RAIL: Technical Status Header                             */}
        {/* ================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border bg-muted/40 px-4 sm:px-6 py-3 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-bold text-foreground tracking-wider uppercase transition-colors hover:text-primary cursor-default">
              {badge}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-wider">
            <span>{"CAD SPEC // ROUTE_EXCEPTION"}</span>
            <span className="text-border">/</span>
            <span className="text-primary font-semibold">0x404</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
            <span className="hidden md:inline font-mono">STATUS: 404_NOT_FOUND</span>
            <span className="px-2 py-0.5 rounded-[var(--radius-sm,0.25rem)] border border-primary/30 bg-primary/10 text-primary font-semibold transition-all hover:bg-primary/20 cursor-default">
              UNRESOLVED
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* HERO ROW: Monumental Typographic 404 + Metadata Spec Tiles          */}
        {/* ================================================================== */}
        <div className="relative w-full py-6 sm:py-8 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-muted/10 border-b border-border">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="text-primary font-bold">[+]</span>
              <span>{"ERROR_IDENTIFIER // VECTOR_NULL"}</span>
            </span>
            <h1 className="font-mono font-black text-[clamp(60px,13vw,100px)] leading-none tracking-tight text-foreground select-none animate-[not-found-float_5s_ease-in-out_infinite] transition-transform duration-300 hover:scale-[1.02] cursor-default">
              {code}
            </h1>
          </div>

          {/* Technical Metadata Spec Box with Hover Scale & Border Glow Transitions */}
          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 font-mono text-[11px]">
            <div className="p-3 rounded-[var(--radius-lg,0.5rem)] border border-border bg-background flex flex-col transition-all duration-200 hover:border-primary/50 hover:bg-muted/40 hover:scale-[1.02] cursor-default group">
              <span className="text-muted-foreground text-[9px] uppercase group-hover:text-primary transition-colors">PROTOCOL</span>
              <span className="font-bold text-foreground">HTTP/3 QUIC</span>
            </div>
            <div className="p-3 rounded-[var(--radius-lg,0.5rem)] border border-border bg-background flex flex-col transition-all duration-200 hover:border-primary/50 hover:bg-muted/40 hover:scale-[1.02] cursor-default group">
              <span className="text-muted-foreground text-[9px] uppercase group-hover:text-primary transition-colors">STATE</span>
              <span className="font-bold text-primary">NULL_POINTER</span>
            </div>
            <div className="p-3 rounded-[var(--radius-lg,0.5rem)] border border-border bg-background flex flex-col col-span-2 sm:col-span-1 transition-all duration-200 hover:border-primary/50 hover:bg-muted/40 hover:scale-[1.02] cursor-default group">
              <span className="text-muted-foreground text-[9px] uppercase group-hover:text-primary transition-colors">SAFE_NODES</span>
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                04 VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* DRAFTING RULER TICK BAR (Architectural Spec Lines with Scan Beam)   */}
        {/* ================================================================== */}
        <div className="relative w-full flex items-center justify-between border-b border-border py-2 px-4 sm:px-6 font-mono text-[10px] text-muted-foreground/70 select-none overflow-hidden bg-background">
          {/* Animated laser scan beam along the ruler bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[not-found-ruler-scan_6s_ease-in-out_infinite]"
          />
          <span className="font-bold transition-transform duration-200 hover:scale-125 hover:text-primary cursor-default">+</span>
          <div className="flex-1 mx-3 flex justify-between items-center opacity-40">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "inline-block w-px bg-foreground transition-all duration-200 hover:scale-y-150 hover:bg-primary cursor-pointer",
                  i % 4 === 0 ? "h-3" : "h-1.5"
                )}
              />
            ))}
          </div>
          <span className="font-bold transition-transform duration-200 hover:scale-125 hover:text-primary cursor-default">+</span>
        </div>

        {/* ================================================================== */}
        {/* MODULAR CONTENT BODY: 2-Column Architectural Layout                 */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Column: Diagnostics, Description & Action Controls */}
          <div className="md:col-span-6 lg:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10.5px] text-primary font-bold uppercase tracking-widest">
                  {"// DIAGNOSTIC SUMMARY"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground transition-colors">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            {/* Flat Route Resolver Search Form (Zero Shadow, Smooth Focus) */}
            <form onSubmit={handleSearch} className="mt-5 sm:mt-6 w-full">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search route or component directory..."
                  className="w-full rounded-[var(--radius-xl,0.875rem)] bg-background border border-border pl-10 pr-22 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 font-mono"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 rounded-[var(--radius-lg,0.5rem)] bg-primary text-primary-foreground font-mono text-xs font-semibold px-3 py-1.5 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                >
                  RESOLVE
                </button>
              </div>
              {searchStatus && (
                <p className="mt-2 text-xs font-mono text-primary animate-pulse transition-all">
                  {searchStatus}
                </p>
              )}
            </form>

            {/* Primary & Secondary Action Buttons (Zero Shadow with Smooth Micro-Interaction) */}
            {(primaryAction || secondaryAction) && (
              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
                {renderAction(primaryAction, true)}
                {renderAction(secondaryAction, false)}
              </div>
            )}
          </div>

          {/* Right Column: Navigation Directory Tiles */}
          <div className="md:col-span-6 lg:col-span-5 p-5 sm:p-7 md:p-8 border-t md:border-t-0 md:border-l border-border bg-muted/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {shortcutsTitle}
                </span>
                <span className="font-mono text-[10px] text-primary font-bold">
                  [SELECT VECTOR]
                </span>
              </div>

              {/* 4 Quick-link tiles in responsive grid with Smooth Hover Transitions */}
              {showShortcuts && shortcuts && shortcuts.length > 0 && (
                <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {shortcuts.map((shortcut, idx) => {
                    const ItemTag = shortcut.href ? "a" : "button";
                    return (
                      <ItemTag
                        key={idx}
                        href={shortcut.href}
                        onClick={shortcut.onClick}
                        className="group relative flex items-center justify-between gap-3 p-3 rounded-[var(--radius-lg,0.5rem)] border border-border bg-background hover:bg-muted/70 hover:border-primary/50 hover:translate-x-0.5 transition-all duration-200 cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Icon container: flat border, fills with solid primary on hover, icon turns pure white */}
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md,0.375rem)] border border-primary/25 bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-200 [&_svg]:transition-colors [&_svg]:group-hover:!text-white dark:[&_svg]:group-hover:!text-white">
                            {shortcut.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200 block truncate">
                              {shortcut.label}
                            </span>
                            <span className="text-[9.5px] font-mono text-muted-foreground block truncate">
                              VEC_0{idx + 1}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-200 shrink-0" />
                      </ItemTag>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Status Spec within Right Column */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-[10.5px] font-mono text-muted-foreground">
              <span>DESTINATION_STATUS</span>
              <span className="text-primary font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                READY TO ANCHOR
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BOTTOM ARCHITECTURAL SPEC BAR                                      */}
        {/* ================================================================== */}
        <div className="border-t border-border px-4 sm:px-6 py-2.5 bg-muted/30 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono text-muted-foreground">
          <span>{"CAD DRAFT // 01_ROOT -- RECOVERY DIRECTORY"}</span>
          <span className="hidden sm:inline">ALGORIZE UI • SYSTEM SPEC</span>
          <span>COORD: [404, 0, NULL]</span>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  VARIANT 3: ADVANCED QUANTUM HOLOGRAM & GYROSCOPIC SINGULARITY 404         */
/* ========================================================================== */

const QUANTUM_HOLOGRAM_KEYFRAMES = `
@keyframes quantum-orbit-clockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes quantum-orbit-counter {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
@keyframes quantum-hologram-flicker {
  0%, 100% { transform: translate(0, 0); opacity: 0.9; }
  25% { transform: translate(-2px, 1px); opacity: 0.7; }
  50% { transform: translate(2px, -1px); opacity: 0.95; }
  75% { transform: translate(-1px, -2px); opacity: 0.8; }
}
@keyframes quantum-wave-pulse {
  0%, 100% { transform: scaleY(0.3); opacity: 0.6; }
  50% { transform: scaleY(1.4); opacity: 1; }
}
@keyframes quantum-radar-sweep {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes quantum-pulse-glow {
  0%, 100% { transform: scale(0.95); opacity: 0.35; }
  50% { transform: scale(1.08); opacity: 0.7; }
}
`;

export function QuantumHologramNotFoundSection({
  code = "404",
  badge = "QUANTUM ROUTE ANOMALY // 0x404",
  title = "Lost in the Quantum Singularity?",
  description = "The spacetime coordinates of this page have drifted into an unmapped event horizon. Re-align your navigational trajectory via the recovery vectors below.",
  primaryAction = {
    label: "Re-anchor to Orbit",
    href: "/docs",
    icon: <Sparkles className="h-4 w-4" />,
  },
  secondaryAction = {
    label: "Return to Base",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  shortcutsTitle = "Quantum Recovery Trajectories",
  shortcuts = [
    {
      label: "Component Matrix",
      href: "/docs",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      label: "System Quickstart",
      href: "/docs",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: "Telemetry Hub",
      href: "/docs",
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      label: "Live Changelog",
      href: "/",
      icon: <Activity className="h-4 w-4" />,
    },
  ],
  showShortcuts = true,
  color,
  className,
  ...props
}: NotFoundSectionProps) {
  const dynamicAccent = accentStyle(color);
  const [searchVal, setSearchVal] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setSearchStatus(`Analyzing coordinates "${searchVal.trim()}"... Event horizon bypassed. 4 safe trajectories locked.`);
    setTimeout(() => setSearchStatus(null), 3500);
  };

  const renderAction = (action?: NotFoundAction, isPrimary = false) => {
    if (!action) return null;

    const baseClass = isPrimary
      ? "group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[var(--radius-xl,1rem)] bg-primary text-primary-foreground font-semibold px-6 py-3 text-xs sm:text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer select-none"
      : "relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[var(--radius-xl,1rem)] border border-border/80 bg-background/80 hover:bg-muted text-foreground font-medium px-6 py-3 text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer backdrop-blur-md select-none";

    if (action.href) {
      return (
        <a
          href={action.href}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
          className={baseClass}
        >
          {action.icon}
          <span>{action.label}</span>
          {isPrimary && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          )}
        </a>
      );
    }

    return (
      <button type="button" onClick={action.onClick} className={baseClass}>
        {action.icon}
        <span>{action.label}</span>
        {isPrimary && (
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
        )}
      </button>
    );
  };

  return (
    <section
      style={dynamicAccent}
      className={cn(
        "relative flex min-h-[680px] sm:min-h-[760px] w-full flex-col items-center justify-center overflow-hidden px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16 text-center transition-colors duration-300 font-sans select-none",
        className
      )}
      {...props}
    >
      <style>{QUANTUM_HOLOGRAM_KEYFRAMES}</style>

      {/* Bioluminescent Cosmic Ambient Light Blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[500px] sm:h-[620px] w-[500px] sm:w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px] opacity-75 dark:opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/4 -z-20 h-[320px] w-[320px] rounded-full bg-cyan-500/15 blur-[100px] opacity-50 dark:opacity-35"
      />

      {/* Futuristic Cyber-Grid Background Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)]"
      />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        {/* ================================================================== */}
        {/* TOP QUANTUM HUD TELEMETRY RAIL                                      */}
        {/* ================================================================== */}
        <div className="relative w-full rounded-[var(--radius-2xl,1.25rem)] bg-card/85 dark:bg-neutral-950/85 backdrop-blur-xl border border-primary/25 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-sm">
          {/* Left: Signal beacon with animated frequency waveform */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-bold text-foreground tracking-wider uppercase text-[11px] sm:text-xs truncate">
              {badge}
            </span>
            <div className="hidden min-[480px]:flex items-center gap-1 ml-1 py-0.5 shrink-0">
              <span className="w-0.5 h-3 bg-primary rounded-full animate-[quantum-wave-pulse_1.2s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4 bg-primary rounded-full animate-[quantum-wave-pulse_1.2s_ease-in-out_infinite_200ms]" />
              <span className="w-0.5 h-2 bg-primary/70 rounded-full animate-[quantum-wave-pulse_1.2s_ease-in-out_infinite_400ms]" />
              <span className="w-0.5 h-3.5 bg-primary rounded-full animate-[quantum-wave-pulse_1.2s_ease-in-out_infinite_600ms]" />
            </div>
          </div>

          {/* Center: System coordinates with live pulsating icon */}
          <div className="hidden md:flex items-center gap-2 text-muted-foreground text-[11px]">
            <Radio className="h-3.5 w-3.5 text-primary animate-pulse shrink-0" />
            <span>SINGULARITY: EVENT_HORIZON_0x404</span>
          </div>

          {/* Right: Quantum State Status */}
          <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-[10.5px] sm:text-[11px] shrink-0">
            <span className="flex items-center gap-1 text-primary font-semibold">
              <Zap className="h-3 w-3 shrink-0" />
              <span>PARITY: UNBOUND</span>
            </span>
            <span className="hidden sm:inline-block text-border">•</span>
            <span className="px-2 py-0.5 rounded-[var(--radius-sm,0.25rem)] border border-primary/30 bg-primary/10 text-primary font-semibold">
              HTTP/3
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* CENTERPIECE: 3D GYROSCOPIC SINGULARITY & CHROMATIC HOLOGRAM 404     */}
        {/* ================================================================== */}
        <div className="relative w-full flex flex-col items-center justify-center my-2 sm:my-4 select-none">
          {/* Gyroscopic 3D Concentric Orbit Rings */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 [perspective:1000px]">
            {/* Ambient Pulsing Glow Core */}
            <div
              aria-hidden="true"
              className="absolute h-48 w-48 sm:h-60 sm:w-60 rounded-full bg-primary/25 blur-[60px] pointer-events-none animate-[quantum-pulse-glow_4s_ease-in-out_infinite]"
            />

            {/* Outer Tilted 3D Orbit Ring (Clockwise) with Orbiting Satellite Bead */}
            <div
              aria-hidden="true"
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-primary/35 animate-[quantum-orbit-clockwise_18s_linear_infinite] [transform:rotateX(68deg)_rotateY(10deg)] pointer-events-none"
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary,#6366f1)]" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary/80 shadow-[0_0_10px_var(--primary,#6366f1)]" />
            </div>

            {/* Middle Tilted 3D Orbit Ring (Counter-Clockwise) */}
            <div
              aria-hidden="true"
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-primary/30 animate-[quantum-orbit-counter_12s_linear_infinite] [transform:rotateX(68deg)_rotateY(-15deg)] pointer-events-none"
            >
              <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
            </div>

            {/* Inner Circular Radar Sweep Scanner */}
            <div
              aria-hidden="true"
              className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full border border-primary/25 overflow-hidden pointer-events-none"
            >
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-[quantum-radar-sweep_4s_linear_infinite]" />
            </div>

            {/* Center Chromatic Aberration Holographic 404 Display */}
            <div className="relative z-10 flex items-center justify-center">
              {/* Cyan/Rose Chromatic Aberration Underlayer with Glitch Flicker */}
              <span
                aria-hidden="true"
                className="absolute font-mono font-black text-[clamp(76px,16vw,128px)] leading-none tracking-tight text-rose-500/40 blur-[1px] -translate-x-1 translate-y-0.5 animate-[quantum-hologram-flicker_3s_ease-in-out_infinite] select-none pointer-events-none"
              >
                {code}
              </span>
              <span
                aria-hidden="true"
                className="absolute font-mono font-black text-[clamp(76px,16vw,128px)] leading-none tracking-tight text-cyan-400/40 blur-[1px] translate-x-1 -translate-y-0.5 animate-[quantum-hologram-flicker_3s_ease-in-out_infinite_1.5s] select-none pointer-events-none"
              >
                {code}
              </span>

              {/* Main Crisp Holographic Headline */}
              <h1 className="relative font-mono font-black text-[clamp(76px,16vw,128px)] leading-none tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-primary/60 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
                {code}
              </h1>
            </div>
          </div>

          {/* Title and Human-Friendly Explanatory Description */}
          <div className="mt-4 sm:mt-6 space-y-2.5 max-w-xl text-center px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              {description}
            </p>
          </div>

          {/* Interactive Quantum Terminal Resolver Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 sm:mt-7 w-full max-w-md px-4">
            <div className="relative flex items-center">
              <span className="absolute left-3.5 font-mono text-xs text-primary font-bold pointer-events-none">
                &gt;&gt;
              </span>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="INPUT_COORDINATE // RESOLVE_ROUTE"
                className="w-full rounded-[var(--radius-xl,1rem)] bg-card/80 dark:bg-neutral-900/80 border border-primary/30 pl-11 pr-22 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 backdrop-blur-md transition-all font-mono"
              />
              <button
                type="submit"
                className="absolute right-1.5 rounded-[var(--radius-lg,0.75rem)] bg-primary text-primary-foreground font-mono text-xs font-semibold px-3.5 py-1.5 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shadow-primary/30"
              >
                RESOLVE
              </button>
            </div>
            {searchStatus && (
              <p className="mt-2.5 text-xs font-mono text-primary animate-pulse truncate px-1">
                {searchStatus}
              </p>
            )}
          </form>

          {/* Primary & Secondary Call to Action Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto px-4">
              {renderAction(primaryAction, true)}
              {renderAction(secondaryAction, false)}
            </div>
          )}
        </div>

        {/* ================================================================== */}
        {/* HOLOGRAPHIC RECOVERY TRAJECTORIES GRID                              */}
        {/* ================================================================== */}
        {showShortcuts && shortcuts && shortcuts.length > 0 && (
          <div className="w-full border-t border-border/60 pt-7 sm:pt-8">
            <div className="flex items-center justify-between mb-3 px-1 font-mono">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <span className="text-primary font-bold">[+]</span> {shortcutsTitle}
              </span>
              <span className="text-[10px] text-primary font-bold">
                SELECT_TRAJECTORY
              </span>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {shortcuts.map((shortcut, idx) => {
                const ItemTag = shortcut.href ? "a" : "button";
                return (
                  <ItemTag
                    key={idx}
                    href={shortcut.href}
                    onClick={shortcut.onClick}
                    className="group relative flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-[var(--radius-xl,1rem)] border border-border/80 bg-card/60 hover:bg-card hover:border-primary/60 transition-all duration-200 hover:scale-[1.02] cursor-pointer text-left backdrop-blur-md shadow-xs hover:shadow-primary/10"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Icon Container: Turns solid primary with crisp WHITE icon on hover */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-lg,0.75rem)] bg-primary/10 border border-primary/25 text-primary group-hover:scale-110 group-hover:bg-primary transition-all duration-200 [&_svg]:transition-colors [&_svg]:group-hover:!text-white dark:[&_svg]:group-hover:!text-white">
                        {shortcut.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200 block truncate">
                          {shortcut.label}
                        </span>
                        <span className="text-[9.5px] font-mono text-muted-foreground block truncate">
                          {`TRAJ_0${idx + 1} // STABLE`}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-200 shrink-0" />
                  </ItemTag>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  MAIN EXPORT: DISPATCHES TO SELECTED VARIANT                               */
/* ========================================================================== */

export function NotFoundSection({
  variant = "hyperspace",
  ...props
}: NotFoundSectionProps) {
  if (variant === "animated-beam-border") {
    return <AnimatedBeamNotFoundSection {...props} />;
  }
  if (variant === "quantum-hologram") {
    return <QuantumHologramNotFoundSection {...props} />;
  }
  return <HyperspaceNotFoundSection {...props} />;
}

export default NotFoundSection;
