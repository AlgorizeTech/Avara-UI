"use client";

import React, { useEffect, useState } from "react";
import {
  CommandPaletteTrigger,
  CommandPaletteContent,
  CommandPaletteVariant,
  DEFAULT_COMMAND_PALETTE_GROUPS,
  DEFAULT_NESTED_PALETTE_STATE,
  CommandPaletteItemType,
  NestedPaletteState,
  StatusIcon,
} from "@/components/custom/blocks/CommandPaletteBlock";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  lavender: "#9b8afb",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

export default function CommandPaletteDemo({
  variant = "linear",
  color = "primary",
  defaultOpen = false,
}: {
  variant?: CommandPaletteVariant;
  color?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItem, setActiveItem] = useState<CommandPaletteItemType>(
    DEFAULT_COMMAND_PALETTE_GROUPS[0].items[0],
  );
  const [nestedState, setNestedState] = useState<NestedPaletteState>(
    DEFAULT_NESTED_PALETTE_STATE,
  );
  const themeColor = getThemeColor(color);
  const isNested = variant === "nested";
  const isInline = variant === "inline";
  const isAi = variant === "ai";

  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({
          "--primary": themeColor,
        } as React.CSSProperties)
      : undefined;

  // Keyboard shortcut Ctrl+K / Cmd+K to toggle modal (modal variants only)
  useEffect(() => {
    if (isInline) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInline]);

  const handleSelect = (item: CommandPaletteItemType) => {
    if (!isNested) {
      setActiveItem(item);
    }
    setIsOpen(false);
  };

  // Always-open inline variant — no trigger button, no backdrop modal
  if (isInline) {
    return (
      <div
        style={containerStyle}
        className="flex w-full items-center justify-center py-6 px-4 font-sans"
      >
        <div className="w-full max-w-xl">
          <CommandPaletteContent
            variant="inline"
            placeholder="Search pages, projects and actions"
            groups={DEFAULT_COMMAND_PALETTE_GROUPS}
            isDialog={false}
          />
        </div>
      </div>
    );
  }

  const ActiveIcon = activeItem.icon;

  return (
    <div
      style={containerStyle}
      className="relative -my-2 w-full overflow-hidden rounded-2xl ring-1 ring-zinc-200/80 dark:ring-zinc-800 bg-white dark:bg-zinc-950 font-sans"
    >
      {/* 1. Header with current page icon & label on Left and Search Box on Right */}
      <header className="flex h-14 w-full items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm min-w-0">
          {isNested ? (
            <>
              <StatusIcon
                status={nestedState.status}
                className="text-zinc-500 dark:text-zinc-400"
              />
              <span className="text-zinc-600 dark:text-zinc-300 font-medium truncate">
                Rewrite the welcome email
              </span>
            </>
          ) : (
            <>
              {ActiveIcon && (
                <ActiveIcon className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
              )}
              <span className="text-zinc-600 dark:text-zinc-300 font-medium truncate">
                {activeItem.label}
              </span>
            </>
          )}
        </div>

        {/* Right: Search Trigger */}
        <CommandPaletteTrigger
          placeholder="Search anything..."
          shortcuts={["Ctrl", "K"]}
          onClick={() => setIsOpen(true)}
          className="max-w-[210px] sm:max-w-xs shrink-0 ml-3"
        />
      </header>

      {/* 2. Dashboard Body Skeleton */}
      <main className="p-4 sm:p-6 space-y-4 min-h-[420px]">
        {/* 3 top card placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50" />
          <div className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50" />
          <div className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50" />
        </div>

        {/* Large bottom card placeholders */}
        <div className="h-64 sm:h-72 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50" />
        <div className="h-20 sm:h-42 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50" />
      </main>

      {/* 3. Modal Overlay & Command Palette Dialog (Opens on click or Ctrl+K) */}
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-start justify-center pt-8 sm:pt-14 px-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Palette Dialog Container */}
          <div className="relative z-10 w-full max-w-xl animate-in fade-in zoom-in-95 duration-150">
            <CommandPaletteContent
              variant={variant}
              placeholder={
                isNested
                  ? "Type a command or search"
                  : isAi
                    ? "Search or ask a question"
                    : "Search pages, projects and actions"
              }
              groups={DEFAULT_COMMAND_PALETTE_GROUPS}
              nestedState={nestedState}
              onNestedStateChange={setNestedState}
              onSelect={handleSelect}
              onClose={() => setIsOpen(false)}
              isDialog={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
