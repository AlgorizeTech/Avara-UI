---
title: "Shadcn Scroll Stack"
description: "A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with GSAP's ScrollTrigger plugin. Shadcn/ui with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/scroll-stack
---

# Shadcn Scroll Stack

A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with **GSAP's ScrollTrigger plugin**. As users scroll down the page, feature cards stick to the viewport while the next card slides up to cover them, creating a simulated 3D deck with silky 60fps performance across both light and dark modes.

Five independent scroll-driven layouts share this page, each with its own block file. **Scroll inside a preview box** to drive its ScrollTrigger timeline.

## For AI agents

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/scroll-stack

**When to use it.** Scroll-driven card layouts built on GSAP ScrollTrigger: cards that stack, fan out, pin beside a column or travel sideways as the visitor scrolls. Six layouts, each a different structure.

**When to use something else:**

- [Modern Scroll Stack](https://avaraui.com/docs/reactjs/modern-scroll-stack): for a service-card stack with a different look.

**Gotchas:**

- Each layout is its own registry item: install only the chosen one, not the whole page.
- Install the GSAP build. A Motion build exists for some layouts; never install both builds of one layout.

### The 6 variants

1. **Fan stack** (`fan-stack`): Three numbered steps dealt from one pile into a tilted cascade as the stack scrolls into view.
   - Live: https://avaraui.com/view/scroll-stack/fan-stack
   - Best for: a short numbered sequence: steps, phases, a three-part system
   - Avoid if: you have many steps or long copy per step (it suits a short sequence)
   - Traits: GSAP, numbered cards, tilted cascade, photo can hang off a card edge
   - Install: `npx shadcn@latest add @avara-ui/fan-stack`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#fan-stack
2. **Scroll stack** (`scroll-stack`): Cards stick to the viewport and the next slides up over them, offset by a pixel gap so titles stay readable.
   - Live: https://avaraui.com/view/scroll-stack/scroll-stack
   - Best for: step-by-step feature walkthroughs
   - Avoid if: each step needs a different kind of content (the sticky stack takes lists, images and splits)
   - Traits: GSAP ScrollTrigger, 3D deck, adjustable card gap, per-card background colour
   - Install: `npx shadcn@latest add @avara-ui/scroll-stack`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#card-gap
3. **Sticky scroll stack** (`sticky-stack`): A headed section where each card sticks and the next overlaps it; a card body can be a list, image, split or custom.
   - Live: https://avaraui.com/view/scroll-stack/sticky-stack
   - Best for: feature sections with varied content per step
   - Avoid if: every step looks the same (the plain scroll stack is simpler)
   - Traits: GSAP, headed section, list, image, split or custom bodies, tunable scale and offset
   - Install: `npx shadcn@latest add @avara-ui/sticky-scroll-stack`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#sticky-stack
4. **Split scroll stack** (`split-stack`): Two columns: one column pins while the cards stack and advance in the other; it pins left or right.
   - Live: https://avaraui.com/view/scroll-stack/split-stack
   - Best for: feature tours that pair narrative with visuals
   - Avoid if: you want a single full-width column
   - Traits: GSAP, two columns, pinned side (left or right)
   - Install: `npx shadcn@latest add @avara-ui/split-scroll-stack`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#pinned-right
5. **Horizontal scroll stack** (`horizontal-stack`): The section pins and vertical scrolling turns into horizontal travel across the cards, with a progress indicator.
   - Live: https://avaraui.com/view/scroll-stack/horizontal-stack
   - Best for: process timelines and step sequences
   - Avoid if: you do not want the page held in place while the cards move
   - Traits: GSAP, pinned section, vertical-to-horizontal scroll, progress indicator
   - Install: `npx shadcn@latest add @avara-ui/horizontal-scroll-stack`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#horizontal-scroll-stack
6. **Horizontal rail** (`horizontal-rail`): A horizontal rail of cards that slide across the viewport without stacking.
   - Live: https://avaraui.com/view/scroll-stack/horizontal-rail
   - Best for: showcasing products, media cards or other horizontal content
   - Avoid if: you want cards that pile on top of each other
   - Traits: horizontal, no stacking, navigation controls
   - Install: `npx shadcn@latest add @avara-ui/horizontal-rail`
   - Docs: https://avaraui.com/docs/nextjs/scroll-stack#horizontal-rail-track

## Fan stack

Overlapping cards in a tilted diagonal cascade, each with a photo hanging off its edge. As the stack scrolls into view the cards are dealt out of one pile into place, scrubbed by the scrollbar. It is built from small primitives, so a card holds whatever your data has.

### Fan stack

Three numbered steps dealt from a pile into a cascade as you scroll.

- `scrollerRef` points the scroll trigger at the box it scrolls in. Leave it out on a normal page and the window drives the deal.
- `tone` on a card picks its surface — `muted`, `light` or `accent`, all tinted from your primary colour. By default the cards step through them in order.
- `side` on `FanStackThumb` hangs the photo off the card's `right`, `left` or `top` edge in the cascade.

```tsx
import {
  FanStack,
  FanStackCard,
  FanStackDescription,
  FanStackPoint,
  FanStackPoints,
  FanStackStep,
  FanStackThumb,
  FanStackTitle,
} from "@/components/custom/blocks/FanStackBlock";
import { useRef } from "react";

const steps = [
  {
    id: "criteria",
    step: "01",
    name: "Criteria",
    body: "What a qualified candidate looks like for this role: the must-haves, the deal-breakers, and the details your client actually cares about.",
    points: [
      "Yes-or-no must-have questions",
      "A question set for each role",
      "Trigger questions decide who gets interviewed",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1768055105012-4c53791b2877?q=80&w=800&auto=format&fit=crop",
      alt: "A hand ticking off items on a handwritten checklist",
    },
  },
  {
    id: "screening",
    step: "02",
    name: "Screening",
    body: "Every applicant uploads a CV and answers the same yes-or-no questions. Anyone who misses a must-have stops here, with a polite reply.",
    points: [
      "The same questions for every applicant",
      "CVs collected up front",
      "A polite reply when a must-have is missed",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=800&auto=format&fit=crop",
      alt: "A recruiter reading a candidate's CV",
    },
  },
  {
    id: "interview",
    step: "03",
    name: "Interview",
    body: "Qualified candidates go straight into a structured interview, at any hour. You get the recording and every answer.",
    points: ["Starts right after screening", "Any device, any hour", "Recorded for your review"],
    photo: {
      src: "https://images.unsplash.com/photo-1758691463620-188ca7c1a04f?q=80&w=800&auto=format&fit=crop",
      alt: "A video call on a laptop screen",
    },
  },
];

export default function HiringFlowStack() {
  // The stack scrolls inside this box. On a full page, drop the box and
  // `scrollerRef` and the window drives it.
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollerRef} className="h-[680px] w-full overflow-y-auto overflow-x-hidden bg-background">
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <FanStack scrollerRef={scrollerRef}>
          {steps.map((step) => (
            <FanStackCard key={step.id}>
              <FanStackTitle>
                <FanStackStep>{step.step}</FanStackStep> {step.name}
              </FanStackTitle>
              <FanStackDescription>{step.body}</FanStackDescription>
              <FanStackPoints>
                {step.points.map((point) => (
                  <FanStackPoint key={point}>{point}</FanStackPoint>
                ))}
              </FanStackPoints>
              <FanStackThumb>
                <img src={step.photo.src} alt={step.photo.alt} width={800} height={618} loading="lazy" />
              </FanStackThumb>
            </FanStackCard>
          ))}
        </FanStack>

        <p className="mx-auto mt-10 max-w-xl text-center text-[1.0625rem] text-muted-foreground">
          One first round instead of three handoffs.
        </p>
      </section>
    </div>
  );
}
```

The cascade is a container query, not a breakpoint: under 768px of width the cards become a sticky stack instead — each one sticks near the top and the next slides over it, its header left peeking. Drag the preview narrower to see it. Under `prefers-reduced-motion` the cascade simply shows, without the deal.

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/fan-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/fan-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/fan-stack-motion.json
```

## Simple stack

### Card gap

- `cardGap={64}` is the pixel offset between stacked cards, which is what keeps the titles underneath readable.
- `color="#1e3a8a"` on a StackItem sets its unique background color (supports hex codes, CSS colors, or Tailwind classes).

```tsx
import { ScrollStack, type StackItem } from "@/components/custom/blocks/ScrollStackBlock";

const items: StackItem[] = [
  {
    id: "1",
    title: "Real-time Synchronization",
    description:
      "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
    icon: Zap,
    color: "#1e3a8a",
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-muted text-foreground rounded-2xl border border-border shadow-sm relative overflow-hidden group">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-muted-foreground ml-2">sync-stream.ts</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-color,var(--primary))]/15 text-[var(--theme-color,var(--primary))] font-semibold border border-[var(--theme-color,var(--primary))]/30">
            CONNECTED
          </span>
        </div>

        <div className="my-4 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>&gt; Latency benchmark:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">12ms (Ultra Fast)</span>
          </div>
          <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
            <div className="bg-[var(--theme-color,var(--primary))] h-full w-[88%] rounded-full animate-pulse" />
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-[11px] text-foreground/80 flex items-center justify-between shadow-xs">
            <span>Payload: &#123; user_id: 894, status: &quot;active&quot; &#125;</span>
            <span className="text-foreground/40">240B</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--theme-color,var(--primary))] animate-ping" />
            <span>Streaming 1.4k ops/sec</span>
          </div>
          <span className="text-[11px] font-semibold text-foreground/70">v2.4.0</span>
        </div>
      </div>
    ),
  },
  {
    id: "2",
    title: "Layered Architecture",
    description:
      "Build robust systems with separated concerns. Easily swap out databases or auth providers without rewriting your core.",
    icon: Layers,
    color: "#581c87",
    content: (
      <div className="w-full h-full flex flex-col justify-center gap-3 p-6 bg-muted rounded-2xl border border-border text-foreground relative overflow-hidden">
        <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-center text-[var(--theme-color,var(--primary))] font-semibold text-xs">
              API
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Presentation Layer</div>
              <div className="text-[10px] text-muted-foreground">GraphQL & REST Endpoints</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold">200 OK</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold flex items-center justify-center text-xs shadow-md">
              CORE
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Business Logic Service</div>
              <div className="text-[10px] text-[var(--theme-color,var(--primary))] font-medium">Decoupled Domain Engine</div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[var(--theme-color,var(--primary))] animate-pulse" />
        </div>

        <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
              DB
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Persistence & Cache</div>
              <div className="text-[10px] text-muted-foreground">PostgreSQL + Redis Cluster</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">0.4ms</span>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "Composable UI Blocks",
    description:
      "Don't reinvent the wheel. Utilize our library of pre-built, accessible UI blocks designed to drop into any codebase.",
    icon: Blocks,
    color: "#065f46",
    content: (
      <div className="w-full h-full p-6 bg-muted rounded-2xl border border-border text-foreground flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">Component Gallery</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-card border border-border text-[var(--theme-color,var(--primary))] font-semibold">42 Blocks</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-card border border-border flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 rounded-md bg-[var(--theme-color,var(--primary))]/10 flex items-center justify-center text-[var(--theme-color,var(--primary))] text-[10px] font-semibold">
                Card
              </div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
            </div>
            <div className="w-3/4 h-2 bg-foreground/15 rounded-full" />
            <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
          </div>

          <div className="p-3 rounded-xl bg-card border border-border flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold">
                Nav
              </div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
            </div>
            <div className="w-3/4 h-2 bg-foreground/15 rounded-full" />
            <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
          </div>

          <div className="col-span-2 p-3.5 rounded-xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold flex items-center justify-center text-xs shadow-md">
                ✨
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Scroll Stack</div>
                <div className="text-[10px] text-[var(--theme-color,var(--primary))]">Interactive GSAP Widget</div>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold text-[10px] shadow-xs">
              Insert
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-2.5">
          <span>Accessible (WCAG 2.1)</span>
          <span className="text-[var(--theme-color,var(--primary))] font-semibold">100% Tailwind</span>
        </div>
      </div>
    ),
  },
  {
    id: "4",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, automated compliance tracking, and granular role-based access control built in out of the box.",
    icon: ShieldCheck,
    color: "#9f1239",
    content: (
      <div className="w-full h-full p-6 bg-muted rounded-2xl border border-border text-foreground flex flex-col justify-between items-center text-center">
        <div className="w-full flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-mono text-muted-foreground">SECURITY_CHECK // PASSED</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold">
            AES-256
          </span>
        </div>

        <div className="my-3 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-[var(--theme-color,var(--primary))]/10 border-2 border-[var(--theme-color,var(--primary))]/30 flex items-center justify-center shadow-lg relative">
            <ShieldCheck className="w-10 h-10 text-[var(--theme-color,var(--primary))]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-muted" />
          </div>
          <h4 className="text-sm font-semibold mt-3 text-foreground">SOC2 & ISO-27001 Certified</h4>
          <p className="text-[11px] text-muted-foreground mt-1 max-w-[220px]">Zero trust architecture with continuous runtime vulnerability scanning.</p>
        </div>

        <div className="w-full p-2.5 rounded-xl bg-card border border-border flex items-center justify-between text-xs font-mono shadow-xs">
          <span className="text-muted-foreground">Encryption Status</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ACTIVE</span>
        </div>
      </div>
    ),
  },
];

