"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo, useState } from "react";

// ==========================================
// 1. ROOT CONTEXT & LOGIC
// ==========================================
export interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
  /** Renders a "Go to page" control next to the page numbers. */
  showPageJump?: boolean;
  /** `input` is a free-typed page number, `select` lists every page. */
  pageJumpVariant?: "input" | "select";
  /** Renders a "Rows per page" selector. Pair it with `pageSize` and `onPageSizeChange`. */
  showPageSize?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}

export function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  showEdges = true,
  showPageJump = false,
  pageJumpVariant = "input",
  showPageSize = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
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

  // Mobile pagination logic (smaller sibling count to fit nicely: 1 2 3 4 5 ... 10 style)
  const mobilePaginationRange = useMemo(() => {
    const mobSibling = 1;
    const totalPageNumbers = mobSibling + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - mobSibling, 1);
    const rightSiblingIndex = Math.min(currentPage + mobSibling, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * mobSibling;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * mobSibling;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage]);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        "mx-auto flex w-full max-w-full flex-col items-center gap-3 px-2 sm:px-4 md:flex-row md:justify-center md:gap-4 md:px-0",
        className
      )}
      {...props}
    >
      {/* Desktop / Tablet List (md:flex) */}
      <ul className="hidden flex-wrap items-center justify-center gap-1.5 md:flex md:gap-2 p-0 m-0 w-full md:w-auto">
        {showEdges && (
          <PaginationPrevious
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        )}

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") {
            return <PaginationEllipsis key={`desktop-dots-${index}`} />;
          }

          return (
            <PaginationItem
              key={`desktop-${pageNumber}`}
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange?.(pageNumber as number)}
            >
              {pageNumber}
            </PaginationItem>
          );
        })}

        {showEdges && (
          <PaginationNext
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        )}
      </ul>

      {/* Mobile List (md:hidden) */}
      <ul className="flex items-center justify-center gap-1 sm:gap-1.5 md:hidden w-full p-0 m-0">
        {mobilePaginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") {
            return <PaginationEllipsis key={`mobile-dots-${index}`} />;
          }

          return (
            <PaginationItem
              key={`mobile-${pageNumber}`}
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange?.(pageNumber as number)}
            >
              {pageNumber}
            </PaginationItem>
          );
        })}
      </ul>

      {/* Small device: Previous & Next buttons together side-by-side on the bottom line */}
      {showEdges && (
        <div className="flex items-center justify-center gap-2 md:hidden">
          <PaginationPrevious
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          />
          <PaginationNext
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </div>
      )}

      {/* Optional controls. One wrapping row on mobile; on md+ the wrapper
          dissolves (`contents`) so page size sits first and jump sits last. */}
      {(showPageSize || showPageJump) && (
        <div className="flex flex-wrap items-center justify-center gap-3 md:contents">
          {showPageSize && (
            <PaginationPageSize
              className="md:order-first"
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={onPageSizeChange}
            />
          )}
          {showPageJump && (
            <PaginationPageJump
              className="md:order-last"
              variant={pageJumpVariant}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      )}
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
    <li className="list-none m-0 p-0">
      <button
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))] sm:h-9 sm:w-9",
          isActive
            ? "bg-[var(--theme-color,var(--primary))]/10 text-[var(--theme-color,var(--primary))] border border-[var(--theme-color,var(--primary))]/30 shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent",
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
  showLabel?: boolean;
}

