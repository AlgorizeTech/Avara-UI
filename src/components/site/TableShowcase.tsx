"use client";

import {
  TableBlock,
  TableColor,
  TableColumn,
  TableSize,
  TableVariant,
} from "@/components/custom/blocks/TableBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TABLE_ENGINE_CODE_TS = `"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown, Edit2, Trash2, Check, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react";

export type TableColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type TableVariant = "default" | "minimal" | "glass";
export type TableSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", focusRing: "focus-visible:ring-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", focusRing: "focus-visible:ring-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", focusRing: "focus-visible:ring-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", focusRing: "focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400" },
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
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]", border: "border-[var(--theme-color)]", focusRing: "focus-visible:ring-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface TableColumn<T> { key: keyof T | "actions"; label: string; sortable?: boolean; align?: "left" | "center" | "right"; render?: (row: T) => React.ReactNode; }
export interface TableBlockProps<T> { data: T[]; columns: TableColumn<T>[]; variant?: TableVariant; color?: TableColor; tableSize?: TableSize; selectable?: boolean; expandable?: boolean; pagination?: { itemsPerPage: number }; onSelectionChange?: (selectedRows: T[]) => void; onEdit?: (row: T) => void; onDelete?: (row: T) => void; renderExpanded?: (row: T) => React.ReactNode; className?: string; }

