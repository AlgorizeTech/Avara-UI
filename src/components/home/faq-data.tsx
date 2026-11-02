import {
  Accessibility,
  ArrowLeftRight,
  Blocks,
  Bot,
  FileText,
  ImageIcon,
  KeyRound,
  Layers,
  LifeBuoy,
  Link2,
  MessageSquare,
  Monitor,
  Package,
  Pause,
  PencilLine,
  Plug,
  RefreshCw,
  Rocket,
  SearchX,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FAQItem } from "@/components/custom/blocks/animated-faq-data";
import { COMPONENT_COUNT, SITE_NAME, SITE_URL, links } from "@/config/site";
import { REGISTRY_ADD_ARGS, REGISTRY_BASE_URL, REGISTRY_NAMESPACE } from "@/lib/registry";
import { FaqTopicVisual } from "@/components/home/faq-visuals";

/**
 * The homepage FAQ. Kept apart from the sample data AnimatedFAQBlock ships with,
 * which is registry output for other people's projects; this one is about us.
 * Names, URLs and counts come from the site config, never from typed-in copy.
 *
 * Every answer here restates something the repo itself says or does — the
 * LICENSE, CONTRIBUTING, the MCP and installation guides, /llms.txt, the
 * registry metadata, or the installed shadcn CLI's own --help. Do not add a
 * claim (a score, a speed-up, a "zero") that nothing in the repo backs.
 *
 * The block asks every item for a photo, a caption and a canvas size. The
 * homepage shows neither photo nor caption, so `topic()` fills those in and each
 * item only states what it actually varies: the words, the visual and the size.
 */
function topic(
  item: Pick<FAQItem, "id" | "category" | "question" | "answer" | "height" | "maxWidth" | "visual"> &
    Partial<Pick<FAQItem, "clipCut">>,
): FAQItem {
  return {
    clipCut: "2.25rem",
    image: "",
    location: item.category,
    coordinates: SITE_NAME,
    ...item,
  };
}

/** The canvas panel beside an answer. */
function panel(
  icon: LucideIcon,
  title: string,
  badge: string,
  points: [string, string, string, string],
  highlight: string,
  highlightMeta: string,
  footerLeft: string,
  footerRight: string,
) {
  return (
    <FaqTopicVisual
      icon={icon}
      title={title}
      badge={badge}
      points={points}
      highlight={highlight}
      highlightMeta={highlightMeta}
      footerLeft={footerLeft}
      footerRight={footerRight}
    />
  );
}

