"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";

// ==========================================
// 1. ROOT CONTEXT & LOGIC
// ==========================================
export interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
}

export function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  children,
  ...props
}: PaginationProps) {
  // Advanced pagination logic to calculate ellipses
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*ellipses

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [firstPageIndex, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  // Pass down the calculated state via Context (or implicitly via children rendering)
  // To keep it simple and composable, we pass props to standard children
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1 sm:gap-2">
        {/* Render Previous Button */}
        {showEdges && (
          <PaginationPrevious
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        )}

        {/* Render Page Numbers & Ellipses */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") {
            return <PaginationEllipsis key={`dots-${index}`} />;
          }

          return (
            <PaginationItem
              key={pageNumber}
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange?.(pageNumber as number)}
            >
              {pageNumber}
            </PaginationItem>
          );
        })}

        {/* Render Next Button */}
        {showEdges && (
          <PaginationNext
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        )}
      </ul>
    </nav>
  );
}

// ==========================================
// 2. ATOMIC COMPONENTS
// ==========================================

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function PaginationItem({
  className,
  isActive,
  ...props
}: PaginationItemProps) {
  return (
    <li>
      <button
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          isActive
            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 border border-transparent",
          className,
        )}
        {...props}
      />
    </li>
  );
}

export interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export function PaginationPrevious({
  className,
  disabled,
  ...props
}: PaginationButtonProps) {
  return (
    <li>
      <button
        aria-label="Go to previous page"
        disabled={disabled}
        className={cn(
          "flex h-9 items-center justify-center gap-1 pl-2.5 pr-3 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          disabled
            ? "pointer-events-none opacity-50 text-zinc-400 dark:text-zinc-600"
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
          className,
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline-block">Previous</span>
      </button>
    </li>
  );
}

export function PaginationNext({
  className,
  disabled,
  ...props
}: PaginationButtonProps) {
  return (
    <li>
      <button
        aria-label="Go to next page"
        disabled={disabled}
        className={cn(
          "flex h-9 items-center justify-center gap-1 pl-3 pr-2.5 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          disabled
            ? "pointer-events-none opacity-50 text-zinc-400 dark:text-zinc-600"
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
          className,
        )}
        {...props}
      >
        <span className="hidden sm:inline-block">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </li>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <li aria-hidden>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400",
          className,
        )}
        {...props}
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
      </span>
    </li>
  );
}
