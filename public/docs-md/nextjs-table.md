# Table

A highly functional, fully customizable data table component engineered for modern dashboards.

We've removed the rigid, static feeling of standard HTML tables by injecting **motion and interaction**. This component features **GSAP Staggered Entrances**, **Expandable Accordion Rows**, Column Sorting, Pagination, and Action Buttons, all while seamlessly adapting to your dynamic theme colors.

Every example below is live: click a column header (like _Customer_ or _Amount_) to trigger the GSAP row-reordering animation, and hover the right edge of a row to reveal the Edit/Delete actions.

export const tableData = `const data = [
  {
    id: "INV-3021",
    user: "Alice Freeman",
    email: "alice@example.com",
    amount: "$3,200.00",
    status: "completed",
    date: "Oct 24, 2023",
    details: "Payment processed via Stripe. Invoice sent to alice@example.com.",
  },
  {
    id: "INV-3022",
    user: "Bob Smith",
    email: "bob@example.com",
    amount: "$850.50",
    status: "processing",
    date: "Oct 24, 2023",
    details: "Waiting for bank confirmation. Usually takes 2-3 business days.",
  },
  {
    id: "INV-3023",
    user: "Carla Nguyen",
    email: "carla@example.com",
    amount: "$1,940.00",
    status: "failed",
    date: "Oct 23, 2023",
    details: "Card declined by the issuing bank. Customer has been notified.",
  },
  {
    id: "INV-3024",
    user: "Daniel Okafor",
    email: "daniel@example.com",
    amount: "$420.00",
    status: "completed",
    date: "Oct 22, 2023",
    details: "Paid on invoice terms, reconciled automatically.",
  },
];

const statusStyles = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const columns = [
  { key: "id", label: "Invoice", sortable: true },
  {
    key: "user",
    label: "Customer",
    sortable: true,
    // \`render\` takes over the whole cell — the row object is the only argument.
    render: (row) => (
      
        {row.user}
        {row.email}
      
    ),
  },
  { key: "amount", label: "Amount", sortable: true, align: "right" },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (row) => (
      
        {row.status}
      
    ),
  },
  { key: "date", label: "Date", sortable: true, align: "right" },
  { key: "actions", label: "", align: "right" },
];`;

export const usageMinimal = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

${tableData}

export default function MinimalTable() {
  return ;
}`;

export const usageExpandable = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

${tableData}

export default function ExpandableTable() {
  return (
     (
        
          Transaction Summary
          
            {row.details ?? "No additional transaction history provided."}

      )}
    />
  );
}`;

export const usagePagination = `import { TableBlock } from "@/components/custom/blocks/TableBlock";

${tableData}

export default function PaginatedTable() {
  return (
    
  );
}`;

## Installation

## Examples

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

**Component Path:** `[framework]\table\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
