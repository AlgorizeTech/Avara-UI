# Build a Production-Ready MCP Server for Algorize UI

I have an existing React UI component library called **Algorize UI**, built on top of **ShadCN UI**.

I want you to build a production-ready **Model Context Protocol (MCP) server** for Algorize UI so that AI coding agents can discover, understand, validate, install, and correctly use Algorize UI components.

The goal is to make Algorize UI an **AI-native UI component library**.

The architecture should be inspired by modern AI-first component libraries such as ReUI, but DO NOT copy their implementation. Adapt the architecture to my existing project and registry.

**Read section 0 first. It records decisions that are already made. Do not re-open them.**

---

# 0. DECISIONS ALREADY MADE (READ FIRST)

1. **Scope of v1:** free, open, read-only. No login, no OAuth, no license check. Every component that exists today is free.
2. **Premium later:** premium components will come in the future. Prepare for them (see section 24), but do not build premium features in v1.
3. **Standalone package:** the MCP server lives in the top-level `mcp/` folder as its own npm package with its own `package.json`. It is NOT part of the Next.js app, because the app uses `output: "export"` (static export, no server functions) and its root package is `private`. Do not add MCP routes to the Next.js app.
4. **Two transports, one core:** all tool logic lives in one shared core. Two thin entry points wrap it:
   - **stdio**, published to npm and run with `npx` (first, needs no hosting)
   - **Streamable HTTP**, deployed separately (second)
