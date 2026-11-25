---
title: "Shadcn Network Graph"
description: "A network graph of avatars: a layered orbital visual that spreads items evenly across concentric rings. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/network-graph
---

# Shadcn Network Graph

A network graph of avatars: a layered orbital visual that spreads items evenly across concentric rings. It suits community showcases, team maps, social proof sections and relationship-driven hero layouts.

Assign each node a `ring` index and the component spaces that ring evenly across a full 360°, in percentages that scale to any box. Hover an avatar for its tooltip, or hit the reload button to replay the staggered spring entrance.

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

## Interactive rings

Drag the sliders above to reshape the orbits live, then copy the numbers straight into your own `NetworkGraph`.

- `ringCount` is how many orbits draw. A node whose `ring` exceeds this is **not rendered at all**.
- Use `animateOrbit={false}` to stop the planetary motion. `animateIn` is separate, so the entrance still plays.

```tsx
import {
  NetworkGraph,
  type NetworkNode,
} from "@/components/custom/blocks/NetworkGraphBlock";

const users: NetworkNode[] = [
  // Ring 1 (inner)
  { id: "1", ring: 1, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg", label: "Sarah J." },
  { id: "2", ring: 1, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg", label: "David B." },
  // No image? `fallback` renders the initials tile instead.
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
];

export default function OrbitGraph() {
  // `ringCount` decides how many orbits render; `baseRadius` is the first
  // ring's radius and `ringGap` the distance to each next one — both as a
  // percentage of the square container, so the layout scales on any screen.
  // `orbitSpeed` multiplies the rotation rate.
  return (
    <NetworkGraph
      nodes={users}
      ringCount={3}
      baseRadius={18}
      ringGap={16}
      orbitSpeed={1}
      centerNode={{ image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg", label: "You" }}
    />
  );
}
```

## About Shadcn Network Graph

**What it is.** **Shadcn Network Graph** (`NetworkGraph`) is an orbital avatar graph that arranges nodes across concentric percentage-scaled rings with hover labels and a staggered spring entrance. Positions come from the ring index and node order, not from a force simulation.

**How it is built.** Each `NetworkNode` declares a `ring` index and either an `image` or `fallback` initials; `NetworkGraph` spaces each ring evenly around 360°, starting at the top, using `baseRadius`, `ringGap`, `ringCount`, and `orbitSpeed`, with independent `animateOrbit` and `animateIn` controls. The entrance is CSS keyframes and the orbit is a `requestAnimationFrame` loop that pauses while the graph is off screen.

**When to use it.** Use it for community directories, team hubs, integration ecosystems, and social-proof hero sections.

## For AI agents

**When to use**

- Community directories, team hubs
- Integration ecosystems, social-proof hero sections

**When not to use**

- A tiered hierarchy with a central node: use [User Graph](https://avaraui.com/docs/nextjs/user-graph)
- A simple overlapping row of avatars: use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack)

**Agent notes**

- `NetworkGraph` takes `nodes` (`NetworkNode[]` with `id`, `ring`, `label`, and `image` or `fallback`), `ringCount`, `baseRadius`, `ringGap`, `orbitSpeed`, `animateOrbit`, and `animateIn`.
- Nodes whose `ring` exceeds `ringCount` are omitted from rendering.
- Keep outer rings denser than inner ones and set `size: "sm"` on nodes in distant rings for visual depth. An unknown `size` string falls back to `"md"`.
- A node's `label` appears only on hover, not on keyboard focus. The `centerNode` label is different: it is always visible under the hub.
- `orbitSpeed={0}` does not stop the orbit (it falls back to 1). Use `animateOrbit={false}`.
- There is no `prefers-reduced-motion` handling, so turn off `animateOrbit` and `animateIn` yourself for users who ask for reduced motion.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `nodes` | `NetworkNode[]` | Required | The avatars to place. Each node is grouped by its `ring` and spaced evenly around that orbit. |
| `centerNode` | `&#123; image?, fallback?, label? &#125;` | `undefined` | Optional hub avatar rendered at the centre of every ring. Its `label` is always visible below it. |
| `ringCount` | `number` | `3` | How many orbits to draw. Nodes whose `ring` exceeds this are not rendered. |
| `baseRadius` | `number` | `15` | Radius of the first ring, as a percentage of the square container. |
| `ringGap` | `number` | `15` | Percentage added to the radius for each subsequent ring. |
| `animateIn` | `boolean` | `true` | Plays the staggered spring entrance on mount. |
| `animateOrbit` | `boolean` | `true` | Continuously rotates each ring, alternating direction per ring while counter-rotating the avatars so they stay upright. |
| `orbitSpeed` | `number` | `1` | Speed multiplier for the orbit — `2` is twice as fast. |

### NetworkNode Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable React key for the node. |
| `ring` | `number` | Required | Which orbit the node belongs to — `1` is innermost. |
| `image` | `string` | `undefined` | Avatar image URL. |
| `fallback` | `string` | `undefined` | Initials shown when no `image` is given. |
| `label` | `string` | `undefined` | Tooltip text revealed on hover. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Avatar diameter — use smaller sizes on outer rings to suggest depth. |

## Works with other components

- Pair `NetworkGraph` with [User Graph](https://avaraui.com/docs/nextjs/user-graph) for tiered AI agent hierarchies.
- Use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack) for compact inline member rows.
- Use [Radial Orbital Timeline](https://avaraui.com/docs/nextjs/radial-orbital-timeline) for interactive milestone rings.
- Reach for [Agent Graph](https://avaraui.com/docs/nextjs/agent-graph) when the nodes form a lead-and-worker tree rather than sitting on rings.

## Can I pause the orbital rotation while keeping the entrance animation?

Yes. Pass `animateOrbit={false}` to keep nodes stationary on their rings while `animateIn` still plays the staggered spring entrance. The two props are independent, so `animateIn={false}` alone skips the entrance and leaves the rings turning. Both props default to `true`.

## What happens if a node has no `image` URL?

Give the `NetworkNode` a `fallback` string such as initials, and `NetworkGraph` shows it uppercase in a round tile instead of an image. If a node has neither `image` nor `fallback`, the circle renders empty, so always supply one of the two.

## How do I choose which ring a NetworkGraph avatar sits on?

Set `ring` on each `NetworkNode`, where `1` is the innermost orbit. Nodes sharing a `ring` are spread at equal angles in array order, starting at the top. A node whose `ring` is above `ringCount` is not rendered, so raise `ringCount` when you add an outer ring.

## How fast does each NetworkGraph ring orbit, and can I change it?

Ring `n` completes a lap in `(35 + 10n) / orbitSpeed` seconds, so outer rings turn more slowly. Even-numbered rings run in the opposite direction. Changing `orbitSpeed` applies from the ring's current angle without a jump, and avatars are counter-rotated to stay upright.

## Does NetworkGraph pause when off screen or respect reduced motion?

It pauses when off screen: each ring's animation frame loop starts and stops with an `IntersectionObserver`. It does not read `prefers-reduced-motion`, so pass `animateOrbit={false}` and `animateIn={false}` yourself when a user prefers less motion. Where `IntersectionObserver` is unavailable, the loop simply runs all the time.

## Can I use NetworkGraph without Next.js?

Yes. The block has no `next/*` imports and no npm dependencies. It installs the shadcn `utils` item plus a small `motion-curves.ts` helper for the spring easing. Avatars render as plain `<img>` tags, so remote image hosts need no framework configuration.

---

Live previews and every example: https://avaraui.com/docs/nextjs/network-graph
