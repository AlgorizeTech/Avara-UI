"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Minus,
  Search,
  X,
} from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SelectBlock } from "./SelectBlock";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type TableColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type TableVariant = "default" | "minimal" | "glass";
export type TableSize = "sm" | "md" | "lg";
export type TableAlign = "left" | "center" | "right";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    bgSoft: "bg-primary/10",
    border: "border-primary",
    focusRing: "focus-visible:ring-primary",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-600",
    focusRing: "focus-visible:ring-indigo-500",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-600",
    focusRing: "focus-visible:ring-rose-500",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-600",
    focusRing: "focus-visible:ring-emerald-500",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50",
    border: "border-zinc-900 dark:border-zinc-100",
    focusRing: "focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400",
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
        focusRing: "focus-visible:ring-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// LOOK-UP TABLES
// ==========================================
const sizeClasses: Record<TableSize, { th: string; td: string; bar: string }> = {
  sm: {
    th: "px-3 py-2 text-[11px]",
    td: "px-3 py-2 text-xs",
    bar: "px-3 py-2.5",
  },
  md: {
    th: "px-4 lg:px-6 py-3.5 text-xs",
    td: "px-4 lg:px-6 py-3.5 text-sm",
    bar: "px-4 lg:px-6 py-4",
  },
  lg: { th: "px-6 py-4 text-xs", td: "px-6 py-4 text-base", bar: "px-6 py-5" },
};

interface VariantSkin {
  wrapper: string;
  heading: string;
  footer: string;
  headerRow: string;
  row: string;
  selectedRow: string;
  expanded: string;
}

const variantClasses: Record<TableVariant, VariantSkin> = {
  default: {
    wrapper: "bg-card border border-border rounded-xl shadow-sm overflow-hidden",
    heading: "border-b border-border",
    footer: "border-t border-border",
    headerRow: "bg-muted/50 dark:bg-white/[0.03] border-b border-border",
    row: "group border-b border-border/70 last:border-0 transition-colors hover:bg-muted/50 dark:hover:bg-white/[0.03]",
    selectedRow: "bg-muted/80 dark:bg-white/[0.06]",
    expanded: "bg-muted/30 dark:bg-white/[0.02] border-b border-border/70",
  },
  minimal: {
    wrapper: "bg-transparent w-full",
    heading: "border-b border-border",
    footer: "border-t border-border",
    headerRow: "border-b-2 border-border",
    row: "group border-b border-border/60 last:border-0 transition-colors hover:bg-muted/40",
    selectedRow: "bg-muted/60",
    expanded: "bg-muted/20 border-b border-border/60",
  },
  glass: {
    wrapper:
      "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl overflow-hidden",
    heading: "border-b border-white/20 dark:border-white/10",
    footer: "border-t border-white/20 dark:border-white/10",
    headerRow:
      "bg-white/20 dark:bg-white/5 border-b border-white/20 dark:border-white/10",
    row: "group border-b border-white/10 dark:border-white/5 last:border-0 transition-colors hover:bg-white/10 dark:hover:bg-white/5",
    selectedRow: "bg-white/20 dark:bg-white/10",
    expanded:
      "bg-black/5 dark:bg-white/5 border-b border-white/10 dark:border-white/5",
  },
};

const alignClasses: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const alignFlex: Record<TableAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

// ==========================================
// CONTEXT
// ==========================================
export interface TableStyleContext {
  variant: TableVariant;
  size: TableSize;
  theme: Record<string, string>;
}

const TableContext = createContext<TableStyleContext>({
  variant: "default",
  size: "md",
  theme: colorThemes.primary,
});

/**
 * Every primitive reads its skin from here and falls back to sane defaults, so
 * a TableCell dropped into a hand-rolled table still renders correctly.
 */
export const useTableStyles = () => useContext(TableContext);

// ==========================================
// PRIMITIVES
// ==========================================
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TableVariant;
  color?: TableColor;
  size?: TableSize;
}

export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      variant = "default",
      color = "primary",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    return (
      <TableContext.Provider value={{ variant, size, theme }}>
        <div
          ref={ref}
          className={cn("w-full", variantClasses[variant].wrapper, className)}
          style={style}
          {...props}
        >
          {children}
        </div>
      </TableContext.Provider>
    );
  },
);
Table.displayName = "Table";

