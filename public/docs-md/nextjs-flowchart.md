---
title: "Flowchart / Node Builder"
description: "Shadcn Flowchart / Node Builder. A declarative flowchart with responsive column channels."
url: https://avaraui.com/docs/nextjs/flowchart
---

# Flowchart / Node Builder

A declarative flowchart: SVG routes that draw themselves in, absolutely positioned node cards, and a moving dashed stream on the active route.

Click any node that sits on a route to make that route the active one — the moving stream switches to that SVG path.

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
import { AlertCircle, CheckCircle2, Cpu, Terminal, Webhook } from "lucide-react";

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

## Linear pipeline

- `initialActivePath="main-route"` streams that route on mount — the minimum composition is one route threaded through three nodes.

```tsx
import {
  Flowchart,
  FlowCanvas,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import { CheckCircle2, Cpu, Webhook } from "lucide-react";

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

## No active route

- Set `initialActivePath={null}` to start every route idle and let the reader activate a branch by clicking a node.

```tsx
import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import { AlertCircle, CheckCircle2, Cpu, Terminal, Webhook } from "lucide-react";

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

## AI Agent convergence

- `path="C ..."` smooth cubic bezier curves guide multi-agent inputs into a central orchestrator before streaming to code execution and artifacts.

```tsx
import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import { Bot, Cpu, Database, Layers, Terminal } from "lucide-react";

export default function AgentPipeline() {
  return (
    <Flowchart initialActivePath="agent-exec-path">
      <FlowCanvas>
        {/* Curved input routes converging into the orchestrator */}
        <FlowConnection
          id="agent-exec-path"
          path="M 270 110 C 305 110, 295 200, 330 200"
        />
        <FlowConnection
          id="agent-eval-path"
          path="M 270 290 C 305 290, 295 200, 330 200"
        />

        {/* Curved output routes diverging to execution & artifacts */}
        <FlowConnection
          id="agent-exec-path"
          path="M 570 200 C 605 200, 595 110, 630 110"
        />
        <FlowConnection
          id="agent-eval-path"
          path="M 570 200 C 605 200, 595 290, 630 290"
        />
      </FlowCanvas>

      {/* Input Agents */}
      <FlowNode
        id="prompt-agent"
        title="Autonomous Agent"
        description="Goal decomposition & reasoning"
        icon={Bot}
        connectedPaths={["agent-exec-path"]}
        className="left-[30px] top-[76px]"
      />
      <FlowNode
        id="vector-memory"
        title="Vector Memory"
        description="Hybrid semantic search"
        icon={Database}
        connectedPaths={["agent-eval-path"]}
        className="left-[30px] top-[256px]"
      />

      {/* Central Orchestrator */}
      <FlowNode
        id="orchestrator"
        title="Runtime Coordinator"
        description="Dynamic tool selection loop"
        icon={Cpu}
        connectedPaths={["agent-exec-path", "agent-eval-path"]}
        className="left-[330px] top-[166px]"
      />

      {/* Execution & Output Targets */}
      <FlowNode
        id="code-sandbox"
        title="Code Sandbox"
        description="Isolated micro-container"
        icon={Terminal}
        connectedPaths={["agent-exec-path"]}
        className="left-[630px] top-[76px]"
      />
      <FlowNode
        id="artifacts"
        title="Artifact Stream"
        description="Verified real-time components"
        icon={Layers}
        connectedPaths={["agent-eval-path"]}
        className="left-[630px] top-[256px]"
      />
    </Flowchart>
  );
}
```

## About Flowchart / Node Builder

**What it is.** **Flowchart / Node Builder** (`FlowCanvas`, `FlowNode`, and `FlowConnection`) is a declarative SVG pipeline and node-diagram engine with CSS-animated streaming routes and clickable branch activation.

**How it is built.** The `Flowchart` root holds the active route in context, seeded by `initialActivePath`. `FlowCanvas` is the SVG layer that holds `FlowConnection` paths (`M`/`L` right angles or `C` curves), and `FlowNode` cards sit on top at fixed `left-[...]` and `top-[...]` positions. The default 900 by 400 canvas scales down to fit narrower containers, and the draw-in and stream use CSS animation.

**When to use it.** Use it for workflow automations, CI/CD pipelines, multi-agent convergence diagrams, and interactive system architecture maps.

## For AI agents

**When to use**

- Workflow automations, CI/CD pipelines
- Multi-agent convergence diagrams, interactive system architecture maps

**When not to use**

