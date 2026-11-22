---
title: "Shadcn Infrastructure Topology"
description: "Shadcn Infrastructure Topology. An animated infrastructure diagram simulating live data flowing between microservices and a central router."
url: https://avaraui.com/docs/nextjs/infrastructure-topology
---

# Shadcn Infrastructure Topology

An interactive, fluid **Infrastructure Topology** component simulating live data flows across microservices, central neural mesh core routers, connected SVG beam pipelines, and real-time telemetry metrics.

## For AI agents

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

## Examples

### Pulse Pipeline

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

## Props Reference: InfrastructureTopology

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"orbit" \| "pulse"` | `"orbit"` | Visual & animation layout style (curved orbital packet mesh or clean 3-column pulse pipeline). |
| `headerTitle` | `string` | `"Infrastructure Topology"` | Main headline text in the header bar. |
| `headerSubtitle` | `string` | `"LIVE DATA FLOW · 6 SERVICES · 5 ROUTES"` | Monospaced subtitle text in the header bar. |
| `statusBadge` | `string` | `"ALL SYSTEMS"` | System status pill badge text. |
| `bandwidthBadge` | `string` | `"10 GBPS"` | Bandwidth speed status badge text. |
| `centerTitle` | `string` | `"NEURAL MESH"` | Title of the central core router node. |
| `centerSubtitle` | `string` | `"CORE ROUTER · V4.2"` | Subtitle of the central core router node. |
| `centerColor` | `"cyan" \| "emerald" \| "indigo" \| "rose" \| "purple"` | `"cyan"` | Theme color palette of the central core router. |
| `nodes` | `TopologyNode[]` | `DEFAULT_NODES` | Array of peripheral service node objects. |
| `metrics` | `MetricItem[]` | `DEFAULT_METRICS` | Array of telemetry metric pill objects. |
| `animated` | `boolean` | `true` | Toggles SVG connection beam laser animations. |
| `interactive` | `boolean` | `true` | Toggles hover route highlighting animations. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/infrastructure-topology
