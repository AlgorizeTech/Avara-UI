export const metadata = docsPageMetadata("waitlist", {
  title: "Waitlist",
  description: "A pre-launch sign-up section in three layouts — a compact card, a brand mark with a live countdown, or a pill on a soft ground with a bar of spots claimed. The form becomes the reader's place in line when your promise resolves."
});

# Waitlist

A pre-launch sign-up in three layouts. **Card** is a compact card with the field over the button, for a corner of a page. **Launch** puts your mark and a live countdown to the opening date over the form on a wide panel. **Queue** sets the form as a pill on a soft ground, with the faces of who is already in and a bar of the early spots claimed. Whichever layout, the form becomes the reader's place in line when your promise resolves — a number that counts up, and an invite link to copy to move up. One reveal when the section first appears; after that only the countdown's seconds and the reader's own actions move anything.

`Waitlist` is built from library pieces: the countdown is the Counter's slide variant, the field is Input, the action is Button, the faces are an Avatar Stack, the spots bar is Progress and the invite link is a Copy Button. Every piece of copy is a named part — `Mark`, `Countdown`, `Heading`, `Intro`, `Form`, `Proof`, `Spots` — so the words are yours.

export const usageLaunch = `// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
];

export default function EarlyAccess() {
  return (
    
      T
      
      Be first in line for Tidewell
      
        Planning your week, minus the stress. Our first 1,000 sign-ups get access ahead of everyone.
      
       {
          const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
          if (!res.ok) throw new Error("We couldn't add that address. Please retry.");
          const { position } = await res.json();
          return position; // shown as "#2,341 in line"
        }}
        shareUrl="https://tidewell.app/?ref=k7x2q"
      />
      4,120 people have signed up already
    
  );
}
`;

export const usageCard = `export default function JoinCard() {
  return (
    
      Reserve your spot
      Hear the moment we launch. A single email, nothing more.
      
      2,300 people already queued
    
  );
}
`;

export const usageQueue = `export default function GetInLine() {
  return (
    
      Great products open to a few first. Be one of them.
      
        Tidewell lets people in a batch at a time, so everyone gets a real onboarding. Sign up today and your place is reserved.

      10,000+ people waiting

  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/waitlist
```

## Examples

## Features

    Built from the library
    Counter for the countdown, Input for the field, Button for the action, Avatar Stack for the faces, Progress for the spots bar and Copy Button for the invite link. Install this one item and all six come with it.

    A thank-you that says where you stand
    Resolve your promise with a number and the form becomes that place in line, counting up. Add a share link and the reader can copy it to move up. A thrown error puts its message under the field.

    One reveal, then only what matters
    Mark, countdown, heading, form and proof rise in once. After that the seconds tick, the spots bar fills, and nothing else moves until the reader acts. Reduced motion renders the finished state.

    Accessible by default
    A real email field with a label, a submit button with a busy state, an alert for a bad address, a status region for the thank-you, a timer role on the countdown and a progress bar with real values.

## Props Reference

### Waitlist

        Prop
        Type
        Default
        Description

        variant
        "card" | "launch" | "queue"
        "card"
        The layout.

        accent
        string
        theme primary
        Colour of the mark, the button and the spots bar.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the reveal plays.

        children
        ReactNode
        —
        The parts, in reading order.

### Waitlist.Form

        Prop
        Type
        Default
        Description

        onJoin
        (email: string) =&gt; void | number | Promise&lt;void | number&gt;
        —
        Called on submit. A promise holds the busy state; a number becomes the place in line; a thrown Error shows its message under the field.

        placeholder
        string
        "name@email.com"
        Field placeholder.

        action
        string
        "Get on the list"
        Button label.

        successTitle, successText
        string
        "Your spot is saved", "Expect an email from us as soon as your invite opens up."
        The thank-you.

        positionLabel
        string
        "in line"
        The word after the number.

        shareUrl
        string
        —
        The reader's invite link. Given, the thank-you shows a copy button.

        shareLabel, shareHint
        string
        "Copy referral link", "Each friend who joins bumps you forward."
        The copy button's label and the line beside it.

        note
        string
        —
        A small line under the form.

### Waitlist.Countdown, Proof, Spots

        Part
        Prop
        Type
        Description

        Countdown
        date
        Date | string
        When the doors open. Days, hours, minutes and seconds to it are shown, ticking — the Counter's slide countdown.

        Countdown
        label, doneLabel
        string
        The line over the figures ("Launching in"), and what replaces them once the date has passed ("Now live").

        Proof
        avatars
        string[]
        Up to four faces, stacked, with the rest folded into a count; the line is the children.

        Spots
        claimed, total
        number
        How many early places are gone, of how many. The figure counts up and the bar fills to match; pass children to write the line yourself.

`Mark` takes children — a letter, an `` or an SVG — and sits in a square of the accent. `Heading` and `Intro` take children and any heading / paragraph props.

---

**Component Path:** `[framework]\waitlist\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
