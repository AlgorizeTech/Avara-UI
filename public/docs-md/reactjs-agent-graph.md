---
title: "Shadcn Agent Graph"
description: "A multi-agent orchestration tree: a lead agent, worker agents and sub-agents with status pills and token meters. Free shadcn/ui Agent Graph component."
url: https://avaraui.com/docs/nextjs/agent-graph
---

# Shadcn Agent Graph

A multi-agent orchestration tree: a lead agent, worker agents and sub-agents with status pills and token meters.

On desktop viewports, worker agents fan out horizontally with rounded orthogonal connectors; on narrow/mobile screens, the entire tree collapses into an indented vertical hierarchy.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/agent-graph.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/agent-graph
```

## Shaded Tree (Default)

Tree variant featuring layered bevel card borders with shaded background and tinted tool/handoff footers.

- `variant="tree"` renders the hierarchical multi-agent tree layout (default).
- `shade={true}` renders the double-layered shaded backdrop and tiered footer strip (default).
- `tokensUsed` automatically highlights the progress bar and counter in amber once usage reaches 80% of `tokensMax`.

```tsx
import {
  AgentGraph,
  type AgentGraphNode,
} from "@/components/custom/blocks/AgentGraphBlock";

const agentTree: AgentGraphNode = {
  id: "lead",
  name: "Lead",
  model: "Claude Opus",
  status: "working",
  message: "Assigning the patch",
  description: "Delegates root-cause fixes, reviews incoming PRs, and verifies build tests.",
  time: "8s",
  cost: "$0.42",
  tokensUsed: 58000,
  tokensMax: 200000,
  color: "blue",
  iconPattern: [0.35, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 0.35],
  tools: ["linear", "github"],
  handoff: { agent: "Researcher", summary: "Root cause: cart.ts:142" },
  children: [
    {
      id: "researcher",
      name: "Researcher",
      model: "Claude Sonnet",
      status: "done",
      message: "Found the cause",
      description: "Find where and why empty carts crash the checkout",
      time: "5s",
      cost: "$0.31",
      tokensUsed: 104000,
      tokensMax: 200000,
      color: "purple",
      iconPattern: [1, 0.25, 1, 0, 1, 0.4, 1, 0.25, 1],
      tools: ["linear", "notion"],
      handoff: { agent: "Web search", summary: "3 matching reports" },
      children: [
        {
          id: "web-search",
          name: "Web search",
          model: "Perplexity Sonar",
          status: "done",
          message: "Found 3 matches",
          description: "Queries documentation and GitHub issue threads for edge-case reproduction",
          time: "2s",
          cost: "$0.04",
          tokensUsed: 26000,
          tokensMax: 64000,
          color: "purple",
          iconPattern: [0.3, 1, 0.3, 1, 1, 1, 0.3, 1, 0.3],
          tools: ["notion"],
        },
      ],
    },
    {
      id: "coder",
      name: "Coder",
      model: "Claude Sonnet",
      status: "working",
      message: "Opening PR #482",
      description: "Applies guard conditions to cart validation and writes regression tests",
      time: "12s",
      cost: "$0.58",
      tokensUsed: 166000,
      tokensMax: 200000,
      color: "cyan",
      iconPattern: [1, 0, 1, 1, 0, 1, 0.3, 1, 0.3],
      tools: ["github", "vercel"],
      handoff: { agent: "Test runner", summary: "214/214 pass" },
      children: [
        {
          id: "linter",
          name: "Linter",
          model: "ESLint Core",
          status: "done",
          message: "All clean",
          description: "Runs strict typescript-eslint and stylistic rules across modified files",
          time: "1s",
          cost: "$0.01",
          tokensUsed: 15000,
          tokensMax: 32000,
          color: "cyan",
          iconPattern: [0.25, 0, 0, 1, 0.4, 0.25, 1, 1, 1],
          tools: ["github"],
        },
        {
          id: "test-runner",
          name: "Test runner",
          model: "Vitest Runner",
          status: "done",
          message: "All 214 pass",
          description: "Executes full integration suite for checkout and empty-cart boundary flows",
          time: "4s",
          cost: "$0.08",
          tokensUsed: 47000,
          tokensMax: 64000,
          color: "cyan",
          iconPattern: [0.2, 0.8, 0.2, 0.8, 1, 0.8, 0.2, 0.8, 0.2],
          tools: ["vercel"],
        },
      ],
    },
    {
      id: "reviewer",
      name: "Reviewer",
      model: "Claude Opus",
      status: "idle",
      message: "Waiting for work",
      description: "Review PR #482 before it merges",
      cost: "$0.09",
      tokensUsed: 6000,
      tokensMax: 200000,
      color: "emerald",
      iconPattern: [0.3, 1, 0.3, 0.8, 1, 0.8, 0.25, 0.5, 0.25],
      tools: ["github"],
      children: [
        {
          id: "docs-writer",
          name: "Docs writer",
          model: "Claude Sonnet",
          status: "idle",
          message: "Idle",
          description: "Generates release notes and updates API documentation for cart behavior",
          time: "2s",
          cost: "$0.03",
          tokensUsed: 6000,
          tokensMax: 128000,
          color: "emerald",
          iconPattern: [1, 0.3, 1, 1, 0.3, 1, 1, 0.3, 1],
          tools: ["github", "notion"],
        },
      ],
    },
  ],
};

