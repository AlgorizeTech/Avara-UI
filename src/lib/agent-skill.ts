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
import { pageVariants } from "@/agent/variants";
import { viewUrl } from "@/agent/variants/render";
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
2. **Decide.** Search the agent index (\`${SITE_URL}/agent/components.json\`) or \`${SITE_URL}/llms.txt\` for the pieces. Each entry has a summary, the install command and a Markdown URL. Match by what the summary says, not by the name. If nothing fits, compose the screen from smaller components and say so; do not force the nearest match. **Then, for every entry with \`choose: true\`, stop and ask the user which variant they want before you install or write anything** (for example the hero: a section that comes in several designs). Show each option with its live link, and offer "pick the best for me". If your client has a click-to-pick question tool (Claude Code's \`AskUserQuestion\`), use it so the user answers by clicking; \`variants.md\` says how to fit more than 4 options into it. If the user already named a variant, use it without asking. An entry without \`choose\` has one option: install it. The exact question, and how to choose for the user when they ask you to, are in \`variants.md\`. Never pick a variant on your own taste.
3. **Registry.** \`${ns}\` is listed in shadcn's registry directory, so \`add ${ns}/<name>\` works with no setup. Only if the CLI answers "Unknown registry" (an older shadcn CLI), run \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\` once, then retry.
4. **Install.** Run \`npx shadcn@latest add ${ns}/<name> --yes\`. Add several items in one command. The CLI installs npm dependencies and any registry items the item needs. For a \`choose\` entry, use the chosen variant's own \`install\` command, never every item the page lists.
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
- Commands here use \`npx\`. If the project uses another package manager (a \`pnpm-lock.yaml\`, \`yarn.lock\` or \`bun.lock\`), run the same command with its runner: \`pnpm dlx\`, \`yarn dlx\` or \`bunx\`.

## More

- \`variants.md\`: asking the user which design they want, and choosing for them when they ask you to.
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

const variants = () => {
  const sample = pageVariants[0];
  const pages = pageVariants.map(
    (page) => `- \`${page.slug}\`: ${page.variants.length} variants. All live: ${viewUrl(page.slug)}`,
  );
  const listed = sample
    ? sample.variants
        .slice(0, 3)
        .map(
          (variant, index) =>
            `${index + 1}. ${variant.label}: ${variant.summary} Best for: ${variant.bestFor[0]}. Live: ${viewUrl(sample.slug, variant.id)}`,
        )
        .join("\n")
    : "";

  return `${front(`${SKILL_NAME}-variants`, "How to ask the user which design of a section they want, and how to choose for them.")}
# Choosing a variant

Some pages offer several designs of the same section: a honeycomb hero or a carousel hero. A variant is a different layout, not a restyle. Size, colour and loading states are props on one design and are not variants.

The user decides which design their site gets, because it is their brand. You do not. An index entry with \`choose: true\` offers variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code.

## When to ask

| Situation | What to do |
| --- | --- |
| The entry has \`choose: true\` and the user has not named a variant | **Ask.** List every variant with its live link. Do not install or write code first. |
| The user named one ("the honeycomb hero") | Use it. No question. |
| The request already narrows the choice ("a login page" on a page that has login and register designs) | Offer only the designs that match. If that leaves one, use it. |
| The user said "pick the best", "your choice", "whatever fits" | Choose by the procedure below, say which and why, and give its live link so they can swap. |
| The entry has no \`choose\` | One option. Install it. No question. |
| You do not know enough to choose (no purpose, no content, no brand) | Ask the brief questions first, then the variant question. |
| The user asked for a whole page (hero, pricing, footer) | Ask once per section that has variants, all in one message. |
| The client has no question tool | Print a numbered list, end the message and wait for the answer. |

## How to ask

Every option carries its live link. An option without a link is not allowed.

**If your client has a click-to-pick question tool, use it, and make the user answer by clicking, never by typing a name or a number.** Claude Code has \`AskUserQuestion\`; other clients have an options dialog or a question tool. Send one short message first with the page's \`galleryUrl\`, so every option can be opened live. These tools hold 2 to 4 options per question, so:

- **3 variants or fewer:** one question. One option per variant (label: the variant's label; description: its \`summary\`, the first \`bestFor\` line and its \`viewUrl\`), plus a last option "Pick the best one for me".
- **4 variants or more** (each variant has a \`group\`; at most 4 groups, at most 4 variants in each): ask in two rounds.
  1. **Round one, one call with two questions.** Question 1, "How should I choose the <section>?", with the options "I'll pick one" and "Pick the best one for me". Question 2, "Which group of <section>s do you want to see?", with one option per group (label: the group; description: the labels of its variants). Tell the user to ignore question 2 if they pick "Pick the best one for me".
  2. **Round two, only if they chose "I'll pick one".** One question with one option per variant in the chosen group, each described as above, with its \`viewUrl\`.
- **Several sections with variants on one page** (a hero and a footer): put each section's round-one questions in the same call, up to the tool's limit of 4 questions. Past that, do the sections one after another.
- The tool's own "Other" box is a fallback, not the plan. Do not ask the user to type.

**If your client has no such tool,** print a numbered list in the message and wait for the answer. Give each variant its label, its \`summary\`, who it suits (\`bestFor\`) and its \`viewUrl\`. Add a last option: "Pick the best one for me". For example:

\`\`\`text
Which hero do you want? All of them live: ${sample ? viewUrl(sample.slug) : `${SITE_URL}/view/<page>`}

${listed}
... (every variant, not a sample)

Or tell me to pick the best one for you.
\`\`\`

Then stop, whether you used the picker or the list. Install nothing until the user answers.

## Choosing for the user

Only when the user asked you to choose, or picked "Pick the best one for me".

1. Know the brief: what the site is for, the tone, and what content and images the user has. If you do not know, ask short brief questions first.
2. Drop every variant whose \`avoidIf\` matches the brief (for example, "you have no photographs").
3. Score the rest on \`bestFor\` and \`traits\` against the brief. Prefer the one that needs the least content the user does not have.
4. Say which you chose and why in one or two sentences, name the runner-up, and give the \`viewUrl\` so the user can swap.

## After the answer

Install the chosen variant's own \`install\` command from the index. Several looks of one component can share one install item (the \`hero\` item holds eight looks): install it once, then set the variant's \`props\` from the index on the component (the footer is \`variant="glass-dock"\` and so on; its default is not the look the user may have chosen) and read the page's Markdown for the rest. Do not install every item a page lists.

## Pages with variants today

${pages.length ? pages.join("\n") : "None yet."}

An index entry with \`choose: true\` is the authority: it lists every variant and its live link.
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
  "variants.md": variants,
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

- Install with \`npx shadcn@latest add ${ns}/<name> --yes\`. \`${ns}\` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run \`npx shadcn@latest ${REGISTRY_ADD_ARGS}\` once.
- Find components in ${SITE_URL}/agent/components.json (or ${SITE_URL}/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in ${BASE}/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with \`choose: true\` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from \`bestFor\` / \`avoidIf\` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See ${BASE}/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.`;

