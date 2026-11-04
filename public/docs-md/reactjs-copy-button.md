---
title: "Copy Button"
description: "A button that puts text on the clipboard and says so — the icon pops from a clipboard to a check, the label rises from \"Copy\" to \"Copied!\", and both settle…"
url: https://avaraui.com/docs/nextjs/copy-button
---

# Copy Button

A button that puts text on the clipboard and says so — the icon pops from a clipboard to a check, the label rises from "Copy" to "Copied!", and both settle back after a moment.

It ships in three pieces: `CopyButton` for any surface (toolbars, code blocks, cards), `CopyField` for the classic read-only input with a copy button beside or inside it, and the `useCopyToClipboard` hook when you want the behaviour with your own markup. The write uses the async Clipboard API and falls back to a hidden textarea where that is unavailable, and a failed write shows a brief "Failed" state instead of lying about success.

Explore the different variations of the Copy Button — each example shows a live preview with the exact code to copy. Click a button to see it confirm.

## Copy Button

Click it — the icon pops to a check and the label swaps to `Copied!` for two seconds.

- `value` is the text written to the clipboard.
- `label` is the resting text and `copiedLabel` the confirmation — `Copy` and `Copied!` by default.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopyLink() {
  return <CopyButton value="https://nexus.dev/u/johndoe" label="Copy Link" />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/copy-button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/copy-button
```

## Examples

### Variants

- `variant` is `"solid"` (default), `"soft"`, `"outline"` or `"ghost"`. Every variant flashes the theme colour on success so the confirmation reads even on a quiet button.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopyVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <CopyButton value="solid" variant="solid" />
      <CopyButton value="soft" variant="soft" />
      <CopyButton value="outline" variant="outline" />
      <CopyButton value="ghost" variant="ghost" />
    </div>
  );
}
```

### Sizes

- `size` is `"sm"`, `"md"` (default) or `"lg"` — height, padding and icon scale together.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopySizes() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <CopyButton value="sm" size="sm" />
      <CopyButton value="md" size="md" />
      <CopyButton value="lg" size="lg" />
    </div>
  );
}
```

### Icon only

- Set `iconOnly` for a square button with no label — for toolbars and table rows. It keeps an accessible name that flips to `Copied` after a successful write.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

// iconOnly drops the label and renders a square button; the accessible name
// is still announced, and flips to "Copied" after a successful write.
export default function IconOnly() {
  return (
    <div className="flex items-center gap-4">
      <CopyButton value="https://nexus.dev/u/johndoe" iconOnly variant="solid" />
      <CopyButton value="https://nexus.dev/u/johndoe" iconOnly variant="soft" />
      <CopyButton value="https://nexus.dev/u/johndoe" iconOnly variant="outline" />
      <CopyButton value="https://nexus.dev/u/johndoe" iconOnly variant="ghost" />
    </div>
  );
}
```

### Copy field

The share-link pattern: a read-only input with the button beside it.

- Use `CopyField` to render the value in a read-only input with a `CopyButton` next to it. Clicking the input selects everything; `buttonProps` forwards labels, variant and timeout to the button.

```tsx
import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";

// A read-only input with the button beside it. Clicking the field selects
// the whole value; buttonProps forwards anything CopyButton accepts.
export default function ProfileLink() {
  return (
    <CopyField
      label="Profile link"
      value="https://nexus.dev/u/johndoe"
      buttonProps={{ label: "Copy Link", copiedLabel: "Copied!" }}
    />
  );
}
```

### Inset button

- Set `inset` on `CopyField` to tuck an icon-only ghost button inside the field's right edge; `prefix` adds an icon on the left.

```tsx
import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";

// inset tucks an icon-only ghost button inside the field's right edge.
export default function InviteLink() {
  return (
    <CopyField
      label="Invite link"
      value="https://nexus.dev/invite/7f3a9c"
      inset
      prefix={<Link2 />}
    />
  );
}
```

### In a code block

- Combine `variant="ghost"` with a `className` to blend the button into any toolbar — here a terminal header that follows the light and dark theme.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

const SNIPPET = "npx shadcn@latest add @avara-ui/copy-button";

