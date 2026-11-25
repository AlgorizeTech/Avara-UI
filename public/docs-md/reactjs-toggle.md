---
title: "Shadcn Toggle"
description: "A two-state button (`Toggle`) for pressed/unpressed UI controls with `aria-pressed` and `data-state` synchronization. Free shadcn/ui Toggle component."
url: https://avaraui.com/docs/nextjs/toggle
---

# Shadcn Toggle

A two-state button (`Toggle`) for pressed/unpressed UI controls with `aria-pressed` and `data-state` synchronization.

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

## Sizes

- Use `size` to change the hit area and icon scale.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold } from "lucide-react";

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

## With text

- `children` can hold an icon and a label together when the toggle drives a named action.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

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

## Toolbar

- `pressed` is per-toggle — a toolbar is just independent toggles side by side, not a group component.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

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

## Disabled

- Set `disabled` to lock the toggle in whatever state it is currently in.

```tsx
import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold } from "lucide-react";

export default function DisabledToggle() {
  return (
    <Toggle disabled pressed aria-label="Toggle bold">
      <Bold className="w-4 h-4" />
    </Toggle>
  );
}
```

## About Shadcn Toggle

**What it is.** A two-state `Toggle` button supporting `default` and `outline` variants, multiple sizes, icon-only or icon-plus-text children, and controlled (`pressed` / `onPressedChange`) or uncontrolled (`defaultPressed`) state.

**How it is built.** Manages `aria-pressed` and `data-state="on" | "off"` attributes automatically for accessible screen-reader announcements and clean state-driven styling.

**When to use it.** Use `Toggle` for standalone binary UI controls (mute, pin, star, bold). When multiple toggles share single- or multi-select group state, use [Toggle Group](https://avaraui.com/docs/reactjs/toggle-group).

## For AI agents

**When to use**

- Independent two-state toolbar or preference buttons (icon-only or icon + label)
- Controlled (`pressed` + `onPressedChange`) or uncontrolled (`defaultPressed`) pressed state

**When not to use**

- Mutually exclusive or coordinated button groups — use [Toggle Group](https://avaraui.com/docs/reactjs/toggle-group)
- One-shot action triggers — use [Button](https://avaraui.com/docs/reactjs/button)

**Agent notes**

- Named export: `import { Toggle } from "@/components/custom/blocks/ToggleBlock"`
- Always provide `aria-label` when rendering icon-only toggles

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Toggle` | `pressed` | `boolean` | `undefined` | The controlled pressed state of the toggle. If provided, the component relies entirely on this value. |
| `Toggle` | `defaultPressed` | `boolean` | `false` | The starting state when the component is uncontrolled. |
| `Toggle` | `onPressedChange` | `(pressed: boolean) => void` | `undefined` | Event handler called when the pressed state of the toggle changes. |
| `Toggle` | `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | The visual style variant. `ghost` is highly recommended when clustering multiple toggles together in a toolbar. |
| `Toggle` | `size` | `"sm" \| "md" \| "lg"` | `"md"` | Adjusts the height, horizontal padding, and text-size of the toggle button. |
| `Toggle` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides. |

## Works with other components

- Upgrade to [Toggle Group](https://avaraui.com/docs/reactjs/toggle-group) when toggles need coordinated single or multiple selection.
- Pair icon-only `Toggle` controls with [Tooltip](https://avaraui.com/docs/reactjs/tooltip) for keyboard and hover labels.
- Use [Button](https://avaraui.com/docs/reactjs/button) for one-off actions rather than persistent on/off state.

## How do I make a toggle button with pressed state in React?

Render `Toggle` and either let it manage itself with `defaultPressed`, which is `false` by default, or control it with `pressed` and `onPressedChange`. It keeps `aria-pressed` and `data-state` in sync, so assistive technology and your CSS can both read the state.

## How do I control Toggle state externally?

Pass `pressed` and `onPressedChange` for controlled React state. When `pressed` is provided, `Toggle` relies entirely on that value. Pass `defaultPressed` instead if you want the component to manage its own state internally.

## Should I use Toggle or ToggleGroup?

Use `Toggle` for independent binary states, such as muting audio or pinning an item. Use [Toggle Group](https://avaraui.com/docs/reactjs/toggle-group) when several items share one coordinated single-choice or multiple-choice value, such as text alignment or a view switcher.

## Which Toggle variants and sizes are available?

`variant` is `"default"`, `"outline"` or `"ghost"`, and `size` is `"sm"`, `"md"` or `"lg"`. The `ghost` variant works best when you cluster several toggles in a toolbar. Children can be an icon alone or an icon plus text.

## How do I label an icon-only Toggle?

Wrap it with [Tooltip](https://avaraui.com/docs/reactjs/tooltip) for a hover and keyboard label. Because the toggle exposes `aria-pressed`, screen readers announce its on or off state, but an icon-only control still needs an accessible name such as an `aria-label`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/toggle
