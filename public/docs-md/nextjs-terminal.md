---
title: "Terminal Snippet"
description: "Shadcn Terminal Snippet. A dependency-free terminal window in the macOS style for code in any language, in glass and minimal styles."
url: https://avaraui.com/docs/nextjs/terminal
---

# Terminal Snippet

A dependency-free terminal window for showing code, inspired by Mac OS windows.

If you are building a documentation site, a developer portfolio, or writing technical blog posts, you need a sleek way to present code. This `TerminalBlock` handles the structural styling, Mac-like window controls, built-in "Copy to Clipboard" functionality, and dynamic language badging without relying on heavy third-party syntax highlighters.

Pass a raw `code` string and the block handles the window chrome, language badge, overflow scrolling and copy button.

## For AI agents

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/terminal

**When to use it.** A dependency-free terminal window for showing code, with Mac-style window controls and a copy button, in three looks: the default, frosted glass and a stripped-down minimal one.

**Gotchas:**

- All three are looks of the one `terminal` item: install it once and set `variant` from the index.
- The language, the filename label, the header controls and the copy button are props on any look; the block ships no heavyweight syntax highlighter.

### The 3 variants

1. **Default** (`default`): The standard window with Mac-like controls, a language badge and a copy button.
   - Live: https://avaraui.com/view/terminal/default
   - Best for: docs, portfolios and blog posts that show commands or code
   - Avoid if: you want the code on its own, without window chrome
   - Traits: window controls, copy button, default look
   - Install: `npx shadcn@latest add @avara-ui/terminal`
   - Docs: https://avaraui.com/docs/nextjs/terminal#terminal
2. **Glass** (`glass`): The window blurs whatever sits behind it.
   - Live: https://avaraui.com/view/terminal/glass
   - Best for: a terminal over a photo or gradient
   - Avoid if: the background is plain, since there is nothing to blur
   - Traits: backdrop blur
   - Install: `npx shadcn@latest add @avara-ui/terminal`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/terminal#glass
3. **Minimal** (`minimal`): The chrome is stripped down to the code itself.
   - Live: https://avaraui.com/view/terminal/minimal
   - Best for: a snippet that should sit quietly inside prose
   - Avoid if: you want it to read clearly as a terminal window
   - Traits: code only
   - Install: `npx shadcn@latest add @avara-ui/terminal`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/terminal#minimal

## Terminal

Mac-style window controls, a language badge and a copy button, all from one string.

- Pass `code` as the whole snippet — newlines in the string become terminal lines.
- `copyable` is on by default and renders the copy button.

```tsx
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const installCommand = `npx create-next-app@latest my-app --typescript --tailwind
cd my-app
npm run dev`;

export default function Docs() {
  return (
    <TerminalBlock
      code={installCommand}
      language="bash"
      filename="terminal"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/terminal.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/terminal
```

## Examples

### Any language

- `language="python"` sets the badge and highlighting. Defaults to `bash`; the block ships no heavyweight highlighter, so any string is safe.
- `filename` is the label beside the badge.

```tsx
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const source = `import httpx

def fetch(url: str) -> dict:
    response = httpx.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    print(fetch("https://api.example.com/status"))`;

export default function PythonTerminal() {
  // `language` drives the badge; the block never ships a heavyweight
  // highlighter, so any language string is safe to pass.
  return <TerminalBlock code={source} language="python" filename="main.py" />;
}
```

### Glass

- Set `variant="glass"` to blur whatever sits behind the window — ideal over imagery.

```tsx
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const source = `import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white",
        className,
      )}
      {...props}
    />
  );
}`;

export default function GlassTerminal() {
  return (
    // Backdrop-blurred chrome — put it over a gradient.
    <div className="p-12 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl">
      <TerminalBlock
        code={source}
        language="tsx"
        filename="Button.tsx"
        variant="glass"
      />
    </div>
  );
}
```

### Minimal

- Set `variant="minimal"` to strip the chrome down to the code itself.

```tsx
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const source = `import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white",
        className,
      )}
      {...props}
    />
  );
}`;

export default function MinimalTerminal() {
  // Drops the window controls and the border for inline snippets.
  return <TerminalBlock code={source} language="tsx" variant="minimal" />;
}
```

### Without header controls

- Omit `filename` and set `copyable={false}` for a bare, read-only block.

```tsx
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const source = `import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white",
        className,
      )}
      {...props}
    />
  );
}`;

export default function BareTerminal() {
  // No filename header, no copy button — just the code.
  return <TerminalBlock code={source} language="tsx" copyable={false} />;
}
```

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `TerminalBlock` | `code` | `string` | `Required` | The snippet rendered inside the window. Newlines in the string become terminal lines. |
| `TerminalBlock` | `language` | `string` | `"bash"` | Drives the syntax highlighting and the badge shown in the header. |
| `TerminalBlock` | `filename` | `string` | `undefined` | Label beside the badge. Omit it and the header keeps only the window controls. |
| `TerminalBlock` | `copyable` | `boolean` | `true` | Renders the copy button. Set it false for a read-only block. |
| `TerminalBlock` | `variant` | `"default" \| "glass" \| "minimal"` | `"default"` | Surface treatment of the window chrome. |
| `TerminalBlock` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Accent for the language badge and border. Unrecognised values fall back to `"primary"`. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/terminal
