# Flow Gallery

Horizontal and diagonal 3D cascading gallery stream with continuous auto-flow motion, drag inertia physics, and isometric perspective options.

Drag the stage or allow it to auto-flow continuously along the selected directional stream angle.

export const itemsCode = `const items = [
  {
    id: "1",
    title: "Cyberpunk Officer",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Neon Cyberpunk Girl",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Ramen Bowl Art",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Suit Business Portrait",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Grizzly Bear Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Skateboard Graphic",
    imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    title: "Abstract Fluid Ink",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    title: "Deep Space Black Hole",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "9",
    title: "Misty Pine Forest",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    title: "Sunset Mountain Peak",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];`;

export const usageTopLeft = `import { FlowGallery } from "@/components/custom/flow-gallery";

${itemsCode}

export default function FlowGalleryTopLeftDemo() {
  return (
    
  );
}`;

export const usageTopRight = `import { FlowGallery } from "@/components/custom/flow-gallery";

${itemsCode}

export default function FlowGalleryTopRightDemo() {
  return (
    
  );
}`;

export const usageVerticalUp = `import { FlowGallery } from "@/components/custom/flow-gallery";

${itemsCode}

export default function FlowGalleryVerticalUpDemo() {
  return (
    
  );
}`;

export const usageVerticalDown = `import { FlowGallery } from "@/components/custom/flow-gallery";

${itemsCode}

export default function FlowGalleryVerticalDownDemo() {
  return (
    
  );
}`;

## Installation

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    4 Directional Stream Angles
    Supports top-left, top-right, vertical-up, and vertical-down directional angles via simple props.

    Continuous Infinite Auto-Flow
    Images cascade continuously with smooth velocity inertia and optional pause-on-hover.

    Drag & Inertia Physics
    Interactive mouse and touch drag gestures along the stream axis with grab cursor feedback.

    Light & Dark Theme Adaptation
    Supports Next Themes integration to transition stage background tones and radial depth vignette overlays.

## Best Practices & Guidelines

    Image Resolution & Aspect Ratios
    Use square or near-square images (800x800) so that card items maintain crisp aspect ratios when rendered in the 3D plane.

    Performance & GPU Acceleration
    The stream plane uses hardware-accelerated transform: translate3d() properties to maintain 60fps performance across devices.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          FlowGallery

          direction

          "top-left" | "top-right" | "vertical-up" | "vertical-down"

          "top-left"

          Directional angle of the stream. Use "vertical-down" for straight downward flow from top to bottom.

          FlowGallery

          items

          FlowGalleryItem[]

          DEFAULT_ITEMS

          Array of image objects containing {`{ id, title, imageUrl }`} to display in the stream.

          FlowGallery

          speed

          number

          3.5

          Continuous auto-flow speed in pixels per frame.

          FlowGallery

          pauseOnHover

          boolean

          true

          When set to true, automatically pauses the continuous auto-flow when hovering over the stage.

          FlowGallery

          columns

          number

          9

          Number of parallel columns flowing along the stream plane.

          FlowGallery

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the stage container.

---

**Component Path:** `[framework]\flow-gallery\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
