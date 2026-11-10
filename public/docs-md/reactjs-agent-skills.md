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
- **A question before it picks.** Where a section or component comes in several designs (the hero, the footer, tabs, tables and many more), the agent shows you every design with a live link and waits for your answer. Name one, or tell it to pick the best for you and it will choose and say why.
- **A searchable index.** `https://avaraui.com/agent/components.json` lists every component and website section with its summary, install command and Markdown URL, so an agent can pick by what a page does without a search server.
- **Rules.** Theme tokens instead of hard-coded colours, one animation library per component, no `next/*` imports, and respect for `prefers-reduced-motion`.

## Requirements

- A project that uses shadcn/ui and Tailwind CSS. See [Installation](https://avaraui.com/docs/reactjs/installation) if it does not yet.
- One of the agents below: Claude Code, Cursor, GitHub Copilot in VS Code, Codex or OpenCode.

The skill is not an npm package, so there is nothing to `npm install`. It is a set
of text files added to your project, and it works the same whether the project
uses npm, pnpm, yarn or bun, on macOS, Linux or Windows. Your package manager
only matters later, when the agent installs components, and the skill tells it to
use yours.

## Install the skill

Choose your agent. Each tab has two ways to install: **Ask your agent** is the
easiest, because you paste one prompt and the agent does the rest on any system.
**Manual** is one command (or one block to paste) if you prefer to do it yourself.

**Client: claude**

Claude Code reads skills from `.claude/skills/`. It loads `SKILL.md` when a task matches its description, and opens the other files only when it needs them.

**Ask your agent**

```text
Install the Avara UI agent skill in this project.

1. Create the folder .claude/skills/avara-ui/ if it does not exist.
2. Download these files into it, keeping the file names:
   - https://avaraui.com/skills/avara-ui/SKILL.md
   - https://avaraui.com/skills/avara-ui/variants.md
   - https://avaraui.com/skills/avara-ui/components.md
   - https://avaraui.com/skills/avara-ui/animation.md
   - https://avaraui.com/skills/avara-ui/theming.md
   - https://avaraui.com/skills/avara-ui/checklist.md
3. List the folder and tell me which files you saved.
```

**Manual**

Run this one line from your project root. It works the same in macOS and Linux terminals, Windows PowerShell, Command Prompt and Git Bash, and needs Node.js 18 or newer. It writes `.claude/skills/avara-ui/` (6 files).

```bash
node -e "const fs=require('fs'),d='.claude/skills/avara-ui';fs.mkdirSync(d,{recursive:true});for(const f of ['SKILL.md','variants.md','components.md','animation.md','theming.md','checklist.md'])fetch('https://avaraui.com/skills/avara-ui/'+f).then(r=>{if(!r.ok)throw new Error(f+' '+r.status);return r.text()}).then(t=>fs.writeFileSync(d+'/'+f,t)).catch(e=>{console.error(e.message);process.exitCode=1})"
```

Command blocked or no Node.js? Save each file yourself, creating the folders if they are missing:

- [SKILL.md](https://avaraui.com/skills/avara-ui/SKILL.md) — save as `.claude/skills/avara-ui/SKILL.md`
- [variants.md](https://avaraui.com/skills/avara-ui/variants.md) — save as `.claude/skills/avara-ui/variants.md`
- [components.md](https://avaraui.com/skills/avara-ui/components.md) — save as `.claude/skills/avara-ui/components.md`
- [animation.md](https://avaraui.com/skills/avara-ui/animation.md) — save as `.claude/skills/avara-ui/animation.md`
- [theming.md](https://avaraui.com/skills/avara-ui/theming.md) — save as `.claude/skills/avara-ui/theming.md`
- [checklist.md](https://avaraui.com/skills/avara-ui/checklist.md) — save as `.claude/skills/avara-ui/checklist.md`

 **Check that it worked.** Look in `.claude/skills/` for the skill folder. Then start a new Claude Code session in the project, because skills are read when a session starts. Ask "Using @avara-ui, add a pricing section": the agent should plan the page and check the component index before writing any markup.

 **Update or remove.** To update, install again: the files are overwritten with the current version. To remove, delete the skill folder.

**Client: cursor**

Cursor reads rules from `.cursor/rules/`. One file holds the whole workflow.

**Ask your agent**

```text
Install the Avara UI agent skill in this project.

1. Create the folder .cursor/rules/ if it does not exist.
2. Download this file into it, keeping the file names:
   - https://avaraui.com/skills/avara-ui/avara-ui.mdc
3. List the folder and tell me which files you saved.
```

**Manual**

Run this one line from your project root. It works the same in macOS and Linux terminals, Windows PowerShell, Command Prompt and Git Bash, and needs Node.js 18 or newer. It writes `.cursor/rules/avara-ui.mdc`.

```bash
node -e "const fs=require('fs'),d='.cursor/rules';fs.mkdirSync(d,{recursive:true});for(const f of ['avara-ui.mdc'])fetch('https://avaraui.com/skills/avara-ui/'+f).then(r=>{if(!r.ok)throw new Error(f+' '+r.status);return r.text()}).then(t=>fs.writeFileSync(d+'/'+f,t)).catch(e=>{console.error(e.message);process.exitCode=1})"
```

Command blocked or no Node.js? Save the file yourself, creating the folders if they are missing:

- [avara-ui.mdc](https://avaraui.com/skills/avara-ui/avara-ui.mdc) — save as `.cursor/rules/avara-ui.mdc`

 **Check that it worked.** Look in `.cursor/rules/` for the `.mdc` file, or find it under Rules in Cursor Settings. Then start a new chat in the project, because rules are read when a chat starts. Ask "Using @avara-ui, add a pricing section": the agent should plan the page and check the component index before writing any markup.

 **Update or remove.** To update, install again: the file is overwritten with the current version. To remove, delete the file.

**Client: vscode**

GitHub Copilot in VS Code reads `.github/copilot-instructions.md`.

**Ask your agent**

```text
Add the Avara UI instructions below to .github/copilot-instructions.md in this project.
Create the file if it does not exist, and keep everything already in it. Then tell me what you changed.

## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Manual**

Create `.github/copilot-instructions.md` if it does not exist, then paste this block at the end:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

 **Check that it worked.** Start a new Copilot chat in the project and ask "Using @avara-ui, add a pricing section". The agent should open the component index before writing any markup.

 **Update or remove.** To update, replace the block with the current one from this page. To remove, delete the block from the file.

**Client: codex**

Codex reads `AGENTS.md` in the project root.

**Ask your agent**

```text
Add the Avara UI instructions below to AGENTS.md in this project.
Create the file if it does not exist, and keep everything already in it. Then tell me what you changed.

## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Manual**

Create `AGENTS.md` if it does not exist, then paste this block at the end:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

 **Check that it worked.** Start a new Codex session in the project and ask "Using @avara-ui, add a pricing section". The agent should open the component index before writing any markup.

 **Update or remove.** To update, replace the block with the current one from this page. To remove, delete the block from the file.

**Client: opencode**

OpenCode reads `AGENTS.md` in the project root.

**Ask your agent**

```text
Add the Avara UI instructions below to AGENTS.md in this project.
Create the file if it does not exist, and keep everything already in it. Then tell me what you changed.

## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

**Manual**

Create `AGENTS.md` if it does not exist, then paste this block at the end:

```markdown
## Avara UI

This project uses Avara UI (`@avara-ui`), a free shadcn registry of animated React components and website sections.

- Install with `npx shadcn@latest add @avara-ui/<name> --yes`. `@avara-ui` is in shadcn's registry directory, so no setup is needed; only if the CLI says "Unknown registry", run `npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json` once.
- Find components in https://avaraui.com/agent/components.json (or https://avaraui.com/llms.txt). Read an item's Markdown for its props before writing code against it.
- Follow the workflow in https://avaraui.com/skills/avara-ui/SKILL.md: plan, decide, install, read, adapt, check.
- Ask before you pick. An index entry with `choose: true` has several designs of one section (for example the hero). If the user has not named one, ask which they want, with each option's live link, before installing. If they say to choose, pick from `bestFor` / `avoidIf` and say why. Use your client's click-to-pick question tool if it has one, so the user answers by clicking, not typing. Never pick a variant on your own. See https://avaraui.com/skills/avara-ui/variants.md.
- Style with theme tokens only. Install the GSAP or the Motion build of a component, never both.
```

 **Check that it worked.** Start a new OpenCode session in the project and ask "Using @avara-ui, add a pricing section". The agent should open the component index before writing any markup.

 **Update or remove.** To update, replace the block with the current one from this page. To remove, delete the block from the file.

The files are plain text, so read them before you add them to a repository. They
are generated from this site's own registry, so they only name components that
exist.

### Troubleshooting

- **`node` is not recognised, or `fetch is not defined`.** The manual command needs Node.js 18 or newer. Update it, or use "Ask your agent" instead, which needs no Node.js.
- **A 404 or a blocked download.** A proxy or firewall may be stopping the request. Use the file links under the manual command and save each file yourself.
- **The agent ignores it.** Check that the files sit in the project root, not a subfolder, and start a new session.

## Use it

There is nothing to register. @avara-ui is listed in the shadcn
registry directory, so the shadcn CLI finds it by name. Describe the interface in
plain language and name @avara-ui so the agent looks in the right place:

- "Using @avara-ui, build a pricing page with a hero, the plans and an FAQ."
- "Add a @avara-ui data table of orders with sorting and pagination, wired to `/api/orders`."
- "Use @avara-ui to add a command palette and a dock to this app shell."
- "Replace this footer with the @avara-ui footer, keeping our links."

If the CLI ever answers "Unknown registry", your shadcn CLI is older than the
directory lookup. Update it, or add the registry to the project once:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
```

## How the workflow runs

1. **Plan.** The agent writes the page's sections and states (empty, loading, error) before any code.
2. **Decide.** It searches the index or `https://avaraui.com/llms.txt` and matches by summary. If nothing fits, it composes the screen from smaller components. For each section that comes in several designs, it asks you which one first, with a live link for every option, unless you already named one.
3. **Install.** It runs `npx shadcn@latest add @avara-ui/name --yes`, or the same command with `pnpm dlx`, `yarn dlx` or `bunx` if your project uses another package manager.
4. **Read.** It fetches the item's Markdown for the props and import path.
5. **Adapt.** It swaps in your data and keeps the component's structure and styling.
6. **Check.** It runs the checklist: tokens only, keyboard access, dark mode, reduced motion, and a passing build.

## Does the agent ask before it picks a design?

Yes, when a section has several designs. It lists each one with what it suits and a link to see it live, and installs nothing until you answer. In a client with a click-to-pick question tool (Claude Code, for one) you answer by clicking: a group first when there are many designs, then the design, or "Pick the best one for me". Reply with a design's name, or "pick the best one for me": then it chooses from each design's best-for and avoid-if notes against your brief, tells you which and why, and gives the link so you can swap. A section with one design is installed without a question. The rule lives in `variants.md`, one of the skill's files.

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
