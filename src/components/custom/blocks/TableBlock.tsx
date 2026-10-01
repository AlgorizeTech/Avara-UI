"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Download,
  Minus,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { type Accessor, DataTableContext, type DataTableContextValue, type SortType, TableContext, type TableSize, type TableVariant, getAccentColor, getThemeStyles, resolveAccessor, useDataTable, useTableStyles } from "./table-core";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";

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

// `soft` rows breathe a little more and indent the outer columns on wide
// screens, so the first and last cells line up with the toolbar above.
const softSizeClasses: Record<TableSize, { th: string; td: string; bar: string }> = {
  sm: {
    th: "px-3 py-2 text-[10px]",
    td: "px-3 py-2.5 text-xs",
    bar: "px-3 py-2.5",
  },
  md: {
    th: "px-4 py-3 text-[11px] lg:first:pl-6 lg:last:pr-6",
    td: "px-4 py-3.5 text-sm lg:first:pl-6 lg:last:pr-6",
    bar: "px-4 py-3.5 lg:px-6",
  },
  lg: {
    th: "px-6 py-3.5 text-[11px]",
    td: "px-6 py-4 text-base",
    bar: "px-6 py-4",
  },
};

const sizesFor = (variant: TableVariant) =>
  variant === "soft" ? softSizeClasses : sizeClasses;

/**
 * The `soft` variant's tints, mixed from the table colour on the wrapper so
 * every part reads them: the well (header band, search, filters), the row
 * hover and selected washes, and the tint an applied filter takes.
 */
const softTokens = (color: string) =>
  ({
    "--tbl-accent": getAccentColor(color),
    "--tbl-well":
      "color-mix(in oklab, var(--tbl-accent) 5%, color-mix(in oklab, var(--foreground) 5%, var(--card)))",
    "--tbl-row-hover": "color-mix(in oklab, var(--tbl-accent) 4%, var(--card))",
    "--tbl-row-selected":
      "color-mix(in oklab, var(--tbl-accent) 8%, var(--card))",
    "--tbl-tint": "color-mix(in oklab, var(--tbl-accent) 10%, var(--card))",
    "--tbl-accent-ink":
      "color-mix(in oklab, var(--tbl-accent) 78%, var(--foreground))",
  }) as React.CSSProperties;

