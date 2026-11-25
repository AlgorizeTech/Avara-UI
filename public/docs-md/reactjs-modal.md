---
title: "Shadcn Modal"
description: "Shadcn Modal. A controlled modal dialog (`Modal`) with pre-configured `standard`, `confirmation`, `form`, `fullscreen`, `glass`."
url: https://avaraui.com/docs/nextjs/modal
---

# Shadcn Modal

A controlled modal dialog (`Modal`) with pre-configured `standard`, `confirmation`, `form`, `fullscreen`, `glass`, and `liquid-glass` presets plus composable subcomponents.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/modal.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/modal
```

## Standard

Complete modal layout with title, badge, body description, and action buttons.

- Pass `variant="standard"` to get the standard update & alert dialog with built-in primary and cancel action triggers.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { useState } from "react";

export default function UpdateModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Standard Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="standard"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}
```

## Form

Header and footer actions with custom form inputs as children.

- Pass `variant="form"` to automatically get header and footer action bars while passing form inputs directly as children.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { useState } from "react";

export default function InviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Viewer");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Form Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="form"
        title="Invite Team Member"
        cancelText="Cancel"
        confirmText="Send Invite"
        onConfirm={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <input
              type="email"
              placeholder="colleague@company.com"
              className="w-full h-11 px-3 rounded-lg border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 border-border transition-shadow focus:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Role & Permissions
            </label>
            <SelectBlock
              options={[
                { label: "Viewer", value: "Viewer" },
                { label: "Editor", value: "Editor" },
                { label: "Administrator", value: "Administrator" },
              ]}
              value={inviteRole}
              onChange={setInviteRole}
              placeholder="Select a role"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Personal Message (Optional)
            </label>
            <textarea
              placeholder="Welcome to the team!"
              rows={3}
              className="w-full p-3 rounded-lg border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 border-border transition-shadow resize-none focus:ring-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Confirmation

Compact centered delete confirmation dialog with danger badge.

- Pass `variant="confirmation"` for a centered destructive confirmation prompt with danger icon and confirm/cancel buttons.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { useState } from "react";

export default function ConfirmDeleteModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Confirmation Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="confirmation"
        title="Delete permanently?"
        description="Are you sure you want to delete this item? This action cannot be undone and all data will be lost."
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}
```

## Fullscreen

Wide layout with pinned header and multi-action responsive footer.

- Pass `variant="fullscreen"` to get a wide configuration dialog with pinned header, scrollable body, and multi-action footer.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { useState } from "react";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Fullscreen Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="fullscreen"
        title="Project Configuration"
        description="Manage all global settings for your workspace."
        deleteText="Delete Project"
        cancelText="Discard Changes"
        confirmText="Save Configuration"
        onConfirm={() => setIsOpen(false)}
        onDelete={() => setIsOpen(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-2">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              General
            </h3>
            <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-24 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-12 w-3/4 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Security
            </h3>
            <div className="h-32 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Glass

Translucent frosted-glass treatment with backdrop blur.

- Pass `variant="glass"` to get a translucent card with backdrop blur and glass border highlights.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { useState } from "react";

export default function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Glass Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}
```

## Liquid Glass

Fluid glassmorphism featuring real SVG displacement mapping, multi-layer specular highlights, and fluid reflections.

- Pass `variant="liquid-glass"` for real liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and liquid glass buttons.

```tsx
import { Modal } from "@/components/custom/blocks/ModalBlock";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function LiquidGlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Liquid Glass Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="liquid-glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        icon={<Sparkles className="w-6 h-6 text-white drop-shadow-sm" />}
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}
```

## About Shadcn Modal

**What it is.** `Modal` is a preset-driven modal dialog supporting `standard`, `confirmation`, `form`, `fullscreen`, `glass`, and `liquid-glass` layouts, plus a `custom` mode, alongside `ModalHeader`, `ModalBody`, and `ModalFooter` subcomponents for custom compositions.

**How it is built.** It renders through a React portal with `role="dialog"` and `aria-modal="true"`, closes on `Escape`, the X button or a backdrop click, locks body scroll while open, and uses CSS enter and exit transitions. The open state is yours: `isOpen` and `onClose`. It does not trap or restore focus.

