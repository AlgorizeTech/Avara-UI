# Avatar Stack

A row of overlapping faces — the "people who…" cue under a headline, beside a count, or next to a join button. It shows up to `max` faces, folds the rest into a "+N" disc, and takes an optional trailing `action` that shares the stack's size. On hover the faces fan apart a little, so the row answers the pointer without turning into a carousel.

Several sections used to hand-roll this row; Fashion Hero uses this one.

export const usageDefault = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo" },
];

export default function BasicAvatarStack() {
  return (
    
  );
}`;

export const usageAction = `import { Plus } from "lucide-react";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara" },
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

export const usageSizes = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo" },
];

export default function SizesDemo() {
  return (
    
      {/* Small with tooltip */}

      {/* Medium without tooltip */}

      {/* Large with tooltip */}

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
        The list of faces in order. The alt text is displayed inside the hover tooltip.

        size
        "sm" | "md" | "lg"
        "md"
        Avatar diameter: sm (28px), md (36px), or lg (44px).

        max
        number
        4
        Maximum faces shown before the rest fold into a +N count disc.

        ringClassName
        string
        "ring-background"
        Border/gap colour between overlapping faces. Defaults to theme background.

        action
        ReactNode
        —
        A trailing element (such as an add/join button) rendered at the same size as an avatar.

        spreadOnHover
        boolean
        true
        Whether faces smoothly fan apart slightly when the stack is hovered.

        liftOnHover
        boolean
        true
        Whether the hovered face rises above neighbours and scales up slightly.

        showTooltip
        boolean
        true
        Whether hover reveals the avatar's alt text in a tooltip. Set to false to disable tooltips. (Alias: tooltip).

---

**Component Path:** `[framework]\avatar-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