/** `title` is widened to ReactNode, so the DOM `title` attribute is omitted. */
export interface TableHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const TableHeading = forwardRef<HTMLDivElement, TableHeadingProps>(
  ({ title, description, className, children, ...props }, ref) => {
    const { variant, size } = useTableStyles();
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-between gap-3",
          sizeClasses[size].bar,
          variantClasses[variant].heading,
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3 className="text-base lg:text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {children}
          </div>
        )}
      </div>
    );
  },
);
TableHeading.displayName = "TableHeading";

export const TableContent = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <div className="w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom border-collapse text-left",
        className,
      )}
      {...props}
    >
      {children}
    </table>
  </div>
));
TableContent.displayName = "TableContent";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={className} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Staggered GSAP entrance for direct child rows. */
  animate?: boolean;
  /** Change this to replay the entrance — e.g. on sort or page change. */
  animateKey?: React.Key;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ animate = false, animateKey, className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLTableSectionElement>(null);
    React.useImperativeHandle(
      ref,
      () => innerRef.current as HTMLTableSectionElement,
    );

    useEffect(() => {
      if (!animate || !innerRef.current) return;
      const rows = innerRef.current.querySelectorAll(":scope > tr");
      if (!rows.length) return;
      const tween = gsap.fromTo(
        rows,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "all",
        },
      );
      return () => {
        tween.kill();
      };
    }, [animate, animateKey]);

    return (
      <tbody ref={innerRef} className={className} {...props}>
        {children}
      </tbody>
    );
  },
);
TableBody.displayName = "TableBody";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  isHeader?: boolean;
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    { isHeader = false, selected = false, className, children, ...props },
    ref,
  ) => {
    const { variant } = useTableStyles();
    const skin = variantClasses[variant];
    return (
      <tr
        ref={ref}
        data-selected={selected || undefined}
        className={cn(
          isHeader ? skin.headerRow : skin.row,
          !isHeader && selected && skin.selectedRow,
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: TableAlign;
  sortable?: boolean;
  /** Controlled — you own the sort state. */
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      align = "left",
      sortable = false,
      sortDirection = null,
      onSort,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { size } = useTableStyles();
    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={
          sortable
            ? sortDirection === "asc"
              ? "ascending"
              : sortDirection === "desc"
                ? "descending"
                : "none"
            : undefined
        }
        className={cn(
          sizeClasses[size].th,
          "whitespace-nowrap font-semibold uppercase tracking-wider text-muted-foreground select-none",
          alignClasses[align],
          className,
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className={cn(
              "inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider transition-colors hover:text-foreground",
              sortDirection && "text-foreground",
            )}
          >
            {children}
            <span className="shrink-0">
              {sortDirection === "asc" ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : sortDirection === "desc" ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
              )}
            </span>
          </button>
        ) : (
          children
        )}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: TableAlign;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "left", className, children, ...props }, ref) => {
    const { size } = useTableStyles();
    return (
      <td
        ref={ref}
        className={cn(
          sizeClasses[size].td,
          "align-middle text-foreground/80",
          alignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </td>
    );
  },
);
TableCell.displayName = "TableCell";

export const TableFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { variant, size } = useTableStyles();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        sizeClasses[size].bar,
        variantClasses[variant].footer,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TableFooter.displayName = "TableFooter";

export interface TableEmptyProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  colSpan: number;
}

export const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(
  ({ colSpan, className, children, ...props }, ref) => (
    <tr>
      <td
        ref={ref}
        colSpan={colSpan}
        className={cn(
          "py-12 text-center text-sm text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children ?? "No data available."}
      </td>
    </tr>
  ),
);
TableEmpty.displayName = "TableEmpty";

export interface TableExpandedRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  open?: boolean;
  colSpan: number;
}

export const TableExpandedRow = forwardRef<
  HTMLTableRowElement,
  TableExpandedRowProps
>(({ open = false, colSpan, className, children, ...props }, ref) => {
  const { variant } = useTableStyles();
  return (
    <tr
      ref={ref}
      className={cn(
        open ? variantClasses[variant].expanded : "border-0",
        className,
      )}
      {...props}
    >
      <td colSpan={colSpan} className="p-0 border-0">
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </td>
    </tr>
  );
});
TableExpandedRow.displayName = "TableExpandedRow";

export interface TableExpandToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
}

export const TableExpandToggle = forwardRef<
  HTMLButtonElement,
  TableExpandToggleProps
>(({ open = false, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={open}
    aria-label={open ? "Collapse row" : "Expand row"}
    className={cn(
      "p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors",
      className,
    )}
    {...props}
  >
    <ChevronRight
      className={cn(
        "w-4 h-4 transition-transform duration-200",
        open && "rotate-90",
      )}
    />
  </button>
));
TableExpandToggle.displayName = "TableExpandToggle";

export interface TableRowActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: TableAlign;
  /** Keep actions visible instead of revealing them on row hover. */
  alwaysVisible?: boolean;
}

export const TableRowActions = forwardRef<HTMLDivElement, TableRowActionsProps>(
  (
    { align = "right", alwaysVisible = false, className, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-1 transition-opacity duration-200",
        alignFlex[align],
        !alwaysVisible &&
          "opacity-0 group-hover:opacity-100 focus-within:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
TableRowActions.displayName = "TableRowActions";

// ==========================================
// DATA ACCESS — deliberately shape-agnostic
// ==========================================
/** A column value is read either by dot-path or by your own function. */
export type Accessor<T> = string | ((row: T) => unknown);

export type SortType = "auto" | "string" | "number" | "date";

/** Reads "user.profile.name" as well as a plain "name". */
export function resolveAccessor<T>(row: T, accessor: Accessor<T>): unknown {
  if (typeof accessor === "function") return accessor(row);
  return accessor
    .split(".")
    .reduce<any>((acc, key) => (acc == null ? acc : acc[key]), row);
}

/** Flattens any nested row into one searchable string. */
function defaultSearchText(value: unknown): string {
  if (value == null) return "";
  if (typeof value !== "object") return String(value);
  if (Array.isArray(value)) return value.map(defaultSearchText).join(" ");
  return Object.values(value as Record<string, unknown>)
    .map(defaultSearchText)
    .join(" ");
}

/** Works with SQL `id`, Mongo `_id` and anything you map yourself. */
function defaultGetRowId(row: any): string | number {
  return row?.id ?? row?._id ?? row?.uuid ?? row?.key;
}

function compareValues(a: unknown, b: unknown, type: SortType): number {
  if (type === "number") return Number(a) - Number(b);
  if (type === "date")
    return new Date(String(a)).getTime() - new Date(String(b)).getTime();
  if (type === "auto" && typeof a === "number" && typeof b === "number")
    return a - b;
  const as = String(a ?? "").toLowerCase();
  const bs = String(b ?? "").toLowerCase();
  return as < bs ? -1 : as > bs ? 1 : 0;
}

// ==========================================
// CONTEXT
// ==========================================
interface SortState<T> {
  id: string;
  direction: "asc" | "desc";
  accessor: Accessor<T>;
  type: SortType;
}

export interface DataTableContextValue<T = any> {
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

const DataTableContext = createContext<DataTableContextValue | null>(null);

/** Escape hatch — build your own toolbar, pager or empty state on this. */
export function useDataTable<T = any>(): DataTableContextValue<T> {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable must be used inside <DataTable>.");
  }
  return ctx as DataTableContextValue<T>;
}

const RowContext = createContext<{ rowId: string | number } | null>(null);
const useRowId = () => useContext(RowContext)?.rowId;

// ==========================================
// ROOT
// ==========================================
export interface DataTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: T[];
  /** Defaults to `id`, then `_id`, then `uuid`. */
  getRowId?: (row: T) => string | number;
  /** Override how a row is flattened for the search box. */
  getSearchText?: (row: T) => string;
  variant?: TableVariant;
  color?: TableColor;
  size?: TableSize;
  initialSort?: { id: string; direction?: "asc" | "desc"; type?: SortType };
  pageSize?: number;
  pageSizeOptions?: number[];
  /** Fires whenever the selection changes, with the full row objects. */
  onSelectionChange?: (rows: T[]) => void;
}

function DataTableImpl<T>({
  data,
  getRowId = defaultGetRowId,
  getSearchText,
  variant = "default",
  color = "primary",
  size = "md",
  initialSort,
  pageSize: pageSizeProp,
  pageSizeOptions = [5, 10, 25, 50],
  onSelectionChange,
  className,
  children,
  ...props
}: DataTableProps<T>) {
  const { theme, style } = getThemeStyles(color as string);

  const [search, setSearchState] = useState("");
  const [sort, setSort] = useState<SortState<T> | null>(
    initialSort
      ? {
          id: initialSort.id,
          direction: initialSort.direction ?? "asc",
          accessor: initialSort.id,
          type: initialSort.type ?? "auto",
        }
      : null,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(
    pageSizeProp ?? pageSizeOptions[1] ?? 10,
  );
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set(),
  );
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(
    new Set(),
  );

  // 1. Search
  const searchedRows = useMemo(() => {
    if (!search.trim()) return data;
    const needle = search.toLowerCase();
    return data.filter((row) =>
      (getSearchText ? getSearchText(row) : defaultSearchText(row))
        .toLowerCase()
        .includes(needle),
    );
  }, [data, search, getSearchText]);

  // 2. Sort
  const filteredRows = useMemo(() => {
    if (!sort) return searchedRows;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...searchedRows].sort(
      (a, b) =>
        factor *
        compareValues(
          resolveAccessor(a, sort.accessor),
          resolveAccessor(b, sort.accessor),
          sort.type,
        ),
    );
  }, [searchedRows, sort]);

  // 3. Paginate
  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const rows = useMemo(
    () => filteredRows.slice((page - 1) * pageSize, page * pageSize),
    [filteredRows, page, pageSize],
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPage(1);
  }, []);

  const setPageSize = useCallback((next: number) => {
    setPageSizeState(next);
    setPage(1);
  }, []);

  const toggleSort = useCallback(
    (id: string, accessor: Accessor<T>, type: SortType) => {
      setSort((prev) =>
        prev && prev.id === id
          ? {
              id,
              accessor,
              type,
              direction: prev.direction === "asc" ? "desc" : "asc",
            }
          : { id, accessor, type, direction: "asc" },
      );
    },
    [],
  );

  const selectedRows = useMemo(
    () => data.filter((row) => selectedIds.has(getRowId(row))),
    [data, selectedIds, getRowId],
  );

  const selectionCallbackRef = React.useRef(onSelectionChange);
  selectionCallbackRef.current = onSelectionChange;
  const selectedRowsRef = React.useRef(selectedRows);
  selectedRowsRef.current = selectedRows;

  useEffect(() => {
    selectionCallbackRef.current?.(selectedRowsRef.current);
  }, [selectedIds]);

  const toggleRow = useCallback((id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const pageIds = useMemo(() => rows.map(getRowId), [rows, getRowId]);

  const isAllPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
  const isSomePageSelected =
    !isAllPageSelected && pageIds.some((id) => selectedIds.has(id));

  const toggleAllOnPage = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected =
        pageIds.length > 0 && pageIds.every((id) => next.has(id));
      pageIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  }, [pageIds]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const toggleExpanded = useCallback((id: string | number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value: DataTableContextValue<T> = {
    sourceRows: data,
    filteredRows,
    rows,
    getRowId,
    search,
    setSearch,
    sort: sort ? { id: sort.id, direction: sort.direction } : null,
    toggleSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizeOptions,
    totalPages,
    total,
    from: total === 0 ? 0 : (page - 1) * pageSize + 1,
    to: Math.min(page * pageSize, total),
    selectedIds,
    selectedRows,
    isSelected: (id) => selectedIds.has(id),
    toggleRow,
    toggleAllOnPage,
    clearSelection,
    isAllPageSelected,
    isSomePageSelected,
    isExpanded: (id) => expandedIds.has(id),
    toggleExpanded,
    theme,
    themeStyle: style,
  };

  return (
    <DataTableContext.Provider value={value as DataTableContextValue}>
      <Table
        variant={variant}
        color={color}
        size={size}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </Table>
    </DataTableContext.Provider>
  );
}

/** Generic over the row shape, so `data` infers T everywhere downstream. */
export const DataTable = DataTableImpl as <T>(
  props: DataTableProps<T>,
) => React.ReactElement | null;

// ==========================================
// PASS-THROUGH LAYOUT (unchanged from Table)
// ==========================================
export const DataTableHeading = TableHeading;
export const DataTableContent = TableContent;
export const DataTableHeader = TableHeader;
export const DataTableCell = TableCell;
export const DataTableFooter = TableFooter;
export const DataTableEmpty = TableEmpty;

// ==========================================
// WIRED PARTS
// ==========================================
export const DataTableToolbar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
DataTableToolbar.displayName = "DataTableToolbar";

export interface DataTableSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  placeholder?: string;
}

export const DataTableSearch = forwardRef<
  HTMLInputElement,
  DataTableSearchProps
>(({ placeholder = "Search…", className, ...props }, ref) => {
  const { search, setSearch, theme } = useDataTable();
  return (
    <div className={cn("relative w-full sm:w-[260px]", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        ref={ref}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-9 pr-3 py-2 text-[13px] bg-background text-foreground border-[1.5px] border-border rounded-lg outline-none transition-all shadow-sm focus:ring-[3px]",
          theme.focusRing,
        )}
        {...props}
      />
    </div>
  );
});
DataTableSearch.displayName = "DataTableSearch";

export interface DataTablePageSizeProps {
  label?: string;
  suffix?: string;
  color?: TableColor;
  className?: string;
}

export function DataTablePageSize({
  label = "Show",
  suffix = "entries",
  color,
  className,
}: DataTablePageSizeProps) {
  const { pageSize, setPageSize, pageSizeOptions } = useDataTable();
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[13px] text-muted-foreground",
        className,
      )}
    >
      {label}
      <SelectBlock
        options={pageSizeOptions.map((opt) => ({
          label: String(opt),
          value: String(opt),
        }))}
        value={String(pageSize)}
        onChange={(v) => setPageSize(Number(v))}
        color={color as string}
        inputSize="sm"
        className="w-[72px] shrink-0"
      />
      {suffix}
    </div>
  );
}

