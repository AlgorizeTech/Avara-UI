export const metadata = docsPageMetadata("modal");

# Modal

A versatile, accessible dialog component with built-in design variants. Choose from pre-configured variants (`standard`, `confirmation`, `form`, `fullscreen`, `glass`, `liquid-glass`) to instantly get complete layout, responsive sizing, and interactive buttons—or use composable subcomponents for custom dialogs.

`Modal` manages all dialog complexities—portals, focus traps, backdrop dismissal, Escape key handling, body scroll locking, and smooth enter/exit animations.

export const usageStandard = `"use client";

export default function UpdateModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Standard Modal

       setIsOpen(false)}
        variant="standard"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    
  );
}`;

export const usageForm = `"use client";

export default function InviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Viewer");

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Form Modal

       setIsOpen(false)}
        variant="form"
        title="Invite Team Member"
        cancelText="Cancel"
        confirmText="Send Invite"
        onConfirm={() => setIsOpen(false)}
      >

              Email Address

              Role & Permissions

              Personal Message (Optional)

  );
}`;

export const usageConfirmation = `"use client";

export default function ConfirmDeleteModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Confirmation Modal

       setIsOpen(false)}
        variant="confirmation"
        title="Delete permanently?"
        description="Are you sure you want to delete this item? This action cannot be undone and all data will be lost."
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={() => setIsOpen(false)}
      />
    
  );
}`;

export const usageFullscreen = `"use client";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Fullscreen Modal

       setIsOpen(false)}
        variant="fullscreen"
        title="Project Configuration"
        description="Manage all global settings for your workspace."
        deleteText="Delete Project"
        cancelText="Discard Changes"
        confirmText="Save Configuration"
        onConfirm={() => setIsOpen(false)}
        onDelete={() => setIsOpen(false)}
      >

              General

              Security

  );
}`;

export const usageGlass = `"use client";

export default function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Glass Modal

       setIsOpen(false)}
        variant="glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    
  );
}`;

export const usageLiquidGlass = `"use client";

export default function LiquidGlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground transition-transform active:scale-95"
      >
        Open Liquid Glass Modal

       setIsOpen(false)}
        variant="liquid-glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        icon={}
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/modal
```

## Examples

## Features
Discover the Modal's flexible overlay features, designed for important user prompts with accessible focus management and animations.

    Variant Presets
    Pre-styled variants (standard, confirmation, form, fullscreen, glass, liquid-glass) eliminate boilerplate styling.

    Accessible
    Built with aria dialog roles, label connections, Escape dismissal, and body scroll locking.

    Responsive
    Optimized sizing and wrapped action rows that adapt seamlessly across mobile, tablet, and desktop.

    Composable
    Supports optional subcomponents (ModalHeader, ModalBody, ModalFooter) for fully custom layouts.

## Best Practices & Guidelines

    Usage Guidelines
    Pass variant with title, description, and button labels for fast implementation without manual styling. If you need complete layout freedom, use ModalHeader, ModalBody, and ModalFooter subcomponents directly.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Modal

          isOpen

          boolean

          required

          The open state. Modal is fully controlled — it never holds this
          itself, so the same modal can be driven by a button, a route or the
          end of an async call.

          Modal

          onClose

          {`() => void`}

          required

          Called once the close transition has finished, whether it was started
          by the built-in X, the Escape key or a backdrop click.
          Set isOpen to false here.

          Modal

          variant

          {`"standard" | "confirmation" | "form" | "fullscreen" | "glass" | "liquid-glass" | "custom"`}

          "standard"

          Pre-configured design variant. Automatically styles the layout, sizing, header icon, and action buttons.

          Modal

          title

          React.ReactNode

          undefined

          Dialog headline or title.

          Modal

          description

          React.ReactNode

          undefined

          Body copy or subtitle text.

          Modal

          badge

          React.ReactNode

          undefined

          Status badge or version text displayed in the header.

          Modal

          icon

          React.ReactNode

          undefined

          Custom icon element to override the variant's default icon.

          Modal

          confirmText

          string

          undefined

          Label for the primary confirmation button.

          Modal

          cancelText

          string

          undefined

          Label for the secondary cancel/dismiss button.

          Modal

          deleteText

          string

          undefined

          Label for destructive action button in fullscreen variant.

          Modal

          onConfirm

          {`() => void`}

          undefined

          Callback when the confirm button is clicked. Defaults to onClose.

          Modal

          onCancel

          {`() => void`}

          undefined

          Callback when the cancel button is clicked. Defaults to onClose.

          Modal

          contentClassName

          string

          undefined

          Custom CSS classes for the modal panel. Merged with variant defaults.

          Modal

          overlayClassName

          string

          undefined

          Custom CSS classes for the backdrop overlay.

          Modal

          hideCloseButton

          boolean

          false

          Removes the top-right X button (automatically true for confirmation variant).

          ModalHeader / Body / Footer

          children

          React.ReactNode

          undefined

          Optional subcomponents for building completely custom modal layouts.

---

**Component Path:** `[framework]\modal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
