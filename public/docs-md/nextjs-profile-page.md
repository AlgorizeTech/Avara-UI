# Profile Page

A person as a page: an aurora backdrop, frosted panels in four shapes, and a 24-hour dial that shows when they are at work — live, in their own time zone.

The page is primitives rather than one monolith. `ProfilePage` is the backdrop and a 12-column grid; `GlassPanel` — from Glass Panel, which installs alongside — is one glass recipe with a `shape` that encodes hierarchy (a `slab` for the hero, a `tile` for content, a `disc` for a single number, a `capsule` for chips); `WorkdayDial` is the one element that moves; `useLocalTime` is the hook under it. Compose them with your own data — nothing has to be reshaped to fit. The example page also drops in two other library pieces where a profile wants them: a Verify Badge beside the name and a row of Social Links under the contact details.

export const usagePage = `"use client";

const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "128", label: "Components" },
  { value: "342", label: "Merged PRs" },
  { value: "96", label: "Reviews" },
];

const SKILLS = ["Design systems", "React", "Motion", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Motion primitives v2",
    summary: "One easing vocabulary for modals, drawers and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Northwind UI 4.0",
    summary: "128 components, dark mode by default, tokens in CSS.",
    status: "Shipped June 2026",
  },
  {
    title: "Contrast audit",
    summary: "Every text and icon colour checked at 4.5:1 or better.",
    status: "Shipped February 2026",
  },
];

const TEAMMATES = [
  { initials: "TL", name: "Tomás Léger", role: "Motion and prototyping", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "WA", name: "Wren Adeyemi", role: "Accessibility", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "RS", name: "Rhea Sen", role: "Platform tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1287, unify easing curves across overlays", when: "2h ago" },
  { icon: Eye, text: "Reviewed Tomás's drawer focus-trap fix", when: "Yesterday" },
  { icon: FileText, text: "Published the Northwind UI 4.0 release notes", when: "3 days ago" },
  { icon: MessageCircle, text: "Opened an RFC on token naming", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0b0f]";

export default function ProfilePageDemo() {
  const [following, setFollowing] = useState(false);

  return (
    
      {/* Hero */}

             People

          {/* Squircle avatar — the only shape on the page that isn't a
              rectangle, circle or capsule, so it reads as the person */}

              AK

              Ayesha Karim

              Design engineer at Northwind

                 Dhaka

                 ayesha@northwind.co

                 ayesha.design

        {/* Action capsule */}
        
           setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
              following
                ? "border border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.06] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            {following ?  : }
            {following ? "Following" : "Follow"}

             Message

      {/* Her day */}

          Her day
          UTC+6

          Hover the ring for her hours in your time

      {/* Stat discs */}
      
        {STATS.map((s) => (

              {s.value}
              {s.label}

        ))}

      {/* About */}
      
        About
        
          Builds the component library three product teams ship on. Currently
          rewriting the motion primitives so a modal, a drawer and a toast all
          ease the same way. Happiest when a design decision becomes one variable.

          {SKILLS.map((skill) => (
            
              {skill}
            
          ))}

      {/* Highlights — three tiles, each its own panel */}
      {HIGHLIGHTS.map((item) => (

            {item.title}
            {item.summary}

            {item.progress !== undefined && (

            )}
            
              {item.status}

      ))}

      {/* Team */}
      
        Works closely with
        
          {TEAMMATES.map((m) => (

                {m.initials}

                {m.name}
                {m.role}
              
              {m.zone}
            
          ))}

      {/* Activity */}
      
        Recent activity
        
          {ACTIVITY.map((a) => (

              {a.text}
              {a.when}
            
          ))}

  );
}
`;

