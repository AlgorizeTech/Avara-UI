# Advanced Table

A high-performance record management table featuring global search, multi-column sorting, pagination, and an animated batch-action toolbar.

This component is the engine for SaaS dashboards and administrative panels. Unlike our spreadsheet-focused `DataGrid`, this `AdvancedTableBlock` is optimized for displaying, filtering, and manipulating large datasets with a beautiful, modern aesthetic. It perfectly replicates the UI of top-tier platforms with a floating dark-mode batch actions pill and staggered CSS entry animations.

Every example is live. Search for "Admin", sort by "Last Active", or tick a few rows to watch the **floating batch actions toolbar** slide in.

_Hint: the Edit button in the batch toolbar opens a fully functional custom modal._

export const usageDefault = `import { AdvancedTableBlock } from "@/components/custom/blocks/AdvancedTableBlock";

// The \`render\` prop overrides the default text output, so a column can
// return badges, avatars or any other React node.
const COLUMNS = [
  { key: "name", header: "Full Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "lastActiveTs",
    header: "Last Active",
    sortable: true,
    sortType: "number", // number sorting for timestamps
    render: (row) => {row.lastActive},
  },
];

const DATA = [
  { id: 1, name: "Alice", role: "Admin", lastActive: "2 min ago", lastActiveTs: 1690000000 },
  { id: 2, name: "Bob", role: "Editor", lastActive: "1 hr ago", lastActiveTs: 1680000000 },
];

export default function UserManagement() {
  return (
    
       console.log("Deleting:", ids)}
        onBatchEdit={(ids) => console.log("Editing:", ids)}
      />
    
  );
}`;

## Installation

## Features
Learn about the Data Table's robust functionality, featuring built-in sorting, filtering, row selection, and responsive layouts.

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

        Component
        Prop
        Type
        Default
        Description

          AdvancedTableBlock

          data

          T[]

          Required
        
        The array of data objects to display in the table.

          AdvancedTableBlock

          columns

          TableColumn[]

          Required

          Defines the headers, data keys, and custom rendering logic for the
          table columns. See the TableColumn object reference below.

          AdvancedTableBlock

          primaryKey

          keyof T

          Required

          The unique identifier field in your data objects (e.g.,{" "}
          "id" or "uuid"). This is strictly required
          to ensure robust row selection and stable React keys.

          AdvancedTableBlock

          color

          "indigo" | "rose" | "emerald" | "blue" | "zinc" | string

          "indigo"

          The dynamic accent color applied to the search focus ring, selected
          row backgrounds, active checkboxes, and pagination buttons. Fully
          supports custom hex codes.

          AdvancedTableBlock

          searchable

          boolean

          true

          If true, renders a global fuzzy-search input above the table that
          automatically filters the dataset across all stringified object
          values.

          AdvancedTableBlock

          selectable

          boolean

          true

          If true, renders a far-left column of custom checkboxes allowing users
          to select individual rows, or select all rows currently visible on the
          page.

          AdvancedTableBlock

          itemsPerPageOptions

          number[]

          [5, 10, 25, 50]

          An array of numbers that populates the "Show entries" dropdown
          selector in the top-right toolbar.

          AdvancedTableBlock

          onBatchDelete

          (ids: string[]) =&gt; void

          undefined

          If provided, automatically renders a red Trash icon in the floating
          batch toolbar whenever rows are selected. Returns an array of the
          selected primaryKey strings.

          AdvancedTableBlock

          onBatchEdit

          (ids: string[]) =&gt; void

          undefined

          If provided, automatically renders an Edit icon in the floating batch
          toolbar whenever rows are selected. Returns an array of the selected{" "}
          primaryKey strings.

          AdvancedTableBlock

          batchActions

            (selectedIds: string[], clearSelection: () =&gt; void) =&gt;
            ReactNode

          undefined

          If provided, overrides the default Edit/Delete buttons inside the
          floating toolbar, allowing you to inject completely custom action
          buttons or menus.

### TableColumn Object

        Object
        Property
        Type
        Default
        Description

          TableColumn

          key

          string

          Required

          The object key to look up in your data array to populate
          this specific column's default text value.

          TableColumn

          header

          string

          Required

          The human-readable text title displayed inside the sticky table header
          for this column.

          TableColumn

          sortable

          boolean

          false

          If true, adds chevron icons and makes the column header clickable,
          allowing the user to toggle ascending and descending sorts.

          TableColumn

          sortType

          "string" | "number"

          "string"

          Determines the comparison math used when sorting this column. Set this
          to "number" for integers, floats, or parsed timestamps to
          ensure accurate sorting.

          TableColumn

          width

          string

          undefined

          An optional fixed CSS width for the column (e.g., "250px"{" "}
          or "20%") to prevent layout shifts during pagination.

          TableColumn

          render

          (row: T) =&gt; ReactNode

          undefined

          An optional function that allows you to override the default text
          output. Receives the full row object and lets you return custom React
          nodes (like Avatars, formatted Badges, or complex layouts).

---

**Component Path:** `[framework]\data-table\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
