# Platform Grid

Everything a product offers, as one hairline grid: small tiles with an icon and a name, and a few 2×2 features that show a piece of the product on a tilting card. Tiles pack densely, so the features stay square whether the grid has eight columns or two. When the section first scrolls into view the tiles rise in as a wave from the centre; after that a soft spotlight follows the pointer across the grid, and each tile answers hover on its own — the icon lifts and takes the accent, the name darkens, a feature's card straightens and tilts with the cursor.

`PlatformGrid` is built on Tilted Card, which installs alongside and gives the featured cards their tilt and glare; the example's platform marks come from the library's `icons` item (`G2Icon`, `RedditIcon`, `CapterraIcon`, `AppStoreIcon`…). Every cell is a named part — `Tile`, `Feature` — with `Mock` and `Pill` for what goes on a feature's card.

export const usageSection = `"use client";

export default function Platform() {
  return (
    Everything You Needin One Platform}
      intro="40+ databases, pipelines, and tools to find, validate, and build your next product."
    >
      } label="BuildGuide" href="/build" />
      } label="Problems DB" href="/problems" />

      } label="G2 Analysis" href="/g2">

            Email Client
            Gap: 8.5
          
          Sync failures dominate 1,412 negative reviews
          
            26 companies
            Export

      } label="Reddit Analysis" href="/reddit">
        
          “Honestly so frustrated with juggling three tools for one client”
          Pain point

      } label="Solutions DB" href="/solutions" />
      } label="Pain Points" href="/pain-points" />
      } label="Keyword Generator" href="/keywords" />
      } label="Docs" href="/docs" />
    
  );
}
`;

## Installation

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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
