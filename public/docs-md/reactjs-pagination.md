# Pagination

A complex navigation component that intelligently handles page rendering, ellipsis calculation, and edge bounds.

Building pagination logic from scratch is notoriously difficult. If you have 100 pages, you can't render 100 buttons. This `PaginationBlock` automatically calculates the optimal view (e.g., `1, 2, ..., 4, 5, 6, ..., 100`) based on the current active page, the total number of pages, and your specified sibling count. It also seamlessly disables the "Next" and "Previous" controls when you hit the edges.

Click through the page numbers in each preview to watch the ellipses shift.

export const usageDefault = `export default function BasicPagination() {
  // You own the page state — the component only reports the new number.
  const [currentPage, setCurrentPage] = useState(1);

  return (
    
  );
}`;

export const usageSiblingCount = `export default function TightPagination() {
  const [currentPage, setCurrentPage] = useState(50);

  // siblingCount is how many numbers sit either side of the active page.
  // 1 keeps the control narrow on mobile; the default is 2.
  return (
    
  );
}`;

export const usageTable = `const PER_PAGE = 5;

export default function CustomerDirectory() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / PER_PAGE);

  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, totalItems);

  return (

          Customer Directory
          
            Showing {start} to {end} of {totalItems} entries

  );
}`;

## Installation

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

---

**Component Path:** `[framework]\pagination\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
