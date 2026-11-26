---
title: "Shadcn Data Grid"
description: "A keyboard-navigable data grid with Excel-style inline editing. Free shadcn/ui Data Grid component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/data-grid
---

# Shadcn Data Grid

A keyboard-navigable data grid with Excel-style inline editing.

`DataGridBlock` needs no grid library; its only npm dependency is `lucide-react`. It tracks the active cell as a `{ row, col }` coordinate, supports `ArrowUp/Down/Left/Right` navigation, `Tab` flow and `Enter` to edit and save, and passes the updated rows to `onChange`.

Click any cell and drive the grid from the keyboard: arrows to move, `Tab` to flow, `Enter` (or a double-click) to edit, `Enter` again to save and drop to the next row.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/data-grid.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/data-grid
```

## Data grid

- Pass `columns` as `{ field, headerName }[]` — `field` must match a key in your row objects exactly.
- `data` is the row array; the grid owns the editing state from there.
- `onChange` fires with the whole mutated array after a cell is saved via Enter, Tab or click-away.
- `color` accents the active cell's focus ring and the drag handle. Hex codes work.

```tsx
import { useState } from "react";
import { DataGridBlock } from "@/components/custom/blocks/DataGridBlock";

import { type GridColumn } from "@/components/custom/blocks/DataGridBlock";

const COLUMNS: GridColumn[] = [
  { field: "id", headerName: "Transaction ID", width: 120, readOnly: true },
  { field: "customer", headerName: "Customer Name", width: 200 },
  { field: "amount", headerName: "Amount ($)", type: "number", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "date", headerName: "Date", width: 140 },
];

const ROWS = [
  { id: "TX-101", customer: "Acme Corp", amount: 4500.5, status: "Paid", date: "2023-10-12" },
  { id: "TX-102", customer: "Global Tech", amount: 1200.0, status: "Pending", date: "2023-10-14" },
  { id: "TX-103", customer: "Stark Ind.", amount: 8900.25, status: "Overdue", date: "2023-09-30" },
  { id: "TX-104", customer: "Wayne Ent.", amount: 15500.0, status: "Paid", date: "2023-10-01" },
  { id: "TX-105", customer: "Initech", amount: 340.0, status: "Paid", date: "2023-10-15" },
  { id: "TX-106", customer: "Soylent Corp", amount: 950.75, status: "Pending", date: "2023-10-16" },
  { id: "TX-107", customer: "Umbrella Corp", amount: 12000.0, status: "Paid", date: "2023-10-10" },
  { id: "TX-108", customer: "Massive Dynamic", amount: 450.0, status: "Paid", date: "2023-10-05" },
];

export default function Ledger() {
  const [data, setData] = useState<Record<string, unknown>[]>(ROWS);

  return (
    <DataGridBlock
      title="Financial Ledger"
      columns={COLUMNS}
      data={data}
      onChange={setData}
    />
  );
}
```

## Read only

- Set `readOnly` to lock every cell against double-click and keyboard editing, while arrow-key navigation still works.

```tsx
import { DataGridBlock } from "@/components/custom/blocks/DataGridBlock";

import { type GridColumn } from "@/components/custom/blocks/DataGridBlock";

const COLUMNS: GridColumn[] = [
  { field: "id", headerName: "Transaction ID", width: 120, readOnly: true },
  { field: "customer", headerName: "Customer Name", width: 200 },
  { field: "amount", headerName: "Amount ($)", type: "number", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "date", headerName: "Date", width: 140 },
];

const ROWS = [
  { id: "TX-101", customer: "Acme Corp", amount: 4500.5, status: "Paid", date: "2023-10-12" },
  { id: "TX-102", customer: "Global Tech", amount: 1200.0, status: "Pending", date: "2023-10-14" },
  { id: "TX-103", customer: "Stark Ind.", amount: 8900.25, status: "Overdue", date: "2023-09-30" },
  { id: "TX-104", customer: "Wayne Ent.", amount: 15500.0, status: "Paid", date: "2023-10-01" },
  { id: "TX-105", customer: "Initech", amount: 340.0, status: "Paid", date: "2023-10-15" },
  { id: "TX-106", customer: "Soylent Corp", amount: 950.75, status: "Pending", date: "2023-10-16" },
  { id: "TX-107", customer: "Umbrella Corp", amount: 12000.0, status: "Paid", date: "2023-10-10" },
  { id: "TX-108", customer: "Massive Dynamic", amount: 450.0, status: "Paid", date: "2023-10-05" },
];