export interface DataTableBodyProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children: ((rows: T[]) => React.ReactNode) | React.ReactNode;
  animate?: boolean;
}

function DataTableBodyImpl<T>({
  children,
  animate = false,
  ...props
}: DataTableBodyProps<T>) {
  const { rows, page, sort, search } = useDataTable<T>();
  return (
    <TableBody
      animate={animate}
      animateKey={`${page}-${sort?.id ?? ""}-${sort?.direction ?? ""}-${search}`}
      {...props}
    >
      {typeof children === "function"
        ? (children as (rows: T[]) => React.ReactNode)(rows)
        : children}
    </TableBody>
  );
}

export const DataTableBody = DataTableBodyImpl as <T = any>(
  props: DataTableBodyProps<T>,
) => React.ReactElement | null;

export interface DataTableRowProps<T = any>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Pass the row and selection/expansion wire themselves up. */
  row?: T;
  /** Or pass the id directly. */
  rowId?: string | number;
  isHeader?: boolean;
}

function DataTableRowImpl<T>({
  row,
  rowId: rowIdProp,
  isHeader = false,
  children,
  ...props
}: DataTableRowProps<T>) {
  const { getRowId, isSelected } = useDataTable<T>();
  const rowId =
    rowIdProp ?? (row !== undefined ? getRowId(row) : (undefined as any));

  const content = (
    <TableRow
      isHeader={isHeader}
      selected={rowId !== undefined && isSelected(rowId)}
      {...props}
    >
      {children}
    </TableRow>
  );

  if (rowId === undefined) return content;
  return (
    <RowContext.Provider value={{ rowId }}>{content}</RowContext.Provider>
  );
}

