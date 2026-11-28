"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, MoreHorizontal, Slash } from "lucide-react";
import React, { useState } from "react";
import { getThemeStyles } from "./breadcrumb-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type BreadcrumbColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type BreadcrumbVariant = "classic" | "slash" | "solid" | "ghost";

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
        <Slash className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 -rotate-12 mx-1" />
      );
    if (variant === "solid")
      return (
        <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0 mx-1" />
      );
    return (
      <ChevronRight className="w-4 h-4 text-muted-foreground/70 shrink-0 mx-1" />
    );
  };

  const getVariantClasses = (isActive: boolean, isEllipsis: boolean) => {
    const base =
      "flex items-center gap-1.5 text-sm font-medium transition-[color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none outline-none rounded-full px-3 py-1.5 -mx-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

    switch (variant) {
      case "solid":
        return cn(
          base,
          isActive
            ? cn("shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]", theme.bg)
            : cn(
                "bg-[#F7F7F6] dark:bg-background/50 text-muted-foreground",
                !isEllipsis &&
                  "hover:bg-[#EFEFED] dark:hover:bg-background/70 hover:text-foreground",
              ),
        );
      case "ghost":
        return cn(
          base,
          isActive
            ? cn(theme.bgSoft)
            : cn(
                "text-muted-foreground",
                !isEllipsis &&
                  cn(
                    "hover:bg-muted/50",
                    theme.hoverText,
                  ),
              ),
        );
      case "slash":
      case "classic":
      default:
        return cn(
          "flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          isActive
            ? theme.text
            : cn(
                "text-muted-foreground",
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