export function TableBlock<T extends { id: string | number }>({ data, columns, variant = "default", color = "indigo", tableSize = "md", selectable = false, expandable = false, pagination, onSelectionChange, onEdit, onDelete, renderExpanded, className }: TableBlockProps<T>) {
  const { theme, style } = getThemeStyles(color as string);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(new Set());

  const sizeClasses = { sm: { th: "px-3 py-2 text-xs", td: "px-3 py-2 text-xs", icon: "w-3.5 h-3.5" }, md: { th: "px-4 py-3 text-sm", td: "px-4 py-3 text-sm", icon: "w-4 h-4" }, lg: { th: "px-6 py-4 text-sm", td: "px-6 py-4 text-base", icon: "w-5 h-5" } };
  const s = sizeClasses[tableSize];

  const variantClasses = {
    default: { wrapper: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden", header: "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800", row: "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors group", selectedRow: theme.bgSoft, expandedContent: "bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-800/50" },
    minimal: { wrapper: "bg-transparent w-full overflow-hidden", header: "border-b-2 border-zinc-200 dark:border-zinc-800", row: "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors group", selectedRow: theme.bgSoft, expandedContent: "bg-zinc-50/30 dark:bg-zinc-900/10 border-b border-zinc-100 dark:border-zinc-800/50" },
    glass: { wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl overflow-hidden", header: "bg-white/20 dark:bg-white/5 border-b border-white/20 dark:border-white/10 backdrop-blur-md", row: "hover:bg-white/10 dark:hover:bg-white/5 border-b border-white/10 dark:border-white/5 last:border-0 transition-colors group", selectedRow: "bg-white/20 dark:bg-white/10", expandedContent: "bg-black/5 dark:bg-white/5 border-b border-white/10 dark:border-white/5 backdrop-blur-sm" },
  };
  const v = variantClasses[variant];

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pagination.itemsPerPage) : 1;
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * pagination.itemsPerPage;
    return sortedData.slice(startIndex, startIndex + pagination.itemsPerPage);
  }, [sortedData, currentPage, pagination]);

  useEffect(() => {
    if (tbodyRef.current && paginatedData.length > 0) {
      const rows = tbodyRef.current.querySelectorAll('.table-row-item');
      gsap.fromTo(rows, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" });
    }
  }, [paginatedData, sortConfig, currentPage]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = new Set(paginatedData.map(row => row.id));
      setSelectedIds(newSelected);
      if (onSelectionChange) onSelectionChange(paginatedData);
    } else {
      setSelectedIds(new Set());
      if (onSelectionChange) onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string | number, row: T, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id); else newSelected.add(id);
    setSelectedIds(newSelected);
    if (onSelectionChange) onSelectionChange(data.filter(r => newSelected.has(r.id)));
  };

  const toggleExpandRow = (id: string | number) => {
    if (!expandable || !renderExpanded) return;
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id); else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const CustomCheckbox = ({ checked, onChange }: { checked: boolean, onChange: (e: any) => void }) => (
    <div className="relative flex items-center justify-center pt-0.5" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={checked} onChange={onChange} className={cn("peer h-4 w-4 shrink-0 rounded-[4px] border-2 appearance-none cursor-pointer transition-colors outline-none", checked ? cn(theme.bg, "border-transparent") : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900", theme.focusRing)} />
      <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
    </div>
  );

  return (
    <div className={cn("w-full flex flex-col gap-4", className)} style={style}>
      <div className={v.wrapper}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={v.header}>
              <tr>
                {expandable && <th className="w-10 px-2" />}
                {selectable && <th className={cn(s.th, "w-12 text-center")}><CustomCheckbox checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length} onChange={handleSelectAll} /></th>}
                {columns.map((col) => (
                  <th key={String(col.key)} className={cn(s.th, "font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider select-none", col.align === "center" && "text-center", col.align === "right" && "text-right")}>
                    {col.sortable ? (
                      <div className={cn("inline-flex items-center gap-1 cursor-pointer group/sort hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors", sortConfig.key === col.key && "text-zinc-900 dark:text-zinc-100")} onClick={() => handleSort(col.key as keyof T)}>
                        {col.label}
                        <span className="flex flex-col text-zinc-300 dark:text-zinc-700 group-hover/sort:text-zinc-400 transition-colors">{sortConfig.key === col.key ? (sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3 text-zinc-900 dark:text-zinc-100" /> : <ChevronDown className="w-3 h-3 text-zinc-900 dark:text-zinc-100" />) : <ChevronsUpDown className="w-3 h-3" />}</span>
                      </div>
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {paginatedData.length === 0 ? <tr><td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)} className={cn(s.td, "text-center text-zinc-500 py-12")}>No data available.</td></tr> : paginatedData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                const isExpanded = expandedIds.has(row.id);
                return (
                  <React.Fragment key={row.id}>
                    <tr className={cn("table-row-item cursor-default", v.row, isSelected && v.selectedRow, expandable && "cursor-pointer")} onClick={() => toggleExpandRow(row.id)}>
                      {expandable && <td className="w-10 px-2 text-center"><button className="p-1 rounded-md text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"><ChevronRightIcon className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-90")} /></button></td>}
                      {selectable && <td className={cn(s.td, "w-12 text-center")}><CustomCheckbox checked={isSelected} onChange={(e) => handleSelectRow(row.id, row, e)} /></td>}
                      {columns.map((col) => (
                        <td key={String(col.key)} className={cn(s.td, "text-zinc-700 dark:text-zinc-300 font-medium", col.align === "center" && "text-center", col.align === "right" && "text-right")}>
                          {col.key === "actions" ? (
                            <div className={cn("flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start")}>
                              {onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(row); }} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"><Edit2 className="w-4 h-4" /></button>}
                              {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(row); }} className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                              {col.render && col.render(row)}
                            </div>
                          ) : col.render ? col.render(row) : String(row[col.key as keyof T])}
                        </td>
                      ))}
                    </tr>
                    {expandable && renderExpanded && (
                      <tr>
                        <td colSpan={columns.length + (selectable ? 1 : 0) + 1} className="p-0 border-0">
                          <div className={cn("grid transition-all duration-300 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                            <div className="overflow-hidden"><div className={cn("p-6", v.expandedContent)}>{renderExpanded(row)}</div></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 animate-in fade-in duration-500">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{(currentPage - 1) * pagination.itemsPerPage + 1}</span> to <span className="font-bold text-zinc-900 dark:text-zinc-100">{Math.min(currentPage * pagination.itemsPerPage, sortedData.length)}</span> of <span className="font-bold text-zinc-900 dark:text-zinc-100">{sortedData.length}</span> results</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return <button key={page} onClick={() => setCurrentPage(page)} className={cn("w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors", currentPage === page ? theme.bg : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>{page}</button>;
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-zinc-400 px-1">...</span>;
                }
                return null;
              })}
            </div>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TABLE_ENGINE_CODE_JS = `"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown, Edit2, Trash2, Check, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", focusRing: "focus-visible:ring-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", focusRing: "focus-visible:ring-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", focusRing: "focus-visible:ring-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", focusRing: "focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]", border: "border-[var(--theme-color)]", focusRing: "focus-visible:ring-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export function TableBlock({ data, columns, variant = "default", color = "indigo", tableSize = "md", selectable = false, expandable = false, pagination, onSelectionChange, onEdit, onDelete, renderExpanded, className }) {
  const { theme, style } = getThemeStyles(color);
  const tbodyRef = useRef(null);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set());

  const sizeClasses = { sm: { th: "px-3 py-2 text-xs", td: "px-3 py-2 text-xs", icon: "w-3.5 h-3.5" }, md: { th: "px-4 py-3 text-sm", td: "px-4 py-3 text-sm", icon: "w-4 h-4" }, lg: { th: "px-6 py-4 text-sm", td: "px-6 py-4 text-base", icon: "w-5 h-5" } };
  const s = sizeClasses[tableSize];

  const variantClasses = {
    default: { wrapper: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden", header: "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800", row: "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors group", selectedRow: theme.bgSoft, expandedContent: "bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-800/50" },
    minimal: { wrapper: "bg-transparent w-full overflow-hidden", header: "border-b-2 border-zinc-200 dark:border-zinc-800", row: "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors group", selectedRow: theme.bgSoft, expandedContent: "bg-zinc-50/30 dark:bg-zinc-900/10 border-b border-zinc-100 dark:border-zinc-800/50" },
    glass: { wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl overflow-hidden", header: "bg-white/20 dark:bg-white/5 border-b border-white/20 dark:border-white/10 backdrop-blur-md", row: "hover:bg-white/10 dark:hover:bg-white/5 border-b border-white/10 dark:border-white/5 last:border-0 transition-colors group", selectedRow: "bg-white/20 dark:bg-white/10", expandedContent: "bg-black/5 dark:bg-white/5 border-b border-white/10 dark:border-white/5 backdrop-blur-sm" },
  };
  const v = variantClasses[variant];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pagination.itemsPerPage) : 1;
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * pagination.itemsPerPage;
    return sortedData.slice(startIndex, startIndex + pagination.itemsPerPage);
  }, [sortedData, currentPage, pagination]);

  useEffect(() => {
    if (tbodyRef.current && paginatedData.length > 0) {
      const rows = tbodyRef.current.querySelectorAll('.table-row-item');
      gsap.fromTo(rows, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" });
    }
  }, [paginatedData, sortConfig, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = new Set(paginatedData.map(row => row.id));
      setSelectedIds(newSelected);
      if (onSelectionChange) onSelectionChange(paginatedData);
    } else {
      setSelectedIds(new Set());
      if (onSelectionChange) onSelectionChange([]);
    }
  };

  const handleSelectRow = (id, row, e) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id); else newSelected.add(id);
    setSelectedIds(newSelected);
    if (onSelectionChange) onSelectionChange(data.filter(r => newSelected.has(r.id)));
  };

  const toggleExpandRow = (id) => {
    if (!expandable || !renderExpanded) return;
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id); else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const CustomCheckbox = ({ checked, onChange }) => (
    <div className="relative flex items-center justify-center pt-0.5" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={checked} onChange={onChange} className={cn("peer h-4 w-4 shrink-0 rounded-[4px] border-2 appearance-none cursor-pointer transition-colors outline-none", checked ? cn(theme.bg, "border-transparent") : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900", theme.focusRing)} />
      <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
    </div>
  );

  return (
    <div className={cn("w-full flex flex-col gap-4", className)} style={style}>
      <div className={v.wrapper}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={v.header}>
              <tr>
                {expandable && <th className="w-10 px-2" />}
                {selectable && <th className={cn(s.th, "w-12 text-center")}><CustomCheckbox checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length} onChange={handleSelectAll} /></th>}
                {columns.map((col) => (
                  <th key={String(col.key)} className={cn(s.th, "font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider select-none", col.align === "center" && "text-center", col.align === "right" && "text-right")}>
                    {col.sortable ? (
                      <div className={cn("inline-flex items-center gap-1 cursor-pointer group/sort hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors", sortConfig.key === col.key && "text-zinc-900 dark:text-zinc-100")} onClick={() => handleSort(col.key)}>
                        {col.label}
                        <span className="flex flex-col text-zinc-300 dark:text-zinc-700 group-hover/sort:text-zinc-400 transition-colors">{sortConfig.key === col.key ? (sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3 text-zinc-900 dark:text-zinc-100" /> : <ChevronDown className="w-3 h-3 text-zinc-900 dark:text-zinc-100" />) : <ChevronsUpDown className="w-3 h-3" />}</span>
                      </div>
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {paginatedData.length === 0 ? <tr><td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)} className={cn(s.td, "text-center text-zinc-500 py-12")}>No data available.</td></tr> : paginatedData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                const isExpanded = expandedIds.has(row.id);
                return (
                  <React.Fragment key={row.id}>
                    <tr className={cn("table-row-item cursor-default", v.row, isSelected && v.selectedRow, expandable && "cursor-pointer")} onClick={() => toggleExpandRow(row.id)}>
                      {expandable && <td className="w-10 px-2 text-center"><button className="p-1 rounded-md text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"><ChevronRightIcon className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-90")} /></button></td>}
                      {selectable && <td className={cn(s.td, "w-12 text-center")}><CustomCheckbox checked={isSelected} onChange={(e) => handleSelectRow(row.id, row, e)} /></td>}
                      {columns.map((col) => (
                        <td key={String(col.key)} className={cn(s.td, "text-zinc-700 dark:text-zinc-300 font-medium", col.align === "center" && "text-center", col.align === "right" && "text-right")}>
                          {col.key === "actions" ? (
                            <div className={cn("flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start")}>
                              {onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(row); }} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"><Edit2 className="w-4 h-4" /></button>}
                              {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(row); }} className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                              {col.render && col.render(row)}
                            </div>
                          ) : col.render ? col.render(row) : String(row[col.key])}
                        </td>
                      ))}
                    </tr>
                    {expandable && renderExpanded && (
                      <tr>
                        <td colSpan={columns.length + (selectable ? 1 : 0) + 1} className="p-0 border-0">
                          <div className={cn("grid transition-all duration-300 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                            <div className="overflow-hidden"><div className={cn("p-6", v.expandedContent)}>{renderExpanded(row)}</div></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 animate-in fade-in duration-500">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{(currentPage - 1) * pagination.itemsPerPage + 1}</span> to <span className="font-bold text-zinc-900 dark:text-zinc-100">{Math.min(currentPage * pagination.itemsPerPage, sortedData.length)}</span> of <span className="font-bold text-zinc-900 dark:text-zinc-100">{sortedData.length}</span> results</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return <button key={page} onClick={() => setCurrentPage(page)} className={cn("w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors", currentPage === page ? theme.bg : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800")}>{page}</button>;
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-zinc-400 px-1">...</span>;
                }
                return null;
              })}
            </div>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}`;

type Transaction = {
  id: string;
  user: string;
  email: string;
  amount: string;
  status: "completed" | "processing" | "failed";
  date: string;
  details?: string;
};

export function TableShowcase() {
  const [variant, setVariant] = useState<TableVariant>("default");
  const [tableSize, setTableSize] = useState<TableSize>("md");
  const [isSelectable, setIsSelectable] = useState(true);
  const [isPaginated, setIsPaginated] = useState(true);
  const [isExpandable, setIsExpandable] = useState(true);

  // Initialize with localStorage if available
  const [color, setColor] = useState<TableColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  // Sample Data
  const sampleData: Transaction[] = [
    {
      id: "INV-3021",
      user: "Alice Freeman",
      email: "alice@example.com",
      amount: "$3,200.00",
      status: "completed",
      date: "Oct 24, 2023",
      details:
        "Payment processed via Stripe. Invoice sent to alice@example.com.",
    },
    {
      id: "INV-3022",
      user: "Bob Smith",
      email: "bob@example.com",
      amount: "$850.50",
      status: "processing",
      date: "Oct 24, 2023",
      details:
        "Waiting for bank confirmation. Usually takes 2-3 business days.",
    },
    {
      id: "INV-3023",
      user: "Charlie Davis",
      email: "charlie@example.com",
      amount: "$1,420.00",
      status: "failed",
      date: "Oct 23, 2023",
      details:
        "Card declined by issuer. User has been notified to update payment method.",
    },
    {
      id: "INV-3024",
      user: "Diana Prince",
      email: "diana@example.com",
      amount: "$940.00",
      status: "completed",
      date: "Oct 22, 2023",
      details: "Payment processed via PayPal.",
    },
    {
      id: "INV-3025",
      user: "Evan Wright",
      email: "evan@example.com",
      amount: "$2,100.00",
      status: "completed",
      date: "Oct 21, 2023",
    },
    {
      id: "INV-3026",
      user: "Fiona Gallagher",
      email: "fiona@example.com",
      amount: "$450.00",
      status: "processing",
      date: "Oct 21, 2023",
    },
    {
      id: "INV-3027",
      user: "George Harris",
      email: "george@example.com",
      amount: "$5,500.00",
      status: "completed",
      date: "Oct 20, 2023",
    },
  ];

  const columns: TableColumn<Transaction>[] = [
    { key: "id", label: "Invoice", sortable: true },
    {
      key: "user",
      label: "Customer",
      sortable: true,
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {row.user}
          </span>
          <span className="text-xs text-zinc-500">{row.email}</span>
        </div>
      ),
    },
    { key: "amount", label: "Amount", sortable: true, align: "right" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => {
        const styles = {
          completed:
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
          processing:
            "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
          failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
        };
        return (
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${styles[row.status]}`}
          >
            {row.status}
          </span>
        );
      },
    },
    { key: "date", label: "Date", sortable: true, align: "right" },
    { key: "actions", label: "", align: "right" },
  ];

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        data={data}\n        columns={columns}\n        variant="${variant}"\n        color="${color}"\n        tableSize="${tableSize}"`;
    if (isSelectable)
      propsStr += `\n        selectable\n        onSelectionChange={(rows) => console.log(rows)}`;
    if (isExpandable)
      propsStr += `\n        expandable\n        renderExpanded={(row) => (\n          <div className="text-sm text-zinc-500">\n            <h4 className="font-bold text-zinc-900">Transaction Details</h4>\n            <p>{row.details || "No additional details provided."}</p>\n          </div>\n        )}`;
    if (isPaginated) propsStr += `\n        pagination={{ itemsPerPage: 5 }}`;
    propsStr += `\n        onEdit={(row) => console.log("Edit", row)}\n        onDelete={(row) => console.log("Delete", row)}`;

    return `import { TableBlock } from "@/components/custom/blocks/TableBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status" },
  { key: "actions", label: "", align: "right" }
];

export default function TableDemo() {
  const data = [
    { id: "1", name: "Alice", status: "Active", details: "Joined recently." },
    { id: "2", name: "Bob", status: "Inactive", details: "Account suspended." },
  ];

  return (
    <div className="w-full">
      <TableBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "minimal", "glass"] as TableVariant[]).map((v) => (
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

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Size
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["sm", "md", "lg"] as TableSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setTableSize(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    tableSize === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Interactive Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setIsExpandable(!isExpandable)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isExpandable
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Expandable Rows
              </button>
              <button
                onClick={() => setIsSelectable(!isSelectable)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isSelectable
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Checkboxes
              </button>
              <button
                onClick={() => setIsPaginated(!isPaginated)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isPaginated
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Pagination
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TableBlock"
        tsCode={TABLE_ENGINE_CODE_TS}
        jsCode={TABLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex flex-col items-start justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "p-4 sm:p-8 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center" : "bg-zinc-50 dark:bg-[#050505] p-2 sm:p-8"} relative z-10`}
        >
          <div className="w-full max-w-5xl mx-auto">
            <TableBlock
              key={`${variant}-${color}-${tableSize}-${isSelectable}-${isPaginated}-${isExpandable}`}
              data={sampleData}
              columns={columns}
              variant={variant}
              color={color}
              tableSize={tableSize}
              selectable={isSelectable}
              expandable={isExpandable}
              pagination={isPaginated ? { itemsPerPage: 5 } : undefined}
              onEdit={(row) => console.log("Edit clicked", row)}
              onDelete={(row) => console.log("Delete clicked", row)}
              renderExpanded={(row) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Transaction Summary
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                    {row.details ||
                      "No additional transaction history provided for this invoice."}
                  </p>
                </div>
              )}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
