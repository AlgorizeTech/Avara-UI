"use client";

import { Pagination } from "@/components/custom/blocks/PaginationBlock";
import { RefreshCw } from "lucide-react";
import React, { useState } from "react";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
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

export default function PaginationDemo({
  color = "primary",
  currentPage: initialPage = 1,
  totalPages = 10,
  showEdges = true,
  siblingCount = 2,
  example = "table",
}: {
  color?: string;
  currentPage?: number;
  totalPages?: number;
  showEdges?: boolean;
  siblingCount?: number;
  /** "table" is the classic data-table frame; "bare" is the control on its own. */
  example?: "table" | "bare";
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Mock table data for the visual preview
  const itemsPerPage = 5;
  const mockTotalItems = totalPages * itemsPerPage;
  const safePage = Math.min(currentPage, totalPages);
  const currentStart = (safePage - 1) * itemsPerPage + 1;
  const currentEnd = Math.min(safePage * itemsPerPage, mockTotalItems);

  const activeHex = getThemeColorHex(color);

  if (example === "bare") {
    return (
      <div
        className="w-full flex items-center justify-center min-h-[300px] relative z-10 overflow-hidden"
        style={{ "--theme-color": activeHex } as React.CSSProperties}
      >
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={siblingCount}
          showEdges={showEdges}
        />
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 pl-[10px] pr-4 py-4 sm:p-6 relative z-10 overflow-hidden"
      style={{
        "--theme-color": activeHex,
        backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
      } as React.CSSProperties}
    >
      <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 shadow-sm">
        {/* Simulated Data Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
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
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={siblingCount}
          showEdges={showEdges}
        />
      </div>
    </div>
  );
}
