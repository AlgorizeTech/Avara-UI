"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";

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
