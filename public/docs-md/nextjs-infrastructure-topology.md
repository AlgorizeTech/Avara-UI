---
title: "Shadcn Infrastructure Topology"
description: "Shadcn Infrastructure Topology. An animated infrastructure diagram simulating live data flowing between microservices and a central router."
url: https://avaraui.com/docs/nextjs/infrastructure-topology
---

# Shadcn Infrastructure Topology

An interactive, fluid **Infrastructure Topology** component simulating live data flows across microservices, central neural mesh core routers, connected SVG beam pipelines, and real-time telemetry metrics.

## Variations

### Infrastructure Topology Showcase

Live animated data flow canvas with pulsing central neural mesh router, peripheral service cards, and telemetry metrics.

```tsx
import InfrastructureTopology, { type TopologyNode } from "@/components/custom/infrastructure-topology";

const customNodes: TopologyNode[] = [
  {
    id: "auth",
    title: "User Auth",
    subtitle: "OAUTH 2.0",
    badgeText: "SECURED",
    badgeVariant: "blue",
    icon: <UserCheck className="w-4 h-4 md:w-4.5 md:h-4.5 text-blue-500" />,
    color: "blue",
    strokeColor: "#3b82f6",
    position: "top-left",
  },
  {
    id: "waf",
    title: "WAF Guard",
    subtitle: "LAYER 7",
    badgeText: "ONLINE",
    badgeVariant: "rose",
    icon: <ShieldAlert className="w-4 h-4 md:w-4.5 md:h-4.5 text-rose-500" />,
    color: "rose",
    strokeColor: "#f43f5e",
    position: "bottom-left",
  },
  {
    id: "db",
    title: "Postgres",
    subtitle: "PRIMARY DB",
    badgeText: "ONLINE",
    badgeVariant: "purple",
    icon: <Database className="w-4 h-4 md:w-4.5 md:h-4.5 text-purple-500" />,
    color: "purple",
    strokeColor: "#a855f7",
    position: "top-right",
  },
  {
    id: "aws",
    title: "AWS Cloud",
    subtitle: "US-EAST-1",
    badgeText: "ACTIVE",
    badgeVariant: "amber",
    icon: <Cloud className="w-4 h-4 md:w-4.5 md:h-4.5 text-amber-500" />,
    color: "amber",
    strokeColor: "#f59e0b",
    position: "middle-right",
  },
  {
    id: "billing",
    title: "Billing API",
    subtitle: "STRIPE V3",
    badgeText: "ONLINE",
    badgeVariant: "emerald",
    icon: <CreditCard className="w-4 h-4 md:w-4.5 md:h-4.5 text-emerald-500" />,
    color: "emerald",
    strokeColor: "#10b981",
    position: "bottom-right",
  },
];

export default function InfrastructureTopologyDemo() {
  return (
    <InfrastructureTopology
      headerTitle="Infrastructure Topology"
      headerSubtitle="LIVE DATA FLOW · 6 SERVICES · 5 ROUTES"
      statusBadge="ALL SYSTEMS"
      bandwidthBadge="10 GBPS"
      centerTitle="NEURAL MESH"
      centerSubtitle="CORE ROUTER · V4.2"
      centerColor="cyan"
      nodes={customNodes}
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

## Features

- **Central Neural Mesh Hub**: Mode-adaptive pulsing concentric rings with core status & version indicator.
- **Animated SVG Data Beams**: Real-time laser packet dash animations connecting peripheral service nodes to the central hub.
- **Interactive Route Highlights**: Hovering over service cards highlights the active connection pipeline with ring glow feedback.
- **Responsive Dual Layout**: Full 2D graph canvas on desktop/tablet, and clean non-overlapping 2-column grid on mobile screens.
- **Semantic Theme Adaptation**: Uses Tailwind CSS semantic tokens (`bg-background`, `bg-card`, `text-foreground`, `border-border`) to seamlessly match any site theme.

## Props Reference: InfrastructureTopology

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
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