export default function ReadOnlyGrid() {
  // Keyboard navigation still works — only editing is disabled.
  return (
    <DataGridBlock
      title="Financial Ledger"
      description="View mode only."
      columns={COLUMNS}
      data={ROWS}
      readOnly
    />
  );
}
```

## About Shadcn Data Grid

**What it is.** **Shadcn Data Grid** (`DataGridBlock`) is a keyboard-navigable, Excel-style inline editing table with column definitions, roving cell focus, and configurable read-only mode.

**How it is built.** Built around a `{ row, col }` roving coordinate state with no grid library, `DataGridBlock` handles arrow-key movement, `Tab` flow, `Enter` or double-click cell editing, and emits the updated row array via `onChange`.

**When to use it.** Use it for spreadsheet-like editors, bulk inventory tables, pricing matrices, and financial or operational dashboards where users edit cells directly in place.

## For AI agents

**When to use**

- Spreadsheet-like editors, bulk inventory tables, pricing matrices, and financial or operational dashboards where users edit cells directly in place

**When not to use**

- A read-only table with sorting and filtering: use [Data Table](https://avaraui.com/docs/reactjs/data-table)
- A simple static table: use [Table](https://avaraui.com/docs/reactjs/table)

**Agent notes**

- `DataGridBlock` accepts `columns` (`{ field, headerName }[]`), `data` (row objects), `onChange`, `readOnly`, and `color`.
- Each `field` in `columns` must match a key on the row objects; arrow keys, `Tab`, `Enter`, and double-click editing work out of the box.
- Pass `readOnly={true}` to disable editing while preserving keyboard cell navigation.
- Pass `data` as a stable reference (state or a constant): the grid re-syncs whenever the `data` prop changes identity, so an array literal created in render resets edits.
- The title row, description and `Export CSV` button render only when `title` or `description` is set.
- It renders every row with no virtualization or pagination, and a column whose `field` is `"status"` is drawn as a coloured pill.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DataGridBlock` | `columns` | `GridColumn[]` | Required | Defines the schema, headers, and specific behaviors of the grid columns. See the GridColumn object reference below. |
| `DataGridBlock` | `data` | `Record<string, any>[]` | Required | The array of row objects to display in the grid. The keys in these objects must perfectly match the `field` strings defined in your columns array. |
| `DataGridBlock` | `onChange` | `(newData: T[]) => void` | `undefined` | A callback fired immediately after a user successfully edits and saves a cell value (via Enter, Tab, or clicking away). Returns the newly mutated data array. |
| `DataGridBlock` | `color` | `"blue" \| "indigo" \| "emerald" \| "rose" \| "zinc" \| string` | `"primary"` | The accent color applied to the active cell's focus ring, the corner handle, the header tint and the export button. Accepts a preset name or a custom hex code. |
| `DataGridBlock` | `showRowNumbers` | `boolean` | `true` | If true, renders a left-hand column displaying the 1-based index of every row. |
| `DataGridBlock` | `readOnly` | `boolean` | `false` | If true, globally disables all double-click and keyboard editing capabilities across the entire grid, while preserving the ability to navigate via arrow keys. |
| `DataGridBlock` | `title` | `string` | `undefined` | An optional header title displayed above the grid (e.g. &quot;Financial Ledger&quot;). |
| `DataGridBlock` | `description` | `string` | `undefined` | An optional subtitle or instructions rendered below the title. |
| `DataGridBlock` | `showExport` | `boolean` | `true` | Whether to render the built-in &quot;Export CSV&quot; button in the header. The header only appears when `title` or `description` is set. |
| `DataGridBlock` | `exportFileName` | `string` | `undefined` | Custom file name for the downloaded CSV file. Without it the name is the slugified `title` plus `.csv`, or `data-grid.csv` when there is no title. |
| `DataGridBlock` | `onExport` | `(data: T[]) => void` | `undefined` | Optional callback triggered when the user clicks the &quot;Export CSV&quot; button. |

### GridColumn Object

| Object | Property | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `GridColumn` | `field` | `string` | Required | The object key to look up in your `data` array to populate this specific column's cells. |
| `GridColumn` | `headerName` | `string` | Required | The human-readable title displayed inside the sticky table header for this column. |
| `GridColumn` | `width` | `string \| number` | `120` | The minimum width of the column. Can be a number (pixels) or a CSS string (e.g., `"250px"`). |
| `GridColumn` | `type` | `"text" \| "number"` | `"text"` | Determines the underlying HTML input type rendered during inline editing. Setting this to `"number"` also applies a monospaced font to the cell values and stores edits as numbers (an empty or invalid entry becomes `0`). |
| `GridColumn` | `readOnly` | `boolean` | `false` | If true, completely locks editing capabilities for this specific column (e.g., for auto-generated IDs or timestamps), even if the global grid itself is editable. |

## Works with other components

- Combine `DataGridBlock` with [Data Table](https://avaraui.com/docs/reactjs/data-table) for filterable read-only reporting.
- Use [Table](https://avaraui.com/docs/reactjs/table) for simple static tables.
- Pair it with [Toast](https://avaraui.com/docs/reactjs/toast) to confirm cell saves from `onChange`.

## What keyboard shortcuts does DataGridBlock support?

Click a cell, then use the arrow keys to move and `Tab` or `Shift+Tab` to flow across rows. `Enter` or `F2` starts editing, as does typing a character, and `Enter` again saves and drops one row. `Tab` saves and moves right, `Escape` cancels an edit, and `Delete` or `Backspace` clears the cell.

## Does DataGridBlock require external grid libraries?

No grid library is needed. `DataGridBlock` handles cell focus and inline editing with its own `{ row, col }` state, and its only npm dependency is `lucide-react` for the export icon. The file has no `next/*` imports, so it works the same way in Next.js and Vite projects.

## How do I get edited rows back into my state or API?

Pass `onChange`. It receives the whole updated array after a save from `Enter`, `Tab` or clicking away, and after `Delete` clears a cell. Hold the rows in `useState` and pass the setter. Keep the `data` reference stable, because the grid resets its rows whenever that prop changes identity.

## How do number columns behave when editing?

Set `type: "number"` on the column. The editor becomes an `input type="number"`, the cell uses a monospaced font, and the saved value is stored as a number. An empty or invalid entry is saved as `0`, not as an empty cell, so validate it in `onChange` if blanks matter.

## How do I lock one column but keep the rest editable?

Set `readOnly: true` on that `GridColumn`. Its cells show dimmed, cannot be edited and are skipped by `Delete`, while other columns stay editable. The grid-level `readOnly` prop locks every column. In both cases, arrow-key navigation still works, so people can move through and read the cells.

## How do I export DataGridBlock to CSV?

Set a `title` or `description`, and the header shows an `Export CSV` button, enabled by default through `showExport`. It downloads every row and column with values in quotes. Use `exportFileName` to set the file name, which otherwise comes from the title, and `onExport` to react after the download.

---

Live previews and every example: https://avaraui.com/docs/nextjs/data-grid
