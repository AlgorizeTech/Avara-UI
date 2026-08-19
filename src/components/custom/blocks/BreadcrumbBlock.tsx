"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, MoreHorizontal, Slash } from "lucide-react";
import React, { useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type BreadcrumbColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type BreadcrumbVariant = "classic" | "slash" | "solid" | "ghost";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary text-primary-foreground hover:opacity-90",
    bgSoft: "bg-primary/10 text-primary",
    hoverText: "hover:text-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    hoverText: "hover:text-indigo-600 dark:hover:text-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    hoverText: "hover:text-rose-600 dark:hover:text-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    hoverText: "hover:text-emerald-600 dark:hover:text-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    hoverText: "hover:text-zinc-900 dark:hover:text-white",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        hoverText: "hover:text-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// BREADCRUMB COMPONENT
// ==========================================
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  color?: BreadcrumbColor;
  maxItems?: number;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching:
   *
   *   import Link from "next/link";
   *   <BreadcrumbBlock items={items} linkComponent={Link} />
   */
  linkComponent?: React.ElementType;
}

export function BreadcrumbBlock({
  items,
  variant = "classic",
  color = "primary",
  maxItems = 4,
  linkComponent: Link = "a",
}: BreadcrumbProps) {
  const { theme, style } = getThemeStyles(color);
  const [isExpanded, setIsExpanded] = useState(false);

  // --- COLLAPSE LOGIC ---
  // If items exceed maxItems, we hide the middle ones behind an ellipsis.
  const shouldCollapse = items.length > maxItems && !isExpanded;

  const visibleItems = shouldCollapse
    ? [
        items[0],
        { label: "...", isEllipsis: true },
        ...items.slice(-(maxItems - 2)),
      ]
    : items;

  // --- RENDER HELPERS ---
  const Separator = () => {
    if (variant === "slash")
      return (
        <Slash className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0 -rotate-12 mx-1" />
      );
    if (variant === "solid")
      return (
        <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0 mx-1" />
      );
    return (
      <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 shrink-0 mx-1" />
    );
  };

  const getVariantClasses = (isActive: boolean, isEllipsis: boolean) => {
    const base =
      "flex items-center gap-1.5 text-sm font-medium transition-all outline-none rounded-md px-2 py-1 -mx-2";

    switch (variant) {
      case "solid":
        return cn(
          base,
          isActive
            ? cn("shadow-sm", theme.bg)
            : cn(
                "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                !isEllipsis &&
                  "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white",
              ),
        );
      case "ghost":
        return cn(
          base,
          isActive
            ? cn(theme.bgSoft)
            : cn(
                "text-zinc-500 dark:text-zinc-400",
                !isEllipsis &&
                  cn(
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                    theme.hoverText,
                  ),
              ),
        );
      case "slash":
      case "classic":
      default:
        return cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors outline-none",
          isActive
            ? theme.text
            : cn(
                "text-zinc-500 dark:text-zinc-400",
                !isEllipsis && theme.hoverText,
              ),
        );
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      style={style}
      className="flex w-full justify-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex items-center justify-center whitespace-nowrap min-w-max p-1">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = "isEllipsis" in item;
          const Icon = (item as BreadcrumbItem).icon;

          return (
            <li key={index} className="flex items-center">
              {/* Ellipsis Button */}
              {isEllipsis ? (
                <button
                  onClick={() => setIsExpanded(true)}
                  className={getVariantClasses(false, true)}
                  aria-label="Show hidden breadcrumbs"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              ) : (
                /* Standard Link/Text */
                <React.Fragment>
                  {(item as BreadcrumbItem).href && !isLast ? (
                    <Link
                      href={(item as BreadcrumbItem).href!}
                      className={getVariantClasses(false, false)}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      {(item as BreadcrumbItem).label}
                    </Link>
                  ) : (
                    <span
                      className={getVariantClasses(isLast, false)}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      {(item as BreadcrumbItem).label}
                    </span>
                  )}
                </React.Fragment>
              )}

              {/* Separator */}
              {!isLast && <Separator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
