"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const PAGINATION_ENGINE_CODE_TS = `"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
}

export function Pagination({ className, currentPage, totalPages, onPageChange, siblingCount = 1, showEdges = true, ...props }: PaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1; const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [firstPageIndex, "dots", ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }
    return [];
  }, [totalPages, currentPage, siblingCount]);

  return (
    <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props}>
      <ul className="flex flex-row items-center gap-1 sm:gap-2">
        {showEdges && <PaginationPrevious onClick={() => onPageChange?.(currentPage - 1)} disabled={currentPage <= 1} />}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") return <PaginationEllipsis key={\`dots-\${index}\`} />;
          return (
            <PaginationItem key={pageNumber} isActive={pageNumber === currentPage} onClick={() => onPageChange?.(pageNumber as number)}>
              {pageNumber}
            </PaginationItem>
          );
        })}
        {showEdges && <PaginationNext onClick={() => onPageChange?.(currentPage + 1)} disabled={currentPage >= totalPages} />}
      </ul>
    </nav>
  );
}

export function PaginationItem({ className, isActive, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  return (
    <li>
      <button aria-current={isActive ? "page" : undefined} className={cn("flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))]", isActive ? "bg-[var(--theme-color,var(--primary))]/10 text-[var(--theme-color,var(--primary))] border border-[var(--theme-color,var(--primary))]/30 shadow-sm" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 border border-transparent", className)} {...props} />
    </li>
  );
}

export function PaginationPrevious({ className, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <li>
      <button aria-label="Go to previous page" disabled={disabled} className={cn("flex h-9 items-center justify-center gap-1 pl-2.5 pr-3 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))]", disabled ? "pointer-events-none opacity-50 text-zinc-400 dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50", className)} {...props}>
        <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline-block">Previous</span>
      </button>
    </li>
  );
}

export function PaginationNext({ className, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <li>
      <button aria-label="Go to next page" disabled={disabled} className={cn("flex h-9 items-center justify-center gap-1 pl-3 pr-2.5 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))]", disabled ? "pointer-events-none opacity-50 text-zinc-400 dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50", className)} {...props}>
        <span className="hidden sm:inline-block">Next</span><ChevronRight className="h-4 w-4" />
      </button>
    </li>
  );
}

export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <li aria-hidden><span className={cn("flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400", className)} {...props}><MoreHorizontal className="h-4 w-4" /><span className="sr-only">More pages</span></span></li>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const PAGINATION_ENGINE_CODE_JS = PAGINATION_ENGINE_CODE_TS
  .replace(/export interface PaginationProps extends React.ComponentProps<"nav"> \{[^}]+\}/g, "")
  .replace(/:\s*PaginationProps/g, "")
  .replace(/:\s*React.ButtonHTMLAttributes<HTMLButtonElement>\s*&\s*\{\s*isActive\?: boolean\s*\}/g, "")
  .replace(/:\s*React.ButtonHTMLAttributes<HTMLButtonElement>/g, "")
  .replace(/:\s*React.ComponentProps<"span">/g, "");

export function PaginationShowcase() {
  const [color, setColor] = useState<string>("primary");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [siblingCount, setSiblingCount] = useState(1);
  const [showEdges, setShowEdges] = useState(true);

  const getThemeColorHex = (c: string) => {
    if (c.startsWith('#')) return c;
    const map: Record<string, string> = {
      primary: "var(--primary)",
      default: "var(--primary)",
      indigo: "#6366f1",
      rose: "#f43f5e",
      emerald: "#10b981",
      zinc: "#18181b",
    };
    return map[c] || "var(--primary)";
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (typeof window !== "undefined") {
      localStorage.setItem("primaryColor", newColor);
    }
  };

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        currentPage={currentPage}\n        totalPages={${totalPages}}\n        onPageChange={setCurrentPage}`;
    if (siblingCount !== 1)
      propsStr += `\n        siblingCount={${siblingCount}}`;
    if (!showEdges) propsStr += `\n        showEdges={false}`;

    return `import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* ... Table Content ... */}
      
      <div className="mt-8 border-t pt-4">
        <Pagination ${propsStr}
        />
      </div>
    </div>
  );
}`;
  };

  // Mock table data for the visual preview
  const itemsPerPage = 5;
  const mockTotalItems = totalPages * itemsPerPage;
  const currentStart = (currentPage - 1) * itemsPerPage + 1;
  const currentEnd = Math.min(currentPage * itemsPerPage, mockTotalItems);

  const activeHex = getThemeColorHex(color);

  // Cross-browser targeted structural selectors to keep track line locked visible permanently
  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    "[&::-webkit-slider-runnable-track]:h-1.5",
    "[&::-webkit-slider-runnable-track]:bg-zinc-200",
    "dark:[&::-webkit-slider-runnable-track]:bg-zinc-800",
    "[&::-webkit-slider-runnable-track]:rounded-full",
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:w-4",
    "[&::-webkit-slider-thumb]:h-4",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-[var(--theme-color,var(--primary))]",
    "[&::-webkit-slider-thumb]:mt-[-5px]",
    "[&::-webkit-slider-thumb]:shadow-sm",
    "[&::-webkit-slider-thumb]:transition-transform",
    "hover:[&::-webkit-slider-thumb]:scale-110",
    "[&::-moz-range-track]:h-1.5",
    "[&::-moz-range-track]:bg-zinc-200",
    "dark:[&::-moz-range-track]:bg-zinc-800",
    "[&::-moz-range-track]:rounded-full",
    "[&::-moz-range-thumb]:w-4",
    "[&::-moz-range-thumb]:h-4",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:bg-[var(--theme-color,var(--primary))]",
    "[&::-moz-range-thumb]:border-none",
    "[&::-moz-range-thumb]:shadow-sm",
    "[&::-moz-range-thumb]:transition-transform",
    "hover:[&::-moz-range-thumb]:scale-110",
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex flex-col gap-3 flex-1">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Total Pages
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {totalPages}
              </span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={totalPages}
              onChange={(e) => {
                const newTotal = parseInt(e.target.value);
                setTotalPages(newTotal);
                if (currentPage > newTotal) setCurrentPage(newTotal);
              }}
              className={sliderClasses}
              style={{ "--theme-color": activeHex } as React.CSSProperties}
            />
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Sibling Count
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {siblingCount}
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="3"
              value={siblingCount}
              onChange={(e) => setSiblingCount(parseInt(e.target.value))}
              className={sliderClasses}
              style={{ "--theme-color": activeHex } as React.CSSProperties}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex items-center gap-2 h-7">
              <button
                onClick={() => setShowEdges(!showEdges)}
                className={cn(
                  "px-4 py-1.5 text-[13px] font-bold rounded-lg border transition-all cursor-pointer",
                  showEdges
                    ? "bg-[var(--theme-color,var(--primary))]/10 border-[var(--theme-color,var(--primary))]/30 text-[var(--theme-color,var(--primary))] shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                )}
                style={{ "--theme-color": activeHex } as React.CSSProperties}
              >
                Prev / Next Buttons
              </button>
            </div>
          </div>
        </div>

        {/* Color */}
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="PaginationBlock"
        tsCode={PAGINATION_ENGINE_CODE_TS}
        jsCode={PAGINATION_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className="w-full flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 p-6 relative z-10 overflow-hidden"
          style={{
            "--theme-color": activeHex,
            backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
          } as React.CSSProperties}
        >
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            {/* Simulated Data Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Customer Directory
                </h3>
                <p className="text-xs text-zinc-500">
                  Showing {currentStart} to {currentEnd} of {mockTotalItems}{" "}
                  entries
                </p>
              </div>
              <button
                onClick={() => setCurrentPage(1)}
                className="p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Reset to Page 1"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              siblingCount={siblingCount}
              showEdges={showEdges}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
