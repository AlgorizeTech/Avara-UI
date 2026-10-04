"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const getThemeColorHex = (c?: string) => {
  if (!c) return undefined;
  if (c.startsWith("#") || c.startsWith("rgb")) return c;
  const map: Record<string, string> = {
    primary: "var(--primary)",
    default: "var(--primary)",
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    lavender: "#9b8afb",
    blue: "#3b82f6",
    zinc: "#71717a",
  };
  return map[c] || c;
};

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
  /** Themes the active states, focus rings and dropdown selection highlights. */
  color?: string;
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
  color,
  style,
  ...props
}: PaginationProps) {
  const customColorHex = getThemeColorHex(color);
  const navStyle = customColorHex
    ? ({ ...style, "--theme-color": customColorHex } as React.CSSProperties)
    : style;
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
      style={navStyle}
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
  "h-8 text-xs font-semibold bg-background text-foreground border border-input rounded-md outline-none transition-all focus:border-[var(--theme-color,var(--primary))] focus:ring-2 focus:ring-[var(--theme-color,var(--primary))]/25";

export interface PaginationDropdownOption {
  value: number | string;
  label: string;
}

export interface PaginationCustomDropdownProps {
  value?: number | string | readonly string[];
  options: PaginationDropdownOption[];
  onChange?: (value: number | string) => void;
  className?: string;
  ariaLabel?: string;
}

export function PaginationCustomDropdown({
  value,
  options,
  onChange,
  className,
  ariaLabel,
}: PaginationCustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const currentVal = Array.isArray(value) ? value[0] : value;
  const selectedOption =
    options.find((opt) => String(opt.value) === String(currentVal)) || options[0];

  const toggleDropdown = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const parentCard = containerRef.current.closest(".overflow-hidden, .bg-card, [data-slot='card']");
      let spaceBelowParent = 999;
      if (parentCard) {
        const parentRect = parentCard.getBoundingClientRect();
        spaceBelowParent = parentRect.bottom - rect.bottom;
      }
      if (spaceBelow < 220 || spaceBelowParent < 220) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
    setIsOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Scroll active element into view when opened
  React.useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.querySelector("[data-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen]);

  const handleSelect = (val: number | string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        className={cn(
          "h-8 min-w-[56px] px-2.5 flex items-center justify-between gap-1.5 rounded-md border border-input bg-background text-xs font-semibold text-foreground transition-all outline-none cursor-pointer select-none",
          "hover:border-[var(--theme-color,var(--primary))]/60 hover:bg-muted/40",
          "focus-visible:border-[var(--theme-color,var(--primary))] focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))]/25",
          isOpen && "border-[var(--theme-color,var(--primary))] ring-2 ring-[var(--theme-color,var(--primary))]/25 shadow-xs"
        )}
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 text-[var(--theme-color,var(--primary))]"
          )}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            "absolute z-50 min-w-[76px] max-h-52 overflow-y-auto rounded-lg border border-border bg-popover/95 p-1 text-popover-foreground shadow-xl backdrop-blur-md outline-none animate-in fade-in-0 zoom-in-95 duration-100",
            openUpwards ? "bottom-full mb-1.5" : "top-full mt-1.5",
            "left-0"
          )}
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(currentVal);
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                data-active={isSelected ? "true" : undefined}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors select-none",
                  isSelected
                    ? "bg-[var(--theme-color,var(--primary))]/15 text-[var(--theme-color,var(--primary))] font-semibold"
                    : "text-foreground/90 hover:bg-[var(--theme-color,var(--primary))]/10 hover:text-[var(--theme-color,var(--primary))]"
                )}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-[var(--theme-color,var(--primary))]" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function PaginationSelect({
  className,
  value,
  onChange,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const options: PaginationDropdownOption[] = React.useMemo(() => {
    const list: PaginationDropdownOption[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child.props as any)) {
        const p = child.props as any;
        list.push({
          value: p.value ?? p.children,
          label: String(p.children ?? p.value),
        });
      }
    });
    return list;
  }, [children]);

  if (options.length > 0) {
    return (
      <PaginationCustomDropdown
        value={value ?? options[0]?.value}
        options={options}
        onChange={(val) => {
          if (onChange) {
            const fakeEvent = {
              target: { value: String(val) },
              currentTarget: { value: String(val) },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(fakeEvent);
          }
        }}
        className={className}
      />
    );
  }

  return (
    <span className="relative inline-flex items-center">
      <select
        className={cn(controlField, "pl-2.5 pr-7 appearance-none cursor-pointer", className)}
        value={value}
        onChange={onChange}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted-foreground" />
    </span>
  );
}

export interface PaginationPageSizeProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
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
    <div className={cn(controlLabel, className)} {...props}>
      <span>Rows per page</span>
      <PaginationCustomDropdown
        value={pageSize}
        options={options.map((size) => ({
          value: size,
          label: String(size),
        }))}
        onChange={(val) => onPageSizeChange?.(Number(val))}
        ariaLabel="Rows per page"
      />
    </div>
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
        <div className="flex items-center gap-2">
          <span>Page</span>
          <PaginationCustomDropdown
            value={currentPage}
            options={Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => ({
              value: page,
              label: String(page),
            }))}
            onChange={(val) => onPageChange?.(Number(val))}
            ariaLabel="Go to page"
          />
        </div>
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
        className="h-8 rounded-md border border-border px-2.5 text-xs font-semibold text-foreground transition-all hover:border-[var(--theme-color,var(--primary))]/50 hover:bg-[var(--theme-color,var(--primary))]/10 hover:text-[var(--theme-color,var(--primary))] outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-color,var(--primary))] cursor-pointer"
      >
        Go
      </button>
    </form>
  );
}
