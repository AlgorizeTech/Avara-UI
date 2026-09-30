export const metadata = docsPageMetadata("third-party", {
  title: "Third Party Integration",
  description: "Worked examples pairing Algorize UI with the most widely used React charting, table, carousel, select and lightbox libraries."
});

# Third Party Integration

Algorize UI does not try to be every library. Where a problem already has a
well-solved, widely used answer — charting, virtualised data grids, gesture
carousels, a combobox with async search, a zoomable lightbox — the better move
is to bring that library in and make it look like the rest of your app.

These pages are worked examples of exactly that. Each one pairs a third-party
library with real Algorize UI components, and each snippet is a whole file:
copy it, install the packages listed on the page, and it runs.

## What each page covers

        Page
        Libraries
        The integration point

        Charts
        Recharts, Chart.js
        Design tokens read out of CSS and handed to the chart as plain colour values

        Data Tables
        TanStack Table, AG Grid
        A headless table rendered entirely with the {'Table'} primitives; AG Grid themed through its Theming API

        Carousels
        Embla, Swiper
        {'Card'} slides and {'Button'} controls, with Swiper's own chrome re-pointed at the tokens

        Select
        react-select
        {'unstyled'} plus {'classNames'}, so the combobox matches {'Input'} with no CSS overrides

        Gallery & Lightbox
        react-photo-album, yet-another-react-lightbox
        Album layout and viewer dropped inside a {'Card'}, with your own hover affordance

## The pattern behind all of them

Every integration on these pages follows the same three rules. They are worth
stating once, because they are what keeps a third-party component from looking
bolted on.

**Let the library own its own problem, and nothing else.** Embla positions
slides; it does not draw arrows. TanStack Table sorts and pages; it does not
render a cell. The further a library stays from your markup, the less of your
design system it can contradict.

**Bridge tokens as values, not classes.** A canvas chart or a grid theme cannot
read `text-muted-foreground`. Read the custom property once and hand the library
the resolved value — see the shared `useChartTokens` hook on the
Charts page, which the AG Grid
example reuses unchanged.

**Prefer the library's unstyled or headless mode.** `unstyled` on react-select,
`classNames` over `styles`, headless TanStack Table over a batteries-included
grid. Styling something blank is nearly always less work than overriding
something opinionated.

## Versions these examples were written against

Each page repeats the install command for its own libraries. The whole set is:

You almost certainly do not want all of them — install per page.

        Package
        Version tested

        {'recharts'}
        3.x

        {'chart.js'} / {'react-chartjs-2'}
        4.x / 5.x

        {'@tanstack/react-table'}
        9.x

        {'ag-grid-react'} / {'ag-grid-community'}
        36.x

        {'swiper'}
        14.x

        {'embla-carousel-react'}
        8.x

        {'react-select'}
        5.x

        {'yet-another-react-lightbox'}
        3.x

        {'react-photo-album'}
        3.x

Where a major version changed something these examples depend on — TanStack
Table v9's explicit feature registration, AG Grid v33's move from CSS themes to
the Theming API — the page says so at the point it matters.

## Framework notes

Nothing on these pages imports from `next/*`, so every snippet runs unchanged in
a Vite app and in the Next.js App Router. Two of the libraries touch browser-only
APIs at import time, which matters only under server rendering:

- **Chart.js** registers its scales and elements on the module, and **AG Grid**
  registers its modules the same way. Both are safe in a client component; keep
  the `"use client"` directive at the top of the file.
- The lightbox measures the viewport on open. It renders nothing until `open` is
  true, so there is no server-render hazard.

---

**Component Path:** `[framework]\third-party\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
