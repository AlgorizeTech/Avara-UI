# Modal Dialog

A highly animated, dynamic Modal component. Built from scratch using `gsap` for butter-smooth scaling and fading animations. It includes distinct visual variants and content types to handle alerts, forms, and complex interfaces.

Click the trigger in each preview to open that modal. The `type` prop swaps the layout inside the modal; `variant` restyles the container.

_Note: in these previews the modal is absolutely positioned so it stays inside the box. In your app it covers the whole viewport._

export const usageDefault = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  // ModalBlock ships the trigger, the open state and the content shown here.
  return ;
}`;

export const usageForm = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  // "form" swaps the body for the invite fields and widens the panel.
  return ;
}`;

export const usageConfirmation = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  // "confirmation" is the narrow destructive-action layout.
  return ;
}`;

export const usageFullscreen = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  // "fullscreen" fills the viewport for settings-style panels.
  return ;
}`;

export const usageGlass = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  // "glass" is a surface treatment — it composes with any \`type\`.
  return ;
}`;

## Installation

## Examples

## Composing your own content

Every preview above is `ModalBlock` — the ready-made component, content included.
When you need your own content instead, the same file exports the parts it is
built from. There is no preview for this section on purpose: what it renders is
whatever you put inside it, so a screenshot here would show our copy rather than
yours.

```tsx
"use client";

export default function ConfirmDeleteModal() {
  // Modal is controlled: you own `isOpen`, it renders against it.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Delete project

       setIsOpen(false)}
        contentClassName="max-w-sm"
      >

            This permanently removes the project and everything in it. This
            cannot be undone.

           setIsOpen(false)}>Cancel
           setIsOpen(false)}>Delete

  );
}
```

## Features
Discover the Modal's flexible overlay features, designed for important user prompts with accessible focus management and animations.

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

        Prop
        Type
        Default
        Description

          type

          "standard" | "form" | "fullscreen" | "confirmation"

          "standard"

          Changes the internal structure and dimensions of the modal content.

          variant

          "default" | "glass" | "minimal" | "bordered"

          "default"

          Applies overarching structural styles to the modal container.{" "}
          glass adds deep backdrop blurring, while{" "}
          minimal removes borders and harsh shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary buttons, focus rings, and
          accent icons. Accepts valid hex codes (e.g. "#00FF00").

---

**Component Path:** `[framework]\modal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
