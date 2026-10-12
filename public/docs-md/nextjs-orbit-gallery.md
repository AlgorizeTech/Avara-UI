export const metadata = docsPageMetadata("orbit-gallery");

# Orbit Gallery

A two-column hero for an agency, studio or gallery: copy and actions on the left, and on the right a ring of photo cards that revolves once every 36 seconds, each card staying upright as it travels. Hovering the ring holds it still; moving the pointer anywhere over the section leaves a short trail of dots in the accent colour.

The component also includes a **Moving Bento** variant — a self-rearranging image bento grid with a dominant center hero slot where peripheral items rotate seamlessly into focus via GSAP Flip animations.

{/* The snippets below pass next/link so links route client-side in Next.js. The React tab is the same file without it: the component's default  needs no import. */}

export const nextAndReact = (code) => ({
  nextjs: code,
  reactjs: code
    .replace(/import Link from "next\/link";\r?\n/, "")
    .replace(/\r?\n[ \t]*linkComponent=\{Link\}/, ""),
});

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

export const bentoUsage = `"use client";

const BENTO_ITEMS = [
  {
    id: "alpine-horizons",
    title: "Alpine Horizons",
    description: "Granite monoliths rising above early morning valley fog",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "emerald-canopy",
    title: "Emerald Canopy",
    description: "Sunlit trails winding through ancient coastal redwood forests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "whispering-peaks",
    title: "Whispering Peaks",
    description: "Layers of mountain silhouettes veiled in twilight atmospheric mist",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "sunbeam-sanctuary",
    title: "Sunbeam Sanctuary",
    description: "Golden rays breaking through tall evergreens after summer rain",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "verdant-valleys",
    title: "Verdant Valleys",
    description: "Rolling emerald highlands sweeping toward dramatic skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "glacial-waters",
    title: "Glacial Reflections",
    description: "Mirror-still alpine lake echoing snow-dusted jagged ridge lines",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "untamed-wilds",
    title: "Untamed Wilds",
    description: "Untouched wilderness under vibrant open skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "golden-ridge",
    title: "Golden Ridge",
    description: "Late sunset warmth illuminating steep rocky summits",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
];

export default function MovingBentoExample() {
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

        variant
        "orbit" | "moving-bento"
        "orbit"
        Selects the circular orbit hero or the GSAP Flip moving bento grid.

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
        The cards on the ring for the "orbit" variant.

        duration
        number
        36
        Seconds per revolution on the orbit ring.

        items
        MovingBentoItem[]
        8 landscapes
        The cards for the "moving-bento" variant.

        swapInterval
        number
        3000
        Milliseconds between automatic card swaps in the moving bento.

        gap
        number
        12
        Gap in pixels between bento grid cards.

        autoPlay
        boolean
        true
        Controls whether automatic card swaps are enabled.

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
