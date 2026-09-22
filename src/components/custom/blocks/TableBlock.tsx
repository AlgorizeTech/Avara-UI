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
  Download,
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
import { type Accessor, DataTableContext, type DataTableContextValue, type SortType, TableContext, type TableSize, type TableVariant, getThemeStyles, resolveAccessor, useDataTable, useTableStyles } from "./table-core";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type TableColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type TableAlign = "left" | "center" | "right";

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
    wrapper: "w-full bg-white dark:bg-zinc-950 border rounded-xl shadow-sm overflow-hidden",
    heading: "border-b bg-white dark:bg-zinc-950",
    footer: "border-t bg-white dark:bg-zinc-950",
    headerRow: "bg-zinc-50/80 dark:bg-zinc-900/80 border-b",
    row: "group border-b last:border-0 transition-colors bg-white dark:bg-zinc-950 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60",
    selectedRow: "bg-zinc-100/80 dark:bg-zinc-900",
    expanded: "bg-zinc-50/50 dark:bg-zinc-900/40 border-b",
  },
  minimal: {
    wrapper: "w-full bg-transparent",
    heading: "border-b",
    footer: "border-t",
    headerRow: "border-b-2",
    row: "group border-b last:border-0 transition-colors bg-transparent hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60",
    selectedRow: "bg-zinc-100/80 dark:bg-zinc-900/80",
    expanded: "bg-zinc-50/50 dark:bg-zinc-900/40 border-b",
  },
  glass: {
    wrapper:
      "w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl overflow-hidden",
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
          className={cn(
            "w-full",
            variantClasses[variant].wrapper,
            variant === "default" && (theme.borderSoft || "border-primary/25"),
            className
          )}
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
    const { variant, size, theme } = useTableStyles();
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-between gap-3",
          sizeClasses[size].bar,
          variantClasses[variant].heading,
          (variant === "default" || variant === "minimal") && (theme.borderSoft || "border-primary/12"),
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
    const { variant, theme } = useTableStyles();
    const skin = variantClasses[variant];
    return (
      <tr
        ref={ref}
        data-selected={selected || undefined}
        className={cn(
          isHeader ? skin.headerRow : skin.row,
          (variant === "default" || variant === "minimal") && (theme.borderSoft || "border-primary/12"),
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
  const { variant, size, theme } = useTableStyles();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-center sm:text-left w-full",
        sizeClasses[size].bar,
        variantClasses[variant].footer,
        (variant === "default" || variant === "minimal") && (theme.borderSoft || "border-primary/12"),
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
/** The id fields a row is checked for, in order. */
type RowWithId = {
  id?: string | number;
  _id?: string | number;
  uuid?: string | number;
  key?: string | number;
};

function defaultGetRowId<T>(row: T): string | number {
  const candidate = row as RowWithId | null | undefined;
  return (
    candidate?.id ?? candidate?._id ?? candidate?.uuid ?? candidate?.key ?? ""
  );
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
  const [pageState, setPage] = useState(1);
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
  // The row count can shrink under the current page — a filter, a bigger
  // page size. Read it clamped rather than correcting it afterwards.
  const page = Math.min(pageState, totalPages);
  const rows = useMemo(
    () => filteredRows.slice((page - 1) * pageSize, page * pageSize),
    [filteredRows, page, pageSize],
  );

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
  const selectedRowsRef = React.useRef(selectedRows);
  React.useEffect(() => {
    selectionCallbackRef.current = onSelectionChange;
    selectedRowsRef.current = selectedRows;
  });

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
        className={cn("relative w-full", className)}
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
  const { search, setSearch, theme, themeStyle } = useDataTable();
  return (
    <div className={cn("relative w-full sm:w-[260px]", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        ref={ref}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        style={themeStyle}
        className={cn(
          "w-full h-9 pl-9 pr-3 py-1.5 text-[13px] bg-white dark:bg-zinc-950 text-foreground border rounded-lg outline-none transition-all shadow-sm focus:border-primary",
          theme.borderSoft || "border-border",
          theme.hoverBorder,
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
  className?: string;
}

export const DataTablePageSize = forwardRef<
  HTMLDivElement,
  DataTablePageSizeProps
>(({ label = "Show", suffix = "Entries", className }, ref) => {
  const { pageSize, setPageSize, pageSizeOptions, theme, themeStyle } =
    useDataTable();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 text-[13px] text-muted-foreground",
        className,
      )}
    >
      {label && <span className="font-medium text-foreground/80">{label}</span>}
      <div ref={containerRef} className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={themeStyle}
          className={cn(
            "h-9 pl-3 pr-2.5 text-xs font-semibold bg-white dark:bg-zinc-950 text-foreground border rounded-lg flex items-center gap-2 outline-none cursor-pointer transition-all shadow-sm",
            theme.borderSoft || "border-border",
            theme.hoverBorder,
            theme.focusRing,
            isOpen && "border-primary",
          )}
        >
          <span>{pageSize}</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180 text-primary",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-1.5 min-w-[70px] rounded-xl border border-border bg-white dark:bg-zinc-950 text-popover-foreground shadow-lg ring-1 ring-black/5 z-50 py-1 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100">
            {pageSizeOptions.map((opt) => {
              const isSelected = pageSize === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setPageSize(opt);
                    setIsOpen(false);
                  }}
                  style={isSelected ? themeStyle : undefined}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium transition-colors text-left cursor-pointer",
                    isSelected
                      ? cn(theme.bgSoft, theme.text, "font-semibold")
                      : cn("hover:bg-muted text-foreground/80", theme.hoverBgSoft),
                  )}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {suffix && <span className="font-medium text-foreground/80">{suffix}</span>}
    </div>
  );
});
DataTablePageSize.displayName = "DataTablePageSize";

export interface DataTableExportProps<T = unknown> {
  filename?: string;
  formats?: ("csv" | "xlsx" | "json")[];
  /** Custom data formatter before export. If not provided, raw row objects are exported. */
  formatData?: (rows: T[]) => Record<string, unknown>[];
  color?: TableColor;
  className?: string;
}

export function DataTableExport<T = unknown>({
  filename = "export",
  formats = ["csv", "xlsx"],
  formatData,
  color,
  className,
}: DataTableExportProps<T>) {
  const { filteredRows, selectedRows, theme: defaultTheme, themeStyle: defaultStyle } = useDataTable<T>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, style } = color ? getThemeStyles(color as string) : { theme: defaultTheme, style: defaultStyle };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getExportableData = (): Record<string, unknown>[] => {
    const source = selectedRows.length > 0 ? selectedRows : filteredRows;
    if (formatData) return formatData(source);
    return source.map((row) => {
      if (typeof row === "object" && row !== null) {
        const cleanRow: Record<string, unknown> = {};
        Object.entries(row as Record<string, unknown>).forEach(([key, val]) => {
          if (typeof val !== "function" && typeof val !== "symbol") {
            cleanRow[key] = typeof val === "object" && val !== null ? JSON.stringify(val) : val;
          }
        });
        return cleanRow;
      }
      return { value: row };
    });
  };

  const exportCSV = () => {
    const data = getExportableData();
    if (data.length === 0) return;

    const headers = Array.from(new Set(data.flatMap((item) => Object.keys(item))));
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            const val = row[fieldName] ?? "";
            const escaped = String(val).replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(","),
      ),
    ];

    const blob = new Blob(["\uFEFF" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportXLSX = () => {
    const data = getExportableData();
    if (data.length === 0) return;

    const headers = Array.from(new Set(data.flatMap((item) => Object.keys(item))));
    const xmlHeader = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Sheet1">
<Table>`;

    const xmlFooter = `</Table></Worksheet></Workbook>`;

    const headerRowXml = `<Row>${headers
      .map((h) => `<Cell><Data ss:Type="String">${String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Data></Cell>`)
      .join("")}</Row>`;

    const dataRowsXml = data
      .map(
        (row) =>
          `<Row>${headers
            .map((h) => {
              const val = row[h] ?? "";
              const isNum = typeof val === "number";
              const escapedVal = String(val)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
              return `<Cell><Data ss:Type="${isNum ? "Number" : "String"}">${escapedVal}</Data></Cell>`;
            })
            .join("")}</Row>`,
      )
      .join("");

    const excelXml = xmlHeader + headerRowXml + dataRowsXml + xmlFooter;

    const blob = new Blob([excelXml], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportJSON = () => {
    const data = getExportableData();
    if (data.length === 0) return;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const isSelectedOnly = selectedRows.length > 0;
  const count = isSelectedOnly ? selectedRows.length : filteredRows.length;

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={count === 0}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={style}
        className={cn(
          "inline-flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-lg border bg-white dark:bg-zinc-950 text-foreground transition-all duration-150 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
          theme.borderSoft || "border-border",
          theme.hoverBorder,
          theme.focusRing,
        )}
      >
        <Download className="w-3.5 h-3.5 text-muted-foreground" />
        <span>Export</span>
        {isSelectedOnly && (
          <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
            {count}
          </span>
        )}
        <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5 z-50 py-1 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50">
            {isSelectedOnly ? `Export ${count} Selected` : `Export All (${count})`}
          </div>
          {formats.includes("csv") && (
            <button
              type="button"
              onClick={exportCSV}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer hover:bg-muted text-foreground/80",
                theme.hoverBgSoft,
              )}
            >
              <span>Export CSV</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase">.csv</span>
            </button>
          )}
          {(formats.includes("xlsx") || formats.includes("xls" as never)) && (
            <button
              type="button"
              onClick={exportXLSX}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer hover:bg-muted text-foreground/80",
                theme.hoverBgSoft,
              )}
            >
              <span>Export Excel</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase">.xlsx</span>
            </button>
          )}
          {formats.includes("json") && (
            <button
              type="button"
              onClick={exportJSON}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer hover:bg-muted text-foreground/80",
                theme.hoverBgSoft,
              )}
            >
              <span>Export JSON</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase">.json</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export interface DataTableBodyProps<T = unknown>
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

export const DataTableBody = DataTableBodyImpl as <T = unknown>(
  props: DataTableBodyProps<T>,
) => React.ReactElement | null;

export interface DataTableRowProps<T = unknown>
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
    rowIdProp ??
    (row !== undefined ? getRowId(row) : (undefined as unknown as string | number));

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

export const DataTableRow = DataTableRowImpl as <T = unknown>(
  props: DataTableRowProps<T>,
) => React.ReactElement | null;

export interface DataTableHeadProps<T = unknown>
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

export const DataTableHead = DataTableHeadImpl as <T = unknown>(
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
        active ? cn(theme.bg, theme.border) : cn("bg-background", theme.borderSoft || "border-border"),
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

export interface DataTableBatchBarProps<T = unknown> {
  /** Receives the selected rows and a way to clear them. */
  children?:
    | ((args: {
        selectedRows: T[];
        selectedIds: (string | number)[];
        clearSelection: () => void;
      }) => React.ReactNode)
    | React.ReactNode;
  floating?: boolean;
  className?: string;
}

export function DataTableBatchBar<T = unknown>({
  children,
  floating = true,
  className,
}: DataTableBatchBarProps<T>) {
  const { selectedIds, selectedRows, clearSelection, theme, themeStyle } =
    useDataTable<T>();
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
      <span className="text-[11px] sm:text-[12px] font-bold whitespace-nowrap pl-0.5">
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
  const { page, setPage, totalPages, theme, themeStyle } = useDataTable();

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
        const isActive = page === pageNum;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => setPage(pageNum)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? themeStyle : undefined}
            className={cn(
              "w-8 h-8 rounded-lg text-[13px] font-medium border-[1.5px] flex items-center justify-center transition-all",
              isActive
                ? cn(theme.bg, theme.border, "font-semibold")
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

