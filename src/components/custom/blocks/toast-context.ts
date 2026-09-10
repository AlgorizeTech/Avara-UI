"use client";

import React, { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "info" | "warning" | "default";

const colorThemes: Record<string, Record<string, string>> = {
  primary: { bg: "bg-primary text-primary-foreground", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary", glow: "shadow-[0_0_20px_var(--primary)] border-primary" },
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-white",
        text: "text-[var(--theme-color)]",
        bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]",
        border: "border-[var(--theme-color)]",
        glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]",
      },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
