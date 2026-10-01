export const metadata = docsPageMetadata("card-stack");

# Card Stack

A layered deck of cards featuring fluid drag-to-discard gestures, button-driven directional slide animations, and realistic depth perspective. Users can swipe cards left or right to review and discard them, with the next cards seamlessly stepping forward.

export const usageSwipe = `const ARRIVALS = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    href: "https://makerhunt.example.com",
    icon: (

    ),
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools for modern UI designers.",
    category: "Design",
    date: "2d ago",
    href: "https://designforge.example.com",
    icon: (

    ),
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and automated error triage alerts.",
    category: "Developer Tools",
    date: "3d ago",
    href: "https://devpulse.example.com",
    icon: (

    ),
  },
  {
    id: "draft-craft",
    title: "DraftCraft",
    description: "Collaborative markdown workspace with branch versioning and instant preview.",
    category: "Writing",
    date: "4d ago",
    href: "https://draftcraft.example.com",
    icon: (

    ),
  },
];

export default function SwipeToDiscardDemo() {
  return (
     {
        console.log(\`Dismissed \${item.title} to the \${direction}\`);
      }}
    />
  );
}
`;

export const usageButtons = `const ARRIVALS = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    icon: ,
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools.",
    category: "Design",
    date: "2d ago",
    icon: ,
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and error alerts.",
    category: "Developer Tools",
    date: "3d ago",
    icon: ,
  },
];

export default function ButtonStackDemo() {
  return (
    
  );
}
`;

export const usageLeft = `export default function LeftSlideDemo({ items }: { items: CardStackItem[] }) {
  return (
    
  );
}
`;

export const usageLoop = `export default function InfiniteLoopDemo({ items }: { items: CardStackItem[] }) {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/card-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/card-stack-framer
```

## Examples

## Props Reference

        Prop
        Type
        Default
        Description

        items
        CardStackItem[]
        Required
        Array of card items to display in the stack.

        title
        string
        —
        Optional heading text. If omitted, the counter (e.g. 1 of 8) is placed on the left with navigation buttons on the right.

        swipeToDismiss
        boolean
        false
        Whether to enable dragging and swiping the top card left or right to discard.

        canDismissLastCard
        boolean
        false
        Whether the last card in the stack can be swiped away/dismissed. Defaults to false so the final card stays in place.

        showHeader
        boolean
        true
        Whether to render the header bar (title, counter, and navigation). Set to false for a pure card stack.

        showNavigation
        boolean
        true
        Whether to show header navigation arrow buttons. Set to false for pure swipe mode.

        visibleCards
        number
        3
        Maximum number of cards visually stacked (front card + cards behind).

        slideDirection
        "right" | "left"
        "right"
        Direction the front card slides out when advancing forward via buttons.

        loop
        boolean
        false
        Whether navigation wraps around continuously or stops at the ends.

        defaultIndex
        number
        0
        Initial active index of the stack on mount.

        onCardChange
        (index: number) =&gt; void
        —
        Callback fired whenever the active card changes.

        onDismiss
        (item, direction) =&gt; void
        —
        Callback fired when a card is swiped/dismissed with the item and direction ("left" | "right").

        renderCard
        (item, offset, isTop) =&gt; ReactNode
        —
        Custom render function to replace the default card body.

        cardClassName
        string
        —
        Optional custom className applied to each individual card container.

---

**Component Path:** `[framework]\card-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
