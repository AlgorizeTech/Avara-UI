# Data Table

The same composable primitives as the [Table](../table), plus a state provider that wires up **search, sorting, pagination, row selection and batch actions** for you.

You still write every row yourself, so the data shape stays yours: nested objects, `_id` instead of `id`, values that are computed rather than stored. `DataTable` never asks you to reshape a response before rendering it.

Every example is live. Search for &ldquo;Admin&rdquo;, sort by **Last Active**, or tick a few rows to bring up the floating batch-actions pill.

_Hint: the Edit button in the batch toolbar opens a fully functional custom modal._

## Anatomy

```tsx
 u._id}>

        Name

      {(rows) =>                          // already searched, sorted and paged
        rows.map((user) => (

            {user.profile.name}
          
        ))
      }

    {({ selectedRows, clearSelection }) => Delete}

```

`DataTableBody` takes a render function and hands you the current page of rows. Everything else is either a layout primitive re-exported from `Table`, or a small wired control that reads the provider.

export const usageBasic = `// Straight off the wire — nested, and keyed by _id.
type User = {
  _id: string;
  profile: { name: string; email: string };
  role: string;
  lastActiveTs: number;
  lastActive: string;
};

export default function UserTable({ users }: { users: User[] }) {
  return (
     user._id}>

            {/* Dot paths reach into nested objects */}
            Name
            Role

            {/* Sort on the timestamp while the cell shows prose */}
             user.lastActiveTs}
              sortId="lastActive"
              sortType="number"
            >
              Last Active

          {(rows) =>
            rows.length === 0 ? (
              No users found.
            ) : (
              rows.map((user) => (
                
                  {user.profile.name}
                  {user.role}
                  {user.lastActive}
                
              ))
            )
          }

  );
}`;

export const usageSelection = `// Add the two checkbox controls and the floating pill. Selection state,
// select-all-on-page and the indeterminate state are all handled for you.

  Name

// …and in each body row — DataTableSelect finds its id from the row prop.

  {user.name}

  {({ selectedRows, selectedIds, clearSelection }) => (
     archive(selectedIds)}>
      Archive {selectedRows.length}
    
  )}
`;

export const usageBatch = `// The pill is yours to fill. It floats over the table by default —
// pass floating={false} to place it inline in the heading instead.

  {({ selectedIds, clearSelection }) => (
    <>
       exportCsv(selectedIds)}>Export CSV
      Clear
    
  )}
`;

export const usageSearch = `// By default every value in the row — however deeply nested — is searchable.
…

// Narrow it when you only want certain fields to match:
 user.profile.name + " " + user.profile.email}
>
  …
`;

export const usageHook = `// Everything the wired controls use is available to you directly.

function ResultCount() {
  const { total, filteredRows, selectedRows, clearSelection } = useDataTable();

  return (
    
      {total} matching · {selectedRows.length} selected
    
  );
}

// Render it anywhere inside .`;

## Installation

## Examples

## Features

    No data transformation
    getRowId resolves id, _id or uuid out of the box, dot paths reach into nested objects, and accessor functions cover anything computed.

    Opt-in controls
    Search, page size, pagination and selection are separate components. Leave one out and the feature is simply not there — no boolean flags to manage.

    Typed sorting
    Numbers compare numerically by default rather than lexically, and sortType lets you force string, number or date comparison.

    Escape hatch
    useDataTable exposes the whole state — rows, search, sort, paging, selection — so you can build your own toolbar or pager on the same provider.

## Best Practices & Guidelines

    Give rows a stable id
    Selection is tracked by id, not by index, so it survives sorting and paging. If your rows have no natural key, derive one before passing the array in — an array index will unselect the wrong row as soon as the order changes.

    Client-side by design
    Search, sort and paging all run over the array you pass in. For server-driven datasets, use the plain Table primitives and drive the query yourself — or keep DataTable for the current page only and supply your own footer.

    Give a function sortBy an id
    A string sortBy doubles as its own identity. When you pass an accessor function, add sortId so the active-sort indicator stays stable across re-renders.

## Props Reference

### `DataTable`

      PropTypeDefaultDescription

      dataT[]RequiredYour rows, in whatever shape they arrive.
      getRowId(row: T) =&gt; string | numberid → _id → uuidHow a row is identified for selection and expansion.
      getSearchText(row: T) =&gt; stringall valuesOverride what the search box matches against.
      initialSort{`{ id, direction?, type? }`}undefinedSort applied on first render.
      pageSizenumber2nd optionStarting page size.
      pageSizeOptionsnumber[][5, 10, 25, 50]Choices offered by DataTablePageSize.
      onSelectionChange(rows: T[]) =&gt; void—Fires when the selection changes, with the full row objects.
      variant / size / color——Passed through to Table.

### `DataTableHead`

      PropTypeDefaultDescription

      sortBystring | ((row: T) =&gt; unknown)—A dot path such as "profile.name", or an accessor function. Its presence makes the header sortable.
      sortIdstringthe pathRequired only when sortBy is a function.
      sortType"auto" | "string" | "number" | "date""auto"auto compares numbers numerically and everything else as text.
      align"left" | "center" | "right""left"Text alignment.

### Wired components

      ComponentNotes

      DataTableBodyChildren are a function receiving the current page of rows. Also takes animate.
      DataTableRowPass row (or rowId) so selection and expansion resolve. Highlights itself when selected.
      DataTableSearchDebounce-free controlled input. Resets to page 1 on change. Accepts placeholder.
      DataTablePageSizePage-size picker. Accepts label, suffix, color.
      DataTableSelectAll / DataTableSelectHeader and row checkboxes. Select-all applies to the current page.
      DataTableBatchBarFloating pill shown while a selection exists. Render function receives {`{ selectedRows, selectedIds, clearSelection }`}. Set floating={`{false}`} for inline.
      DataTableInfoThe &ldquo;Showing 1 to 10 of 42 results&rdquo; line.
      DataTablePaginationPrev / next plus a five-page window.
      DataTableExpandToggle / DataTableExpandedRowRow expansion, tracked by row id.
      DataTableHeading, DataTableContent, DataTableHeader, DataTableCell, DataTableFooter, DataTableEmptyRe-exported unchanged from Table.

### `useDataTable()`

Returns `sourceRows`, `filteredRows`, `rows`, `getRowId`, `search` / `setSearch`, `sort` / `toggleSort`, `page` / `setPage`, `pageSize` / `setPageSize`, `pageSizeOptions`, `totalPages`, `total`, `from`, `to`, `selectedIds`, `selectedRows`, `isSelected`, `toggleRow`, `toggleAllOnPage`, `clearSelection`, `isAllPageSelected`, `isSomePageSelected`, `isExpanded`, `toggleExpanded` and `theme`.

---

**Component Path:** `[framework]\data-table\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
