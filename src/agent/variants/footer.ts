import type { PageVariants } from "./types";

/**
 * Footer: 9 looks of one registry item (`footer`, FooterBlock), chosen with the
 * `variant` prop. Every look has a titled example with a live preview on the
 * docs page, which is the test for being listed here.
 *
 * Claims come from src/app/docs/[framework]/footer/page.mdx and
 * FooterBlock.tsx. Do not add a "best for" the component cannot deliver.
 */
export const footer: PageVariants = {
  slug: "footer",
  intro:
    "The closing section of a page or app. Nine designs of one component, from a plain centred footer to a blueprint grid with liquid-ink type; each is a different layout, not a restyle.",
  whenNot: [
    {
      use: "Newsletter",
      slug: "newsletter",
      reason: "for a stand-alone sign-up section above the footer",
    },
    {
      use: "CTA Section",
      slug: "cta-section",
      reason: "for a closing call to action that is its own section rather than part of the footer",
    },
    {
      use: "Navbar",
      slug: "navbar",
      reason: "for the site header; the footer only carries links at the bottom of the page",
    },
  ],
  gotchas: [
    "The component's own default is `simple-centered`, but the docs preview defaults to `snapshot`. Always pass `variant` explicitly; the chosen look's `props` in the index are the values to set.",
    "All nine are looks of the one `footer` item: install it once, then set `variant`. Do not install it again per look.",
    "Each look takes its content through its own prop: `sections` for the link columns of most looks, `editorialCta` for `editorial-card`, `architecturalLiquid` for `architectural-liquid`, `wordmarkFooter` for `wordmark-glow`, `snapshot` for `snapshot` and `modern-stack`. A `sections` array does not reach `editorial-card` or `architectural-liquid`.",
    "Several names are aliases of a look: `tilted-cta` is `editorial-card`, `heron-blueprint` and `blueprint-liquid` are `architectural-liquid`, `snapshot-stack` is `modern-stack`.",
  ],
  variants: [
    // --- Studio and brand: footers with a personality ------------------------
    {
      id: "editorial-card",
      group: "Studio and brand",
      label: "Editorial tilted card footer",
      summary:
        "Grid studio footer with Newsletter, Colophon and Privacy tabs, a live clock, a globe badge and a tilted call-to-action.",
      bestFor: [
        "studios, agencies and portfolios that want a strong closing call to action",
        "a footer that carries a newsletter sign-up without a separate section",
      ],
      avoidIf: [
        "you need several columns of grouped links (it takes a flat menu list, not columns)",
        "you want a quiet footer that stays out of the way",
      ],
      traits: ["tabs", "live clock", "tilted card", "newsletter field", "interactive", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Editorial Tilted Card Footer",
      props: { variant: "editorial-card" },
      setProps: { variant: "editorial-card" },
    },
    {
      id: "snapshot",
      group: "Studio and brand",
      label: "Snapshot footer",
      summary:
        "Modern studio footer with sunken interactive cards, address and hours, and a say-hi sticker that lifts out on hover.",
      bestFor: [
        "small studios and agencies that want a warm, personal footer with an address and opening hours",
        "a footer that shows a few cards of news or notes",
      ],
      avoidIf: [
        "you want a plain list of links and nothing else",
        "you want no hover effects",
      ],
      traits: ["interactive cards", "sticker", "address and hours", "custom logo", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Snapshot Footer",
      props: { variant: "snapshot" },
      setProps: { variant: "snapshot" },
    },
    {
      id: "modern-stack",
      group: "Studio and brand",
      label: "Modern stack footer",
      summary:
        "Studio footer made of multi-coloured cards with spring hover physics, in the style of a scroll stack.",
      bestFor: [
        "playful, colourful brands, creative studios and consumer products",
        "a footer that feels like part of the page's design rather than an afterthought",
      ],
      avoidIf: [
        "your brand is sober or single-colour, unless you set each card's `bgColor` and `textColor`",
        "you want a quiet footer",
      ],
      traits: ["multi-coloured cards", "spring hover", "interactive", "custom logo", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Modern Stack Footer",
      props: { variant: "modern-stack" },
      setProps: { variant: "modern-stack" },
    },
    {
      id: "wordmark-glow",
      group: "Studio and brand",
      label: "Wordmark glow footer",
      summary:
        "Brand footer with solution columns, contact details and a legal row, under a giant wordmark that bounces in on scroll.",
      bestFor: [
        "product and SaaS brands with a short name worth showing off",
        "a footer that needs full link columns, direct contact info and a legal row",
      ],
      avoidIf: [
        "you want a compact footer (the wordmark takes a lot of height)",
        "you have no brand name or logo to feature",
      ],
      traits: ["giant wordmark", "scroll reveal", "pointer glow", "link columns", "contact info", "legal row", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Wordmark Glow Footer",
      props: { variant: "wordmark-glow" },
      setProps: { variant: "wordmark-glow" },
    },

    // --- Technical and animated: footers that make a statement ---------------
    {
      id: "architectural-liquid",
      group: "Technical and animated",
      label: "Architectural blueprint and liquid ink footer",
      summary:
        "Blueprint grid with a 3D isometric brand cube, technical metrics and a wordmark that fills like liquid ink on hover.",
      bestFor: [
        "developer tools, AI and technical products that want a statement footer",
        "a footer with an email sign-up, address and directions link built in",
      ],
      avoidIf: [
        "you want a quiet footer that stays out of the way",
        "you need only a row of links and social icons",
      ],
      traits: ["blueprint grid", "3D cube", "liquid-ink wordmark", "email sign-up", "address", "interactive", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Architectural Blueprint & Liquid Ink Footer (Heron AI Inspired)",
      props: { variant: "architectural-liquid" },
      setProps: { variant: "architectural-liquid" },
    },
    {
      id: "neon-glow-pulse",
      group: "Technical and animated",
      label: "Neon glow pulse footer",
      summary:
        "Cyberpunk footer card with a pulsing glowing border in the theme's primary colour and four link columns.",
      bestFor: [
        "gaming, crypto and developer products with a neon, high-energy look",
        "a footer that matches a dark, techy page",
      ],
      avoidIf: [
        "your brand is calm, formal or corporate",
        "you want a flat footer without glow or pulsing motion",
      ],
      traits: ["glowing border", "pulse animation", "dark techy look", "four link columns", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Neon Glow Pulse Cyberpunk Footer",
      props: { variant: "neon-glow-pulse" },
      setProps: { variant: "neon-glow-pulse" },
    },
    {
      id: "quantum-particle-beam",
      group: "Technical and animated",
      label: "Quantum particle beam footer",
      summary:
        "Gradient footer card with animated particle beam lines and glowing nodes, and four link columns.",
      bestFor: [
        "AI, data and infrastructure products that want an animated, high-energy footer",
        "a footer with more visual interest than a card but still a normal link layout",
      ],
      avoidIf: [
        "you want a calm, static footer",
        "your brand is formal or traditional",
      ],
      traits: ["particle beam lines", "glowing nodes", "gradient card", "four link columns", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Quantum Particle Beam Lines Footer",
      props: { variant: "quantum-particle-beam" },
      setProps: { variant: "quantum-particle-beam" },
    },

    // --- Clean: footers that stay out of the way -----------------------------
    {
      id: "simple-centered",
      group: "Clean and simple",
      label: "Simple centred footer",
      summary:
        "Clean, spacious footer: a centred brand logo, navigation pills and a social row.",
      bestFor: [
        "most sites that need a standard, low-key footer",
        "portfolios, docs sites and small products",
      ],
      avoidIf: [
        "you want a footer that makes a statement or carries a sign-up form",
        "you need rich contact details in the footer",
      ],
      traits: ["centred", "navigation pills", "social row", "minimal", "custom logo", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Simple Centered Footer",
      props: { variant: "simple-centered" },
      setProps: { variant: "simple-centered" },
    },
    {
      id: "glass-dock",
      group: "Clean and simple",
      label: "Glass dock footer",
      summary:
        "A floating frosted-glass card with backdrop blur holding the brand, four link columns and a social row.",
      bestFor: [
        "pages with a soft gradient or image behind the footer, where a frosted card shows through",
        "a modern, light footer with a full set of link columns",
      ],
      avoidIf: [
        "you want a flat, full-width footer bar",
        "the page behind the footer is a plain solid colour (the blur then adds nothing)",
      ],
      traits: ["frosted glass", "backdrop blur", "floating card", "four link columns", "custom logo", "uses the `footer` item"],
      item: "footer",
      demo: "footer",
      example: "Glass Dock Footer",
      props: { variant: "glass-dock" },
      setProps: { variant: "glass-dock" },
    },
  ],
};
