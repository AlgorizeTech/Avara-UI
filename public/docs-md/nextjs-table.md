# Table

A highly functional, fully customizable data table component engineered for modern dashboards.

We've removed the rigid, static feeling of standard HTML tables by injecting **motion and interaction**. This component features **GSAP Staggered Entrances**, **Expandable Accordion Rows**, Column Sorting, Pagination, and Action Buttons, all while seamlessly adapting to your dynamic theme colors.

## Examples

Every example below is live: click a column header (like _Customer_ or _Amount_) to trigger the GSAP row-reordering animation, and hover the right edge of a row to reveal the Edit/Delete actions. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

const columns = [
  { key: "id", label: "Invoice", sortable: true },
  { key: "user", label: "Customer", sortable: true },
  { key: "amount", label: "Amount", sortable: true, align: "right" },
  { key: "date", label: "Date", sortable: true, align: "right" },
  { key: "actions", label: "", align: "right" },
];

const data = [
  { id: "INV-3021", user: "Alice Freeman", amount: "$3,200.00", date: "Oct 24, 2023" },
  { id: "INV-3022", user: "Bob Smith", amount: "$850.50", date: "Oct 24, 2023" },
];

export default function TransactionsTable() {
  return (
     console.log("Edit", row)}
      onDelete={(row) => console.log("Delete", row)}
    />
  );
}`;

export const usageMinimal = ``;

export const usageGlass = `// Pair the glass variant with a colored backdrop so the blur has
// something to refract.

`;

export const usageSizes = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

export default function TableSizes() {
  return (

  );
}`;

export const usageSelectable = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

export default function SelectableTable() {
  return (
     console.log(rows.length, "selected")}
    />
  );
}`;

export const usageExpandable = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

export default function ExpandableTable() {
  return (
     (
        
          Transaction Summary
          
            {row.details ?? "No additional transaction history provided."}

      )}
    />
  );
}`;

export const usagePagination = ``;

## Installation

### 1. Install Dependencies

This component relies on `gsap` for the entrance animations and `lucide-react` for standard UI icons (Chevron Up/Down, Check, Edit, Trash).

```bash
npm install gsap lucide-react
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/TableBlock.tsx` and copy the source from the **Code** tab of the first example above.

## Features
Learn about the Table component's structured layout features, designed for displaying tabular data with clean borders and hover effects.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

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

          variant

          "default" | "minimal" | "glass"

          "default"
        
        The surface treatment: a bordered card, a bare table, or a frosted glass panel.

          color

            "primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex string)

          "primary"

          Theme color for checkboxes, selected rows and the active page button.
          Any #rrggbb value is accepted.

          tableSize

          "sm" | "md" | "lg"

          "md"
        
        Row density — controls cell padding and text size.

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