- Live service telemetry between infrastructure nodes: use [Infrastructure Topology](https://avaraui.com/docs/nextjs/infrastructure-topology)
- An agent hierarchy with status and token meters: use [Agent Graph](https://avaraui.com/docs/nextjs/agent-graph)

**Agent notes**

- Compose `FlowCanvas` with `FlowConnection` (raw SVG `path` + `id`) and `FlowNode` (`connectedPaths` array).
- Give every segment of one route the same `id`: they draw in together and all stream when that route is active.
- Keep `FlowNode` Tailwind `left-[...]` / `top-[...]` positions synchronized with `FlowConnection` `M`/`L`/`C` coordinates. Nodes are 240 by 68 px on a 900 by 400 canvas.
- Import `Flowchart`, `FlowCanvas`, `FlowConnection` and `FlowNode` from `@/components/custom/blocks/FlowchartBlock`.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Flowchart` | `initialActivePath` | `string \| null` | `null` | The route id that streams on mount. `null` starts every route idle. |
| `Flowchart` | `color` | `"primary" \| "blue" \| "indigo" \| "rose" \| "emerald" \| "zinc"` | `"primary"` | Accent applied to the active stream, node ports and focus rings. |
| `Flowchart` | `layout` | `"fixed" \| "fluid"` | `"fixed"` | `fixed` is the 900×400 blueprint canvas. `fluid` is only the context and a positioned box, for connectors drawn over ordinary layout — give `FlowCanvas` its own `viewBox`. This is how [Data Flow](https://avaraui.com/docs/nextjs/data-flow) draws its curves. |
| `FlowNode` | `id` | `string` | Required | Unique identifier for the node. |
| `FlowNode` | `title` | `string` | Required | Primary label on the node card. |
| `FlowNode` | `description` | `string` | `undefined` | Secondary line under the title. |
| `FlowNode` | `icon` | `React.ElementType` | `undefined` | Icon rendered in the node's leading slot — any lucide icon works. |
| `FlowNode` | `connectedPaths` | `string[]` | `[]` | Route ids this node sits on. Clicking the node activates the first of them; a node on two routes acts as a branch point. |
| `FlowConnection` | `id` | `string` | Required | Route this segment belongs to. Multiple segments may share one id. |
| `FlowConnection` | `path` | `string` | Required | SVG path data — `M`/`L` for right angles, `C` for curves. |
| `FlowConnection` | `dashed` | `boolean \| string` | `false` | Draw the resting line dashed — `true` for `"4 6"`, or your own pattern. Applied once the draw-in finishes. |
| `FlowConnection` | `flowDash` | `string` | `"6 10"` | Dash pattern of the moving stream while the route is active. The loop length is one dash plus one gap, so any pattern cycles cleanly. |
| `FlowConnection` | `glow` | `boolean` | `true` | The soft blurred halo under the active stream. |
| `FlowConnection` | `drawDuration` | `number` | `1.2` | Seconds the draw-in takes on mount. The stream only starts once the line is drawn; under prefers-reduced-motion both are skipped. |

## Works with other components

- [Data Flow](https://avaraui.com/docs/nextjs/data-flow) uses `Flowchart` with `layout="fluid"` to draw curves between ordinary cards.
- [Infrastructure Topology](https://avaraui.com/docs/nextjs/infrastructure-topology) shows live telemetry between infrastructure nodes where a flowchart shows a fixed route.
- [Agent Graph](https://avaraui.com/docs/nextjs/agent-graph) covers agent hierarchies with status and token meters.
- Put a flowchart beside an [API Playground](https://avaraui.com/docs/nextjs/api-playground) to document the endpoints a pipeline calls.

## How do I show a route that has several segments?

Give every `FlowConnection` on that route the same `id`, then list that `id` in the `connectedPaths` of each `FlowNode` it touches. The segments draw in together, and all of them stream while the route is active.

## How do I start the flowchart with no route active?

Pass `initialActivePath={null}`, which is also the default. Every route stays a resting line until the reader clicks a `FlowNode`, which activates the first id in its `connectedPaths`. Pass a route id instead to have that route stream on mount.

## How do I line a FlowNode up with a FlowConnection path?

Place the node with Tailwind `left-[...]` and `top-[...]` classes on its `className`, and write the path in the same 900 by 400 coordinate space. A `FlowNode` is 240 by 68 px, so a path ending at x 340 meets a node at `left-[340px]`.

## How do I change the colour of the active route?

Set `color` on `Flowchart` to `primary`, `blue`, `indigo`, `rose`, `emerald` or `zinc`. It tints the active stream, the node ring and the icon tile. The default `primary` follows your theme's `--primary` token, so the flowchart matches the rest of your app without an extra prop.

## Can I use Flowchart outside a fixed 900 by 400 canvas?

Yes. Set `layout="fluid"` on `Flowchart` to get only the context and a positioned box, then give `FlowCanvas` its own `viewBox` and draw connectors over your own cards and columns. In that mode the 900 by 400 grid is gone. [Data Flow](https://avaraui.com/docs/nextjs/data-flow) is built this way.

## Does Flowchart respect reduced motion and work outside Next.js?

Under `prefers-reduced-motion` the draw-in is skipped and the moving stream does not animate. The file has no `next/*` imports and no npm dependencies beyond React, so it installs into Vite as well. Nodes are clickable `div`s, so there is no keyboard activation.

---

Live previews and every example: https://avaraui.com/docs/nextjs/flowchart
