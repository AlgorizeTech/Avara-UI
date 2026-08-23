# Scroll Stack

A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with **GSAP's ScrollTrigger plugin**. As users scroll down the page, feature cards stick to the viewport while the next card slides up to cover them, creating a simulated 3D deck with silky 60fps performance across both light and dark modes.

Four independent scroll-driven layouts share this page, each with its own block file. **Scroll inside a preview box** to drive its ScrollTrigger timeline.

## Simple stack

export const stackItems = `const items = [
  {
    id: "1",
    title: "Real-time Synchronization",
    description:
      "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
    icon: Zap,
    content: (

            sync-stream.ts

            CONNECTED

            &gt; Latency benchmark:
            12ms (Ultra Fast)

            Payload: &#123; user_id: 894, status: &quot;active&quot; &#125;
            240B

            Streaming 1.4k ops/sec
          
          v2.4.0

    ),
  },
  {
    id: "2",
    title: "Layered Architecture",
    description:
      "Build robust systems with separated concerns. Easily swap out databases or auth providers without rewriting your core.",
    icon: Layers,
    content: (

              API

              Presentation Layer
              GraphQL & REST Endpoints

          200 OK

              CORE

              Business Logic Service
              Decoupled Domain Engine

              DB

              Persistence & Cache
              PostgreSQL + Redis Cluster

          0.4ms

    ),
  },
  {
    id: "3",
    title: "Composable UI Blocks",
    description:
      "Don't reinvent the wheel. Utilize our library of pre-built, accessible UI blocks designed to drop into any codebase.",
    icon: Blocks,
    content: (

          Component Gallery
          42 Blocks

                Card
              
              Ready

                Nav
              
              Ready

                ✨

                Scroll Stack
                Interactive GSAP Widget

              Insert

          Accessible (WCAG 2.1)
          100% Tailwind

    ),
  },
  {
    id: "4",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, automated compliance tracking, and granular role-based access control built in out of the box.",
    icon: ShieldCheck,
    content: (

          SECURITY_CHECK // PASSED
          
            AES-256

          SOC2 & ISO-27001 Certified
          Zero trust architecture with continuous runtime vulnerability scanning.

          Encryption Status
          ACTIVE

    ),
  },
];`;

export const usageSimpleGap = `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";

${stackItems}

export default function GappedStack() {
  // Pixel distance between the stacked sticky cards.
  return ;
}`;

### Installation

## Sticky stack

export const stickyItems = `const items = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    contentType: "list",
    description: "Interfaces that look deliberate at every breakpoint.",
    listItems: ["Design tokens", "Component specs", "Motion guidelines"],
  },
  {
    id: "engineering",
    title: "Engineering",
    badge: "Build",
    contentType: "list",
    description: "Production React, shipped behind real tests.",
    listItems: ["Design system", "Accessibility pass", "Performance budget"],
  },
  {
    id: "launch",
    title: "Launch",
    badge: "Go Live",
    contentType: "image",
    description: "Rollout, monitoring and the handover pack.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Launch",
  },
];`;

export const usageSticky = `import { StickyScrollStack } from "@/components/custom/blocks/StickyScrollStackBlock";

${stickyItems}

export default function ServicesSection() {
  return (
    
  );
}`;

export const usageStickyGeometry = `import { StickyScrollStack } from "@/components/custom/blocks/StickyScrollStackBlock";

${stickyItems}

export default function TunedStickyStack() {
  // \`scaleStep\` shrinks each covered card; \`stackOffsetStep\` is the pixel
  // offset that keeps the earlier headers peeking out.
  return ;
}`;

### Installation

### More examples

## Split stack

export const splitItems = `// Card bodies — the four screens the preview renders.
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

  {
    id: "landing",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens. We engineer high-converting layouts with scroll-triggered GSAP animations that capture attention.",
    tags: ["Conversion Focused", "Figma To Code", "Mobile First"],
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
    cardContent: ,
  },
  {
    id: "saas",
    stepNumber: "02",
    title: "SaaS Product Development",
    description:
      "Every successful SaaS product starts with a complex problem. We build modular, multi-tenant web applications designed to scale cleanly to millions of requests.",
    tags: [
      "Multi-Tenant Architecture",
      "Stripe Integration",
      "Real-Time Sync",
    ],
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
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
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
    cardContent: ,
  },
  {
    id: "mobile",
    stepNumber: "04",
    title: "Mobile App Development",
    description:
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified architectures with silky native device performance.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
    cardContent: ,
  },
];`;

export const usageSplitRight = `import { SplitScrollStack } from "@/components/custom/blocks/SplitScrollStackBlock";

${splitItems}

export default function PinnedRightStack() {
  return ;
}`;

export const usageSplitLeft = `import { SplitScrollStack } from "@/components/custom/blocks/SplitScrollStackBlock";

${splitItems}

export default function PinnedLeftStack() {
  return (
    
  );
}`;

### Installation

### More examples

## Horizontal stack

export const railSteps = `const steps = [
  { id: "1", number: "01", title: "Understand", description: "Map the problem." },
  { id: "2", number: "02", title: "Design", description: "Shape the solution." },
  { id: "3", number: "03", title: "Build", description: "Ship it behind tests." },
  { id: "4", number: "04", title: "Measure", description: "Watch it in the wild." },
];`;

export const usageHorizontal = `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

${railSteps}

export default function ProcessRail() {
  return (
    
  );
}`;

export const usageHorizontalShort = `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

${railSteps}

export default function ShortRail() {
  // Fewer steps means a shorter pinned scroll distance.
  return ;
}`;

### Installation

### More examples

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          ScrollStack

          items

          StackItem[]

          Required

          An array of feature card objects defining the sequential stack
          sequence.

          ScrollStack

          depthScale

          number

          0.05

          Controls the scaling mathematics. A value of 0.05 means
          each background card shrinks by 5% as the next card stacks over it via
          GSAP.

          ScrollStack

          cardGap

          number

          24

          The vertical pixel distance applied to the sticky top offset of each
          subsequent card, creating a staggered folder/deck appearance at the
          top of the viewport.

          ScrollStack

          scroller

          string | Element | null

          window

          Optional scrolling viewport target passed directly to GSAP's{" "}
          ScrollTrigger. Essential when rendering the stack inside
          custom overflow containers, modals, or preview boxes instead of the
          native window root.

          ScrollStack

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost scrolling
          container wrapper.

          StackItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          GSAP key mapping.

          StackItem

          title

          string

          Required

          Primary headline text displayed prominently on the left or top side of
          the card.

          StackItem

          description

          string

          Required

          Detailed paragraph text explaining the feature, displayed beneath the
          headline.

          StackItem

          icon

          React.ElementType

          undefined

          Optional Lucide React icon rendered inside an adaptive badge box above
          the title.

          StackItem

          content

          React.ReactNode

          undefined

          Optional custom JSX/UI payload (e.g., code blocks, interactive graphs,
          mockups) rendered on the right half of the card on desktop viewports.

          StackItem

          color

          string

          "bg-white dark:bg-zinc-900..."

          Optional Tailwind background, text, and border classes applied to the
          card surface (e.g., "bg-indigo-600 text-white"). Omitting
          this allows the card to adapt automatically to light and dark modes.

---

**Component Path:** `[framework]\scroll-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
