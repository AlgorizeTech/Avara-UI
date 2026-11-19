"use client";

import {
  AgentGraph,
  type AgentGraphNode,
  type AgentGraphVariant,
} from "@/components/custom/blocks/AgentGraphBlock";

const AGENT_GRAPH_DATA: AgentGraphNode = {
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
  handoff: {
    agent: "Researcher",
    summary: "Root cause: cart.ts:142",
  },
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
      handoff: {
        agent: "Web search",
        summary: "3 matching reports",
      },
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
      handoff: {
        agent: "Test runner",
        summary: "214/214 pass",
      },
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
          description: "Executes unit and integration test suites on checkout & cart modules",
          time: "4s",
          cost: "$0.08",
          tokensUsed: 47000,
          tokensMax: 64000,
          color: "cyan",
          iconPattern: [1, 1, 1, 0.25, 1, 0.25, 0, 1, 0],
          tools: ["github"],
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
      time: "3s",
      cost: "$0.09",
      tokensUsed: 6000,
      tokensMax: 200000,
      color: "emerald",
      iconPattern: [0, 1, 0, 1, 1, 1, 1, 0.2, 1],
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

const EDITORIAL_AGENT_GRAPH_DATA: AgentGraphNode = {
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
      handoff: {
        agent: "Editor",
        summary: "What shipped in ...",
      },
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

export default function AgentGraphDemo({
  triggerKey = 0,
  variant = "tree",
  shade = true,
}: {
  triggerKey?: number;
  variant?: AgentGraphVariant;
  shade?: boolean;
}) {
  const graphData =
    variant === "editorial" ? EDITORIAL_AGENT_GRAPH_DATA : AGENT_GRAPH_DATA;

  return (
    <div
      className={`w-full relative rounded-2xl border border-border overflow-hidden ${
        shade ? "bg-[#f9fafb] dark:bg-zinc-950" : "bg-white dark:bg-zinc-950"
      }`}
    >
      <div className="px-4 sm:px-8 md:px-10 py-16 sm:py-20 md:py-[100px] flex items-center justify-center">
        <AgentGraph
          key={`${triggerKey}-${variant}-${shade}`}
          data={graphData}
          variant={variant}
          shade={shade}
        />
      </div>
    </div>
  );
}