export default function GappedStack() {
  // Pixel distance between the stacked sticky cards.
  return <ScrollStack items={items} cardGap={64} />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/scroll-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/scroll-stack
```

## Sticky stack

### Sticky stack

A headed section where each card sticks and the next overlaps it.

- `contentType` on an item picks its body: `list`, `image`, `split` or `custom`.

```tsx
import {
  StickyScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/StickyScrollStackBlock";

import { Palette, Smartphone, Sparkles } from "lucide-react";

const items: ScrollStackItem[] = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    icon: <Palette className="w-5 h-5" />,
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
    icon: <Sparkles className="w-5 h-5" />,
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
    icon: <Smartphone className="w-5 h-5" />,
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
    icon: <Smartphone className="w-5 h-5" />,
    contentType: "image",
    description:
      "Resilient cloud architectures, serverless deployments, and real-time database indexing.",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
    imageAlt: "Lush green forest nature landscape",
    buttonText: "View Cloud Specs",
  },
];

export default function ServicesSection() {
  return (
    <StickyScrollStack
      items={items}
      headerTitle="Our Core Capabilities"
      headerSubtitle="We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience."
      headerContentType="text-button"
      headerButtonText="Request free audit"
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/sticky-scroll-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/sticky-scroll-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/sticky-scroll-stack-motion.json
```

### More examples

### Stack geometry

- `scaleStep={0.08}` is how far each covered card recedes.
- `stackOffsetStep={28}` is the pixel offset that keeps earlier headers peeking out.

```tsx
import {
  StickyScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/StickyScrollStackBlock";

import { Palette, Smartphone, Sparkles } from "lucide-react";

const items: ScrollStackItem[] = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    icon: <Palette className="w-5 h-5" />,
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
    icon: <Sparkles className="w-5 h-5" />,
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
    icon: <Smartphone className="w-5 h-5" />,
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
    icon: <Smartphone className="w-5 h-5" />,
    contentType: "image",
    description:
      "Resilient cloud architectures, serverless deployments, and real-time database indexing.",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
    imageAlt: "Lush green forest nature landscape",
    buttonText: "View Cloud Specs",
  },
];

export default function TunedStickyStack() {
  // `scaleStep` shrinks each covered card; `stackOffsetStep` is the pixel
  // offset that keeps the earlier headers peeking out.
  return (
    <StickyScrollStack
      items={items}
      scaleStep={0.08}
      stackOffsetStep={28}
      headerContentType="image-button"
      headerImageUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg"
      headerTitle="Our Core Capabilities"
      headerSubtitle="We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience."
      headerButtonText="Request free audit"
    />
  );
}
```

## Split stack

### Pinned right

A two-column layout: the right column pins while the left scrolls its deck past it.

- `stickySide="right"` pins the right-hand column so cards stack on the right.

```tsx
import {
  SplitScrollStack,
  type ScrollStackItem,
} from "@/components/custom/blocks/SplitScrollStackBlock";

// Card bodies — the four screens the preview renders.
const MockLandingView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-2">
      <LayoutTemplate className="w-8 h-8 text-amber-500 dark:text-amber-400" />
      <span className="text-lg font-semibold text-foreground tracking-tight">
        High-Converting UI
      </span>
    </div>
    <div className="w-full h-24 rounded-xl bg-foreground/5 border border-border p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
      <div className="w-2/3 h-3 bg-foreground/20 rounded-full" />
      <div className="w-1/2 h-2.5 bg-foreground/10 rounded-full" />
      <div className="flex gap-2 mt-auto">
        <div className="h-6 w-20 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-semibold text-amber-600 dark:text-amber-300">
          CTA Button
        </div>
        <div className="h-6 w-16 rounded-md bg-foreground/10" />
      </div>
    </div>
  </div>
);

