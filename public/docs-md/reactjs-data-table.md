---
title: "Shadcn Data Table"
description: "Shadcn Data Table. A stateful data table built on Table primitives with built-in global search, click-to-sort column headers, filter tabs, pagination."
url: https://avaraui.com/docs/nextjs/data-table
---

# Shadcn Data Table

A stateful data table built on [Table](./table) primitives with built-in global search, click-to-sort column headers, filter tabs, pagination, and batch row selection.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/advanced-table.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/advanced-table
```

### Searchable DataTable

- Pass `data` and getRowId — everything else is composition. No column config.
- `sortBy` takes a dot path or an accessor function, so nested and computed values sort correctly.

```tsx
import { useState } from "react";
import {
  DataTable,
  DataTableBatchBar,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableEmpty,
  DataTableExport,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableHeading,
  DataTableInfo,
  DataTablePageSize,
  DataTablePagination,
  DataTableRow,
  DataTableSearch,
  DataTableSelect,
  DataTableSelectAll,
} from "@/components/custom/blocks/TableBlock";
import { Edit2, Trash2 } from "lucide-react";

const now = Date.now();
const ago = (d: number, h: number = 0) => now - (d * 86400000 + h * 3600000);

interface Employee {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Banned";
  lastActive: string;
  lastActiveTs: number;
  sessions: number;
}

const INITIAL_DATA: Employee[] = [
  { id: 1, name: "Alice Johnson", role: "Admin", status: "Active", lastActive: "2 minutes ago", lastActiveTs: ago(0, 0), sessions: 142 },
  { id: 2, name: "Bob Martinez", role: "Editor", status: "Active", lastActive: "1 hour ago", lastActiveTs: ago(0, 1), sessions: 89 },
  { id: 3, name: "Carol Williams", role: "Viewer", status: "Pending", lastActive: "3 hours ago", lastActiveTs: ago(0, 3), sessions: 12 },
  { id: 4, name: "David Lee", role: "Manager", status: "Active", lastActive: "Yesterday", lastActiveTs: ago(1), sessions: 201 },
  { id: 5, name: "Eva Chen", role: "Developer", status: "Inactive", lastActive: "3 days ago", lastActiveTs: ago(3), sessions: 54 },
  { id: 6, name: "Frank Nguyen", role: "Editor", status: "Active", lastActive: "5 days ago", lastActiveTs: ago(5), sessions: 76 },
  { id: 7, name: "Grace Park", role: "Viewer", status: "Banned", lastActive: "2 weeks ago", lastActiveTs: ago(14), sessions: 3 },
  { id: 8, name: "Hank Torres", role: "Admin", status: "Active", lastActive: "30 minutes ago", lastActiveTs: ago(0, 0.5), sessions: 310 },
  { id: 9, name: "Iris Scott", role: "Manager", status: "Active", lastActive: "4 hours ago", lastActiveTs: ago(0, 4), sessions: 188 },
  { id: 10, name: "James Kim", role: "Developer", status: "Pending", lastActive: "1 week ago", lastActiveTs: ago(7), sessions: 29 },
  { id: 11, name: "Karen Brown", role: "Viewer", status: "Active", lastActive: "10 minutes ago", lastActiveTs: ago(0, 0.17), sessions: 67 },
  { id: 12, name: "Liam Davis", role: "Editor", status: "Inactive", lastActive: "1 month ago", lastActiveTs: ago(30), sessions: 22 },
  { id: 13, name: "Mia Wilson", role: "Developer", status: "Active", lastActive: "2 days ago", lastActiveTs: ago(2), sessions: 95 },
  { id: 14, name: "Noah Anderson", role: "Manager", status: "Active", lastActive: "6 hours ago", lastActiveTs: ago(0, 6), sessions: 134 },
  { id: 15, name: "Olivia Thomas", role: "Viewer", status: "Banned", lastActive: "3 months ago", lastActiveTs: ago(90), sessions: 1 },
];

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-[#ede9fe] text-[#5b21b6] dark:bg-purple-500/10 dark:text-purple-400",
  Manager: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Developer: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Editor: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Viewer: "bg-muted text-muted-foreground",
};

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Inactive: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Banned: "bg-[#fee2e2] text-[#991b1b] dark:bg-red-500/10 dark:text-red-400",
};

