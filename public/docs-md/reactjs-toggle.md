---
title: "Toggle"
description: "A two-state button that can be either on or off. Free shadcn/ui Toggle component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/toggle
---

# Toggle

A two-state button that can be either on or off.

Toggles are primarily used to manage interface states (like text formatting in an editor or muting a track) rather than submitting form data. This `ToggleBlock` automatically manages the `data-state` and `aria-pressed` HTML attributes to ensure visual feedback and screen-reader accessibility are perfectly synced.

Explore the different variations of the Toggle component — each example shows a live preview with the exact code to copy.

## Sizes

- Use `size` to change the hit area and icon scale.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";

export default function ToggleSizes() {
  return (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle size="md" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </Toggle>
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/toggle.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/toggle
```

## Examples

### With text

- `children` can hold an icon and a label together when the toggle drives a named action.

```tsx
export default function MuteToggle() {
  const [muted, setMuted] = useState(false);

  return (
    <Toggle pressed={muted} onPressedChange={setMuted}>
      {muted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
      {muted ? "Unmute" : "Mute"}
    </Toggle>
  );
}
```

### Toolbar

- `pressed` is per-toggle — a toolbar is just independent toggles side by side, not a group component.

```tsx
export default function FormattingToolbar() {
  const [format, setFormat] = useState({ bold: false, italic: true, underline: false });

  return (
    <div className="flex items-center p-1 rounded-lg border border-border">
      <Toggle
        pressed={format.bold}
        onPressedChange={(v) => setFormat({ ...format, bold: v })}
        aria-label="Toggle bold"
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={format.italic}
        onPressedChange={(v) => setFormat({ ...format, italic: v })}
        aria-label="Toggle italic"
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={format.underline}
        onPressedChange={(v) => setFormat({ ...format, underline: v })}
        aria-label="Toggle underline"
      >
        <Underline className="w-4 h-4" />
      </Toggle>
    </div>
  );
}
```

### Disabled

- Set `disabled` to lock the toggle in whatever state it is currently in.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";

export default function DisabledToggle() {
  return (
    <Toggle disabled pressed aria-label="Toggle bold">
      <Bold className="w-4 h-4" />
    </Toggle>
  );
}
```

## Usage

### Uncontrolled (Simple)

If you don't need to tightly bind the component to React state, you can let it manage its own internal state and just provide a `defaultPressed` value.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Star } from "lucide-react";

export default function SimpleToggle() {
  return (
    <Toggle defaultPressed aria-label="Toggle star">
      <Star className="w-4 h-4" />
    </Toggle>
  );
}
```

## Controlled (Advanced)

If you are building complex interfaces (like a Rich Text Editor), you should control the state directly using the pressed and onPressedChange prop

```tsx
import { useState } from "react";
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold } from "lucide-react";

export default function Toolbar() {
  const [isBold, setIsBold] = useState(false);

  return (
    <div className="flex gap-1 border p-1 rounded-md">
      <Toggle
        pressed={isBold}
        onPressedChange={setIsBold}
        aria-label="Toggle bold"
      >
        <Bold className="w-4 h-4" />
      </Toggle>
    </div>
  );
}
```

## Features
Explore the Toggle button's simple two-state functionality, perfect for on/off switches and boolean preferences with smooth transitions.

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
| `Toggle` | `pressed` | `boolean` | `undefined` | The controlled pressed state of the toggle. If provided, the component relies entirely on this value. |
| `Toggle` | `defaultPressed` | `boolean` | `false` | The starting state when the component is uncontrolled. |
| `Toggle` | `onPressedChange` | `(pressed: boolean) => void` | `undefined` | Event handler called when the pressed state of the toggle changes. |
| `Toggle` | `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | The visual style variant. `ghost` is highly recommended when clustering multiple toggles together in a toolbar. |
| `Toggle` | `size` | `"sm" \| "md" \| "lg"` | `"md"` | Adjusts the height, horizontal padding, and text-size of the toggle button. |
| `Toggle` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/toggle
