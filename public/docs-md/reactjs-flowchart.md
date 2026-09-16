# Flowchart / Node Builder

A declarative, highly sleek flowchart engine complete with custom responsive column channels, node action anchors, and custom vector streaming lines animated smoothly via GSAP.

This engine separates data flow layout orchestration from canvas tracking. By combining declarative standard layout structures with pre-set micro connection vectors, pipelines render cross-device flawlessly without heavy calculations crashing client frame updates.

Click any node that sits on a route to make that route the active one — GSAP redraws the stream along the SVG path.

export const pipelineNodes = `function PipelineNodes() {
  return (
    <>
      {/* Routes first: plain SVG path data, M/L for right angles, C for curves */}

      {/* Nodes are absolutely positioned, so the ports line up with the paths */}

  );
}`;

export const usageDefault = `import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

export default function AutomationMap() {
  return (
    
      {/* Routes first: plain SVG path data, M/L for right angles, C for curves */}

      {/* Nodes are absolutely positioned, so the ports line up with the paths */}

  );
}`;

export const usageLinear = `import {
  Flowchart,
  FlowCanvas,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

export default function LinearPipeline() {
  // The smallest useful chart: one route, three nodes on it.
  return (

  );
}`;

export const usageIdle = `import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

${pipelineNodes}

export default function IdlePipeline() {
  // Pass null and nothing streams until the reader picks a node.
  return (

  );
}`;

export const usageColor = `import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";

${pipelineNodes}

export default function AccentedPipeline() {
  // One of "blue" | "indigo" | "rose" | "emerald" | "zinc" — it tints the
  // active stream, the node ports and the focus ring together.
  return (

  );
}`;

## Installation

## Examples

## Best Practices & Guidelines

    Keep ports and paths in sync
    Node positions come from Tailwind left-[…] / top-[…] classes and the routes are raw SVG coordinates, so the two are only aligned because you made them align. When you move a node, move the matching M/L coordinates with it.

    Split long routes into segments
    Several FlowConnections can share the same id. Splitting a branch into per-hop segments lets the stream animation restart at each node instead of sweeping the whole diagram at once.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

        Flowchart
        initialActivePath
        string | null
        null
        The route id that streams on mount. null starts every route idle.

        Flowchart
        color
        "blue" | "indigo" | "rose" | "emerald" | "zinc"
        "indigo"
        Accent applied to the active stream, node ports and focus rings.

        Flowchart
        layout
        "fixed" | "fluid"
        "fixed"
        fixed is the 900×400 blueprint canvas. fluid is only the context and a positioned box, for connectors drawn over ordinary layout — give FlowCanvas its own viewBox. This is how Data Flow draws its curves.

        FlowNode
        id
        string
        Required
        Unique identifier for the node.

        FlowNode
        title
        string
        Required
        Primary label on the node card.

        FlowNode
        description
        string
        undefined
        Secondary line under the title.

        FlowNode
        icon
        React.ComponentType
        undefined
        Icon rendered in the node's leading slot — any lucide icon works.

        FlowNode
        connectedPaths
        string[]
        []
        Route ids this node sits on. Clicking the node activates the first of them; a node on two routes acts as a branch point.

        FlowConnection
        id
        string
        Required
        Route this segment belongs to. Multiple segments may share one id.

        FlowConnection
        path
        string
        Required
        SVG path data — M/L for right angles, C for curves.

        FlowConnection
        dashed
        boolean | string
        false
        Draw the resting line dashed — true for "4 6", or your own pattern. Applied once the draw-in finishes.

        FlowConnection
        flowDash
        string
        "6 10"
        Dash pattern of the moving stream while the route is active. The loop length is one dash plus one gap, so any pattern cycles cleanly.

        FlowConnection
        glow
        boolean
        true
        The soft blurred halo under the active stream.

        FlowConnection
        drawDuration
        number
        1.2
        Seconds the draw-in takes on mount. The stream only starts once the line is drawn; under prefers-reduced-motion both are skipped.

---

**Component Path:** `[framework]\flowchart\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
