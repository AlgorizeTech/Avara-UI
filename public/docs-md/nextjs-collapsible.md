# Collapsible

An interactive component which expands/collapses a panel.

Traditional collapsible components rely on Javascript (like `Element.scrollHeight`) to calculate the exact height of the content before animating it. This causes layout thrashing and stuttering.

The `CollapsibleBlock` is **100% dependency-free** and utilizes a modern CSS grid trick (`grid-template-rows: 0fr` transitioning to `1fr`) to handle dynamic height animations natively in the browser. This guarantees perfect 60fps performance without writing any Javascript measuring logic.

## Examples

From a bare disclosure to a nested file tree — the same three parts every time. The first example's **Code** tab contains the full component source.

export const usageDefault = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function BasicUsage() {
  return (

        Click to Expand

        This content was hidden!

  );
}`;

export const usageFaq = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function Faq() {
  return (
    
      {/* defaultOpen renders this one expanded on first paint */}
      
        {/* "group" + group-data-[state=open] rotates the chevron for free */}
        
          Can I use this UI kit in open source?

            Absolutely! This code is completely dependency-free and yours to own.

          How does the animation work?

            It transitions grid-template-rows from 0fr to 1fr — smooth height
            animation with no JavaScript measuring.

  );
}`;

export const usageSettings = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function SettingsPanel() {
  return (

            Push Notifications
            Manage your alert preferences

        {/* Swap the affordance label using the same data-state hook */}
        
          Configure

          Close

            Email Alerts

            SMS Alerts

  );
}`;

export const usageFileTree = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function FileTree() {
  return (
    // Collapsibles nest freely — each level owns its own state.

          src

                app

                     layout.tsx

                     page.tsx

  );
}`;

export const usageDisabled = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function LockedSection() {
  return (
    // disabled makes the trigger ignore clicks and sets data-disabled.

        Billing history (locked on the free plan)

          You will never see this — the trigger ignores clicks.

  );
}`;

## Installation

### Copy the Component

This component is completely dependency-free.

Create a new file at `components/custom/blocks/CollapsibleBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

## Features
Discover the Collapsible component's accessible disclosure patterns and smooth height transitions for hiding detailed content.

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

        Component
        Prop
        Type
        Default
        Description

          Collapsible

          open

          boolean

          undefined

          The controlled open state of the collapsible. Must be used in
          conjunction with onOpenChange.

          Collapsible

          defaultOpen

          boolean

          false

          The initial open state of the collapsible when it is first rendered.
          Used for uncontrolled state management.

          Collapsible

          onOpenChange

          {`(open: boolean) => void`}

          undefined

          Event handler called when the open state of the collapsible changes.

          Collapsible

          disabled

          boolean

          false

          When true, prevents the user from interacting with the{" "}
          CollapsibleTrigger.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides for customized styling or spacing.

---

**Component Path:** `nextjs\collapsible\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
