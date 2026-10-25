# Contributing to Avara UI

Thanks for taking the time to improve Avara UI. This guide covers local setup, the rules shipped components follow, and the checks every pull request has to pass.

One thing worth knowing up front: **this repository publishes source code, not a compiled package.** Whatever lands in `src/components/custom/` or `src/components/ui/` is copied into other people's projects by the `shadcn` CLI and compiled there. A type error or a stray Next.js import here becomes a broken build somewhere else, and that's why the checks below are strict.

---

## Before you start

Look through the [issue tracker](https://github.com/AlgorizeTech/Reusable-Component-Documentation/issues) for an existing issue or discussion about your change. If there isn't one, open one first for anything larger than a small fix, so nobody spends a weekend on something that's already in progress.

## Local setup

```bash
git clone https://github.com/AlgorizeTech/Reusable-Component-Documentation.git
cd Reusable-Component-Documentation
npm install        # also points git at .githooks/ (see "The pre-commit hook")
npm run dev        # http://localhost:3000
```

CI runs on **Node.js 20**, so use that version or newer. No `.env` is needed to develop or build. [`.env.example`](.env.example) documents the optional settings.

---

## How the repository is organised

Some files are written by hand and some are generated. Only edit the hand-written ones:

| Path | Hand-written? | What it is |
| :--- | :-----------: | :--------- |
| `src/components/custom/blocks/` | ✅ | Components and website sections. **Shipped to users.** |
| `src/components/custom/blocks/motion/` | ✅ | Motion builds of GSAP components (see [Animation](#animation)). **Shipped.** |
| `src/components/custom/ui/`, `src/components/ui/` | ✅ | Base primitives. **Shipped.** |
| `src/components/site/` | ✅ | Docs-site chrome: header, sidebar, code blocks. Never shipped. |
| `src/app/docs/[framework]/<slug>/page.mdx` | ✅ | One docs page per component, serving both `/docs/nextjs/…` and `/docs/reactjs/…`. |
| `src/preview/demos/` | ✅ | Live demos shown on docs pages. |
| `src/scripts/registry-meta.ts` | ✅ | Each item's description, categories and usage notes. |
| `src/constants/navigation.ts` | ✅ | The docs sidebar. |
| `registry.json`, `public/r/` | ❌ generated | The published registry. Rebuilt by `npm run build:registry`. |
| `public/docs-md/` | ❌ generated | Markdown copies of the docs. Rebuilt by `npm run build:md`. |
| `mcp/` | ✅ | A separate package (the MCP server) with its own `package.json` and tsconfig. The site doesn't build or type-check it. |

> The `[framework]` folder name is literal. Quote it in shell commands (`"src/app/docs/[framework]/hero"`) so the brackets aren't read as a glob.

---

## Rules for shipped components

These apply to everything under `src/components/custom/` and `src/components/ui/`. Most of them are enforced by a script, so breaking one fails the build instead of reaching a user.

### Work in both frameworks

- **Never import from `next/*`.** The same file has to compile in a Vite app. If a component renders a link or an image, accept it as a prop (`linkComponent`, `imageComponent`) that defaults to a plain `<a>` or `<img>`.
- **Load browser-only libraries after mount, without `next/dynamic`.** `next/dynamic` doesn't resolve in Vite. Import the library at runtime once the component has mounted. `DataMapsBlock.tsx` shows the pattern for Leaflet and explains why it avoids `React.lazy` there.
- **In docs pages, link with `<DocLink to="slug">`**, never a hard-coded `/docs/nextjs/…` path. Keep code snippets as a plain string unless the Next.js and React versions really differ.

`npm run check:frameworks` enforces all of this.

### Theme through CSS variables

Components take their colours, radius and fonts from the theme's CSS variables, so every preset on the [Themes page](https://avaraui.com/themes) restyles them. Use the theme tokens (`bg-background`, `text-foreground`, `bg-primary` and so on) instead of fixed colours. Check your component in light and dark mode, and with at least one preset besides the default.

### Animation

- **CSS first.** If an animation runs between fixed values (fades, slides, loops), write it in CSS.
- **GSAP when you need a library.** That's for pointer or scroll-driven motion, drag, or layout reflow.
- **Motion only as a twin.** If you want a Motion version, put it in `blocks/motion/` with the same filename. It's published as `<name>-motion` and installs to the same path as the GSAP build.
- **Respect reduced motion.** Honour `prefers-reduced-motion`.

`npm run check:registry` fails if an item pulls in Motion without being a `-motion` twin, or if a twin has no GSAP base.

### Credit borrowed code

If a file is derived from another project's code, confirm the licence allows it and add the file and the original notice to [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

---

## Adding a component

1. **Write the component** in `src/components/custom/blocks/<Name>Block.tsx`.
2. **Add a demo** in `src/preview/demos/`, and register it in `src/preview/names.ts` and `src/preview/registry.tsx`, keeping both lists alphabetical.
3. **Describe it for the registry** in `src/scripts/registry-meta.ts`: description, categories and usage notes.
4. **Write the docs page** at `src/app/docs/[framework]/<slug>/page.mdx`. Copy the layout of an existing page for a similar component.
5. **Add it to the sidebar** in `src/constants/navigation.ts`. For a `"New"` badge, also set `addedOn` (`YYYY-MM-DD`). The badge then drops off by itself after a while.
6. **Regenerate the registry**:

   ```bash
   npm run generate:registry   # writes registry.json
   npm run build:registry      # writes public/r/<slug>.json
   ```

   Until you run the first command, the docs page throws a 500 error because its installation block can't find the item.

For a Motion twin, also add `src/preview/demos/<slug>-motion-demo.tsx`. The docs page then shows GSAP and Motion tabs by itself.

## Changing a component

- Update the docs page if props, defaults or behaviour change.
- If the component has a `-motion` twin, apply the same change to both builds.
- Regenerate the registry (`npm run build:registry`), or let the pre-commit hook do it.

---

## Before you open a pull request

Run the full build. It's the same sequence the deploy runs:

```bash
npm run build
```

That covers Markdown export → registry build → framework checks → consumer type check → `next build` (which also type-checks and lints). If it passes, you're very likely fine. To run the checks one at a time:

| Command | What it checks |
| :------ | :------------- |
| `npx tsc --noEmit` | Type errors across the site. |
| `npm run lint` | ESLint. Warnings are allowed, errors are not. |
| `npm run check:registry` | The registry matches its sources, and the animation twin rules hold. |
| `npm run check:frameworks` | No `next/*` imports in shipped code, no hard-coded framework paths in docs. |
| `npm run check:types` | Every shipped file compiles under the settings a consumer's project uses. |

Then look at your change in the browser:

- on `/docs/nextjs/<slug>` **and** `/docs/reactjs/<slug>`
- in light and dark mode
- on a phone-sized viewport as well as desktop
- with the browser console open, which should show no new errors or warnings

### The pre-commit hook

`npm install` points git at `.githooks/`. When you commit a change to a registry source, the hook rebuilds `registry.json` and `public/r/` and stages the result with your commit. If a registry source has unstaged edits, the hook stops and asks you to stage or stash them first. To skip the hook for one commit, set `SKIP_REGISTRY_BUILD=1`.

CI runs the same regeneration and **fails if `registry.json` or `public/r/` would change**, meaning you committed a stale registry. The fix is always `npm run build:registry`, then commit the result.

---

## Branches, commits and pull requests

- **Branches.** Name the branch after the change, e.g. `feat/v0-integration` or `fix/<what-it-fixes>`.
- **Commits.** Use [Conventional Commits](https://www.conventionalcommits.org/), with the component or area as the scope when it helps:

  ```
  feat(hero): add a video background option
  fix(fleet-tracker): keep the map inside its card on mobile
  docs: explain the linkComponent prop on the navbar page
  ```

- **Pull requests.** Recent pull requests have targeted the `live-update` branch. Give yours a clear title, say what changed and why, and link the issue. For visual changes, add screenshots or a short recording. Before-and-after is best.

A pull request that fails CI, or that changes a shipped component without updating its docs, will be sent back for changes.

---

## Useful scripts

| Command | What it does |
| :------ | :----------- |
| `npm run dev` | Start the dev server (Turbopack) at `localhost:3000`. |
| `npm run build` | Full production build, including every check above. |
| `npm run generate:registry` | Rebuild `registry.json` from the component sources. |
| `npm run build:registry` | `generate:registry`, then `shadcn build` into `public/r/`. |
| `npm run build:md` | Regenerate the Markdown docs in `public/docs-md/`. |
| `npm run check:registry` | Registry drift and animation-twin checks. |
| `npm run check:frameworks` | Next.js/React portability checks. |
| `npm run check:types` | Consumer-settings type check of every shipped file. |
| `npm run lint` | ESLint. |
| `npm run build:analyze` | Bundle size report. |

---

## Questions

If something here is unclear or out of date, open an issue. Fixes to this guide are contributions too.

By contributing, you agree that your work is released under the project's [MIT License](LICENSE).
