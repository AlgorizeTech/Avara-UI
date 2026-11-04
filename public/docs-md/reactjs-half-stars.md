---
title: "Shadcn Half Star Rating"
description: "Shadcn Half Star Rating. A sleek, customizable star rating component for Next.js applications that supports exact decimal ratings (e.g.."
url: https://avaraui.com/docs/nextjs/half-stars
---

# Shadcn Half Star Rating

A sleek, customizable star rating component for Next.js applications that supports exact decimal ratings (e.g., 3.7 or 4.5) through SVG clip paths. It also supports interactive mode, allowing users to hover and click to set their own rating.

It provides an accurate fractional fill, allowing you to beautifully display user reviews, product ratings, and satisfaction scores without being limited to just full or half stars.

Explore the different variations of the Half Stars component — each example shows a live preview with the exact code to copy. Hover and click any preview to set a rating.

## Full stars

- `rating` is the value shown, and the only required prop.
- `allowHalf={false}` restricts interactive picking to whole numbers.

```tsx
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

## Examples

### Half stars

- Set `allowHalf` — the default — for 0.5 precision while `interactive` is on.

```tsx
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

### Continuous fractions

- Pass `step={0.1}` for fine-grained ratings like 2.3 or 4.6. It overrides `allowHalf` entirely.

```tsx
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

### Custom scale and colors

- `maxStars` changes how many stars make up the scale, 5 by default.
- `activeColor` and `inactiveColor` take Tailwind **text colour classes**, not raw hex — e.g. `text-yellow-400`.
- `size={24}` is each star's width and height in pixels.

```tsx
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

## Features
Discover the Half Stars rating component's precise visual feedback, supporting fractional SVG rendering for accurate reviews.

### High Precision

Supports exact decimal ratings (e.g., 4.2 or 3.7) by dynamically calculating SVG clip paths for pixel-perfect fills.

### Interactive Mode

Allow users to hover and click to submit their own ratings. Includes smooth animations and fractional steps.

### Fully Custom

Easily change colors, sizes, and the maximum number of stars using standard Tailwind CSS utility classes.

### Zero Dependencies

Built entirely with React and raw SVGs. No heavy external rating libraries required.

## Best Practices & Guidelines

### Precision Steps

If you are allowing user input via `interactive={true}`, it is recommended to set `allowHalf={true}` (step 0.5) or `step={1}` for standard reviews. Setting `step={0.1}` can make it difficult for users to intentionally click a precise score like 4.0 exactly.

### Color Contrast

Ensure your `inactiveColor` provides enough contrast against your background so users can clearly see the empty stars. The default, `text-foreground/15`, follows the theme in light and dark mode.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/half-stars
