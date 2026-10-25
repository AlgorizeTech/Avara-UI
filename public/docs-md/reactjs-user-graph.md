export const metadata = docsPageMetadata("user-graph");

# User Graph

An interactive multi-tiered User & AI Agent Hierarchy Network Graph built for Next.js and React. It features an interactive orbiting tool cluster around the main user node, SVG connecting curves, specialized sub-agent team nodes, app integration badges, and full light mode design.

Three tiers stack top to bottom: an orbit of channel nodes around the user, the orchestrator, and the specialist sub-agents with their app badges. Below 640px the SVG hierarchy swaps itself for a vertical timeline — the component measures its own container, so it adapts inside the preview, not just at the window edge.

export const usageDefault = `import { UserGraph, type OrbitTool, type SubAgent } from "@/components/custom/blocks/UserGraphBlock";

// Optional: Customize central orchestrator node
const orchestrator = {
  name: "John Doe",
  role: "Senior Product Designer",
  avatarUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790150480/photo-1506794778202-cad84cf45f1d-1790150482275.jpg",
};

// Optional: Customize orbiting tools
const orbitTools: OrbitTool[] = [
  { id: "slack", name: "Slack", icon: Share2 },
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare },
  { id: "telegram", name: "Telegram", icon: Send },
  { id: "email", name: "Email", icon: Mail },
  { id: "code", name: "Code", icon: Code2 },
  { id: "workflow", name: "Workflow", icon: Network },
  { id: "mcp", name: "MCP", icon: Plug },
  { id: "phone", name: "Phone", icon: Phone },
];

// Optional: Customize sub-agent team cards & app integrations
const subAgents: SubAgent[] = [
  {
    id: "sales",
    title: "Sales Lead",
    role: "Enterprise Conversions",
    avatarUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
    status: "online",
    percentX: 20,
    svgX: 200,
    apps: [
      { id: "hubspot", name: "HubSpot", icon: Globe, bgColor: "bg-teal-50 dark:bg-teal-950/80", textColor: "text-teal-600 dark:text-teal-400", borderColor: "border-teal-300 dark:border-teal-700" },
      { id: "stripe", name: "Stripe", icon: CreditCard, bgColor: "bg-amber-50 dark:bg-amber-950/80", textColor: "text-amber-600 dark:text-amber-400", borderColor: "border-amber-300 dark:border-amber-700", customText: "S" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Director",
    role: "Global Campaigns",
    avatarUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
    status: "online",
    percentX: 50,
    svgX: 500,
    apps: [
      { id: "web", name: "Website", icon: Globe, bgColor: "bg-muted", textColor: "text-foreground", borderColor: "border-border" },
      { id: "mailchimp", name: "Mailchimp", icon: Send, bgColor: "bg-purple-50 dark:bg-purple-950/80", textColor: "text-purple-600 dark:text-purple-400", borderColor: "border-purple-300 dark:border-purple-700" },
    ],
  },
  {
    id: "analyst",
    title: "Data Engineer",
    role: "BI & Pipeline Systems",
    avatarUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
    status: "online",
    percentX: 80,
    svgX: 800,
    apps: [
      { id: "drive", name: "Google Drive", icon: Database, bgColor: "bg-amber-50 dark:bg-amber-950/80", textColor: "text-amber-600 dark:text-amber-400", borderColor: "border-amber-300 dark:border-amber-700" },
      { id: "sheets", name: "Sheets", icon: BarChart3, bgColor: "bg-emerald-50 dark:bg-emerald-950/80", textColor: "text-emerald-600 dark:text-emerald-400", borderColor: "border-emerald-300 dark:border-emerald-700" },
    ],
  },
];

export default function UserGraphDemo() {
  return (

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/user-graph.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/user-graph
```

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

**Component Path:** `[framework]\user-graph\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
