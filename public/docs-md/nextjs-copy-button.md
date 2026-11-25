---
title: "Shadcn Copy Button"
description: "Shadcn Copy Button. A clipboard button (`CopyButton`), read-only input (`CopyField`)."
url: https://avaraui.com/docs/nextjs/copy-button
---

# Shadcn Copy Button

A clipboard button (`CopyButton`), read-only input (`CopyField`), and `useCopyToClipboard` hook that confirm copies with an animated check and label swap.

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

## Variants

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

## Sizes

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

## Icon only

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

## Copy field

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

## Inset button

- Set `inset` on `CopyField` to tuck an icon-only ghost button inside the field's right edge; `prefix` adds an icon on the left.

```tsx
import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";
import { Link2 } from "lucide-react";

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

## In a code block

- Combine `variant="ghost"` with a `className` to blend the button into any toolbar — here a terminal header that follows the light and dark theme.

```tsx
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";
import { Terminal } from "lucide-react";

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

## Custom labels & timing

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

## About Shadcn Copy Button

**What it is.** A clipboard suite shipping `CopyButton` (`solid`, `soft`, `outline`, and `ghost` variants), `CopyField` (read-only input with beside or `inset` copy trigger), and the `useCopyToClipboard(timeout?)` hook (`{ copy, status, copied }`).

**How it is built.** Uses the async Clipboard API with a hidden-textarea fallback where it is unavailable (older browsers, non-secure origins), an `aria-live="polite"` button for screen readers, and an honest `"error"` (`Failed`) state if a write is blocked. The only npm dependency is `lucide-react`.

**When to use it.** Use `CopyButton` or `CopyField` for share links, API keys, CLI commands, and code block toolbars. For generic action triggers without clipboard feedback, use [Button](https://avaraui.com/docs/nextjs/button).

## For AI agents

**When to use**

- One-click clipboard buttons (`CopyButton`) with inline `Copy` → `Copied!` icon/label swap
- Share links, tokens, or install commands (`CopyField`, with optional `inset` button and `prefix` icon)
- Custom copy triggers via `useCopyToClipboard(timeout?)` from `@/components/custom/blocks/copy-button-hooks`

**When not to use**

- Standard action or submit buttons — use [Button](https://avaraui.com/docs/nextjs/button)
- Async multi-step action buttons — use [Action Button](https://avaraui.com/docs/nextjs/action-buttons)

**Agent notes**

- Named exports: `CopyButton`, `CopyField` from `@/components/custom/blocks/CopyButtonBlock`; `useCopyToClipboard` from `@/components/custom/blocks/copy-button-hooks`
- Pass `iconOnly` on `CopyButton` for toolbar/table cells; use `buttonProps` on `CopyField` to forward `label`, `variant`, or `timeout`
- `useCopyToClipboard` lives in a separate file that is installed with the component, so import it from `copy-button-hooks`, not `CopyButtonBlock`
- `color` takes `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a `#` hex code

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
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Theme colour for the solid / soft fills, the success flash and the focus ring. Accepts a preset name or a hex code starting with `#`; any other string falls back to `"primary"`. |
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

## Works with other components

- Embed `CopyField` inside [Dialog](https://avaraui.com/docs/nextjs/dialog) for share-profile or invite-link modals.
- Place `CopyButton` with `variant="ghost"` inside [Terminal](https://avaraui.com/docs/nextjs/terminal) or [Custom Code Block](https://avaraui.com/docs/nextjs/custom-code-block) headers.
- Pair `onCopy` with [Sonner](https://avaraui.com/docs/nextjs/sonner) if you also want a global notification.

## What happens if the clipboard API is blocked?

`useCopyToClipboard` first tries `navigator.clipboard.writeText`. If that is missing or throws, it falls back to a hidden textarea and `document.execCommand("copy")`. If that also fails, the button shows an X icon and the `errorLabel` (`Failed`), and `onCopy` receives `false` instead of a false confirmation.

## Can I use the clipboard logic with my own button markup?

Yes. Import `useCopyToClipboard` from `@/components/custom/blocks/copy-button-hooks` and call `const { copy, status, copied } = useCopyToClipboard(timeout)`. `copy(text)` returns a promise of a boolean, and `status` moves from `"idle"` to `"copied"` or `"error"`, then resets after `timeout` milliseconds.

## How do I show a toast or run code after CopyButton copies?

Pass `onCopy`, which fires after the write with the copied value and a boolean for success, so you can call a toast only when `ok` is `true`. To run something before the copy, use `onClick`; calling `preventDefault()` there cancels the copy entirely.

## How does an icon-only CopyButton stay accessible?

With `iconOnly`, the button drops its text and sets `aria-label` to `"Copy to clipboard"`, which becomes `"Copied"` after a successful write. It also carries `aria-live="polite"`. If you pass your own `aria-label`, it replaces the built-in one, because extra props are spread onto the button last.

## How do I change the CopyButton color?

Set `color` to `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex code starting with `#`. It tints the `solid` and `soft` fills, the focus ring, and the text flash on success. `outline` and `ghost` stay neutral at rest. An unrecognised name falls back to `"primary"`.

## How do I put the copy button inside a CopyField input?

Set `inset` on `CopyField`. It places an icon-only `ghost` button inside the input's right edge, and `prefix` adds an icon on the left. The field is read-only and selects its whole value on click unless you set `selectOnClick={false}`. Forward other button settings with `buttonProps`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/copy-button
