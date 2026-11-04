---
title: "Flowchart / Node Builder"
description: "Shadcn Flowchart / Node Builder. A declarative flowchart with responsive column channels."
url: https://avaraui.com/docs/nextjs/flowchart
---

# Flowchart / Node Builder

A declarative, highly sleek flowchart engine complete with custom responsive column channels, node action anchors, and custom vector streaming lines that draw themselves in with plain CSS animation.

This engine separates data flow layout orchestration from canvas tracking. By combining declarative standard layout structures with pre-set micro connection vectors, pipelines render cross-device flawlessly without heavy calculations crashing client frame updates.

Click any node that sits on a route to make that route the active one — the moving stream switches to that SVG path.

## Flowchart

`FlowCanvas` holds the SVG routes; `FlowNode`s are positioned over it.

- `connectedPaths` on a `FlowNode` lists the route ids it sits on. Clicking activates the first; a node on two routes becomes a branch point.
- `path` on `FlowConnection` is raw SVG path data — M/L for right angles, C for curves. Several segments may share one `id`.

```tsx
import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

export default function AutomationMap() {
  return (
    <Flowchart initialActivePath="success-path">
      {/* Routes first: plain SVG path data, M/L for right angles, C for curves */}
      <FlowCanvas>
        <FlowConnection id="success-path" path="M 280 200 L 310 200 L 310 114 L 340 114" />
        <FlowConnection id="success-path" path="M 580 114 L 640 114" />
        <FlowConnection id="fail-path" path="M 280 200 L 310 200 L 310 284 L 340 284" />
        <FlowConnection id="fail-path" path="M 580 284 L 640 284" />
      </FlowCanvas>

      {/* Nodes are absolutely positioned, so the ports line up with the paths */}
      <FlowNode
        id="webhook"
        title="Webhook Trigger"
        description="Inbound secure POST"
        icon={Webhook}
        connectedPaths={["success-path", "fail-path"]}
        className="left-[40px] top-[166px]"
      />
      <FlowNode
        id="transform"
        title="Transform Payload"
        description="Normalizing JSON data"
        icon={Cpu}
        connectedPaths={["success-path"]}
        className="left-[340px] top-[80px]"
      />
      <FlowNode
        id="error"
        title="Validation Check"
        description="Checking metadata schema"
        icon={Terminal}
        connectedPaths={["fail-path"]}
        className="left-[340px] top-[250px]"
      />
      <FlowNode
        id="success"
        title="Sync Database"
        description="Committed to cluster"
        icon={CheckCircle2}
        connectedPaths={["success-path"]}
        className="left-[640px] top-[80px]"
      />
      <FlowNode
        id="fail"
        title="Dead Letter Queue"
        description="Retrying delivery pool"
        icon={AlertCircle}
        connectedPaths={["fail-path"]}
        className="left-[640px] top-[250px]"
      />
    </Flowchart>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/flowchart.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/flowchart
```

## Examples

### Linear pipeline

- `initialActivePath="main-route"` streams that route on mount — the minimum composition is one route threaded through three nodes.

```tsx
import {
  Flowchart,
  FlowCanvas,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

export default function LinearPipeline() {
  // The smallest useful chart: one route, three nodes on it.
  return (
    <Flowchart initialActivePath="main-route">
      <FlowCanvas>
        <FlowConnection id="main-route" path="M 280 200 L 340 200" />
        <FlowConnection id="main-route" path="M 580 200 L 640 200" />
      </FlowCanvas>

      <FlowNode
        id="trigger"
        title="Webhook Trigger"
        description="Inbound secure POST"
        icon={Webhook}
        connectedPaths={["main-route"]}
        className="left-[40px] top-[166px]"
      />
      <FlowNode
        id="compute"
        title="Compute Cluster"
        description="Normalizing JSON data"
        icon={Cpu}
        connectedPaths={["main-route"]}
        className="left-[340px] top-[166px]"
      />
      <FlowNode
        id="commit"
        title="Sync Database"
        description="Committed to cluster"
        icon={CheckCircle2}
        connectedPaths={["main-route"]}
        className="left-[640px] top-[166px]"
      />
    </Flowchart>
  );
}
```

### No active route

- Set `initialActivePath={null}` to start every route idle and let the reader activate a branch by clicking a node.

```tsx
import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

function PipelineNodes() {
  return (
    <>
      {/* Routes first: plain SVG path data, M/L for right angles, C for curves */}
      <FlowCanvas>
        <FlowConnection id="success-path" path="M 280 200 L 310 200 L 310 114 L 340 114" />
        <FlowConnection id="success-path" path="M 580 114 L 640 114" />
        <FlowConnection id="fail-path" path="M 280 200 L 310 200 L 310 284 L 340 284" />
        <FlowConnection id="fail-path" path="M 580 284 L 640 284" />
      </FlowCanvas>

      {/* Nodes are absolutely positioned, so the ports line up with the paths */}
      <FlowNode
        id="webhook"
        title="Webhook Trigger"
        description="Inbound secure POST"
        icon={Webhook}
        connectedPaths={["success-path", "fail-path"]}
        className="left-[40px] top-[166px]"
      />
      <FlowNode
        id="transform"
        title="Transform Payload"
        description="Normalizing JSON data"
        icon={Cpu}
        connectedPaths={["success-path"]}
        className="left-[340px] top-[80px]"
      />
      <FlowNode
        id="error"
        title="Validation Check"
        description="Checking metadata schema"
        icon={Terminal}
        connectedPaths={["fail-path"]}
        className="left-[340px] top-[250px]"
      />
      <FlowNode
        id="success"
        title="Sync Database"
        description="Committed to cluster"
        icon={CheckCircle2}
        connectedPaths={["success-path"]}
        className="left-[640px] top-[80px]"
      />
      <FlowNode
        id="fail"
        title="Dead Letter Queue"
        description="Retrying delivery pool"
        icon={AlertCircle}
        connectedPaths={["fail-path"]}
        className="left-[640px] top-[250px]"
      />
    </>
  );
}

export default function IdlePipeline() {
  // Pass null and nothing streams until the reader picks a node.
  return (
    <Flowchart initialActivePath={null}>
      <PipelineNodes />
    </Flowchart>
  );
}
```

