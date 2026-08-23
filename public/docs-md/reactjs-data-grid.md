# Data Grid

A high-performance, fully keyboard-navigable data table with Excel-style inline editing.

Building an interactive spreadsheet is notoriously difficult. Most developers give up and install massive, 500kb third-party libraries just to get basic arrow-key navigation.

This `DataGridBlock` is built **100% dependency-free**. It manages focus through a highly optimized internal roving coordinate state (`{row, col}`) rather than attaching thousands of DOM event listeners. It fully supports `ArrowUp/Down/Left/Right` navigation, `Tab` flow, `Enter` to edit/save, and instantly updates the underlying data array.

Click any cell and drive the grid from the keyboard: arrows to move, `Tab` to flow, `Enter` (or a double-click) to edit, `Enter` again to save and drop to the next row.

export const gridSchema = `import { type GridColumn } from "@/components/custom/blocks/DataGridBlock";

const COLUMNS: GridColumn[] = [
  { field: "id", headerName: "Transaction ID", width: 120, readOnly: true },
  { field: "customer", headerName: "Customer Name", width: 200 },
  { field: "amount", headerName: "Amount ($)", type: "number", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "date", headerName: "Date", width: 140 },
];

const ROWS = [
  { id: "TX-101", customer: "Acme Corp", amount: 4500.5, status: "Paid", date: "2023-10-12" },
  { id: "TX-102", customer: "Global Tech", amount: 1200.0, status: "Pending", date: "2023-10-14" },
  { id: "TX-103", customer: "Stark Ind.", amount: 8900.25, status: "Overdue", date: "2023-09-30" },
  { id: "TX-104", customer: "Wayne Ent.", amount: 15500.0, status: "Paid", date: "2023-10-01" },
  { id: "TX-105", customer: "Initech", amount: 340.0, status: "Paid", date: "2023-10-15" },
  { id: "TX-106", customer: "Soylent Corp", amount: 950.75, status: "Pending", date: "2023-10-16" },
  { id: "TX-107", customer: "Umbrella Corp", amount: 12000.0, status: "Paid", date: "2023-10-10" },
  { id: "TX-108", customer: "Massive Dynamic", amount: 450.0, status: "Paid", date: "2023-10-05" },
];`;

export const usageDefault = `${gridSchema}

export default function Ledger() {
  const [data, setData] = useState[]>(ROWS);

  return (

            Financial Ledger
          
          Double-click any cell or press Enter to edit.

          Export CSV

  );
}`;

export const usageReadOnly = `import { DataGridBlock } from "@/components/custom/blocks/DataGridBlock";

${gridSchema}

export default function ReadOnlyGrid() {
  // Keyboard navigation still works — only editing is disabled.
  return (

            Financial Ledger
          
          View mode only.

          Export CSV

  );
}`;

## Installation

## Examples

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

          (newData: T[]) =&gt; void

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

**Component Path:** `[framework]\data-grid\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
