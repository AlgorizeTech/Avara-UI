/**
 * The agent skill: a few Markdown files that teach a coding agent how to build
 * with this library. Served from /skills/<name>/ and installed by copying them
 * into the project (see the Agent Skill docs page).
 *
 * Generated rather than stored, for the reason /llms.txt is: names, counts,
 * install commands and category lists come from the site's own config and the
 * sidebar, so the skill cannot tell an agent to install something that is not
 * there. The prose is the workflow, which is the part that does not change.
 *
 * Node-only: reads from disk. Call it from server code at build time.
 */

import { SITE_NAME, SITE_URL } from "@/config/site";
import { agentEntries, SKILL_NAME } from "@/lib/agent-index";
import { COMPONENT_COUNT } from "@/lib/docs-source";
import { REGISTRY_ADD_ARGS, REGISTRY_BASE_URL, REGISTRY_NAMESPACE } from "@/lib/registry";

const BASE = `${SITE_URL}/skills/${SKILL_NAME}`;
const ns = REGISTRY_NAMESPACE;

const front = (name: string, description: string) =>
  ["---", `name: ${name}`, `description: ${description}`, "---", ""].join("\n");

const DESCRIPTION =
  `Build React interfaces with ${SITE_NAME}, a free shadcn registry of animated components and website sections. ` +
  `Use when the user asks for a UI, page, section or component in a project that uses shadcn/ui and Tailwind CSS, ` +
  `or names ${SITE_NAME} or ${ns}.`;

const core = () =>
  `${front(SKILL_NAME, DESCRIPTION)}
# ${SITE_NAME}

${SITE_NAME} is a free, MIT-licensed library of ${COMPONENT_COUNT} animated React components and website sections, published as a shadcn registry. The shadcn CLI copies each component's source into the project, so the files are the user's to edit. There is no npm package, no account and no key.

## Workflow

Follow these in order. Do not skip the reading step: this is what keeps you from inventing props.

1. **Plan.** Before any UI code, write a short plan: the page's sections, the density, and the empty, loading and error states. Say which library pieces cover which section.
2. **Find.** Search the agent index (\`${SITE_URL}/agent/components.json\`) or \`${SITE_URL}/llms.txt\` for the pieces. Each entry has a summary, the install command and a Markdown URL. Pick by what the summary says, not by the name. If nothing fits, compose the screen from smaller components and say so; do not force the nearest match.
3. **Register once.** If \`components.json\` has no \`${ns}\` entry, run \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\`.
4. **Install.** Run \`npx shadcn@latest add ${ns}/<name> --yes\`. Add several items in one command. The CLI installs npm dependencies and any registry items the item needs.
5. **Read.** Fetch the item's Markdown (\`markdownUrl\` in the index). It lists the props, usage and the exact import path. Write code against that, not against memory.
6. **Adapt.** Replace the sample data with the user's. Keep the component's structure and styling: change content, props and theme tokens, not the layout the component was built around.
7. **Check.** Run \`checklist.md\` before telling the user you are done.

## Rules

- Install, then import from the path the Markdown gives. Most items land in \`components/custom/blocks/\`.
- Style with theme tokens (\`bg-primary\`, \`text-foreground\`, \`border-border\`), never hard-coded colours, so the user's theme restyles everything. See \`theming.md\`.
- Each animated component ships a GSAP build; some also ship a Motion build installed as \`<name>-motion\`. Install one, never both, and never add the other animation library by hand. See \`animation.md\`.
- Components import nothing from \`next/*\`. Pass \`linkComponent\` / \`imageComponent\` props when the project wants \`next/link\` or \`next/image\`.
- If an item needs a prop the Markdown does not list, it does not exist. Read the source file the CLI wrote instead of guessing.
- Honour \`prefers-reduced-motion\`. The components do; do not add animation that ignores it.

## More

- \`components.md\`: the categories, to choose between pieces.
- \`animation.md\`: GSAP or Motion, and how motion is switched off.
- \`theming.md\`: tokens and how to restyle.
- \`checklist.md\`: the final check.

Registry: \`${REGISTRY_BASE_URL}/<name>.json\`. Docs: ${SITE_URL}/docs/nextjs.
`;

const components = () => {
  const groups = new Map<string, { kind: string; label: string; rows: string[] }>();
  for (const entry of agentEntries()) {
    const group = groups.get(entry.category) ?? { kind: entry.kind, label: entry.categoryLabel, rows: [] };
    group.rows.push(`\`${entry.slug}\``);
    groups.set(entry.category, group);
  }
  const lines = [...groups.values()].map(
    (group) => `- **${group.label}** (${group.kind === "section" ? "website sections" : "components"}): ${group.rows.join(", ")}`,
  );
  return `${front(`${SKILL_NAME}-components`, `The ${SITE_NAME} categories and which pages are in them.`)}
# Choosing components

${SITE_NAME} has two kinds of page. A **component** is one piece of UI (a dialog, a data table, a dock). A **website section** is a whole block of a page (a hero, pricing, a footer) composed from the library's own components, so installing one pulls its pieces in as dependencies.

For a page, start with sections, then reach for components to fill gaps. For a control inside an app, use components.

Each name below is a docs page slug. Its summary, install command and Markdown are in the agent index: \`${SITE_URL}/agent/components.json\`.

${lines.join("\n")}
`;
};

