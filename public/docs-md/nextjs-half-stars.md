# Half Stars Rating

A sleek, customizable star rating component for Next.js applications that supports exact decimal ratings (e.g., 3.7 or 4.5) through SVG clip paths. It also supports interactive mode, allowing users to hover and click to set their own rating.

It provides an accurate fractional fill, allowing you to beautifully display user reviews, product ratings, and satisfaction scores without being limited to just full or half stars.

## Examples

Explore the different variations of the Half Stars component — each example shows a live preview with the exact code to copy. Hover and click any preview to set a rating.

export const usageFull = `"use client";

export default function FullStarRating() {
  const [rating, setRating] = useState(3);

  return (
    
  );
}`;

export const usageHalf = `"use client";

export default function HalfStarRating() {
  const [rating, setRating] = useState(3.5);

  return (
    
  );
}`;

export const usageContinuous = `"use client";

export default function PreciseRating() {
  const [rating, setRating] = useState(4.2);

  return (
    
  );
}`;

export const usageCustom = `"use client";

export default function TenStarRating() {
  const [rating, setRating] = useState(7.5);

  return (
    
  );
}`;

## Installation

## Features
Discover the Half Stars rating component's precise visual feedback, supporting fractional SVG rendering for accurate reviews.

    High Precision
    Supports exact decimal ratings (e.g., 4.2 or 3.7) by dynamically calculating SVG clip paths for pixel-perfect fills.

    Interactive Mode
    Allow users to hover and click to submit their own ratings. Includes smooth animations and fractional steps.

    Fully Custom
    Easily change colors, sizes, and the maximum number of stars using standard Tailwind CSS utility classes.

    Zero Dependencies
    Built entirely with React and raw SVGs. No heavy external rating libraries required.

## Best Practices & Guidelines

    Precision Steps
    If you are allowing user input via interactive={true}, it is recommended to set allowHalf={true} (step 0.5) or step={1} for standard reviews. Setting step={0.1} can make it difficult for users to intentionally click a precise score like 4.0 exactly.

    Color Contrast
    Ensure your inactiveColor provides enough contrast against your background so users can clearly see the empty stars. By default, text-slate-200 works well on white backgrounds.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

        HalfStars
        rating
        number
        Required
        The current rating value to display (e.g., 3.5 or 4.8).

        HalfStars
        maxStars
        number
        5
        The total number of stars to display.

        HalfStars
        size
        number
        24
        The width and height of each individual star in pixels.

        HalfStars
        activeColor
        string
        "text-yellow-400"
        Tailwind text color class for the filled (active) portion of the stars.

        HalfStars
        inactiveColor
        string
        "text-slate-200 dark:text-slate-700"
        Tailwind text color class for the empty (inactive) portion of the stars.

        HalfStars
        showText
        boolean
        true
        If true, displays the numerical rating text next to the stars (e.g. 4.8 / 5).

        HalfStars
        interactive
        boolean
        false
        If true, enables hover states and clicking to change the rating.

        HalfStars
        allowHalf
        boolean
        true
        (Legacy) If true and interactive is true, allows users to select 0.5 increments.

        HalfStars
        step
        number
        allowHalf ? 0.5 : 1
        Defines the precision increment (e.g. 0.1 for continuous). Overrides allowHalf.

        HalfStars
        onRatingChange
        (rating: number) =&gt; void
        undefined
        Callback function fired when a user clicks to set a new rating.

        HalfStars
        onHoverChange
        (rating: number) =&gt; void
        undefined
        Callback function fired when a user hovers over the stars, updating the temporary display rating.

        HalfStars
        className
        string
        undefined
        Optional Tailwind CSS classes to override or extend the outer container's styling.

## Interface Reference

If you are using TypeScript, you can import the `HalfStarsProps` interface for strong typing:

```tsx
interface HalfStarsProps extends Omit, 'onChange'> {
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

**Component Path:** `[framework]\half-stars\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