const Pill = ({ styles, children }: { styles: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em] ${styles}`}>
    {children}
  </span>
);

const getDotClass = (ts: number) => {
  const diff = (now - ts) / 60000;
  if (diff < 60) return "bg-[#22c55e]";
  if (diff < 60 * 24) return "bg-[#f59e0b]";
  if (diff < 60 * 24 * 7) return "bg-[#ef4444]";
  return "bg-muted-foreground";
};

export default function UserTable() {
  const [data, setData] = useState<Employee[]>(INITIAL_DATA);

  const handleBatchDelete = (ids: (string | number)[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length} users?`)) {
      setData((prev) => prev.filter((d) => !ids.includes(d.id)));
    }
  };

  return (
    <DataTable data={data} getRowId={(row) => row.id}>
      <DataTableHeading title="Team members">
        <DataTableSearch placeholder="Search all columns…" />
        <div className="flex items-center gap-2">
          <DataTablePageSize />
          <DataTableExport filename="team-members" />
        </div>
      </DataTableHeading>

      <DataTableContent>
        <DataTableHeader>
          <DataTableRow isHeader>
            <DataTableHead className="w-11">
              <DataTableSelectAll />
            </DataTableHead>
            <DataTableHead sortBy="name">Name</DataTableHead>
            <DataTableHead sortBy="role">Role</DataTableHead>
            <DataTableHead sortBy="status">Status</DataTableHead>
            <DataTableHead
              sortBy={(row: Employee) => row.lastActiveTs}
              sortId="lastActive"
              sortType="number"
            >
              Last Active
            </DataTableHead>
            <DataTableHead sortBy="sessions" sortType="number" align="right">
              Sessions
            </DataTableHead>
          </DataTableRow>
        </DataTableHeader>

        <DataTableBody<Employee> animate>
          {(rows) =>
            rows.length === 0 ? (
              <DataTableEmpty colSpan={6}>No users match that search.</DataTableEmpty>
            ) : (
              rows.map((row) => (
                <DataTableRow key={row.id} row={row}>
                  <DataTableCell className="w-11">
                    <DataTableSelect />
                  </DataTableCell>
                  <DataTableCell>
                    <strong className="font-semibold text-foreground">{row.name}</strong>
                  </DataTableCell>
                  <DataTableCell>
                    <Pill styles={ROLE_STYLES[row.role] || ROLE_STYLES.Viewer}>{row.role}</Pill>
                  </DataTableCell>
                  <DataTableCell>
                    <Pill styles={STATUS_STYLES[row.status] || STATUS_STYLES.Inactive}>{row.status}</Pill>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex items-center gap-[5px]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotClass(row.lastActiveTs)}`} />
                      {row.lastActive}
                    </div>
                  </DataTableCell>
                  <DataTableCell align="right">{row.sessions}</DataTableCell>
                </DataTableRow>
              ))
            )
          }
        </DataTableBody>
      </DataTableContent>

      <DataTableFooter>
        <DataTableInfo />
        <DataTablePagination />
      </DataTableFooter>

      <DataTableBatchBar>
        {({ selectedIds, clearSelection }) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => alert(`Edit ${selectedIds.length} items`)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-semibold bg-current/20 hover:bg-current/30 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => {
                handleBatchDelete(selectedIds);
                clearSelection();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-semibold bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        )}
      </DataTableBatchBar>
    </DataTable>
  );
}
```

## About Shadcn Data Table

**What it is.** `DataTable` wraps `Table` primitives in a React context provider with opt-in controls for global search, `DataTableTabs`, `DataTableFilter`, typed column sorting (one active column at a time), pagination, and batch row selection.

**How it is built.** Resolves `id`, `_id`, `uuid` or `key` automatically via `getRowId` (tracking selection by ID across sorts and pages), supports dot-path and accessor `sortBy` keys, and exposes full state via `useDataTable`.

**When to use it.** Use `DataTable` for client-side datasets, where every row is held in memory, that need search, filtering, sorting, and batch actions without column-config boilerplate. For server-driven tables, use [Table](https://avaraui.com/docs/reactjs/table).

## For AI agents

**When to use**

- Admin tables needing client-side search, status tabs, dropdown filters, sorting, pagination, and multi-row batch actions
- Datasets with nested objects where `sortBy="customer.email"` or accessor functions avoid reshaping data

**When not to use**

- Server-paginated/sorted datasets or simple read-only tables — use [Table](https://avaraui.com/docs/reactjs/table)
- Spreadsheet editing with keyboard cell navigation — use [Data Grid](https://avaraui.com/docs/reactjs/data-grid)

**Agent notes**

- Installs via the `table` registry item (`Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/table.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/table
````)
- Selection tracks row IDs (`getRowId`), not array indices; give computed `sortBy` functions a `sortId`
- Search, filters, sorting and pagination all run client-side over the `data` prop, and only one column is sorted at a time
- `DataTableExport` exports the selected rows, or every filtered row when none are selected; `formats` accepts `"csv"`, `"xlsx"` and `"json"`
- `variant="soft"` enables the admin-dashboard look with `DataTableTabs`, `DataTableFilter`, `sticky` actions, and `DataTableBatchAction`

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DataTable` | `data` | `T[]` | Required | Your rows, in whatever shape they arrive. |
| `DataTable` | `getRowId` | `(row: T) => string \| number` | `id → _id → uuid → key` | How a row is identified for selection and expansion. |
| `DataTable` | `getSearchText` | `(row: T) => string` | all values | Override what the search box matches against. |
| `DataTable` | `initialSort` | `{ id, direction?, type? }` | `undefined` | Sort applied on first render. |
| `DataTable` | `pageSize` | `number` | 2nd option | Starting page size. |
| `DataTable` | `pageSizeOptions` | `number[]` | `[5, 10, 25, 50]` | Choices offered by `DataTablePageSize`. |
| `DataTable` | `onSelectionChange` | `(rows: T[]) => void` | — | Fires when the selection changes, with the full row objects. |
| `DataTable` | `variant` | `"default" \| "minimal" \| "glass" \| "soft"` | `"default"` | Visual skin of the container, rows and every control. `soft` is the admin-dashboard look shown above. |
| `DataTable` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Accent theme color for active selection, soft borders, hover highlights, and active elements. Accepts preset names or custom hex codes. |
| `DataTable` | `size` | `"sm" \| "md" \| "lg"` | `"md"` | Density padding and text sizing for table cells and toolbars. |
| `DataTableHead` | `sortBy` | `string \| ((row: T) => unknown)` | — | A dot path such as `"profile.name"`, or an accessor function. Its presence makes the header sortable. |
| `DataTableHead` | `sortId` | `string` | the path | Recommended when `sortBy` is a function: gives the column an id that `initialSort` can target. Without it, a generated id is used. |
| `DataTableHead` | `sortType` | `"auto" \| "string" \| "number" \| "date"` | `"auto"` | `auto` compares numbers numerically and everything else as text. |
| `DataTableHead` | `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment. |
| `DataTableBatchBar` | `children` | `((args: { selectedRows: T[]; selectedIds: (string \| number)[]; clearSelection: () => void }) => ReactNode) \| ReactNode` | — | Render function or nodes for the floating batch actions bar. |
| `DataTableBatchBar` | `floating` | `boolean` | `true` | Floats over the bottom center of the table when true; set `false` for inline rendering. |
| `DataTableSearch` | `placeholder` | `string` | `"Search…"` | Placeholder text for the search input box. It is also the input's accessible name. |
| `DataTableExport` | `filename` | `string` | `"export"` | File name without the extension. |
| `DataTableExport` | `formats` | `("csv" \| "xlsx" \| "json")[]` | `["csv", "xlsx"]` | Menu entries offered. The `xlsx` entry downloads an Excel XML file named `.xls`. |
| `DataTableExport` | `formatData` | `(rows: T[]) => Record<string, unknown>[]` | — | Shape the rows before export. Without it, raw row objects are exported with nested values as JSON strings. Selected rows are exported when any are selected, otherwise every filtered row. |
| `DataTableSelectAll` | `className` | `string` | — | Header checkbox to select or deselect all rows on the current page. |
| `DataTableSelect` | `className` | `string` | — | Row checkbox to select or deselect the specific row. |
| `DataTableSelect` | `label` | `string` | `"Select row"` | Accessible name of the row checkbox, e.g. `Select Priya Nair`. |
| `DataTableHead`, `DataTableCell` | `sticky` | `boolean` | `false` | Pins the column to the right edge. Set it on the head and on every cell of the column. |
| `DataTableTabs` | `by` | `string \| ((row: T) => unknown)` | Required | The field the tabs filter on — a dot path or an accessor function (add `filterId` for functions). |
| `DataTableTabs` | `tabs` | `{ value: string; label: ReactNode }[]` | Required | One tab per value. The tab whose value is `allValue` shows every row. |
| `DataTableTabs` | `allValue` | `string` | `"all"` | The value of the show-everything tab. |
| `DataTableTabs` | `showCounts` | `boolean` | `true` | Each tab shows how many rows it would leave, counting the search and the other filters. |
| `DataTableFilter` | `by` | `string \| ((row: T) => unknown)` | Required | The field to match exactly (an array field matches any of its entries). Add `filterId` for functions. |
| `DataTableFilter` | `options` | `(string \| { label: string; value: string })[]` | Required | The choices. Use objects when the stored value differs from the label. |
| `DataTableFilter` | `placeholder` | `string` | Required | Shown while nothing is chosen, e.g. `Role`. Also names the filter for screen readers unless you pass `label`. |
| `DataTableFilter` | `side` | `"top" \| "bottom"` | `"bottom"` | Which way the menu opens. |
| `DataTableReset` | `variant` | `"primary" \| "secondary" \| "ghost"` | `"ghost"` | Clears the search, every filter and the sort. Renders only while there is something to clear; takes every `TableAction` prop. |
| `DataTablePageSize` | `side` | `"top" \| "bottom"` | `"top"` in soft | Which way the menu opens. The soft picker sits in the footer, so it opens upward. |
| `DataTableBatchBar` | `noun` | `[string, string]` | — | Singular and plural for the count: `["user", "users"]` reads “3 users selected”. |
| `DataTableBatchAction` | `tone` | `"default" \| "danger"` | `"default"` | A button for the batch bar; `danger` for destructive actions. |
| `DataTableEmpty` | `icon, title, description, action` | `ReactNode` | — | A full empty state: an icon chip, what is missing, what to do, and a button. Without them it is the one-line message it always was. |
| `TableAction` | `variant` | `"primary" \| "secondary" \| "ghost"` | `"secondary"` | A toolbar button in the table's look. Icons passed as children are sized for you. |
| `TableAction` | `size` | `"sm" \| "md"` | `"md"` | Button height and text size. |
| `TableRowAction` | `label` | `string` | Required | A round icon button for a row; `label` is its accessible name and hover title. Group them in `TableRowActions` (always visible in soft). |
| `TableRowAction` | `tone` | `"default" \| "danger"` | `"default"` | `danger` turns red on hover. |
| `TableBadge` | `tone` | `"neutral" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | The status colour. The label always shows, so colour is never the only signal. |
| `TableBadge` | `dot` | `boolean` | `true` | Turn it off for a plain tag. |
| `TablePerson` | `name` | `string` | Required | The name; the initials take a colour kept per name when there is no photo. |
| `TablePerson` | `description` | `ReactNode` | — | A muted second line, e.g. an email. |
| `TablePerson` | `src` | `string` | — | A photo. If it fails to load, the initials show. |
| `TablePerson` | `imageComponent` | `ElementType` | `"img"` | Renders the photo — pass `next/image` in a Next.js app. |

## Works with other components

- Uses the same primitives as [Table](https://avaraui.com/docs/reactjs/table) (`TableHead`, `TableRow`, `TableCell`, `TableBadge`, `TablePerson`).
- Pair batch delete actions with [Dialog](https://avaraui.com/docs/reactjs/dialog) confirmation and [Sonner](https://avaraui.com/docs/reactjs/sonner) feedback.
- Use [Data Grid](https://avaraui.com/docs/reactjs/data-grid) if you need inline editable cells.

## How does DataTable track row selection across sorting and pagination?

`DataTable` stores selected row IDs from `getRowId` (default `id`, `_id`, `uuid` or `key`), not array positions, so selected rows stay checked when you sort, search or change pages. The header checkbox only toggles the current page, and `onSelectionChange` receives the full selected row objects.

## Why does a function sortBy need a sortId?

A string `sortBy` such as `"profile.name"` doubles as the column's id. A function has no name, so `sortId` gives the column an id of your choosing, one `initialSort` can target. Without it, the head falls back to a generated id that works for clicking but cannot be referenced.

## What does the DataTable search box match?

By default it does a case-insensitive substring match against every value in the row, including nested objects and arrays, and typing returns you to page 1. Pass `getSearchText` to limit it, for example to `row.name + row.email`. The search runs before filters, sorting and pagination, all client-side.

## How do I export only the selected or filtered rows?

Add `DataTableExport`. It exports the selected rows when any are checked, otherwise every row that passes the search and filters, across all pages. `formats` accepts `"csv"`, `"xlsx"` and `"json"`, `filename` sets the name, and `formatData` reshapes rows first. The `xlsx` option writes an Excel XML `.xls` file.

## How do I add status tabs and dropdown filters to DataTable?

Place `DataTableTabs` with `by="status"` and a `tabs` array, and `DataTableFilter` with `by`, `options` and `placeholder`. Each filters one field by exact match, and an array field matches any entry. Tab counts follow the search and the other filters, and `DataTableReset` clears everything.

## Does DataTable support server-side pagination and sorting?

No. `DataTable` searches, filters, sorts and paginates the `data` array in memory, and only one column is sorted at a time. For server-driven results, build the table from the plain [Table](https://avaraui.com/docs/reactjs/table) primitives and pass in each page of rows yourself.

---

Live previews and every example: https://avaraui.com/docs/nextjs/data-table
