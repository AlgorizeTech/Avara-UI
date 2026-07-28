# Collapsible

An interactive component which expands/collapses a panel.

Traditional collapsible components rely on Javascript (like `Element.scrollHeight`) to calculate the exact height of the content before animating it. This causes layout thrashing and stuttering.

The `CollapsibleBlock` is **100% dependency-free** and utilizes a modern CSS grid trick (`grid-template-rows: 0fr` transitioning to `1fr`) to handle dynamic height animations natively in the browser. This guarantees perfect 60fps performance without writing any Javascript measuring logic.

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

## Interactive Showcase

Use the controls below to see how incredibly versatile this component is. It can be used for simple FAQs, rich settings panels, or even deeply nested File Trees.

## Installation

### Copy the Component

This component is completely dependency-free.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/CollapsibleBlock.tsx`.

---

## Usage

### Simple Usage

Wrap your trigger button in `` and the content in ``.

```tsx

export default function BasicUsage() {
  return (

        Click to Expand

        This content was hidden!

  );
}
```

## Animating Icons

Because the Collapsible component automatically applies a data-state="open" or data-state="closed" attribute to its trigger, you can easily use standard Tailwind group logic to animate arrows or chevrons.

```tsx

export default function AnimatedChevron() {
  return (
    
      {/* 1. Add "group" to the trigger */}
      
        Toggle Me
        {/* 2. Target the group-data-[state=open] class to rotate */}

      Content here.
    
  );
}
```

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