const included = COMPONENT_COUNT ? `${COMPONENT_COUNT} free` : "A growing set of free";
const host = SITE_URL.replace(/^https?:\/\//, "");

export const HOME_FAQ_ITEMS: FAQItem[] = [
  // ── Getting Started ──────────────────────────────────────────────
  // Uses the block's own terminal visual.
  topic({
    id: "installation",
    category: "CLI & Setup",
    question: `How do I install ${SITE_NAME} components?`,
    answer:
      `Register ${SITE_NAME} once with "npx shadcn@latest ${REGISTRY_ADD_ARGS}", then add what you need, for example "npx shadcn@latest add ${REGISTRY_NAMESPACE}/button". ` +
      "The CLI copies the source into your project and installs the npm packages and other registry items it depends on. " +
      'Your project needs Tailwind CSS v4 and a components.json file; "npx shadcn@latest init" creates the file.',
    height: 420,
    maxWidth: 460,
  }),
  topic({
    id: "install-by-url",
    category: "CLI & Setup",
    question: "Can I install a component without registering the registry first?",
    answer:
      `Yes. Pass the item's URL instead: "npx shadcn@latest add ${REGISTRY_BASE_URL}/button.json". ` +
      `Every item is published at ${REGISTRY_BASE_URL}/<name>.json, so you can open one in a browser to read its files and dependencies before installing.`,
    height: 350,
    maxWidth: 500,
    visual: panel(
      Link2,
      "Install By URL",
      "NO SETUP",
      ["Skip the registry step", "One command", "Readable item JSON", "Same files installed"],
      "Every item is a public JSON file",
      "<name>.json",
      `${host}/r/<name>.json`,
      "shadcn add <url>",
    ),
  }),
  topic({
    id: "included",
    category: "What's Included",
    question: `What is included in ${SITE_NAME}?`,
    answer:
      `${included} React components and blocks, in two groups: UI components, and Website Sections such as hero, navbar, footer, auth forms and dashboard. ` +
      "There are also guides for pairing the library with third-party tools such as carousels, charts and data tables. " +
      "Every docs page has a live preview with the code to copy.",
    height: 360,
    maxWidth: 500,
    visual: panel(
      Blocks,
      "Component Registry",
      "ALL FREE",
      ["UI components", "Website Sections", "Third-party guides", "Live previews"],
      "Copy-paste code on every page",
      "TS + Tailwind",
      `${REGISTRY_NAMESPACE}/*`,
      COMPONENT_COUNT ? `${COMPONENT_COUNT} components` : "shadcn registry",
    ),
  }),
  topic({
    id: "sections",
    category: "What's Included",
    question: "What is the difference between UI components and Website Sections?",
    answer:
      "UI components are single pieces, such as an accordion or a marquee. Website Sections are larger page sections, such as a hero, navbar or footer, assembled from the library's own UI components. " +
      "Installing a section also installs the pieces it uses as registry dependencies, and all of it lands in your repo for you to edit.",
    height: 370,
    maxWidth: 500,
    visual: panel(
      Layers,
      "Components vs Sections",
      "COMPOSED",
      ["Single UI pieces", "Full page sections", "Built from our UI", "Pieces auto-installed"],
      "Sections pull in their pieces",
      "Dependencies",
      "registryDependencies",
      "Edit any layer",
    ),
  }),
  topic({
    id: "frameworks",
    category: "Compatibility",
    question: "Does it work with Next.js, Vite and other React setups?",
    answer:
      "Yes. There are installation guides for Next.js and for React with Vite. Components never import from next/*: where one renders links or images, such as the hero and navbar blocks, they come in as linkComponent and imageComponent props that default to a plain <a> and <img>, so the same source compiles in either. " +
      "The Vite guide targets React 18 or 19, and the components are styled with Tailwind CSS v4.",
    height: 350,
    maxWidth: 500,
    visual: panel(
      Monitor,
      "Framework Support",
      "REACT 18 / 19",
      ["Next.js", "React + Vite", "Tailwind CSS v4", "TypeScript source"],
      "No next/* imports in shipped code",
      "Portable",
      "linkComponent • imageComponent",
      "<a> / <img> by default",
    ),
  }),

  // ── Customization ────────────────────────────────────────────────
  // Uses the block's own token-picker visual.
  topic({
    id: "theming",
    category: "Tailwind & Theming",
    question: "Can I change the colors, dark mode and border radius?",
    answer:
      "Yes. Components are styled with theme tokens such as bg-primary and text-foreground rather than fixed colors, and dark mode follows your .dark class. " +
      "Change the CSS variables once, or try the presets on the Themes page, and every component restyles in light and dark.",
    height: 340,
    maxWidth: 530,
  }),
  topic({
    id: "editing",
    category: "Ownership",
    question: "Can I edit the components after installing them?",
    answer:
      `Yes. The code is copied into your repository, so it is yours to edit: change the markup, the styles or the behavior. There is no ${SITE_NAME} npm package to install, so nothing depends on one at runtime.`,
    height: 350,
    maxWidth: 490,
    visual: panel(
      PencilLine,
      "Source In Your Repo",
      "YOURS",
      ["Edit freely", "No runtime package", "No version lock-in", "Plain TS + Tailwind"],
      "components/custom/blocks/*",
      "Copied, not linked",
      "Installed by the shadcn CLI",
      "No wrappers",
    ),
  }),
  topic({
    id: "updates",
    category: "Updates",
    question: "How do I get updates and fixes to a component?",
    answer:
      "Run the same add command again with --overwrite to replace the file with the latest version. That overwrites your edits, so commit first, and use --dry-run to preview the changes before anything is written. " +
      "Components you have not touched can simply be overwritten.",
    height: 350,
    maxWidth: 500,
    visual: panel(
      RefreshCw,
      "Pulling A New Version",
      "MANUAL",
      ["Re-run the add command", "Add --overwrite", "Commit first", "Preview with --dry-run"],
      "You choose when to update",
      "No auto-updates",
      `add ${REGISTRY_NAMESPACE}/<name> -o`,
      "Per component",
    ),
  }),
  topic({
    id: "animation",
    category: "Animation",
    question: "What do the animated components use: CSS, GSAP or Motion?",
    answer:
      "It depends on the component. Fixed-value motion is meant to be plain CSS, and motion driven by the pointer, scroll or dragging uses GSAP; some components use the Motion library instead. " +
      `Each item's JSON (${REGISTRY_BASE_URL}/<name>.json) lists the npm packages it installs, so you can see exactly what you are adding before you run the command.`,
    height: 370,
    maxWidth: 500,
    visual: panel(
      Sparkles,
      "Animation Libraries",
      "PER ITEM",
      ["CSS for fixed motion", "GSAP for pointer + scroll", "Motion in some items", "Listed before install"],
      "Check the item's dependencies",
      "dependencies[]",
      "<name>.json",
      "npm packages listed",
    ),
  }),
  topic({
    id: "motion-or-gsap",
    category: "Animation",
    question: "Should I install the GSAP or the Motion version of a component?",
    answer:
      "Either one. Where a component has both, the default build uses GSAP and the Motion build installs as <name>-motion. They write to the same file, so install one or the other, not both. " +
      "If your app already uses one of the two libraries, picking that build saves you from adding a second.",
    height: 360,
    maxWidth: 500,
    visual: panel(
      ArrowLeftRight,
      "GSAP or Motion",
      "PICK ONE",
      ["Default build: GSAP", "<name>-motion build", "Same install path", "Not both"],
      "They write the same file",
      "One at a time",
      `${REGISTRY_NAMESPACE}/<name>-motion`,
      "Twin of the GSAP build",
    ),
  }),

  // ── Performance & Accessibility ─────────────────────────────────
  topic({
    id: "bundle",
    category: "Performance",
    question: "Will it add to my bundle size?",
    answer:
      `There is no ${SITE_NAME} runtime package, so you only get the source of the items you add plus the npm packages each one lists. ` +
      "That varies a lot: Marquee installs no npm packages, while Data Maps adds Leaflet. Read the item's JSON before installing if you want to know what it will add.",
    height: 360,
    maxWidth: 500,
    visual: panel(
      Package,
      "What You Install",
      "PER ITEM",
      ["Only the items you add", "Their listed npm packages", "No runtime package", "Readable before install"],
      "Cost varies by component",
      "Marquee: 0 packages",
      `${host}/r/<name>.json`,
      "dependencies[]",
    ),
  }),
  topic({
    id: "lazy-loading",
    category: "Performance",
    question: "Do heavy libraries load up front and slow down first paint?",
    answer:
      "The contributing rules say a browser-only library must be loaded after the component mounts, so it is not needed for the first render. Data Maps does this with Leaflet.",
    height: 350,
    maxWidth: 500,
    visual: panel(
      Zap,
      "Loading Rules",
      "CONTRIBUTING",
      ["Browser-only libraries", "Load after mount", "Not needed at first render", "Rule for contributors"],
      "Example: Data Maps + Leaflet",
      "Loaded on mount",
      "CONTRIBUTING.md",
      "Contributor rules",
    ),
  }),
  topic({
    id: "images",
    category: "Performance",
    question: "Can I use next/image or my own image component?",
    answer:
      "Yes, where a component renders images, such as the hero blocks, the table and the carousel. It takes an imageComponent prop that defaults to a plain <img>, so you can pass next/image or your own component to get your framework's image handling. Links work the same way through linkComponent. " +
      "For the video player, give thumbnailUrl a size that matches aspectRatio, because it is the poster and the likely largest-contentful-paint element.",
    height: 370,
    maxWidth: 500,
    visual: panel(
      ImageIcon,
      "Images & Links",
      "PROPS",
      ["imageComponent prop", "linkComponent prop", "Plain <img> default", "Works with next/image"],
      "Video poster is the LCP candidate",
      "thumbnailUrl",
      "No next/* imports",
      "You choose the component",
    ),
  }),
  topic({
    id: "reduced-motion",
    category: "Accessibility",
    question: "Do the animations respect prefers-reduced-motion?",
    answer:
      "That is a rule for every animated component in the contributing guide, and many of them already check the setting. " +
      "If you find one that ignores it, please report it on GitHub so it can be fixed.",
    height: 340,
    maxWidth: 480,
    visual: panel(
      Pause,
      "Reduced Motion",
      "RULE",
      ["Required for animations", "Many already check it", "Reports are welcome", "Rule in the contributing guide"],
      "prefers-reduced-motion",
      "Required",
      "CONTRIBUTING.md",
      "Report on GitHub",
    ),
  }),
  topic({
    id: "accessibility",
    category: "Accessibility",
    question: "Are the components accessible?",
    answer:
      "Where a component is built on Radix UI, such as the accordion, dialog, select and slider, you get Radix's ARIA roles, keyboard navigation and focus management. " +
      "Decorative and animated blocks are custom, so test keyboard and screen reader behavior in your own app before shipping.",
    height: 360,
    maxWidth: 490,
    visual: panel(
      Accessibility,
      "Accessibility",
      "RADIX UI",
      ["Accordion", "Dialog", "Select + Slider", "Custom blocks: test"],
      "Test custom blocks in your app",
      "Your call",
      "Built on Radix primitives",
      "Where interactive",
    ),
  }),

  // ── AI & MCP ─────────────────────────────────────────────────────
  topic({
    id: "ai",
    category: "AI & MCP",
    question: `Can I use ${SITE_NAME} with AI coding assistants?`,
    answer:
      `Yes. ${SITE_NAME} is a standard shadcn registry, so the shadcn MCP server lets Claude Code, Cursor, VS Code, Codex and OpenCode browse, search and install components from a plain-language prompt. ` +
      "The server is free and needs no API key.",
    height: 360,
    maxWidth: 500,
    visual: panel(
      Bot,
      "AI Assistants",
      "MCP",
      ["Claude Code", "Cursor + VS Code", "Codex + OpenCode", "No API key"],
      "Browse, search and install",
      "Free",
      "shadcn MCP server",
      "5 clients supported",
    ),
  }),
  topic({
    id: "mcp-connect",
    category: "AI & MCP",
    question: "How do I connect my AI assistant?",
    answer:
      `Register the registry once, with "npx shadcn@latest ${REGISTRY_ADD_ARGS}". Then, in your project, run "npx shadcn@latest mcp init --client <client>" with claude, cursor, vscode, codex or opencode, and restart or enable the server in that client. ` +
      `After that, ask for things like "Add the hero and navbar from ${REGISTRY_NAMESPACE} to my project".`,
    height: 380,
    maxWidth: 500,
    visual: panel(
      Plug,
      "Connect In 3 Steps",
      "MCP INIT",
      ["1. Register the registry", "2. Run mcp init", "3. Restart the client", "4. Ask in plain words"],
      "mcp init --client <client>",
      "Per project",
      "claude • cursor • vscode",
      "codex • opencode",
    ),
  }),
  topic({
    id: "mcp-not-found",
    category: "AI & MCP",
    question: "My assistant can't find the components. What should I check?",
    answer:
      `Name ${REGISTRY_NAMESPACE} in your prompt; without it the assistant may search only the default shadcn/ui registry. Then check that components.json has the ${REGISTRY_NAMESPACE} entry, and that your machine can reach ${SITE_URL}. ` +
      "If installs fail, make sure components.json exists and you have write access to the project folders.",
    height: 370,
    maxWidth: 500,
    visual: panel(
      SearchX,
      "Troubleshooting",
      "CHECKLIST",
      [`Say ${REGISTRY_NAMESPACE}`, "components.json entry", `Reach ${host}`, "Write access to folders"],
      "Name the registry in the prompt",
      "Most common fix",
      "docs → MCP Server",
      "Troubleshooting",
    ),
  }),
  topic({
    id: "ai-docs",
    category: "AI & MCP",
    question: "Can an AI read your documentation?",
    answer:
      `Yes. ${SITE_URL}/llms.txt lists the docs and what each component installs, and every docs page is also published as Markdown at ${SITE_URL}/docs-md/<framework>-<page>.md. ` +
      "Both are generated from the same sources as the site, so they match what is published.",
    height: 350,
    maxWidth: 500,
    visual: panel(
      FileText,
      "Docs For AI",
      "LLMS.TXT",
      ["/llms.txt index", "Markdown per page", "Install commands listed", "Generated, not typed"],
      "Matches the published site",
      "Always in sync",
      `${host}/llms.txt`,
      "/docs-md/*.md",
    ),
  }),
  topic({
    id: "v0",
    category: "AI & MCP",
    question: "What does Open in v0 do?",
    answer:
      "Every live example has an Open in v0 button. It opens that example in v0 as a registry item, with the example's code and the components it uses. " +
      "It also carries the theme you picked in the docs, meaning the preset or custom colors, radius, accent, light or dark mode and font, so v0 starts from the look you chose.",
    height: 370,
    maxWidth: 500,
    visual: panel(
      Rocket,
      "Open In v0",
      "PER EXAMPLE",
      ["Example code included", "Components bundled", "Your theme carried over", "Light or dark mode"],
      "Starts with your chosen look",
      "Theme + font",
      "v0.app",
      "On every live example",
    ),
  }),
  topic({
    id: "ai-chat",
    category: "AI & MCP",
    question: "Is there a ready-made AI chat interface?",
    answer:
      `Yes, the ai-chat item (${REGISTRY_NAMESPACE}/ai-chat): an assistant interface with a thread history sidebar, a prompt composer, model and effort pickers and attachments. ` +
      "Its responses are mocked, so you connect onSend to your own endpoint and uploadFile to your storage.",
    height: 370,
    maxWidth: 500,
    visual: panel(
      MessageSquare,
      "AI Chat Component",
      "ai-chat",
      ["Thread history", "Prompt composer", "Model + effort pickers", "Attachments"],
      "Responses are mocked",
      "Wire onSend",
      `${REGISTRY_NAMESPACE}/ai-chat`,
      "Bring your own LLM",
    ),
  }),

  // ── License & Support ────────────────────────────────────────────
  topic({
    id: "licensing",
    category: "MIT Licensing",
    question: `Is ${SITE_NAME} free for commercial and client projects?`,
    answer:
      `Yes. ${SITE_NAME} is open source under the MIT license, so you can use and modify it in personal projects, client work and commercial products with no fees. ` +
      "Keep the copyright notice with the code. The AlgorizeTech and Avara UI names and logos are trademarks and are not covered by the license.",
    height: 390,
    maxWidth: 480,
    visual: panel(
      ShieldCheck,
      "MIT Open-Source License",
      "FREE",
      ["Commercial products", "Client projects", "No royalties", "Private repos"],
      "Keep the copyright notice",
      "Required",
      "License: MIT (SPDX: MIT)",
      "Brand names excluded",
    ),
  }),
  topic({
    id: "no-account",
    category: "MIT Licensing",
    question: "Do I need an account, license key or API key?",
    answer:
      `No. Every item is a public file at ${REGISTRY_BASE_URL}/<name>.json that the shadcn CLI fetches, and the shadcn MCP server is free and needs no API key.`,
    height: 340,
    maxWidth: 480,
    visual: panel(
      KeyRound,
      "No Keys Needed",
      "OPEN",
      ["No account", "No license key", "No MCP API key", "Public item files"],
      "Just run the CLI",
      "Open registry",
      `${host}/r/*`,
      "MIT licensed",
    ),
  }),
  topic({
    id: "support",
    category: "Support",
    question: "How do I report a bug or ask for a new component?",
    answer:
      "Open an issue on GitHub with the component name and what you expected to happen, and include a snippet if you can. " +
      "Contributions are welcome too: the repository's CONTRIBUTING guide covers the rules for adding a component.",
    height: 340,
    maxWidth: 480,
    visual: panel(
      LifeBuoy,
      "Help & Contributing",
      "GITHUB",
      ["Report a bug", "Request a component", "Open a pull request", "Read the guide"],
      "Issues are open to everyone",
      "MIT",
      links.issues.replace(/^https?:\/\//, ""),
      "CONTRIBUTING.md",
    ),
  }),
];

/**
 * The tabs above the FAQ. A handful of questions per tab keeps the canvas beside
 * the answers from standing empty under a short list.
 */
const FAQ_GROUPS: { id: string; label: string; ids: string[] }[] = [
  {
    id: "start",
    label: "Getting Started",
    ids: ["installation", "install-by-url", "included", "sections", "frameworks"],
  },
  {
    id: "customize",
    label: "Customization",
    ids: ["theming", "editing", "updates", "animation", "motion-or-gsap"],
  },
  {
    id: "performance",
    label: "Performance & Accessibility",
    ids: ["bundle", "lazy-loading", "images", "reduced-motion", "accessibility"],
  },
  {
    id: "ai",
    label: "AI & MCP",
    ids: ["ai", "mcp-connect", "mcp-not-found", "ai-docs", "v0", "ai-chat"],
  },
  {
    id: "license",
    label: "License & Support",
    ids: ["licensing", "no-account", "support"],
  },
];

export const HOME_FAQ_GROUPS = FAQ_GROUPS.map(({ id, label, ids }) => ({
  id,
  label,
  items: ids.map((itemId) => {
    const item = HOME_FAQ_ITEMS.find((candidate) => candidate.id === itemId);
    if (!item) throw new Error(`HOME_FAQ_GROUPS: no FAQ item "${itemId}"`);
    return item;
  }),
}));