export const usagePageSolid = `"use client";

const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "128", label: "Components" },
  { value: "342", label: "Merged PRs" },
  { value: "96", label: "Reviews" },
];

const SKILLS = ["Design systems", "React", "Motion", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Motion primitives v2",
    summary: "One easing vocabulary for modals, drawers and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Northwind UI 4.0",
    summary: "128 components, dark mode by default, tokens in CSS.",
    status: "Shipped June 2026",
  },
  {
    title: "Contrast audit",
    summary: "Every text and icon colour checked at 4.5:1 or better.",
    status: "Shipped February 2026",
  },
];

const TEAMMATES = [
  { initials: "TL", name: "Tomás Léger", role: "Motion and prototyping", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "WA", name: "Wren Adeyemi", role: "Accessibility", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "RS", name: "Rhea Sen", role: "Platform tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1287, unify easing curves across overlays", when: "2h ago" },
  { icon: Eye, text: "Reviewed Tomás's drawer focus-trap fix", when: "Yesterday" },
  { icon: FileText, text: "Published the Northwind UI 4.0 release notes", when: "3 days ago" },
  { icon: MessageCircle, text: "Opened an RFC on token naming", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0b0f]";

export default function ProfilePageDemo() {
  const [following, setFollowing] = useState(false);

  return (
    
      {/* Hero */}

             People

          {/* Squircle avatar — the only shape on the page that isn't a
              rectangle, circle or capsule, so it reads as the person */}

              AK

              Ayesha Karim

              Design engineer at Northwind

                 Dhaka

                 ayesha@northwind.co

                 ayesha.design

        {/* Action capsule */}
        
           setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
              following
                ? "border border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.06] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            {following ?  : }
            {following ? "Following" : "Follow"}

             Message

      {/* Her day */}

          Her day
          UTC+6

          Hover the ring for her hours in your time

      {/* Stat discs */}
      
        {STATS.map((s) => (

              {s.value}
              {s.label}

        ))}

      {/* About */}
      
        About
        
          Builds the component library three product teams ship on. Currently
          rewriting the motion primitives so a modal, a drawer and a toast all
          ease the same way. Happiest when a design decision becomes one variable.

          {SKILLS.map((skill) => (
            
              {skill}
            
          ))}

      {/* Highlights — three tiles, each its own panel */}
      {HIGHLIGHTS.map((item) => (

            {item.title}
            {item.summary}

            {item.progress !== undefined && (

            )}
            
              {item.status}

      ))}

      {/* Team */}
      
        Works closely with
        
          {TEAMMATES.map((m) => (

                {m.initials}

                {m.name}
                {m.role}
              
              {m.zone}
            
          ))}

      {/* Activity */}
      
        Recent activity
        
          {ACTIVITY.map((a) => (

              {a.text}
              {a.when}
            
          ))}

  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/profile-page
```

## Building your own

The page above is a composition, not a component with forty props. Start from three panels and add what your data has.

```tsx

export default function Minimal() {
  return (

        Ayesha Karim
        Design engineer at Northwind

        128

  );
}
```

Grid spans are plain Tailwind: the grid is `grid-cols-1 md:grid-cols-6 lg:grid-cols-12`, so `lg:col-span-8` is two thirds of the page on desktop and full width on a phone. The three-disc row in the example is a nested `grid grid-cols-3` inside one cell, which keeps the discs square at every width.

## Features

    One glass, four shapes
    Every panel shares a single recipe. Slab, tile, disc and capsule differ only in corners, so the page reads as one material rather than a kit of cards.

    A live dial, not a status dot
    The 24-hour ring shows the working window and where the day is right now, computed in the person's own time zone with Intl.DateTimeFormat — no library.

    Light and dark by construction
    Panels are translucent white over the aurora in light mode and over near-black in dark mode. The blobs dim, the text flips, nothing else has to change.

    Theme colours
    The dial's arc and marker, the Follow button, the progress bars and the avatar are all written against primary and ring, so the page follows your theme preset — and the colour picker above — with no prop. Pass var(--primary) into aurora and the backdrop follows too.

    Still, on purpose
    Nothing animates on load. The only motion is the marker on the dial and a lift on panels you mark interactive — and both hold still under prefers-reduced-motion.

## Props Reference

### ProfilePage

        Prop
        Type
        Default
        Description

        variant
        "glass" | "solid"
        "glass"
        Frosted panels over an aurora, or solid white cards with a shadow on a flat ground. Read by every GlassPanel inside.

        aurora
        [string, string, string]
        violet, sky, peach
        Colours of the three blobs behind the glass. Ignored by solid.

        className
        string
        —
        Add rounded-[36px] inside a container, min-h-dvh when it is the page.

### GlassPanel

`GlassPanel` (and `useSurface`) come from Glass Panel; its `shape`, `variant` and `interactive` props are documented there. `ProfilePage` is that page's `GlassBackdrop` under the page's own name.

### WorkdayDial

        Prop
        Type
        Default
        Description

        timeZone
        string
        —
        IANA zone the person works in, e.g. &quot;Asia/Dhaka&quot;.

        start
        number
        —
        Hour the working window opens, 0–24, in that zone.

        end
        number
        —
        Hour the working window closes, 0–24, in that zone.

        place
        string
        —
        Short name shown under the clock.

        name
        string
        —
        Used in the accessible description and the tooltip.

        note
        string
        —
        One extra line at the bottom of the tooltip, e.g. "Replies within the day".

        className
        string
        —
        Sizing; the dial fills its width up to max-w-[220px].

### useLocalTime

        Prop
        Type
        Default
        Description

        timeZone
        string
        —
        IANA zone to read the clock in. Returns &#123; hour, label, offsetFromViewer &#125; | null: hour is fractional (14.5 for 14:30), label the readable clock, offsetFromViewer how many hours that zone runs ahead of the viewer's own. It is null until the first client read, so server and client render the same markup.

---

**Component Path:** `[framework]\profile-page\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
