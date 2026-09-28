# Split-Stack Stepper

A high-impact, interactive split-screen layout animated with plain **CSS transitions** — no animation library. One side renders a narrative sequence of feature cards with glowing pill badges, while the opposite side maintains a sticky visual showcase container.

Unlike basic tab replacements, this engine applies dynamic mathematical depth tweens via GreenSock to **stack previous visual cards on top of each other in a 3D deck format** as the user progresses through the narrative.

`SplitStepper` orchestrates the responsive grid itself — you supply the narrative sequence and a JSX payload per card, and CSS transitions handle the stacking. Click any step in the scrolling column to watch the deck restack.

export const splitSteps = `// Card bodies — these are the four screens the preview renders.
const MockLandingView = () => (

        High-Converting UI

          CTA Button

);

const MockSaaSView = () => (

        SaaS Dashboard Architecture

          MRR Growth

          +148.2%

          Active Users

          24,892

);

const MockAIView = () => (

        AI & LLM Integration

        TERMINAL // AI_ENGINE
        STATUS: ACTIVE

        &gt; Initializing RAG pipeline...

        &gt; Vector embeddings synced (1.2ms)

        &gt; Ready for token streaming_

);

const MockMobileView = () => (

          Mobile First

        Silky 60fps native performance across iOS and Android ecosystems.

);

const steps: SplitStep[] = [
  {
    id: "landing",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens. We engineer high-converting layouts with engaging Motion & GSAP animations.",
    tags: ["Conversion Focused", "Figma To Code", "Mobile First"],
    color: "bg-[#0c0c10] border-amber-500/20",
    cardContent: ,
  },
  {
    id: "saas",
    stepNumber: "02",
    title: "SaaS Product Development",
    description:
      "Every successful SaaS product starts with a complex problem. We build modular, multi-tenant web applications designed to scale to millions of requests.",
    tags: [
      "Multi-Tenant Architecture",
      "Stripe Integration",
      "Real-Time Sync",
    ],
    color: "bg-[#090a14] border-indigo-500/20",
    cardContent: ,
  },
  {
    id: "ai",
    stepNumber: "03",
    title: "AI Product Development",
    description:
      "Building an AI product is not about just plugging in an API. We fine-tune custom LLM models, engineer vector RAG pipelines, and build streaming chat UIs.",
    tags: [
      "LLM API Integration",
      "Vector RAG Setup",
      "Custom Model Training",
    ],
    color: "bg-[#06100c] border-emerald-500/20",
    cardContent: ,
  },
  {
    id: "mobile",
    stepNumber: "04",
    title: "Mobile App Development",
    description:
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified React Native architectures with native device capabilities.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-[#12080a] border-rose-500/20",
    cardContent: ,
  },
];`;

export const usageDefault = `import { SplitStepper, type SplitStep } from "@/components/custom/blocks/SplitStepperBlock";

${splitSteps}

export default function ServicesSection() {
  return (

  );
}`;

export const usageStickyLeft = `import { SplitStepper, type SplitStep } from "@/components/custom/blocks/SplitStepperBlock";

${splitSteps}

export default function ServicesSectionMirrored() {
  // stickySide moves the sticky card deck to the other column.
  return ;
}`;

export const usageDepth = `import { SplitStepper, type SplitStep } from "@/components/custom/blocks/SplitStepperBlock";

${splitSteps}

export default function DeepDeck() {
  // cardOffset is the vertical gap (px) between stacked cards;
  // cardDepthScale is how much each one shrinks behind the active card.
  return (
    
  );
}`;

export const usageColor = `import { SplitStepper, type SplitStep } from "@/components/custom/blocks/SplitStepperBlock";

${splitSteps}

export default function BrandedSplitStepper() {
  // color drives the active step's rail, number badge, arrow and tint.
  return ;
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/split-stepper
```

## Examples

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          SplitStepper

          steps

          SplitStep[]

          Required

          An array defining the narrative step sequence and paired visual
          showcase cards.

          SplitStepper

          stickySide

          "left" | "right"

          "right"

          Determines which grid column remains sticky as a 3D visual card stack
          versus which column flows as a clickable narrative list.

          SplitStepper

          cardDepthScale

          number

          0.05

          Controls the scaling mathematics. A value of 0.05 means
          each stacked background card shrinks by an additional 5% as it is
          pushed deeper into the 3D deck.

          SplitStepper

          cardOffset

          number

          16

          The absolute pixel distance applied to the vertical Y-axis translation
          of stacked background cards, creating the staggered deck
          effect.

          SplitStepper

          color

          string

          theme primary

          The global theme color applied to active card borders, step index
          badges, glowing pill tags, and indicator arrows. Accepts hex codes or
          Tailwind utility classes.

          SplitStepper

          onStepChange

          (index: number) =&gt; void

          undefined

          Optional callback fired whenever the user clicks on a new narrative
          step in the sequence.

          SplitStepper

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost responsive grid
          wrapper.

          SplitStep

          id

          string

          Required

          A unique identifier string required for safe React list rendering.

          SplitStep

          stepNumber

          string

          Required

          Formatted numerical string (e.g., "01", "02"
          ) rendered inside the step index badge.

          SplitStep

          title

          string

          Required

          Primary headline text displayed prominently on the narrative sequence
          card.

          SplitStep

          description

          string

          Required

          Detailed paragraph text explaining the specific feature or step in the
          workflow.

          SplitStep

          tags

          string[]

          undefined

          An optional array of keyword strings rendered as interactive pill
          badges underneath the description. Glows with the active theme color
          when selected.

          SplitStep

          cardContent

          React.ReactNode

          Required

          The custom JSX/UI payload (e.g., analytics charts, terminals, mockups)
          rendered inside the sticky 3D card for this specific step.

          SplitStep

          color

          string

          "bg-zinc-900 text-white"

          Optional Tailwind background and border color classes applied to the
          specific showcase card surface (e.g.,{" "}
          "bg-[#090a14] border-indigo-500/20").

---

**Component Path:** `[framework]\split-stepper\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
