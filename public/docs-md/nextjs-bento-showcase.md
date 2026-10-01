export const metadata = docsPageMetadata("bento-showcase");

# Bento Showcase

A six-card marketing bento: a hero with a live chat and a headline, a laptop of case studies, one line that says what you do, figures that scroll up, the plans on a phone, and a strip of the team that scrolls left. Flat cards, no borders, no shadows — colour is the only thing separating them. One component, both themes: pastels on white in light mode, the same hues deepened on black in dark mode, switched by the `dark` class like the rest of the library.

`BentoShowcase` is a section built from library pieces. Both moving cards are Marquee (`direction="up"` and `"left"`), the conversation is Chat Bubble, the rating is Half Stars, the device is Mobile Mockup and the call to action is Button. Each card is a named part — `Hero`, `CaseStudies`, `Headline`, `Stats`, `Phone`, `Team` — so a page can leave one out, reorder them, or add its own with `BentoShowcase.Card`.

export const bentoData = `const CASE_STUDIES = [
  {
    quote: "More deals closed and more meetings booked for an IT services vendor",
    metrics: [{ value: "+64%", label: "Win rate" }, { value: "$230K", label: "New revenue" }],
  },
  {
    quote: "Hours back: triple the weekly demos on the calendar for a B2B startup",
    metrics: [{ value: "+80%", label: "Meetings" }, { value: "$150K", label: "New pipeline" }],
  },
  {
    quote: "Fully booked delivery windows and fewer late drop-offs for a courier",
    metrics: [{ value: "+40%", label: "Punctual" }, { value: "$95K", label: "Cost cut" }],
  },
];

const STATS: BentoStat[] = [
  { value: ">28,000", caption: "Average prospects sourced each month", tone: "cream", ornament: "spheres" },
  { value: "$165M", caption: "In revenue won for partners to date", tone: "lilac", ornament: "ring" },
  { value: "220+", caption: "Reps taking calls for clients today", tone: "ink", ornament: "drops" },
];

const PLANS: [BentoPlan, BentoPlan?] = [
  {
    rank: "#2",
    name: "Growth",
    price: "$3,200",
    note: "A promised 8–12 vetted prospects every month",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    benefits: ["Prospect vetting", "Meeting scheduling", "Script split-testing", "Account research", "Cold email sequences"],
    action: "Get started",
  },
  { rank: "#3", name: "Scale", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1550684848-fac1c5b4e853-1790145143489.jpg" },
];

// Four photos and two figure discs make six cells — an even count keeps the
// high/low rhythm intact across the loop.
const TEAM = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7688336-1790166052227.jpg", alt: "Overhead view of a workspace" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg", alt: "A pair of reps working side by side" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg", alt: "Lena on the phone" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7709086-1790166052228.jpg", alt: "Omar at his laptop" },
];`;

{/* The Phone card's button navigates, which is the one line that differs between a Next.js app and a React Router one. */}

export const bentoJsx = (onAction) => `    
      
        Chosen by thousands of sales teams

        We pick up the
        
        phone while you grow the company

    `;

export const usageSection = {
  nextjs: `"use client";

${bentoData}

export default function Showcase() {
  const router = useRouter();

  return (
${bentoJsx('() => router.push("/pricing")')}
  );
}
`,
  reactjs: `import { useNavigate } from "react-router-dom";

${bentoData}

export default function Showcase() {
  const navigate = useNavigate();

  return (
${bentoJsx('() => navigate("/pricing")')}
  );
}
`,
};

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
        "Virtual agent"
        The yellow chip under the chat.

        avatars
        string[]
        []
        Small overlapping faces under the headline.

        label
        ReactNode
        "Managed call centre"
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
        "Client wins"
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
        "Call handling"
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
