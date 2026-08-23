# Advanced Table

A high-performance record management table featuring global search, multi-column sorting, pagination, and an animated batch-action toolbar.

This component is the engine for SaaS dashboards and administrative panels. Unlike our spreadsheet-focused `DataGrid`, this `AdvancedTableBlock` is optimized for displaying, filtering, and manipulating large datasets with a beautiful, modern aesthetic. It perfectly replicates the UI of top-tier platforms with a floating dark-mode batch actions pill and staggered CSS entry animations.

Every example is live. Search for "Admin", sort by "Last Active", or tick a few rows to watch the **floating batch actions toolbar** slide in.

_Hint: the Edit button in the batch toolbar opens a fully functional custom modal._

export const usageDefault = `"use client";

const ROLE_OPTIONS = [
  { label: "— No change —", value: "" },
  { label: "Admin", value: "Admin" },
  { label: "Editor", value: "Editor" },
  { label: "Viewer", value: "Viewer" },
  { label: "Manager", value: "Manager" },
  { label: "Developer", value: "Developer" },
];

const STATUS_OPTIONS = [
  { label: "— No change —", value: "" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
  { label: "Banned", value: "Banned" },
];

const now = Date.now();
const ago = (d: number, h: number = 0) => now - (d * 86400000 + h * 3600000);

interface Employee {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Banned";
  lastActive: string;
  lastActiveTs: number;
  sessions: number;
}

const INITIAL_DATA: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Admin",
    status: "Active",
    lastActive: "2 minutes ago",
    lastActiveTs: ago(0, 0),
    sessions: 142,
  },
  {
    id: 2,
    name: "Bob Martinez",
    role: "Editor",
    status: "Active",
    lastActive: "1 hour ago",
    lastActiveTs: ago(0, 1),
    sessions: 89,
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Viewer",
    status: "Pending",
    lastActive: "3 hours ago",
    lastActiveTs: ago(0, 3),
    sessions: 12,
  },
  {
    id: 4,
    name: "David Lee",
    role: "Manager",
    status: "Active",
    lastActive: "Yesterday",
    lastActiveTs: ago(1),
    sessions: 201,
  },
  {
    id: 5,
    name: "Eva Chen",
    role: "Developer",
    status: "Inactive",
    lastActive: "3 days ago",
    lastActiveTs: ago(3),
    sessions: 54,
  },
  {
    id: 6,
    name: "Frank Nguyen",
    role: "Editor",
    status: "Active",
    lastActive: "5 days ago",
    lastActiveTs: ago(5),
    sessions: 76,
  },
  {
    id: 7,
    name: "Grace Park",
    role: "Viewer",
    status: "Banned",
    lastActive: "2 weeks ago",
    lastActiveTs: ago(14),
    sessions: 3,
  },
  {
    id: 8,
    name: "Hank Torres",
    role: "Admin",
    status: "Active",
    lastActive: "30 minutes ago",
    lastActiveTs: ago(0, 0.5),
    sessions: 310,
  },
  {
    id: 9,
    name: "Iris Scott",
    role: "Manager",
    status: "Active",
    lastActive: "4 hours ago",
    lastActiveTs: ago(0, 4),
    sessions: 188,
  },
  {
    id: 10,
    name: "James Kim",
    role: "Developer",
    status: "Pending",
    lastActive: "1 week ago",
    lastActiveTs: ago(7),
    sessions: 29,
  },
  {
    id: 11,
    name: "Karen Brown",
    role: "Viewer",
    status: "Active",
    lastActive: "10 minutes ago",
    lastActiveTs: ago(0, 0.17),
    sessions: 67,
  },
  {
    id: 12,
    name: "Liam Davis",
    role: "Editor",
    status: "Inactive",
    lastActive: "1 month ago",
    lastActiveTs: ago(30),
    sessions: 22,
  },
  {
    id: 13,
    name: "Mia Wilson",
    role: "Developer",
    status: "Active",
    lastActive: "2 days ago",
    lastActiveTs: ago(2),
    sessions: 95,
  },
  {
    id: 14,
    name: "Noah Anderson",
    role: "Manager",
    status: "Active",
    lastActive: "6 hours ago",
    lastActiveTs: ago(0, 6),
    sessions: 134,
  },
  {
    id: 15,
    name: "Olivia Thomas",
    role: "Viewer",
    status: "Banned",
    lastActive: "3 months ago",
    lastActiveTs: ago(90),
    sessions: 1,
  },
];

const getDotClass = (ts: number) => {
  const diff = (now - ts) / 60000;
  if (diff (INITIAL_DATA);

  // Custom Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIds, setEditingIds] = useState([]);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const columns: TableColumn[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => (
        
          {row.name}
        
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => {
        const map: Record = {
          Admin:
            "bg-[#ede9fe] text-[#5b21b6] dark:bg-purple-500/10 dark:text-purple-400",
          Manager:
            "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
          Developer:
            "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
          Editor:
            "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
          Viewer:
            "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
        };
        return (
          
            {row.role}
          
        );
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => {
        const map: Record = {
          Active:
            "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
          Pending:
            "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
          Inactive:
            "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
          Banned:
            "bg-[#fee2e2] text-[#991b1b] dark:bg-red-500/10 dark:text-red-400",
        };
        return (
          
            {row.status}
          
        );
      },
    },
    {
      key: "lastActiveTs",
      header: "Last Active",
      sortable: true,
      sortType: "number",
      render: (row) => (

          {row.lastActive}
        
      ),
    },
    {
      key: "sessions",
      header: "Sessions",
      sortable: true,
      sortType: "number",
    },
  ];

  const handleBatchDelete = (ids: string[]) => {
    if (confirm(\`Are you sure you want to delete \${ids.length} users?\`)) {
      setData(data.filter((d) => !ids.includes(String(d.id))));
    }
  };

  const handleOpenEditModal = (ids: string[]) => {
    setEditingIds(ids);
    setEditRole("");
    setEditStatus("");
    setIsEditModalOpen(true);
  };

  const applyEdits = () => {
    setData(
      data.map((row) => {
        if (editingIds.includes(String(row.id))) {
          return {
            ...row,
            role: editRole || row.role,
            status: (editStatus || row.status) as any,
          };
        }
        return row;
      }),
    );
    setIsEditModalOpen(false);
  };

  const editingNames = data
    .filter((d) => editingIds.includes(String(d.id)))
    .map((d) => d.name);
  const subtitleText =
    editingNames.length 

      {/* CUSTOM EDIT MODAL */}
       {
          if (e.target === e.currentTarget) setIsEditModalOpen(false);
        }}
      >

                Edit Selected Users
              
              {subtitleText}
            
             setIsEditModalOpen(false)}
              className="w-7 h-7 rounded-lg bg-[#f3f4f6] dark:bg-zinc-800 text-[#6b7280] dark:text-zinc-400 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >

              Role

              Status

             setIsEditModalOpen(false)}
              className="flex-1 p-[10px] rounded-[10px] text-[13px] font-semibold bg-[#f3f4f6] dark:bg-zinc-800 text-[#374151] dark:text-zinc-300 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 transition-colors active:scale-95"
            >
              Cancel

              Apply Changes

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
