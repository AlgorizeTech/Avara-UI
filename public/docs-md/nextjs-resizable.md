---
title: "Shadcn Resizable"
description: "Shadcn Resizable. A 60fps resizable split-panel system (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`) with nested groups, min/max constraints."
url: https://avaraui.com/docs/nextjs/resizable
---

# Shadcn Resizable

A 60fps resizable split-panel system (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`) with nested groups, min/max constraints, and keyboard ARIA separator stepping.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/resizable.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/resizable
```

## Resizable layout

Groups nest, so a full IDE layout is a few lines.

- `direction` on `ResizablePanelGroup` sets the axis for the group and every handle inside it.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

function Explorer() {
  return (
    <div className="p-4 flex flex-col h-full bg-muted/30">
      <div className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4">
        Explorer
      </div>
      <div className="space-y-2 flex-1">
        <div className="w-full h-4 bg-muted rounded" />
        <div className="w-3/4 h-4 bg-muted rounded" />
        <div className="w-5/6 h-4 bg-muted rounded" />
      </div>
    </div>
  );
}

function Editor() {
  return (
    <div className="p-4 flex flex-col h-full bg-background overflow-y-auto">
      <div className="text-xs font-semibold text-foreground mb-4 border-b border-border/60 pb-2 flex items-center justify-between shrink-0">
        <span>page.tsx</span>
        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">
          Active
        </span>
      </div>
      <div className="space-y-2 font-mono text-xs flex-1">
        <div>
          <span className="text-[#d73a49] dark:text-[#f97583] font-semibold">export default function</span>{" "}
          <span className="text-[#6f42c1] dark:text-[#b392f0] font-semibold">Page</span>() {"{"}
        </div>
        <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">return (</div>
        <div className="pl-8">
          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;div</span>{" "}
          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;flex h-full w-full flex-col p-4&quot;</span>
          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
        </div>
        <div className="pl-12">
          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;h2</span>{" "}
          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;text-2xl font-semibold&quot;</span>
          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
          <span className="text-foreground font-semibold">John Doe</span>
          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;/h2&gt;</span>
        </div>
        <div className="pl-12 text-[#6a737d] dark:text-[#6a737d] italic">
          {"{/* Drag handle bars to resize panels live */}"}
        </div>
        <div className="pl-8 text-[#22863a] dark:text-[#85e89d]">&lt;/div&gt;</div>
        <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">);</div>
        <div>{"}"}</div>
      </div>
    </div>
  );
}

function TerminalPane() {
  return (
    <div className="p-4 flex flex-col h-full bg-zinc-950 text-white border-t border-border/40">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center justify-between">
        <span>Terminal</span>
        <span className="text-[9px] text-muted-foreground">bash</span>
      </div>
      <div className="font-mono text-xs text-zinc-300">
        <span className="text-emerald-400 font-semibold">project@app:~$</span>{" "}
        npm run dev
        <br />
        <span className="text-primary font-semibold">✓ Ready in 850ms</span>
      </div>
    </div>
  );
}

export default function StudioLayout() {
  return (
    // Simulated Studio Window
    <div className="w-full h-[400px] sm:h-[460px] border border-border rounded-xl overflow-hidden shadow-xs bg-background flex flex-col">
      {/* Fake Header Bar */}
      <div className="h-9 sm:h-10 border-b border-border/80 bg-muted/50 px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-foreground ml-2">
            Nexus Studio
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
          Resizable Layout
        </span>
      </div>

      {/* Main Resizable Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={22} minSize={15} maxSize={40}>
            <Explorer />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={78}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={30}>
                <Editor />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={15}>
                <TerminalPane />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
```

## Horizontal split

- `defaultSize` on each panel is a percentage of the group — two panels at 40 and 60 fill it.
- `withHandle` on the handle renders the visible grip in the middle of the divider.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

// Panel bodies — swap these for your own content.
function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-muted/40">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const PanelOne = () => <Pane label="Panel one" />;
const PanelTwo = () => <Pane label="Panel two" />;

export default function HorizontalSplit() {
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (
    <div className="w-full h-[280px] sm:h-[320px] border rounded-xl overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <PanelOne />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <PanelTwo />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Vertical split

- Set `direction="vertical"` to stack the panels and turn the handle into a horizontal bar.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

// Panel bodies — swap these for your own content.
function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-muted/40">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const PanelOne = () => <Pane label="Panel one" />;
const PanelTwo = () => <Pane label="Panel two" />;

export default function VerticalSplit() {
  // `direction` sets the flex axis of the group and the drag axis of every
  // handle inside it.
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (
    <div className="w-full h-[280px] sm:h-[320px] border rounded-xl overflow-hidden">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={40}>
          <PanelOne />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <PanelTwo />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Size constraints

- `minSize={15}` and `maxSize` are percentages of the group; the drag clamps to them so a panel can never escape its bounds.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

// Panel bodies — swap these for your own content.
function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-muted/40">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const Sidebar = () => <Pane label="min 15% · max 40%" />;
const Editor = () => <Pane label="fills the rest" />;

export default function ConstrainedSidebar() {
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (
    <div className="w-full h-[280px] sm:h-[320px] border rounded-xl overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* Percentages of the group. The engine clamps the drag so a panel can
            never escape its bounds. */}
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## About Shadcn Resizable

**What it is.** `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` compose horizontal, vertical, and nested split-pane layouts with `defaultSize`, `minSize`, `maxSize`, and optional `withHandle` grips.

**How it is built.** Updates `element.style.flex` directly during pointer drag to bypass React re-renders for 60fps resizing, and wires `role="separator"` keyboard arrow stepping out of the box.

**When to use it.** Use `Resizable` for IDE panes, code playgrounds, split previews, and adjustable sidebars.

## For AI agents

**When to use**

- User-resizable split panes (`direction="horizontal" | "vertical"`) and nested IDE/dashboard layouts

**When not to use**

- Static bento/card grids — use [Masonry Grid](https://avaraui.com/docs/nextjs/masonry-grid) or [Glass Panel](https://avaraui.com/docs/nextjs/glass-panel)

**Agent notes**

- Named exports: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` from `@/components/custom/blocks/ResizableBlock`
- `defaultSize`, `minSize`, and `maxSize` are percentages of the enclosing group

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ResizablePanelGroup` | `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | The layout orientation of the group. Panels inside will stack either side-by-side or top-to-bottom. |
| `ResizablePanel` | `defaultSize` | `number` | `50` | The initial size of the panel, represented as a relative percentage of its parent container. |
| `ResizablePanel` | `minSize` | `number` | `0` | The minimum allowed size (percentage) the panel can be shrunk to. |
| `ResizablePanel` | `maxSize` | `number` | `100` | The maximum allowed size (percentage) the panel can be grown to. |
| `ResizableHandle` | `withHandle` | `boolean` | `false` | If true, renders a small visual grip icon in the center of the separator track. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides. Useful for adding specific background colors or padding to panels. |

## Works with other components

- Combine `ResizablePanel` panes with [Scroll Area](https://avaraui.com/docs/nextjs/scroll-area), [Terminal](https://avaraui.com/docs/nextjs/terminal), and [Custom Code Block](https://avaraui.com/docs/nextjs/custom-code-block) for IDE/playground layouts.

## How do I make a resizable split panel layout in React?

Wrap `ResizablePanel` children in a `ResizablePanelGroup` and put a `ResizableHandle` between each pair of panels. Set `direction` to `"horizontal"` or `"vertical"` on the group, then give each panel a `defaultSize` as a percentage of the parent.

## How do I set minimum and maximum panel sizes?

Pass `minSize` and `maxSize` to `ResizablePanel` as percentages of the parent. They default to `0` and `100`, so set `minSize` on sidebars and editors you never want dragged shut. The handle stops at those limits while the user drags.

## Can I nest Resizable panels for an IDE-style layout?

Yes. Put a `ResizablePanelGroup` inside a `ResizablePanel` and give the inner group the opposite `direction`, for example a vertical editor and terminal split inside a horizontal sidebar split. Each panel keeps its own `defaultSize`, `minSize` and `maxSize` values.

## Does Resizable support keyboard resizing?

Yes. `ResizableHandle` renders with `role="separator"` and steps with the arrow keys, so panels can be resized without a mouse. Add `withHandle` to draw a small grip icon in the centre of the separator so users can see where to grab.

## Why does dragging a Resizable panel stay smooth?

During a pointer drag it writes `element.style.flex` directly instead of updating React state, which bypasses re-renders and keeps resizing at 60fps. Its only npm dependency is `lucide-react` for the grip icon, and it has no `next/*` imports, so it also runs in Vite.

---

Live previews and every example: https://avaraui.com/docs/nextjs/resizable
