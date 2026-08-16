"use client";

import { cn } from "@/lib/utils";
import { SelectBlock } from "./SelectBlock";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Minus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import React, { forwardRef, useEffect, useMemo, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TableColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    ring: "focus:border-indigo-600 focus:ring-indigo-600/10",
    headerBg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  },
  rose: {
    bg: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    ring: "focus:border-rose-600 focus:ring-rose-600/10",
    headerBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    ring: "focus:border-emerald-600 focus:ring-emerald-600/10",
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-600",
    bgSoft: "bg-blue-50 dark:bg-blue-500/10",
    ring: "focus:border-blue-600 focus:ring-blue-600/10",
    headerBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50",
    ring: "focus:border-zinc-900 focus:ring-zinc-900/10",
    headerBg: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
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

export const getThemeStyles = (color?: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--table-color)]",
        text: "text-[var(--table-color)]",
        border: "border-[var(--table-color)]",
        bgSoft: "bg-[rgba(var(--table-rgb),0.1)]",
        ring: "focus:border-[var(--table-color)] focus:ring-[rgba(var(--table-rgb),0.1)]",
        headerBg: "bg-[rgba(var(--table-rgb),0.12)] text-[var(--table-color)]",
      },
      style: {
        "--table-color": color,
        "--table-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  if (color && colorThemes[color]) {
    return { theme: colorThemes[color], style: {} };
  }
  // Default to dynamic site primary theme color
  return {
    theme: {
      bg: "bg-primary text-primary-foreground",
      text: "text-primary",
      border: "border-primary",
      bgSoft: "bg-primary/10",
      ring: "focus:border-primary focus:ring-primary/20",
      headerBg: "bg-primary/10 dark:bg-primary/20 text-primary",
    },
    style: {},
  };
};

// ==========================================
// INTERFACES
// ==========================================
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (row: T) => React.ReactNode;
  sortType?: "string" | "number";
}

export interface AdvancedTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: T[];
  columns: TableColumn<T>[];
  color?: TableColor;
  searchable?: boolean;
  selectable?: boolean;
  primaryKey: keyof T;
  onBatchDelete?: (selectedIds: string[]) => void;
  onBatchEdit?: (selectedIds: string[]) => void;
  itemsPerPageOptions?: number[];
  batchActions?: (
    selectedIds: string[],
    clearSelection: () => void,
  ) => React.ReactNode;
}

// ==========================================
// COMPONENT
// ==========================================
export const AdvancedTableBlock = forwardRef<
  HTMLDivElement,
  AdvancedTableProps<any>
