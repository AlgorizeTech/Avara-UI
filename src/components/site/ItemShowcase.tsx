"use client";

import { ItemBlock, ItemVariant } from "@/components/custom/blocks/ItemBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { MoreVertical, Settings } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const ITEM_ENGINE_CODE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ItemVariant = "default" | "compact" | "card" | "bordered";

export interface ItemBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  description?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: ItemVariant;
  onClick?: () => void;
  className?: string;
}

export function ItemBlock({
  title,
  description,
  media,
  actions,
  variant = "default",
  onClick,
  className,
  ...props
}: ItemBlockProps) {
  const isClickable = !!onClick;
  const isCard = variant === "card";

  const baseClasses = cn(
    "relative flex transition-all duration-200 text-left w-full",
    isClickable && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
    isCard ? "flex-col" : "flex-row items-center gap-4",
    className
  );

  const variantClasses = {
    default: cn("p-4 rounded-xl", isClickable && "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 active:scale-[0.98]"),
    compact: cn("p-2.5 rounded-lg gap-3", isClickable && "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 active:scale-[0.98]"),
    bordered: cn("p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] shadow-sm", isClickable && "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md active:scale-[0.98]"),
    card: cn("p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] shadow-sm gap-4", isClickable && "hover:shadow-md hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700"),
  };

  const Component = isClickable ? "button" : "div";

  return (
    <Component className={cn(baseClasses, variantClasses[variant])} onClick={onClick} {...(isClickable ? { type: "button" } : {})} {...props}>
      {media && <div className={cn("shrink-0 flex items-center justify-center", isCard ? "mb-2" : "")}>{media}</div>}
      <div className="flex flex-col flex-1 min-w-0">
        <div className={cn("font-semibold text-zinc-900 dark:text-zinc-100 truncate", variant === "compact" ? "text-sm" : "text-base", isCard && "text-lg mb-1 whitespace-normal")}>{title}</div>
        {description && <div className={cn("text-zinc-500 dark:text-zinc-400 mt-0.5", variant === "compact" ? "text-xs line-clamp-1" : "text-sm", isCard && "line-clamp-3 mt-1")}>{description}</div>}
      </div>
      {actions && <div className={cn("shrink-0 flex items-center gap-2", isCard ? "w-full pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800/50" : "ml-4")} onClick={(e) => { if (isClickable) e.stopPropagation(); }}>{actions}</div>}
    </Component>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const ITEM_ENGINE_CODE_JS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function ItemBlock({
  title,
  description,
  media,
  actions,
  variant = "default",
  onClick,
  className,
  ...props
}) {
  const isClickable = !!onClick;
  const isCard = variant === "card";

  const baseClasses = cn(
    "relative flex transition-all duration-200 text-left w-full",
    isClickable && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
    isCard ? "flex-col" : "flex-row items-center gap-4",
    className
  );

  const variantClasses = {
    default: cn("p-4 rounded-xl", isClickable && "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 active:scale-[0.98]"),
    compact: cn("p-2.5 rounded-lg gap-3", isClickable && "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 active:scale-[0.98]"),
    bordered: cn("p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] shadow-sm", isClickable && "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md active:scale-[0.98]"),
    card: cn("p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] shadow-sm gap-4", isClickable && "hover:shadow-md hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700"),
  };

  const Component = isClickable ? "button" : "div";

  return (
    <Component className={cn(baseClasses, variantClasses[variant])} onClick={onClick} {...(isClickable ? { type: "button" } : {})} {...props}>
      {media && <div className={cn("shrink-0 flex items-center justify-center", isCard ? "mb-2" : "")}>{media}</div>}
      <div className="flex flex-col flex-1 min-w-0">
        <div className={cn("font-semibold text-zinc-900 dark:text-zinc-100 truncate", variant === "compact" ? "text-sm" : "text-base", isCard && "text-lg mb-1 whitespace-normal")}>{title}</div>
        {description && <div className={cn("text-zinc-500 dark:text-zinc-400 mt-0.5", variant === "compact" ? "text-xs line-clamp-1" : "text-sm", isCard && "line-clamp-3 mt-1")}>{description}</div>}
      </div>
      {actions && <div className={cn("shrink-0 flex items-center gap-2", isCard ? "w-full pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800/50" : "ml-4")} onClick={(e) => { if (isClickable) e.stopPropagation(); }}>{actions}</div>}
    </Component>
  );
}`;

export function ItemShowcase() {
  const [variant, setVariant] = useState<ItemVariant>("bordered");
  const [showMedia, setShowMedia] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [isClickable, setIsClickable] = useState(false);

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        title="Push Notifications"`;
    if (showDescription)
      propsStr += `\n        description="Receive alerts when someone mentions you."`;
    if (showMedia)
      propsStr += `\n        media={<Bell className="w-5 h-5 text-zinc-500" />}`;
    if (showActions)
      propsStr += `\n        actions={<button className="px-3 py-1 bg-zinc-900 text-white rounded-md text-sm">Enable</button>}`;
    if (variant !== "default") propsStr += `\n        variant="${variant}"`;
    if (isClickable)
      propsStr += `\n        onClick={() => console.log('Clicked!')}`;

    return `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";
import { Bell } from "lucide-react";

export default function SettingsList() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-2">
      <ItemBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  // Mock Components for the Showcase
  const MockMedia = () => (
    <div
      className={`flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full ${variant === "compact" ? "w-8 h-8" : variant === "card" ? "w-14 h-14" : "w-10 h-10"}`}
    >
      <Settings
        className={
          variant === "compact"
            ? "w-4 h-4"
            : variant === "card"
              ? "w-7 h-7"
              : "w-5 h-5"
        }
      />
    </div>
  );

  const MockActions = () => (
    <>
      <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
      {variant === "card" && (
        <button className="ml-auto px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
          Configure
        </button>
      )}
    </>
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Layout Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                ["default", "compact", "bordered", "card"] as ItemVariant[]
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

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Elements
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setShowMedia(!showMedia)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${showMedia ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                Media
              </button>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${showDescription ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                Description
              </button>
              <button
                onClick={() => setShowActions(!showActions)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${showActions ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                Actions
              </button>
              <button
                onClick={() => setIsClickable(!isClickable)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${isClickable ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400" : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                Clickable
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ItemBlock"
        tsCode={ITEM_ENGINE_CODE_TS}
        jsCode={ITEM_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div
            className={`w-full ${variant === "card" ? "max-w-sm" : "max-w-xl"}`}
          >
            <ItemBlock
              variant={variant}
              title="System Configuration"
              description={
                showDescription
                  ? "Manage your environment variables, build settings, and deployment hooks for this specific project instance."
                  : undefined
              }
              media={showMedia ? <MockMedia /> : undefined}
              actions={showActions ? <MockActions /> : undefined}
              onClick={isClickable ? () => alert("Item clicked!") : undefined}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
