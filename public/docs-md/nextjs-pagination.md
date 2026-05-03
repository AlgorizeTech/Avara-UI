# Pagination

A complex navigation component that intelligently handles page rendering, ellipsis calculation, and edge bounds.

Building pagination logic from scratch is notoriously difficult. If you have 100 pages, you can't render 100 buttons. This `PaginationBlock` automatically calculates the optimal view (e.g., `1, 2, ..., 4, 5, 6, ..., 100`) based on the current active page, the total number of pages, and your specified sibling count. It also seamlessly disables the "Next" and "Previous" controls when you hit the edges.

## Interactive Showcase

Use the control panel below to test the calculation logic. Try dragging the `Total Pages` slider all the way up to 100, and then click through the page numbers in the preview to see how the ellipses dynamically shift to keep the UI clean.

---

## Installation

### Copy the Component

This component is **100% dependency-free**. It uses standard React `useMemo` hooks to calculate the page ranges and Tailwind CSS for the styling.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/PaginationBlock.tsx`.

---

## Usage

You must maintain the `currentPage` state in your parent component. Pass this state, along with the `totalPages`, into the `Pagination` component, and it will handle the rest.

```tsx

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25; // Typically calculated from your API response

  return (

  );
}
```

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

          1

          Determines how many page buttons to show on either side of the{" "}
          currentPage before rendering an ellipsis. Increase this
          for wider desktop screens.

          showEdges

          boolean

          true

          If true, renders the "Previous" and "Next" control buttons on the
          extreme left and right of the pagination block.

---

**Component Path:** `nextjs\pagination\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
