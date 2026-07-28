# Marquee

An infinite, seamless scrolling container ideal for logos, testimonials, and image galleries.

This `MarqueeBlock` is engineered to be **flawless**. By exactly duplicating the content and using a precise CSS calculation (`calc(-100% - gap)`), the animation loops infinitely without any stuttering, lagging, or "snap back" resets that plague older implementations.

## Interactive Showcase

Test out different directions, speeds, and content types below. The `mask-image` fade handles dark and light modes perfectly.

## Installation

### Copy the Component

This component relies entirely on injected `@keyframes` and dynamic CSS variables to function, meaning it is **100% dependency-free**.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/MarqueeBlock.tsx`.

---

## Usage

Simply place the elements you want to loop inside the ``. You only need to provide **one** set of items; the component will duplicate them automatically to create the seamless loop.

```tsx

const logos = ["Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function LogoSection() {
  return (

        {logos.map((logo, i) => (
          
            {logo}
          
        ))}

  );
}
```

---

**Component Path:** `nextjs\marquee\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
