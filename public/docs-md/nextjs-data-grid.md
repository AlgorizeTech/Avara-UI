# Data Grid

A high-performance, fully keyboard-navigable data table with Excel-style inline editing.

Building an interactive spreadsheet is notoriously difficult. Most developers give up and install massive, 500kb third-party libraries just to get basic arrow-key navigation.

This `DataGridBlock` is built **100% dependency-free**. It manages focus through a highly optimized internal roving coordinate state (`{row, col}`) rather than attaching thousands of DOM event listeners. It fully supports `ArrowUp/Down/Left/Right` navigation, `Tab` flow, `Enter` to edit/save, and instantly updates the underlying data array.

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

## Interactive Showcase

Use the control panel to customize the data grid. Try clicking a cell and using your arrow keys to navigate around. **Press `Enter` or double-click to edit the value, and press `Enter` again to save it and move down!**

## Installation

### Copy the Component

This component leverages standard React state to manage the grid coordinates and standard DOM `scrollIntoView` for automatic scrolling during keyboard navigation. It requires zero external packages.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/DataGridBlock.tsx`.

---

## Usage

Define your `columns` array to declare the schema, and pass in your `data` array. The grid automatically manages the editing state internally and fires the `onChange` callback with the mutated data array whenever a user saves a cell edit.

```tsx

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

  return (
    
       setData(newData)}
        color="#3b82f6"
        showRowNumbers
      />
    
  );
}
```

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

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