// Default look with tiered shaded backdrop
export default function ShadedAgentWorkflowGraph() {
  return <AgentGraph data={agentTree} variant="tree" shade={true} />;
}
```

## Flat Tree (No Shade)

Pass `shade={false}` to the `tree` variant to remove the outer shaded backdrop and render clean single-surface cards.

- `variant="tree"` renders the hierarchical multi-agent tree layout.
- `shade={false}` removes the outer shaded bezel for a clean minimalist card surface.

```tsx
import {
  AgentGraph,
  type AgentGraphNode,
} from "@/components/custom/blocks/AgentGraphBlock";

// Clean flat card look without outer shade
export default function FlatAgentWorkflowGraph({ data }: { data: AgentGraphNode }) {
  return <AgentGraph data={data} variant="tree" shade={false} />;
}
```

## Editorial (2-Column)

Two-column editorial workflow variant (`variant="editorial"`) with shaded cards by default; pass `shade={false}` for a flat look.

- `variant="editorial"` renders the 2-column editorial launch workflow (Researcher & Writer with Fact checker / SEO sub-agents).
- `shade={true}` supports both `true` (default) and `false` just like the tree variant.

```tsx
import {
  AgentGraph,
  type AgentGraphNode,
} from "@/components/custom/blocks/AgentGraphBlock";

const editorialTree: AgentGraphNode = {
  id: "editor",
  name: "Editor",
  model: "Claude Opus",
  status: "working",
  message: "Delegating",
  description: "Coordinates the launch post workflow across research, writing, fact-checking, and SEO.",
  time: "6s",
  cost: "$0.29",
  tokensUsed: 24000,
  tokensMax: 200000,
  color: "blue",
  iconPattern: [0.35, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 0.35],
  tools: ["notion", "linear"],
  children: [
    {
      id: "researcher",
      name: "Researcher",
      model: "Claude Sonnet",
      status: "working",
      message: "Reading 42 tickets",
      description: "Collects changelog highlights and customer quotes from recent sprint tickets.",
      time: "5s",
      cost: "$0.24",
      tokensUsed: 48000,
      tokensMax: 200000,
      color: "purple",
      iconPattern: [1, 0.25, 1, 0, 1, 0.4, 1, 0.25, 1],
      tools: ["linear", "github"],
      handoff: { agent: "Editor", summary: "What shipped in ..." },
    },
    {
      id: "writer",
      name: "Writer",
      model: "Claude Sonnet",
      status: "idle",
      message: "Waiting for work",
      description: "Drafts the launch announcement and coordinates verification with Fact checker and SEO.",
      time: "4s",
      cost: "$0.18",
      tokensUsed: 8000,
      tokensMax: 200000,
      color: "cyan",
      iconPattern: [1, 0, 1, 1, 0, 1, 0.3, 1, 0.3],
      tools: ["notion"],
      children: [
        {
          id: "fact-checker",
          name: "Fact checker",
          model: "Claude Haiku",
          status: "idle",
          message: "Idle",
          description: "Cross-checks all benchmarks, metrics, and product claims against release notes.",
          time: "2s",
          cost: "$0.02",
          tokensUsed: 1000,
          tokensMax: 64000,
          color: "cyan",
          iconPattern: [0.25, 0, 0, 1, 0.4, 0.25, 1, 1, 1],
          tools: ["notion"],
        },
        {
          id: "seo",
          name: "SEO",
          model: "Claude Haiku",
          status: "idle",
          message: "Idle",
          description: "Audits headings, meta description, and keyword density before publishing.",
          time: "1s",
          cost: "$0.01",
          tokensUsed: 640,
          tokensMax: 32000,
          color: "cyan",
          iconPattern: [0.2, 0.8, 0.2, 0.8, 1, 0.8, 0.2, 0.8, 0.2],
          tools: ["notion"],
        },
      ],
    },
  ],
};