const MockSaaSView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <BarChart3 className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
      <span className="text-lg font-semibold text-foreground tracking-tight">
        SaaS Dashboard Architecture
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 flex flex-col justify-between">
        <span className="text-[10px] text-indigo-600 dark:text-indigo-300 font-mono uppercase">
          MRR Growth
        </span>
        <span className="text-xl font-bold text-foreground">+148.2%</span>
      </div>
      <div className="h-20 rounded-xl bg-foreground/5 border border-border p-3 flex flex-col justify-between">
        <span className="text-[10px] text-muted-foreground font-mono uppercase">
          Active Users
        </span>
        <span className="text-xl font-bold text-foreground">24,892</span>
      </div>
    </div>
  </div>
);

const MockAIView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <Cpu className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
      <span className="text-lg font-semibold text-foreground tracking-tight">
        AI & LLM Integration
      </span>
    </div>
    <div className="w-full rounded-xl bg-foreground/5 border border-emerald-500/30 p-3.5 font-mono text-xs text-emerald-600 dark:text-emerald-400/90 flex flex-col gap-1.5 shadow-sm">
      <div className="flex items-center justify-between text-[10px] text-emerald-600/80 dark:text-emerald-500/60 border-b border-emerald-500/20 pb-1">
        <span>TERMINAL // AI_ENGINE</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <p className="mt-1 text-[11px]">&gt; Initializing RAG pipeline...</p>
      <p className="text-[11px]">&gt; Vector embeddings synced (1.2ms)</p>
      <p className="text-emerald-700 dark:text-white font-semibold animate-pulse">
        &gt; Ready for token streaming_
      </p>
    </div>
  </div>
);

