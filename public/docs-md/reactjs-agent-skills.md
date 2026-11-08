---
title: "Agent Skill"
description: "Install a free agent skill so Claude Code, Cursor, Codex or Copilot plans, finds, installs and checks Avara UI components without inventing props."
url: https://avaraui.com/docs/nextjs/agent-skills
---

# Agent Skill

Teach your AI coding agent how to build with Avara UI. The skill is a few
Markdown files: a workflow the agent follows (plan, find, install, read, adapt,
check) and the rules that stop it inventing props or hard-coding colours. It is
free, needs no account, and works with or without the [MCP server](https://avaraui.com/docs/reactjs/mcp).

## What the agent gets

- **A workflow.** Plan the page, find the right pieces, install them with the CLI, read each one's Markdown for its real props, adapt the sample data, then run a final check.
- **A searchable index.** `https://avaraui.com/agent/components.json` lists every component and website section with its summary, install command and Markdown URL, so an agent can pick by what a page does without a search server.
- **Rules.** Theme tokens instead of hard-coded colours, one animation library per component, no `next/*` imports, and respect for `prefers-reduced-motion`.

## Install the skill

Run once from your project root. Pick the agent you use.

**Client: claude**

Claude Code reads skills from `.claude/skills/`:

```bash
mkdir -p .claude/skills/avara-ui
curl -fsSL https://avaraui.com/skills/avara-ui/SKILL.md -o .claude/skills/avara-ui/SKILL.md
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
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, find, install, read, adapt, check.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Client: codex**

Codex reads `AGENTS.md` in the project root. Add this block to it:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Register once: `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`. Install with `npx shadcn@latest add @avara-ui/<name> --yes`.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, find, install, read, adapt, check.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Client: opencode**

OpenCode reads `AGENTS.md` in the project root. Add this block to it:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Register once: `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`. Install with `npx shadcn@latest add @avara-ui/<name> --yes`.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, find, install, read, adapt, check.
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
2. **Find.** It searches the index or `https://avaraui.com/llms.txt` and picks by summary. If nothing fits, it composes the screen from smaller components.
3. **Install.** It runs `npx shadcn@latest add @avara-ui/name --yes`.
4. **Read.** It fetches the item's Markdown for the props and import path.
5. **Adapt.** It swaps in your data and keeps the component's structure and styling.
6. **Check.** It runs the checklist: tokens only, keyboard access, dark mode, reduced motion, and a passing build.

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
