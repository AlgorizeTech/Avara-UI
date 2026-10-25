export const metadata = docsPageMetadata("data-table");

# Data Table

A powerful, fully-featured data table component built on top of [Table](./table) primitives. It provides built-in state management for **Global Searching, Multi-Column Sorting, Pagination, Row Selection, and Batch Actions** — giving you complete control over your table layout without forcing any data transformation.

export const usageBasic = `const now = Date.now();
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

const ROLE_STYLES: Record = {
  Admin: "bg-[#ede9fe] text-[#5b21b6] dark:bg-purple-500/10 dark:text-purple-400",
  Manager: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Developer: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Editor: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Viewer: "bg-muted text-muted-foreground",
};

const STATUS_STYLES: Record = {
  Active: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Inactive: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Banned: "bg-[#fee2e2] text-[#991b1b] dark:bg-red-500/10 dark:text-red-400",
};

const Pill = ({ styles, children }: { styles: string; children: React.ReactNode }) => (
  
    {children}
  
);

const getDotClass = (ts: number) => {
  const diff = (now - ts) / 60000;
  if (diff (INITIAL_DATA);

  const handleBatchDelete = (ids: (string | number)[]) => {
    if (confirm(\`Are you sure you want to delete \${ids.length} users?\`)) {
      setData((prev) => prev.filter((d) => !ids.includes(d.id)));
    }
  };

  return (
     row.id}>

            Name
            Role
            Status
             row.lastActiveTs}
              sortId="lastActive"
              sortType="number"
            >
              Last Active

              Sessions

         animate>
          {(rows) =>
            rows.length === 0 ? (
              No users match that search.
            ) : (
              rows.map((row) => (

                    {row.name}

                    {row.role}

                    {row.status}

                      {row.lastActive}

                  {row.sessions}
                
              ))
            )
          }

        {({ selectedIds, clearSelection }) => (
          
             alert(\`Edit \${selectedIds.length} items\`)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-semibold bg-current/20 hover:bg-current/30 transition-colors cursor-pointer"
            >
               Edit
            
             {
                handleBatchDelete(selectedIds);
                clearSelection();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-semibold bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
            >
               Delete

        )}

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/table.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/table
```

## Soft variant

