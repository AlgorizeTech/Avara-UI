---
title: "Shadcn Dialog"
description: "Shadcn Dialog component. A modal window overlaid on the page (or another dialog) with scroll locking, Escape and backdrop dismissal, and nested portal stacking."
url: https://avaraui.com/docs/nextjs/dialog
---

# Shadcn Dialog

A modal window overlaid on the page (or another dialog) with scroll locking, Escape and backdrop dismissal, and nested portal stacking.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/dialog.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/dialog
```

## Dialog

Compose `DialogTrigger` and `DialogContent` inside a `Dialog` root.

- `defaultOpen` starts it open while leaving the state uncontrolled.

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";
// CopyField ships with the copy-button item:
// npx shadcn@latest add @avara-ui/copy-button
import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";
import { UserPlus } from "lucide-react";

export default function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md">
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

        {/* CopyField = read-only input + CopyButton. It confirms with an
            animated "Copied!" and leaves the dialog open so you can see it. */}
        <CopyField
          className="my-4"
          value="https://nexus.dev/u/johndoe"
          buttonProps={{ label: "Copy Link", copiedLabel: "Copied!" }}
        />

        <DialogFooter>
          <p className="text-xs text-muted-foreground">Your profile is currently public.</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Form dialog

- `className` on `DialogContent` fine-tunes the width when no `size` step fits — drop any form markup into the body.

```tsx
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
import { Settings } from "lucide-react";

export default function EditProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 border text-sm font-semibold rounded-md">
          <Settings className="w-4 h-4" /> Edit Profile
        </button>
      </DialogTrigger>

      {/* className adjusts the max width of the modal */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
            <input id="name" defaultValue="John Doe" className="col-span-3 h-10 rounded-md border bg-transparent px-3 text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">Username</label>
            <input id="username" defaultValue="@johndoe" className="col-span-3 h-10 rounded-md border bg-transparent px-3 text-sm" />
          </div>
        </div>

        {/* DialogClose dismisses the modal without wiring up state */}
        <DialogFooter>
          <div className="flex w-full sm:w-auto gap-2">
            <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border hover:bg-muted text-foreground text-sm font-medium rounded-md shadow-sm">
              Cancel
            </DialogClose>
            <DialogClose className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md shadow-sm">
              Save changes
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Size variations

Five widths, from a compact confirm up to a full-page surface.

- Set `size` to `sm` | `md` | `lg` | `xl` | `full`: roughly 24rem, 32rem, 42rem and 56rem, then the whole viewport.
- `size="full"` also drops the rounding, border and height cap and centres the content, so the panel reaches every edge.

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

const SIZES = ["sm", "md", "lg", "xl", "full"] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => (
        <Dialog key={size}>
          <DialogTrigger>
            <button className="px-3 py-1.5 border text-sm font-mono rounded-md">
              {size}
            </button>
          </DialogTrigger>

          {/* sm 24rem · md 32rem (default) · lg 42rem · xl 56rem · full viewport, content centred */}
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>
                Reach for the smallest size the content actually fits in.
              </DialogDescription>
            </DialogHeader>

            <DialogClose className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
```

## Destructive confirm

A confirmation shape: coloured title, clear consequence, two footer actions.

- `hideCloseButton` is worth pairing with this so the choice has to be made explicitly.

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";
import { Trash2 } from "lucide-react";

export default function DeleteAccountDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 text-sm font-semibold rounded-md">
          <Trash2 className="w-4 h-4" /> Delete Account
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-2">
            <button className="px-4 py-2 border text-sm font-medium rounded-md">Cancel</button>
            <button className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md">
              Yes, delete account
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Confirm before deleting

The working version of that shape — the row is only removed once the dialog resolves.

- Drive it with `open` set from the row awaiting confirmation, so one dialog serves the whole list instead of one per row.
- `onOpenChange` is where you refuse the dismissal while the request is in flight. Escape and backdrop clicks arrive here too.

```tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/blocks/DialogBlock";
import { Trash2 } from "lucide-react";

type Project = { id: string; name: string; meta?: string };

export default function ProjectList({
  projects,
  onDelete,
}: {
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
}) {
  // The row awaiting confirmation — null means the dialog is closed.
  const [pending, setPending] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pending) return;
    setDeleting(true);
    await onDelete(pending.id);
    setDeleting(false);
    setPending(null); // only now is the row really gone
  };

  return (
    <>
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => setPending(project)}
          aria-label={"Delete " + project.name}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ))}

      {/* One dialog for the whole list, not one per row. */}
      <Dialog
        open={pending !== null}
        onOpenChange={(open) => {
          // Escape and backdrop clicks route through here too — ignore them
          // while the request is still in flight.
          if (!open && !deleting) setPending(null);
        }}
      >
        <DialogContent size="sm" hideCloseButton>
          <DialogHeader>
            <DialogTitle>Delete “{pending?.name}”?</DialogTitle>
            <DialogDescription>
              This removes the project and the {pending?.meta ? pending.meta.split(" ")[0] : "selected"} files inside it. You cannot undo this.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-2">
              <button
                onClick={() => setPending(null)}
                disabled={deleting}
                className="px-4 py-2 border text-sm font-medium rounded-md disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## Without close button