// Two-column editorial workflow (also supports shade={false})
export default function EditorialAgentWorkflowGraph() {
  return <AgentGraph data={editorialTree} variant="editorial" shade={true} />;
}
```

## About Shadcn Agent Graph

**What it is.** `AgentGraph` draws a tree of AI agents: a root orchestrator, its worker agents and their sub-agents. Each card shows a status badge, the current message, a token meter, tool badges and a handoff line. Clicking a card opens a detail popover.

**How it is built.** You pass one nested `AgentGraphNode` as `data`. From the `md` breakpoint up, the root's children become grid columns joined by rounded SVG connectors; below it the tree collapses into an indented vertical list. `shade` switches between layered cards and flat cards, and `liveAnimation` plays a scripted orchestration loop. It needs no npm packages beyond the `utils` registry item.

**When to use it.** Use it for agent observability consoles, multi-agent workflow builders, crew execution logs and architecture diagrams that show who hands work to whom.

## For AI agents

**When to use**

- AI agent observability consoles, multi-agent workflow builders
- Crew execution logs, product architecture diagrams

**When not to use**

- A generic node-and-edge diagram you lay out yourself: use [Flowchart](https://avaraui.com/docs/reactjs/flowchart)
- Live service topology and data-flow telemetry: use [Infrastructure Topology](https://avaraui.com/docs/reactjs/infrastructure-topology)

**Agent notes**

- Pass one root `AgentGraphNode` as `data`. Required node fields are `id`, `name`, `status`, `message`, `tokensUsed`, `tokensMax` and `color`; `children` nests workers and sub-agents.
- `variant` is `"tree"` or `"editorial"` and only picks which built-in simulation runs. `shade` (boolean) switches layered cards for flat ones. The column layout follows how many children the root has.
- With `liveAnimation` on (the default), nodes whose `id` matches the sample ids (`lead`, `researcher`, `web-search`, `coder`, `linter`, `test-runner`, `reviewer`, `docs-writer`, `editor`, `writer`, `fact-checker`, `seo`) get their status, tokens and message overwritten by the simulation, even with `liveAnimation={false}`. Give your own nodes different ids.
- The token bar turns orange at 80% of `tokensMax` and red at 95%.
- The popover buttons (Message, Pause, Stop, Resume, Approve, Decline) change local display state only; there are no callback props.

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/agent-graph

**When to use it.** A hierarchical multi-agent orchestration tree for visualizing AI agent workflows with live handoff beams, arrival glows, token meters, and interactive agent modals.

**Gotchas:**

- Both variants are looks of the one `agent-graph` item: install it once and set `variant` (`tree` or `editorial`) and `shade` (`true` or `false`).
- On desktop viewports, worker agents fan out horizontally; on narrow screens, the tree collapses into an indented vertical hierarchy.

### The 3 variants

1. **Shaded Tree (Default)** (`tree`): Three-column engineering crew tree with layered shaded card bezels.
   - Live: https://avaraui.com/view/agent-graph/tree
   - Best for: multi-agent engineering workflows with Lead, Researcher, Coder, and Reviewer branches
   - Avoid if: you need a narrower two-column editorial layout
   - Traits: 3-column tree, shaded cards, live handoff animation
   - Install: `npx shadcn@latest add @avara-ui/agent-graph`
   - Set these props: `{"variant":"tree","shade":true}`
   - Docs: https://avaraui.com/docs/nextjs/agent-graph#shaded-tree-default
2. **Flat Tree (No Shade)** (`tree-flat`): Three-column tree with `shade={false}` for clean single-surface cards.
   - Live: https://avaraui.com/view/agent-graph/tree-flat
   - Best for: minimalist dashboards where outer card bezels are not needed
   - Avoid if: you want tiered shaded footer strips
   - Traits: 3-column tree, flat surface
   - Install: `npx shadcn@latest add @avara-ui/agent-graph`
   - Set these props: `{"variant":"tree","shade":false}`
   - Docs: https://avaraui.com/docs/nextjs/agent-graph#flat-no-shade
3. **Editorial (2-Column)** (`editorial`): Two-column editorial workflow tree (Editor -> Researcher & Writer with Fact checker and SEO).
   - Live: https://avaraui.com/view/agent-graph/editorial
   - Best for: content, launch post, or two-branch agent pipelines
   - Avoid if: you need three top-level worker columns
   - Traits: 2-column tree, supports shade true/false
   - Install: `npx shadcn@latest add @avara-ui/agent-graph`
   - Set these props: `{"variant":"editorial","shade":true}`
   - Docs: https://avaraui.com/docs/nextjs/agent-graph#editorial-crew

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `AgentGraphNode` | Required | Root orchestrator node containing nested `children` for workers and sub-agents. |
| `variant` | `"tree" \| "editorial"` | `"tree"` | Picks which built-in live simulation runs (engineering tree or editorial crew). The column count comes from the number of root children. |
| `animateIn` | `boolean` | `true` | Fades the graph in on mount. |
| `shade` | `boolean` | `true` | Renders the outer shaded backdrop and tiered footer. Set `false` for a flat single-surface card. |
| `liveAnimation` | `boolean` | `true` | Plays the scripted handoff loop. It only drives nodes that use the sample ids, and stops when `false`. |
| Other props | `HTMLAttributes<HTMLDivElement>` | `undefined` | Passed to the root `div`, including `className`. |

### AgentGraphNode Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique identifier for the node. |
| `name` | `string` | Required | Display name of the agent or sub-agent. |
| `model` | `string` | `undefined` | Optional model subtitle (e.g. `"Claude Opus"`). |
| `status` | `"working" \| "done" \| "idle" \| "needs-you" \| "failed" \| "paused"` | Required | Controls the status badge and message styling. `failed` is in the type but renders as idle. |
| `message` | `string` | Required | Current task or status line shown inside the card. |
| `tokensUsed` | `number` | Required | Tokens consumed so far. |
| `tokensMax` | `number` | Required | Maximum token budget for the agent. |
| `color` | `"blue" \| "purple" \| "cyan" \| "emerald" \| "amber"` | Required | Accent colour for the pixel icon, progress bar, and connector lines. |
| `tools` | `("linear" \| "github" \| "notion" \| "vercel")[]` | `undefined` | Tool integration badges rendered in the card footer. |
| `handoff` | `&#123; agent: string; summary: string &#125;` | `undefined` | Optional handoff target and truncated summary in the footer. |
| `children` | `AgentGraphNode[]` | `undefined` | Nested worker or sub-agent nodes. |
| `statusLabel` | `string` | `undefined` | Overrides the badge text (the tooltip for done and idle). Ignored for `needs-you`. |
| `icon` | `ReactNode` | Pixel matrix | Replaces the 3x3 pixel icon in the card header. |
| `iconPattern` | `number[]` | Built-in pattern | Nine opacities (0 to 1) for the pixel icon cells; values above 0.3 light a cell. |
| `description` | `string` | `message` | Longer text in the click popover. |
| `time` | `string` | `undefined` | Run time shown in the popover. |
| `cost` | `string` | `undefined` | Cost shown in the popover. |