`variant="soft"` is the admin-dashboard look: a rounded panel on a hairline ring, a tinted header band, pill controls and calm round row actions, every tint mixed from the table colour. Everything below lives inside the panel — status tabs with live counts, select filters, search, a reset, the page's actions, sortable columns with a pinned actions column, a rows-per-page picker, pagination and a floating bar for the selected rows. The first example on this page is a soft table — its Usage tab is the preview's exact source.

    The parts that come with it
    DataTableTabs, DataTableFilter and DataTableReset filter and clear; TableAction is the toolbar button (primary, secondary, ghost); TableRowAction is a round icon button that needs a label; TableBadge is a status pill (tone) or, without its dot, a tag; TablePerson draws an avatar with a name and a second line; DataTableBatchAction goes inside the batch bar. They work in every variant and take the soft look inside a soft table.

    Empty results explain themselves
    Give DataTableEmpty an icon, title, description and action, and read search, isFiltered and resetAll from useDataTable (in table-core) to say whether nothing matched or nothing exists yet — the example's NoUsers does exactly that.

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

        Component
        Prop
        Type
        Default
        Description

        DataTable
        data
        T[]
        Required
        Your rows, in whatever shape they arrive.

        DataTable
        getRowId
        (row: T) =&gt; string | number
        id → _id → uuid
        How a row is identified for selection and expansion.

        DataTable
        getSearchText
        (row: T) =&gt; string
        all values
        Override what the search box matches against.

        DataTable
        initialSort
        {`{ id, direction?, type? }`}
        undefined
        Sort applied on first render.

        DataTable
        pageSize
        number
        2nd option
        Starting page size.

        DataTable
        pageSizeOptions
        number[]
        [5, 10, 25, 50]
        Choices offered by DataTablePageSize.

        DataTable
        onSelectionChange
        (rows: T[]) =&gt; void
        —
        Fires when the selection changes, with the full row objects.

        DataTable
        variant
        "default" | "minimal" | "glass" | "soft"
        "default"
        Visual skin of the container, rows and every control. soft is the admin-dashboard look shown above.

        DataTable
        color
        "primary" | "indigo" | "rose" | "emerald" | "zinc" | string
        "primary"
        Accent theme color for active selection, soft borders, hover highlights, and active elements. Accepts preset names or custom hex codes.

        DataTable
        size
        "sm" | "md" | "lg"
        "md"
        Density padding and text sizing for table cells and toolbars.

        DataTableHead
        sortBy
        string | ((row: T) =&gt; unknown)
        —
        A dot path such as "profile.name", or an accessor function. Its presence makes the header sortable.

        DataTableHead
        sortId
        string
        the path
        Required only when sortBy is a function.

        DataTableHead
        sortType
        "auto" | "string" | "number" | "date"
        "auto"
        auto compares numbers numerically and everything else as text.

        DataTableHead
        align
        "left" | "center" | "right"
        "left"
        Text alignment.

        DataTableBatchBar
        children
        {`((args: { selectedRows: T[]; selectedIds: (string | number)[]; clearSelection: () => void }) => ReactNode) | ReactNode`}
        —
        Render function or nodes for the floating batch actions bar.

        DataTableBatchBar
        floating
        boolean
        true
        Floats over the bottom center of the table when true; set false for inline rendering.

        DataTableSearch
        placeholder
        string
        "Search…"
        Placeholder text for the search input box.

        DataTableSelectAll
        className
        string
        —
        Header checkbox to select or deselect all rows on the current page.

        DataTableSelect
        className
        string
        —
        Row checkbox to select or deselect the specific row.

        DataTableSelect
        label
        string
        "Select row"
        Accessible name of the row checkbox, e.g. Select Priya Nair.

        DataTableHead, DataTableCell
        sticky
        boolean
        false
        Pins the column to the right edge. Set it on the head and on every cell of the column.

        DataTableTabs
        by
        string | ((row: T) =&gt; unknown)
        Required
        The field the tabs filter on — a dot path or an accessor function (add filterId for functions).

        DataTableTabs
        tabs
        {`{ value: string; label: ReactNode }[]`}
        Required
        One tab per value. The tab whose value is allValue shows every row.

        DataTableTabs
        allValue
        string
        "all"
        The value of the show-everything tab.

        DataTableTabs
        showCounts
        boolean
        true
        Each tab shows how many rows it would leave, counting the search and the other filters.

        DataTableFilter
        by
        string | ((row: T) =&gt; unknown)
        Required
        The field to match exactly (an array field matches any of its entries). Add filterId for functions.

        DataTableFilter
        options
        {`(string | { label: string; value: string })[]`}
        Required
        The choices. Use objects when the stored value differs from the label.

        DataTableFilter
        placeholder
        string
        Required
        Shown while nothing is chosen, e.g. Role. Also names the filter for screen readers unless you pass label.

        DataTableFilter
        side
        "top" | "bottom"
        "bottom"
        Which way the menu opens.

        DataTableReset
        variant
        "primary" | "secondary" | "ghost"
        "ghost"
        Clears the search, every filter and the sort. Renders only while there is something to clear; takes every TableAction prop.

        DataTablePageSize
        side
        "top" | "bottom"
        "top" in soft
        Which way the menu opens. The soft picker sits in the footer, so it opens upward.

        DataTableBatchBar
        noun
        [string, string]
        —
        Singular and plural for the count: ["user", "users"] reads “3 users selected”.

        DataTableBatchAction
        tone
        "default" | "danger"
        "default"
        A button for the batch bar; danger for destructive actions.

        DataTableEmpty
        icon, title, description, action
        ReactNode
        —
        A full empty state: an icon chip, what is missing, what to do, and a button. Without them it is the one-line message it always was.

        TableAction
        variant
        "primary" | "secondary" | "ghost"
        "secondary"
        A toolbar button in the table's look. Icons passed as children are sized for you.

        TableAction
        size
        "sm" | "md"
        "md"
        Button height and text size.

        TableRowAction
        label
        string
        Required
        A round icon button for a row; label is its accessible name and hover title. Group them in TableRowActions (always visible in soft).

        TableRowAction
        tone
        "default" | "danger"
        "default"
        danger turns red on hover.

        TableBadge
        tone
        "neutral" | "success" | "warning" | "danger" | "info"
        "neutral"
        The status colour. The label always shows, so colour is never the only signal.

        TableBadge
        dot
        boolean
        true
        Turn it off for a plain tag.

        TablePerson
        name
        string
        Required
        The name; the initials take a colour kept per name when there is no photo.

        TablePerson
        description
        ReactNode
        —
        A muted second line, e.g. an email.

        TablePerson
        src
        string
        —
        A photo. If it fails to load, the initials show.

        TablePerson
        imageComponent
        ElementType
        "img"
        Renders the photo — pass next/image in a Next.js app.

---

**Component Path:** `[framework]\data-table\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
