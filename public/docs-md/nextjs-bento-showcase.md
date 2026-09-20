# Bento Showcase

A six-card marketing bento: a hero with a live chat and a headline, a laptop of case studies, one line that says what you do, figures that scroll up, the plans on a phone, and a strip of the team that scrolls left. Flat cards, no borders, no shadows — colour is the only thing separating them. One component, both themes: pastels on white in light mode, the same hues deepened on black in dark mode, switched by the `dark` class like the rest of the library.

`BentoShowcase` is a section built from library pieces. Both moving cards are Marquee (`direction="up"` and `"left"`), the conversation is Chat Bubble, the rating is Half Stars, the device is Mobile Mockup and the call to action is Button. Each card is a named part — `Hero`, `CaseStudies`, `Headline`, `Stats`, `Phone`, `Team` — so a page can leave one out, reorder them, or add its own with `BentoShowcase.Card`.

export const usageSection = `"use client";

// Photos from Pexels, free to use.
const pexels = (id: number, w = 900) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=\${w}\`;

const CASE_STUDIES = [
  {
    quote: "5% of deal-closing rate and appointments for a solution provider",
    metrics: [{ value: "+70%", label: "Close rate" }, { value: "$250K", label: "Revenue" }],
  },
  {
    quote: "Saving time: 3x appointments booked per week for a SaaS team",
    metrics: [{ value: "+85%", label: "Bookings" }, { value: "$140K", label: "Pipeline" }],
  },
  {
    quote: "Sold-out delivery slots and a reduced late rate for a logistics firm",
    metrics: [{ value: "+45%", label: "On time" }, { value: "$90K", label: "Saved" }],
  },
];

const STATS = [
  { value: ">30,000", caption: "Leads generated a month, on average", tone: "cream", ornament: "spheres" },
  { value: "$180M", caption: "Brought to our clients so far", tone: "lilac", ornament: "ring" },
  { value: "200+", caption: "Sales reps on the floor right now", tone: "ink", ornament: "drops" },
];

const PLANS = [
  {
    rank: "#2",
    name: "Professional",
    price: "$3,500",
    note: "7–12 qualified leads a month, guaranteed",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    benefits: ["Lead qualification", "Calendar booking", "Template A/B testing", "Intelligent research", "Email outreach"],
    action: "Start now",
  },
  { rank: "#3", name: "Enterprise", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop" },
];

// Four photos and two figure discs make six cells — an even count keeps the
// high/low rhythm intact across the loop.
const TEAM = [
  { src: pexels(7688336, 500), alt: "A desk from above" },
  { src: pexels(8867434, 500), alt: "Two agents at their desks" },
  { src: pexels(7658387, 500), alt: "Maria on a call" },
  { src: pexels(7709086, 500), alt: "Alex at his laptop" },
];

export default function Showcase() {
  return (

        Trusted by 1000’s of sales reps

        We handle your
        
        calls so you run your business

       router.push("/pricing")} />

  );
}
`;

` for the serif italic. `avatars` sit under it as social proof.",
        },
        {
          prop: "Stats",
          effect:
            "is a `MarqueeBlock` going up: each item is a figure, a caption, a `tone` and an optional `ornament` (spheres, ring, drops).",
        },
        {
          prop: "Team",
          effect:
            "is a `MarqueeBlock` going left: every cell is an ellipse, cells alternate high and low, and a figure disc follows every other photo when `stat` is given. Keep the cell count even so the loop stays seamless.",
        },
        {
          prop: "Headline",
          effect:
            "sets the `` phrase on its own line in the serif, with a scribble under it. Put a `` where the sans lines should break.",
        },
        {
          prop: "Phone",
          effect:
            "puts the first plan on an `Iphone17ProMaxMockup`, tilted and run off the card's edge, with the second plan peeking in below. `onAction` is the button.",
        },
      ],
      props: { rounded: true },
      usage: usageSection,
      code: extractCode("src/components/custom/blocks/BentoShowcaseBlock.tsx"),
      minHeight: 820,
    },
  ]}
/>

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/bento-showcase
```

## Your own card

Every part renders through `BentoShowcase.Card`, and so can yours. It takes a `tone`, an optional top-right `label`, and the grid placement as ordinary Tailwind — the grid is `3fr 2fr 3fr` across, rows of `15rem`, at `lg`; two columns at `md`.

```tsx

    24/7
    Someone always picks up.
  
  {/* …the rest */}

```

