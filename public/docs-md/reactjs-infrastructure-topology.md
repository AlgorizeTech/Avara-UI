---
title: "Shadcn Infrastructure Topology"
description: "Shadcn Infrastructure Topology. An animated infrastructure diagram simulating live data flowing between microservices and a central router."
url: https://avaraui.com/docs/nextjs/infrastructure-topology
---

# Shadcn Infrastructure Topology

An animated **Infrastructure Topology** diagram: service nodes joined to a central core by SVG pipelines with travelling packets or beams. Every label and metric is a prop; nothing is fetched.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/infrastructure-topology.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/infrastructure-topology
```

## Orbital Mesh

Modern glassmorphic topology with curved Bezier pipelines, travelling glowing packet orbs, counter-rotating orbital core rings, and click-to-inspect route highlighting.

- Pass `variant="orbit"` (default) for curved Bezier pipelines, travelling packet orbs, and counter-rotating orbital core rings.

```tsx
import InfrastructureTopology from "@/components/custom/infrastructure-topology";

export default function InfrastructureTopologyOrbitDemo() {
  return (
    <InfrastructureTopology
      variant="orbit"
      headerTitle="Orbital Neural Mesh"
      headerSubtitle="CURVED PIPELINES · TRAVELLING PACKETS"
      statusBadge="ALL SYSTEMS"
      bandwidthBadge="25 GBPS"
      centerTitle="ORBIT CORE"
      centerSubtitle="MESH ROUTER · V5.0"
      centerColor="indigo"
      animated={true}
      interactive={true}
    />
  );
}
```

## Pulse Pipeline

Clean grid-free ambient surface with 3-column pipeline layout, expanding core ripple waves, energy-beam pulses, and focus-isolating hover/click states.

- Pass `variant="pulse"` for the 3-column pipeline layout, expanding core ripple waves, and energy-beam pulses.

```tsx
import InfrastructureTopology from "@/components/custom/infrastructure-topology";

export default function InfrastructureTopologyPulseDemo() {
  return (
    <InfrastructureTopology
      variant="pulse"
      headerTitle="Pulse Pipeline"
      headerSubtitle="CLEAN SURFACE · RIPPLE CORE · BEAMS"
      statusBadge="ALL SYSTEMS"
      bandwidthBadge="40 GBPS"
      centerTitle="PULSE CORE"
      centerSubtitle="EDGE GATEWAY · V6.0"
      centerColor="emerald"
      animated={true}
      interactive={true}
    />
  );
}
```

## About Shadcn Infrastructure Topology

**What it is.** **Shadcn Infrastructure Topology** (`InfrastructureTopology`) draws data flowing between up to five service nodes and a central mesh router or edge gateway, in two visual modes: `"orbit"` and `"pulse"`. The values are whatever you pass in; it does not connect to real services.

**How it is built.** `InfrastructureTopology` measures each node and draws an SVG curve to the core, re-measuring on resize. The orbit variant adds travelling packet orbs and counter-rotating rings, and the pulse variant adds beam pulses and ripple waves. Hover or click a node to highlight its route. It needs only `lucide-react`.

**When to use it.** Use it for cloud architecture diagrams, edge gateway telemetry panels, DevOps status pages, and AI infrastructure product showcases.

## For AI agents

**When to use**

- Cloud architecture diagrams, edge gateway telemetry panels
- DevOps status pages, AI infrastructure product showcases

**When not to use**

- A custom diagram you position yourself: use [Flowchart](https://avaraui.com/docs/reactjs/flowchart)
- An agent or crew hierarchy: use [Agent Graph](https://avaraui.com/docs/reactjs/agent-graph)

**Agent notes**

- Default export from `@/components/custom/infrastructure-topology`. It supports `variant` (`"orbit" | "pulse"`), `headerTitle`, `headerSubtitle`, `statusBadge`, `bandwidthBadge`, `centerTitle`, `centerSubtitle`, `nodes`, `metrics`, `animated`, `interactive` and `className`.
- `centerTitle`, `centerSubtitle` and `metrics` are rendered only by the `"pulse"` variant; the orbit hub shows an icon.
- `centerColor` is declared in the types but not read by the component, so it has no visual effect. The hub follows the theme's `--primary`.
- Each `TopologyNode` needs `id`, `title`, `subtitle`, `badgeText`, `icon`, `color`, `strokeColor` and a `position` of `"top-left"`, `"bottom-left"`, `"top-right"`, `"middle-right"` or `"bottom-right"`.
- Use `variant="orbit"` for glassmorphic Bezier pipelines with orbiting rings, or `variant="pulse"` for a 3-column ambient pipeline with core ripple waves.
- Hovering or clicking nodes isolates and highlights active connected routes.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/infrastructure-topology

**When to use it.** An animated infrastructure diagram: services around a central router core, with live data flowing along connected pipelines and telemetry badges.

**Gotchas:**

- Both are looks of the one `infrastructure-topology` item: install it once and set `variant` (`orbit` or `pulse`) from the index.

### The 2 variants

1. **Orbital mesh** (`orbit`): Glassmorphic mesh with curved Bezier pipelines, travelling packet orbs and counter-rotating core rings. The default.
   - Live: https://avaraui.com/view/infrastructure-topology/orbit
   - Best for: a showpiece network or microservices diagram
   - Avoid if: you want a flat, grid-like pipeline layout
   - Traits: curved pipelines, travelling packets, rotating core rings, default look
   - Install: `npx shadcn@latest add @avara-ui/infrastructure-topology`
   - Set these props: `{"variant":"orbit"}`
   - Docs: https://avaraui.com/docs/nextjs/infrastructure-topology#orbital-mesh
2. **Pulse pipeline** (`pulse`): Clean ambient surface with a 3-column pipeline layout, expanding core ripples and energy-beam pulses.
   - Live: https://avaraui.com/view/infrastructure-topology/pulse
   - Best for: a tidy request-flow diagram that reads left to right
   - Avoid if: you want curved orbital paths
   - Traits: 3-column layout, core ripple waves, energy beams
   - Install: `npx shadcn@latest add @avara-ui/infrastructure-topology`
   - Set these props: `{"variant":"pulse"}`
   - Docs: https://avaraui.com/docs/nextjs/infrastructure-topology#pulse-pipeline

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"orbit" \| "pulse"` | `"orbit"` | Visual & animation layout style (curved orbital packet mesh or clean 3-column pulse pipeline). |
| `headerTitle` | `string` | `"Infrastructure Topology"` | Main headline text in the header bar. |
| `headerSubtitle` | `string` | `"LIVE DATA FLOW · 6 SERVICES · 5 ROUTES"` | Monospaced subtitle text in the header bar. |
| `statusBadge` | `string` | `"ALL SYSTEMS"` | System status pill badge text. |
| `bandwidthBadge` | `string` | `"10 GBPS"` | Bandwidth speed status badge text. |
| `centerTitle` | `string` | `"NEURAL MESH"` | Title of the central core router node. Shown by the `pulse` variant only. |
| `centerSubtitle` | `string` | `"CORE ROUTER · V4.2"` | Subtitle of the central core router node. Shown by the `pulse` variant only. |
| `centerColor` | `"cyan" \| "emerald" \| "indigo" \| "rose" \| "purple"` | `"cyan"` | Declared in the props type but not read by the component, so it currently has no effect. The core takes the theme's `--primary` colour. |
| `nodes` | `TopologyNode[]` | `DEFAULT_NODES` | Array of `{ id, title, subtitle, badgeText, badgeVariant?, icon, color, strokeColor, position }` objects. `position` is one of five slots: `top-left`, `bottom-left`, `top-right`, `middle-right`, `bottom-right`. |
| `metrics` | `MetricItem[]` | `DEFAULT_METRICS` | Array of `{ id, label, value, icon, color? }` pills along the bottom. Shown by the `pulse` variant only. |
| `animated` | `boolean` | `true` | Toggles the travelling packets, beams, rotating rings and ripples. |
| `interactive` | `boolean` | `true` | Toggles route highlighting on hover, and selecting a route by clicking a node. |
| `className` | `string` | `undefined` | Classes merged onto the root container. |