**When to use it.** Use `Modal` when you want ready-made layout presets (`confirmation`, `form`, `fullscreen`, `liquid-glass`). For lower-level composable dialog primitives without preset chrome, use [Dialog](https://avaraui.com/docs/reactjs/dialog).

## For AI agents

**When to use**

- Opinionated modal presets (`standard`, `confirmation`, `form`, `fullscreen`, `glass`, `liquid-glass`) with built-in header/footer action wiring
- Custom modal compositions using `ModalHeader`, `ModalBody`, and `ModalFooter`

**When not to use**

- Bare composable dialog primitives: use [Dialog](https://avaraui.com/docs/reactjs/dialog)
- Edge-anchored slide-over sheets: use [Drawer](https://avaraui.com/docs/reactjs/drawer)

**Agent notes**

- Named exports from `@/components/custom/blocks/ModalBlock`: `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`, plus the `ModalProps` and `ModalVariant` types. There is no trigger component; keep `isOpen` in your own state and call `setIsOpen(false)` from `onClose`.
- Pass `variant` + `title` + `description` + action labels for zero-boilerplate modals. With no `variant` and none of `title`, `description`, `confirmText` or `cancelText`, the modal is `custom` and renders only your children, so compose `ModalHeader`/`ModalBody`/`ModalFooter` yourself.
- `confirmText` and `cancelText` buttons close the modal by default; pass `onConfirm`, `onCancel` or `onDelete` to run your own handler, and close it in that handler.
- A non-string `title` needs `ariaLabel` (or a `ModalHeader`) to give the dialog an accessible name.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Modal` | `isOpen` | `boolean` | required | The open state. Modal is fully controlled — it never holds this itself, so the same modal can be driven by a button, a route or the end of an async call. |
| `Modal` | `onClose` | `() => void` | required | Called once the close transition has finished, whether it was started by the built-in X, the `Escape` key or a backdrop click. Set `isOpen` to `false` here. |
| `Modal` | `variant` | `"standard" \| "confirmation" \| "form" \| "fullscreen" \| "glass" \| "liquid-glass" \| "custom"` | Derived | Pre-configured design variant. When omitted it is `"standard"` if you pass `title`, `description`, `confirmText` or `cancelText`, and `"custom"` (children only) otherwise. |
| `Modal` | `title` | `React.ReactNode` | `undefined` | Dialog headline or title. |
| `Modal` | `description` | `React.ReactNode` | `undefined` | Body copy or subtitle text. |
| `Modal` | `badge` | `React.ReactNode` | `undefined` | Status badge or version text displayed in the header. |
| `Modal` | `icon` | `React.ReactNode` | `undefined` | Custom icon element to override the variant's default icon. |
| `Modal` | `confirmText` | `string` | `undefined` | Label for the primary confirmation button. |
| `Modal` | `cancelText` | `string` | `undefined` | Label for the secondary cancel/dismiss button. |
| `Modal` | `deleteText` | `string` | `undefined` | Label for destructive action button in fullscreen variant. |
| `Modal` | `onConfirm` | `() => void` | `undefined` | Callback when the confirm button is clicked. Defaults to closing the modal. |
| `Modal` | `onCancel` | `() => void` | `undefined` | Callback when the cancel button is clicked. Defaults to closing the modal. |
| `Modal` | `contentClassName` | `string` | `undefined` | Custom CSS classes for the modal panel. Merged with variant defaults. |
| `Modal` | `overlayClassName` | `string` | `undefined` | Custom CSS classes for the backdrop overlay. |
| `Modal` | `hideCloseButton` | `boolean` | `false` | Removes the top-right X button (automatically true for `confirmation` variant). |
| `Modal` | `onDelete` | `() => void` | `undefined` | Callback when the delete button is clicked. Defaults to closing the modal. |
| `Modal` | `primaryCloseButton` | `boolean` | `false` | Shows the X as a tinted primary chip instead of a bare icon. |
| `Modal` | `closeButtonClassName` | `string` | `undefined` | Custom CSS classes for the X button. |
| `Modal` | `ariaLabel` | `string` | `undefined` | Labels the dialog directly. Use it when the title is not a string or not inside `ModalHeader`. |
| `ModalHeader` | `title` | `React.ReactNode` | `undefined` | Heading for the header. A string is wrapped in an `h2`. The header also supplies the dialog's accessible name. |
| `ModalHeader / Body / Footer` | `children` | `React.ReactNode` | `undefined` | Optional subcomponents for building completely custom modal layouts. |

## Works with other components

- Pair `variant="form"` with [Input](https://avaraui.com/docs/reactjs/input) and [Select](https://avaraui.com/docs/reactjs/select) children.
- Use [Dialog](https://avaraui.com/docs/reactjs/dialog) when you want unstyled/minimal composable primitives, or [Drawer](https://avaraui.com/docs/reactjs/drawer) for slide-in panels.
- Use a destructive [Button](https://avaraui.com/docs/reactjs/button) or [Action Button](https://avaraui.com/docs/reactjs/action-buttons) to open a `confirmation` modal.

## When should I use Modal vs Dialog?

Use `Modal` when you want built-in layout presets (`confirmation`, `form`, `fullscreen`, `glass`, `liquid-glass`) with pre-wired header and footer buttons driven by props. Use [Dialog](https://avaraui.com/docs/reactjs/dialog) when you want raw composable primitives (`DialogHeader`, `DialogContent`, `DialogFooter`) and your own markup.

## How do I open and close a Modal?

`Modal` is fully controlled. Keep a boolean in state, pass it as `isOpen`, and set it to `false` inside `onClose`. `onClose` fires after a 300ms exit transition, whether the user pressed the X, hit `Escape` or clicked the backdrop. Open it from any event by setting the state to `true`.

## How do I build a delete confirmation with Modal?

Set `variant="confirmation"` with a `title` and `description`. It shows a red icon with Cancel and Delete buttons, which you can relabel with `cancelText` and `confirmText`. The X is hidden for this variant. Run the deletion in `onConfirm`, then set `isOpen` to `false`.

## Does Modal trap focus or announce itself to screen readers?

Partly. The panel has `role="dialog"` and `aria-modal="true"`, named by a string `title`, `ariaLabel` or `ModalHeader`. It closes on `Escape`. It does not trap focus or return it to the trigger, so Tab can reach the page behind it. Add that yourself if you need strict keyboard containment.

## Does the liquid-glass Modal variant load an external image?

Yes. The `liquid-glass` variant uses a Cloudinary photo as the background behind its SVG displacement filter. `Modal` also renders a hidden 1px copy of that image whenever it is mounted. For a self-hosted setup, replace the URLs in `ModalBlock.tsx` with your own image. Other variants do not use it visibly.

---

Live previews and every example: https://avaraui.com/docs/nextjs/modal
