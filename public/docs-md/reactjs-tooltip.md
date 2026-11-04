---
title: "Tooltip"
description: "A context-aware popup that displays information when an element receives keyboard focus or a mouse hover. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/tooltip
---

# Tooltip

A context-aware popup that displays information when an element receives keyboard focus or a mouse hover.

Most lightweight tooltips suffer from a fatal flaw: they get clipped or hidden if they are placed inside a container with `overflow-hidden`. This `TooltipBlock` completely sidesteps that issue natively. It uses React's `createPortal` to render the tooltip bubble directly onto the `document.body` layer, calculating its position dynamically so it is mathematically impossible for it to get clipped by parent components.

Hover or tab to each trigger to open its tooltip.

## Without Arrow

- `side` renders the tooltip on `left`, `top`, `bottom`, or `right` without an indicator arrow.
- `icon / title / des` renders a matching-height icon badge on the left, a single-line title, and single-line description.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function NoArrowTooltip() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
        {/* 1. Bottom Placement */}
        <div className="self-center sm:self-auto order-1 sm:order-3">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Bottom</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              icon={<Zap className="w-4 h-4" />}
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />
          </Tooltip>
        </div>

        {/* 2. Right Placement (Placed on left edge on mobile to open right) */}
        <div className="self-start sm:self-auto order-2 sm:order-4">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Right</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              icon={<Layers className="w-4 h-4" />}
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />
          </Tooltip>
        </div>

        {/* 3. Top Placement */}
        <div className="self-center sm:self-auto order-3 sm:order-2">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Top</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              icon={<Sparkles className="w-4 h-4" />}
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />
          </Tooltip>
        </div>

        {/* 4. Left Placement (Placed on right edge on mobile to open left) */}
        <div className="self-end sm:self-auto order-4 sm:order-1">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Left</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              icon={<Compass className="w-4 h-4" />}
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/tooltip.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/tooltip
```

## Examples

### With Arrow

- Use `showArrow=true` on `TooltipContent` to anchor a directional pointer arrow.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function ArrowTooltip() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
        {/* 1. Bottom Placement */}
        <div className="self-center sm:self-auto order-1 sm:order-3">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Bottom</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              showArrow
              sideOffset={8}
              icon={<Zap className="w-4 h-4" />}
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />
          </Tooltip>
        </div>

        {/* 2. Right Placement */}
        <div className="self-start sm:self-auto order-2 sm:order-4">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Right</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              showArrow
              sideOffset={8}
              icon={<Layers className="w-4 h-4" />}
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />
          </Tooltip>
        </div>

        {/* 3. Top Placement */}
        <div className="self-center sm:self-auto order-3 sm:order-2">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Top</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              showArrow
              sideOffset={8}
              icon={<Sparkles className="w-4 h-4" />}
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />
          </Tooltip>
        </div>

        {/* 4. Left Placement */}
        <div className="self-end sm:self-auto order-4 sm:order-1">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Left</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              showArrow
              sideOffset={8}
              icon={<Compass className="w-4 h-4" />}
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

### With Arrow & Animated

- Use `animated=true` for a smooth pull-out emergence animation sliding gently out from the trigger.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function AnimatedTooltip() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
        {/* 1. Bottom Placement */}
        <div className="self-center sm:self-auto order-1 sm:order-3">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Bottom</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              showArrow
              animated
              sideOffset={8}
              icon={<Zap className="w-4 h-4" />}
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />
          </Tooltip>
        </div>

        {/* 2. Right Placement */}
        <div className="self-start sm:self-auto order-2 sm:order-4">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Right</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              showArrow
              animated
              sideOffset={8}
              icon={<Layers className="w-4 h-4" />}
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />
          </Tooltip>
        </div>

        {/* 3. Top Placement */}
        <div className="self-center sm:self-auto order-3 sm:order-2">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Top</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              showArrow
              animated
              sideOffset={8}
              icon={<Sparkles className="w-4 h-4" />}
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />
          </Tooltip>
        </div>

        {/* 4. Left Placement */}
        <div className="self-end sm:self-auto order-4 sm:order-1">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Left</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              showArrow
              animated
              sideOffset={8}
              icon={<Compass className="w-4 h-4" />}
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

### With Staggered Content Animation

- Use `staggered=true` along with `animated` for a sequential entrance where the icon appears first, followed by the title, and then the description.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function StaggeredTooltip() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
        {/* 1. Bottom Placement */}
        <div className="self-center sm:self-auto order-1 sm:order-3">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Bottom</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              showArrow
              animated
              staggered
              sideOffset={8}
              icon={<Zap className="w-4 h-4" />}
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />
          </Tooltip>
        </div>

        {/* 2. Right Placement */}
        <div className="self-start sm:self-auto order-2 sm:order-4">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Right</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              showArrow
              animated
              staggered
              sideOffset={8}
              icon={<Layers className="w-4 h-4" />}
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />
          </Tooltip>
        </div>

        {/* 3. Top Placement */}
        <div className="self-center sm:self-auto order-3 sm:order-2">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Top</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              showArrow
              animated
              staggered
              sideOffset={8}
              icon={<Sparkles className="w-4 h-4" />}
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />
          </Tooltip>
        </div>

        {/* 4. Left Placement */}
        <div className="self-end sm:self-auto order-4 sm:order-1">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Left</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              showArrow
              animated
              staggered
              sideOffset={8}
              icon={<Compass className="w-4 h-4" />}
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

### With Expanding Content

- Use `expand=true` to open as a compact title badge first, then smoothly expand its height (for top/bottom) or width (for left/right) to unveil the description.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function ExpandTooltip() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
        {/* 1. Bottom Placement (Height expands downwards) */}
        <div className="self-center sm:self-auto order-1 sm:order-3">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Bottom</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              showArrow
              expand
              sideOffset={8}
              icon={<Zap className="w-4 h-4" />}
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />
          </Tooltip>
        </div>

        {/* 2. Right Placement (Width expands rightwards) */}
        <div className="self-start sm:self-auto order-2 sm:order-4">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Right</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              showArrow
              expand
              sideOffset={8}
              icon={<Layers className="w-4 h-4" />}
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />
          </Tooltip>
        </div>

        {/* 3. Top Placement (Height expands upwards) */}
        <div className="self-center sm:self-auto order-3 sm:order-2">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Top</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              showArrow
              expand
              sideOffset={8}
              icon={<Sparkles className="w-4 h-4" />}
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />
          </Tooltip>
        </div>

        {/* 4. Left Placement (Width expands leftwards) */}
        <div className="self-end sm:self-auto order-4 sm:order-1">
          <Tooltip>
            <TooltipTrigger>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Left</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              showArrow
              expand
              sideOffset={8}
              icon={<Compass className="w-4 h-4" />}
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Tooltip` | `delayDuration` | `number` | `200` | The time (in milliseconds) a user must hover over the trigger before the tooltip opens. |
| `TooltipContent` | `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | The preferred side of the trigger to render the tooltip content. |
| `TooltipContent` | `align` | `"start" \| "center" \| "end"` | `"center"` | The preferred alignment against the chosen side. For example, `side="top" align="end"` anchors the bottom-right corner of the tooltip to the top-right corner of the trigger. |
| `TooltipContent` | `sideOffset` | `number` | `6` | The distance (in pixels) from the edge of the trigger element to the tooltip bubble. |
| `TooltipContent` | `showArrow` | `boolean` | `false` | Whether to render an adaptive pointer arrow anchoring the tooltip bubble to its trigger. |
| `TooltipContent` | `animated` | `boolean` | `false` | Whether to enable the smooth pull-out animation that slides gently out from the trigger. |
| `TooltipContent` | `staggered` | `boolean` | `false` | Whether to animate child elements (icon &rarr; title &rarr; description) in a smooth staggered cascade. |
| `TooltipContent` | `expand` | `boolean` | `false` | Whether to start with only title space and smoothly expand height (for top/bottom) or width (for left/right) to unveil the description. |
| `TooltipContent` | `arrowClassName` | `string` | `undefined` | Optional Tailwind CSS classes for custom styling on the pointer arrow. |
| `TooltipContent` | `icon` | `React.ReactNode` | `undefined` | Optional leading icon rendered on the left inside a background badge container that matches the content height. |
| `TooltipContent` | `iconClassName` | `string` | `undefined` | Optional Tailwind CSS classes for custom styling on the icon background badge container. |
| `TooltipContent` | `title` | `React.ReactNode` | `undefined` | Optional header title rendered in bold to the right of the icon (single line). If omitted, no title is rendered. |
| `TooltipContent` | `description` | `React.ReactNode` | `undefined` | Optional descriptive text rendered underneath the title (single line). If only description is passed, it cleanly renders just the description. |
| `TooltipContent` | `des` | `React.ReactNode` | `undefined` | Shorthand alias for `description`. |
| `TooltipArrow` | `className` | `string` | `undefined` | Standalone arrow sub-component that automatically reads side and align to anchor the bubble. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind overrides. Useful for overriding background colors or text sizing on the `TooltipContent`. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/tooltip