>(
  (
    {
      data,
      columns,
      color,
      searchable = true,
      selectable = true,
      primaryKey,
      onBatchDelete,
      onBatchEdit,
      itemsPerPageOptions = [5, 10, 25, 50],
      batchActions,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);

    // State
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "asc" | "desc";
      type: "string" | "number";
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(
      itemsPerPageOptions[1] || 10,
    );
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // 1. Filter
    const filteredData = useMemo(() => {
      if (!search) return data;
      const lowerSearch = search.toLowerCase();
      return data.filter((row) =>
        Object.entries(row).some(([, val]) =>
          String(val).toLowerCase().includes(lowerSearch),
        ),
      );
    }, [data, search]);

    // 2. Sort
    const sortedData = useMemo(() => {
      if (!sortConfig) return filteredData;
      return [...filteredData].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.type === "number") {
          return sortConfig.direction === "asc"
            ? Number(aVal) - Number(bVal)
            : Number(bVal) - Number(aVal);
        }

        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }, [filteredData, sortConfig]);

    // 3. Paginate
    const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      return sortedData.slice(start, start + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    // Bounds check
    useEffect(() => {
      if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);

    // Handlers
    const handleSort = (key: string, type: "string" | "number" = "string") => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig && sortConfig.key === key) {
        direction = sortConfig.direction === "asc" ? "desc" : "asc";
      } else if (type === "number") {
        direction = "desc"; // Default descending for numbers/dates
      }
      setSortConfig({ key, direction, type });
    };

    const toggleSelection = (id: string) => {
      const newSet = new Set(selectedIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      setSelectedIds(newSet);
    };

    const toggleAllPageSelection = () => {
      const pageIds = paginatedData.map((row) => String(row[primaryKey]));
      const allSelected =
        pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

      const newSet = new Set(selectedIds);
      if (allSelected) {
        pageIds.forEach((id) => newSet.delete(id));
      } else {
        pageIds.forEach((id) => newSet.add(id));
      }
      setSelectedIds(newSet);
    };

    const clearSelection = () => setSelectedIds(new Set());

    const isAllPageSelected =
      paginatedData.length > 0 &&
      paginatedData.every((row) => selectedIds.has(String(row[primaryKey])));
    const isSomePageSelected =
      paginatedData.length > 0 &&
      paginatedData.some((row) => selectedIds.has(String(row[primaryKey]))) &&
      !isAllPageSelected;

    // Unique ID for scoped keyframes
    const tableId = React.useId().replace(/:/g, "");

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col gap-4 font-sans text-[#1a1a2e]",
          className,
        )}
        style={style}
        {...props}
      >
        <style>{`
          @keyframes fadeUp-${tableId} {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* --- TOOLBAR --- */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
          {searchable ? (
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search all columns…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className={cn(
                  "w-full pl-9 pr-3 py-2 text-[13px] bg-white dark:bg-zinc-950 dark:text-white border-[1.5px] border-zinc-200 dark:border-zinc-800 rounded-lg outline-none transition-all shadow-sm",
                  theme.ring,
                  "focus:ring-[3px]",
                )}
              />
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 relative h-10 min-w-[180px] sm:min-w-[220px] justify-end overflow-visible">
            {/* Entries Dropdown */}
            <div
              className={cn(
                "flex items-center gap-1.5 text-[13px] text-zinc-500 transition-opacity duration-200",
                selectedIds.size > 0
                  ? "opacity-0 pointer-events-none hidden"
                  : "opacity-100 pointer-events-auto",
              )}
            >
              Show
              <SelectBlock
                options={itemsPerPageOptions.map((opt) => ({
                  label: String(opt),
                  value: String(opt),
                }))}
                value={String(itemsPerPage)}
                onChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}
                color={color as string}
                inputSize="sm"
                className="w-[72px] shrink-0"
              />
              entries
            </div>

            {/* Floating Batch Actions Pill - Dynamic Theme Color & Perfectly Aligned */}
            <div
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-xl shadow-lg border border-primary-foreground/20 overflow-hidden transition-all duration-300 ease-out z-20",
                selectedIds.size > 0
                  ? "opacity-100 pointer-events-auto translate-y-0 scale-100 flex"
                  : "opacity-0 pointer-events-none -translate-y-2 scale-95 hidden",
              )}
            >
              <span className="text-[11px] sm:text-[12px] font-black whitespace-nowrap pl-0.5">
                {selectedIds.size} selected
              </span>
              <div className="w-px h-[16px] bg-primary-foreground/30 shrink-0 mx-0.5" />

              {batchActions ? (
                batchActions(Array.from(selectedIds), clearSelection)
              ) : (
                <div className="flex items-center gap-1">
                  {onBatchEdit && (
                    <button
                      onClick={() => onBatchEdit(Array.from(selectedIds))}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-bold bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors whitespace-nowrap active:scale-95 text-primary-foreground"
                    >
                      <Edit2 className="w-3 h-3" /> <span className="hidden sm:inline">Edit</span>
                    </button>
                  )}
                  {onBatchDelete && (
                    <button
                      onClick={() => {
                        onBatchDelete(Array.from(selectedIds));
                        clearSelection();
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-bold bg-rose-500/80 text-white hover:bg-rose-600 transition-colors whitespace-nowrap active:scale-95"
                    >
                      <Trash2 className="w-3 h-3" /> <span className="hidden sm:inline">Delete</span>
                    </button>
                  )}
                </div>
              )}

              <div className="w-px h-[16px] bg-primary-foreground/30 shrink-0 mx-0.5" />
              <button
                onClick={clearSelection}
                className="p-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors shrink-0"
                title="Clear selection"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="w-full overflow-x-auto overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
          <table className="w-full text-[13px] sm:text-[13.5px] text-left border-collapse whitespace-nowrap">
            <thead
              className={cn(
                "border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md transition-colors duration-150",
                theme.headerBg,
              )}
            >
              <tr>
                {selectable && (
                  <th className="w-11 px-4 py-[11px] text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={toggleAllPageSelection}
                        className={cn(
                          "w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0",
                          isAllPageSelected || isSomePageSelected
                            ? cn(theme.bg, theme.border)
                            : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950",
                        )}
                      >
                        {isAllPageSelected && (
                          <Check
                            className="w-2.5 h-2.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                        {isSomePageSelected && (
                          <Minus
                            className="w-2.5 h-2.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    </div>
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      "px-4 py-[11px] font-semibold text-[12px] text-zinc-500 uppercase tracking-[0.04em]",
                      col.sortable &&
                        cn(
                          "cursor-pointer select-none group hover:",
                          theme.text,
                        ),
                    )}
                    style={{ width: col.width }}
                    onClick={() =>
                      col.sortable && handleSort(String(col.key), col.sortType)
                    }
                  >
                    <div className="flex items-center gap-1.5">
                      {col.header}
                      {col.sortable && (
                        <div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">
                          {sortConfig?.key === String(col.key) ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className={cn("w-3 h-3 block", theme.text)}
                            >
                              <path
                                d={
                                  sortConfig.direction === "asc"
                                    ? "M12 19V5M5 12l7-7 7 7"
                                    : "M12 5v14M5 12l7 7 7-7"
                                }
                              />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-3 h-3 text-zinc-400"
                            >
                              <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="py-12 text-center text-[14px] text-zinc-400"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const id = String(row[primaryKey]);
                  const isSelected = selectedIds.has(id);

                  return (
                    <tr
                      key={id}
                      className={cn(
                        "border-b border-zinc-100 dark:border-zinc-800/60 transition-all duration-150",
                        isSelected
                          ? "bg-zinc-100/80 dark:bg-zinc-800/60"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                      )}
                      style={{
                        animation: `fadeUp-${tableId} 0.2s ease ${rowIndex * 30}ms both`,
                      }}
                    >
                      {selectable && (
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => toggleSelection(id)}
                              className={cn(
                                "w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0",
                                isSelected
                                  ? cn(theme.bg, theme.border)
                                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950",
                              )}
                            >
                              {isSelected && (
                                <Check
                                  className="w-2.5 h-2.5 text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </button>
                          </div>
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className="px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[13.5px] text-zinc-800 dark:text-zinc-200"
                        >
                          {col.render
                            ? col.render(row)
                            : String(row[col.key] || "")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* --- FOOTER / PAGINATION --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-1">
          <div className="text-[13px] text-zinc-500">
            Showing{" "}
            <strong className="font-semibold text-[#111827] dark:text-zinc-100">
              {sortedData.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </strong>{" "}
            to{" "}
            <strong className="font-semibold text-[#111827] dark:text-zinc-100">
              {Math.min(currentPage * itemsPerPage, sortedData.length)}
            </strong>{" "}
            of{" "}
            <strong className="font-semibold text-[#111827] dark:text-zinc-100">
              {sortedData.length}
            </strong>{" "}
            results
          </div>

          <div className="flex items-center gap-[3px]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-[13px] font-medium border-[1.5px] flex items-center justify-center transition-all",
                    currentPage === pageNum
                      ? cn(theme.bg, theme.border, "font-bold text-white")
                      : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700",
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);
AdvancedTableBlock.displayName = "AdvancedTableBlock";
