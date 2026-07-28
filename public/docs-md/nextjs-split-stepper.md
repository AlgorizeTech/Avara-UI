# Split-Stack Stepper

A high-impact, interactive split-screen layout engineered exclusively with **GSAP**. One side renders a narrative sequence of feature cards with glowing pill badges, while the opposite side maintains a sticky visual showcase container.

Unlike basic tab replacements, this engine applies dynamic mathematical depth tweens via GreenSock to **stack previous visual cards on top of each other in a 3D deck format** as the user progresses through the narrative.

## Interactive Showcase

Use the control panel below to swap the sticky showcase between the **Left** or **Right** side of the layout. Click any step in the scrolling sequence to see the GSAP card deck animate and stack in real-time.

## Installation

### Dependencies

This component relies exclusively on **GSAP** for all 3D card depth scaling, stacking translations, and indicator animations.

```bash
npm install gsap lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/SplitStepperBlock.tsx.

## Usage Architecture

The `` component automatically orchestrates the responsive grid layout. You simply provide an array of objects containing your text sequence and custom visual JSX payloads for the stacked cards.

```tsx

export default function ServicesSection() {
  const steps = [
    {
      id: "landing",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts with engaging GSAP animations.",
      tags: ["Conversion Focused", "Figma To Code"],
      cardContent: Custom Visual 1,
    },
    {
      id: "saas",
      stepNumber: "02",
      title: "SaaS Development",
      description: "Modular, multi-tenant web applications designed to scale to millions of requests.",
      tags: ["Multi-Tenant Architecture", "Real-Time Sync"],
      cardContent: Custom Visual 2,
    },
  ];

  return (

  );
}
```

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
          of stacked background cards via GSAP, creating the staggered deck
          effect.

          SplitStepper

          color

          string

          "#FFAB1D"

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

          A unique identifier string required for safe React list rendering and
          GSAP key mapping.

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

**Component Path:** `nextjs\split-stepper\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