The built-in parts carry their own placement (`Hero` is column 1, rows 1–2; `Phone` is column 3, rows 2–3, and so on). Pass `className` with your own `lg:col-start-*` / `lg:row-start-*` to move one — later utilities win.

## Features

    Built from the library
    Marquee for both scrolling cards, Chat Bubble for the conversation, Half Stars for the rating, Mobile Mockup for the device and Button for the call to action. Install this one item and all five come with it.

    Two things move, nothing else
    The figures scroll up and the team scrolls left; the chat pops in once. Both marquees pause under the pointer and stay put under prefers-reduced-motion, with the content still readable.

    Compound, not configured
    Six named parts you can drop, reorder or replace, and a plain Card for anything else. Headlines are children, so the serif phrase is an em tag, not a prop.

    Light and dark, one component
    Follows the site theme with no prop: a white ground and pastel cards in light mode, a black ground and the same hues deepened in dark mode. The chat, the phone screen and the call bar switch with it; the laptop, the yellow accents and the ornaments stay as they are.

    Responsive to a single column
    3-2-3 columns at lg, two at md, one on phones. The tilted phone and both marquees keep their own height when the grid rows go away.

## Props Reference

### BentoShowcase

        Prop
        Type
        Default
        Description

        children
        ReactNode
        —
        The cards. Any mix of the named parts and BentoShowcase.Card.

        className
        string
        —
        Applied to the section (white in light mode, black in dark). Add rounded-[36px] inside a container.

### BentoShowcase.Card

        Prop
        Type
        Default
        Description

        tone
        "cream" | "ice" | "lilac" | "sky" | "butter" | "ink"
        "cream"
        The card's colour. Every pastel has a deep dark-mode counterpart; ink is the contrast card and flips (dark on light, light on dark); butter is the accent and stays yellow on both. Use text-current/… for secondary text so it follows the tone.

        label
        ReactNode
        —
        Small caption in the top-right corner.

        className
        string
        —
        Grid placement, padding, minimum height.

### BentoShowcase.Hero

        Prop
        Type
        Default
        Description

        photo, photoAlt
        string
        —
        The portrait, shown in an arch. Use a picture with the subject in the upper middle.

        chat
        &#123; from, fromRole?, message, as, reply, avatar? &#125;
        —
        The customer's message and the reply. as is the name the reply is sent under.

        chip
        string
        "Assistant"
        The yellow chip under the chat.

        avatars
        string[]
        []
        Small overlapping faces under the headline.

        label
        ReactNode
        "Outsourcing company"
        Top-right caption.

        children
        ReactNode
        —
        The headline. An &lt;em&gt; inside it is set in the serif italic.

### BentoShowcase.CaseStudies

        Prop
        Type
        Default
        Description

        items
        &#123; quote, metrics: &#123; value, label? &#125;[] &#125;[]
        —
        Up to three results on the laptop screen, each a quote over two figures.

        rating, reviews
        number
        5, —
        Stars in the corner and the count under them.

        logo
        ReactNode
        a black disc
        Mark shown before the stars — your own logo, or null for none.

        title
        string
        "Case Studies"
        Heading on the screen; wraps to two lines.

### BentoShowcase.Headline

        Prop
        Type
        Default
        Description

        photo, photoAlt
        string
        —
        Small picture in the top-left, clipped to a pill.

        label
        ReactNode
        "Customer support"
        Top-right caption.

        children
        ReactNode
        —
        The line. The &lt;em&gt; phrase takes its own line in the serif italic with a scribble under it; add &lt;br /&gt; where the sans lines should break.

### BentoShowcase.Stats

        Prop
        Type
        Default
        Description

        items
        &#123; value, caption, tone?, ornament? &#125;[]
        —
        Figures that scroll up. ornament is "spheres", "ring" or "drops", drawn in CSS.

        speed
        number
        16
        Seconds per loop.

### BentoShowcase.Phone

        Prop
        Type
        Default
        Description

        plans
        [BentoPlan, BentoPlan?]
        —
        The first plan is shown in full (rank, name, price, note, image, benefits, action); the second only needs rank, name and image.

        onAction
        () =&gt; void
        —
        Click handler for the button on the screen.

### BentoShowcase.Team

        Prop
        Type
        Default
        Description

        photos
        &#123; src, alt? &#125;[]
        —
        Portraits that scroll left as ellipses, alternating high and low.

        stat
        &#123; value, caption &#125;
        —
        A figure repeated in a disc after every other photo.

        speed
        number
        36
        Seconds per loop.

---

**Component Path:** `[framework]\bento-showcase\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