const MockMobileView = () => (
  <div className="w-full h-full flex items-center justify-between gap-4">
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <Smartphone className="w-8 h-8 text-rose-500 dark:text-rose-400" />
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Mobile First
        </span>
      </div>
      <p className="text-xs text-muted-foreground max-w-[180px] leading-relaxed">
        Silky 60fps native performance across iOS and Android ecosystems.
      </p>
    </div>
    <div className="w-28 h-36 rounded-2xl bg-foreground/5 border-2 border-foreground/20 p-2 flex flex-col gap-2 shadow-lg flex-shrink-0 relative">
      <div className="w-8 h-1.5 bg-foreground/20 rounded-full mx-auto" />
      <div className="w-full h-12 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 mt-1 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-rose-500 dark:text-rose-400 animate-spin" />
      </div>
      <div className="w-3/4 h-2 bg-foreground/15 rounded-full mt-auto" />
      <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
    </div>
  </div>
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
    cardContent: <MockLandingView />,
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
    cardContent: <MockSaaSView />,
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
    cardContent: <MockAIView />,
  },
  {
    id: "mobile",
    stepNumber: "04",
    title: "Mobile App Development",
    description:
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified architectures with silky native device performance.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-card border-border text-card-foreground",
    cardContent: <MockMobileView />,
  },
];