## Works with other components

- [User Graph](https://avaraui.com/docs/reactjs/user-graph) links a user to agents and integrations, so it can sit above the orchestrator `AgentGraph` shows.
- [Flowchart](https://avaraui.com/docs/reactjs/flowchart) suits fixed pipelines you lay out yourself, where `AgentGraph` follows a parent and child tree.
- [AI Chat](https://avaraui.com/docs/reactjs/ai-chat) pairs with it when the person watching the agents also talks to them.

## When does the AgentGraph token meter change colour?

The meter compares `tokensUsed` with `tokensMax`. From 80% the bar turns orange and the count turns amber, and from 95% the bar turns red. These thresholds are fixed in the component source rather than props, so edit `isHighUsage` and `isExtremeUsage` in the file if you need others.

## Why do my AgentGraph statuses keep changing by themselves?

`liveAnimation` defaults to `true` and runs a scripted loop that rewrites status, tokens and message for nodes using the sample ids such as `lead`, `researcher` or `editor`. Use your own `id` values, and set `liveAnimation={false}` to stop the loop. Nodes with other ids always show your data.

## What is the difference between the tree and editorial variants of AgentGraph?

Very little in layout. `variant` only chooses which built-in simulation plays: `"tree"` runs the engineering crew script and `"editorial"` runs the launch-post script. The columns come from how many `children` the root has, and `shade` handles layered versus flat cards.

## Do the AgentGraph popover buttons call my code?

No. Message, Pause, Stop, Resume, Approve and Decline only update the graph's own display state, such as showing "Paused by you". `AgentGraph` has no callback props for them, so wire real controls by editing the component or placing your own buttons beside it.

## Can I open an AgentGraph card with the keyboard?

Yes. Each card is a focusable `role="button"` that opens its popover on Enter or Space, and Escape closes it. The popover is not a labelled dialog, and the component does not read `prefers-reduced-motion`, so set `liveAnimation={false}` and `animateIn={false}` for a calmer graph.

## Does AgentGraph work in Vite or need extra packages?

It works in any React app. The file is a client component with no `next/*` imports and no npm dependencies, only the `cn` helper from the `utils` registry item. The connectors are inline SVG and the motion is CSS keyframes, so nothing else is installed.

---

Live previews and every example: https://avaraui.com/docs/nextjs/agent-graph