5. **HTTP hosting: MCPize** (https://mcpize.com). Deploy the `mcp/` package there on its Free plan for launch, root directory `mcp/`. Vercel is NOT used for hosting the MCP server. Facts below come from MCPize's own marketing/docs pages, are NOT independently verified, and MCPize's own pages contradict each other in places — confirm all of this against MCPize's actual current docs and a real test deploy before finalizing the HTTP entry point:
   - Deploy via the `mcpize` CLI (`npm install -g mcpize`, `mcpize init`, `mcpize deploy`) or GitHub push-to-deploy, configured with a `mcpize.yaml` manifest (`runtime: typescript`, `startCommand.type: http`, entry point, build command).
   - MCPize's pages describe two possible paths for a TypeScript server: (a) write a Streamable HTTP server yourself (`type: http` in the manifest), or (b) write a stdio server and let MCPize auto-bridge it to HTTP (`bridge: mode: stdio`, via `mcp-proxy`). Verify which path is actually reliable on MCPize today; do not assume either without testing. Prefer (a), an explicit Streamable HTTP entry, if both work, since it keeps behavior in our own code rather than a third-party bridge.
   - Free plan (as documented by MCPize, unverified): 0.5 vCPU / 512 MB RAM, 250K requests/month, 1 repo, 1 environment, scale-to-zero (cold start), no custom domain, no stated uptime SLA. A custom domain (for a future `mcp.<main-domain>`) requires a paid plan — confirm current pricing at deploy time, not from this guide.
   - Public endpoint format (unverified, confirm at deploy time): `https://<slug>.mcpize.run/mcp`.
   - Auth: MCPize's gateway reportedly supports API keys and OAuth 2.1, but whether a server is open-by-default or gated is not confirmed. Verify this matches the open, no-login v1 (section 0.1) before relying on it.
   - Marketplace listing is a separate, optional step from hosting; do not list until asked.
   - Because hosting can move (MCPize now, something else later), keep the HTTP entry a plain, portable Streamable HTTP handler with no MCPize-specific code beyond the deploy manifest.
6. **URLs come from env:** the registry URL and the MCP URL are configuration. The current default `https://algorize-ui.vercel.app/r` is temporary. The main domain is decided at launch. Never hardcode a domain in MCP code. Do not bulk-edit the existing hardcoded `vercel.app` URLs in the library (docs, `src/config/site.ts`, `src/lib/registry.ts`) as part of this work.
7. **Not in v1:** block tools, icon tools, OAuth, embedding/semantic search, a rich `compose_page`.
8. **DECIDED: Option A, with Option B as fallback.** Extend `src/scripts/generate-registry.ts` to extract props, required flags, and variant unions from each component's exported `type`/`interface` (confirmed clean and typed in practice, e.g. `CustomAccordionProps` in `Accordion.tsx`, `LoginFormProps` in `LoginForm.tsx` — literal unions for variants, `?` for optional, JSDoc comments for descriptions). Use the TypeScript compiler API or `ts-morph` (not raw `@babel/parser`, which does not resolve types) for reliable extraction. Write the result as an optional structured field (e.g. `props`) on the registry item, additive to the existing schema.
   - **Fallback per component:** if extraction fails or finds no exported props type for a given component, that component's `get_component`/`validate_usage` fall back to the existing `docs` prose field and mark the source as `"source": "docs-text"`. This is per-component, not a global switch — most components should get structured props, a few may fall back.
   - This is a change to `generate-registry.ts`; keep it minimal and additive, and get explicit approval before editing that script (rule 34.18).

---

# 1. IMPORTANT: INSPECT THE PROJECT FIRST

Do NOT start coding immediately.

Inspect the existing Algorize UI repository and confirm the facts in 1.1 still hold. Do not assume anything not listed there.

Understand:

- Project structure
- React and Next.js versions
- TypeScript, Tailwind and ShadCN configuration, `components.json`
- Component structure and exports
- Registry structure, JSON format and metadata
- Documentation and example structure
- Component dependencies (`dependencies`, `registryDependencies`)
- CSS/theme requirements
- Existing install mechanism
- Package manager and build system
- Deployment configuration

Inspect real registry entries, for example:

https://algorize-ui.vercel.app/r/login-form.json

## 1.1 Verified facts (from inspection, re-check quickly)

- The repo is a Next.js 15 docs site with `output: "export"`. The root `package.json` is private, has no `workspaces`, and its scripts use `npm`. Lockfiles present: `package-lock.json`, `bun.lockb`, and an untracked `pnpm-lock.yaml`.
- Registry index: `public/r/registry.json` (source: root `registry.json`). It has 183 items: 171 `registry:component` and 12 `registry:ui`.
- Registry index item keys: `name`, `type`, `title`, `author`, `description`, `categories`, `dependencies`, `registryDependencies`, `files`, `docs`.
- Per-item file `public/r/<name>.json` has the same keys plus `$schema`, and `files[]` carries `path`, `type`, `target` and `content` (the full source).
- There are 18 categories, for example `layout`, `data-display`, `marketing`, `forms`, `navigation`, `authentication`.
- The registry has NO `tags`, `aliases`, `props`, `variants`, `examples` or CSS-variable fields.
- `docs` is a prose string (present on 178 of 183 items), for example the Accordion item's `docs` describes `accordionData`, `type`, `collapsible` and its variants in one paragraph.
- `registryDependencies` contain either full URLs of other Algorize items (`https://algorize-ui.vercel.app/r/ui-accordion.json`) or plain shadcn names such as `utils`.
- Item metadata (description, categories, docs) is authored in `src/scripts/registry-meta.ts`. The registry is generated by `src/scripts/generate-registry.ts`, which reads `REGISTRY_BASE_URL`.
- Documentation: `src/app/docs/[framework]/<name>/page.mdx`, plus generated markdown in `public/docs-md/` (about 295 files). Live demos: `src/preview/demos/`.
- Official install docs use a namespaced registry: `npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json`, then `npx shadcn@latest add @algorize-ui/<name>`.
- There is no separate `registry:block` type. The `custom/blocks/` folder items are registered as `registry:component`.

Use the actual implementation as the source of truth. If something differs from 1.1, trust the repo and report the difference.

Before implementing, give a short analysis covering: recommended MCP architecture, what to reuse, what NOT to duplicate, and the open decision in 0.8. **Wait for the user's approval before writing code.**

---

# 2. EXISTING SHADCN REGISTRY

Algorize UI already provides a public ShadCN-compatible registry.

Registry base URL (current, temporary, configurable):

https://algorize-ui.vercel.app/r

A registry item is at `{base}/{component-name}.json`, the index is at `{base}/registry.json`.

The existing registry is the PRIMARY SOURCE OF TRUTH. Do NOT create a duplicate component registry.

The MCP server must use the existing registry for:

- component metadata
- component source
- dependencies and registryDependencies
- installation

Information the registry does not contain (props, variants, examples) must come from an explicit, documented source (see 0.8, section 7 and section 9). Never invent it.

---

# 3. CORE ARCHITECTURE

                    Algorize UI
                         │
                         ▼
                 ShadCN Registry (static JSON)
                         │
                         ▼
                 MCP core (shared logic)
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        stdio entry           Streamable HTTP entry
        (npm / npx)           (separate deployment)
              │                     │
              └──────────┬──────────┘
                         ▼
                 AI Coding Agents
        Claude Code, Cursor, VS Code, Codex, ...
                         │
                         ▼
                  User's Codebase

The registry remains the source of truth. The MCP server is an AI-friendly interface to it.

---

# 4. MCP IMPLEMENTATION

Use the official MCP TypeScript SDK and follow the current MCP specification.

Provide both transports from the same core:

1. **stdio** entry, exposed as an npm `bin` (shebang, `npx <package-name>`). Build and ship this first.
2. **Streamable HTTP** entry, deployed to MCPize (section 0.5). Verify the SDK's Streamable HTTP API and MCPize's actual runtime requirements before writing it. Prefer a stateless setup so it also runs unmodified on any other Node host later.

Do not invent a custom protocol. Do not write client-specific logic. All compatible clients connect to the same server.

---

# 5. MCP TOOLS (v1)

Implement the tools in sections 5 to 14. Blocks and icons are out of scope for v1 (sections 15 and 16).

## 5.1 search

Natural-language component discovery.

Input:

{
  "query": string,
  "category": string?
}

Examples: "login form", "pricing section", "date picker", "data table".

Search matches, in order: exact name, partial name, category, title, description, `docs` text. When `tags` or `aliases` fields exist in the registry in the future, include them. Do NOT invent tags or aliases.

Return lightweight ranked results:

{
  "results": [
    {
      "name": "login-form",
      "title": "Login Form",
      "description": "...",
      "categories": ["authentication"],
      "type": "registry:component",
      "tier": "free",
      "registryUrl": "<REGISTRY_URL>/login-form.json"
    }
  ]
}

Do NOT return source code from search.

---

# 6. list_components

Return all available components as lightweight metadata only.

Filters: `category`, `type` (`registry:component` or `registry:ui`), `tier`.

Do not return the whole registry unless asked. Support a `limit` and pagination.

---

# 7. get_component

Return complete information about one component.

Input: `{ "name": string }`

Return:

- name, title, description, categories, type, tier
- registry URL
- `docs` text from the registry
- file list (paths only; source comes from `get_component_source`)
- props/API and variants: from the source chosen in 0.8. If structured data is not available, return the `docs` prose and mark the field as `"source": "docs-text"`. Never guess props.
- `dependencies` and `registryDependencies`
- installation command (section 11)
- related components (same category, or referenced through `registryDependencies`)

Do NOT allow the AI to guess component props. If something is unknown, say it is unknown.

---

# 8. get_component_source

Return the source files of one registered component, with paths, taken from the registry item's `files[].content`.

Input: `{ "name": string }`

Only expose files that belong to that registry item. Never allow arbitrary filesystem access. If the item is premium and the caller is not authorized, return metadata and unlock info only (section 24).

---

# 9. get_examples

Return usage examples for a component.

Input: `{ "component": string, "example": string? }`

Registry items do not contain examples. Real examples live in the documentation (`public/docs-md/`, the component's `.mdx` page) and in `src/preview/demos/`. Read them from the published documentation URL, resolved from configuration, not from the local filesystem in production.

Return example name, description, source code, imports and dependencies. Prefer real examples. If no example exists, return `EXAMPLE_NOT_FOUND`. Do not fabricate one.

---

# 10. get_component_dependencies

Return all dependencies of a component:

- **npm dependencies:** the item's `dependencies`
- **registry dependencies:** the item's `registryDependencies` (full URLs to other Algorize items, or shadcn names such as `utils`), resolved recursively, without cycles
- **internal dependencies:** other Algorize items found through `registryDependencies`
- **styling requirements:** the registry has no CSS-variable field. Report only what the item's `docs` text or the installation docs state. Otherwise return nothing. Do not invent theme requirements.

`dependencies` and `registryDependencies` are authoritative.

---

# 11. get_install_command

Critical tool. Return the EXACT installation command for a component.

Official documented flow: the `@algorize-ui` namespaced registry.

Return structured data:

{
  "name": "login-form",
  "installCommand": "npx shadcn@latest add @algorize-ui/login-form",
  "setupCommand": "npx shadcn@latest registry add @algorize-ui=<REGISTRY_URL>/{name}.json",
  "urlInstallCommand": "npx shadcn@latest add <REGISTRY_URL>/login-form.json"
}

Rules:

- `installCommand` uses the namespaced form. `setupCommand` is the one-time step needed if the project has not registered `@algorize-ui`. `urlInstallCommand` is the zero-setup fallback.
- The package runner is configurable (`npx`, `pnpm dlx`, `bunx`), default `npx`. Do not assume the user's package manager.
- The URL must come from configuration and from the registry item, never a hardcoded domain.
- Do NOT invent package names. Do NOT assume the component is an npm package. Do NOT return `pnpm add login-form`.
- For a premium item, the command needs a license header (section 24).

---

# 12. validate_usage

Let an agent validate component usage before writing code.

Input: `{ "component": string, "props": Record<string, unknown>?, "code": string? }`

Always validate:

- the component exists
- imports and named exports match what the registry item and its `docs` state
- npm and registry dependencies are listed

Validate props, required props and variant values to the extent each component's prop source (0.8) allows, per component:

- Components with structured props (the normal case): report `INVALID_PROP`, `INVALID_VARIANT` and missing required props as errors.
- Components that fell back to `docs` prose (0.8): report unknown props or variants as **warnings**, not errors, because the source is prose, not a type.

Return:

{
  "valid": false,
  "errors": [{ "type": "INVALID_PROP", "message": "..." }],
  "warnings": []
}

The purpose is to stop agents from hallucinating APIs, not to be a type checker. Do not claim certainty you do not have.

---

# 13. get_project_context

Only for **stdio (local) mode**. A remote HTTP server cannot read the user's `package.json` or `components.json`.

In local mode, detect: React, Next.js and Tailwind versions, TypeScript, the ShadCN config and `components.json`, the package manager, and whether `@algorize-ui` is registered.

In the HTTP entry, do not register this tool. Agents pass their own context as input to other tools where needed.

Never read or expose `.env`, secrets, API keys or credentials. Read only an explicit allow-list of files.

---

# 14. compose_page

Optional and lightweight in v1. Because there is no block system (section 15), suggest components per page section using the search service over categories and descriptions.

Input: `{ "description": string }`

Return a structured plan such as: sidebar, header, statistics, chart, recent activity, each mapped to candidate existing components with their install commands. Do NOT propose custom components when a suitable one exists. It is acceptable to ship this tool after the others.

---

# 15. BLOCK SUPPORT (NOT IN V1)

Algorize UI has no separate block type in the registry. Items under `custom/blocks/` are registered as `registry:component`.

Do NOT implement `search_blocks`, `list_blocks` or `get_block`, and do not invent a fake block system. Section-level components are reachable through `categories` such as `marketing`, `layout` and `authentication`. Revisit if a real `registry:block` type is introduced.

---

# 16. ICON SUPPORT (NOT IN V1)

Algorize UI has no icon collection. Do not implement icon tools.

---

# 17. SEARCH ARCHITECTURE

Create a reusable search service that builds an in-memory index from the cached registry index.

Search priority:

Exact name
↓
Partial name
↓
Category
↓
Title and description
↓
`docs` text

(Alias and tag matching are added only if those fields ever exist.)

No embeddings or semantic search in v1. Do not expose fake precision scores. Return only relevant metadata. Keep it fast for 183 items and scalable beyond.

---

# 18. REGISTRY CLIENT

Create a dedicated registry client.

Configuration:

UI_REGISTRY_URL=https://algorize-ui.vercel.app/r

This default is temporary. Read it from the environment. Do not hardcode the URL anywhere else. Documentation URLs used for examples (section 9) are derived from the same configured origin or a second env var.

Responsibilities:

- fetch `registry.json` (the index) and individual items
- validate responses with runtime schemas
- resolve component and dependency URLs
- resolve `registryDependencies` recursively
- cache with a sensible TTL, avoid unnecessary requests
- handle failures and return `REGISTRY_UNAVAILABLE`

Fetch the index once and cache it. Fetch a full item only when source is requested.

---

# 19. REGISTRY TYPES

Create TypeScript types and runtime schemas from the real structure in 1.1. Fields:

- index item: `name`, `type`, `title`, `author`, `description`, `categories`, `dependencies`, `registryDependencies`, `files` (with `path`, `type`, `target`), `docs`
- full item: the same plus `$schema` and `files[].content`
- optional future fields: `tier`, and structured `props` and `variants` if Option A is chosen

Unknown extra fields must not break parsing. Re-verify against the live registry before finalizing.

---

# 20. AGENT SKILL

Create an **Algorize UI Agent Skill**. It must work across MCP-compatible coding agents and must NOT depend on Claude-specific, Cursor-specific or Codex-specific APIs.

The skill teaches agents:

1. Search before creating a custom component.
2. Inspect the component before using it.
3. Use the real component API.
4. Retrieve examples when useful.
5. Validate usage before implementation.
6. Get the exact installation command.
7. Reuse existing components.
8. Never invent component names, props or installation commands.
9. If data is unknown, say so and ask instead of guessing.

Workflow: Search → Get component → Get examples → Validate usage → Get installation command → Install → Implement.

MCP provides live library data. The skill provides workflow and behavior. Keep the two responsibilities separate. Consider also serving the skill text through a tool for agents that cannot install files.

---

# 21. MCP CLIENT COMPATIBILITY

The server is client-agnostic and uses standard MCP only.

For v1, document and verify only: Claude Code, Cursor, VS Code, Codex.

Do NOT claim compatibility with any other client until its MCP support, configuration format and Streamable HTTP support are verified. Do not implement client-specific server logic.

---

# 22. CLIENT SETUP DOCUMENTATION

For each verified client, document: how to connect (stdio `npx` command and the HTTP URL), config format and location, example config, authentication requirements (none in v1), restart or reload steps, and verification steps.

Before documenting a client, verify its current MCP support and configuration format. Document limitations. Keep client documentation separate from the implementation.

---

# 23. PRODUCTION MCP ENDPOINT

The endpoint is configurable, for example `MCP_BASE_URL`. Do NOT use a URL that is not actually deployed.

- Before launch: the MCPize-provided URL (`https://<slug>.mcpize.run/mcp`, unverified format) is fine.
- At launch: a subdomain of the main domain, for example `mcp.<main-domain>`, if and when a paid MCPize plan (or another host) supports a custom domain. Decide this only when launch is actually planned, not now.

Expose the standard MCP endpoint path. Verify the exact deployment setup on MCPize first (see 0.5).

---

# 24. AUTHENTICATION AND PREMIUM READINESS

**v1:** open and read-only. No login.

Design now, so premium can be added later without a rewrite:

1. Add an optional `tier: "free" | "premium"` field (default `free`) in `src/scripts/registry-meta.ts`, carried through `generate-registry.ts`. All current items are `free`.
2. Add an auth middleware hook in the MCP core. In v1 it allows everything.
3. Tools must already understand a locked item. Search and list show premium items with `locked: true` and unlock info. `get_component_source` and `get_examples` return only metadata and unlock info without valid credentials.

Future premium design (do not build in v1):

- Start with a **license key / API token** sent as `Authorization: Bearer <token>`. The same key works for the MCP server and for the shadcn CLI (registry entries in `components.json` accept custom headers). Add OAuth only later if user accounts or a browser sign-in flow become necessary.
- **Premium source must never be published in the static site.** `public/r/`, `public/docs-md/` and the docs pages are public static files and cannot be gated. Premium items need a separate gated endpoint that checks the license before returning source. The public build must keep only their metadata.
- Never expose credentials through tool responses or logs.

---

# 25. SECURITY

The server must be secure and read-focused.

- No arbitrary filesystem access. Only serve files that belong to registry items.
- Prevent path traversal (`../../.env`, `../../../package.json`).
- Validate every component name against the known registry index before using it in a URL or path.
- Never expose secrets, credentials, environment variables, private or unrelated repository files.
- Never execute shell commands requested through MCP.
- Do not leak premium source (section 24).
- Never return stack traces.

---

# 26. PERFORMANCE

Optimize for AI agent usage.

- Search and list responses are small.
- Do not return the entire registry unless explicitly requested.
- Cache the registry index in memory with a TTL.
- Free hosting tiers have request and cold-start limits, so avoid unnecessary network requests and keep responses lean.

---

# 27. ERROR HANDLING

Use structured errors:

{
  "error": "COMPONENT_NOT_FOUND",
  "message": "Component 'xyz' was not found.",
  "suggestions": ["dialog", "alert-dialog"]
}

Errors: `COMPONENT_NOT_FOUND`, `EXAMPLE_NOT_FOUND`, `INVALID_INPUT`, `INVALID_PROP`, `INVALID_VARIANT`, `REGISTRY_UNAVAILABLE`, `SOURCE_NOT_FOUND`, `INSTALLATION_UNAVAILABLE`, and later `PREMIUM_LOCKED`.

Never expose internal stack traces.

---

# 28. TYPESCRIPT

Use strict TypeScript. Avoid `any`. Use runtime schema validation (for example `zod`, already used in the repo) for MCP inputs, MCP outputs and registry responses.

Types: `RegistryItem`, `ComponentMetadata`, `ComponentProp`, `ComponentVariant`, `ComponentExample`, `ComponentDependency`, `SearchResult`, `ValidationResult`, `InstallCommand`. Adapt them to the real registry.

---

# 29. PROJECT STRUCTURE

Standalone package in `mcp/` (this guide file stays alongside it):

mcp/
  package.json          (own name, version, `bin`, `files`, `prepublishOnly`)
  tsconfig.json
  mcpize.yaml           (MCPize deploy manifest: runtime, entry, startCommand — see section 0.5)
  src/
    core/
      server.ts         (builds the MCP server, registers tools)
      auth.ts           (middleware hook, allows all in v1)
    entry/
      stdio.ts          (npm bin, shebang)
      http.ts           (Streamable HTTP, separate deployment)
    tools/
      search.ts
      list-components.ts
      get-component.ts
      get-source.ts
      get-examples.ts
      get-dependencies.ts
      get-install-command.ts
      validate-usage.ts
      get-project-context.ts   (stdio only)
      compose-page.ts
    registry/
      registry-client.ts
      registry-schema.ts
    services/
      component-service.ts
      search-service.ts
      validation-service.ts
      installation-service.ts
    utils/
      security.ts
      config.ts         (env: UI_REGISTRY_URL, MCP_BASE_URL, package runner)
  tests/

Do not force this if a better layout fits. Do not mix this package's dependencies or scripts into the root Next.js `package.json`.

---

# 30. TESTING

Test against real Algorize UI registry entries (for example `login-form`, `accordion`, `button`).

- **Search:** exact, partial, category, description, no results.
- **Components:** valid, missing (with suggestions), metadata, dependencies, registry URL.
- **Installation:** correct namespaced, setup and URL commands, missing component, configurable runner and registry URL.
- **Validation:** valid props, invalid props, invalid variants, missing required props (to the level the prop source allows).
- **Security:** path traversal names are rejected, unknown names never reach a URL or filesystem call.
- **Transports:** the stdio server works with a real MCP client or the MCP Inspector, and the HTTP entry works locally and after deployment.
- **Premium readiness:** a fake `tier: premium` item returns locked metadata and no source.

---

# 31. LOCAL DEVELOPMENT

The repo's root scripts use `npm`, so `mcp/` uses `npm` unless the user says otherwise. Add scripts inside `mcp/package.json` only:

npm run dev
npm run build
npm run test
npm run inspect   (MCP Inspector)

Do not change the root `package.json` scripts, and do not add MCP to the root `build` script.

---

# 32. DOCUMENTATION

Create MCP documentation covering: what Algorize UI MCP is, architecture, registry integration, tools with inputs and outputs, local development, deployment (npm and Vercel), client setup, Agent Skill setup, how the registry and docs feed the server, adding new components (including the `tier` field and props extraction if chosen), premium plan, and troubleshooting.

Use real examples, for example the `login-form` registry item and `npx shadcn@latest add @algorize-ui/login-form`. Use the configured domain, not a hardcoded one.

---

# 33. FINAL AI WORKFLOW

User: "Build me a login page using Algorize UI."

Agent:

1. Search Algorize UI
2. Inspect component metadata
3. Get the component API
4. Get examples
5. Inspect dependencies
6. Validate usage
7. Get the exact installation command
8. Install through the ShadCN registry
9. Implement the UI

The agent should never guess component names, props, variants, dependencies, registry URLs or install commands. Where the data is unknown, the server says so.

---

# 34. CRITICAL RULES

1. Inspect the existing project before coding, and wait for approval before implementing.
2. Treat the existing ShadCN registry as the source of truth.
3. Do not unnecessarily duplicate the registry.
4. Do not hallucinate component APIs, examples or installation commands.
5. Do not expose arbitrary files or execute arbitrary commands.
6. Do not hardcode the registry or MCP domain. Use configuration.
7. Do not change the existing hardcoded `vercel.app` URLs in the library as part of this work.
8. Do not build a fake block or icon system.
9. Prefer existing components, examples and docs.
10. Keep MCP responses structured and LLM-friendly.
11. Use the official MCP SDK and follow the current spec.
12. One shared core, two transports (stdio first, Streamable HTTP second).
13. Keep the Agent Skill and MCP responsibilities separate. Keep the server client-agnostic.
14. Never leak premium source through public static files.
15. Test against real registry entries, run TypeScript checks, tests and the build.
16. Verify the server with a real MCP client.
17. Do not claim compatibility with a client whose support is unverified.
18. Do not break or rewrite the existing Algorize UI library. Changes to `registry-meta.ts` and `generate-registry.ts` must be minimal, additive and approved.

---

# 35. FINAL ACCEPTANCE CRITERIA

Done only when:

- the `mcp/` package builds and TypeScript passes
- tests pass
- the stdio server works through `npx` with a real MCP client
- the Streamable HTTP entry works locally and, once verified, when deployed
- real components can be searched and real metadata and source retrieved
- dependencies resolve
- exact install commands are generated and the registry URL is configurable
- usage validation works to the level of the chosen prop source
- security protections work
- the `tier` field and auth hook exist, and a premium-locked item behaves correctly in tests
- the Agent Skill and the documentation exist
- the same server connects to Claude Code, Cursor, VS Code and Codex (verified)
- existing Algorize UI functionality is unaffected

The final product should feel like a first-class AI interface for Algorize UI, fully integrated with the existing ShadCN registry.