export const DataTableRow = DataTableRowImpl as <T = any>(
  props: DataTableRowProps<T>,
) => React.ReactElement | null;

export interface DataTableHeadProps<T = any>
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: TableAlign;
  /** Dot-path or accessor function. Presence of this makes the header sortable. */
  sortBy?: Accessor<T>;
  /** Required only when `sortBy` is a function. */
  sortId?: string;
  sortType?: SortType;
}

function DataTableHeadImpl<T>({
  align = "left",
  sortBy,
  sortId,
  sortType = "auto",
  children,
  ...props
}: DataTableHeadProps<T>) {
  const { sort, toggleSort } = useDataTable<T>();
  const autoId = React.useId();
  const id =
    typeof sortBy === "string" ? sortBy : (sortId ?? autoId);

  return (
    <TableHead
      align={align}
      sortable={sortBy !== undefined}
      sortDirection={sort?.id === id ? sort.direction : null}
      onSort={() => sortBy !== undefined && toggleSort(id, sortBy, sortType)}
      {...props}
    >
      {children}
    </TableHead>
  );
}

export const DataTableHead = DataTableHeadImpl as <T = any>(
  props: DataTableHeadProps<T>,
) => React.ReactElement | null;

function CheckBox({
  checked,
  indeterminate,
  onClick,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onClick: () => void;
  label: string;
}) {
  const { theme } = useDataTable();
  const active = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0",
        active ? cn(theme.bg, theme.border) : "border-border bg-background",
      )}
    >
      {indeterminate ? (
        <Minus className="w-2.5 h-2.5" strokeWidth={3} />
      ) : checked ? (
        <Check className="w-2.5 h-2.5" strokeWidth={3} />
      ) : null}
    </button>
  );
}

