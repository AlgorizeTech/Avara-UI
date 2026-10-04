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
    lavender: "#9b8afb",
  };
  return map[c] || "var(--primary)";
};

export default function PaginationDemo({
  color = "primary",
  currentPage: initialPage = 1,
  totalPages = 10,
  showEdges = true,
  siblingCount = 2,
  showPageJump = false,
  pageJumpVariant = "input",
  showPageSize = false,
  pageSize: initialPageSize = 5,
  pageSizeOptions = [5, 10, 20, 50],
  example = "table",
}: {
  color?: string;
  currentPage?: number;
  totalPages?: number;
  showEdges?: boolean;
  siblingCount?: number;
  showPageJump?: boolean;
  pageJumpVariant?: "input" | "select";
  showPageSize?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  /** "table" is the classic data-table frame; "bare" is the control on its own. */
  example?: "table" | "bare";
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Mock table data for the visual preview. The item count is fixed, so
  // changing the page size re-derives how many pages there are.
  const mockTotalItems = totalPages * initialPageSize;
  const derivedTotalPages = Math.max(1, Math.ceil(mockTotalItems / pageSize));
  const safePage = Math.min(currentPage, derivedTotalPages);
  const currentStart = (safePage - 1) * pageSize + 1;
  const currentEnd = Math.min(safePage * pageSize, mockTotalItems);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const activeHex = getThemeColorHex(color);

  const pagination = (
    <Pagination
      color={color}
      currentPage={safePage}
      totalPages={derivedTotalPages}
      onPageChange={setCurrentPage}
      siblingCount={siblingCount}
      showEdges={showEdges}
      showPageJump={showPageJump}
      pageJumpVariant={pageJumpVariant}
      showPageSize={showPageSize}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageSizeChange={handlePageSizeChange}
    />
  );

  if (example === "bare") {
    return (
      <div
        className="w-full flex items-center justify-center min-h-[300px] relative z-10"
        style={{ "--theme-color": activeHex } as React.CSSProperties}
      >
        {pagination}
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-border pl-[10px] pr-4 py-4 sm:p-6 relative z-10"
      style={{
        "--theme-color": activeHex,
        backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
      } as React.CSSProperties}
    >
      <div className="w-full bg-card text-card-foreground border border-border rounded-xl p-4 sm:p-6 shadow-sm">
        {/* Simulated Data Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 pb-4 border-b border-border">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-foreground">
              Customer Directory
            </h3>
            <p className="text-xs text-muted-foreground">
              Showing {currentStart} to {currentEnd} of {mockTotalItems}{" "}
              entries
            </p>
          </div>
          <button
            onClick={() => setCurrentPage(1)}
            className="p-2 bg-card border border-border rounded-md shadow-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Reset to Page 1"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination Component */}
        {pagination}
      </div>
    </div>
  );
}