## Works with other components

- [Flowchart / Node Builder](https://avaraui.com/docs/reactjs/flowchart) is for custom node-and-edge diagrams you position yourself.
- [Agent Graph](https://avaraui.com/docs/reactjs/agent-graph) shows multi-agent hierarchies with status and token meters.
- [Live Pulse Pill](https://avaraui.com/docs/reactjs/live-pulse-pill) suits a status header near the diagram.
- [Chart](https://avaraui.com/docs/reactjs/chart) covers the real time-series data that this diagram only illustrates.

## How do I use my own services in InfrastructureTopology?

Pass `nodes`, an array of objects with `id`, `title`, `subtitle`, `badgeText`, `icon`, `color`, `strokeColor` and a `position` slot. There are five slots, `top-left`, `bottom-left`, `top-right`, `middle-right` and `bottom-right`, so two nodes in one slot overlap. Change the bottom pills with `metrics`.

## Why don't centerTitle and metrics show in the InfrastructureTopology orbit variant?

Only the `pulse` variant renders `centerTitle`, `centerSubtitle` and the `metrics` pills. The `orbit` variant draws a hub with an icon and rotating rings instead. Pick `variant="pulse"` when you want the core labelled and the telemetry row shown beneath the diagram.

## How do I highlight a route in InfrastructureTopology?

Hover a service node, or click it to pin its route. The route's line thickens and brightens, and in the orbit variant its packets speed up and the header subtitle changes to the active route's title. Hover wins over a pinned node. Set `interactive={false}` to switch both off.

## Can I turn off the InfrastructureTopology animation?

Set `animated={false}` to stop the travelling packets, beams, rotating rings and ripples while keeping the layout. The component has no `prefers-reduced-motion` check, so pass `animated` from your own media-query logic if users need less motion.

## Is InfrastructureTopology keyboard accessible?

Partly. Each service node is a real `button` with an `aria-label` set to its `title`, so it takes focus and Enter or Space pins its route. Hover highlighting does not trigger on focus. The animated connectors are decorative SVG with no text alternative.

## How do I change the InfrastructureTopology colours?

The core, rings, status badge and header accents follow your theme's `--primary`. Each node's own look comes from `color` (`blue`, `rose`, `purple`, `amber` or `emerald`) and `strokeColor` (the pipeline colour). `centerColor` is in the types but is not used yet.

---

Live previews and every example: https://avaraui.com/docs/nextjs/infrastructure-topology
