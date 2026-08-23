# Toggle

A two-state button that can be either on or off.

Toggles are primarily used to manage interface states (like text formatting in an editor or muting a track) rather than submitting form data. This `ToggleBlock` automatically manages the `data-state` and `aria-pressed` HTML attributes to ensure visual feedback and screen-reader accessibility are perfectly synced.

Explore the different variations of the Toggle component — each example shows a live preview with the exact code to copy.

export const usageSizes = `import { Toggle } from "@/components/custom/blocks/ToggleBlock";

export default function ToggleSizes() {
  return (

  );
}`;

export const usageText = `export default function MuteToggle() {
  const [muted, setMuted] = useState(false);

  return (
    
      {muted ?  : }
      {muted ? "Unmute" : "Mute"}
    
  );
}`;

export const usageToolbar = `export default function FormattingToolbar() {
  const [format, setFormat] = useState({ bold: false, italic: true, underline: false });

  return (
    
       setFormat({ ...format, bold: v })}
        aria-label="Toggle bold"
      >

       setFormat({ ...format, italic: v })}
        aria-label="Toggle italic"
      >

       setFormat({ ...format, underline: v })}
        aria-label="Toggle underline"
      >

  );
}`;

export const usageDisabled = `import { Toggle } from "@/components/custom/blocks/ToggleBlock";

export default function DisabledToggle() {
  return (

  );
}`;

## Installation

## Examples

## Usage

### Uncontrolled (Simple)

If you don't need to tightly bind the component to React state, you can let it manage its own internal state and just provide a `defaultPressed` value.

```tsx

export default function SimpleToggle() {
  return (

  );
}
```

## Controlled (Advanced)

If you are building complex interfaces (like a Rich Text Editor), you should control the state directly using the pressed and onPressedChange prop

```tsx

export default function Toolbar() {
  const [isBold, setIsBold] = useState(false);

  return (

  );
}
```

## Features
Explore the Toggle button's simple two-state functionality, perfect for on/off switches and boolean preferences with smooth transitions.

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

          Toggle

          pressed

          boolean

          undefined

          The controlled pressed state of the toggle. If provided, the component
          relies entirely on this value.

          Toggle

          defaultPressed

          boolean

          false
        
        The starting state when the component is uncontrolled.

          Toggle

          onPressedChange

          {`(pressed: boolean) => void`}

          undefined

          Event handler called when the pressed state of the toggle changes.

          Toggle

          variant

          "default" | "outline" | "ghost"

          "default"

          The visual style variant. ghost is highly recommended
          when clustering multiple toggles together in a toolbar.

          Toggle

          size

          "sm" | "md" | "lg"

          "md"

          Adjusts the height, horizontal padding, and text-size of the toggle
          button.

          Toggle

          className

          string

          undefined
        
        Standard Tailwind CSS overrides.

---

**Component Path:** `[framework]\toggle\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