- Set `hideCloseButton` on `DialogContent` to remove the built-in X, when the user must pick one of your own actions.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md">
          Accept terms
        </button>
      </DialogTrigger>

      {/* hideCloseButton removes the built-in "X" so the user must choose */}
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            There is no “X” here — the user has to pick one of the buttons below
            (or press Escape).
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-2">
            <button className="px-4 py-2 border text-sm font-medium rounded-md">Decline</button>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md">Accept</button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Controlled

- Pass `open` and `onOpenChange` to own the state, so you can keep the dialog up until async work finishes.
- `onOpenChange` also fires on Escape and on a backdrop click — handle those or the dialog will not close.

```tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Stand-in for your own request.
  const saveToServer = () => new Promise((r) => setTimeout(r, 800));

  const handleSave = async () => {
    setSaving(true);
    await saveToServer();
    setSaving(false);
    setOpen(false); // close programmatically once the work is done
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md">
          Save settings
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
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md disabled:opacity-60">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Dialog inside a dialog

A small dialog opens on top of the one already on screen — and Escape or a backdrop click only reaches the topmost of the two.

- Nesting needs no new API — `Dialog` is just rendered inside another `DialogContent`, and the inner one portals above its parent.
- `onOpenChange` on the inner dialog is how the choice travels back out: write it into the outer form's state, then close only the inner one.

```tsx
"use client";

import { useState } from "react";
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

const CUSTOMERS = [
  { id: "c1", name: "Northwind Traders" },
  { id: "c2", name: "Acme Robotics" },
];

export default function NestedDialog() {
  const [customer, setCustomer] = useState<(typeof CUSTOMERS)[number] | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md">
          New invoice
        </button>
      </DialogTrigger>

      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>New invoice</DialogTitle>
          <DialogDescription>
            Bill to {customer?.name ?? "nobody yet"}.
          </DialogDescription>
        </DialogHeader>

        {/* A second Dialog root, rendered inside the first one's content.
            It portals on top of its parent, and Escape or a backdrop click
            only reaches the dialog on top of the stack — so the invoice
            underneath stays exactly where the user left it. */}
        <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
          <DialogTrigger>
            <button className="px-3 py-2 border text-sm font-medium rounded-md">
              Choose customer
            </button>
          </DialogTrigger>

          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle className="text-base">Select a customer</DialogTitle>
            </DialogHeader>

            {CUSTOMERS.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setCustomer(option);
                  setPickerOpen(false); // closes the picker only
                }}
                className="w-full px-2 py-2 text-left text-sm rounded-md hover:bg-primary/10"
              >
                {option.name}
              </button>
            ))}

            <DialogFooter>
              <DialogClose className="px-4 py-2 border text-sm font-medium rounded-md">
                Back to invoice
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DialogFooter>
          <DialogClose className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md">
            Create invoice
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## About Shadcn Dialog

