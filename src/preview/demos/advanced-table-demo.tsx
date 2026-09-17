"use client";

import {
  DataTable,
  DataTableBatchBar,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableEmpty,
  DataTableExpandedRow,
  DataTableExport,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableHeading,
  DataTableInfo,
  DataTablePageSize,
  DataTablePagination,
  DataTableRow,
  DataTableSearch,
  DataTableSelect,
  DataTableSelectAll,
  type TableColor,
} from "@/components/custom/blocks/AdvancedTableBlock";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { cn } from "@/lib/utils";
import { Edit2, Trash2, X } from "lucide-react";
import { useState } from "react";

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
  { id: 1, name: "Alice Johnson", role: "Admin", status: "Active", lastActive: "2 minutes ago", lastActiveTs: ago(0, 0), sessions: 142 },
  { id: 2, name: "Bob Martinez", role: "Editor", status: "Active", lastActive: "1 hour ago", lastActiveTs: ago(0, 1), sessions: 89 },
  { id: 3, name: "Carol Williams", role: "Viewer", status: "Pending", lastActive: "3 hours ago", lastActiveTs: ago(0, 3), sessions: 12 },
  { id: 4, name: "David Lee", role: "Manager", status: "Active", lastActive: "Yesterday", lastActiveTs: ago(1), sessions: 201 },
  { id: 5, name: "Eva Chen", role: "Developer", status: "Inactive", lastActive: "3 days ago", lastActiveTs: ago(3), sessions: 54 },
  { id: 6, name: "Frank Nguyen", role: "Editor", status: "Active", lastActive: "5 days ago", lastActiveTs: ago(5), sessions: 76 },
  { id: 7, name: "Grace Park", role: "Viewer", status: "Banned", lastActive: "2 weeks ago", lastActiveTs: ago(14), sessions: 3 },
  { id: 8, name: "Hank Torres", role: "Admin", status: "Active", lastActive: "30 minutes ago", lastActiveTs: ago(0, 0.5), sessions: 310 },
  { id: 9, name: "Iris Scott", role: "Manager", status: "Active", lastActive: "4 hours ago", lastActiveTs: ago(0, 4), sessions: 188 },
  { id: 10, name: "James Kim", role: "Developer", status: "Pending", lastActive: "1 week ago", lastActiveTs: ago(7), sessions: 29 },
  { id: 11, name: "Karen Brown", role: "Viewer", status: "Active", lastActive: "10 minutes ago", lastActiveTs: ago(0, 0.17), sessions: 67 },
  { id: 12, name: "Liam Davis", role: "Editor", status: "Inactive", lastActive: "1 month ago", lastActiveTs: ago(30), sessions: 22 },
  { id: 13, name: "Mia Wilson", role: "Developer", status: "Active", lastActive: "2 days ago", lastActiveTs: ago(2), sessions: 95 },
  { id: 14, name: "Noah Anderson", role: "Manager", status: "Active", lastActive: "6 hours ago", lastActiveTs: ago(0, 6), sessions: 134 },
  { id: 15, name: "Olivia Thomas", role: "Viewer", status: "Banned", lastActive: "3 months ago", lastActiveTs: ago(90), sessions: 1 },
];

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-[#ede9fe] text-[#5b21b6] dark:bg-purple-500/10 dark:text-purple-400",
  Manager: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Developer: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Editor: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Viewer: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
};

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
  Inactive: "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
  Banned: "bg-[#fee2e2] text-[#991b1b] dark:bg-red-500/10 dark:text-red-400",
};

const Pill = ({ styles, children }: { styles: string; children: React.ReactNode }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em]",
      styles,
    )}
  >
    {children}
  </span>
);

const getDotClass = (ts: number) => {
  const diff = (now - ts) / 60000;
  if (diff < 60) return "bg-[#22c55e]";
  if (diff < 60 * 24) return "bg-[#f59e0b]";
  if (diff < 60 * 24 * 7) return "bg-[#ef4444]";
  return "bg-[#9ca3af]";
};

