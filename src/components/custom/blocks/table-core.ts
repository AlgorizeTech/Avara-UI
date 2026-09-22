"use client";

import React, { createContext, useContext } from "react";

export type TableVariant = "default" | "minimal" | "glass";

export type TableSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    bgSoft: "bg-primary/10",
    border: "border-primary/30",
    borderSoft: "border-primary/12",
    focusRing: "focus:border-primary/30 focus:outline-none",
    hoverBorder: "hover:border-primary/30",
    hoverBgSoft: "hover:bg-primary/5",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-600",
    borderSoft: "border-indigo-500/15 dark:border-indigo-400/15",
    focusRing: "focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none",
    hoverBorder: "hover:border-indigo-500 dark:hover:border-indigo-400",
    hoverBgSoft: "hover:bg-indigo-50/80 dark:hover:bg-indigo-500/10",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-600",
    borderSoft: "border-rose-500/15 dark:border-rose-400/15",
    focusRing: "focus:border-rose-500 dark:focus:border-rose-400 focus:outline-none",
    hoverBorder: "hover:border-rose-500 dark:hover:border-rose-400",
    hoverBgSoft: "hover:bg-rose-50/80 dark:hover:bg-rose-500/10",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-600",
    borderSoft: "border-emerald-500/15 dark:border-emerald-400/15",
    focusRing: "focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none",
    hoverBorder: "hover:border-emerald-500 dark:hover:border-emerald-400",
    hoverBgSoft: "hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50",
    border: "border-zinc-900 dark:border-zinc-100",
    borderSoft: "border-zinc-300/40 dark:border-zinc-800/60",
    focusRing: "focus:border-zinc-700 dark:focus:border-zinc-300 focus:outline-none",
    hoverBorder: "hover:border-zinc-700 dark:hover:border-zinc-300",
    hoverBgSoft: "hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
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
        bg: "bg-[var(--theme-color)] text-white",
        text: "text-[var(--theme-color)]",
        bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]",
        border: "border-[var(--theme-color)]",
        borderSoft: "border-[rgba(var(--theme-color-rgb),0.12)]",
        focusRing: "focus:border-[var(--theme-color)] focus:outline-none",
        hoverBorder: "hover:border-[var(--theme-color)]",
        hoverBgSoft: "hover:bg-[rgba(var(--theme-color-rgb),0.08)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export interface TableStyleContext {
  variant: TableVariant;
  size: TableSize;
  theme: Record<string, string>;
}

export const TableContext = createContext<TableStyleContext>({
  variant: "default",
  size: "md",
  theme: colorThemes.primary,
});

export const useTableStyles = () => useContext(TableContext);

export type Accessor<T> = string | ((row: T) => unknown);

export type SortType = "auto" | "string" | "number" | "date";

export function resolveAccessor<T>(row: T, accessor: Accessor<T>): unknown {
  if (typeof accessor === "function") return accessor(row);
  return accessor
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc == null ? acc : (acc as Record<string, unknown>)[key],
      row,
    );
}

export interface DataTableContextValue<T = unknown> {
  /** Exactly what you passed in. */
  sourceRows: T[];
  /** After search + sort, before paging. */
  filteredRows: T[];
  /** The current page — what you render. */
  rows: T[];
  getRowId: (row: T) => string | number;

  search: string;
  setSearch: (value: string) => void;

  sort: { id: string; direction: "asc" | "desc" } | null;
  toggleSort: (id: string, accessor: Accessor<T>, type: SortType) => void;

  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
  totalPages: number;
  total: number;
  from: number;
  to: number;

  selectedIds: Set<string | number>;
  selectedRows: T[];
  isSelected: (id: string | number) => boolean;
  toggleRow: (id: string | number) => void;
  toggleAllOnPage: () => void;
  clearSelection: () => void;
  isAllPageSelected: boolean;
  isSomePageSelected: boolean;

  isExpanded: (id: string | number) => boolean;
  toggleExpanded: (id: string | number) => void;

  theme: Record<string, string>;
  themeStyle?: React.CSSProperties;
}

export const DataTableContext = createContext<DataTableContextValue | null>(null);

export function useDataTable<T = unknown>(): DataTableContextValue<T> {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable must be used inside <DataTable>.");
  }
  return ctx as DataTableContextValue<T>;
}
