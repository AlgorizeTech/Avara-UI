---
title: "Shadcn Agent Graph"
description: "Shadcn Agent Graph. A hierarchical multi-agent orchestration tree for visualizing AI agent workflows: shows a lead orchestrator branching into worker agents…"
url: https://avaraui.com/docs/nextjs/agent-graph
---

# Shadcn Agent Graph

A hierarchical multi-agent orchestration tree for visualizing AI agent workflows: shows a lead orchestrator branching into worker agents and compact sub-agents, complete with status pills, token usage bars, tool integrations, and handoff trails.

On desktop viewports, worker agents fan out horizontally with rounded orthogonal connectors; on narrow/mobile screens, the entire tree collapses into an indented vertical hierarchy.

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

## Examples

### Flat Tree (No Shade)

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

### Editorial (2-Column)

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

## Features
Discover the key capabilities that make this component an excellent choice for modern AI orchestration interfaces.

### Dual Visual Styles (Shaded &amp; Flat)

Control card depth with the `shade` prop — true for tiered layered bezels, or false for flat minimalist cards.

### Responsive Tree Layout

Fans out horizontally into equal columns on desktop and collapses into an indented vertical tree on mobile.

### Live Status &amp; Token Budgets

Displays animated working spinners, completion checks, and automatic high-usage token warnings.

### Tool &amp; Handoff Footer

Highlights connected integrations and the latest agent-to-agent handoff summary directly below each worker card.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `AgentGraphNode` | Required | Root orchestrator node containing nested `children` for workers and sub-agents. |
| `variant` | `"tree" \| "editorial"` | `"tree"` | Layout variant for the agent graph (3-column engineering tree or 2-column editorial workflow). |
| `animateIn` | `boolean` | `true` | Fades the graph in on mount. |
| `shade` | `boolean` | `true` | Renders the outer shaded backdrop and tiered footer. Set `false` for a flat single-surface card. |
| `liveAnimation` | `boolean` | `true` | Enables the live sequential orchestration handoff animation loop across the tree. |

### AgentGraphNode Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique identifier for the node. |
| `name` | `string` | Required | Display name of the agent or sub-agent. |
| `model` | `string` | `undefined` | Optional model subtitle (e.g. `"Claude Opus"`). |
| `status` | `"working" \| "done" \| "idle" \| "needs-you"` | Required | Controls the status badge and message styling. |
| `message` | `string` | Required | Current task or status line shown inside the card. |
| `tokensUsed` | `number` | Required | Tokens consumed so far. |
| `tokensMax` | `number` | Required | Maximum token budget for the agent. |
| `color` | `"blue" \| "purple" \| "cyan" \| "emerald" \| "amber"` | Required | Accent colour for the pixel icon, progress bar, and connector lines. |
| `tools` | `("linear" \| "github" \| "notion" \| "vercel")[]` | `undefined` | Tool integration badges rendered in the card footer. |
| `handoff` | `&#123; agent: string; summary: string &#125;` | `undefined` | Optional handoff target and truncated summary in the footer. |
| `children` | `AgentGraphNode[]` | `undefined` | Nested worker or sub-agent nodes. |

## For AI agents

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/agent-graph
