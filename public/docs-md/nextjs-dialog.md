---
title: "Dialog (Modal)"
description: "A window overlaid on either the primary window or another dialog window, rendering the background content underneath inert. Free shadcn/ui Dialog component."
url: https://avaraui.com/docs/nextjs/dialog
---

# Dialog (Modal)

A window overlaid on either the primary window or another dialog window, rendering the background content underneath inert.

Popovers and Dropdowns are great for quick, non-blocking actions. But when you need to force the user to make a decision or complete a complex form without distractions, you need a Dialog (Modal).

The `DialogBlock` component handles the complex DOM logic required for true accessibility: it automatically renders into a React Portal, locks the `document.body` scrollbar to prevent background scrolling, and actively listens for background clicks or the `Escape` key to dismiss itself smoothly.

Open each dialog from its trigger — the background scrollbar vanishes while it's open and returns exactly as it was on close.

`DialogContent` sizes itself from a `size` prop: `sm` through `xl` for panels that sit on the page, and `full` for a surface that takes the whole viewport with its content centred in the middle of it. Dialogs also nest — render one inside another's content and the inner window portals above its parent, with `Escape` and backdrop clicks reaching only whichever one is on top.

## Dialog

Compose `DialogTrigger` and `DialogContent` inside a `Dialog` root.

- `defaultOpen` starts it open while leaving the state uncontrolled.

```tsx
"use client";


// CopyField ships with the copy-button item:
// npx shadcn@latest add @avara-ui/copy-button


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

## Examples

### Form dialog

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

### Size variations

Five widths, from a compact confirm up to a full-page surface.

- Set `size` to `sm` | `md` | `lg` | `xl` | `full` — roughly 24rem, 32rem, 42rem and 56rem, then the whole viewport.
- `size="full"` also drops the rounding, border and height cap, so the panel really does reach every edge — and centres its content in the middle of the screen, in a column the width of `md`.
- `className` still wins over the size it is paired with — reach for it only when no step on the scale fits.

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

### Destructive confirm

A confirmation shape: coloured title, clear consequence, two footer actions.

- `hideCloseButton` is worth pairing with this so the choice has to be made explicitly.

```tsx
"use client";


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

### Confirm before deleting

The working version of that shape — the row is only removed once the dialog resolves.

- Drive it with `open` set from the row awaiting confirmation, so one dialog serves the whole list instead of one per row.
- `onOpenChange` is where you refuse the dismissal while the request is in flight — Escape and backdrop clicks arrive here too.
- `size="sm"` suits a confirm — one question, two buttons, nothing to scan past.

```tsx
"use client";



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

### Without close button

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

### Controlled

- Pass `open` and `onOpenChange` to own the state, so you can keep the dialog up until async work finishes.
- `onOpenChange` also fires on Escape and on a backdrop click — handle those or the dialog will not close.

```tsx
"use client";



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

### Dialog inside a dialog

A small dialog opens on top of the one already on screen — and Escape or a backdrop click only reaches the topmost of the two.

- Nesting needs no new API — `Dialog` is just rendered inside another `DialogContent`, and the inner one portals above its parent.
- `size="sm"` on the inner dialog is what makes it read as a popup over the sheet rather than a second full window.
- `onOpenChange` on the inner dialog is how the choice travels back out — write it into the outer form's state, then close only the inner one.

```tsx
"use client";



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

## Features
Discover the Dialog component's accessible modal features, including focus trapping, outside-click dismissal, and scroll locking.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Dialog` | `open` | `boolean` | `undefined` | The controlled open state of the dialog. Use this to programmatically open or close the modal from parent state. |
| `Dialog` | `defaultOpen` | `boolean` | `false` | The starting state of the dialog when running uncontrollably. |
| `Dialog` | `onOpenChange` | `(open: boolean) => void` | `undefined` | Event handler called when the open state of the dialog changes via a user action (like pressing Escape or clicking the backdrop). |
| `DialogContent` | `hideCloseButton` | `boolean` | `false` | If true, removes the built-in 'X' icon in the top right corner of the dialog content box. |
| `DialogContent` | `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Panel width: `sm` ~24rem, `md` ~32rem, `lg` ~42rem, `xl` ~56rem. `full` fills the viewport, drops the rounding, border and `max-height` cap the inset sizes use, and centres its content in an `md`-wide column in the middle of the screen (override with `className` for an edge-to-edge layout). |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling or spacing. On `DialogContent` it is merged after `size`, so a `max-w-*` class here wins — use it only when no step on the size scale fits. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/dialog
