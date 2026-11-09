---
title: "Agent Skill"
description: "Install a free agent skill so Claude Code, Cursor, Codex or Copilot plans, finds, installs and checks Avara UI components without inventing props."
url: https://avaraui.com/docs/nextjs/agent-skills
---

# Agent Skill

Teach your AI coding agent how to build with Avara UI. The skill is a few
Markdown files: a workflow the agent follows (plan, decide, install, read, adapt,
check) and the rules that stop it inventing props or hard-coding colours. It is
free, needs no account, and works with or without the [MCP server](https://avaraui.com/docs/reactjs/mcp).

## What the agent gets

- **A workflow.** Plan the page, decide which pieces to use, install them with the CLI, read each one's Markdown for its real props, adapt the sample data, then run a final check.
- **A question before it picks.** Where a section comes in several designs (today the hero, with more to come), the agent shows you every design with a live link and waits for your answer. Name one, or tell it to pick the best for you and it will choose and say why.
- **A searchable index.** `https://avaraui.com/agent/components.json` lists every component and website section with its summary, install command and Markdown URL, so an agent can pick by what a page does without a search server.
- **Rules.** Theme tokens instead of hard-coded colours, one animation library per component, no `next/*` imports, and respect for `prefers-reduced-motion`.

## Install the skill

Run once from your project root. Pick the agent you use.

**Client: claude**

Claude Code reads skills from `.claude/skills/`:

```bash
mkdir -p .claude/skills/avara-ui
curl -fsSL https://avaraui.com/skills/avara-ui/SKILL.md -o .claude/skills/avara-ui/SKILL.md
curl -fsSL https://avaraui.com/skills/avara-ui/variants.md -o .claude/skills/avara-ui/variants.md
curl -fsSL https://avaraui.com/skills/avara-ui/components.md -o .claude/skills/avara-ui/components.md
curl -fsSL https://avaraui.com/skills/avara-ui/animation.md -o .claude/skills/avara-ui/animation.md
curl -fsSL https://avaraui.com/skills/avara-ui/theming.md -o .claude/skills/avara-ui/theming.md
curl -fsSL https://avaraui.com/skills/avara-ui/checklist.md -o .claude/skills/avara-ui/checklist.md
```

The agent loads `SKILL.md` when a task matches its description, and opens the other files only when it needs them.

**Client: cursor**

Cursor reads rules from `.cursor/rules/`:

```bash
mkdir -p .cursor/rules
curl -fsSL https://avaraui.com/skills/avara-ui/avara-ui.mdc -o .cursor/rules/avara-ui.mdc
```

**Client: vscode**

GitHub Copilot in VS Code reads `.github/copilot-instructions.md`. Add this block to it:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Register once: `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`. Install with `npx shadcn@latest add @avara-ui/<name> --yes`.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Client: codex**

Codex reads `AGENTS.md` in the project root. Add this block to it:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Register once: `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`. Install with `npx shadcn@latest add @avara-ui/<name> --yes`.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Client: opencode**

OpenCode reads `AGENTS.md` in the project root. Add this block to it:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Register once: `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`. Install with `npx shadcn@latest add @avara-ui/<name> --yes`.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

The files are plain text, so read them before you add them to a repository. They
are generated from this site's own registry, so they only name components that
exist.

## Use it

Register the registry once, then describe the interface in plain language and
name @avara-ui so the agent looks in the right place:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
```

- "Using @avara-ui, build a pricing page with a hero, the plans and an FAQ."
- "Add a @avara-ui data table of orders with sorting and pagination, wired to `/api/orders`."
- "Use @avara-ui to add a command palette and a dock to this app shell."
- "Replace this footer with the @avara-ui footer, keeping our links."

## How the workflow runs

1. **Plan.** The agent writes the page's sections and states (empty, loading, error) before any code.
2. **Decide.** It searches the index or `https://avaraui.com/llms.txt` and matches by summary. If nothing fits, it composes the screen from smaller components. For each section that comes in several designs, it asks you which one first, with a live link for every option, unless you already named one.
3. **Install.** It runs `npx shadcn@latest add @avara-ui/name --yes`.
4. **Read.** It fetches the item's Markdown for the props and import path.
5. **Adapt.** It swaps in your data and keeps the component's structure and styling.
6. **Check.** It runs the checklist: tokens only, keyboard access, dark mode, reduced motion, and a passing build.

## Does the agent ask before it picks a design?

Yes, when a section has several designs. It lists each one with what it suits and a link to see it live, and installs nothing until you answer. Reply with a design's name, or "pick the best one for me": then it chooses from each design's best-for and avoid-if notes against your brief, tells you which and why, and gives the link so you can swap. A section with one design is installed without a question. The rule lives in `variants.md`, one of the skill's files.

## Do I need the skill if I use the MCP server?

No, but they work well together. The [MCP server](https://avaraui.com/docs/reactjs/mcp) lets
an agent browse and install from the registry. The skill tells it how to choose,
what to read before writing code, and what to check afterwards.

## Which agents can use it?

Claude Code and Cursor read the files directly. Any agent that reads `AGENTS.md`
(Codex, OpenCode, Copilot and others) gets the short block instead, which links
to the full workflow. An agent that can fetch URLs can also read the skill straight from this site: the
block above links to it.

## Is the skill free?

Yes. It is part of the MIT-licensed Avara UI project, with no account, license
key or API key. The components it points to are free as well.

## Next steps

- [MCP server](https://avaraui.com/docs/reactjs/mcp) — connect an agent to the registry
- [Installation](https://avaraui.com/docs/reactjs/installation) — set up a project for Avara UI
- [All components](https://avaraui.com/docs/reactjs/all-components) — browse the library

---

Live previews and every example: https://avaraui.com/docs/nextjs/agent-skills
