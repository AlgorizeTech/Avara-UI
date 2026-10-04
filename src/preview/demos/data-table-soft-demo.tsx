"use client";

import { useState } from "react";
import {
  Inbox,
  Plus,
  SearchX,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  DataTable,
  DataTableBatchAction,
  DataTableBatchBar,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableEmpty,
  DataTableExport,
  DataTableFilter,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableInfo,
  DataTablePageSize,
  DataTablePagination,
  DataTableReset,
  DataTableRow,
  DataTableSearch,
  DataTableSelect,
  DataTableSelectAll,
  DataTableTabs,
  DataTableToolbar,
  TableAction,
  TableBadge,
  type TableBadgeTone,
  TablePerson,
  TableRowAction,
  TableRowActions,
} from "@/components/custom/blocks/TableBlock";
import { useDataTable } from "@/components/custom/blocks/table-core";

type Status = "active" | "invited" | "suspended";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: Status;
  /** ISO date, so it sorts as text. */
  joined: string;
}

const FIRST = ["Ayesha", "Daniel", "Priya", "Marcus", "Sofia", "Liam", "Hana", "Omar", "Elena", "Kofi"];
const LAST = ["Rahman", "Brooks", "Nair", "Chen", "Alvarez", "O'Connor", "Kobayashi", "Haddad"];
const ROLES = ["Admin", "Editor", "Author", "Viewer"];
const PLANS = ["Free", "Pro", "Team"];
const STATUSES: Status[] = ["active", "active", "active", "invited", "active", "suspended"];

// 40 people, generated the same way on the server and in the browser.
const INITIAL_USERS: User[] = Array.from({ length: 40 }, (_, i) => {
  const first = FIRST[i % FIRST.length] ?? "Alex";
  const last = LAST[(i * 3) % LAST.length] ?? "Lee";
  const day = String(28 - (i % 27)).padStart(2, "0");
  const month = String(9 - Math.floor(i / 9)).padStart(2, "0");
  return {
    id: i + 1,
    name: `${first} ${last}`,
    email: `${first}.${last}`.toLowerCase().replace(/'/g, "") + "@acme.io",
    role: ROLES[(i * 7) % ROLES.length] ?? "Viewer",
    plan: PLANS[(i * 5) % PLANS.length] ?? "Free",
    status: STATUSES[i % STATUSES.length] ?? "active",
    joined: `2026-${month}-${day}`,
  };
});

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "invited", label: "Invited" },
  { value: "suspended", label: "Suspended" },
];

const STATUS_TONE: Record<Status, TableBadgeTone> = {
  active: "success",
  invited: "warning",
  suspended: "danger",
};

