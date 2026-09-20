# Text Animation

A powerful typography component that breathes life into your text using Framer Motion. It supports multiple animation variants like typewriter effects, focus reveals, 3D flips, and more.

It is perfect for hero sections, landing page headers, and grabbing user attention.

Each effect fires when it scrolls into view (`whileInView`, once), so scroll a preview back into frame — or hit its reload button — to replay.

export const usageDefault = `import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function HeroSection() {
  return (
    
  );
}`;

export const usageVariants = `import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function AnimationVariants() {
  // Seven effects behind one prop.
  return (

  );
}`;

export const usageTiming = `import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function TimedAnimation() {
  // \`duration\` stretches each character's transition, \`delay\` holds the whole
  // sequence back — useful for staging a headline against a subheadline.
  return (
    
  );
}`;

export const usageAs = `import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function HeadlineAnimation() {
  // \`as\` swaps the rendered element so the headline keeps its document
  // meaning; \`style\` and \`className\` pass straight through.
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/text-animation
```

## Examples

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          TextAnimation

          text

          string

          Required

          The actual text string you want to animate.

          TextAnimation

          variant

          "typewriter" | "blur-reveal" | "wave" | "pop-in" | "flip" | "spin-in" | "blur-in-up"

          "blur-reveal"

          The style of the animation.

          TextAnimation

          duration

          number

          0.5

          The duration of the animation in seconds. Note: For the typewriter effect, this is the total duration to type out the entire string.

          TextAnimation

          delay

          number

          0

          The delay before the animation starts.

          TextAnimation

          as

          React.ElementType

          "p"

          The HTML element to render the root wrapper as (e.g., h1, h2, span).

          TextAnimation

          style / className

          CSSProperties / string

          undefined

          Since the component inherits native HTML attributes, you can easily pass style={`{{ color: "#hex" }}`} or Tailwind text-color utility classes to dynamically change the color of the animated text.

          TextAnimation

          ...props

          HTMLAttributes&lt;HTMLElement&gt;

          undefined

          Accepts all native HTML attributes (e.g., id, onClick) which are seamlessly forwarded to the wrapper element.

---

**Component Path:** `[framework]\text-animation\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