**What it is.** A composable modal dialog system (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`) for blocking confirmations, forms, and nested workflows.

**How it is built.** Renders into a React Portal on `document.body`, marks the panel `role="dialog"` with `aria-modal="true"`, locks body scroll while open, and handles `Escape` and backdrop dismissal, even when a second `Dialog` is nested inside an open `DialogContent`. It does not trap or restore focus. The only npm dependency is `lucide-react`.

**When to use it.** Reach for `Dialog` when the user must make a decision or complete a focused form without page distractions. For non-blocking contextual content, use [Popover](https://avaraui.com/docs/nextjs/popover), or use [Drawer](https://avaraui.com/docs/nextjs/drawer) for slide-in panels.

## For AI agents

**When to use**

- Blocking confirmations, destructive action prompts, and focused modal forms
- Nested modal flows where a secondary dialog opens on top of an existing one

**When not to use**

- Non-blocking hints or compact pickers — use [Popover](https://avaraui.com/docs/nextjs/popover)
- Edge-anchored slide-over panels — use [Drawer](https://avaraui.com/docs/nextjs/drawer)

**Agent notes**

- Named exports from `@/components/custom/blocks/DialogBlock`: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`
- Use `open` + `onOpenChange` for controlled async confirmation (refuse dismissal while a request is in flight); use `size="sm" | "md" | "lg" | "xl" | "full"` on `DialogContent`

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Dialog` | `open` | `boolean` | `undefined` | The controlled open state of the dialog. Use this to programmatically open or close the modal from parent state. |
| `Dialog` | `defaultOpen` | `boolean` | `false` | The starting state of the dialog when running uncontrollably. |
| `Dialog` | `onOpenChange` | `(open: boolean) => void` | `undefined` | Event handler called when the open state of the dialog changes via a user action (like pressing Escape or clicking the backdrop). |
| `DialogContent` | `hideCloseButton` | `boolean` | `false` | If true, removes the built-in 'X' icon in the top right corner of the dialog content box. |
| `DialogContent` | `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Panel width: `sm` ~24rem, `md` ~32rem, `lg` ~42rem, `xl` ~56rem. `full` fills the viewport, drops the rounding, border and `max-height` cap the inset sizes use, and centres its content in an `md`-wide column in the middle of the screen (override with `className` for an edge-to-edge layout). |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling or spacing. On `DialogContent` it is merged after `size`, so a `max-w-*` class here wins — use it only when no step on the size scale fits. |

## Works with other components

- Trigger dialogs from [Button](https://avaraui.com/docs/nextjs/button) or [Action Button](https://avaraui.com/docs/nextjs/action-buttons).
- Embed [Copy Button](https://avaraui.com/docs/nextjs/copy-button) (`CopyField`) for share-link modals, or [Input](https://avaraui.com/docs/nextjs/input) and [Select](https://avaraui.com/docs/nextjs/select) for form dialogs.
- Pair with [Sonner](https://avaraui.com/docs/nextjs/sonner) or [Toast](https://avaraui.com/docs/nextjs/toast) to confirm completed actions after the dialog closes.

## Can I nest a Dialog inside another Dialog?

Render a second `Dialog` directly inside another `DialogContent`. The inner panel portals above its parent, and `Escape` or a backdrop click dismisses only the topmost dialog, because each open `DialogContent` takes a slot on a shared stack and only the last one reacts.

## How do I prevent a Dialog from closing during an async action?

Control the dialog with `open` and `onOpenChange`, and ignore `onOpenChange(false)` while your request is in flight. `Escape`, the backdrop and the X button all call it. Add `hideCloseButton` on `DialogContent` so users must choose one of your own footer actions.

## How do I change the Dialog width?

Pass `size` to `DialogContent`: `"sm"` (24rem), `"md"` (32rem, the default), `"lg"` (42rem), `"xl"` (56rem) or `"full"`. Use `className` with a `max-w-*` utility only when no step fits; it is merged after `size`, so it wins.

## Does the Dialog trap focus or support asChild on DialogTrigger?

Neither. `DialogContent` sets `role="dialog"` and `aria-modal="true"` but does not move, trap or restore focus, so put `autoFocus` on the first field you want focused. `DialogTrigger` accepts an `asChild` type but always renders its own `div` with `role="button"`; for a custom opener, control `open` yourself.

## What keyboard and screen-reader support does the Dialog have?

`Escape` closes the topmost dialog, and `DialogTrigger` opens on `Enter` or `Space` because it has `tabIndex={0}`. The built-in X button carries screen-reader text "Close". Body scroll is locked while a dialog is open. Entry animation uses Tailwind `animate-in` classes and is not gated on `prefers-reduced-motion`.

## What is the difference between Dialog and Modal?

[Modal](https://avaraui.com/docs/nextjs/modal) ships ready-made `variant` presets such as `confirmation`, `form` and `glass`. `Dialog` has no presets: you assemble `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter` and the rest yourself, pick a `size`, and can stack dialogs. Choose `Dialog` when you want full control of the layout.

---

Live previews and every example: https://avaraui.com/docs/nextjs/dialog
