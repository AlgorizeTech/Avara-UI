# Fashion Hero

A fashion hero: a bold two-line headline between a turning video badge and a stack of faces, five staggered columns of looks — each a person on a flat colour that tilts and zooms under the pointer — a call to action sitting on the middle look, and a footer with a customer's words on one side and the next story on the other.

`FashionHero` is built from library pieces: the badge is Circular Text, the faces are Avatar Stack, the headline is Text Animation (`blur-in-up`, word by word), every look is a Tilted Card, and the badge opens a Dialog. When it first scrolls into view the badge and faces settle in, the looks rise from the middle column outward, the button lands on its look and the footer follows — one reveal, then only the badge keeps turning and the pointer does the rest.

export const usageSection = `// Photos from Pexels, free to use.
const pexels = (id: number, w = 700) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=\${w}\`;

// A person on a plain studio background, multiplied onto a colour that echoes the outfit.
const LOOKS = [
  { src: pexels(16944801), alt: "A woman in a pink shirt and lime trousers, on yellow", tone: "#f0a72f", blend: false },
  { src: pexels(1520760, 500), alt: "A woman in a dark top, smiling", tone: "#f7d774" },
  { src: pexels(1036623), alt: "A woman in a pale pink dress", tone: "#f4b7c5", blend: false },
  { src: pexels(1462637), alt: "A woman in a striped blue shirt", tone: "#8cc4ee" },
  { src: pexels(9558236), alt: "A woman in a coral shirt dress", tone: "#f9a875" },
  { src: pexels(6311613), alt: "A woman in a grey hoodie, hood up", tone: "#bfe4c6" },
  { src: pexels(3775534, 500), alt: "A man in a black leather jacket", tone: "#2e9c82" },
];

export default function Hero() {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/fashion-hero
```

## Photos on colour

The reference look is a person cut out on a flat colour. Cut-outs are expensive; a studio shot on a plain background is not. With `blend` on, the photo is drawn with `mix-blend-mode: multiply` over its `tone`, so white becomes the tone and the person keeps their colours — and the effect is strongest with lighter tones and darker clothes. A shot that already has a coloured background is better left unblended: pass `blend: false` and pick a `tone` that matches its edges.

## Features

    Built from the library
    Circular Text for the badge, Avatar Stack for the faces, Text Animation for the headline, Tilted Card for every look, Dialog for the video. Install this one item and all five come with it.

    One reveal, then the pointer
    A single timeline plays on first view: badge and faces, looks from the middle outward, the button, the footer. After that only the badge turns; tilt, zoom, fan-out and arrows all answer the pointer.

    Responsive to two columns
    Five staggered columns at lg, three at sm, two on phones with the middle look — and its button — full width. The header folds the badge and faces above the headline.

    Links are links
    The call to action, the plus beside the faces and the teaser are anchors — pass your router's Link as linkComponent — and the video badge is a real button with a label for screen readers.

## Props Reference

        Prop
        Type
        Default
        Description

        heading
        string
        Required
        The headline, revealed word by word.

        looks
        Look[]
        Required
        Up to seven &#123; src, alt, tone, blend?, position? &#125;, in slot order.

        video
        &#123; badge: string; url: string; title?: string &#125;
        —
        Words on the turning badge and the embed it opens.

        avatars, avatarsHref, avatarsLabel
        &#123; src, alt? &#125;[], string, string
        —, —, "Join the community"
        Faces in the top-right stack; the href adds a "+" link after them with that label.

        cta
        &#123; label: string; href: string &#125;
        —
        The pill sitting on the middle look.

        quote
        &#123; text: string; author: string &#125;
        —
        A customer's words and their name, set in the serif italic with a highlighter stroke.

        teaser
        &#123; index, label, title, href &#125;
        —
        The next story, as one link.

        accent
        string
        theme primary
        Sets --primary for the section: the highlighter stroke, focus rings and the mark above the middle look.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

        linkComponent
        ElementType
        "a"
        Your router's link for every href.

---

**Component Path:** `[framework]\fashion-hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
