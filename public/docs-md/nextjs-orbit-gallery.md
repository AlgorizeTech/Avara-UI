export const metadata = docsPageMetadata("orbit-gallery");

# Orbit Gallery

A two-column hero for an agency, studio or gallery: copy and actions on the left, and on the right a ring of photo cards that revolves once every 36 seconds, each card staying upright as it travels. Hovering the ring holds it still; moving the pointer anywhere over the section leaves a short trail of dots in the accent colour.

The ring is pure CSS — one keyframe rotates each card about the centre, pushes it out by a radius that grows with the breakpoint, and counter-rotates it upright — so any number of `images` space themselves evenly and the motion costs nothing on the main thread. Under `prefers-reduced-motion` the ring holds still.

export const usage = `"use client";

// Landscapes from Unsplash, free to use.
const IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
];

export default function Hero() {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/orbit-gallery
```

## Props Reference

        Prop
        Type
        Default
        Description

        badgeText, badgeHref
        string
        "Identity & animation studio", "#"
        The tracked line above the headline and where it links.

        title, titleAccent
        string
        "Wander through", "Wild Places, Up Close."
        The two lines of the headline; the second is set in the accent.

        subtitle
        string
        —
        The paragraph beside the accent rule.

        primaryActionLabel, primaryActionHref
        string
        "Browse photos", "#"
        The filled button.

        secondaryActionLabel, secondaryActionHref
        string
        —
        The outlined button; omitted when there is no label.

        images
        string[]
        15 landscapes
        The cards on the ring, in orbit order.

        duration
        number
        36
        Seconds per revolution.

        highlights
        &#123; label: string; color?: string &#125;[]
        three facts
        The dotted row under the actions.

        color
        string
        theme primary
        Accent colour — a preset name or any CSS colour.

        linkComponent
        ElementType
        "a"
        What renders every link; pass next/link in Next.js.

---

**Component Path:** `[framework]\orbit-gallery\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
