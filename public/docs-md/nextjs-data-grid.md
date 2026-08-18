# Data Grid

A high-performance, fully keyboard-navigable data table with Excel-style inline editing.

Building an interactive spreadsheet is notoriously difficult. Most developers give up and install massive, 500kb third-party libraries just to get basic arrow-key navigation.

This `DataGridBlock` is built **100% dependency-free**. It manages focus through a highly optimized internal roving coordinate state (`{row, col}`) rather than attaching thousands of DOM event listeners. It fully supports `ArrowUp/Down/Left/Right` navigation, `Tab` flow, `Enter` to edit/save, and instantly updates the underlying data array.

## Examples

Click any cell and drive the grid from the keyboard: arrows to move, `Tab` to flow, `Enter` (or a double-click) to edit, `Enter` again to save and drop to the next row.

export const usageDefault = `import { useState } from "react";

const COLUMNS = [
  { field: "id", headerName: "Transaction ID", width: 120, readOnly: true },
  { field: "customer", headerName: "Customer Name", width: 200 },
  { field: "amount", headerName: "Amount ($)", type: "number", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "date", headerName: "Date", width: 140 },
];

const INITIAL_DATA = [
  { id: "TX-101", customer: "Acme Corp", amount: 4500.5, status: "Paid", date: "2023-10-12" },
  { id: "TX-102", customer: "Global Tech", amount: 1200, status: "Pending", date: "2023-10-14" },
];

export default function Ledger() {
  const [data, setData] = useState(INITIAL_DATA);

  return (
    
  );
}`;

export const usageSchema = `import { useState } from "react";

// The grid is entirely column-driven: \`type\` picks the editor, \`width\`
// pins the column, and \`readOnly\` locks it against edits.
const COLUMNS = [
  { field: "id", headerName: "User ID", width: 100, readOnly: true },
  { field: "name", headerName: "Full Name", width: 250 },
  { field: "score", headerName: "Test Score", type: "number", width: 150 },
];

const INITIAL_DATA = [
  { id: "U-01", name: "Alice Smith", score: 95 },
  { id: "U-02", name: "Bob Jones", score: 82 },
];

export default function Gradebook() {
  const [data, setData] = useState(INITIAL_DATA);

  return ;
}`;

export const usageNoRowNumbers = `"use client";

export default function GridWithoutGutter() {
  const [data, setData] = useState(ROWS);

  return (
    
  );
}`;

export const usageReadOnly = `import { DataGridBlock } from "@/components/custom/blocks/DataGridBlock";

export default function ReadOnlyGrid() {
  // Keyboard navigation still works — only editing is disabled.
  return ;
}`;

## Installation

## Features
Explore the Data Grid's powerful features for displaying complex datasets, including virtualized scrolling, cell editing, and column resizing.

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

          DataGridBlock

          columns

          GridColumn[]

          Required

          Defines the schema, headers, and specific behaviors of the grid
          columns. See the GridColumn object reference below.

          DataGridBlock

          data

          Record&lt;string, any&gt;[]

          Required

          The array of row objects to display in the grid. The keys in these
          objects must perfectly match the field strings defined in
          your columns array.

          DataGridBlock

          onChange

          (newData: Record&lt;string, any&gt;[]) =&gt; void

          undefined

          A callback fired immediately after a user successfully edits and saves
          a cell value (via Enter, Tab, or clicking away). Returns the newly
          mutated data array.

          DataGridBlock

          color

          "blue" | "indigo" | "emerald" | "rose" | "zinc" | string

          "blue"

          The accent color applied to the active cell's focus ring and the
          interactive drag handle. Fully supports custom hex codes.

          DataGridBlock

          showRowNumbers

          boolean

          true

          If true, renders a sticky left-aligned column displaying the 1-based
          index of every row.

          DataGridBlock

          readOnly

          boolean

          false

          If true, globally disables all double-click and keyboard editing
          capabilities across the entire grid, while preserving the ability to
          navigate via arrow keys.

### GridColumn Object

        Object
        Property
        Type
        Default
        Description

          GridColumn

          field

          string

          Required

          The object key to look up in your data array to populate
          this specific column's cells.

          GridColumn

          headerName

          string

          Required

          The human-readable title displayed inside the sticky table header for
          this column.

          GridColumn

          width

          string | number

          120

          The fixed and minimum width of the column. Can be a number (pixels) or
          a CSS string (e.g., "250px").

          GridColumn

          type

          "text" | "number"

          "text"

          Determines the underlying HTML input type rendered during inline
          editing. Setting this to "number" also applies a
          monospaced font to the cell values for better numerical alignment.

          GridColumn

          readOnly

          boolean

          false

          If true, completely locks editing capabilities for this specific
          column (e.g., for auto-generated IDs or timestamps), even if the
          global grid itself is editable.

---

**Component Path:** `nextjs\data-grid\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
