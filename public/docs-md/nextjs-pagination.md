---
title: "Shadcn Pagination"
description: "Shadcn Pagination. A controlled pagination bar (`Pagination`) with automatic ellipsis calculation, `siblingCount`, opt-in `showPageJump` (input or select)."
url: https://avaraui.com/docs/nextjs/pagination
---

# Shadcn Pagination

A controlled pagination bar (`Pagination`) with automatic ellipsis calculation, `siblingCount`, opt-in `showPageJump` (input or select), and `showPageSize` controls.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/pagination.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/pagination
```

## Pagination

Hold `currentPage` yourself and update it from `onPageChange`.

- `currentPage` and `totalPages` are both required — the component holds no state of its own.
- `onPageChange` returns the target page number from a number click or the prev/next buttons.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function BasicPagination() {
  // You own the page state — the component only reports the new number.
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Sibling count

- `siblingCount={2}` is how many numbers flank the active page before an ellipsis. Raise it for wide desktop layouts.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function TightPagination() {
  const [currentPage, setCurrentPage] = useState(50);

  // siblingCount is how many numbers sit either side of the active page.
  // 1 keeps the control narrow on mobile; the default is 2.
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={100}
      onPageChange={setCurrentPage}
      siblingCount={1}
    />
  );
}
```

## Jump to page & rows per page

Both controls are opt-in booleans; the page-size dropdown reports through `onPageSizeChange`.

- `showPageJump` adds a number input — type a page and press Enter, tab away, or hit Go. Out-of-range values clamp to the edges.
- `showPageSize` adds a rows-per-page dropdown. Pass `pageSize`, `pageSizeOptions` and `onPageSizeChange`, then re-derive `totalPages`.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function ControlledPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 240;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      // "Go to page" number input — commits on Enter, blur, or the Go button.
      showPageJump
      // "Rows per page" dropdown. Reset to page 1 so the new range is valid.
      showPageSize
      pageSize={pageSize}
      pageSizeOptions={[10, 20, 50, 100]}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setCurrentPage(1);
      }}
    />
  );
}
```

## Dropdown page picker

- `pageJumpVariant="select"` swaps the free-typed input for a dropdown that lists every page — handy for smaller page counts.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function DropdownJump() {
  const [currentPage, setCurrentPage] = useState(7);

  // Every page is listed in a custom dropdown; best when totalPages stays modest.
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={24}
      onPageChange={setCurrentPage}
      siblingCount={1}
      showPageJump
      pageJumpVariant="select"
    />
  );
}
```

## In a data table

- `totalPages` is yours to derive — `Math.ceil(rows.length / pageSize)` — and pairs naturally with a range readout.

```tsx
"use client";

import { useState } from "react";
import { Pagination } from "@/components/custom/blocks/PaginationBlock";

export default function CustomerDirectory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="border rounded-xl p-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">Customer Directory</h3>
          <p className="text-xs text-muted-foreground">
            Showing {start} to {end} of {totalItems} entries
          </p>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showPageJump
        showPageSize
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 25]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
```

## About Shadcn Pagination

**What it is.** `Pagination` renders page buttons with ellipsis collapsing (`siblingCount`), Previous and Next buttons that disable at the ends, an optional `showPageJump` control (numeric input or `pageJumpVariant="select"` dropdown), and a `showPageSize` rows-per-page dropdown. It draws the controls only; you slice the data.

**How it is built.** Strictly controlled via `currentPage`, `totalPages`, and `onPageChange` so client-side and server-side datasets use the exact same API. Page numbers are buttons, not links, and the rows-per-page and page dropdowns are custom listboxes rather than native `<select>` elements.

