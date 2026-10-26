"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Home, LayoutGrid, Compass } from "lucide-react";

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
}

export function NotFoundSection({
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
  className,
  ...props
}: NotFoundSectionProps) {
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

export default NotFoundSection;
