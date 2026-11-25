---
title: "Shadcn Half Star Rating"
description: "Shadcn Half Star Rating. A zero-dependency star rating component (`HalfStars`) that fills each star to an exact decimal with a CSS clip."
url: https://avaraui.com/docs/nextjs/half-stars
---

# Shadcn Half Star Rating

A zero-dependency star rating component (`HalfStars`) that fills each star to an exact decimal with a CSS clip, and optionally lets visitors pick a rating by hovering and clicking.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/half-stars.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/half-stars
```

## Full stars

- `rating` is the value shown, and the only required prop.
- `allowHalf={false}` restricts interactive picking to whole numbers.

```tsx
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { useState } from "react";

export default function FullStarRating() {
  const [rating, setRating] = useState(3);

  return (
    <HalfStars
      rating={rating}
      size={40}
      interactive
      allowHalf={false}
      onRatingChange={setRating}
      showText={false}
    />
  );
}
```

## Half stars

- Set `allowHalf` — the default — for 0.5 precision while `interactive` is on.

```tsx
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { useState } from "react";

export default function HalfStarRating() {
  const [rating, setRating] = useState(3.5);

  return (
    <HalfStars
      rating={rating}
      size={40}
      interactive
      allowHalf
      onRatingChange={setRating}
    />
  );
}
```

## Continuous fractions

- Pass `step={0.1}` for fine-grained ratings like 2.3 or 4.6. It overrides `allowHalf` entirely.

```tsx
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { useState } from "react";

export default function PreciseRating() {
  const [rating, setRating] = useState(4.2);

  return (
    <HalfStars
      rating={rating}
      size={40}
      interactive
      step={0.1}
      onRatingChange={setRating}
    />
  );
}
```

## Custom scale and colors

- `maxStars` changes how many stars make up the scale, 5 by default.
- `activeColor` and `inactiveColor` take Tailwind **text colour classes**, not raw hex — e.g. `text-yellow-400`.
- `size={24}` is each star's width and height in pixels.

```tsx
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { useState } from "react";

export default function TenStarRating() {
  const [rating, setRating] = useState(7.5);

  return (
    <HalfStars
      rating={rating}
      maxStars={10}
      size={40}
      activeColor="text-primary"
      inactiveColor="text-red-200 dark:text-red-900"
      interactive
      allowHalf
      onRatingChange={setRating}
    />
  );
}
```

## About Shadcn Half Star Rating

**What it is.** `HalfStars` renders fractional star ratings (such as `3.7` or `4.5`) by clipping a filled SVG star to the fractional width, with optional interactive hover/click selection (`interactive`, `allowHalf`, `step`), custom `maxStars`, pixel `size`, and Tailwind color classes.

**How it is built.** Built with React and inline SVGs (zero external dependencies): an empty star in `inactiveColor` (`text-foreground/15` by default) sits under a filled star in `activeColor` (`text-primary` by default) that is clipped to the rating. It is controlled: you hold the rating and update it from `onRatingChange`.

**When to use it.** Use `HalfStars` on product cards, review summaries, testimonials, and user rating forms.

## For AI agents

**When to use**

- Read-only fractional rating displays (`rating={4.3}`) or interactive star pickers (`interactive`, `onRatingChange`)

**When not to use**

- Binary favorite/like toggles — use [Toggle](https://avaraui.com/docs/reactjs/toggle) or [Action Button](https://avaraui.com/docs/reactjs/action-buttons) (`StarButton`)

**Agent notes**

- Named export: `import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock"`
- `activeColor` and `inactiveColor` take Tailwind text color classes (e.g., `"text-yellow-400"`), not raw hex strings
- Passing `step` (e.g. `0.1`) overrides `allowHalf`
- Controlled: store the value in state and update it in `onRatingChange`, otherwise a click does not change what is shown. `onHoverChange` receives `0` when the pointer leaves.
- Interactive mode is pointer-only: there is no keyboard handling or ARIA rating role, so add your own accessible control if you need one.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `HalfStars` | `rating` | `number` | Required | The current rating value to display (e.g., `3.5` or `4.8`). |
| `HalfStars` | `maxStars` | `number` | `5` | The total number of stars to display. |
| `HalfStars` | `size` | `number` | `24` | The width and height of each individual star in pixels. |
| `HalfStars` | `activeColor` | `string` | `"text-primary"` | Tailwind text color class for the filled (active) portion of the stars. |
| `HalfStars` | `inactiveColor` | `string` | `"text-foreground/15"` | Tailwind text color class for the empty (inactive) portion of the stars. |
| `HalfStars` | `showText` | `boolean` | `true` | If true, displays the numerical rating text next to the stars (e.g. `4.8 / 5`). |
| `HalfStars` | `interactive` | `boolean` | `false` | If true, enables hover states and clicking to change the rating. |
| `HalfStars` | `allowHalf` | `boolean` | `true` | (Legacy) If true and `interactive` is true, allows users to select 0.5 increments. |
| `HalfStars` | `step` | `number` | `allowHalf ? 0.5 : 1` | Defines the precision increment (e.g. `0.1` for continuous). Overrides `allowHalf`. |
| `HalfStars` | `onRatingChange` | `(rating: number) => void` | `undefined` | Callback function fired when a user clicks to set a new rating. |
| `HalfStars` | `onHoverChange` | `(rating: number) => void` | `undefined` | Callback function fired when a user hovers over the stars, updating the temporary display rating. |
| `HalfStars` | `className` | `string` | `undefined` | Optional Tailwind CSS classes to override or extend the outer container's styling. |

