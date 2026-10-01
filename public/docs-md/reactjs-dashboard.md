export const metadata = docsPageMetadata("dashboard");

# Dashboard

An admin dashboard home on its own canvas: a greeting with all-time totals, a period switch, an overview chart with a tab per metric, the activity feed, traffic sources, visitors by country and the top authors. Every number arrives through props, so you point it at your API and the layout, the empty states and the narrow-screen stacking take care of themselves.

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/dashboard
```

## Features

    Built from the library
    The period, chart-style and activity switches are the segmented Toggle Group, the trend line is the Chart, and the rate explainer is a Popover — installing the section pulls those in.

    Every value is text too
    The gauge and barcode are backed by legend rows with the number and share, the chart has a screen-reader table, and the arrow keys read each column.

    Follows your theme
    The canvas glow, the current column, the tab indicator and the bars are mixed from --primary, so a theme preset repaints the whole section in light and dark.

    No hydration surprises
    The greeting, the date and the "4m ago" times read the visitor's clock after mount, so a server-rendered page and the browser agree. Pass now to pin them.

## Best Practices & Guidelines

    Send the change with the series
    The badges show change[period] as given — compute it on your side the way your business reads it (raw totals, or the current period's pace against the last). Leave it out for a period and the tab shows no badge.

    Keep the series the same length
    The built-in Export writes one CSV row per point with a column per metric, so give every metric the same buckets for a period. Pass onExport to produce your own report instead.

    It sizes to its container
    Panels stack on phones, pair up on tablets and settle into the 8 + 4 / 4 + 4 + 4 grid from 1280px. Inside an app shell with a sidebar, give the section the content column and override its radius with className if it should sit flush.

## Props Reference

        Prop
        Type
        Default
        Description

        userName
        string
        —
        The greeting uses the first name: “Good afternoon, Ayesha”.

        summary
        ReactNode
        built from today
        The line under the greeting. By default it reads the last day point of each metric: “So far today: 24 new users…”.

        totals
        DashboardTotal[]
        []
        All-time counts beside the greeting — {`{ label, value, icon? }`}. The period switch never changes them.

        metrics
        DashboardMetric[]
        []
        The overview tabs. See the shape below.

        activity
        DashboardActivity[]
        []
        The feed, newest shown first, six per filter — {`{ id, type: "user" | "post" | "payment" | "message", title, subtitle?, status?, date, href? }`}.

        sources
        {`Partial>`}
        —
        Visits by source — {`{ id, label, value }`}. The top three get their own colour; the rest fold into “Other”.

        signUps
        {`Partial>`}
        —
        Sign-ups per period, for the visit-to-sign-up rate under the sources. Omit it to hide the rate.

        countries
        {`Partial>`}
        —
        Visits by country; add code (e.g. "US") for the small badge.

        authors
        {`Partial>`}
        —
        Posts per author — {`{ name, posts }`}. The top five are ranked against the leader.

        defaultPeriod
        "day" | "week" | "month"
        "month"
        The period selected on first render.

        onExport
        (period: DashboardPeriod) =&gt; void
        CSV download
        Replaces the built-in CSV of the overview series for the selected period.

        links
        {`{ activity?, traffic?, countries?, authors? }`}
        {`{}`}
        Where each panel's round open button goes. A panel without a link shows none.

        linkComponent
        ElementType
        "a"
        Renders the panel links and activity titles — pass next/link in a Next.js app.

        now
        Date
        the visitor's clock
        Pins “now” for the greeting, the date and the activity times.

### DashboardMetric

        Field
        Type
        Description

        id / label
        string
        A stable key and the tab label.

        icon
        ReactNode
        Shown beside the label from the sm breakpoint.

        noun
        [string, string]
        Singular and plural for the summary line, e.g. ["new user", "new users"].

        currency
        string
        An ISO code such as "USD"; the metric then formats as money.

        series
        {`Record`}
        Oldest first. shortLabel is used on phones, fullLabel in the tooltip and for screen readers.

        change
        {`Partial>`}
        Percent change of the current point against the one before (12.5 is +12.5%).

---

**Component Path:** `[framework]\dashboard\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
