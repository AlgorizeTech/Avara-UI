# Avatar Stack

A row of overlapping faces — the "people who…" cue under a headline, beside a count, or next to a join button. It shows up to `max` faces, folds the rest into a "+N" disc, and takes an optional trailing `action` that shares the stack's size. On hover the faces fan apart a little, so the row answers the pointer without turning into a carousel.

Several sections used to hand-roll this row; Fashion Hero uses this one.

export const usageAction = `import { Plus } from "lucide-react";

// Faces from Pexels, free to use.
const pexels = (id: number) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop\`;

const PEOPLE = [
  { src: pexels(1036623), alt: "Ana" },
  { src: pexels(2043590), alt: "Tom" },
  { src: pexels(1587009), alt: "Mara" },
];

export default function Community() {
  return (

      }
    />
  );
}`;

export const usageCount = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

export default function JoinedThisMonth({ people }: { people: { src: string; alt: string }[] }) {
  return (

        2,400+ people joined this month

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/avatar-stack
```

## Examples

## Props Reference

        Prop
        Type
        Default
        Description

        avatars
        &#123; src: string; alt?: string &#125;[]
        Required
        The faces, in order.

        size
        "sm" | "md" | "lg"
        "md"
        28, 36 or 44 pixels per face.

        max
        number
        4
        Faces shown before the rest fold into a +N disc.

        ringClassName
        string
        "ring-white dark:ring-zinc-950"
        Colour of the gap between faces.

        action
        ReactNode
        —
        A trailing element at the same size as a face.

        spreadOnHover
        boolean
        true
        Faces fan apart a little while the row is hovered.

---

**Component Path:** `[framework]\avatar-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