export function PaginationPrevious({
  className,
  disabled,
  showLabel,
  ...props
}: PaginationButtonProps) {
  return (
    <li className="list-none m-0 p-0">
      <button
        aria-label="Go to previous page"
        disabled={disabled}
        className={cn(
          "flex h-9 items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))] pl-2.5 pr-3",
          disabled
            ? "pointer-events-none opacity-50 text-muted-foreground"
            : "text-foreground hover:bg-muted hover:text-foreground",
          className,
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        {showLabel !== false && <span>Previous</span>}
      </button>
    </li>
  );
}

export function PaginationNext({
  className,
  disabled,
  showLabel,
  ...props
}: PaginationButtonProps) {
  return (
    <li className="list-none m-0 p-0">
      <button
        aria-label="Go to next page"
        disabled={disabled}
        className={cn(
          "flex h-9 items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))] pl-3 pr-2.5",
          disabled
            ? "pointer-events-none opacity-50 text-muted-foreground"
            : "text-foreground hover:bg-muted hover:text-foreground",
          className,
        )}
        {...props}
      >
        {showLabel !== false && <span>Next</span>}
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
    <li aria-hidden className="list-none m-0 p-0">
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center text-muted-foreground sm:h-9 sm:w-9",
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

// ==========================================
// 3. OPTIONAL CONTROLS
// ==========================================

const controlLabel =
  "flex items-center gap-2 text-xs font-medium text-muted-foreground whitespace-nowrap";
const controlField =
  "h-8 text-xs font-semibold bg-background text-foreground border border-input rounded-md outline-none transition-colors focus:border-[var(--theme-color,var(--primary))] focus:ring-2 focus:ring-[var(--theme-color,var(--primary))]/25";

function PaginationSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative inline-flex items-center">
      <select
        className={cn(controlField, "pl-2.5 pr-7 appearance-none cursor-pointer", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted-foreground" />
    </span>
  );
}

export interface PaginationPageSizeProps
  extends Omit<React.ComponentProps<"label">, "onChange"> {
  pageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}

export function PaginationPageSize({
  className,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  ...props
}: PaginationPageSizeProps) {
  // Keep the current size selectable even when it isn't one of the presets.
  const options = pageSizeOptions.includes(pageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, pageSize].sort((a, b) => a - b);

  return (
    <label className={cn(controlLabel, className)} {...props}>
      Rows per page
      <PaginationSelect
        value={pageSize}
        onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
      >
        {options.map((size) => (
          <option key={size} value={size} className="bg-background text-foreground">
            {size}
          </option>
        ))}
      </PaginationSelect>
    </label>
  );
}

export interface PaginationPageJumpProps
  extends Omit<React.ComponentProps<"form">, "onChange"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  variant?: "input" | "select";
}

export function PaginationPageJump({
  className,
  currentPage,
  totalPages,
  onPageChange,
  variant = "input",
  ...props
}: PaginationPageJumpProps) {
  const [draft, setDraft] = useState(String(currentPage));

  // A page change from elsewhere (number click, prev/next) resets the draft.
  // Adjusted while rendering, when `currentPage` changes, rather than in an effect.
  const [prevPage, setPrevPage] = useState(currentPage);
  if (currentPage !== prevPage) {
    setPrevPage(currentPage);
    setDraft(String(currentPage));
  }

  const commit = () => {
    const parsed = parseInt(draft, 10);
    if (Number.isNaN(parsed)) {
      setDraft(String(currentPage));
      return;
    }
    const page = Math.min(Math.max(parsed, 1), totalPages);
    setDraft(String(page));
    if (page !== currentPage) onPageChange?.(page);
  };

  if (variant === "select") {
    return (
      <form
        className={cn(controlLabel, className)}
        onSubmit={(e) => e.preventDefault()}
        {...props}
      >
        <label className="flex items-center gap-2">
          Page
          <PaginationSelect
            aria-label="Go to page"
            value={currentPage}
            onChange={(e) => onPageChange?.(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page} className="bg-background text-foreground">
                {page}
              </option>
            ))}
          </PaginationSelect>
        </label>
        <span>of {totalPages}</span>
      </form>
    );
  }

  return (
    <form
      className={cn(controlLabel, className)}
      onSubmit={(e) => {
        e.preventDefault();
        commit();
      }}
      {...props}
    >
      <label className="flex items-center gap-2">
        Go to page
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={totalPages}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          className={cn(
            controlField,
            "w-14 px-2 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
        />
      </label>
      <button
        type="submit"
        className="h-8 rounded-md border border-border px-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))] cursor-pointer"
      >
        Go
      </button>
    </form>
  );
}