export function DataTableSelectAll({ className }: { className?: string }) {
  const { isAllPageSelected, isSomePageSelected, toggleAllOnPage } =
    useDataTable();
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <CheckBox
        checked={isAllPageSelected}
        indeterminate={isSomePageSelected}
        onClick={toggleAllOnPage}
        label="Select all rows on this page"
      />
    </div>
  );
}

export function DataTableSelect({ className }: { className?: string }) {
  const { isSelected, toggleRow } = useDataTable();
  const rowId = useRowId();
  if (rowId === undefined) return null;
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <CheckBox
        checked={isSelected(rowId)}
        onClick={() => toggleRow(rowId)}
        label="Select row"
      />
    </div>
  );
}

export function DataTableExpandToggle({ className }: { className?: string }) {
  const { isExpanded, toggleExpanded } = useDataTable();
  const rowId = useRowId();
  if (rowId === undefined) return null;
  return (
    <TableExpandToggle
      open={isExpanded(rowId)}
      onClick={(e) => {
        e.stopPropagation();
        toggleExpanded(rowId);
      }}
      className={className}
    />
  );
}

export interface DataTableExpandedRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  rowId: string | number;
  colSpan: number;
}

export function DataTableExpandedRow({
  rowId,
  colSpan,
  children,
  ...props
}: DataTableExpandedRowProps) {
  const { isExpanded } = useDataTable();
  return (
    <TableExpandedRow open={isExpanded(rowId)} colSpan={colSpan} {...props}>
      {children}
    </TableExpandedRow>
  );
}