## Interface Reference

If you are using TypeScript, you can import the `HalfStarsProps` interface for strong typing:

```tsx
interface HalfStarsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating: number;
  maxStars?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  showText?: boolean;
  interactive?: boolean;
  allowHalf?: boolean;
  step?: number;
  onRatingChange?: (rating: number) => void;
  onHoverChange?: (rating: number) => void;
}
```

## Works with other components

- Embed `HalfStars` inside [Card](https://avaraui.com/docs/reactjs/card) (`ProductCard`) layouts, or beside testimonials in a [Reviews](https://avaraui.com/docs/reactjs/reviews) section.
- Pair interactive `HalfStars` with [Form](https://avaraui.com/docs/reactjs/form) for review submission dialogs.
- [Book Appointment](https://avaraui.com/docs/reactjs/book-appointment) shows named scores out of 5 with `HalfStars`.
- For a like or upvote toggle rather than a score, use [Action Button](https://avaraui.com/docs/reactjs/action-buttons) (`StarButton`).

## How do I show a rating like 4.3 with partial stars in HalfStars?

Pass the number as `rating`, for example `<HalfStars rating={4.3} />`. Each star is clipped to its share of the value, so the fifth star here fills to 30%. Values are clamped between 0 and `maxStars`, and `showText={false}` hides the "4.3 / 5" label.

## How do I make HalfStars interactive and save the rating?

Set `interactive` and keep the rating in state, updating it from `onRatingChange`. The component does not store a chosen value itself, so without that update the stars snap back after a click. Hover shows a preview rating, and `onHoverChange` reports it.

## How should I configure step vs allowHalf for interactive ratings?

`allowHalf` (on by default) picks in 0.5 steps, and `allowHalf={false}` picks whole stars. `step` overrides both, so `step={0.1}` allows tenths. For user-submitted ratings, whole or half stars are easier to click accurately than `0.1` precision.

## How do I change the HalfStars colour and size?

Use `activeColor` and `inactiveColor` with Tailwind text colour classes such as `text-yellow-400`, not hex values, because the stars use `currentColor`. `size` sets each star's width and height in pixels (24 by default), and `maxStars` changes the scale length from 5.

## Is HalfStars keyboard accessible?

Not in interactive mode. Picking a rating relies on mouse movement and clicks over each star, and the component adds no ARIA role or label. For a form, pair it with a labelled input or buttons for keyboard users. A read-only rating needs no interaction, and `showText` prints the number beside it.

---

Live previews and every example: https://avaraui.com/docs/nextjs/half-stars
