# Network Graph

A layered orbital avatar visual that spreads items evenly across concentric rings. It works well for community showcases, team maps, social proof sections, and dense relationship-driven hero layouts.

Unlike static canvases or heavy physics engines, this component dynamically handles the math for you. Simply assign a `ring` index to each node (e.g., Ring 1, Ring 2), and the component will automatically space the avatars evenly in perfect 360-degree circles using percentage-based rendering that scales flawlessly on mobile.

---

## Interactive Showcase

Hover over the avatars to view their tooltips. Click the replay button to watch the staggered, spring-based entrance animations powered by Framer Motion.

## Installation

### Dependencies

This component uses **Framer Motion** for the staggered spring animations and continuous floating effects.

```bash
npm install framer-motion
```

### Copy the Component

Copy the full engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/NetworkGraphBlock.tsx.

## Implementation

```tsx

export default function CommunityMap() {
  const users = [
    // 3 users on the inner ring (spaced 120° apart)
    { id: "1", ring: 1, image: "/avatars/user1.jpg", label: "Sarah" },
    { id: "2", ring: 1, image: "/avatars/user2.jpg", label: "David" },
    { id: "3", ring: 1, fallback: "JW", label: "James" },

    // 4 users on the outer ring (spaced 90° apart)
    { id: "4", ring: 2, image: "/avatars/user4.jpg", size: "sm" },
    { id: "5", ring: 2, fallback: "MK", size: "sm" },
    { id: "6", ring: 2, image: "/avatars/user6.jpg", size: "sm" },
    { id: "7", ring: 2, image: "/avatars/user7.jpg", size: "sm" },
  ];

  return (

  );
}
```

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

---

**Component Path:** `nextjs\network-graph\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
