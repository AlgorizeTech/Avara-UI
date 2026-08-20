# Network Graph

A layered orbital avatar visual that spreads items evenly across concentric rings. It works well for community showcases, team maps, social proof sections, and dense relationship-driven hero layouts.

Unlike static canvases or heavy physics engines, this component dynamically handles the math for you. Simply assign a `ring` index to each node (e.g., Ring 1, Ring 2), and the component will automatically space the avatars evenly in perfect 360-degree circles using percentage-based rendering that scales flawlessly on mobile.

---

## Examples

Assign each node a `ring` index and the component spaces that ring evenly across a full 360°. Hover an avatar for its tooltip, or hit the reload button to replay the staggered spring entrance.

export const usageRings = `import { NetworkGraph } from "@/components/custom/blocks/NetworkGraphBlock";

export default function RingLayout() {
  // \`ringCount\` decides how many orbits render; \`baseRadius\` is the first
  // ring's radius and \`ringGap\` the distance to each next one — both as a
  // percentage of the square container, so the layout scales on any screen.
  return (
    
  );
}`;

export const usageStatic = `import { NetworkGraph } from "@/components/custom/blocks/NetworkGraphBlock";

export default function StaticGraph() {
  // Rings hold their position — the entrance animation still plays.
  return ;
}`;

export const usageSpeed = `import { NetworkGraph } from "@/components/custom/blocks/NetworkGraphBlock";

export default function FastGraph() {
  // Multiplier on the orbit duration: 2 is twice as fast, 0.5 half speed.
  return ;
}`;

## Installation

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

## Best Practices & Guidelines

    Usage Guidelines
    Keep outer rings denser than inner ones — nodes are spaced by count, so a ring holding two avatars leaves a large visual gap. Give distant rings size="sm" so the composition reads as depth rather than clutter.

## Props Reference

        Prop
        Type
        Default
        Description

        nodes
        NetworkNode[]
        Required
        The avatars to place. Each node is grouped by its ring and spaced evenly around that orbit.

        centerNode
        &#123; image?, fallback?, label? &#125;
        undefined
        Optional hub avatar rendered at the centre of every ring.

        ringCount
        number
        3
        How many orbits to draw. Nodes whose ring exceeds this are not rendered.

        baseRadius
        number
        15
        Radius of the first ring, as a percentage of the square container.

        ringGap
        number
        15
        Percentage added to the radius for each subsequent ring.

        animateIn
        boolean
        true
        Plays the staggered spring entrance on mount.

        animateOrbit
        boolean
        true
        Continuously rotates each ring, alternating direction per ring while counter-rotating the avatars so they stay upright.

        orbitSpeed
        number
        1
        Speed multiplier for the orbit — 2 is twice as fast.

### NetworkNode Object

        Property
        Type
        Default
        Description

        id
        string
        Required
        Stable React key for the node.

        ring
        number
        Required
        Which orbit the node belongs to — 1 is innermost.

        image
        string
        undefined
        Avatar image URL.

        fallback
        string
        undefined
        Initials shown when no image is given.

        label
        string
        undefined
        Tooltip text revealed on hover.

        size
        "sm" | "md" | "lg"
        "md"
        Avatar diameter — use smaller sizes on outer rings to suggest depth.

---

**Component Path:** `[framework]\network-graph\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
