# Support Hero

A product hero on a soft grey ground: a headline that rises in word by word, one line under it and one call to action, then a bento of frosted cards — integrations on white tiles, two figures that count up, two portraits and a team card with faces scattered over a field of dots. The cards land in one staggered pass after the headline; after that only the pointer moves anything: cards lift, portraits zoom a touch, the integration tiles rise one after another, the faces drift apart.

`SupportHero` is built from library pieces. The ground and the cards are Glass Panel (`GlassBackdrop` with a grey aurora, `GlassPanel` tiles), the headline is Text Animation's `blur-in-up`, the figures are Counter's animated type in its new bare form, and the call to action is Button. Every card is a named part — `Integrations`, `Stat`, `Photo`, `Team` — plus a plain `Card` for anything else.

export const usageSection = `const AVATARS = [
  { src: "/team/ana.jpg", alt: "Ana" },
  { src: "/team/tom.jpg", alt: "Tom" },
  { src: "/team/mei.jpg", alt: "Mei" },
  { src: "/team/raj.jpg", alt: "Raj" },
];

export default function Hero() {
  return (
    
      , , ]}
        title="Integrations"
        text="Way better at getting things done than human agents"
      />

      {/* Spans both rows at desktop. */}

      AutomatedCustomer ServiceQuality}
        avatars={AVATARS}
      />
    
  );
}
`;

## Installation

## Layout

The bento is the `GlassBackdrop` grid — one column on phones, six at `md`, twelve at `lg` — and every part carries a default span (`Integrations`, `Stat` and `Photo` take three columns, `Team` takes six). Cards are a fixed `13rem` tall at `lg`, so a part given `lg:row-span-2 lg:h-auto` is exactly two cards tall. Pass any other span through `className`; the built-in parts are `GlassPanel`s, so `variant="solid"` on a card also works.

The call to action is a `Button`. Give `cta` an `onClick`, or an `href` to navigate to on click — pass a router `push` in `onClick` when you want client-side navigation.

## Features

    Built from the library
    Glass Panel for the ground and the cards, Text Animation for the headline, Counter for the figures, Button for the call to action. Install this one item and all four come with it.

    One sequence, then the pointer
    Words, line, button, cards, faces — one timeline the first time the section appears. After that nothing moves unless you hover it. Reduced motion renders the finished state.

    Figures that count when seen
    Each Stat waits until its card is on screen before counting, so a hero below the fold does not run its numbers while nobody is looking.

    Server-safe
    Cards and faces render opaque in the HTML and only animate once the page is live; nothing depends on JavaScript to be visible.

## Props Reference

### SupportHero

        Prop
        Type
        Default
        Description

        heading
        string
        —
        The headline, animated word by word.

        subtitle
        ReactNode
        —
        The line under it.

        cta
        &#123; label: string; href?: string; onClick?: () =&gt; void &#125;
        —
        The button. href is navigated to on click.

        aurora
        [string, string, string]
        three greys
        Colours washed behind the glass.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

        children
        ReactNode
        —
        The cards, in the order they should fill the grid.

### SupportHero.Integrations

        Prop
        Type
        Description

        icons
        ReactNode[]
        Marks shown on white tiles, e.g. from the icons item.

        title, text
        string
        Heading and the line under it.

### SupportHero.Stat

        Prop
        Type
        Default
        Description

        value
        number
        —
        The figure counted up to.

        decimals
        number
        0
        Decimal places, e.g. 1 for 5.5.

        prefix, suffix
        string
        —
        Text either side of the figure, e.g. "%", "B".

        caption
        string
        —
        What the figure means.

        tone
        "glass" | "accent"
        "glass"
        Frosted, or the accent card in the theme's primary colour with its foreground for text.

        image, imageAlt
        string
        —
        A picture behind the whole card. Only the bottom-left corner, under the figure, is washed with the card colour; the rest stays clear. Zooms a touch on hover.

        imagePosition
        string
        "center"
        CSS object-position for the crop — e.g. "70% center" to favour a subject on the right.

### SupportHero.Photo

        Prop
        Type
        Default
        Description

        src, alt
        string
        —
        The portrait.

        label
        string
        —
        A word in the top-left corner.

        position
        string
        "center"
        CSS object-position for the crop.

### SupportHero.Team

        Prop
        Type
        Description

        title
        ReactNode
        The heading; use &lt;br /&gt; for deliberate breaks.

        avatars
        &#123; src: string; alt?: string &#125;[]
        Up to six faces, scattered over the right half.

### SupportHero.Card

A GlassPanel that takes part in the reveal: shape="tile", interactive, three columns wide and 13rem tall at lg. All GlassPanel props apply.

---

**Component Path:** `[framework]\support-hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
