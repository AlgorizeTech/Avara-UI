# Modal Dialog

A highly animated, dynamic Modal component. Built from scratch using `gsap` for butter-smooth scaling and fading animations. It includes distinct visual variants and content types to handle alerts, forms, and complex interfaces.

## Examples

Click the trigger in each preview to open that modal. The `type` prop swaps the layout inside the modal; `variant` restyles the container. The first example's **Code** tab contains the full component source.

_Note: in these previews the modal is absolutely positioned so it stays inside the box. In your app it covers the whole viewport._

export const usageDefault = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function ModalDemo() {
  return ;
}`;

export const usageForm = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function FormModal() {
  // "form" swaps the body for a labelled input layout with a submit action.
  return ;
}`;

export const usageConfirmation = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function ConfirmModal() {
  // "confirmation" is the compact are-you-sure shape with two actions.
  return ;
}`;

export const usageFullscreen = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function FullscreenModal() {
  // "fullscreen" fills the viewport — good for editors and media views.
  return ;
}`;

export const usageGlass = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function GlassModal() {
  // Glass leans on a heavy backdrop blur — best over a colorful page.
  return (

  );
}`;

export const usageMinimal = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function MinimalModal() {
  // No border, softer shadow, tighter radius.
  return ;
}`;

export const usageBordered = `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function BorderedModal() {
  // Square corners, 2px border and a hard offset shadow.
  return ;
}`;

## Installation

### 1. Install Dependencies

This component relies heavily on `gsap` to handle the mounting/unmounting lifecycle perfectly without harsh visual jumping, and `lucide-react` for standard UI icons.

```bash
npm install gsap lucide-react
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/ModalBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

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

**Component Path:** `nextjs\modal\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
