# Newsletter

A sign-up section in three layouts. **Portraits** puts four readers' faces around a centred form on a soft panel and lets them drift with the pointer. **Spotlight** is the same form with a glow under the cursor and a ticker of who just joined. Every layout follows your site's colour scheme — soft grounds by day, near-black by night. **Issues** sets the form beside a fanned stack of recent issues, the top one on a tilting card. One reveal when the section first appears; a form that turns into a thank-you when your promise resolves; nothing else moves unless the reader does.

`Newsletter` is built from library pieces: the field is Input, the action is Button, the ticker is Marquee and the top issue sits on a Tilted Card. Every piece of copy is a named part — `Heading`, `Intro`, `Form`, `Proof`, `Ticker`, `Issues` — so the words are yours.

export const usagePortraits = `// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

export default function Signup() {
  return (
     ({ src, alt: "A reader" }))}
    >
      Join 24,000 readers who ship better
      
        A short, sharp email every week on product, design and the craft of building. Free, and easy to leave.
      
       {
          await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
        }}
      />
      Loved by teams at Linear, Vercel and Notion
    
  );
}
`;

export const usageSpotlight = `const JOINED = [
  { name: "Ana", avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", when: "just now" },
  { name: "Tom", avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg", when: "2 min ago" },
  { name: "Noah", when: "15 min ago" },
];

export default function Signup() {
  return (
    
      Get the good stuff, every Thursday
      One email a week on building products people keep using. Unsubscribe in one click.
      
      Read by 24,000 designers and founders

  );
}
`;

export const usageIssues = `const ISSUES = [
  {
    title: "The quiet power of defaults",
    date: "Issue 42 · This week",
    excerpt: "Why the choices you never make shape your product more than the ones you agonise over.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    tag: "Design",
  },
  { title: "Shipping less, on purpose", date: "Issue 41", excerpt: "" },
  { title: "Notes on onboarding", date: "Issue 40", excerpt: "" },
];

export default function Signup() {
  return (
    
      A letter about making things well
      Essays on product, craft and the small decisions that compound.
      
      Joined by 24,000 readers

  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/newsletter
```

## Examples

## Features

    Built from the library
    Input for the field, Button for the action, Marquee for the ticker, Tilted Card for the top issue. Install this one item and all four come with it.

    A form that says what happened
    The button stays busy while your promise runs, then the pill becomes a thank-you with a check that draws itself. A rejection returns to the form for your own message.

    One reveal, then the pointer
    Heading, intro, form and proof rise in once. After that the faces drift, the glow follows and the stack spreads only when you move. Reduced motion renders the finished state.

    Accessible by default
    A real email field with a label, a submit button with a busy state, a status region for the thank-you, and faces that are decorative unless you give them alt text.

## Props Reference

### Newsletter

        Prop
        Type
        Default
        Description

        variant
        "portraits" | "spotlight" | "issues"
        "portraits"
        The layout.

        portraits
        &#123; src: string; alt?: string &#125;[]
        []
        Up to four faces for the portraits layout.

        accent
        string
        theme primary
        Colour of the button, tags and the spotlight glow.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the reveal plays.

        children
        ReactNode
        —
        The parts, in reading order.

### Newsletter.Form

        Prop
        Type
        Default
        Description

        onSubscribe
        (email: string) =&gt; void | Promise&lt;void&gt;
        —
        Called on submit. A promise holds the busy state; a rejection stays on the form.

        placeholder
        string
        "name@email.com"
        Field placeholder.

        action
        string
        "Subscribe now"
        Button label.

        successTitle, successText
        string
        "You're on the list", "The next issue lands in your inbox."
        The thank-you.

### Newsletter.Proof, Ticker, Issues

        Part
        Prop
        Type
        Description

        Proof
        avatars
        string[]
        Up to five faces, stacked; the line is the children.

        Ticker
        items
        &#123; name: string; avatar?: string; when: string &#125;[]
        Who just joined, run as a marquee (spotlight).

        Issues
        items
        &#123; title: string; date: string; excerpt: string; cover?: string; tag?: string &#125;[]
        The first is the card in front, the next two sit behind (issues).

`Heading` and `Intro` take children and any heading / paragraph props.

---

**Component Path:** `[framework]\newsletter\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
