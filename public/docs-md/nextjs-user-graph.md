# User Graph

An interactive multi-tiered User & AI Agent Hierarchy Network Graph built for Next.js and React. It features an interactive orbiting tool cluster around the main user node, SVG connecting curves, specialized sub-agent team nodes, app integration badges, and full light mode design.

## Examples

Three tiers stack top to bottom: an orbit of channel nodes around the user, the orchestrator, and the specialist sub-agents with their app badges. Below 640px the SVG hierarchy swaps itself for a vertical timeline — the component measures its own container, so it adapts inside the preview, not just at the window edge. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { UserGraph } from "@/components/custom/blocks/UserGraphBlock";

export default function UserGraphPage() {
  return (

  );
}`;

export const usageSelected = `// \`defaultSelectedTool\` is the orbit node highlighted on first render —
// match it to whichever channel the page is about.
`;

export const usageOrchestrator = `// \`orchestrator\` is the middle-tier node. Every tier takes data the same
// way, so you can replace one without touching the others.
`;

export const usageData = `// The full data surface. Each sub-agent carries its own horizontal
// position: \`percentX\` places the card, \`svgX\` anchors the connector curve
// in the 1000-wide viewBox — keep the two in step.
`;

## Installation

### 1. Install Dependencies

This component uses `lucide-react` for the channel and app icons.

```bash
npm install lucide-react
```

### 2. Copy the Component

Create `components/custom/blocks/UserGraphBlock.tsx` and copy the source from the **Code** tab of the first example above. The sample orbit tools, sub-agents and orchestrator ship inside it as defaults — replace them with props rather than editing the file.

## Features

Discover the key capabilities of the User Graph hierarchy tree:

    Orbit Tool Cluster
    Interactive orbiting ring featuring 10 integrated channels including Voice, Telegram, Email, and MCP plugins.

    Dynamic SVG Curves
    Cubic bezier SVG connecting paths with glowing animated pulses highlighting selected agent hierarchy paths.

    Specialized Sub-Agents
    Dedicated team nodes for Sales, Marketing, Support, Accounting, and Data Analytics with online status badges.

    Light Mode First
    Crafted with high-contrast slate and white light theme aesthetics, full dark mode support, and smooth responsiveness.

## Best Practices & Guidelines

    Hierarchy Organization
    Ensure nodes are grouped logically into User, Orchestrator, and Sub-Agent tiers so the hierarchy flows naturally from top to bottom.

## Props Reference

        Prop
        Type
        Default
        Description

        color
        string
        "primary"
        Accent for the avatar ring, the selected orbit node and the ambient glow. Takes "indigo", "rose", "emerald", "zinc", any hex string, or "primary" to follow your theme.

        defaultSelectedTool
        string
        "phone"
        The id of the orbit node highlighted on first render. Clicking another node takes over from there.

        orbitTools
        OrbitTool[]
        11 sample channels
        The ring of channel nodes. Each is {"{ id, name, icon }"}, where icon is any React component. They are spaced evenly, so the ring re-balances for any array length.

        subAgents
        SubAgent[]
        5 sample agents
        The bottom tier. Each entry carries title, role, avatarUrl, status, its apps badges, and two positions: percentX for the card and svgX for the connector curve in the 1000-wide viewBox.

        orchestrator
        {"{ name, role, avatarUrl }"}
        sample lead
        The middle-tier node linking the orbit to the sub-agents.

        className
        string
        undefined
        Merged onto the outer container. Every other div prop is spread there too.

---

**Component Path:** `nextjs\user-graph\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
