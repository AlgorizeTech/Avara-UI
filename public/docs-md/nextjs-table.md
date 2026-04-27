# Table

A highly functional, fully customizable data table component engineered for modern dashboards.

We've removed the rigid, static feeling of standard HTML tables by injecting **motion and interaction**. This component features **GSAP Staggered Entrances**, **Expandable Accordion Rows**, Column Sorting, Pagination, and Action Buttons, all while seamlessly adapting to your dynamic theme colors.

## Interactive Showcase

Use the control panel below to test the different sizing options, structural variants, and toggle interactive features.

- Toggle **Expandable Rows** on, then click any row in the table to see the smooth CSS Grid expansion effect.
- Try clicking the column headers (like _Customer_ or _Amount_) to see the built-in sorting logic trigger the GSAP row-reordering animation.
- Hover over the right edge of any row to see the Edit/Delete action buttons smoothly slide into view.

---

## Installation

### 1. Install Dependencies

This component relies on `gsap` for the entrance animations and `lucide-react` for standard UI icons (Chevron Up/Down, Check, Edit, Trash).

```bash
npm install gsap lucide-react
```

## Props Reference

Main Component Props

        Prop
        Type
        Default
        Description

          data

          T[]

          Required

          An array of objects representing your rows.{" "}
          
            Every object must contain a unique id property.

          columns

          TableColumn[]

          Required

          Defines the headers and data mapping (see Column Definition below).

          expandable

          boolean

          false

          If true, rows become clickable. Clicking a row expands it to show the
          content returned by renderExpanded.

          renderExpanded

          (row: T) =&gt; ReactNode

          undefined

          A function that returns the JSX to render inside the expanded
          accordion area beneath a row.

          selectable

          boolean

          false

          If true, injects a column of checkboxes allowing users to select rows.

          pagination

          &#123; itemsPerPage: number &#125;

          undefined

          If provided, automatically chunks the data and displays a pagination
          bar at the bottom.

          onSelectionChange

          (rows: T[]) =&gt; void

          undefined

          Callback returning an array of the currently selected row objects.

          onEdit / onDelete

          (row: T) =&gt; void

          undefined

          If provided (and an "actions" column exists),
          automatically renders Edit and Trash icons mapped to these functions.

Column Definition (TableColumn&lt;T&gt;)

        Property
        Type
        Description

          key

          keyof T | "actions"

          The object key to map to this column. Use "actions" to
          render the edit/delete buttons.

          label

          string
        
        The text displayed in the table header.

          sortable

          boolean

          If true, the column header becomes clickable, automatically sorting
          the data alphabetically or numerically based on that key.

          align

          "left" | "center" | "right"

          Controls text alignment for both the header and the cells in this
          column. Defaults to left.

          render

          (row: T) =&gt; ReactNode

          An optional function to override the default text rendering, allowing
          you to insert React components (badges, avatars, multiple fields) into
          the cell.

---

**Component Path:** `nextjs\table\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
