---
title: "Modal"
description: "A versatile, accessible dialog component with built-in design variants. Free shadcn/ui Modal component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/modal
---

# Modal

A versatile, accessible dialog component with built-in design variants. Choose from pre-configured variants (`standard`, `confirmation`, `form`, `fullscreen`, `glass`, `liquid-glass`) to instantly get complete layout, responsive sizing, and interactive buttons—or use composable subcomponents for custom dialogs.

`Modal` manages all dialog complexities—portals, focus traps, backdrop dismissal, Escape key handling, body scroll locking, and smooth enter/exit animations.

## Standard

Complete modal layout with title, badge, body description, and action buttons.

- Pass `variant="standard"` to get the standard update & alert dialog with built-in primary and cancel action triggers.

```tsx
"use client";



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

## Examples

### Form

Header and footer actions with custom form inputs as children.

- Pass `variant="form"` to automatically get header and footer action bars while passing form inputs directly as children.

```tsx
"use client";




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

### Confirmation

Compact centered delete confirmation dialog with danger badge.

- Pass `variant="confirmation"` for a centered destructive confirmation prompt with danger icon and confirm/cancel buttons.

```tsx
"use client";



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

### Fullscreen

Wide layout with pinned header and multi-action responsive footer.

- Pass `variant="fullscreen"` to get a wide configuration dialog with pinned header, scrollable body, and multi-action footer.

```tsx
"use client";



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

### Glass

Translucent frosted-glass treatment with backdrop blur.

- Pass `variant="glass"` to get a translucent card with backdrop blur and glass border highlights.

```tsx
"use client";



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

### Liquid Glass

Fluid glassmorphism featuring real SVG displacement mapping, multi-layer specular highlights, and fluid reflections.

- Pass `variant="liquid-glass"` for real liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and liquid glass buttons.

```tsx
"use client";




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

## Features
Discover the Modal's flexible overlay features, designed for important user prompts with accessible focus management and animations.

### Variant Presets

Pre-styled variants (standard, confirmation, form, fullscreen, glass, liquid-glass) eliminate boilerplate styling.

### Accessible

Built with aria dialog roles, label connections, Escape dismissal, and body scroll locking.

### Responsive

Optimized sizing and wrapped action rows that adapt seamlessly across mobile, tablet, and desktop.

### Composable

Supports optional subcomponents (ModalHeader, ModalBody, ModalFooter) for fully custom layouts.

## Best Practices & Guidelines

### Usage Guidelines

Pass `variant` with title, description, and button labels for fast implementation without manual styling. If you need complete layout freedom, use `ModalHeader`, `ModalBody`, and `ModalFooter` subcomponents directly.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Modal` | `isOpen` | `boolean` | required | The open state. Modal is fully controlled — it never holds this itself, so the same modal can be driven by a button, a route or the end of an async call. |
| `Modal` | `onClose` | `() => void` | required | Called once the close transition has finished, whether it was started by the built-in X, the `Escape` key or a backdrop click. Set `isOpen` to `false` here. |
| `Modal` | `variant` | `"standard" \| "confirmation" \| "form" \| "fullscreen" \| "glass" \| "liquid-glass" \| "custom"` | `"standard"` | Pre-configured design variant. Automatically styles the layout, sizing, header icon, and action buttons. |
| `Modal` | `title` | `React.ReactNode` | `undefined` | Dialog headline or title. |
| `Modal` | `description` | `React.ReactNode` | `undefined` | Body copy or subtitle text. |
| `Modal` | `badge` | `React.ReactNode` | `undefined` | Status badge or version text displayed in the header. |
| `Modal` | `icon` | `React.ReactNode` | `undefined` | Custom icon element to override the variant's default icon. |
| `Modal` | `confirmText` | `string` | `undefined` | Label for the primary confirmation button. |
| `Modal` | `cancelText` | `string` | `undefined` | Label for the secondary cancel/dismiss button. |
| `Modal` | `deleteText` | `string` | `undefined` | Label for destructive action button in fullscreen variant. |
| `Modal` | `onConfirm` | `() => void` | `undefined` | Callback when the confirm button is clicked. Defaults to `onClose`. |
| `Modal` | `onCancel` | `() => void` | `undefined` | Callback when the cancel button is clicked. Defaults to `onClose`. |
| `Modal` | `contentClassName` | `string` | `undefined` | Custom CSS classes for the modal panel. Merged with variant defaults. |
| `Modal` | `overlayClassName` | `string` | `undefined` | Custom CSS classes for the backdrop overlay. |
| `Modal` | `hideCloseButton` | `boolean` | `false` | Removes the top-right X button (automatically true for `confirmation` variant). |
| `ModalHeader / Body / Footer` | `children` | `React.ReactNode` | `undefined` | Optional subcomponents for building completely custom modal layouts. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/modal
