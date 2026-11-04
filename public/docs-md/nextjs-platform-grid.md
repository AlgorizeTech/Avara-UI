---
title: "Platform Grid"
description: "A hairline feature grid of icon tiles and larger 2×2 feature cards, with a wave entrance on scroll, a pointer spotlight and per-tile hover tilt."
url: https://avaraui.com/docs/nextjs/platform-grid
---

# Platform Grid

Everything a product offers, as one hairline grid: small tiles with an icon and a name, and a few 2×2 features that show a piece of the product on a tilting card. Tiles pack densely, so the features stay square whether the grid has eight columns or two. When the section first scrolls into view the tiles rise in as a wave from the centre; after that a soft spotlight follows the pointer across the grid, and each tile answers hover on its own — the icon lifts and takes the accent, the name darkens, a feature's card straightens and tilts with the cursor.

`PlatformGrid` is built on [Tilted Card](https://avaraui.com/docs/nextjs/tilted-card), which installs alongside and gives the featured cards their tilt and glare; the example's platform marks come from the library's `icons` item (`G2Icon`, `RedditIcon`, `CapterraIcon`, `AppStoreIcon`…). Every cell is a named part — `Tile`, `Feature` — with `Mock` and `Pill` for what goes on a feature's card.

## Fifty-six cells, four features

Eight columns at desktop, six, four, three and two as the window narrows; the features stay 2×2 throughout. Move the pointer across the grid and hover a feature.

- `Tile` is an `icon` and a `label`, square, with hairlines on its right and bottom edge. Give it an `href` and it renders as a link; `linkComponent` swaps in your router's Link.
- `Feature` spans two columns and two rows. Its children sit on a `TiltedCard` that leans 4° at rest and straightens under the pointer; the `icon` and `label` sit beneath.
- `Mock` is the small white card the example puts on every feature — a frame with a little padding — and `Pill` (`ink`, `accent`, `soft`) is the vocabulary inside it. Put anything you like there instead.
- `fadeEdges` masks the outer columns from `lg` up, so the grid reads as a window onto something larger. Turn it off for a plain grid.
- `reveal="in-view"` (the default) plays the wave the first time the section enters the viewport; the docs pass `"immediate"`. Under prefers-reduced-motion the tiles simply appear and the spotlight is off.

```tsx
"use client";



// A small mark on a dark tile, the way store badges are drawn.
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-foreground text-background">
    {children}
  </span>
);

const StoreBadges = () => (
  <span className="flex items-center gap-1">
    <Badge><AppStoreIcon size={10} fill="currentColor" /></Badge>
    <Badge><GooglePlayIcon size={9} fill="currentColor" /></Badge>
  </span>
);

// Tiles and features are written in reading order; at eight columns dense
// packing tucks each 2×2 feature into the gap the tiles leave for it.
export default function Platform() {
  return (
    <PlatformGrid
      eyebrow="The complete toolkit"
      heading={<>All Your Research<br />Under One Roof</>}
      intro="Over 40 datasets, pipelines and utilities to spot, test and ship your next product."
      className="max-w-6xl overflow-hidden rounded-[28px] border border-border pb-10"
    >
      <PlatformGrid.Tile icon={<Grid2x2 />} label="Maker Hub" href="/maker-hub" />
      <PlatformGrid.Tile icon={<Rocket />} label="Launch Playbook" href="/launch-playbook" />
      <PlatformGrid.Tile icon={<Sparkles />} label="Ideas MCP Server" href="/ideas-mcp-server" />
      <PlatformGrid.Tile icon={<Bot />} label="Reddit Connector" href="/reddit-connector" />
      <PlatformGrid.Tile icon={<MessageSquare />} label="Ask the Data" href="/ask-the-data" />
      <PlatformGrid.Tile icon={<Star />} label="Verified Revenue" href="/verified-revenue" />
      <PlatformGrid.Tile icon={<DollarSign />} label="Stripe Benchmarks" href="/stripe-benchmarks" />
      <PlatformGrid.Tile icon={<StripeIcon fill="currentColor" />} label="Stripe Customers" href="/stripe-customers" />
      <PlatformGrid.Tile icon={<Store />} label="Deals for Sale" href="/deals-for-sale" />
      <PlatformGrid.Tile icon={<HeartHandshake />} label="Acquire.com Listings" href="/acquire-com-listings" />

      <PlatformGrid.Feature icon={<G2Icon />} label="G2 Insights" href="/g2-insights">
        <PlatformGrid.Mock>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-semibold">Inbox App</span>
            <PlatformGrid.Pill>Score: 8.4</PlatformGrid.Pill>
          </div>
          <p className="truncate text-[7px] text-foreground/50">Most of 1,380 low ratings blame sync errors</p>
          <div className="flex items-center justify-between pt-0.5">
            <PlatformGrid.Pill tone="soft">24 vendors</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="accent">↓ Download</PlatformGrid.Pill>
          </div>
        </PlatformGrid.Mock>
      </PlatformGrid.Feature>

      <PlatformGrid.Feature icon={<CapterraIcon />} label="Capterra Insights" href="/capterra-insights">
        <PlatformGrid.Mock>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-semibold">Team Review Tool</span>
            <PlatformGrid.Pill>Score: 7.9</PlatformGrid.Pill>
          </div>
          <p className="truncate text-[7px] text-foreground/50">Calendar integrations keep breaking</p>
          <div className="flex items-center gap-1 pt-0.5">
            <PlatformGrid.Pill tone="soft">52 vendors</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="soft">2,690 reviews</PlatformGrid.Pill>
          </div>
        </PlatformGrid.Mock>
      </PlatformGrid.Feature>

      <PlatformGrid.Tile icon={<Landmark />} label="Funding Rounds" href="/funding-rounds" />
      <PlatformGrid.Tile icon={<YCombinatorIcon fill="currentColor" />} label="YC Startups" href="/yc-startups" />
      <PlatformGrid.Tile icon={<Puzzle />} label="AI Skill Packs" href="/ai-skill-packs" />
      <PlatformGrid.Tile icon={<Box />} label="Starter Kit" href="/starter-kit" />
      <PlatformGrid.Tile icon={<Scissors />} label="Web Clipper" href="/web-clipper" />
      <PlatformGrid.Tile icon={<Zap />} label="Launch Tracker" href="/launch-tracker" />
      <PlatformGrid.Tile icon={<Copy />} label="Clone Ideas" href="/clone-ideas" />
      <PlatformGrid.Tile icon={<FileText />} label="Weekly Brief" href="/weekly-brief" />

      <PlatformGrid.Feature icon={<RedditIcon />} label="Reddit Insights" href="/reddit-insights">
        <PlatformGrid.Mock>
          <p className="text-[8px] italic leading-snug text-foreground/70">
            &ldquo;Switching between three apps for every client is wearing me out&rdquo;
          </p>
          <div className="flex flex-wrap gap-1">
            <PlatformGrid.Pill tone="soft">urgent</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="soft">founder</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="soft">may cancel</PlatformGrid.Pill>
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <PlatformGrid.Pill>Frustration</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="accent">Open pipeline →</PlatformGrid.Pill>
          </div>
        </PlatformGrid.Mock>
      </PlatformGrid.Feature>

      <PlatformGrid.Feature icon={<StoreBadges />} label="App Store Insights" href="/app-store-insights">
        <PlatformGrid.Mock>
          <div className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-primary text-primary-foreground">
              <ClipboardList size={9} />
            </span>
            <span className="text-[9px] font-semibold">Weekly Meal Planner</span>
          </div>
          <p className="text-[7px] text-foreground/50">
            <span className="text-primary">★</span> 4.1 · 18 reviews · Paid
          </p>
          <div className="flex items-center justify-between pt-0.5">
            <PlatformGrid.Pill>Usability gaps</PlatformGrid.Pill>
            <PlatformGrid.Pill tone="accent">Read report</PlatformGrid.Pill>
          </div>
        </PlatformGrid.Mock>
      </PlatformGrid.Feature>

      <PlatformGrid.Tile icon={<LayoutGrid />} label="Lookalike Apps" href="/lookalike-apps" />
      <PlatformGrid.Tile icon={<Database />} label="Problem Library" href="/problem-library" />
      <PlatformGrid.Tile icon={<Lightbulb />} label="Solution Library" href="/solution-library" />
      <PlatformGrid.Tile icon={<Flame />} label="User Frustrations" href="/user-frustrations" />
      <PlatformGrid.Tile icon={<MessagesSquare />} label="Complaint Archive" href="/complaint-archive" />
      <PlatformGrid.Tile icon={<PackageOpen />} label="Product Hunt Launches" href="/product-hunt-launches" />
      <PlatformGrid.Tile icon={<StoreBadges />} label="App Store Library" href="/app-store-library" />
      <PlatformGrid.Tile icon={<UpworkIcon />} label="Upwork Demand" href="/upwork-demand" />
      <PlatformGrid.Tile icon={<BadgeDollarSign />} label="Idea Scorer" href="/idea-scorer" />
      <PlatformGrid.Tile icon={<Radio />} label="Live Feed" href="/live-feed" />
      <PlatformGrid.Tile icon={<ClipboardList />} label="Request a Dataset" href="/request-a-dataset" />
      <PlatformGrid.Tile icon={<Trophy />} label="Rankings" href="/rankings" />
      <PlatformGrid.Tile icon={<Tag />} label="Feature Requests" href="/feature-requests" />
      <PlatformGrid.Tile icon={<Calculator />} label="App Income Estimator" href="/app-income-estimator" />
      <PlatformGrid.Tile icon={<ChartLine />} label="MRR Estimator" href="/mrr-estimator" />
      <PlatformGrid.Tile icon={<Calculator />} label="Valuation Estimator" href="/valuation-estimator" />
      <PlatformGrid.Tile icon={<BarChart3 />} label="Metrics Board" href="/metrics-board" />
      <PlatformGrid.Tile icon={<ArrowLeftRight />} label="Idea Spark" href="/idea-spark" />
      <PlatformGrid.Tile icon={<Search />} label="Keyword Finder" href="/keyword-finder" />
      <PlatformGrid.Tile icon={<Globe />} label="Domain Finder" href="/domain-finder" />
      <PlatformGrid.Tile icon={<Wrench />} label="Free Utilities" href="/free-utilities" />
      <PlatformGrid.Tile icon={<BookOpen />} label="Docs" href="/docs" />
    </PlatformGrid>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/platform-grid.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/platform-grid
```

## How the grid packs

The grid is `grid-auto-flow: dense`: cells are placed in source order into the first slot they fit, and a 2×2 feature that will not fit on the current row is held until it does while smaller tiles fill in behind it. At eight columns the example's features land in the middle because they are listed after the second tile of the second row; at four columns they simply pack where they fit. Order your children for the widest layout and let the narrower ones sort themselves out.

Every tile is `aspect-square`, so a feature spanning two columns is exactly two tiles tall and the rows stay even. Hairlines are drawn as each tile's right and bottom border, with the grid supplying the top and left edge, so there is one line between any two cells and never a double.

## Features

### Built from the library

Tilted Card gives the featured cards their tilt and glare and installs with this item; the platform marks are Icons. Everything else is Tailwind.

### One reveal, then the pointer

A single wave from the centre when the section appears, then nothing moves unless you do: a spotlight tracks the pointer, tiles answer hover, features tilt. Reduced motion skips the wave and the spotlight.

### Cheap to move over

The spotlight is two CSS variables written straight to the grid element, so moving the mouse never re-renders fifty tiles.

### Links, keyboard, dark mode

Tiles with an href are real links with a visible focus state; hover and focus share the same treatment. Hairlines, tints and the feature gradient all have dark counterparts.

## Props Reference

### PlatformGrid

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `ReactNode` | — | The headline; use `<br />` for a deliberate break. |
| `eyebrow` | `ReactNode` | — | Small tracked line above the headline. |
| `intro` | `ReactNode` | — | Paragraph under the headline. |
| `accent` | `string` | theme primary | Colour of hovered icons, accent pills and the spotlight. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the wave plays. |
| `fadeEdges` | `boolean` | `true` | Mask the outer columns from `lg` up. |
| `children` | `ReactNode` | — | Any number of `Tile` and `Feature` parts, in the order you want at the widest layout. |

### PlatformGrid.Tile and PlatformGrid.Feature

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Any icon; sized to 18px in a tile, 20px in a feature. |
| `label` | `string` | — | The name. |
| `href` | `string` | — | Render as a link. |
| `linkComponent` | `ElementType` | `"a"` | Your router's Link, used when `href` is set. |
| `children` | `ReactNode` | — | Feature only: what sits on the tilting card. |

### PlatformGrid.Mock and PlatformGrid.Pill

`Mock` is a small white card with a little padding and a vertical gap between its children. `Pill` takes a `tone` — `"ink"` (default, solid black), `"accent"` (the primary colour) or `"soft"` (a grey chip) — and both accept `className`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/platform-grid
