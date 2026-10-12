export const metadata = docsPageMetadata("scroll-stack");

# Scroll Stack

A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with **GSAP's ScrollTrigger plugin**. As users scroll down the page, feature cards stick to the viewport while the next card slides up to cover them, creating a simulated 3D deck with silky 60fps performance across both light and dark modes.

Five independent scroll-driven layouts share this page, each with its own block file. **Scroll inside a preview box** to drive its ScrollTrigger timeline.

## Fan stack

Overlapping cards in a tilted diagonal cascade, each with a photo hanging off its edge. As the stack scrolls into view the cards are dealt out of one pile into place, scrubbed by the scrollbar. It is built from small primitives, so a card holds whatever your data has.

The cascade is a container query, not a breakpoint: under 768px of width the cards become a sticky stack instead — each one sticks near the top and the next slides over it, its header left peeking. Drag the preview narrower to see it. Under `prefers-reduced-motion` the cascade simply shows, without the deal.

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/fan-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/fan-stack-motion
```

## Simple stack

export const stackItems = `const items: StackItem[] = [
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

export const usageSimpleGap = `import { ScrollStack, type StackItem } from "@/components/custom/blocks/ScrollStackBlock";

${stackItems}

export default function GappedStack() {
  // Pixel distance between the stacked sticky cards.
  return ;
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/scroll-stack
```

## Sticky stack

export const stickyItems = `import { Palette, Smartphone, Sparkles } from "lucide-react";

const items: ScrollStackItem[] = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    icon: ,
    contentType: "list",
    description:
      "Crafting intuitive, pixel-perfect interfaces designed to engage and convert real users.",
    listItems: [
      "Website / Landing Pages",
      "Mobile Apps (iOS & Android)",
      "Web App / SaaS Dashboards",
      "Comprehensive Design Systems",
    ],
    buttonText: "View UI Showcase",
  },
  {
    id: "branding",
    title: "Branding & Identity",
    badge: "Brand Strategy",
    icon: ,
    contentType: "split",
    description:
      "Building memorable, iconic brand identities that stand out in crowded markets.",
    listItems: [
      "Logo & Visual Assets",
      "Color Palettes & Typography",
      "Brand Guidelines & Tone",
    ],
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    imageAlt: "Misty mountain forest nature landscape",
    buttonText: "Explore Branding",
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Development",
    badge: "Engineering",
    icon: ,
    contentType: "image",
    description:
      "High-performance, scalable web applications built with Next.js, React, and Tailwind CSS.",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    imageAlt: "Golden mountain valley sunset nature landscape",
    buttonText: "Tech Stack Specs",
  },
  {
    id: "backend",
    title: "Backend Architecture",
    badge: "Infrastructure",
    icon: ,
    contentType: "image",
    description:
      "Resilient cloud architectures, serverless deployments, and real-time database indexing.",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
    imageAlt: "Lush green forest nature landscape",
    buttonText: "View Cloud Specs",
  },
];`;

export const usageSticky = `import {
  StickyScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/StickyScrollStackBlock";

${stickyItems}

export default function ServicesSection() {
  return (
    
  );
}`;

export const usageStickyGeometry = `import {
  StickyScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/StickyScrollStackBlock";

${stickyItems}

export default function TunedStickyStack() {
  // \`scaleStep\` shrinks each covered card; \`stackOffsetStep\` is the pixel
  // offset that keeps the earlier headers peeking out.
  return (
    
  );
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/sticky-scroll-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/sticky-scroll-stack-motion
```

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

const items: ScrollStackItem[] = [
  {
    id: "landing",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens. We engineer high-converting layouts with scroll-triggered GSAP animations that capture attention.",
    tags: ["Conversion Focused", "Figma To Code", "Mobile First"],
    color: "bg-card border-border text-card-foreground",
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
    color: "bg-card border-border text-card-foreground",
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
    color: "bg-card border-border text-card-foreground",
    cardContent: ,
  },
  {
    id: "mobile",
    stepNumber: "04",
    title: "Mobile App Development",
    description:
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified architectures with silky native device performance.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-card border-border text-card-foreground",
    cardContent: ,
  },
];`;

export const usageSplitRight = `import {
  SplitScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/SplitScrollStackBlock";

${splitItems}

export default function PinnedRightStack() {
  return ;
}`;

export const usageSplitLeft = `import {
  SplitScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/SplitScrollStackBlock";

${splitItems}

export default function PinnedLeftStack() {
  return (
    
  );
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/split-scroll-stack
```

### More examples

export const railSteps = `import {
  Compass,
  Cpu,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    id: "1",
    title: "Understand",
    description:
      "Business goals and strategies, persona and painpoints, competitors.",
    icon: ,
  },
  {
    id: "2",
    title: "Define",
    description:
      "Strategy, information architecture, user flows, moodboard, visual direction.",
    icon: ,
  },
  {
    id: "3",
    title: "Ideate",
    description: "Brainstorming, solution propose, sketching, wireframing.",
    icon: ,
  },
  {
    id: "4",
    title: "Design",
    description: "Style guide, design system, interface design",
    icon: ,
  },
  {
    id: "5",
    title: "Test",
    description: "User testing, feedback collection and implementation",
    icon: ,
  },
  {
    id: "6",
    title: "Approval",
    description: "Submission for client approval",
    icon: ,
  },
  {
    id: "7",
    title: "Delivery",
    description: "Asset preparation, assets exports.",
    icon: ,
  },
];`;

export const usageHorizontal = `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

${railSteps}

export default function ProcessRail() {
  return ;
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/horizontal-scroll-stack
```

export const usageHorizontalShort = `import { HorizontalRail } from "@/components/custom/blocks/HorizontalRailBlock";

${railSteps}

export default function ProcessRailTrack() {
  // Items slide continuously across the viewport without stacking
  return ;
}`;

### More examples

`HorizontalRail` is its own item, so it installs on its own:

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/horizontal-rail
```

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

          FanStack

          children

          ReactNode

          Required

          The FanStackCards, in order. Any number works; the cascade spreads them across the width.

          FanStack

          scrollerRef

          {"RefObject"}

          window

          The element that scrolls, when the stack sits inside a scroll container rather than the page.

          FanStack

          scrub

          number

          0.6

          Seconds the cards take to catch up with the scrollbar. 0 locks them to it.

          FanStack

          stickyTop

          number

          16

          Below 768px of width, the gap in px above the first stuck card. Raise it to clear a fixed header.

          FanStackCard

          tone

          "muted" | "light" | "accent"

          By position

          The card's surface, tinted from --primary. Cards step through the three in order when left unset.

          FanStackThumb

          side

          "right" | "left" | "top"

          By position

          Which edge the photo hangs off in the cascade. Below 768px of width it is a small photo in the card's top corner.

          FanStackPoint

          icon

          ReactNode

          Check mark

          Replaces the check mark ahead of the point.

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

          "bg-card border-border..."

          Optional Tailwind background, text, and border classes applied to the
          card surface (e.g., "bg-indigo-600 text-white"). Omitting
          this allows the card to adapt automatically to light and dark modes.

---

**Component Path:** `[framework]\scroll-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