### Accent color

- `color="emerald"` tints the active stream, the node ports and the focus ring together. One of `blue`, `indigo`, `rose`, `emerald`, `zinc`.

```tsx
import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

function PipelineNodes() {
  return (
    <>
      {/* Routes first: plain SVG path data, M/L for right angles, C for curves */}
      <FlowCanvas>
        <FlowConnection id="success-path" path="M 280 200 L 310 200 L 310 114 L 340 114" />
        <FlowConnection id="success-path" path="M 580 114 L 640 114" />
        <FlowConnection id="fail-path" path="M 280 200 L 310 200 L 310 284 L 340 284" />
        <FlowConnection id="fail-path" path="M 580 284 L 640 284" />
      </FlowCanvas>

      {/* Nodes are absolutely positioned, so the ports line up with the paths */}
      <FlowNode
        id="webhook"
        title="Webhook Trigger"
        description="Inbound secure POST"
        icon={Webhook}
        connectedPaths={["success-path", "fail-path"]}
        className="left-[40px] top-[166px]"
      />
      <FlowNode
        id="transform"
        title="Transform Payload"
        description="Normalizing JSON data"
        icon={Cpu}
        connectedPaths={["success-path"]}
        className="left-[340px] top-[80px]"
      />
      <FlowNode
        id="error"
        title="Validation Check"
        description="Checking metadata schema"
        icon={Terminal}
        connectedPaths={["fail-path"]}
        className="left-[340px] top-[250px]"
      />
      <FlowNode
        id="success"
        title="Sync Database"
        description="Committed to cluster"
        icon={CheckCircle2}
        connectedPaths={["success-path"]}
        className="left-[640px] top-[80px]"
      />
      <FlowNode
        id="fail"
        title="Dead Letter Queue"
        description="Retrying delivery pool"
        icon={AlertCircle}
        connectedPaths={["fail-path"]}
        className="left-[640px] top-[250px]"
      />
    </>
  );
}

export default function AccentedPipeline() {
  // One of "blue" | "indigo" | "rose" | "emerald" | "zinc" — it tints the
  // active stream, the node ports and the focus ring together.
  return (
    <Flowchart initialActivePath="success-path" color="emerald">
      <PipelineNodes />
    </Flowchart>
  );
}
```

## Best Practices & Guidelines

### Keep ports and paths in sync

Node positions come from Tailwind `left-[…]` / `top-[…]` classes and the routes are raw SVG coordinates, so the two are only aligned because you made them align. When you move a node, move the matching `M`/`L` coordinates with it.

### Split long routes into segments

Several `FlowConnection`s can share the same `id`. Splitting a branch into per-hop segments lets the stream animation restart at each node instead of sweeping the whole diagram at once.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Flowchart` | `initialActivePath` | `string \| null` | `null` | The route id that streams on mount. `null` starts every route idle. |
| `Flowchart` | `color` | `"primary" \| "blue" \| "indigo" \| "rose" \| "emerald" \| "zinc"` | `"primary"` | Accent applied to the active stream, node ports and focus rings. |
| `Flowchart` | `layout` | `"fixed" \| "fluid"` | `"fixed"` | `fixed` is the 900×400 blueprint canvas. `fluid` is only the context and a positioned box, for connectors drawn over ordinary layout — give `FlowCanvas` its own `viewBox`. This is how [Data Flow](https://avaraui.com/docs/reactjs/data-flow) draws its curves. |
| `FlowNode` | `id` | `string` | Required | Unique identifier for the node. |
| `FlowNode` | `title` | `string` | Required | Primary label on the node card. |
| `FlowNode` | `description` | `string` | `undefined` | Secondary line under the title. |
| `FlowNode` | `icon` | `React.ComponentType` | `undefined` | Icon rendered in the node's leading slot — any lucide icon works. |
| `FlowNode` | `connectedPaths` | `string[]` | `[]` | Route ids this node sits on. Clicking the node activates the first of them; a node on two routes acts as a branch point. |
| `FlowConnection` | `id` | `string` | Required | Route this segment belongs to. Multiple segments may share one id. |
| `FlowConnection` | `path` | `string` | Required | SVG path data — `M`/`L` for right angles, `C` for curves. |
| `FlowConnection` | `dashed` | `boolean \| string` | `false` | Draw the resting line dashed — `true` for `"4 6"`, or your own pattern. Applied once the draw-in finishes. |
| `FlowConnection` | `flowDash` | `string` | `"6 10"` | Dash pattern of the moving stream while the route is active. The loop length is one dash plus one gap, so any pattern cycles cleanly. |
| `FlowConnection` | `glow` | `boolean` | `true` | The soft blurred halo under the active stream. |
| `FlowConnection` | `drawDuration` | `number` | `1.2` | Seconds the draw-in takes on mount. The stream only starts once the line is drawn; under prefers-reduced-motion both are skipped. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/flowchart
