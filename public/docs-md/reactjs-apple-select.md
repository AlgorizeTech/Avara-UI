---
title: "Shadcn Apple Select"
description: "Shadcn Apple Select. An iOS-style text selection highlight (`AppleSelect`) with optional lollipop handles, entrance animation."
url: https://avaraui.com/docs/nextjs/apple-select
---

# Shadcn Apple Select

An iOS-style text selection highlight (`AppleSelect`) with optional lollipop handles, entrance animation, and multi-line rounded fragment rendering.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/apple-select.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/apple-select
```

## Apple Select

Pass the full `text` and the `[start, end]` character range to highlight.

- `selection` is the character range — `end` is exclusive, exactly like `String.slice`, so `[43, 60]` covers `"ability to select"`.

```tsx
import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

// The author picks the highlighted range — it is fixed, not draggable.
// [43, 60] covers "ability to select" (end is exclusive, like String.slice).
export default function SelectionDemo() {
  return (
    <AppleSelect
      text="Introduced with iOS 3 in June 2009 was the ability to select, copy and paste text using selection handles displayed on either end of the highlighted range."
      selection={[43, 60]}
      className="max-w-lg text-2xl font-medium tracking-tight"
    />
  );
}
```

## Without handles

- Set `handles={false}` to keep the translucent highlight and drop the lollipops — closer to a desktop selection.

```tsx
import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

export default function HighlightOnly() {
  return (
    <AppleSelect
      text="Introduced with iOS 3 in June 2009 was the ability to select, copy and paste text using selection handles displayed on either end of the highlighted range."
      selection={[43, 60]}
      handles={false}
      className="max-w-lg text-2xl font-medium tracking-tight"
    />
  );
}
```

## Animated

Hit Reset on the preview to replay the entrance.

- Set `animate` to fade the highlight in and pop the handles on mount — handy when the selection is the point of the slide.

```tsx
import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

export default function AnimatedSelection() {
  return (
    <AppleSelect
      text="Introduced with iOS 3 in June 2009 was the ability to select, copy and paste text using selection handles displayed on either end of the highlighted range."
      selection={[43, 60]}
      animate
      className="max-w-lg text-2xl font-medium tracking-tight"
    />
  );
}
```

## Across lines

- `selection` can span as many lines as it needs; each wrapped fragment keeps its own rounded corners and the handles sit at the true start and end.

```tsx
import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

// A range that wraps across lines — every line fragment keeps its own
// rounded corners thanks to box-decoration-break: clone.
export default function MultilineSelection() {
  return (
    <AppleSelect
      text="Design is not just what it looks like and feels like. Design is how it works. Simplicity is the ultimate sophistication, and it takes a lot of hard work to make something simple."
      selection={[78, 177]}
      className="max-w-lg text-2xl font-medium tracking-tight"
    />
  );
}
```

## About Shadcn Apple Select

**What it is.** `AppleSelect` renders a `text` string with one or more `selection` ranges drawn as an iOS-style highlight. Each range gets a translucent tint and, unless `handles={false}`, a lollipop handle at either end. It is a visual callout, not a real text selection.

**How it is built.** It is plain React and CSS. The highlighted slice sits in a `<mark>` element tinted with `color-mix()`, `box-decoration-break: clone` keeps rounded corners on every wrapped line, and the handles are `aria-hidden`. `as` renders a `p` or a `span`, and `animate` adds a short fade and handle pop.

**When to use it.** Use it in docs, onboarding tips and marketing copy to point at part of a sentence without a screenshot. For a form control, use [Select](https://avaraui.com/docs/reactjs/select).

## For AI agents

**When to use**

- Illustrative iOS-style text selection callouts in hero copy, onboarding tips, or documentation

**When not to use**

- Interactive form dropdowns: use [Select](https://avaraui.com/docs/reactjs/select)
- Animated headline typography: use [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography)

**Agent notes**

- Named export: `import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock"`.
- `text` (string) and `selection` are required. `selection` is `[start, end]` or an array of such pairs, with an exclusive `end` like `String.slice`. Compute offsets from `text.indexOf(...)` so copy edits stay aligned.
- Out-of-range values are clamped, overlapping ranges merge and an empty range renders plain text.
- `color` is any CSS colour (default `var(--primary)`), `handles` defaults to `true`, `animate` to `false` and `as` to `"p"`; use `as="span"` to sit inline.

## Props Reference

### `<AppleSelect>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | Required | The full sentence or paragraph to render. |
| `selection` | `[number, number] \| [number, number][]` | Required | Character range to highlight as `[start, end]`, or several ranges for more than one phrase — each gets its own handles. `end` is exclusive, like `String.slice`; out-of-range values are clamped, overlapping ranges merge, and an empty range renders plain text. |
| `color` | `string` | `"var(--primary)"` | Accent for the highlight tint and the handles. Accepts any CSS colour, including hex codes. |
| `handles` | `boolean` | `true` | Show the iOS-style lollipop handles on either end of the range. |
| `animate` | `boolean` | `false` | Fade the highlight in and pop the handles when the component mounts. |
| `as` | `"p" \| "span"` | `"p"` | The element to render. Use `"span"` to highlight a phrase inside a paragraph of your own; inline, it takes the surrounding line height. |
| `...props` | `HTMLAttributes<HTMLElement>` | `undefined` | Passed to the rendered element, including `className` and `style`. `color` is the highlight colour, not the CSS text colour. |

## Works with other components

- [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography) or [Text Animation](https://avaraui.com/docs/reactjs/text-animation) to animate the headline around a highlighted phrase in hero and feature callouts.
- [Select](https://avaraui.com/docs/reactjs/select) when readers need to choose a value, since `AppleSelect` only displays a highlight.

## Is AppleSelect interactive or draggable?

No. `AppleSelect` is a decorative callout: the author sets the `[start, end]` range in code, and the handles cannot be dragged. Visitors can still select the text with the browser as usual. For an interactive choice, use [Select](https://avaraui.com/docs/reactjs/select).

## How do I highlight a phrase without counting characters in AppleSelect?

Find the phrase with `text.indexOf(phrase)` and pass `[start, start + phrase.length]` as `selection`. Because `end` is exclusive, like `String.slice`, that range covers exactly the phrase, and it stays correct when you edit the copy around it.

## Can AppleSelect highlight more than one phrase?

Yes. Pass an array of ranges, such as `selection={[[4, 10], [20, 31]]}`. Each range gets its own highlight and handles. Overlapping ranges are merged into one, out-of-range values are clamped to the text length, and an empty range renders as plain text.

## How do I use AppleSelect inside my own paragraph?

Set `as="span"` so it renders inline and takes the surrounding line height, then place it in your paragraph. The component renders the whole `text` string, so pass only the phrase you want in that spot, with a `selection` range inside it.

## How do I change the AppleSelect highlight colour?

Pass `color` with any CSS colour, such as `"#8b5cf6"` or `"oklch(0.7 0.15 250)"`. It tints the highlight at 35% opacity and colours the handles. The default is `var(--primary)`, so it follows your theme tokens and changes with the Themes presets.

## Does AppleSelect respect reduced motion and screen readers?

Yes. The `animate` fade and handle pop only run when `prefers-reduced-motion` is `no-preference`; otherwise the selection simply appears. The handles are `aria-hidden`, and the highlighted text stays inside the sentence in a `<mark>` element, so the text reads normally.

---

Live previews and every example: https://avaraui.com/docs/nextjs/apple-select
