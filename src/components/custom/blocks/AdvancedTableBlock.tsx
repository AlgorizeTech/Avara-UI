"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Minus, Search, X } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SelectBlock } from "./SelectBlock";
import {
  Table,
  TableBody,
  TableCell,
  TableContent,
  TableEmpty,
  TableExpandToggle,
  TableExpandedRow,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeading,
  TableRow,
  getThemeStyles,
  type TableAlign,
  type TableColor,
  type TableSize,
  type TableVariant,
} from "./TableBlock";

export { getThemeStyles };
export type { TableAlign, TableColor, TableSize, TableVariant };

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
    .reduce<unknown>(
      (acc, key) =>
        acc == null ? acc : (acc as Record<string, unknown>)[key],
      row,
    );
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
  const { theme } = getThemeStyles(color as string);

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

  // Keyed off `selectedIds` only: `getRowId` is usually an inline arrow, so
  // `selectedRows` gets a fresh identity every render and depending on it here
  // would re-fire the callback on every render — an infinite loop for any
  // parent that calls setState in `onSelectionChange`.
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

/**
 * Children receive the current page of rows. Falling back to plain children
 * keeps `useDataTable()` viable for people who want to map rows themselves.
 */
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

// ------------------------------------------
// Selection
// ------------------------------------------
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

// ------------------------------------------
// Expansion
// ------------------------------------------
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

// ------------------------------------------
// Batch actions
// ------------------------------------------
export interface DataTableBatchBarProps {
  /** Receives the selected rows and a way to clear them. */
  children?:
    | ((args: {
        selectedRows: any[];
        selectedIds: (string | number)[];
        clearSelection: () => void;
      }) => React.ReactNode)
    | React.ReactNode;
  /** Floats over the table instead of sitting inline. */
  floating?: boolean;
  className?: string;
}

export function DataTableBatchBar({
  children,
  floating = true,
  className,
}: DataTableBatchBarProps) {
  const { selectedIds, selectedRows, clearSelection } = useDataTable();
  const count = selectedIds.size;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-xl shadow-lg border border-primary-foreground/20 transition-all duration-300 ease-out z-30",
        floating &&
          "absolute left-1/2 -translate-x-1/2 bottom-4 pointer-events-auto",
        count > 0
          ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
          : "opacity-0 pointer-events-none translate-y-2 scale-95",
        className,
      )}
      // Keeps the pill mounted for the transition without leaving hidden
      // buttons in the tab order.
      inert={count === 0}
      aria-hidden={count === 0}
    >
      <span className="text-[11px] sm:text-[12px] font-black whitespace-nowrap pl-0.5">
        {count} selected
      </span>
      <div className="w-px h-[16px] bg-primary-foreground/30 shrink-0 mx-0.5" />
      {typeof children === "function"
        ? children({
            selectedRows,
            selectedIds: Array.from(selectedIds),
            clearSelection,
          })
        : children}
      <div className="w-px h-[16px] bg-primary-foreground/30 shrink-0 mx-0.5" />
      <button
        type="button"
        onClick={clearSelection}
        title="Clear selection"
        aria-label="Clear selection"
        className="p-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ------------------------------------------
// Footer pieces
// ------------------------------------------
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
