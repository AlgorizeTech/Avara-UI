"use client";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
    lightBg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    focusRing: "focus:ring-primary/20 focus:border-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-500/30",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-500/30",
    focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-500/30",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-zinc-900/10",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-300 dark:border-zinc-600",
    focusRing: "focus:ring-zinc-500/20 focus:border-zinc-500",
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
        bg: "bg-[var(--theme-color)] hover:opacity-90 text-white shadow-[0_4px_14px_0_rgba(var(--theme-color-rgb),0.2)]",
        lightBg:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        border: "border-[rgba(var(--theme-color-rgb),0.3)]",
        focusRing:
          "focus:ring-[rgba(var(--theme-color-rgb),0.2)] focus:border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
