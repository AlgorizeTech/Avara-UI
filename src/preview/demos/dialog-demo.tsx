"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";
import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";
import {
  ArrowLeft,
  Check,
  Receipt,
  Search,
  Settings,
  Trash2,
  Undo2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  lavender: "#9b8afb",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

export default function DialogDemo({
  layout = "standard",
  color = "primary",
}: {
  layout?:
    | "standard"
    | "form"
    | "sizes"
    | "destructive"
    | "confirm-delete"
    | "no-close"
    | "controlled"
    | "nested";
  color?: string;
}) {
  const themeColor = getThemeColor(color);
  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({ "--primary": themeColor } as React.CSSProperties)
      : undefined;

  return (
    <div
      style={containerStyle}
      className="w-full flex items-center justify-center min-h-[520px] sm:min-h-[560px] relative z-10 overflow-hidden"
    >
      {layout === "standard" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
              <UserPlus className="w-4 h-4" /> Share Profile
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Profile</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            {/* The dialog stays open so the "Copied!" confirmation can play. */}
            <CopyField
              className="my-4"
              value="https://nexus.dev/u/johndoe"
              color={color}
              buttonProps={{ label: "Copy Link", copiedLabel: "Copied!" }}
            />
            <DialogFooter>
              <p className="text-xs text-zinc-500 text-left w-full sm:text-right mt-2 sm:mt-0 pt-2 border-t dark:border-zinc-800">
                Your profile is currently public.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "form" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-primary/5 hover:border-primary/40 text-zinc-900 dark:text-white hover:text-primary text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
              <Settings className="w-4 h-4 text-zinc-500" /> Edit Profile
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="name"
                  className="text-right text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="John Doe"
                  className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="username"
                  className="text-right text-sm font-medium"
                >
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@johndoe"
                  className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex w-full sm:w-auto gap-2">
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Cancel
                </DialogClose>
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Save changes
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "destructive" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-rose-600 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Are you absolutely sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete
                your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex w-full sm:w-auto gap-2">
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Cancel
                </DialogClose>
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Yes, delete account
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "no-close" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
              <Settings className="w-4 h-4" /> Accept terms
            </button>
          </DialogTrigger>
          <DialogContent hideCloseButton>
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                There is no “X” here — the user has to pick one of the buttons
                below (or press Escape).
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex w-full sm:w-auto gap-2">
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Decline
                </DialogClose>
                <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Accept
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "sizes" && <SizeScaleDialogs />}

      {layout === "confirm-delete" && <DeleteConfirmationDialog />}

      {layout === "controlled" && <ControlledDialog />}

      {layout === "nested" && <NestedDialogs />}
    </div>
  );
}

/** Open state owned by the parent, so the dialog can close itself after work finishes. */
function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Stand-in for an API call.
    setTimeout(() => {
      setSaving(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
          <Settings className="w-4 h-4" /> Save settings
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save settings</DialogTitle>
          <DialogDescription>
            The dialog closes itself once the save finishes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full sm:w-auto gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={saving}
              className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** The `size` scale, one trigger per step, so the jump between them is visible. */
const DIALOG_SIZES = [
  {
    size: "sm",
    label: "sm",
    title: "Leave this page?",
    body: "Room for one question and two buttons. Use it for confirms and short prompts.",
  },
  {
    size: "md",
    label: "md",
    title: "Share profile",
    body: "The default. Wide enough for a short form, a share sheet or a single field.",
  },
  {
    size: "lg",
    label: "lg",
    title: "Workspace settings",
    body: "Comfortable for a two-column form or a record with a handful of sections.",
  },
  {
    size: "xl",
    label: "xl",
    title: "Import from CSV",
    body: "Fits a table preview or a side-by-side editor without feeling cramped.",
  },
  {
    size: "full",
    label: "full",
    title: "Media library",
    body: "Edge to edge — no rounding, no border, no height cap. For a surface that takes over the screen rather than sitting on top of it.",
  },
] as const;

function SizeScaleDialogs() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Open one to compare the widths
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DIALOG_SIZES.map(({ size, label, title, body }) => (
          <Dialog key={size}>
            <DialogTrigger>
              <button className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-zinc-900 dark:text-white text-sm font-mono font-medium rounded-md shadow-sm transition-colors cursor-pointer">
                {label}
              </button>
            </DialogTrigger>
            <DialogContent size={size}>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{body}</DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 px-4 py-6 text-center">
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                  size=&quot;{size}&quot;
                </span>
              </div>
              <DialogFooter>
                <DialogClose className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm cursor-pointer">
                  Close
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

const INITIAL_PROJECTS = [
  { id: "1", name: "Landing page redesign", meta: "12 files · edited 2h ago" },
  { id: "2", name: "Pricing experiment", meta: "4 files · edited yesterday" },
  { id: "3", name: "Onboarding emails", meta: "9 files · edited last week" },
];

type Project = (typeof INITIAL_PROJECTS)[number];

/**
 * The confirm sits between the click and the delete: the row is only removed
 * once the dialog resolves, and the dialog stays put while the request is in
 * flight, so a stray Escape cannot leave the work half done.
 */
function DeleteConfirmationDialog() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [pending, setPending] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = () => {
    if (!pending) return;
    setDeleting(true);
    // Stand-in for the DELETE request.
    setTimeout(() => {
      setProjects((current) => current.filter((p) => p.id !== pending.id));
      setDeleting(false);
      setPending(null);
    }, 900);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
            Projects
          </h3>
          {projects.length < INITIAL_PROJECTS.length && (
            <button
              type="button"
              onClick={() => setProjects(INITIAL_PROJECTS)}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-primary transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" /> Restore
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">
            No projects left.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="px-4 py-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                  {project.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">{project.meta}</p>
              </div>
              <button
                type="button"
                aria-label={"Delete " + project.name}
                onClick={() => setPending(project)}
                className="shrink-0 p-2 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* One dialog serves every row — the row being deleted lives in state. */}
      <Dialog
        open={pending !== null}
        onOpenChange={(open) => {
          // Escape and backdrop clicks route through here too; ignore them
          // while the delete is running.
          if (!open && !deleting) setPending(null);
        }}
      >
        <DialogContent size="sm" hideCloseButton>
          <DialogHeader>
            <div className="mx-auto sm:mx-0 mb-1 w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <DialogTitle>Delete “{pending?.name}”?</DialogTitle>
            <DialogDescription>
              This removes the project and the {pending?.meta ? pending.meta.split(" ")[0] : "selected"} files
              inside it. You cannot undo this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full sm:w-auto gap-2">
              <button
                type="button"
                onClick={() => setPending(null)}
                disabled={deleting}
                className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm disabled:opacity-60 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-md shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {deleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const CUSTOMERS = [
  { id: "c1", name: "Northwind Traders", email: "ap@northwind.co" },
  { id: "c2", name: "Acme Robotics", email: "billing@acme.dev" },
  { id: "c3", name: "Blue Harbour Studio", email: "hello@blueharbour.io" },
];

type Customer = (typeof CUSTOMERS)[number];

/**
 * A dialog opened from inside another one. Both are ordinary `Dialog` roots —
 * nesting is just rendering the second inside the first's content. The picker
 * writes its choice back into the invoice and closes only itself, so the sheet
 * the user was filling in is still there underneath.
 */
function NestedDialogs() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-md shadow-sm transition-colors cursor-pointer">
          <Receipt className="w-4 h-4" /> New invoice
        </button>
      </DialogTrigger>

      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>New invoice</DialogTitle>
          <DialogDescription>
            Pick a customer to see the smaller dialog open on top of this one.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Bill to</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 h-10 flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 px-3 text-sm">
                {customer ? (
                  <span className="truncate">
                    {customer.name}
                    <span className="text-zinc-500"> · {customer.email}</span>
                  </span>
                ) : (
                  <span className="text-zinc-400">No customer selected</span>
                )}
              </div>

              {/* The nested dialog. Its own root, rendered inside the outer content. */}
              <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
                <DialogTrigger>
                  <button className="h-10 px-3 shrink-0 flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-primary/5 hover:border-primary/40 hover:text-primary text-sm font-medium rounded-md shadow-sm transition-colors cursor-pointer">
                    <Search className="w-3.5 h-3.5" /> Choose
                  </button>
                </DialogTrigger>

                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle className="text-base">
                      Select a customer
                    </DialogTitle>
                    <DialogDescription>
                      Escape closes this one only — the invoice stays open.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="-mx-2 max-h-56 overflow-y-auto">
                    {CUSTOMERS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setCustomer(option);
                          setPickerOpen(false);
                        }}
                        className="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md text-left hover:bg-primary/10 dark:hover:bg-primary/15 transition-colors cursor-pointer"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium truncate">
                            {option.name}
                          </span>
                          <span className="block text-xs text-zinc-500 truncate">
                            {option.email}
                          </span>
                        </span>
                        {customer?.id === option.id && (
                          <Check className="w-4 h-4 shrink-0 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  <DialogFooter>
                    <DialogClose className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to invoice
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <input
              id="amount"
              defaultValue="1,250.00"
              className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full sm:w-auto gap-2">
            <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm cursor-pointer">
              Cancel
            </DialogClose>
            <DialogClose
              disabled={!customer}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm disabled:opacity-60 cursor-pointer"
            >
              Create invoice
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