// Outside a `soft` table these fall back to the theme's muted surface, so
// the shared parts (row actions, badges, empty states) work in every variant.
const WELL = "bg-[var(--tbl-well,var(--muted))]";
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--tbl-accent,var(--primary))_60%,transparent)]";

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
    wrapper: "w-full bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden",
    heading: "border-b bg-card",
    footer: "border-t bg-card",
    headerRow: "bg-muted/80 border-b",
    row: "group border-b last:border-0 transition-colors bg-card hover:bg-muted/60",
    selectedRow: "bg-muted",
    expanded: "bg-muted/50 border-b",
  },
  minimal: {
    wrapper: "w-full bg-transparent",
    heading: "border-b",
    footer: "border-t",
    headerRow: "border-b-2",
    row: "group border-b last:border-0 transition-colors bg-transparent hover:bg-muted/60",
    selectedRow: "bg-muted/80",
    expanded: "bg-muted/50 border-b",
  },
  glass: {
    wrapper:
      "w-full bg-card/40 text-card-foreground backdrop-blur-xl border border-foreground/10 rounded-xl shadow-xl overflow-hidden",
    heading: "border-b border-foreground/10",
    footer: "border-t border-foreground/10",
    headerRow:
      "bg-foreground/[0.04] border-b border-foreground/10",
    row: "group border-b border-foreground/5 last:border-0 transition-colors hover:bg-foreground/5",
    selectedRow: "bg-foreground/10",
    expanded:
      "bg-foreground/5 border-b border-foreground/5",
  },
  // Separate borders: the dividers live on the cells, so a sticky cell paints
  // its own. The wrapper does not clip, so filter and page-size menus can
  // open past its edge; the scroll area rounds itself instead.
  soft: {
    wrapper:
      "relative w-full rounded-[20px] bg-card text-card-foreground ring-1 ring-foreground/[0.08] shadow-[0_1px_2px_rgb(16_24_40/0.04),0_16px_32px_-20px_rgb(16_24_40/0.14)] dark:shadow-none",
    heading: "border-b border-foreground/[0.08]",
    footer: "border-t border-foreground/[0.08]",
    // The band is painted on the cells, not the row, so fractional column
    // widths never show seams in it.
    headerRow:
      "[&>*]:bg-[var(--tbl-well)] [&>*]:border-b [&>*]:border-foreground/[0.08]",
    // Dividers sit on top of each row (none on the first), so the last row
    // never doubles the footer's line — even when hidden detail rows follow it.
    row: "group transition-colors duration-150 hover:bg-[var(--tbl-row-hover)] [&>*]:border-t [&>*]:border-foreground/[0.08] [&:first-child>*]:border-t-0",
    selectedRow: "bg-[var(--tbl-row-selected)] hover:bg-[var(--tbl-row-selected)]",
    // An open detail row reads as part of the row above it: no divider between.
    expanded: "bg-[color-mix(in_oklab,var(--tbl-well)_60%,var(--card))]",
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
      style: styleProp,
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
          style={{
            ...style,
            ...(variant === "soft" ? softTokens(color as string) : null),
            ...styleProp,
          }}
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
          sizesFor(variant)[size].bar,
          variantClasses[variant].heading,
          (variant === "default" || variant === "minimal") && (theme.borderSoft || "border-primary/12"),
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3
                className={cn(
                  "text-base lg:text-lg text-foreground",
                  variant === "soft"
                    ? "font-medium tracking-[-0.01em]"
                    : "font-semibold tracking-tight",
                )}
              >
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
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableStyles();
  const soft = variant === "soft";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState(false);

  // While more table hides past the right edge, a pinned (`sticky`) column
  // casts a shadow over it.
  useEffect(() => {
    const element = scrollRef.current;
    if (!soft || !element) return;
    const update = () => {
      const hidden =
        element.scrollWidth - element.clientWidth - element.scrollLeft > 1;
      setEdge((previous) => (previous === hidden ? previous : hidden));
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [soft]);

  if (!soft) {
    return (
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
    );
  }

  return (
    <div
      ref={scrollRef}
      data-edge={edge || undefined}
      className="group/scroll w-full [overflow-x:auto] [scrollbar-width:thin] [scrollbar-color:color-mix(in_oklab,var(--foreground)_12%,transparent)_transparent] first:rounded-t-[20px] last:rounded-b-[20px]"
    >
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom border-separate border-spacing-0 text-left",
          className,
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});
TableContent.displayName = "TableContent";

// A pinned column keeps its own background (a row's tint cannot show through
// a sticky cell) and follows the row's hover and selected washes.
const stickyHead: Record<TableVariant, string> = {
  default: "sticky right-0 z-[1] bg-muted",
  minimal: "sticky right-0 z-[1] bg-background",
  glass: "sticky right-0 z-[1] bg-card",
  soft: "sticky right-0 z-[1] bg-[var(--tbl-well)] group-data-[edge=true]/scroll:shadow-[-10px_0_18px_-8px_rgb(15_23_42/0.2)] dark:group-data-[edge=true]/scroll:shadow-[-10px_0_18px_-8px_rgb(0_0_0/0.55)]",
};
const stickyCell: Record<TableVariant, string> = {
  default:
    "sticky right-0 z-[1] bg-card group-hover:bg-[color-mix(in_oklab,var(--muted)_60%,var(--card))] group-data-[selected=true]:bg-muted",
  minimal: "sticky right-0 z-[1] bg-background",
  glass: "sticky right-0 z-[1] bg-card",
  soft: "sticky right-0 z-[1] bg-card group-hover:bg-[var(--tbl-row-hover)] group-data-[selected=true]:bg-[var(--tbl-row-selected)] group-data-[edge=true]/scroll:shadow-[-10px_0_18px_-8px_rgb(15_23_42/0.2)] dark:group-data-[edge=true]/scroll:shadow-[-10px_0_18px_-8px_rgb(0_0_0/0.55)]",
};

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
  /** Staggered entrance for direct child rows. */
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
      const rows = innerRef.current.querySelectorAll<HTMLTableRowElement>(
        ":scope > tr",
      );
      if (!rows.length) return;
      // `backwards` holds each row hidden through its stagger delay. The
      // animation never writes the row's own style, and cancelling it (a new
      // key mid-stagger, unmount) drops every row straight back to rest.
      const animations = Array.from(rows, (row, index) =>
        row.animate(
          [
            { opacity: 0, transform: "translateY(15px)" },
            { opacity: 1, transform: "translateY(0px)" },
          ],
          {
            duration: 400,
            delay: index * 50,
            // power2.out, exact
            easing: "cubic-bezier(0.3333, 1, 0.6667, 1)",
            fill: "backwards",
          },
        ),
      );
      return () => {
        animations.forEach((animation) => animation.cancel());
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
  /** Pin the column to the right edge (pair it with `sticky` on its cells). */
  sticky?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      align = "left",
      sortable = false,
      sortDirection = null,
      onSort,
      sticky = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { variant, size } = useTableStyles();

    if (variant === "soft") {
      const SortIcon =
        sortDirection === "asc"
          ? ArrowUp
          : sortDirection === "desc"
            ? ArrowDown
            : ChevronsUpDown;
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
            softSizeClasses[size].th,
            "whitespace-nowrap font-medium uppercase tracking-[0.06em] text-muted-foreground select-none",
            alignClasses[align],
            sticky && stickyHead.soft,
            className,
          )}
          {...props}
        >
          {sortable ? (
            <button
              type="button"
              onClick={onSort}
              className={cn(
                "group/sort -mx-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-1 font-medium uppercase tracking-[0.06em] transition-colors hover:text-foreground",
                FOCUS_RING,
                sortDirection && "text-foreground",
                align === "right" && "flex-row-reverse",
              )}
            >
              <span>{children}</span>
              <SortIcon
                aria-hidden="true"
                className={cn(
                  "size-3.5 shrink-0 transition-opacity",
                  sortDirection
                    ? "text-[var(--tbl-accent-ink)]"
                    : "opacity-40 group-hover/sort:opacity-100",
                )}
              />
            </button>
          ) : (
            children
          )}
        </th>
      );
    }

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
          sticky && stickyHead[variant],
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
  /** Pin the cell to the right edge, e.g. a row-actions column. */
  sticky?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "left", sticky = false, className, children, ...props }, ref) => {
    const { variant, size } = useTableStyles();
    return (
      <td
        ref={ref}
        className={cn(
          sizesFor(variant)[size].td,
          "align-middle",
          variant === "soft" ? "text-foreground" : "text-foreground/80",
          alignClasses[align],
          sticky && stickyCell[variant],
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
        variant === "soft"
          ? // Controls first on phones (where a thumb reaches), the count under them.
            "flex flex-col-reverse items-center justify-between gap-4 text-center md:flex-row md:text-left w-full"
          : "flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-center sm:text-left w-full",
        sizesFor(variant)[size].bar,
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

/** `title` is widened to ReactNode, so the DOM `title` attribute is omitted. */
export interface TableEmptyProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "title"> {
  colSpan: number;
  /** An icon shown in a round chip above the title. */
  icon?: React.ReactNode;
  /** What is missing — "No users match “ana”". Switches to the full empty state. */
  title?: React.ReactNode;
  /** What to do about it. */
  description?: React.ReactNode;
  /** A button under the copy, e.g. "Clear search". */
  action?: React.ReactNode;
}

export const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(
  (
    { colSpan, icon, title, description, action, className, children, ...props },
    ref,
  ) => {
    const { variant } = useTableStyles();
    // Plain message: the original one-line empty row.
    if (!title && !icon) {
      return (
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
      );
    }
    return (
      <tr>
        <td
          ref={ref}
          colSpan={colSpan}
          className={cn("p-0", variant === "soft" && "border-0", className)}
          {...props}
        >
          <div
            role="status"
            className="flex min-h-72 flex-col items-center justify-center px-6 py-14 text-center"
          >
            {icon && (
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-full text-muted-foreground [&_svg]:size-5",
                  WELL,
                )}
              >
                {icon}
              </span>
            )}
            {title && (
              <p className="mt-4 text-[15px] font-medium text-foreground">
                {title}
              </p>
            )}
            {description && (
              <p className="mt-1 max-w-[44ch] text-pretty text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
            {children}
            {action && <div className="mt-5">{action}</div>}
          </div>
        </td>
      </tr>
    );
  },
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
>(({ open = false, className, ...props }, ref) => {
  const { variant } = useTableStyles();
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-label={open ? "Collapse row" : "Expand row"}
      className={cn(
        variant === "soft"
          ? cn(
              "grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-[var(--tbl-well)] hover:text-foreground",
              FOCUS_RING,
              open && "bg-[var(--tbl-well)] text-foreground",
            )
          : "p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors",
        className,
      )}
      {...props}
    >
      <ChevronRight
        aria-hidden="true"
        className={cn(
          "w-4 h-4 transition-transform duration-200 motion-reduce:transition-none",
          open && "rotate-90",
        )}
      />
    </button>
  );
});
TableExpandToggle.displayName = "TableExpandToggle";

export interface TableRowActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: TableAlign;
  /**
   * Keep actions visible instead of revealing them on row hover. Defaults to
   * visible in the `soft` variant (where they are calm round icons) and to
   * hover-reveal everywhere else.
   */
  alwaysVisible?: boolean;
}

export const TableRowActions = forwardRef<HTMLDivElement, TableRowActionsProps>(
  ({ align = "right", alwaysVisible, className, children, ...props }, ref) => {
    const { variant } = useTableStyles();
    const visible = alwaysVisible ?? variant === "soft";
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center transition-opacity duration-200",
          variant === "soft" ? "gap-0.5" : "gap-1",
          alignFlex[align],
          !visible &&
            "opacity-0 group-hover:opacity-100 focus-within:opacity-100",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TableRowActions.displayName = "TableRowActions";

export interface TableRowActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: the accessible name and the hover title of an icon-only button. */
  label: string;
  /** `danger` turns red on hover — keep it for destructive actions. */
  tone?: "default" | "danger";
}

/** A round icon button for a row action (edit, delete…). Pass the icon as children. */
export const TableRowAction = forwardRef<HTMLButtonElement, TableRowActionProps>(
  ({ label, tone = "default", type = "button", className, children, ...props }, ref) => {
    const { variant } = useTableStyles();
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={cn(
          "grid shrink-0 place-items-center text-muted-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-4",
          FOCUS_RING,
          variant === "soft" ? "size-9 rounded-full" : "size-8 rounded-md",
          tone === "danger"
            ? "hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
            : "hover:bg-[var(--tbl-well,var(--muted))] hover:text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TableRowAction.displayName = "TableRowAction";

export interface TableActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` for the panel's main action ("Add user"), `secondary` beside it, `ghost` for quiet ones. */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

/**
 * A toolbar button that matches the table — a pill in the `soft` variant.
 * Icons passed as children are sized for you.
 */
export const TableAction = forwardRef<HTMLButtonElement, TableActionProps>(
  (
    { variant = "secondary", size = "md", type = "button", className, children, ...props },
    ref,
  ) => {
    const { variant: tableVariant, theme } = useTableStyles();
    const soft = tableVariant === "soft";
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-medium transition-[background-color,color,filter] duration-150 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0",
          FOCUS_RING,
          soft
            ? size === "md"
              ? "h-10 gap-2 rounded-full px-5 text-sm [&_svg]:size-4"
              : "h-8 gap-1.5 rounded-full px-3.5 text-[13px] [&_svg]:size-3.5"
            : size === "md"
              ? "h-9 gap-1.5 rounded-lg px-3.5 text-[13px] [&_svg]:size-4"
              : "h-8 gap-1.5 rounded-lg px-3 text-xs [&_svg]:size-3.5",
          variant === "primary" && cn(theme.bg, "shadow-sm hover:brightness-110"),
          variant === "secondary" &&
            "bg-[var(--tbl-well,var(--muted))] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_7%,var(--tbl-well,var(--muted)))]",
          variant === "ghost" &&
            "text-muted-foreground hover:bg-[var(--tbl-well,var(--muted))] hover:text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TableAction.displayName = "TableAction";

export type TableBadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const badgeTones: Record<TableBadgeTone, string> = {
  neutral: "bg-[var(--tbl-well,var(--muted))] text-foreground/75",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-500/[0.12] text-amber-700 dark:text-amber-400",
  danger: "bg-red-500/10 text-red-700 dark:text-red-400",
  info: "bg-[var(--tbl-tint,color-mix(in_oklab,var(--primary)_12%,transparent))] text-[var(--tbl-accent-ink,var(--primary))]",
};

export interface TableBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TableBadgeTone;
  /** A dot before the label, for statuses. Turn it off for plain tags. */
  dot?: boolean;
}

/** A status pill (dot + label) or, with `dot={false}`, a tag. The label always shows, so colour is never the only signal. */
export const TableBadge = forwardRef<HTMLSpanElement, TableBadgeProps>(
  ({ tone = "neutral", dot = true, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex h-6 max-w-40 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium leading-none",
        badgeTones[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
      )}
      <span className="truncate">{children}</span>
    </span>
  ),
);
TableBadge.displayName = "TableBadge";

// Initials take one of four hues by a hash of the name, so a person keeps
// the same colour on every page; the tints mix with the card for both modes.
const AVATAR_HUES = ["#6356d1", "#e87ba4", "#eda100", "#1baf7a"];

const hueFor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_HUES[hash % AVATAR_HUES.length] ?? "#6356d1";
};

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

export interface TablePersonProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** A muted second line — an email, a team. */
  description?: React.ReactNode;
  /** A photo. Without one (or if it fails to load) the initials show. */
  src?: string;
  /** Renders the photo, e.g. `next/image`. Receives src, alt, width, height. */
  imageComponent?: React.ElementType;
}

/** Avatar (photo or initials), a name and a muted second line. */
export const TablePerson = forwardRef<HTMLDivElement, TablePersonProps>(
  (
    { name, description, src, imageComponent: Image = "img", className, ...props },
    ref,
  ) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const showImage = Boolean(src) && failedSrc !== src;
    const hue = hueFor(name);
    return (
      <div
        ref={ref}
        className={cn("flex min-w-0 items-center gap-3", className)}
        {...props}
      >
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 select-none place-items-center overflow-hidden rounded-full text-xs font-medium"
          style={
            showImage
              ? undefined
              : {
                  backgroundColor: `color-mix(in oklab, ${hue} 16%, var(--card))`,
                  color: `color-mix(in oklab, ${hue} 72%, var(--foreground))`,
                }
          }
        >
          {showImage ? (
            <Image
              src={src}
              alt=""
              width={36}
              height={36}
              loading="lazy"
              className="size-full object-cover"
              onError={() => setFailedSrc(src ?? null)}
            />
          ) : (
            initialsOf(name)
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium leading-5 text-foreground" title={name}>
            {name}
          </p>
          {description && (
            <p className="truncate text-[13px] leading-5 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);
TablePerson.displayName = "TablePerson";

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

/** A filter value matches a field exactly, or any entry of an array field (tags). */
function matchesFilter(field: unknown, value: string): boolean {
  if (Array.isArray(field)) return field.some((entry) => String(entry) === value);
  return String(field ?? "") === value;
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
  const [filterState, setFilterState] = useState<
    Record<string, { value: string; accessor: Accessor<T> }>
  >({});

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

  // 2. Filters (tabs and filter pills), each an exact match on its accessor
  const applyFilters = useCallback(
    (
      rows: T[],
      except?: string,
      extra?: { accessor: Accessor<T>; value: string } | null,
    ) => {
      const active = Object.entries(filterState).filter(([id]) => id !== except);
      if (!active.length && !extra) return rows;
      return rows.filter(
        (row) =>
          active.every(([, filter]) =>
            matchesFilter(resolveAccessor(row, filter.accessor), filter.value),
          ) &&
          (!extra || matchesFilter(resolveAccessor(row, extra.accessor), extra.value)),
      );
    },
    [filterState],
  );

  const narrowedRows = useMemo(
    () => applyFilters(searchedRows),
    [applyFilters, searchedRows],
  );

  // 3. Sort
  const filteredRows = useMemo(() => {
    if (!sort) return narrowedRows;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...narrowedRows].sort(
      (a, b) =>
        factor *
        compareValues(
          resolveAccessor(a, sort.accessor),
          resolveAccessor(b, sort.accessor),
          sort.type,
        ),
    );
  }, [narrowedRows, sort]);

  // 4. Paginate
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

  const setFilter = useCallback(
    (id: string, accessor: Accessor<T>, value: string | null) => {
      setFilterState((prev) => {
        if (value === null) {
          if (!(id in prev)) return prev;
          const next = { ...prev };
          delete next[id];
          return next;
        }
        return { ...prev, [id]: { value, accessor } };
      });
      setPage(1);
    },
    [],
  );

  const countFor = useCallback(
    (id: string, accessor: Accessor<T>, value: string | null) =>
      applyFilters(searchedRows, id, value === null ? null : { accessor, value })
        .length,
    [applyFilters, searchedRows],
  );

  const filters = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(filterState).map(([id, filter]) => [id, filter.value]),
      ),
    [filterState],
  );

  const resetAll = useCallback(() => {
    setSearchState("");
    setFilterState({});
    setSort(null);
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
    filters,
    setFilter,
    countFor,
    isFiltered: search.trim() !== "" || Object.keys(filterState).length > 0,
    resetAll,
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
/**
 * In the `soft` variant the toolbar is the panel's top band (padded, with a
 * hairline under it) and simply wraps its children — arrange them with your
 * own groups. Elsewhere it is a bare row to place inside `DataTableHeading`.
 */
export const DataTableToolbar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { variant, size } = useTableStyles();
  return (
    <div
      ref={ref}
      className={cn(
        variant === "soft"
          ? cn(
              "flex w-full flex-wrap items-center gap-x-4 gap-y-3 border-b border-foreground/[0.08]",
              softSizeClasses[size].bar,
            )
          : "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DataTableToolbar.displayName = "DataTableToolbar";

// ------------------------------------------
// Menus (page size, filters): a listbox under or over a trigger. Arrow keys
// move between options, Escape closes and returns focus to the trigger.
// ------------------------------------------
function useMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    const list = listRef.current;
    const target =
      list?.querySelector<HTMLElement>('[aria-selected="true"]') ??
      list?.querySelector<HTMLElement>('[role="option"]');
    target?.focus({ preventScroll: true });
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );
    const index = options.indexOf(document.activeElement as HTMLElement);
    const move = (to: number) => {
      event.preventDefault();
      options[Math.max(0, Math.min(options.length - 1, to))]?.focus();
    };
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") move(index + 1);
    else if (event.key === "ArrowUp") move(index - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(options.length - 1);
    else if (event.key === "Tab") setOpen(false);
  };

  return { open, setOpen, rootRef, triggerRef, listRef, close, onListKeyDown };
}

const SOFT_MENU =
  "absolute z-50 w-max min-w-full max-w-64 rounded-2xl bg-card p-1 text-foreground shadow-xl ring-1 ring-foreground/[0.08]";
const SOFT_OPTION =
  "flex h-9 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-left text-sm outline-none transition-colors hover:bg-[var(--tbl-well)] focus-visible:bg-[var(--tbl-well)]";
// The pill every soft control shares (search, filter, page size, export).
const SOFT_PILL =
  "bg-[var(--tbl-well)] text-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_6%,var(--tbl-well))]";
const SOFT_PILL_ACTIVE =
  "bg-[var(--tbl-tint)] text-[var(--tbl-accent-ink)] ring-1 ring-inset ring-[color-mix(in_oklab,var(--tbl-accent)_30%,transparent)] hover:bg-[color-mix(in_oklab,var(--tbl-accent)_14%,var(--card))]";

export interface TableSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  /** Controlled — you own the search text. */
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

/**
 * A search field in the table's look — a pill with a clear button in the
 * `soft` variant. Controlled, for the plain primitives; inside `DataTable`
 * use `DataTableSearch`, which wires itself up.
 */
export const TableSearch = forwardRef<HTMLInputElement, TableSearchProps>(
  ({ value, onValueChange, placeholder = "Search…", className, ...props }, ref) => {
    const { variant, theme } = useTableStyles();

    if (variant === "soft") {
      // Its own row on phones; from `sm` it shares the row and grows, up to 24rem.
      return (
        <div
          className={cn(
            "relative min-w-48 flex-1 basis-full sm:basis-auto md:max-w-sm",
            className,
          )}
        >
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={ref}
            type="search"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="h-10 w-full rounded-full border-0 bg-[var(--tbl-well)] pl-10 pr-9 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:bg-card focus:ring-2 focus:ring-[color-mix(in_oklab,var(--tbl-accent)_50%,transparent)] [&::-webkit-search-cancel-button]:appearance-none"
            {...props}
          />
          {value && (
            <button
              type="button"
              onClick={() => onValueChange("")}
              aria-label="Clear search"
              className={cn(
                "absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
                FOCUS_RING,
              )}
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      );
    }

    return (
      <div className={cn("relative w-full sm:w-[260px]", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-9 pl-9 pr-3 py-1.5 text-[13px] bg-background text-foreground border rounded-lg outline-none transition-all shadow-sm focus:border-primary/30",
            theme.borderSoft || "border-border",
            theme.hoverBorder,
            theme.focusRing,
          )}
          {...props}
        />
      </div>
    );
  },
);
TableSearch.displayName = "TableSearch";

export type DataTableSearchProps = Omit<TableSearchProps, "value" | "onValueChange">;

/** `TableSearch` wired to the DataTable's search. */
export const DataTableSearch = forwardRef<
  HTMLInputElement,
  DataTableSearchProps
>((props, ref) => {
  const { search, setSearch } = useDataTable();
  return <TableSearch ref={ref} value={search} onValueChange={setSearch} {...props} />;
});
DataTableSearch.displayName = "DataTableSearch";

export interface DataTablePageSizeProps {
  label?: string;
  suffix?: string;
  className?: string;
  /**
   * Which way the menu opens. Defaults to `top` in the `soft` variant, where
   * the picker sits in the footer, and to `bottom` elsewhere.
   */
  side?: "top" | "bottom";
}

export const DataTablePageSize = forwardRef<
  HTMLDivElement,
  DataTablePageSizeProps
>(({ label = "Show", suffix = "Entries", className, side }, ref) => {
  const { pageSize, setPageSize, pageSizeOptions, theme, themeStyle } =
    useDataTable();
  const { variant } = useTableStyles();
  const {
    open: menuOpen,
    setOpen: setMenuOpen,
    rootRef: menuRootRef,
    triggerRef: menuTriggerRef,
    listRef: menuListRef,
    close: closeMenu,
    onListKeyDown: onMenuKeyDown,
  } = useMenu();
  const listId = useId();
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

  if (variant === "soft") {
    const opensUp = (side ?? "top") === "top";
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
      >
        {label && <span className="hidden whitespace-nowrap sm:inline">{label}</span>}
        <div ref={menuRootRef} className="relative">
          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? listId : undefined}
            aria-label={label ? `${label}: ${pageSize}` : `Rows per page: ${pageSize}`}
            className={cn(
              "flex h-9 min-w-[4.75rem] items-center justify-between gap-1 rounded-full pl-3.5 pr-2 text-sm tabular-nums",
              SOFT_PILL,
              FOCUS_RING,
            )}
          >
            <span>{pageSize}</span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                menuOpen && "rotate-180",
              )}
            />
          </button>
          {menuOpen && (
            <div
              ref={menuListRef}
              id={listId}
              role="listbox"
              aria-label={label || "Rows per page"}
              onKeyDown={onMenuKeyDown}
              className={cn(SOFT_MENU, "left-0", opensUp ? "bottom-full mb-2" : "top-full mt-2")}
            >
              {pageSizeOptions.map((option) => {
                const selected = pageSize === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setPageSize(option);
                      closeMenu();
                    }}
                    className={cn(
                      SOFT_OPTION,
                      "tabular-nums",
                      selected && "font-medium text-[var(--tbl-accent-ink)]",
                    )}
                  >
                    {option}
                    {selected && <Check aria-hidden="true" className="size-4" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {suffix && <span className="hidden whitespace-nowrap sm:inline">{suffix}</span>}
      </div>
    );
  }

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
            "h-9 pl-3 pr-2.5 text-xs font-semibold bg-background text-foreground border rounded-lg flex items-center gap-2 outline-none cursor-pointer transition-all shadow-sm",
            theme.borderSoft || "border-border",
            theme.hoverBorder,
            theme.focusRing,
            isOpen && "border-primary/30",
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
          <div className="absolute left-0 mt-1.5 min-w-[70px] rounded-xl border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5 z-50 py-1 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100">
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
  const soft = useTableStyles().variant === "soft";
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
          soft
            ? cn(
                "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40",
                SOFT_PILL,
                FOCUS_RING,
              )
            : cn(
                "inline-flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-lg border bg-background text-foreground transition-all duration-150 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
                theme.borderSoft || "border-border",
                theme.hoverBorder,
                theme.focusRing,
              ),
        )}
      >
        <Download className={cn("text-muted-foreground", soft ? "size-4" : "w-3.5 h-3.5")} />
        <span>Export</span>
        {isSelectedOnly && (
          <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
            {count}
          </span>
        )}
        <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          className={cn(
            soft
              ? "absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl bg-card p-1 text-foreground shadow-xl ring-1 ring-foreground/[0.08]"
              : "absolute right-0 mt-1.5 w-36 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5 z-50 py-1 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100",
          )}
        >
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
                soft && "h-9 rounded-xl py-0 text-sm text-foreground hover:bg-[var(--tbl-well)]",
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
                soft && "h-9 rounded-xl py-0 text-sm text-foreground hover:bg-[var(--tbl-well)]",
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
                soft && "h-9 rounded-xl py-0 text-sm text-foreground hover:bg-[var(--tbl-well)]",
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
  /** Pin the column to the right edge (pair it with `sticky` on its cells). */
  sticky?: boolean;
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
  const { variant } = useTableStyles();
  const active = checked || indeterminate;

  if (variant === "soft") {
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
          // A 38px hit area around an 18px box.
          "relative grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors after:absolute after:-inset-2.5 after:content-['']",
          FOCUS_RING,
          active
            ? cn(theme.bg, "border-transparent")
            : "border-foreground/25 bg-card hover:border-foreground/45",
        )}
      >
        {indeterminate ? (
          <Minus className="size-3.5" strokeWidth={3} aria-hidden="true" />
        ) : checked ? (
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
        ) : null}
      </button>
    );
  }

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

export function DataTableSelect({
  label = "Select row",
  className,
}: {
  /** Accessible name, e.g. "Select Priya Raman". */
  label?: string;
  className?: string;
}) {
  const { isSelected, toggleRow } = useDataTable();
  const rowId = useRowId();
  if (rowId === undefined) return null;
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <CheckBox
        checked={isSelected(rowId)}
        onClick={() => toggleRow(rowId)}
        label={label}
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
  /** Singular and plural, for "3 users selected". */
  noun?: [string, string];
  className?: string;
}

export function DataTableBatchBar<T = unknown>({
  children,
  floating = true,
  noun,
  className,
}: DataTableBatchBarProps<T>) {
  const { selectedIds, selectedRows, clearSelection, theme, themeStyle } =
    useDataTable<T>();
  const { variant } = useTableStyles();
  const count = selectedIds.size;
  const content =
    typeof children === "function"
      ? children({
          selectedRows,
          selectedIds: Array.from(selectedIds),
          clearSelection,
        })
      : children;

  if (variant === "soft") {
    return (
      <div
        className={cn(
          "pointer-events-none z-30 flex justify-center px-4 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
          floating ? "absolute inset-x-0 bottom-5" : "relative",
          count > 0 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          className,
        )}
        inert={count === 0}
        aria-hidden={count === 0}
      >
        <div
          role="region"
          aria-label="Actions for selected rows"
          className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full bg-[#1b2230] p-1.5 pl-4 text-white shadow-[0_18px_40px_-12px_rgb(15_23_42/0.5)] dark:bg-[#334155] dark:ring-1 dark:ring-white/[0.08]"
        >
          <p
            className="whitespace-nowrap pr-1 text-sm font-medium tabular-nums"
            aria-live="polite"
          >
            {count}
            {noun && (
              <span className="hidden sm:inline">
                {" "}
                {count === 1 ? noun[0] : noun[1]}
              </span>
            )}{" "}
            selected
          </p>
          <span aria-hidden="true" className="mx-1.5 h-5 w-px shrink-0 bg-white/15" />
          <div className="flex items-center gap-0.5">{content}</div>
          <button
            type="button"
            onClick={clearSelection}
            aria-label="Clear selection"
            title="Clear selection"
            className="ml-0.5 grid size-8 shrink-0 place-items-center rounded-full text-white/70 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

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
        {count}
        {noun ? ` ${count === 1 ? noun[0] : noun[1]}` : ""} selected
      </span>
      <div className="w-px h-[16px] bg-current opacity-30 shrink-0 mx-0.5" />
      {content}
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

export interface DataTableBatchActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `danger` for destructive actions (delete). */
  tone?: "default" | "danger";
}

/** A button inside `DataTableBatchBar`. Icons passed as children are sized for you. */
export const DataTableBatchAction = forwardRef<
  HTMLButtonElement,
  DataTableBatchActionProps
>(({ tone = "default", type = "button", className, children, ...props }, ref) => {
  const { variant } = useTableStyles();
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        variant === "soft"
          ? cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-50 [&_svg]:size-3.5",
              tone === "danger"
                ? "text-red-300 hover:bg-red-400/15"
                : "text-white hover:bg-white/10",
            )
          : cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 [&_svg]:w-3 [&_svg]:h-3",
              tone === "danger"
                ? "bg-black/20 hover:bg-black/30"
                : "bg-current/20 hover:bg-current/30",
            ),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
DataTableBatchAction.displayName = "DataTableBatchAction";

export interface TableInfoProps {
  /** First row shown (1-based; 0 when there are none). */
  from: number;
  /** Last row shown. */
  to: number;
  total: number;
  className?: string;
}

/** "Showing 1–10 of 57" for the footer. `DataTableInfo` fills it in for you. */
export function TableInfo({ from, to, total, className }: TableInfoProps) {
  const { variant } = useTableStyles();
  if (variant === "soft") {
    return (
      <p className={cn("text-sm tabular-nums text-muted-foreground", className)}>
        Showing <span className="font-medium text-foreground">{from}</span>
        {"–"}
        <span className="font-medium text-foreground">{to}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span>
      </p>
    );
  }
  return (
    <div className={cn("text-[13px] text-muted-foreground", className)}>
      Showing <strong className="font-semibold text-foreground">{from}</strong>{" "}
      to <strong className="font-semibold text-foreground">{to}</strong> of{" "}
      <strong className="font-semibold text-foreground">{total}</strong> results
    </div>
  );
}

/** `TableInfo` wired to the DataTable's paging. */
export function DataTableInfo({ className }: { className?: string }) {
  const { from, to, total } = useDataTable();
  return <TableInfo from={from} to={to} total={total} className={className} />;
}

/** First, last and the pages beside the current one, with gaps as "…". */
function pageList(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const left = Math.max(page - 1, 1);
  const right = Math.min(page + 1, totalPages);
  const leftGap = left > 2;
  const rightGap = right < totalPages - 1;
  if (!leftGap && rightGap) return [1, 2, 3, 4, 5, "gap", totalPages];
  if (leftGap && !rightGap) {
    return [1, "gap", ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)];
  }
  return [1, "gap", left, page, right, "gap", totalPages];
}

export interface TablePaginationProps {
  /** Controlled — the current page, 1-based. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Previous, page numbers and next. In the `soft` variant: pills, with the
 * first and last page and "…" gaps once there are more than seven pages.
 * `DataTablePagination` wires it to a DataTable.
 */
export function TablePagination({
  page,
  totalPages: totalPagesProp,
  onPageChange: setPage,
  className,
}: TablePaginationProps) {
  const { variant, theme } = useTableStyles();
  const totalPages = Math.max(1, totalPagesProp);

  if (variant === "soft") {
    // Previous / next disable at the ends rather than vanish, so the row never
    // shifts under the pointer.
    const step = cn(
      "inline-flex size-8 items-center justify-center rounded-full text-foreground ring-1 ring-inset ring-foreground/[0.08] transition-colors hover:bg-[var(--tbl-well)] disabled:pointer-events-none disabled:opacity-40 sm:size-9",
      FOCUS_RING,
    );
    return (
      <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-0.5 sm:gap-1", className)}>
        <button
          type="button"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="Previous page"
          className={step}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        {pageList(page, totalPages).map((entry, index) =>
          entry === "gap" ? (
            <span
              key={`gap-${index}`}
              aria-hidden="true"
              className="inline-flex h-8 min-w-6 items-center justify-center text-sm text-muted-foreground sm:h-9 sm:min-w-9"
            >
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => setPage(entry)}
              aria-current={entry === page ? "page" : undefined}
              aria-label={`Page ${entry}`}
              className={cn(
                "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-medium tabular-nums transition-colors sm:h-9 sm:min-w-9 sm:px-2.5",
                FOCUS_RING,
                entry === page
                  ? cn(theme.bg, "shadow-sm")
                  : "text-muted-foreground hover:bg-[var(--tbl-well)] hover:text-foreground",
              )}
            >
              {entry}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={step}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </nav>
    );
  }

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

/** `TablePagination` wired to the DataTable's paging. */
export function DataTablePagination({ className }: { className?: string }) {
  const { page, setPage, totalPages } = useDataTable();
  return (
    <TablePagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      className={className}
    />
  );
}

// ==========================================
// FILTERS
// ==========================================
export interface DataTableTab {
  value: string;
  label: React.ReactNode;
}

export interface DataTableTabsProps<T = unknown> {
  /** The field the tabs filter on: a dot path, or an accessor function (then give `filterId`). */
  by: Accessor<T>;
  /** Identifies this filter. Defaults to `by` when that is a string. */
  filterId?: string;
  tabs: DataTableTab[];
  /** The tab that shows every row. */
  allValue?: string;
  /** Show how many rows each tab would leave. */
  showCounts?: boolean;
  /** Accessible name of the group. */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Pill tabs that switch the table's view (All, Active, Invited…) by filtering
 * one field. Counts respect the search and every other filter.
 */
function DataTableTabsImpl<T>({
  by,
  filterId,
  tabs,
  allValue = "all",
  showCounts = true,
  label = "View",
  size = "sm",
  className,
}: DataTableTabsProps<T>) {
  const { filters, setFilter, countFor } = useDataTable<T>();
  const autoId = useId();
  const id = filterId ?? (typeof by === "string" ? by : autoId);
  const value = filters[id] ?? allValue;

  return (
    // On narrow screens the tabs scroll sideways rather than wrap.
    <div
      className={cn(
        "-mx-1 min-w-0 max-w-full px-1 py-0.5 [overflow-x:auto] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <ToggleGroup
        type="single"
        variant="segmented"
        size={size}
        value={value}
        onValueChange={(next) =>
          setFilter(id, by, !next || next === allValue ? null : next)
        }
        aria-label={label}
      >
        {tabs.map((tab) => (
          <ToggleGroupItem key={tab.value} value={tab.value}>
            {tab.label}
            {showCounts && (
              <span className="ml-1.5 tabular-nums text-muted-foreground">
                {countFor(id, by, tab.value === allValue ? null : tab.value)}
              </span>
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

/** Generic over the row shape, so a function `by` is typed against your rows. */
export const DataTableTabs = DataTableTabsImpl as <T = unknown>(
  props: DataTableTabsProps<T>,
) => React.ReactElement | null;

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterProps<T = unknown> {
  /** The field to match: a dot path, or an accessor function (then give `filterId`). */
  by: Accessor<T>;
  /** Identifies this filter. Defaults to `by` when that is a string. */
  filterId?: string;
  /** Plain strings, or `{ label, value }` when the stored value differs from the label. */
  options: (string | DataTableFilterOption)[];
  /** Shown while no value is chosen, e.g. "Role". */
  placeholder: string;
  /** Accessible name. Defaults to "Filter by {placeholder}". */
  label?: string;
  side?: "top" | "bottom";
  align?: "start" | "end";
  className?: string;
}

/**
 * A single-choice filter. In the `soft` variant it is a pill that takes the
 * accent tint once a value is chosen, with a × to clear it.
 */
function DataTableFilterImpl<T>({
  by,
  filterId,
  options,
  placeholder,
  label,
  side = "bottom",
  align = "start",
  className,
}: DataTableFilterProps<T>) {
  const { filters, setFilter } = useDataTable<T>();
  const { variant, theme } = useTableStyles();
  const {
    open: menuOpen,
    setOpen: setMenuOpen,
    rootRef: menuRootRef,
    triggerRef: menuTriggerRef,
    listRef: menuListRef,
    close: closeMenu,
    onListKeyDown: onMenuKeyDown,
  } = useMenu();
  const listId = useId();
  const autoId = useId();
  const id = filterId ?? (typeof by === "string" ? by : autoId);
  const soft = variant === "soft";
  const accessibleName = label ?? `Filter by ${placeholder.toLowerCase()}`;

  const items = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );
  const value = filters[id] ?? null;
  const current = items.find((item) => item.value === value);

  const choose = (next: string | null) => {
    setFilter(id, by, next);
    closeMenu();
  };

  return (
    <div
      ref={menuRootRef}
      className={cn("relative inline-flex min-w-0", soft && "flex-1 sm:flex-none", className)}
    >
      <button
        ref={menuTriggerRef}
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? listId : undefined}
        aria-label={current ? `${accessibleName}: ${current.label}` : accessibleName}
        className={cn(
          soft
            ? cn(
                "flex h-10 w-full min-w-0 items-center justify-between gap-1 rounded-full pl-4 text-sm sm:w-44",
                FOCUS_RING,
                current ? cn(SOFT_PILL_ACTIVE, "pr-9") : cn(SOFT_PILL, "pr-2.5"),
              )
            : cn(
                "flex h-9 items-center gap-2 rounded-lg border bg-background pl-3 text-xs font-semibold text-foreground shadow-sm transition-colors",
                theme.borderSoft || "border-border",
                theme.hoverBorder,
                current ? cn(theme.bgSoft, theme.text, "pr-8") : "pr-2.5",
              ),
        )}
      >
        <span className="truncate">{current?.label ?? placeholder}</span>
        {!current && (
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "shrink-0 text-muted-foreground transition-transform duration-200",
              soft ? "size-4" : "size-3.5",
              menuOpen && "rotate-180",
            )}
          />
        )}
      </button>
      {current && (
        <button
          type="button"
          onClick={() => setFilter(id, by, null)}
          aria-label={`Clear ${placeholder.toLowerCase()} filter`}
          className={cn(
            "absolute top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-current transition-colors hover:bg-[color-mix(in_oklab,currentColor_14%,transparent)]",
            soft ? "right-2 text-[var(--tbl-accent-ink)]" : "right-1.5",
            FOCUS_RING,
          )}
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
      {menuOpen && (
        <div
          ref={menuListRef}
          id={listId}
          role="listbox"
          aria-label={accessibleName}
          onKeyDown={onMenuKeyDown}
          className={cn(
            soft
              ? cn(SOFT_MENU, "max-h-72 [overflow-y:auto]")
              : "absolute z-50 w-max min-w-full rounded-xl border border-border bg-popover py-1 text-popover-foreground shadow-lg",
            align === "end" ? "right-0" : "left-0",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {items.map((item) => {
            const selected = item.value === value;
            return (
              <button
                key={item.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(selected ? null : item.value)}
                className={cn(
                  soft
                    ? SOFT_OPTION
                    : "flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-1.5 text-left text-xs font-medium text-foreground/80 outline-none hover:bg-muted focus-visible:bg-muted",
                  selected &&
                    (soft ? "font-medium text-[var(--tbl-accent-ink)]" : cn(theme.text, "font-semibold")),
                )}
              >
                <span className="truncate">{item.label}</span>
                {selected && (
                  <Check aria-hidden="true" className={soft ? "size-4" : "size-3.5"} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Generic over the row shape, so a function `by` is typed against your rows. */
export const DataTableFilter = DataTableFilterImpl as <T = unknown>(
  props: DataTableFilterProps<T>,
) => React.ReactElement | null;

/**
 * Clears the search, every filter and the sort. Renders only while there is
 * something to clear. Children replace the default icon and "Reset" label.
 */
export const DataTableReset = forwardRef<HTMLButtonElement, TableActionProps>(
  ({ variant = "ghost", onClick, children, ...props }, ref) => {
    const { isFiltered, sort, resetAll } = useDataTable();
    if (!isFiltered && !sort) return null;
    return (
      <TableAction
        ref={ref}
        variant={variant}
        onClick={(event) => {
          onClick?.(event);
          resetAll();
        }}
        {...props}
      >
        {children ?? (
          <>
            <RotateCcw aria-hidden="true" />
            Reset
          </>
        )}
      </TableAction>
    );
  },
);
DataTableReset.displayName = "DataTableReset";