/** Where each client reads the skill from, and the text that puts it there. */
export type SkillClient = "claude" | "cursor" | "agents";

const topicFiles = () => Object.keys(SKILL_FILES).filter((file) => file.endsWith(".md"));
const fileUrl = (file: string) => `${BASE}/${file}`;

/**
 * The registry items that install the skill with `shadcn add`, one per agent
 * (they write to different folders, so one item would drop both). Published by
 * src/scripts/generate-skill-items.ts.
 */
export const SKILL_ITEM = { claude: "agent-skill", cursor: "agent-skill-cursor" } as const;

/** The folder and files a client's install writes. `agents` has none: it is a block to paste. */
export function skillTarget(client: "claude" | "cursor"): { dir: string; files: string[] } {
  return client === "claude"
    ? { dir: `.claude/skills/${SKILL_NAME}`, files: topicFiles() }
    : { dir: ".cursor/rules", files: [`${SKILL_NAME}.mdc`] };
}

/** The same files as links, for installing by hand. */
export function skillFileLinks(client: "claude" | "cursor"): { file: string; url: string; saveAs: string }[] {
  const { dir, files } = skillTarget(client);
  return files.map((file) => ({ file, url: fileUrl(file), saveAs: `${dir}/${file}` }));
}

/**
 * A prompt that has the user's own agent do the install: the easiest way, since
 * it needs no shell syntax and works on every system. Claude Code and Cursor get
 * the files to download; the others get the block to add to their instructions
 * file (`file`).
 */
export function skillInstallPrompt(client: SkillClient, file = "AGENTS.md"): string {
  if (client === "agents") {
    return [
      `Add the ${SITE_NAME} instructions below to ${file} in this project.`,
      `Create the file if it does not exist, and keep everything already in it. Then tell me what you changed.`,
      "",
      agentsBlock(),
    ].join("\n");
  }
  const { dir, files } = skillTarget(client);
  return [
    `Install the ${SITE_NAME} agent skill in this project.`,
    "",
    `1. Create the folder ${dir}/ if it does not exist.`,
    `2. Download ${files.length > 1 ? "these files" : "this file"} into it, keeping the file names:`,
    ...files.map((name) => `   - ${fileUrl(name)}`),
    "3. List the folder and tell me which files you saved.",
  ].join("\n");
}

/**
 * The manual install: one line that runs the same in macOS, Linux, Windows
 * PowerShell, Command Prompt and Git Bash, because Node.js (18 or newer) is the
 * one tool every project here already has. Single quotes inside and double
 * quotes outside keep it valid in all of those shells. `agents` is a block to
 * paste, so it has no command.
 */
export function skillInstallCommand(client: SkillClient): { lang: string; code: string } {
  if (client === "agents") return { lang: "markdown", code: agentsBlock() };

  const { dir, files } = skillTarget(client);
  const list = files.map((file) => `'${file}'`).join(",");
  const script = [
    `const fs=require('fs'),d='${dir}'`,
    `fs.mkdirSync(d,{recursive:true})`,
    `for(const f of [${list}])fetch('${BASE}/'+f).then(r=>{if(!r.ok)throw new Error(f+' '+r.status);return r.text()}).then(t=>fs.writeFileSync(d+'/'+f,t)).catch(e=>{console.error(e.message);process.exitCode=1})`,
  ].join(";");
  return { lang: "bash", code: `node -e "${script}"` };
}
