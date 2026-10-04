"use client";

import React, { createContext, useContext } from "react";

const COLOR_HEX_MAP: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#71717a",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

export const getThemeStyles = (color?: string) => {
  if (!color || color === "default" || color === "primary") {
    return { style: {} };
  }

  const resolvedColor =
    COLOR_HEX_MAP[color] || (color.startsWith("#") ? color : undefined);

  if (resolvedColor) {
    return {
      style: {
        "--primary": resolvedColor,
      } as React.CSSProperties,
    };
  }

  return { style: {} };
};

interface DialogContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  style?: React.CSSProperties;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("Dialog components must be used within a <Dialog> root.");
  return context;
}
