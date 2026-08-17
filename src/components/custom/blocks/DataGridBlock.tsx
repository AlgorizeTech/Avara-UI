"use client";

import { cn } from "@/lib/utils";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type GridColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    outline: "outline-[var(--primary)]",
    bgActive: "bg-primary/10",
    handle: "bg-primary",
    headerBg: "bg-primary/10 dark:bg-primary/20 text-primary",
    btnBg: "bg-primary text-primary-foreground hover:opacity-90",
  },
  indigo: {
    outline: "outline-indigo-500",
    bgActive: "bg-indigo-50 dark:bg-indigo-500/10",
    handle: "bg-indigo-500",
    headerBg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
    btnBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  rose: {
    outline: "outline-rose-500",
    bgActive: "bg-rose-50 dark:bg-rose-500/10",
    handle: "bg-rose-500",
    headerBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    btnBg: "bg-rose-600 hover:bg-rose-700 text-white",
  },
  emerald: {
    outline: "outline-emerald-500",
    bgActive: "bg-emerald-50 dark:bg-emerald-500/10",
    handle: "bg-emerald-500",
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  blue: {
    outline: "outline-blue-500",
    bgActive: "bg-blue-50 dark:bg-blue-500/10",
    handle: "bg-blue-500",
    headerBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    btnBg: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  zinc: {
    outline: "outline-zinc-900 dark:outline-zinc-100",
    bgActive: "bg-zinc-100 dark:bg-zinc-800",
    handle: "bg-zinc-900 dark:bg-zinc-100",
    headerBg: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    btnBg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200",
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
        outline: "",
        bgActive: "bg-[rgba(var(--grid-color-rgb),0.1)]",
        handle: "bg-[var(--grid-color)]",
        headerBg: "bg-[rgba(var(--grid-color-rgb),0.12)] text-[var(--grid-color)]",
        btnBg: "bg-[var(--grid-color)] text-white hover:opacity-90",
      },
      style: {
        "--grid-color": color,
        "--grid-color-rgb": rgb,
        outlineColor: color,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// INTERFACES
// ==========================================
export interface GridColumn {
  field: string;
  headerName: string;
  width?: string | number;
  type?: "text" | "number";
  readOnly?: boolean;
}

export interface DataGridBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  columns: GridColumn[];
  data: Record<string, any>[];
  color?: GridColor;
  onChange?: (newData: Record<string, any>[]) => void;
  showRowNumbers?: boolean;
  readOnly?: boolean;
}

// ==========================================
// COMPONENT
// ==========================================
export const DataGridBlock = forwardRef<HTMLDivElement, DataGridBlockProps>(
  (
    {
      columns,
      data: initialData,
      color = "primary",
      onChange,
      showRowNumbers = true,
      readOnly = false,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const containerRef = useRef<HTMLDivElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    // State
    const [data, setData] = useState(initialData);
    const [activeCell, setActiveCell] = useState<{
      row: number;
      col: number;
    } | null>(null);
    const [editingCell, setEditingCell] = useState<{
      row: number;
      col: number;
    } | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    // Sync external data changes
    useEffect(() => {
      setData(initialData);
    }, [initialData]);

    const finishEditing = useCallback(
      (save: boolean = true) => {
        if (editingCell && save && !readOnly) {
          const colDef = columns[editingCell.col];
          if (!colDef.readOnly) {
            const newData = [...data];
            const parsedValue =
              colDef.type === "number" ? Number(editValue) || 0 : editValue;
            newData[editingCell.row] = {
              ...newData[editingCell.row],
              [colDef.field]: parsedValue,
            };
            setData(newData);
            if (onChange) onChange(newData);
          }
        }
        setEditingCell(null);
      },
      [data, columns, editingCell, editValue, onChange, readOnly],
    );

    const startEditing = useCallback(
      (row: number, col: number, initialValue?: string) => {
        if (readOnly || columns[col].readOnly) return;
        setEditingCell({ row, col });
        setEditValue(
          initialValue !== undefined
            ? initialValue
            : String(data[row][columns[col].field] || ""),
        );
      },
      [columns, data, readOnly],
    );

    // Handle Global Grid Navigation
    const handleGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (editingCell || !activeCell) return; // Ignore if editing or no selection

      const { row, col } = activeCell;
      const rowCount = data.length;
      const colCount = columns.length;

      let nextRow = row;
      let nextCol = col;
      let handled = true;

      switch (e.key) {
        case "ArrowUp":
          nextRow = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          nextRow = Math.min(rowCount - 1, row + 1);
          break;
        case "ArrowLeft":
          nextCol = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          nextCol = Math.min(colCount - 1, col + 1);
          break;
        case "Tab":
          e.preventDefault();
          if (e.shiftKey) {
            if (col > 0) nextCol = col - 1;
            else if (row > 0) {
              nextRow = row - 1;
              nextCol = colCount - 1;
            }
          } else {
            if (col < colCount - 1) nextCol = col + 1;
            else if (row < rowCount - 1) {
              nextRow = row + 1;
              nextCol = 0;
            }
          }
          break;
        case "Enter":
        case "F2":
          startEditing(row, col);
          e.preventDefault();
          break;
        case "Escape":
          setActiveCell(null);
          break;
        case "Backspace":
        case "Delete":
          if (!readOnly && !columns[col].readOnly) {
            const newData = [...data];
            newData[row] = { ...newData[row], [columns[col].field]: "" };
            setData(newData);
            if (onChange) onChange(newData);
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            startEditing(row, col, e.key);
            e.preventDefault();
          } else {
            handled = false;
          }
          break;
      }

      if (handled) {
        if (nextRow !== row || nextCol !== col) {
          e.preventDefault();
          setActiveCell({ row: nextRow, col: nextCol });
          const cellId = `cell-${nextRow}-${nextCol}`;
          document.getElementById(cellId)?.scrollIntoView({
            behavior: "auto",
            block: "nearest",
            inline: "nearest",
          });
        }
      }
    };

    // Handle Input specifics while editing
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        finishEditing(true);
        if (activeCell && activeCell.row < data.length - 1) {
          setActiveCell({ row: activeCell.row + 1, col: activeCell.col });
        }
        containerRef.current?.focus({ preventScroll: true });
      } else if (e.key === "Escape") {
        e.preventDefault();
        finishEditing(false); // Cancel
        containerRef.current?.focus({ preventScroll: true });
      } else if (e.key === "Tab") {
        e.preventDefault();
        finishEditing(true);
        if (activeCell && activeCell.col < columns.length - 1) {
          setActiveCell({ row: activeCell.row, col: activeCell.col + 1 });
        }
        containerRef.current?.focus({ preventScroll: true });
      }
      e.stopPropagation(); // Prevent grid listener from firing
    };

    // Click outside to deselect
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setActiveCell(null);
          finishEditing(true);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [finishEditing]);

    return (
      <div
        className={cn(
          "w-full overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#09090b]",
          className,
        )}
        style={style}
        {...props}
      >
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleGridKeyDown}
          className="w-full overflow-auto max-h-[600px] outline-none"
        >
          <table className="w-full border-collapse text-sm text-left whitespace-nowrap select-none">
            {/* HEADERS */}
            <thead
              className={cn(
                "sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 shadow-xs backdrop-blur-md transition-colors duration-150",
                theme.headerBg,
              )}
            >
              <tr>
                {showRowNumbers && (
                  <th className="w-12 px-4 py-2 border-r border-zinc-200/60 dark:border-zinc-800/60 text-center font-medium opacity-70">
                    #
                  </th>
                )}
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2.5 font-semibold border-r border-zinc-200/60 dark:border-zinc-800/60 last:border-r-0"
                    style={{ minWidth: col.width || 120 }}
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  {showRowNumbers && (
                    <td className="w-12 px-4 py-2 text-center text-xs font-mono text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                      {rowIndex + 1}
                    </td>
                  )}

                  {columns.map((col, colIndex) => {
                    const isActive =
                      activeCell?.row === rowIndex &&
                      activeCell?.col === colIndex;
                    const isEditingThis =
                      editingCell?.row === rowIndex &&
                      editingCell?.col === colIndex;
                    const val = row[col.field];

                    return (
                      <td
                        key={colIndex}
                        id={`cell-${rowIndex}-${colIndex}`}
                        onClick={() => {
                          setActiveCell({ row: rowIndex, col: colIndex });
                          containerRef.current?.focus({ preventScroll: true });
                        }}
                        onDoubleClick={() => startEditing(rowIndex, colIndex)}
                        style={isActive ? style : undefined}
                        className={cn(
                          "relative px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 h-10 truncate transition-colors duration-75 cursor-cell",
                          isActive &&
                            "outline outline-2 -outline-offset-2 z-10 bg-white dark:bg-zinc-900",
                          isActive && theme.outline,
                          activeCell?.row === rowIndex &&
                            !isActive &&
                            "bg-zinc-50/80 dark:bg-zinc-900/50",
                          isEditingThis && "p-0",
                        )}
                      >
                        {isEditingThis ? (
                          <input
                            ref={editInputRef}
                            autoFocus
                            type={col.type === "number" ? "number" : "text"}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleInputKeyDown}
                            onBlur={() => finishEditing(true)}
                            className={cn(
                              "absolute inset-0 w-full h-full px-4 outline-none bg-white dark:bg-zinc-900 font-sans text-sm m-0 border-none shadow-xl z-20",
                              col.type === "number" && "font-mono",
                            )}
                          />
                        ) : (
                          <span
                            className={cn(
                              "block w-full overflow-hidden text-ellipsis",
                              col.type === "number" &&
                                "font-mono text-zinc-600 dark:text-zinc-400",
                              (readOnly || col.readOnly) &&
                                "opacity-60 cursor-not-allowed",
                            )}
                          >
                            {col.field === "status" ? (
                              <span
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none",
                                  val === "Paid" &&
                                    "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
                                  val === "Pending" &&
                                    "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
                                  val === "Overdue" &&
                                    "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20",
                                  val !== "Paid" && val !== "Pending" && val !== "Overdue" && "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                )}
                              >
                                {String(val || "")}
                              </span>
                            ) : (
                              val !== null && val !== undefined ? String(val) : ""
                            )}
                          </span>
                        )}

                        {isActive && !isEditingThis && (
                          <div
                            className={cn(
                              "absolute bottom-[-3px] right-[-3px] w-1.5 h-1.5 z-20 border border-white dark:border-black rounded-[1px]",
                              theme.handle,
                            )}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="py-12 text-center text-sm text-zinc-500">
              No data available.
            </div>
          )}
        </div>
      </div>
    );
  },
);
DataGridBlock.displayName = "DataGridBlock";