export default function PinnedRightStack() {
  return <SplitScrollStack items={items} stickySide="right" />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/split-scroll-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/split-scroll-stack
```

### More examples

### Horizontal Scroll Stack

The section pins and vertical scroll is translated into horizontal travel.

- `items` become the cards on the rail, in order.

```tsx
import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

import {
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
    icon: <Compass className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Define",
    description:
      "Strategy, information architecture, user flows, moodboard, visual direction.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Ideate",
    description: "Brainstorming, solution propose, sketching, wireframing.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Design",
    description: "Style guide, design system, interface design",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Test",
    description: "User testing, feedback collection and implementation",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Approval",
    description: "Submission for client approval",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "7",
    title: "Delivery",
    description: "Asset preparation, assets exports.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

export default function ProcessRail() {
  return <HorizontalScrollStack items={steps} />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/horizontal-scroll-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/horizontal-scroll-stack
```

### More examples

### Shorter Rail

- `items` slide continuously across the viewport without stacking.

```tsx
import { HorizontalRail } from "@/components/custom/blocks/HorizontalRailBlock";

import {
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
    icon: <Compass className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Define",
    description:
      "Strategy, information architecture, user flows, moodboard, visual direction.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Ideate",
    description: "Brainstorming, solution propose, sketching, wireframing.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Design",
    description: "Style guide, design system, interface design",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Test",
    description: "User testing, feedback collection and implementation",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Approval",
    description: "Submission for client approval",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "7",
    title: "Delivery",
    description: "Asset preparation, assets exports.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

export default function ProcessRailTrack() {
  // Items slide continuously across the viewport without stacking
  return <HorizontalRail items={steps} />;
}
```

`HorizontalRail` is its own item, so it installs on its own:

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/horizontal-rail.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/horizontal-rail
```

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

### Fluid Animations

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

### Highly Customizable

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

### Responsive Design

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

### Accessible

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

### Animation Performance

Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

### State Management

When triggering animations via state changes, ensure you wrap state updates in `startTransition` or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `FanStack` | `children` | `ReactNode` | Required | The `FanStackCard`s, in order. Any number works; the cascade spreads them across the width. |
| `FanStack` | `scrollerRef` | `RefObject<HTMLElement \| null>` | `window` | The element that scrolls, when the stack sits inside a scroll container rather than the page. |
| `FanStack` | `scrub` | `number` | `0.6` | Seconds the cards take to catch up with the scrollbar. `0` locks them to it. |
| `FanStack` | `stickyTop` | `number` | `16` | Below 768px of width, the gap in px above the first stuck card. Raise it to clear a fixed header. |
| `FanStackCard` | `tone` | `"muted" \| "light" \| "accent"` | By position | The card's surface, tinted from `--primary`. Cards step through the three in order when left unset. |
| `FanStackThumb` | `side` | `"right" \| "left" \| "top"` | By position | Which edge the photo hangs off in the cascade. Below 768px of width it is a small photo in the card's top corner. |
| `FanStackPoint` | `icon` | `ReactNode` | Check mark | Replaces the check mark ahead of the point. |
| `ScrollStack` | `items` | `StackItem[]` | Required | An array of feature card objects defining the sequential stack sequence. |
| `StackItem` | `color` | `string` | `undefined` | Custom background color for this specific card. Accepts hex color codes (e.g. `#1e3a8a`), CSS colors (rgb, hsl), or Tailwind utility classes. |
| `ScrollStack` | `depthScale` | `number` | `0.05` | Controls the scaling mathematics. A value of `0.05` means each background card shrinks by 5% as the next card stacks over it via GSAP. |
| `ScrollStack` | `cardGap` | `number` | `24` | The vertical pixel distance applied to the sticky top offset of each subsequent card, creating a staggered folder/deck appearance at the top of the viewport. |
| `ScrollStack` | `scroller` | `string \| Element \| null` | `window` | Optional scrolling viewport target passed directly to GSAP's `ScrollTrigger`. Essential when rendering the stack inside custom overflow containers, modals, or preview boxes instead of the native window root. |
| `ScrollStack` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost scrolling container wrapper. |
| `StackItem` | `id` | `string` | Required | A unique identifier string required for safe React list rendering and GSAP key mapping. |
| `StackItem` | `title` | `string` | Required | Primary headline text displayed prominently on the left or top side of the card. |
| `StackItem` | `description` | `string` | Required | Detailed paragraph text explaining the feature, displayed beneath the headline. |
| `StackItem` | `icon` | `React.ElementType` | `undefined` | Optional Lucide React icon rendered inside an adaptive badge box above the title. |
| `StackItem` | `content` | `React.ReactNode` | `undefined` | Optional custom JSX/UI payload (e.g., code blocks, interactive graphs, mockups) rendered on the right half of the card on desktop viewports. |
| `StackItem` | `color` | `string` | `"bg-card border-border..."` | Optional Tailwind background, text, and border classes applied to the card surface (e.g., `"bg-indigo-600 text-white"`). Omitting this allows the card to adapt automatically to light and dark modes. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/scroll-stack
