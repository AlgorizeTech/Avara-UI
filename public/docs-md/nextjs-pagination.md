export const metadata = docsPageMetadata("pagination");

# Pagination

A complex navigation component that intelligently handles page rendering, ellipsis calculation, and edge bounds.

Building pagination logic from scratch is notoriously difficult. If you have 100 pages, you can't render 100 buttons. This `PaginationBlock` automatically calculates the optimal view (e.g., `1, 2, ..., 4, 5, 6, ..., 100`) based on the current active page, the total number of pages, and your specified sibling count. It also seamlessly disables the "Next" and "Previous" controls when you hit the edges.

Click through the page numbers in each preview to watch the ellipses shift.

export const usageDefault = `"use client";

export default function BasicPagination() {
  // You own the page state — the component only reports the new number.
  const [currentPage, setCurrentPage] = useState(1);

  return (
    
  );
}`;

export const usageSiblingCount = `"use client";

export default function TightPagination() {
  const [currentPage, setCurrentPage] = useState(50);

  // siblingCount is how many numbers sit either side of the active page.
  // 1 keeps the control narrow on mobile; the default is 2.
  return (
    
  );
}`;

export const usageControls = `"use client";

export default function ControlledPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 240;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
     {
        setPageSize(size);
        setCurrentPage(1);
      }}
    />
  );
}`;

export const usagePageSelect = `"use client";

export default function DropdownJump() {
  const [currentPage, setCurrentPage] = useState(7);

  // Every page is listed in a ; best when totalPages stays modest.
  return (
    
  );
}`;

export const usageTable = `"use client";

export default function CustomerDirectory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (

          Customer Directory
          
            Showing {start} to {end} of {totalItems} entries

       {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    
  );
}`;

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

## Examples

## Props Reference

        Prop
        Type
        Default
        Description

          currentPage

          number

          Required

          The currently active page number. Drives the active state styling and
          ellipsis calculation.

          totalPages

          number

          Required
        
        The absolute total number of pages available in your dataset.

          onPageChange

          {`(page: number) => void`}

          undefined

          Callback function fired when a user clicks a page number, or the
          next/previous buttons. It returns the new target page number.

          siblingCount

          number

          2

          Determines how many page buttons to show on either side of the{" "}
          currentPage before rendering an ellipsis. Increase this
          for wider desktop screens.

          showEdges

          boolean

          true

          If true, renders the "Previous" and "Next" control buttons on the
          extreme left and right of the pagination block.

          showPageJump

          boolean

          false

          Shows a "Go to page" control. Values outside{" "}
          1..totalPages are clamped before{" "}
          onPageChange fires.

          pageJumpVariant

          "input" | "select"

          "input"

          "input" is a number field with a Go button;{" "}
          "select" is a dropdown listing every page.

          showPageSize

          boolean

          false

          Shows a "Rows per page" dropdown. Requires pageSize and{" "}
          onPageSizeChange.

          pageSize

          number

          10

          The currently selected rows-per-page value. If it isn't in{" "}
          pageSizeOptions it is added to the list.

          pageSizeOptions

          number[]

          [10, 20, 50, 100]
        
        The choices offered in the rows-per-page dropdown.

          onPageSizeChange

          {`(pageSize: number) => void`}

          undefined

          Fired when the user picks a new rows-per-page value. Recompute{" "}
          totalPages and usually reset currentPage to 1.

          color

          string

          undefined

          Themes the active page, focus rings, hover states, and dropdown selection highlights — supports preset names (e.g. "indigo", "rose", "emerald", "lavender") or a custom hex string.

---

**Component Path:** `[framework]\pagination\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
