import type { PageVariants } from "./types";

/**
 * Agent Graph: 2 layout variants (`tree` and `editorial`) with `shade` toggle.
 * Claims come from src/app/docs/[framework]/agent-graph/page.mdx.
 */
export const agentGraph: PageVariants = {
  slug: "agent-graph",
  intro:
    "A hierarchical multi-agent orchestration tree for visualizing AI agent workflows with live handoff beams, arrival glows, token meters, and interactive agent modals.",
  gotchas: [
    "Both variants are looks of the one `agent-graph` item: install it once and set `variant` (`tree` or `editorial`) and `shade` (`true` or `false`).",
    "On desktop viewports, worker agents fan out horizontally; on narrow screens, the tree collapses into an indented vertical hierarchy.",
  ],
  variants: [
    {
      id: "tree",
      label: "Shaded Tree (Default)",
      group: "Layout",
      summary: "Three-column engineering crew tree with layered shaded card bezels.",
      bestFor: ["multi-agent engineering workflows with Lead, Researcher, Coder, and Reviewer branches"],
      avoidIf: ["you need a narrower two-column editorial layout"],
      traits: ["3-column tree", "shaded cards", "live handoff animation"],
      item: "agent-graph",
      demo: "agent-graph",
      example: "Shaded Tree (Default)",
      props: { variant: "tree", shade: true },
      setProps: { variant: "tree", shade: true },
    },
    {
      id: "tree-flat",
      label: "Flat Tree (No Shade)",
      group: "Layout",
      summary: "Three-column tree with `shade={false}` for clean single-surface cards.",
      bestFor: ["minimalist dashboards where outer card bezels are not needed"],
      avoidIf: ["you want tiered shaded footer strips"],
      traits: ["3-column tree", "flat surface"],
      item: "agent-graph",
      demo: "agent-graph",
      example: "Flat Tree (No Shade)",
      props: { variant: "tree", shade: false },
      setProps: { variant: "tree", shade: false },
    },
    {
      id: "editorial",
      label: "Editorial (2-Column)",
      group: "Layout",
      summary: "Two-column editorial workflow tree (Editor -> Researcher & Writer with Fact checker and SEO).",
      bestFor: ["content, launch post, or two-branch agent pipelines"],
      avoidIf: ["you need three top-level worker columns"],
      traits: ["2-column tree", "supports shade true/false"],
      item: "agent-graph",
      demo: "agent-graph",
      example: "Editorial (2-Column)",
      props: { variant: "editorial", shade: true },
      setProps: { variant: "editorial", shade: true },
    },
  ],
};
