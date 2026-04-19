"use client";

import {
  BreadcrumbBlock,
  BreadcrumbColor,
  BreadcrumbVariant,
} from "@/components/custom/blocks/BreadcrumbBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { FileText, Folder, Home, Settings } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const BREADCRUMB_ENGINE_CODE_TS = `"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home, MoreHorizontal, Slash } from "lucide-react";
import Link from "next/link";

export type BreadcrumbColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type BreadcrumbVariant = "classic" | "slash" | "solid" | "ghost";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 hover:bg-indigo-700 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", hoverText: "hover:text-indigo-600 dark:hover:text-indigo-400" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400", hoverText: "hover:text-rose-600 dark:hover:text-rose-400" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", hoverText: "hover:text-emerald-600 dark:hover:text-emerald-400" },
  zinc: { text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", hoverText: "hover:text-zinc-900 dark:hover:text-white" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]", hoverText: "hover:text-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface BreadcrumbItem { label: string; href?: string; icon?: React.ElementType; }
export interface BreadcrumbProps { items: BreadcrumbItem[]; variant?: BreadcrumbVariant; color?: BreadcrumbColor; maxItems?: number; }

export function BreadcrumbBlock({ items, variant = "classic", color = "indigo", maxItems = 4 }: BreadcrumbProps) {
  const { theme, style } = getThemeStyles(color);
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = items.length > maxItems && !isExpanded;
  const visibleItems = shouldCollapse ? [items[0], { label: "...", isEllipsis: true }, ...items.slice(-(maxItems - 2))] : items;

  const Separator = () => {
    if (variant === "slash") return <Slash className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0 -rotate-12 mx-1" />;
    if (variant === "solid") return <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0 mx-1" />;
    return <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 shrink-0 mx-1" />;
  };

  const getVariantClasses = (isActive: boolean, isEllipsis: boolean) => {
    const base = "flex items-center gap-1.5 text-sm font-medium transition-all outline-none rounded-md px-2 py-1 -mx-2";
    switch (variant) {
      case "solid": return cn(base, isActive ? cn("shadow-sm", theme.bg) : cn("bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400", !isEllipsis && "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white"));
      case "ghost": return cn(base, isActive ? cn(theme.bgSoft) : cn("text-zinc-500 dark:text-zinc-400", !isEllipsis && cn("hover:bg-zinc-100 dark:hover:bg-zinc-800/50", theme.hoverText)));
      case "slash":
      case "classic":
      default: return cn("flex items-center gap-1.5 text-sm font-medium transition-colors outline-none", isActive ? theme.text : cn("text-zinc-500 dark:text-zinc-400", !isEllipsis && theme.hoverText));
    }
  };

  return (
    <nav aria-label="Breadcrumb" style={style} className="flex w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <ol className="flex items-center whitespace-nowrap min-w-max p-1">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = "isEllipsis" in item;
          const Icon = (item as BreadcrumbItem).icon;

          return (
            <li key={index} className="flex items-center">
              {isEllipsis ? (
                <button onClick={() => setIsExpanded(true)} className={getVariantClasses(false, true)} aria-label="Show hidden breadcrumbs"><MoreHorizontal className="w-4 h-4" /></button>
              ) : (
                <React.Fragment>
                  {(item as BreadcrumbItem).href && !isLast ? (
                    <Link href={(item as BreadcrumbItem).href!} className={getVariantClasses(false, false)}>
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}{(item as BreadcrumbItem).label}
                    </Link>
                  ) : (
                    <span className={getVariantClasses(isLast, false)} aria-current={isLast ? "page" : undefined}>
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}{(item as BreadcrumbItem).label}
                    </span>
                  )}
                </React.Fragment>
              )}
              {!isLast && <Separator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const BREADCRUMB_ENGINE_CODE_JS = BREADCRUMB_ENGINE_CODE_TS.replace(
  /:\s?[A-Z][A-Za-z0-9_<>]*(\[\])?/g,
  "",
)
  .replace(/<any>/g, "")
  .replace(/as any/g, "")
  .replace(/type [A-Za-z0-9_]+ = [^;]+;/g, "")
  .replace(/export interface [A-Za-z0-9_]+ \{[^}]+\}/g, "")
  .replace(/as React.CSSProperties/g, "");

export function BreadcrumbShowcase() {
  const [variant, setVariant] = useState<BreadcrumbVariant>("classic");
  const [color, setColor] = useState<BreadcrumbColor>("indigo");
  const [isLongPath, setIsLongPath] = useState(false);

  // Mock Paths
  const shortPath = [
    { label: "Home", href: "/", icon: Home },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Profile", href: "/settings/profile" },
  ];

  const longPath = [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects", icon: Folder },
    { label: "Nexus UI Kit", href: "/projects/nexus" },
    { label: "Components", href: "/projects/nexus/components" },
    { label: "Breadcrumb.tsx", href: "#", icon: FileText },
  ];

  const generateUsageCode = (isTs: boolean) => {
    return `import { BreadcrumbBlock } from "@/components/custom/blocks/BreadcrumbBlock";
import { Home, Settings } from "lucide-react";

export default function Layout() {
  const path = [
    { label: "Home", href: "/", icon: Home },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Profile", href: "#" },
  ];

  return (
    <div className="p-8">
      <BreadcrumbBlock 
        items={path} 
        variant="${variant}" 
        color="${color}" 
        maxItems={4} 
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Style Variant
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(
              ["classic", "slash", "solid", "ghost"] as BreadcrumbVariant[]
            ).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Path Length Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Path Length (Collapsing)
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            <button
              onClick={() => setIsLongPath(false)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${!isLongPath ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              Short
            </button>
            <button
              onClick={() => setIsLongPath(true)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${isLongPath ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              Long (Truncated)
            </button>
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-10 px-2">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as BreadcrumbColor)}
                className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}

            {/* Custom Color Picker */}
            <div
              className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
            >
              <input
                type="color"
                value={color.startsWith("#") ? color : "#8b5cf6"}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                title="Custom Hex Color"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="BreadcrumbBlock"
        tsCode={BREADCRUMB_ENGINE_CODE_TS}
        jsCode={BREADCRUMB_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-12">
          {/* Key forces re-render so the "expansion" state resets when user changes length */}
          <BreadcrumbBlock
            key={`${variant}-${color}-${isLongPath}`}
            variant={variant}
            color={color}
            items={isLongPath ? longPath : shortPath}
            maxItems={4}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
