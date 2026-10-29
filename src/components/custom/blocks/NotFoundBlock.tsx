"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { accentStyle } from "@/lib/accent";
import {
  BookOpen,
  Home,
  LayoutGrid,
  Compass,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";

export type NotFoundVariant = "hyperspace" | "animated-beam-border";

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
      ? "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-[14px] font-semibold tracking-[0.3px] text-background transition-all hover:bg-foreground/90 active:scale-[0.98] cursor-pointer shadow-sm"
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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3.5 py-1 text-[12px] text-foreground/90 backdrop-blur border border-foreground/[0.06] shadow-xs select-none">
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
/*  VARIANT 2: ANIMATED BEAM BORDER & SHIFTING GRADIENT COLOR PORTAL          */
/* ========================================================================== */

const ANIMATED_BORDER_KEYFRAMES = `
@keyframes not-found-spin-beam {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes not-found-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes not-found-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
`;

export function AnimatedBeamNotFoundSection({
  code = "404",
  badge = "System Telemetry • Route Dropped",
  title = "Lost in the Cyber Void?",
  description = "The requested coordinate cannot be located across the cluster network. The page may have shifted to a new dimension or expired.",
  primaryAction = {
    label: "Explore Components",
    href: "/docs",
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  secondaryAction = {
    label: "Return Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  shortcutsTitle = "Recommended Coordinates",
  shortcuts = [
    {
      label: "Component Directory",
      href: "/docs",
      icon: <LayoutGrid className="h-3.5 w-3.5 text-primary" />,
    },
    {
      label: "Quickstart Guide",
      href: "/docs",
      icon: <BookOpen className="h-3.5 w-3.5 text-primary" />,
    },
    {
      label: "Live Documentation",
      href: "/docs",
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
    },
    {
      label: "System Status",
      href: "/",
      icon: <Terminal className="h-3.5 w-3.5 text-primary" />,
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
      ? "group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3 text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none"
      : "relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-background/80 hover:bg-muted text-foreground font-medium px-6 py-3 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-sm select-none";

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
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </a>
      );
    }

    return (
      <button type="button" onClick={action.onClick} className={baseClass}>
        {action.icon}
        <span>{action.label}</span>
        {isPrimary && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    );
  };

  return (
    <section
      style={dynamicAccent}
      className={cn(
        "relative flex min-h-[640px] sm:min-h-[720px] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 py-12 text-center transition-colors duration-300 font-sans",
        className
      )}
      {...props}
    >
      <style>{ANIMATED_BORDER_KEYFRAMES}</style>

      {/* Atmospheric Ambient Glowing Radial Lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-cyan-500/15 to-rose-500/15 blur-[120px] opacity-70 dark:opacity-50"
      />

      {/* Background Cyber Grid with Radial Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_65%,transparent_100%)]"
      />

      {/* Centerpiece: Outer Neon Animated Conic Glow & Card */}
      <div className="relative w-full max-w-xl md:max-w-2xl mx-auto my-4 sm:my-6">
        {/* Ambient Blurred Conic Halo Behind the Border */}
        <div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-[2rem] blur-xl opacity-75 dark:opacity-45 -z-10 animate-[not-found-spin-beam_7s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, var(--primary, #6366f1) 0%, #06b6d4 25%, #ec4899 50%, #8b5cf6 75%, var(--primary, #6366f1) 100%)",
          }}
        />

        {/* The Animated Border Shell */}
        <div className="relative p-[1.5px] rounded-[1.85rem] overflow-hidden shadow-2xl">
          {/* Continuously rotating sharp conic laser beam */}
          <div
            aria-hidden="true"
            className="absolute -inset-[150%] animate-[not-found-spin-beam_7s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, var(--primary, #6366f1) 0%, #06b6d4 25%, #ec4899 50%, #8b5cf6 75%, var(--primary, #6366f1) 100%)",
            }}
          />

          {/* Frosted Glass Interior Card */}
          <div className="relative rounded-[calc(1.85rem-1.5px)] bg-card/90 dark:bg-neutral-950/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center border border-white/20 dark:border-white/5">
            {/* Top Live Status Beacon Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary select-none shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span>{badge}</span>
              </div>
            )}

            {/* Giant Shifting Multi-Color Gradient 404 Heading */}
            <div className="relative my-4 sm:my-6 select-none animate-[not-found-float_5s_ease-in-out_infinite]">
              {/* Diffuse Color Reflection */}
              <span
                aria-hidden="true"
                className="absolute inset-0 font-black text-[clamp(72px,16vw,144px)] leading-none tracking-[-0.04em] bg-gradient-to-r from-primary via-cyan-400 via-violet-400 to-rose-400 bg-[length:200%_auto] animate-[not-found-gradient-shift_5s_ease_infinite] bg-clip-text text-transparent blur-xl opacity-50"
              >
                {code}
              </span>
              {/* Sharp Foreground Gradient */}
              <h1 className="relative font-black text-[clamp(72px,16vw,144px)] leading-none tracking-[-0.04em] bg-gradient-to-r from-primary via-cyan-400 via-violet-400 to-rose-400 bg-[length:200%_auto] animate-[not-found-gradient-shift_5s_ease_infinite] bg-clip-text text-transparent">
                {code}
              </h1>
            </div>

            {/* Title & Description */}
            <div className="max-w-md mx-auto space-y-2.5">
              <h2 className="font-bold text-[clamp(22px,3.2vw,36px)] leading-tight tracking-tight text-foreground">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* High-Tech Diagnostic Telemetry Bar */}
            <div className="mt-5 w-full max-w-sm flex items-center justify-center gap-2 rounded-lg bg-foreground/[0.03] dark:bg-foreground/[0.05] border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-[10.5px] sm:text-[11px] text-foreground/70 select-none">
              <Terminal className="h-3.5 w-3.5 shrink-0 text-primary animate-pulse" />
              <span className="truncate">ERR_SIGNAL_DROP // 0x404 • UNREACHABLE</span>
            </div>

            {/* Responsive Action Buttons */}
            {(primaryAction || secondaryAction) && (
              <div className="mt-7 flex w-full flex-col sm:flex-row items-center justify-center gap-3">
                {renderAction(primaryAction, true)}
                {renderAction(secondaryAction, false)}
              </div>
            )}

            {/* Responsive Shortcuts Matrix */}
            {showShortcuts && shortcuts && shortcuts.length > 0 && (
              <div className="mt-8 sm:mt-10 w-full border-t border-foreground/[0.08] pt-5 sm:pt-6">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground font-semibold">
                    {shortcutsTitle}
                  </span>
                  <span className="text-[10px] font-mono text-primary/70">
                    4 QUICK ROUTES
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {shortcuts.map((shortcut, idx) => {
                    const ItemTag = shortcut.href ? "a" : "button";
                    return (
                      <ItemTag
                        key={idx}
                        href={shortcut.href}
                        onClick={shortcut.onClick}
                        className="group flex items-center justify-between gap-2.5 p-3 rounded-xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all duration-200 hover:shadow-[0_0_20px_-6px_var(--primary,#6366f1)] cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {shortcut.icon}
                          <span className="text-xs sm:text-[13px] font-medium text-foreground/80 group-hover:text-foreground truncate">
                            {shortcut.label}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                      </ItemTag>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
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
  return <HyperspaceNotFoundSection {...props} />;
}

export default NotFoundSection;