export interface DataTableBatchBarProps {
  children?:
    | ((args: {
        selectedRows: any[];
        selectedIds: (string | number)[];
        clearSelection: () => void;
      }) => React.ReactNode)
    | React.ReactNode;
  floating?: boolean;
  className?: string;
}

export function DataTableBatchBar({
  children,
  floating = true,
  className,
}: DataTableBatchBarProps) {
  const { selectedIds, selectedRows, clearSelection, theme, themeStyle } = useDataTable();
  const count = selectedIds.size;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-lg border border-white/20 transition-all duration-300 ease-out z-30",
        theme.bg,
        floating &&
          "absolute left-1/2 -translate-x-1/2 bottom-4 pointer-events-auto",
        count > 0
          ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
          : "opacity-0 pointer-events-none translate-y-2 scale-95",
        className,
      )}
      style={themeStyle}
      inert={count === 0}
      aria-hidden={count === 0}
    >
      <span className="text-[11px] sm:text-[12px] font-black whitespace-nowrap pl-0.5">
        {count} selected
      </span>
      <div className="w-px h-[16px] bg-current opacity-30 shrink-0 mx-0.5" />
      {typeof children === "function"
        ? children({
            selectedRows,
            selectedIds: Array.from(selectedIds),
            clearSelection,
          })
        : children}
      <div className="w-px h-[16px] bg-current opacity-30 shrink-0 mx-0.5" />
      <button
        type="button"
        onClick={clearSelection}
        title="Clear selection"
        aria-label="Clear selection"
        className="p-1 text-current opacity-80 hover:opacity-100 transition-opacity shrink-0 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function DataTableInfo({ className }: { className?: string }) {
  const { from, to, total } = useDataTable();
  return (
    <div className={cn("text-[13px] text-muted-foreground", className)}>
      Showing <strong className="font-semibold text-foreground">{from}</strong>{" "}
      to <strong className="font-semibold text-foreground">{to}</strong> of{" "}
      <strong className="font-semibold text-foreground">{total}</strong> results
    </div>
  );
}

export function DataTablePagination({ className }: { className?: string }) {
  const { page, setPage, totalPages, theme } = useDataTable();

  const windowSize = Math.min(5, totalPages);
  const start = Math.max(
    1,
    Math.min(page - Math.floor(windowSize / 2), totalPages - windowSize + 1),
  );

  return (
    <div className={cn("flex items-center gap-[3px]", className)}>
      <button
        type="button"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="w-8 h-8 rounded-lg border-[1.5px] border-border bg-background text-foreground/70 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-muted transition-colors"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {Array.from({ length: windowSize }).map((_, i) => {
        const pageNum = start + i;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => setPage(pageNum)}
            aria-current={page === pageNum ? "page" : undefined}
            className={cn(
              "w-8 h-8 rounded-lg text-[13px] font-medium border-[1.5px] flex items-center justify-center transition-all",
              page === pageNum
                ? cn(theme.bg, theme.border, "font-bold")
                : "border-transparent text-foreground/70 hover:bg-muted hover:border-border",
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="w-8 h-8 rounded-lg border-[1.5px] border-border bg-background text-foreground/70 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-muted transition-colors"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