const animation = () =>
  `${front(`${SKILL_NAME}-animation`, "Which animation library a component uses and how to choose.")}
# Animation

- The default build of an animated component uses **CSS** for fixed-value motion and **GSAP** where pointer, scroll, drag or layout drives the motion. Install it as \`${ns}/<name>\`.
- Where a Motion (\`motion/react\`) build exists it installs as \`${ns}/<name>-motion\` and writes the same file. The index lists these as \`motionItems\`. Choose one by what the project already uses: if it has \`motion\` and no \`gsap\`, take the Motion build.
- Never install both builds of one component, and never mix the two libraries inside one item.
- Everything honours \`prefers-reduced-motion\`.
- Do not wrap a component in your own entrance animation. Most already have one, and a second one delays the content for no gain.
`;

const theming = () =>
  `${front(`${SKILL_NAME}-theming`, "How to restyle components with theme tokens.")}
# Theming

Components are styled with CSS-variable theme tokens, so a theme change restyles all of them at once.

- Use \`bg-background\`, \`bg-card\`, \`bg-primary\`, \`text-foreground\`, \`text-muted-foreground\`, \`border-border\` and the other shadcn tokens. Do not write hex or Tailwind palette colours (\`bg-blue-500\`) into component code.
- To change the look, change the variables in the project's global CSS (\`:root\` and \`.dark\`). The theme customizer at ${SITE_URL}/themes generates them.
- Components work in light and dark mode. Check both after changing a token.
- Spacing and type sizes follow Tailwind's scale. Do not introduce arbitrary pixel values where a scale step exists.
`;

const checklist = () =>
  `${front(`${SKILL_NAME}-checklist`, "The check to run before finishing a UI task.")}
# Final check

Go through each line. Fix what fails, then report what you changed.

1. Every ${SITE_NAME} item the page uses was installed with the CLI and imports from the path its Markdown gives.
2. No prop, import path or component name was written from memory. Each appears in the item's Markdown or in the file the CLI wrote.
3. Colours are theme tokens. No hard-coded colours were added.
4. The page works at phone width (no horizontal scroll) and in dark mode.
5. Empty, loading and error states exist where the data can be empty, slow or wrong.
6. Interactive elements are reachable by keyboard and have visible focus and accessible names.
7. One animation library per component, and \`prefers-reduced-motion\` still turns the motion off.
8. The project builds: run its type check and build command.
`;

/** The Cursor rule form: the same workflow, always applied. */
const cursorRule = () =>
  `---
description: Build UI with ${SITE_NAME} components from the ${ns} shadcn registry
alwaysApply: false
---

${core().replace(/^---[\s\S]*?---\n/, "")}`;

export const SKILL_FILES: Record<string, () => string> = {
  "SKILL.md": core,
  "components.md": components,
  "animation.md": animation,
  "theming.md": theming,
  "checklist.md": checklist,
  [`${SKILL_NAME}.mdc`]: cursorRule,
};

/** The short block for AGENTS.md / GEMINI.md, for agents that read no skill folder. */
export const agentsBlock = () =>
  `## ${SITE_NAME}

This project uses ${SITE_NAME} (\`${ns}\`), a free shadcn registry of animated React components and website sections.

- Register once: \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\`. Install with \`npx shadcn@latest add ${ns}/<name> --yes\`.
- Find components in ${SITE_URL}/agent/components.json (or ${SITE_URL}/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in ${BASE}/SKILL.md: plan, find, install, read, adapt, check.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.`;

/** Where each client reads the skill from, and the text that puts it there. */
export type SkillClient = "claude" | "cursor" | "agents";

const topicFiles = () => Object.keys(SKILL_FILES).filter((file) => file.endsWith(".md"));
const fileUrl = (file: string) => `${BASE}/${file}`;

export function skillInstallCommand(client: SkillClient): { lang: string; code: string } {
  if (client === "claude") {
    const dir = `.claude/skills/${SKILL_NAME}`;
    return {
      lang: "bash",
      code: [`mkdir -p ${dir}`, ...topicFiles().map((file) => `curl -fsSL ${fileUrl(file)} -o ${dir}/${file}`)].join("\n"),
    };
  }
  if (client === "cursor") {
    const file = `${SKILL_NAME}.mdc`;
    return {
      lang: "bash",
      code: `mkdir -p .cursor/rules\ncurl -fsSL ${fileUrl(file)} -o .cursor/rules/${file}`,
    };
  }
  return { lang: "markdown", code: agentsBlock() };
}
