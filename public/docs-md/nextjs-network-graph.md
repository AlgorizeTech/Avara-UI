export const metadata = docsPageMetadata("network-graph");

# Network Graph

A layered orbital avatar visual that spreads items evenly across concentric rings. It works well for community showcases, team maps, social proof sections, and dense relationship-driven hero layouts.

Unlike static canvases or heavy physics engines, this component dynamically handles the math for you. Simply assign a `ring` index to each node (e.g., Ring 1, Ring 2), and the component will automatically space the avatars evenly in perfect 360-degree circles using percentage-based rendering that scales flawlessly on mobile.

---

Assign each node a `ring` index and the component spaces that ring evenly across a full 360°. Hover an avatar for its tooltip, or hit the reload button to replay the staggered spring entrance.

export const networkNodes = `const users: NetworkNode[] = [
  // Ring 1 (inner)
  { id: "1", ring: 1, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg", label: "Sarah J." },
  { id: "2", ring: 1, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg", label: "David B." },
  // No image? \`fallback\` renders the initials tile instead.
  { id: "3", ring: 1, fallback: "JW", label: "James W." },
  { id: "4", ring: 1, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg", label: "Lisa M." },

  // Ring 2 (outer)
  { id: "5", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg", label: "Emma R." },
  { id: "6", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg", label: "Noah P." },
  { id: "7", ring: 2, fallback: "MK", label: "Mike K." },
  { id: "8", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg", label: "Ava T.", size: "sm" },
  { id: "9", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg", label: "Ethan C." },
  { id: "10", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg", label: "Olivia S.", size: "lg" },
  { id: "11", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg", label: "Liam H." },
  { id: "12", ring: 2, fallback: "PL", label: "Priya L.", size: "sm" },

  // Ring 3 (outer)
  { id: "13", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158814/photo-1438761681033-6461ffad8d80-1790158812210.jpg", label: "Chloe D.", size: "sm" },
  { id: "14", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158813/photo-1472099645785-5658abf4ff4e-1790158812210.jpg", label: "Marcus V.", size: "sm" },
  { id: "15", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790159965/photo-1519085360753-af0119f7cbe7-1790159970113.jpg", label: "Zoe N.", size: "md" },
  { id: "16", ring: 3, fallback: "AJ", label: "Aaron J.", size: "sm" },
  { id: "17", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790150480/photo-1506794778202-cad84cf45f1d-1790150482275.jpg", label: "Nina F.", size: "sm" },
  { id: "18", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790150482/photo-1524504388940-b1c1722653e1-1790150482279.jpg", label: "Owen G.", size: "sm" },
  { id: "19", ring: 3, fallback: "TR", label: "Tara R.", size: "sm" },
  { id: "20", ring: 3, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg", label: "Felix Q.", size: "sm" },
];`;

export const usageInteractive = `import {
  NetworkGraph,
  type NetworkNode,
} from "@/components/custom/blocks/NetworkGraphBlock";

${networkNodes}

export default function OrbitGraph() {
  // \`ringCount\` decides how many orbits render; \`baseRadius\` is the first
  // ring's radius and \`ringGap\` the distance to each next one — both as a
  // percentage of the square container, so the layout scales on any screen.
  // \`orbitSpeed\` multiplies the rotation rate.
  return (
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/network-graph.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/network-graph
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

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