const STATUS_LABEL: Record<Status, string> = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-04" → "Sep 4, 2026", the same on every machine. */
const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${day}, ${year}`;
};

const COLUMNS = 7;

/** What the body shows when no row is left: a search, filters, or nothing yet. */
function NoUsers() {
  const { search, isFiltered, resetAll } = useDataTable<User>();
  const term = search.trim();
  return (
    <DataTableEmpty
      colSpan={COLUMNS}
      icon={isFiltered ? <SearchX /> : <Inbox />}
      title={
        term
          ? `No users match “${term}”`
          : isFiltered
            ? "No users match these filters"
            : "No users yet"
      }
      description={
        isFiltered
          ? "Check the spelling, or remove a filter to see more."
          : "Invite someone to give them access."
      }
      action={
        isFiltered ? (
          <TableAction size="sm" onClick={resetAll}>
            Clear filters
          </TableAction>
        ) : undefined
      }
    />
  );
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const addUser = () =>
    setUsers((current) => {
      const id = Math.max(0, ...current.map((user) => user.id)) + 1;
      const today = new Date().toISOString().slice(0, 10);
      return [
        {
          id,
          name: `New teammate ${id}`,
          email: `teammate-${id}@acme.io`,
          role: "Viewer",
          plan: "Free",
          status: "invited",
          joined: today,
        },
        ...current,
      ];
    });

  const setStatus = (ids: (string | number)[], status: Status) =>
    setUsers((current) =>
      current.map((user) => (ids.includes(user.id) ? { ...user, status } : user)),
    );

  const remove = (ids: (string | number)[]) =>
    setUsers((current) => current.filter((user) => !ids.includes(user.id)));

  return (
    <DataTable
      data={users}
      getRowId={(user) => user.id}
      variant="soft"
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
    >
      <DataTableToolbar>
        <DataTableTabs<User>
          by="status"
          tabs={STATUS_TABS}
          label="Show users"
          className="w-full sm:w-auto sm:flex-1"
        />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <DataTableExport filename="users" />
          <TableAction variant="primary" onClick={addUser}>
            <Plus />
            Add user
          </TableAction>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <DataTableSearch placeholder="Search users" />
          <DataTableFilter<User> by="role" placeholder="Role" options={ROLES} />
          <DataTableFilter<User> by="plan" placeholder="Plan" options={PLANS} />
          <DataTableReset />
        </div>
      </DataTableToolbar>

      <DataTableContent aria-label="Users">
        <DataTableHeader>
          <DataTableRow isHeader>
            <DataTableHead className="w-12 pr-0 lg:pr-0">
              <DataTableSelectAll />
            </DataTableHead>
            <DataTableHead sortBy="name" className="min-w-60">
              User
            </DataTableHead>
            <DataTableHead sortBy="role">Role</DataTableHead>
            <DataTableHead sortBy="plan">Plan</DataTableHead>
            <DataTableHead sortBy="status">Status</DataTableHead>
            <DataTableHead sortBy="joined">Joined</DataTableHead>
            <DataTableHead align="right" sticky className="w-px">
              Actions
            </DataTableHead>
          </DataTableRow>
        </DataTableHeader>

        <DataTableBody<User>>
          {(rows) =>
            rows.length === 0 ? (
              <NoUsers />
            ) : (
              rows.map((user) => (
                <DataTableRow key={user.id} row={user}>
                  <DataTableCell className="w-12 pr-0 lg:pr-0">
                    <DataTableSelect label={`Select ${user.name}`} />
                  </DataTableCell>
                  <DataTableCell className="min-w-60">
                    <TablePerson name={user.name} description={user.email} />
                  </DataTableCell>
                  <DataTableCell>
                    <TableBadge dot={false}>{user.role}</TableBadge>
                  </DataTableCell>
                  <DataTableCell className="text-muted-foreground">{user.plan}</DataTableCell>
                  <DataTableCell>
                    <TableBadge tone={STATUS_TONE[user.status]}>
                      {STATUS_LABEL[user.status]}
                    </TableBadge>
                  </DataTableCell>
                  <DataTableCell className="whitespace-nowrap tabular-nums text-muted-foreground">
                    <time dateTime={user.joined}>{formatDate(user.joined)}</time>
                  </DataTableCell>
                  <DataTableCell align="right" sticky className="w-px">
                    <TableRowActions>
                      {user.status === "suspended" ? (
                        <TableRowAction
                          label={`Reactivate ${user.name}`}
                          onClick={() => setStatus([user.id], "active")}
                        >
                          <UserCheck />
                        </TableRowAction>
                      ) : (
                        <TableRowAction
                          label={`Suspend ${user.name}`}
                          onClick={() => setStatus([user.id], "suspended")}
                        >
                          <UserX />
                        </TableRowAction>
                      )}
                      <TableRowAction
                        label={`Delete ${user.name}`}
                        tone="danger"
                        onClick={() => remove([user.id])}
                      >
                        <Trash2 />
                      </TableRowAction>
                    </TableRowActions>
                  </DataTableCell>
                </DataTableRow>
              ))
            )
          }
        </DataTableBody>
      </DataTableContent>

      <DataTableFooter>
        <DataTableInfo />
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <DataTablePageSize label="Rows per page" suffix="" />
          <DataTablePagination />
        </div>
      </DataTableFooter>

      <DataTableBatchBar<User> noun={["user", "users"]}>
        {({ selectedIds, clearSelection }) => (
          <>
            <DataTableBatchAction onClick={() => setStatus(selectedIds, "suspended")}>
              <UserX />
              Suspend
            </DataTableBatchAction>
            <DataTableBatchAction
              tone="danger"
              onClick={() => {
                remove(selectedIds);
                clearSelection();
              }}
            >
              <Trash2 />
              Delete
            </DataTableBatchAction>
          </>
        )}
      </DataTableBatchBar>
    </DataTable>
  );
}
