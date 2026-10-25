/**
 * mcp-guide.md section 20. Client-agnostic workflow text — no Claude/Cursor/
 * Codex-specific APIs. Shipped both as a static file (SKILL.md) for clients
 * that install skill files, and served live via the get_agent_skill tool for
 * clients that cannot.
 */
export const AGENT_SKILL_MARKDOWN = `# Avara UI

Use the Avara UI MCP tools whenever a task needs a UI component, before writing a new one from scratch.

## Workflow

1. **Search** — call \`search\` with a short description of what you need (e.g. "login form", "pricing section"). Do not assume a component name exists; find it first.
2. **Inspect** — call \`get_component\` on the chosen result to read its real description, docs, dependencies and (when available) its structured props. If \`propsInfo.source\` is \`"docs-text"\`, the props are prose, not a type — read the docs text carefully instead of guessing.
3. **Examples** — call \`get_examples\` for real usage code. If an example is marked \`renderCallIncomplete: true\`, its import lines and sample data are real but the JSX render call was stripped by the documentation export step — do not invent a plausible-looking tag; check \`get_component\`'s \`docs\` field or the props reference for the correct call shape instead of fabricating one.
4. **Validate** — call \`validate_usage\` with the props you intend to pass before writing code. Treat \`errors\` as blocking; treat \`warnings\` as "verify this yourself" when the prop source is docs text.
5. **Install** — call \`get_install_command\` and run the returned \`installCommand\` exactly as given (it already accounts for the project's registry setup). Never write \`npm install <component-name>\` or invent a package name — these are ShadCN registry items, not npm packages.
6. **Implement** — use the real exported name and props from step 2, not an assumed one.

## Rules

- Never invent a component name, prop, variant, dependency or install command. If a tool says something is unknown, say so to the user instead of guessing.
- Prefer an existing Avara UI component over writing a custom one when \`search\` returns a reasonable match.
- A component with \`"locked": true\` or \`"tier": "premium"\` requires a license; tell the user instead of trying to fetch its source anyway.
- If the registry or a tool is unavailable, report that plainly rather than fabricating a plausible-looking answer.
`;