export default function CommandBlock() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" /> Terminal
        </span>
        {/* ghost + a custom className blends it into the toolbar in both themes */}
        <CopyButton
          value={SNIPPET}
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
        />
      </div>
      <pre className="overflow-auto px-4 py-4 text-[13px] leading-relaxed text-foreground">
        <code>{SNIPPET}</code>
      </pre>
    </div>
  );
}
```

### Custom labels & timing

- `timeout` is how long the copied state lingers in milliseconds (default `2000`). `onCopy` fires with the value and whether the write succeeded.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CustomLabels() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* timeout controls how long the confirmation lingers */}
      <CopyButton
        value="SUMMER-2026"
        label="Copy promo code"
        copiedLabel="Code copied"
        timeout={1000}
      />
      <CopyButton
        value="sk_live_51N2…"
        label="Reveal & copy key"
        copiedLabel="Key on clipboard"
        timeout={4000}
        variant="outline"
        onCopy={(value, ok) => ok && console.log("copied", value)}
      />
    </div>
  );
}
```

### The hook on its own

`useCopyToClipboard(timeout?)`, exported from `copy-button-hooks.ts` (installed beside the block), returns `{ copy, status, copied }`. `copy(text)` resolves to a boolean, and `status` is `"idle" | "copied" | "error"`, resetting itself after `timeout` ms — everything the button does, for your own markup.

```tsx
"use client";

import { useCopyToClipboard } from "@/components/custom/blocks/copy-button-hooks";

export default function CopyRow() {
  const { copy, copied } = useCopyToClipboard(1500);

  return (
    <button type="button" onClick={() => copy("hello@nexus.dev")}>
      {copied ? "Email copied" : "hello@nexus.dev"}
    </button>
  );
}
```

## Features
Discover the Copy Button's capabilities for confirming a clipboard write without a toast.

### Inline confirmation

The feedback lives in the button itself — a popping check and a rising label — so nothing else on the page has to move.

### Honest states

A blocked clipboard shows Failed rather than a false success, and `onCopy` tells you which it was.

### Works everywhere

Uses the async Clipboard API and falls back to a hidden textarea on older browsers and non-secure origins.

### Accessible

A polite live region announces the change; icon-only buttons carry a name that updates to Copied.

## Best Practices & Guidelines

### Say what was copied

Prefer specific labels — Copy Link, Code copied — over a bare Copy when more than one thing on the screen could be copied.

### Don't close the surface on copy

Let the confirmation play before dismissing a dialog or popover — closing on click hides the only feedback the user gets.

## Props Reference

### `<CopyButton>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | Required | The text written to the clipboard. |
| `label` | `ReactNode` | `"Copy"` | Resting label. |
| `copiedLabel` | `ReactNode` | `"Copied!"` | Label shown after a successful write. |
| `errorLabel` | `ReactNode` | `"Failed"` | Label shown when the clipboard write is refused. |
| `iconOnly` | `boolean` | `false` | Hide the label and render a square icon button with an accessible name. |
| `timeout` | `number` | `2000` | How long the copied / failed state lingers, in ms. |
| `variant` | `"solid" \| "soft" \| "outline" \| "ghost"` | `"solid"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height, padding and icon size. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Theme colour for the solid / soft fills, the success flash and the focus ring. Accepts hex codes. |
| `onCopy` | `(value: string, ok: boolean) => void` | — | Fires after the write with the value and whether it succeeded. |

Every other `<button>` attribute (`className`, `disabled`, `onClick`…) is forwarded. Calling `preventDefault()` in your own `onClick` cancels the copy.

### `<CopyField>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | Required | Shown in the read-only input and copied by the button. |
| `label` | `string` | — | Bold label above the field. |
| `buttonProps` | `Omit<CopyButtonProps, \"value\">` | — | Forwarded to the embedded button — labels, variant, timeout, `onCopy`… |
| `inset` | `boolean` | `false` | Render an icon-only ghost button inside the field's right edge instead of a full button beside it. |
| `prefix` | `ReactNode` | — | Icon or adornment on the field's left side. |
| `selectOnClick` | `boolean` | `true` | Select the whole value when the input is clicked. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Field and button height. |
| `color` | `string` | `"primary"` | Theme colour shared by the button and the field's focus ring. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/copy-button
