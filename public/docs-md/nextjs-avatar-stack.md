export const metadata = docsPageMetadata("avatar-stack");

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

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function JoinedThisMonth() {
  return (

        2,400+ people joined this month

  );
}`;

export const usageSizes = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
];

export default function SizesDemo() {
  return (
    
      {/* Small with tooltip */}

      {/* Medium without tooltip */}

      {/* Large with arrow tooltip */}

  );
}`;

export const usageTooltip = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
];

export default function TooltipZoomAvatarStack() {
  // Zoom on hover with tooltip, gap remains fixed
  return (
    
  );
}`;

export const usageTooltipArrow = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
];

export default function TooltipArrowAvatarStack() {
  // Tooltip with pointing arrow and zoom on hover
  return (
    
  );
}`;

export const usageSpread = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo" },
];

export default function SpreadOnHover() {
  // Width expands to the right on hover and hovered face shifts slightly upward (-30%) without zoom
  return (
    
  );
}`;

export const usageSpreadTooltip = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
];

export default function SpreadWithTooltip() {
  // Width expands to the right on hover, hovered face shifts up (-30%) and reveals tooltip without arrow
  return (
    
  );
}`;

export const usageSpreadTooltipArrow = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
];

export default function SpreadWithTooltipArrow() {
  // Width expands to the right on hover, hovered face shifts up (-30%) and reveals tooltip with pointing arrow popup
  return (
    
  );
}`;

export const usageAvatarGroup = `import {
  AvatarGroup,
  AvatarGroupTooltip,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Ana Watson",
    name: "Ana Watson",
    fallback: "AW",
    designation: "Founder & CEO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    fallback: "TH",
    designation: "Co-Founder & CTO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    fallback: "MJ",
    designation: "Managing Director",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
    alt: "Leo Silva",
    name: "Leo Silva",
    fallback: "LS",
    designation: "Chairman & Co-Founder",
  },
];

export default function AvatarGroupDemo() {
  return (
    
      {PEOPLE.map((avatar, index) => (

          {avatar.fallback}
          
            {avatar.name}

      ))}
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/avatar-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/avatar-stack
```

## Examples

## Best Practices & Guidelines

    Optimal Avatar Count
    Limit visible avatars to 3–5 items using the max prop. Folding excess avatars into a +N counter keeps your layout balanced, avoids horizontal overflow on mobile screens, and maintains clean visual hierarchy.

    Smooth Hover Motion
    When enabling spreadOnHover, keep spreadDistance subtle (4–8px) and transitionDuration around 500ms. Pair with translate="-30%" to gently elevate the hovered avatar above its neighbors without jarring layout shifts.

    Tooltip Accessibility & Text Alignment
    Always provide accessible alt or name attributes for every avatar. When a designation or subtitle is provided, tooltips automatically align text to the left; otherwise, titles stay cleanly centered for single-line labels.

    Ring Contrast & Background Matching
    Ensure ringClassName matches the surface the avatars rest upon (defaults to ring-background). A matching border ring creates clean visual separation between overlapping faces in both light and dark modes.

## Props Reference

### AvatarGroup Props

        Prop
        Type
        Default
        Description

        translate
        string | number
        "-30%"
        Vertical displacement of each avatar on hover using spring motion.

        invertOverlap
        boolean
        true
        Whether earlier avatars sit on top of subsequent ones. Hovering automatically raises an avatar's z-index to 50.

        transition
        Transition
        &#123; type: "spring", stiffness: 300, damping: 17 &#125;
        Spring transition configuration for the hover shift animation.

        showTooltip
        boolean
        true
        Whether to show the floating gliding tooltip on hover. Set to false to disable tooltips.

        children
        ReactNode
        —
        Composable &lt;Avatar&gt; elements containing images, fallbacks, and optional &lt;AvatarGroupTooltip&gt;.

### AvatarStack Props

        Prop
        Type
        Default
        Description

        avatars
        &#123; src: string; alt?: string; name?: string; tooltip?: string; designation?: string; role?: string; fallback?: string &#125;[]
        Required
        The list of faces in order. Hover tooltips display the avatar's name/alt, and optionally designation/role beneath it if provided.

        variant
        "default" | "shift"
        "default"
        Presentation style: default (smooth fan out) or shift (animate-ui spring shift upward with pointer tooltip).

        size
        "sm" | "md" | "lg" | "xl"
        "md"
        Avatar diameter: sm (28px), md (36px), lg (44px), or xl (48px).

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

        spreadDistance
        number
        6
        Number of pixels each subsequent avatar shifts to the right on hover when spreadOnHover is enabled.

        translate
        string | number
        "-30%"
        Vertical displacement of an avatar when hovered (e.g. "-30%").

        transitionDuration
        number
        500
        Duration of the spread and hover transition in milliseconds for a smooth, gentle animation.

        liftOnHover
        boolean
        true
        Whether the hovered face rises above neighbours and scales up slightly.

        showTooltip
        boolean
        true
        Whether hover reveals the avatar's alt text in a tooltip. Set to false to disable tooltips. (Alias: tooltip).

        showTooltipArrow
        boolean
        false
        Whether to render an anchored pointer arrow beneath the hover tooltip.

---

**Component Path:** `[framework]\avatar-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
