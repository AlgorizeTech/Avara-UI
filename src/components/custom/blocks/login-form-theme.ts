"use client";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600 hover:bg-indigo-700",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    ring: "focus:ring-indigo-600",
    focusBorder: "focus:border-indigo-600 focus-visible:border-indigo-600",
    focusRing: "focus:ring-2 focus:ring-indigo-600/25 focus-visible:ring-2 focus-visible:ring-indigo-600/25",
    hoverBorder: "hover:border-indigo-500/60",
    gradient: "from-indigo-600 to-violet-600",
    panelFg: "text-white",
  },
  rose: {
    bg: "bg-rose-600 hover:bg-rose-700",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    ring: "focus:ring-rose-600",
    focusBorder: "focus:border-rose-600 focus-visible:border-rose-600",
    focusRing: "focus:ring-2 focus:ring-rose-600/25 focus-visible:ring-2 focus-visible:ring-rose-600/25",
    hoverBorder: "hover:border-rose-500/60",
    gradient: "from-rose-600 to-orange-500",
    panelFg: "text-white",
  },
  emerald: {
    bg: "bg-emerald-600 hover:bg-emerald-700",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    ring: "focus:ring-emerald-600",
    focusBorder: "focus:border-emerald-600 focus-visible:border-emerald-600",
    focusRing: "focus:ring-2 focus:ring-emerald-600/25 focus-visible:ring-2 focus-visible:ring-emerald-600/25",
    hoverBorder: "hover:border-emerald-500/60",
    gradient: "from-emerald-600 to-teal-500",
    panelFg: "text-white",
  },
  zinc: {
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100",
    focusBorder: "focus:border-zinc-900 dark:focus:border-zinc-100 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-100",
    focusRing: "focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:focus-visible:ring-zinc-100/20",
    hoverBorder: "hover:border-zinc-900/50 dark:hover:border-zinc-400/50",
    gradient: "from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400",
    panelFg: "text-white dark:text-zinc-900",
  },
};

const contrastingForeground = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((v) => parseInt(v.trim(), 10));
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? "#09090b" : "#ffffff";
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
  if (color === "primary" || color === "default" || !colorThemes[color]) {
    if (color && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      return {
        theme: {
          bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
          text: "text-[var(--theme-color)]",
          border: "border-[var(--theme-color)]",
          ring: "focus:ring-[var(--theme-color)]",
          focusBorder: "focus:border-[var(--theme-color)] focus-visible:border-[var(--theme-color)]",
          focusRing: "focus:ring-2 focus:ring-[rgba(var(--theme-color-rgb),0.25)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--theme-color-rgb),0.25)]",
          hoverBorder: "hover:border-[var(--theme-color)]/60",
          gradient:
            "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]",
          panelFg: "text-[var(--panel-fg)]",
        },
        style: {
          "--theme-color": color,
          "--theme-color-rgb": rgb,
          "--panel-fg": contrastingForeground(rgb),
        } as React.CSSProperties,
      };
    }
    return {
      theme: {
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        text: "text-primary",
        border: "border-primary",
        ring: "focus:ring-primary",
        focusBorder: "focus:border-primary focus-visible:border-primary",
        focusRing: "focus:ring-2 focus:ring-primary/25 focus-visible:ring-2 focus-visible:ring-primary/25",
        hoverBorder: "hover:border-primary/60",
        gradient: "from-primary to-primary/70",
        // The token designed to be legible on --primary, which inverts by theme.
        panelFg: "text-primary-foreground",
      },
      style: {} as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color], style: {} };
};
