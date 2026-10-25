export const metadata = docsPageMetadata("platform-grid");

# Platform Grid

Everything a product offers, as one hairline grid: small tiles with an icon and a name, and a few 2×2 features that show a piece of the product on a tilting card. Tiles pack densely, so the features stay square whether the grid has eight columns or two. When the section first scrolls into view the tiles rise in as a wave from the centre; after that a soft spotlight follows the pointer across the grid, and each tile answers hover on its own — the icon lifts and takes the accent, the name darkens, a feature's card straightens and tilts with the cursor.

`PlatformGrid` is built on Tilted Card, which installs alongside and gives the featured cards their tilt and glare; the example's platform marks come from the library's `icons` item (`G2Icon`, `RedditIcon`, `CapterraIcon`, `AppStoreIcon`…). Every cell is a named part — `Tile`, `Feature` — with `Mock` and `Pill` for what goes on a feature's card.

export const usageSection = `// A small mark on a dark tile, the way store badges are drawn.
const Badge = ({ children }: { children: React.ReactNode }) => (
  
    {children}
  
);

const StoreBadges = () => (

);

// Tiles and features are written in reading order; at eight columns dense
// packing tucks each 2×2 feature into the gap the tiles leave for it.
export default function Platform() {
  return (
    All Your ResearchUnder One Roof}
      intro="Over 40 datasets, pipelines and utilities to spot, test and ship your next product."
      className="max-w-6xl overflow-hidden rounded-[28px] border border-border pb-10"
    >
      } label="Maker Hub" href="/maker-hub" />
      } label="Launch Playbook" href="/launch-playbook" />
      } label="Ideas MCP Server" href="/ideas-mcp-server" />
      } label="Reddit Connector" href="/reddit-connector" />
      } label="Ask the Data" href="/ask-the-data" />
      } label="Verified Revenue" href="/verified-revenue" />
      } label="Stripe Benchmarks" href="/stripe-benchmarks" />
      } label="Stripe Customers" href="/stripe-customers" />
      } label="Deals for Sale" href="/deals-for-sale" />
      } label="Acquire.com Listings" href="/acquire-com-listings" />

      } label="G2 Insights" href="/g2-insights">

            Inbox App
            Score: 8.4
          
          Most of 1,380 low ratings blame sync errors
          
            24 vendors
            ↓ Download

      } label="Capterra Insights" href="/capterra-insights">

            Team Review Tool
            Score: 7.9
          
          Calendar integrations keep breaking
          
            52 vendors
            2,690 reviews

      } label="Funding Rounds" href="/funding-rounds" />
      } label="YC Startups" href="/yc-startups" />
      } label="AI Skill Packs" href="/ai-skill-packs" />
      } label="Starter Kit" href="/starter-kit" />
      } label="Web Clipper" href="/web-clipper" />
      } label="Launch Tracker" href="/launch-tracker" />
      } label="Clone Ideas" href="/clone-ideas" />
      } label="Weekly Brief" href="/weekly-brief" />

      } label="Reddit Insights" href="/reddit-insights">

            &ldquo;Switching between three apps for every client is wearing me out&rdquo;

            urgent
            founder
            may cancel

            Frustration
            Open pipeline →

      } label="App Store Insights" href="/app-store-insights">

            Weekly Meal Planner

            ★ 4.1 · 18 reviews · Paid

            Usability gaps
            Read report

      } label="Lookalike Apps" href="/lookalike-apps" />
      } label="Problem Library" href="/problem-library" />
      } label="Solution Library" href="/solution-library" />
      } label="User Frustrations" href="/user-frustrations" />
      } label="Complaint Archive" href="/complaint-archive" />
      } label="Product Hunt Launches" href="/product-hunt-launches" />
      } label="App Store Library" href="/app-store-library" />
      } label="Upwork Demand" href="/upwork-demand" />
      } label="Idea Scorer" href="/idea-scorer" />
      } label="Live Feed" href="/live-feed" />
      } label="Request a Dataset" href="/request-a-dataset" />
      } label="Rankings" href="/rankings" />
      } label="Feature Requests" href="/feature-requests" />
      } label="App Income Estimator" href="/app-income-estimator" />
      } label="MRR Estimator" href="/mrr-estimator" />
      } label="Valuation Estimator" href="/valuation-estimator" />
      } label="Metrics Board" href="/metrics-board" />
      } label="Idea Spark" href="/idea-spark" />
      } label="Keyword Finder" href="/keyword-finder" />
      } label="Domain Finder" href="/domain-finder" />
      } label="Free Utilities" href="/free-utilities" />
      } label="Docs" href="/docs" />
    
  );
}
`;

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

    Built from the library
    Tilted Card gives the featured cards their tilt and glare and installs with this item; the platform marks are Icons. Everything else is Tailwind.

    One reveal, then the pointer
    A single wave from the centre when the section appears, then nothing moves unless you do: a spotlight tracks the pointer, tiles answer hover, features tilt. Reduced motion skips the wave and the spotlight.

    Cheap to move over
    The spotlight is two CSS variables written straight to the grid element, so moving the mouse never re-renders fifty tiles.

    Links, keyboard, dark mode
    Tiles with an href are real links with a visible focus state; hover and focus share the same treatment. Hairlines, tints and the feature gradient all have dark counterparts.

## Props Reference

### PlatformGrid

        Prop
        Type
        Default
        Description

        heading
        ReactNode
        —
        The headline; use &lt;br /&gt; for a deliberate break.

        eyebrow
        ReactNode
        —
        Small tracked line above the headline.

        intro
        ReactNode
        —
        Paragraph under the headline.

        accent
        string
        theme primary
        Colour of hovered icons, accent pills and the spotlight.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the wave plays.

        fadeEdges
        boolean
        true
        Mask the outer columns from lg up.

        children
        ReactNode
        —
        Any number of Tile and Feature parts, in the order you want at the widest layout.

### PlatformGrid.Tile and PlatformGrid.Feature

        Prop
        Type
        Default
        Description

        icon
        ReactNode
        —
        Any icon; sized to 18px in a tile, 20px in a feature.

        label
        string
        —
        The name.

        href
        string
        —
        Render as a link.

        linkComponent
        ElementType
        "a"
        Your router's Link, used when href is set.

        children
        ReactNode
        —
        Feature only: what sits on the tilting card.

### PlatformGrid.Mock and PlatformGrid.Pill

Mock is a small white card with a little padding and a vertical gap between its children. Pill takes a tone — "ink" (default, solid black), "accent" (the primary colour) or "soft" (a grey chip) — and both accept className.

---

**Component Path:** `[framework]\platform-grid\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
