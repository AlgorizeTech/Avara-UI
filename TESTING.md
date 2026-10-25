# Testing the registry

How to verify a component actually installs and compiles in someone else's
project. Every step below has been run and verified.

A green `shadcn build` proves nothing — it emits JSON whether or not that JSON
is correct. The only real test is installing into a clean project and compiling.

---

## Why local testing needs one extra step

Intra-registry dependencies are emitted as **absolute URLs**:

```json
"registryDependencies": [
  "https://avaraui.com/r/ui-badge.json",
  "utils"
]
```

They have to be. A bare `"select"` resolves against **shadcn's** upstream
registry — and shadcn ships items called `select`, `card`, `button` and `table`.
A bare name would silently install the wrong component instead of failing.

So to test locally, regenerate with a localhost base URL:

```bash
REGISTRY_BASE_URL=http://localhost:3000 npm run build:registry
```

**Always regenerate with the default before committing:**

```bash
npm run build:registry
```

`check:registry` fails on bare names but cannot tell a localhost URL from a
production one. That one is on you.

---

## Local smoke test

### 1. Serve the registry

```bash
REGISTRY_BASE_URL=http://localhost:3000 npm run build:registry
npm run dev
```

```bash
curl -s -o /dev/null -w "status=%{http_code} redirect=%{redirect_url} type=%{content_type}\n" \
  http://localhost:3000/r/button.json
```

Expected — a redirect means `trailingSlash` is misconfigured:

```
status=200 redirect= type=application/json; charset=UTF-8
```

### 2. Scratch consumer project

In a directory **outside this repo**:

```bash
npx create-next-app@latest smoke \
  --ts --tailwind --app --eslint --no-src-dir \
  --import-alias "@/*" --use-npm --turbopack --yes

cd smoke
npx shadcn@latest init --defaults --force
```

`init` creates `lib/utils.ts`, which every item depends on via
`registryDependencies: ["utils"]`.

> `shadcn init` has no `--base-color` flag. Use `--defaults`.

### 3. Install

```bash
npx shadcn@latest add http://localhost:3000/r/button.json --yes
```

The item's `docs` text prints after install — that's the only channel into the
consumer's terminal, so it's worth writing well.

### 4. Test the dependency graphs

These are the cases that break.

**Multi-dependency** — `pricing-plan` pulls four primitives:

```bash
npx shadcn@latest add http://localhost:3000/r/pricing-plan.json --yes
```

Expect 5 files: `custom/ui/badge.tsx`, `custom/ui/button.tsx`, `ui/card.tsx`,
`custom/ui/slider.tsx`, `custom/blocks/Pricing-plan.tsx`.

**Relative sibling import** — `advanced-table` imports `./SelectBlock`:

```bash
npx shadcn@latest add http://localhost:3000/r/advanced-table.json --yes
```

`SelectBlock.tsx` and `AdvancedTableBlock.tsx` must land in the **same
directory**, or the relative import breaks. This is why targets mirror the
source structure instead of being flattened.

### 5. Compile — the actual gate

```bash
npx tsc --noEmit     # catches missing `dependencies`
```

Then render the components in a real page and build:

```tsx
// app/smoke/page.tsx
"use client";
import Button from "@/components/custom/blocks/Button";

export default function Page() {
  return (
    <div>
      <Button variant="default">Hi</Button>
      <Button variant="outline" loading>Loading</Button>
    </div>
  );
}
```

```bash
npx next build       # catches missing `cssVars` and runtime breakage
```

Importing a component is not the same as rendering it. Both steps are required.

### 6. Clean up

```bash
cd .. && rm -rf smoke
```

Never reuse a scratch project. A previously-installed file makes the next
install a no-op and the test silently passes.

---

## Post-deploy test

Repeat steps 2–6 against the live domain:

```bash
npx shadcn@latest add https://avaraui.com/r/button.json --yes
```

Do not skip this because localhost passed. The deployed host differs in MIME
type, redirects, CDN caching and trailing-slash handling.

Priority items to verify:

| Item | Why |
|---|---|
| `fleet-map` | `leaflet` + CSS imported separately |
| `data-maps` | `react-leaflet` and `leaflet`, the latter only dynamically imported |
| `qr-code-reader` | `jsqr`, camera permission, secure context |
| `calendar` | `react-day-picker` + two registry deps |
| `carousel-3d` | `motion` auto-install |
| `pricing-plan` | 4-item dependency graph |
| `advanced-table` | relative sibling import, static |
| `fleet-tracker` | relative sibling import, **dynamic** — `lazy(() => import("./Fleet-map"))` |

Install `fleet-tracker` on its own and render it. A dynamic import is invisible
to a static `import ... from` scan, so this shipped for a while as a single file
whose `./Fleet-map` could not resolve — the item installed cleanly and the
consumer's build failed on a module they never wrote. Rendering matters: an
unimported file never enters the build graph, so `next build` passes without it.

No item is Next.js-coupled any more — `npm run generate:registry` prints a
"Next.js-coupled" section when one appears, and it is currently silent. The
blocks that render links (`breadcrumb`, `navbar`) take a `linkComponent` prop
defaulting to a plain `a`, so they work unmodified in Vite or Remix and accept
`next/link` when there is one. Keep that pattern for anything new that links.

Note the generator flags **any** `next/*` import, not just `next/image` and
`next/link` — `next/navigation` and `next/dynamic` break a non-Next consumer
just as thoroughly.

---

## Namespaced install

Consumers can add a `registries` block to their `components.json`:

```json
{
  "registries": {
    "@avara-ui": "https://avaraui.com/r/{name}.json"
  }
}
```

Then `npx shadcn@latest add @avara-ui/button`. Verified working.

---

## Per-release checklist

```bash
npm run build:registry                            # PRODUCTION urls
npm run check:registry                            # exit 1 on failure
npx tsc --noEmit                                  # 0 errors
npx next lint                                     # 0 errors
npm run build                                     # registry lands in out/r/
git diff --exit-code -- registry.json public/r    # artifacts not stale
```

CI runs all of these — see `.github/workflows/registry.yml`.

---

## The pre-commit hook

That last line — `git diff --exit-code -- registry.json public/r` — is the one
that keeps failing in CI, because it is the first thing that notices when a
source file was edited and the artifacts were not regenerated. It reports the
problem after the push, on someone else's screen.

`.githooks/pre-commit` moves that check to commit time. When a staged file is a
registry input it regenerates and stages `registry.json` and `public/r/`
alongside your change, so the two can no longer drift apart.

It activates through the `prepare` script, so a plain `npm install` is all a
clone needs:

```json
"prepare": "git config core.hooksPath .githooks"
```

Two behaviours worth knowing:

- **It refuses to run when a staged registry source also has unstaged edits.**
  The generator reads the working tree, not the index, so the artifacts would be
  built from code the commit does not contain — the same drift, arrived at from
  the other direction. Stage or stash first.
- **Commits that touch no registry input skip it entirely**, so unrelated work
  pays nothing.

Bypass it for one commit with `SKIP_REGISTRY_BUILD=1 git commit ...`, and
rebuild separately before pushing.
