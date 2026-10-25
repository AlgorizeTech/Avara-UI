export const metadata = docsPageMetadata("tooltip");

# Tooltip

A context-aware popup that displays information when an element receives keyboard focus or a mouse hover.

Most lightweight tooltips suffer from a fatal flaw: they get clipped or hidden if they are placed inside a container with `overflow-hidden`. This `TooltipBlock` completely sidesteps that issue natively. It uses React's `createPortal` to render the tooltip bubble directly onto the `document.body` layer, calculating its position dynamically so it is mathematically impossible for it to get clipped by parent components.

Hover or tab to each trigger to open its tooltip.

export const usageNoArrow = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function NoArrowTooltip() {
  return (

        {/* 1. Bottom Placement */}

                Bottom

            }
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />

        {/* 2. Right Placement (Placed on left edge on mobile to open right) */}

                Right

            }
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />

        {/* 3. Top Placement */}

                Top

            }
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />

        {/* 4. Left Placement (Placed on right edge on mobile to open left) */}

                Left

            }
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />

  );
}`;

export const usageArrow = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function ArrowTooltip() {
  return (

        {/* 1. Bottom Placement */}

                Bottom

            }
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />

        {/* 2. Right Placement */}

                Right

            }
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />

        {/* 3. Top Placement */}

                Top

            }
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />

        {/* 4. Left Placement */}

                Left

            }
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />

  );
}`;

export const usageAnimated = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function AnimatedTooltip() {
  return (

        {/* 1. Bottom Placement */}

                Bottom

            }
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />

        {/* 2. Right Placement */}

                Right

            }
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />

        {/* 3. Top Placement */}

                Top

            }
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />

        {/* 4. Left Placement */}

                Left

            }
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />

  );
}`;

export const usageStaggered = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function StaggeredTooltip() {
  return (

        {/* 1. Bottom Placement */}

                Bottom

            }
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />

        {/* 2. Right Placement */}

                Right

            }
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />

        {/* 3. Top Placement */}

                Top

            }
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />

        {/* 4. Left Placement */}

                Left

            }
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />

  );
}`;

export const usageExpand = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function ExpandTooltip() {
  return (

        {/* 1. Bottom Placement (Height expands downwards) */}

                Bottom

            }
              title="Bottom Tooltip"
              description="Renders cleanly below without clipping."
            />

        {/* 2. Right Placement (Width expands rightwards) */}

                Right

            }
              title="Right Tooltip"
              description="Anchored smoothly to the right edge."
            />

        {/* 3. Top Placement (Height expands upwards) */}

                Top

            }
              title="Top Tooltip"
              description="Positioned dynamically above the trigger."
            />

        {/* 4. Left Placement (Width expands leftwards) */}

                Left

            }
              title="Left Tooltip"
              description="Attached to the left side with portal layout."
            />

  );
}`;

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

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Tooltip

          delayDuration

          number

          200

          The time (in milliseconds) a user must hover over the trigger before
          the tooltip opens.

          TooltipContent

          side

          "top" | "bottom" | "left" | "right"

          "top"

          The preferred side of the trigger to render the tooltip content.

          TooltipContent

          align

          "start" | "center" | "end"

          "center"

          The preferred alignment against the chosen side. For example,{" "}
          side="top" align="end" anchors the bottom-right corner of
          the tooltip to the top-right corner of the trigger.

          TooltipContent

          sideOffset

          number

          6

          The distance (in pixels) from the edge of the trigger element to the
          tooltip bubble.

          TooltipContent

          showArrow

          boolean

          false

          Whether to render an adaptive pointer arrow anchoring the tooltip bubble to its trigger.

          TooltipContent

          animated

          boolean

          false

          Whether to enable the smooth pull-out animation that slides gently out from the trigger.

          TooltipContent

          staggered

          boolean

          false

          Whether to animate child elements (icon &rarr; title &rarr; description) in a smooth staggered cascade.

          TooltipContent

          expand

          boolean

          false

          Whether to start with only title space and smoothly expand height (for top/bottom) or width (for left/right) to unveil the description.

          TooltipContent

          arrowClassName

          string

          undefined

          Optional Tailwind CSS classes for custom styling on the pointer arrow.

          TooltipContent

          icon

          React.ReactNode

          undefined

          Optional leading icon rendered on the left inside a background badge container that matches the content height.

          TooltipContent

          iconClassName

          string

          undefined

          Optional Tailwind CSS classes for custom styling on the icon background badge container.

          TooltipContent

          title

          React.ReactNode

          undefined

          Optional header title rendered in bold to the right of the icon (single line). If omitted, no title is rendered.

          TooltipContent

          description

          React.ReactNode

          undefined

          Optional descriptive text rendered underneath the title (single line). If only description is passed, it cleanly renders just the description.

          TooltipContent

          des

          React.ReactNode

          undefined

          Shorthand alias for description.

          TooltipArrow

          className

          string

          undefined

          Standalone arrow sub-component that automatically reads side and align to anchor the bubble.

          All Components

          className

          string

          undefined

          Standard Tailwind overrides. Useful for overriding background colors
          or text sizing on the TooltipContent.

---

**Component Path:** `[framework]\tooltip\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