export default function AdvancedTableDemo({
  color,
  searchable = true,
  selectable = true,
  example,
}: {
  color?: TableColor | string;
  searchable?: boolean;
  selectable?: boolean;
  /** Swaps the default batch actions for a custom renderer. */
  example?: "default" | "custom-batch-actions";
}) {
  const [data, setData] = useState<Employee[]>(INITIAL_DATA);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIds, setEditingIds] = useState<(string | number)[]>([]);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleBatchDelete = (ids: (string | number)[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length} users?`)) {
      setData((prev) => prev.filter((d) => !ids.includes(d.id)));
    }
  };

  const handleOpenEditModal = (ids: (string | number)[]) => {
    setEditingIds(ids);
    setEditRole("");
    setEditStatus("");
    setIsEditModalOpen(true);
  };

  const applyEdits = () => {
    setData((prev) =>
      prev.map((row) =>
        editingIds.includes(row.id)
          ? {
              ...row,
              role: editRole || row.role,
              status: (editStatus || row.status) as Employee["status"],
            }
          : row,
      ),
    );
    setIsEditModalOpen(false);
  };

  const editingNames = data
    .filter((d) => editingIds.includes(d.id))
    .map((d) => d.name);
  const subtitleText =
    editingNames.length <= 3
      ? editingNames.join(", ")
      : `${editingNames.slice(0, 3).join(", ")} +${editingNames.length - 3} more`;

  const columnCount = 5 + (selectable ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center justify-center transition-colors duration-300 rounded-2xl p-0 m-0 relative">
      <DataTable
        key={`${searchable}-${selectable}-${example}-${color}`}
        data={data}
        getRowId={(row) => row.id}
        color={color as TableColor}
        pageSizeOptions={[5, 10, 25, 50]}
        className="w-full"
      >
        <DataTableHeading title="Team members">
          {searchable && <DataTableSearch placeholder="Search all columns…" />}
          <div className="flex items-center gap-2">
            <DataTablePageSize color={color as TableColor} />
            <DataTableExport filename="team-members" color={color as TableColor} />
          </div>
        </DataTableHeading>

        <DataTableContent>
          <DataTableHeader>
            <DataTableRow isHeader>
              {selectable && (
                <DataTableHead className="w-11">
                  <DataTableSelectAll />
                </DataTableHead>
              )}
              <DataTableHead sortBy="name">Name</DataTableHead>
              <DataTableHead sortBy="role">Role</DataTableHead>
              <DataTableHead sortBy="status">Status</DataTableHead>
              {/* An accessor function sorts on the timestamp while the cell shows prose. */}
              <DataTableHead
                sortBy={(row: Employee) => row.lastActiveTs}
                sortId="lastActive"
                sortType="number"
              >
                Last Active
              </DataTableHead>
              <DataTableHead sortBy="sessions" sortType="number" align="right">
                Sessions
              </DataTableHead>
            </DataTableRow>
          </DataTableHeader>

          <DataTableBody<Employee> animate>
            {(rows) =>
              rows.length === 0 ? (
                <DataTableEmpty colSpan={columnCount}>
                  No users match that search.
                </DataTableEmpty>
              ) : (
                rows.map((row) => (
                  <DataTableRow key={row.id} row={row}>
                    {selectable && (
                      <DataTableCell className="w-11">
                        <DataTableSelect />
                      </DataTableCell>
                    )}
                    <DataTableCell>
                      <strong className="font-semibold text-foreground">
                        {row.name}
                      </strong>
                    </DataTableCell>
                    <DataTableCell>
                      <Pill styles={ROLE_STYLES[row.role] || ROLE_STYLES.Viewer}>
                        {row.role}
                      </Pill>
                    </DataTableCell>
                    <DataTableCell>
                      <Pill
                        styles={STATUS_STYLES[row.status] || STATUS_STYLES.Inactive}
                      >
                        {row.status}
                      </Pill>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="flex items-center gap-[5px]">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0",
                            getDotClass(row.lastActiveTs),
                          )}
                        />
                        {row.lastActive}
                      </div>
                    </DataTableCell>
                    <DataTableCell align="right">{row.sessions}</DataTableCell>
                  </DataTableRow>
                ))
              )
            }
          </DataTableBody>
        </DataTableContent>

        <DataTableFooter>
          <DataTableInfo />
          <DataTablePagination />
        </DataTableFooter>

        {selectable && (
          <DataTableBatchBar>
            {({ selectedIds, clearSelection }) =>
              example === "custom-batch-actions" ? (
                <>
                  <button
                    onClick={() =>
                      console.log("Exporting", selectedIds.length, "rows")
                    }
                    className="px-2.5 py-1 rounded-lg text-[12px] font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={clearSelection}
                    className="px-2.5 py-1 rounded-lg text-[12px] font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(selectedIds)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-bold bg-white/20 hover:bg-white/30 text-white transition-colors whitespace-nowrap active:scale-95 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      handleBatchDelete(selectedIds);
                      clearSelection();
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-bold bg-black/20 hover:bg-black/30 text-white transition-colors whitespace-nowrap active:scale-95 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              )
            }
          </DataTableBatchBar>
        )}
      </DataTable>

      {/* CUSTOM EDIT MODAL */}
      <div
        className={cn(
          "fixed inset-0 bg-[#0f0f23]/50 backdrop-blur-[4px] z-[1000] flex items-center justify-center transition-opacity duration-200",
          isEditModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsEditModalOpen(false);
        }}
      >
        <div
          className={cn(
            "bg-white dark:bg-zinc-900 rounded-[18px] p-7 w-[420px] max-w-[90vw] shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform duration-200",
            isEditModalOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-95",
          )}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-base font-bold text-[#111827] dark:text-white">
                Edit Selected Users
              </div>
              <div className="text-xs text-[#9ca3af] mt-0.5">{subtitleText}</div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="w-7 h-7 rounded-lg bg-[#f3f4f6] dark:bg-zinc-800 text-[#6b7280] dark:text-zinc-400 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-3.5">
            <label className="block text-[12px] font-semibold text-[#374151] dark:text-zinc-300 mb-[5px] uppercase tracking-[0.04em]">
              Role
            </label>
            <SelectBlock
              options={ROLE_OPTIONS}
              value={editRole}
              onChange={setEditRole}
              color="indigo"
              inputSize="sm"
            />
          </div>

          <div className="mb-3.5">
            <label className="block text-[12px] font-semibold text-[#374151] dark:text-zinc-300 mb-[5px] uppercase tracking-[0.04em]">
              Status
            </label>
            <SelectBlock
              options={STATUS_OPTIONS}
              value={editStatus}
              onChange={setEditStatus}
              color="indigo"
              inputSize="sm"
            />
          </div>

          <div className="flex gap-2.5 mt-[22px]">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 p-[10px] rounded-[10px] text-[13px] font-semibold bg-[#f3f4f6] dark:bg-zinc-800 text-[#374151] dark:text-zinc-300 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={applyEdits}
              className="flex-1 p-[10px] rounded-[10px] text-[13px] font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors active:scale-95"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