**When to use it.** Use `Pagination` below [Table](https://avaraui.com/docs/nextjs/table), search results, and galleries. For built-in client-side pagination, [Data Table](https://avaraui.com/docs/nextjs/data-table) includes one out of the box.

## For AI agents

**When to use**

- Controlled page navigation for tables, search results, or multi-page lists (`currentPage`, `totalPages`, `onPageChange`)

**When not to use**

- Client-side tables that already use [Data Table](https://avaraui.com/docs/nextjs/data-table) built-in pagination

**Agent notes**

- Named export: `import { Pagination } from "@/components/custom/blocks/PaginationBlock"`
- Both `currentPage` (1-based) and `totalPages` are required; re-derive `totalPages` when `onPageSizeChange` updates `pageSize`, and reset `currentPage` to 1.
- Below the `md` breakpoint the number list always uses one sibling and Previous/Next move to their own row, so `siblingCount` only affects wider screens.
- Extra `nav` attributes (`className`, `style`, `id`) pass to the root. The atomic parts (`PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`, `PaginationPageSize`, `PaginationPageJump`) are also named exports.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `currentPage` | `number` | Required | The currently active page number. Drives the active state styling and ellipsis calculation. |
| `totalPages` | `number` | Required | The absolute total number of pages available in your dataset. |
| `onPageChange` | `(page: number) => void` | `undefined` | Callback function fired when a user clicks a page number, or the next/previous buttons. It returns the new target page number. |
| `siblingCount` | `number` | `2` | Determines how many page buttons to show on either side of the `currentPage` before rendering an ellipsis. Increase this for wider desktop screens. |
| `showEdges` | `boolean` | `true` | If true, renders the "Previous" and "Next" control buttons on the extreme left and right of the pagination block. |
| `showPageJump` | `boolean` | `false` | Shows a "Go to page" control. Values outside `1..totalPages` are clamped before `onPageChange` fires. |
| `pageJumpVariant` | `"input" \| "select"` | `"input"` | `"input"` is a number field with a Go button; `"select"` is a dropdown listing every page. |
| `showPageSize` | `boolean` | `false` | Shows a "Rows per page" dropdown. Pair it with `pageSize` and `onPageSizeChange`; without a handler picking a size does nothing. |
| `pageSize` | `number` | `10` | The currently selected rows-per-page value. If it isn't in `pageSizeOptions` it is added to the list. |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | The choices offered in the rows-per-page dropdown. |
| `onPageSizeChange` | `(pageSize: number) => void` | `undefined` | Fired when the user picks a new rows-per-page value. Recompute `totalPages` and usually reset `currentPage` to 1. |
| `color` | `string` | `undefined` | Themes the active page, focus rings, hover states, and dropdown selection highlights. Accepts the presets `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"lavender"`, `"blue"` and `"zinc"`, or any CSS color string such as a hex or `rgb()` value. Unset uses the theme `--primary`. |

## Works with other components

- Drop `Pagination` into `TableFooter` of [Table](https://avaraui.com/docs/nextjs/table) for server-paginated datasets.
- Use [Data Table](https://avaraui.com/docs/nextjs/data-table) when you want client-side paging wired to rows, search and sorting for you.
- Place it at the bottom of a [Card](https://avaraui.com/docs/nextjs/card) that holds a results list or a gallery.

## How does siblingCount decide which page numbers Pagination shows?

`siblingCount` is how many numbers sit either side of `currentPage`. The first and last page always stay visible, with an ellipsis for each gap. When `totalPages` is at most `siblingCount + 5`, every page shows. Below the `md` breakpoint a fixed one-sibling layout is used instead.

## How do I connect Pagination to the Next.js router or a URL?

Read the page from your route, for example a `page` search param, pass it as `currentPage`, and call `router.push` or `setSearchParams` inside `onPageChange`. The numbers are `<button>` elements, not links, so crawlers will not follow them. The file has no `next/*` imports and only needs `lucide-react`.

## How do the jump-to-page controls work in Pagination?

`showPageJump` adds a number input that commits on Enter, blur or the Go button. Values below 1 or above `totalPages` are clamped, and non-numbers reset to the current page. With `pageJumpVariant="select"` it becomes a dropdown listing every page, which suits small page counts.

## How do I add a rows-per-page selector to Pagination?

Set `showPageSize` and pass `pageSize`, `pageSizeOptions` and `onPageSizeChange`. The callback receives a number. Store it, recompute `totalPages` with `Math.ceil(totalItems / pageSize)` and reset `currentPage` to 1. A `pageSize` missing from `pageSizeOptions` is added to the list automatically.

## Is Pagination keyboard and screen reader friendly?

The root is a `nav` labelled "pagination", the active page has `aria-current="page"`, and Previous and Next carry labels. In the dropdowns the trigger is a focusable button and Escape closes the list, but options are chosen with a pointer click, so they have no arrow-key navigation.

## How do I change the Pagination accent color?

Pass `color` as a preset name (`"indigo"`, `"rose"`, `"emerald"`, `"lavender"`, `"blue"`, `"zinc"` or `"primary"`) or any CSS color string. It sets a `--theme-color` variable on the `nav` that tints the active page, focus rings and dropdown highlights. Without `color`, everything follows the theme `--primary` token.

---

Live previews and every example: https://avaraui.com/docs/nextjs/pagination
