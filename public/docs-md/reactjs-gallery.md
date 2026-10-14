export const metadata = docsPageMetadata("gallery");

# Gallery

A dynamic visual showcase featuring five interactive variants: a revolving 3D circular photo orbit ring, a GSAP Flip self-rearranging moving bento grid, an interactive circular reel dial spinner, a 3D layered pill carousel, and a Framer-inspired 3D curved arc carousel gallery.

{/* The snippets below pass next/link so links route client-side in Next.js. The React tab is the same file without it: the component's default  needs no import. */}

export const nextAndReact = (code) => ({
  nextjs: code,
  reactjs: code
    .replace(/import Link from "next\/link";\r?\n/, "")
    .replace(/\r?\n[ \t]*linkComponent=\{Link\}/, ""),
});

export const usage = `// Landscapes from Unsplash, free to use.
const IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158814/photo-1518495973542-4542c06a5843-1790158812213.jpg",
];

export default function OrbitGalleryExample() {
  return (
    
  );
}
`;

export const bentoUsage = `const BENTO_ITEMS = [
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

export const reelUsage = `const REEL_ITEMS = [
  {
    id: "reel-1",
    name: "Velvet Horizon",
    category: "Yosemite Valley",
    description: "Granite peaks glowing in the golden twilight above misty valley floor",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "reel-2",
    name: "Glass Relay",
    category: "Redwood Trail",
    description: "Ancient sequoias towering through filtered coastal morning rays",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "reel-3",
    name: "Noir Mist",
    category: "Mountain Peaks",
    description: "Monochrome layered ridges dissolving into distant cloud banks",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "reel-4",
    name: "Driftline Rays",
    category: "Canopy Light",
    description: "Luminescent beams descending through mossy pine canopies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "reel-5",
    name: "Pulse Emerald",
    category: "Verdant Highlands",
    description: "Vibrant rolling green bluffs descending toward serene shoreline",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "reel-6",
    name: "Cold Meridian",
    category: "Alpine Lake",
    description: "Crystalline glacial waters reflecting jagged snow-capped crests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "reel-7",
    name: "Astra Wilds",
    category: "Open Range",
    description: "Solitary wanderer contemplating vast expanses of pristine tundra",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "reel-8",
    name: "Mono Summit",
    category: "Golden Ridge",
    description: "Sharp stone pinnacles bathed in amber warmth at sunrise",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "reel-9",
    name: "Lumen Cascade",
    category: "Forest Waterfall",
    description: "Rushing mountain falls carving through lush temperate rainforest",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
  },
  {
    id: "reel-10",
    name: "Shadow Bloom",
    category: "Alpine Crest",
    description: "Majestic European peaks framed by drifting atmospheric shadows",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
];

export default function CircularReelExample() {
  return (
    
  );
}
`;

export const pillUsage = `const PILL_ITEMS = [
  {
    id: "pill-1",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      alt: "Daily Rituals",
    },
    tooltipText: "Daily Rituals",
    link: "",
  },
  {
    id: "pill-2",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
      alt: "Slow Living",
    },
    tooltipText: "Slow Living",
    link: "",
  },
  {
    id: "pill-3",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      alt: "Explore",
    },
    tooltipText: "Explore",
    link: "",
  },
  {
    id: "pill-4",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
      alt: "Morning Flow",
    },
    tooltipText: "Morning Flow",
    link: "",
  },
  {
    id: "pill-5",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
      alt: "Soft Focus",
    },
    tooltipText: "Soft Focus",
    link: "",
  },
];

export default function ThreeDPillCarouselExample() {
  return (
    
  );
}
`;

export const arcUsage = `const ARC_ITEMS = [
  {
    id: "arc-1",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    title: "Velvet Horizon",
    subtitle: "Yosemite Valley",
  },
  {
    id: "arc-2",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    title: "Glass Relay",
    subtitle: "Redwood Trail",
  },
  {
    id: "arc-3",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    title: "Noir Mist",
    subtitle: "Mountain Peaks",
  },
  {
    id: "arc-4",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Driftline Rays",
    subtitle: "Canopy Light",
  },
  {
    id: "arc-5",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
    title: "Pulse Emerald",
    subtitle: "Verdant Highlands",
  },
  {
    id: "arc-6",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    title: "Cold Meridian",
    subtitle: "Alpine Lake",
  },
  {
    id: "arc-7",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    title: "Astra Wilds",
    subtitle: "Open Range",
  },
  {
    id: "arc-8",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    title: "Mono Summit",
    subtitle: "Golden Ridge",
  },
  {
    id: "arc-9",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
    title: "Lumen Cascade",
    subtitle: "Forest Waterfall",
  },
  {
    id: "arc-10",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Shadow Bloom",
    subtitle: "Alpine Crest",
  },
];

export default function ArcCarouselGalleryExample() {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/gallery
```

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "orbit" | "moving-bento" | "circular-reel" | "pill-carousel" | "arc-carousel"
        "orbit"
        Selects the revolving 3D circular photo orbit ring, GSAP Flip moving bento, circular reel dial spinner, 3D pill carousel, or 3D curved arc carousel gallery.

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
        Controls whether automatic card swaps or idle passive rotation are enabled.

        reelItems
        CircularReelItem[]
        10 landscapes
        The items positioned along the ring for the "circular-reel" variant.

        idleRotationSpeed
        number
        5
        Degrees per second of passive idle rotation in the circular reel.

        scrollSensitivity
        number
        0.06
        Scroll and wheel sensitivity factor in the circular reel.

        ringThickness
        number
        37
        Percentage thickness of the circular reel segmented donut ring (10 to 60).

        grayscale
        boolean
        false
        Applies a grayscale filter to the reel images.

        pillItems
        PillCarouselItem[]
        5 landscapes
        The items ({`{ id, image, tooltipText, link }`}) for the "pill-carousel" variant.

        autoSlide
        boolean
        true
        Controls automatic sliding in the "pill-carousel" variant. When true, cards slide automatically and can also be clicked; set to false to disable auto-sliding and navigate by clicking only.

        cardBorderRadius
        number
        200
        Border radius in pixels for the pill-shaped cards in the 3D pill carousel.

        activeBorderWidth
        number
        6
        Border width in pixels around the active center pill card (uses theme/accent colour by default).

        autoPlayInterval
        number
        3000
        Milliseconds between automatic transitions in the 3D pill carousel when autoSlide is true.

        arcItems
        ArcCarouselItem[]
        10 scenes
        The items ({`{ id, image, title, subtitle, link }`}) for the "arc-carousel" variant.

        curve
        number
        -200
        Curvature value from -300 to 300: negative for concave cylinder arc, 0 for flat row, and positive for convex barrel arc.

        cardSize
        number
        220
        Width in pixels of each card in the arc carousel.

        cardHeight
        number
        cardSize * 1.32
        Height in pixels of each card in the arc carousel.

        perspective
        number
        1200
        3D CSS perspective depth in pixels for the cylindrical arc.

        autoScrollSpeed
        number
        0.22
        Continuous auto-drift velocity in cards per second.

        dragSpeed
        number
        1.2
        Pointer drag multiplier when grabbing and spinning the carousel.

        inertia
        number
        0.75
        Friction momentum coefficient (0 to 1) for smooth coasting after pointer release.

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

**Component Path:** `[framework]\gallery\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
