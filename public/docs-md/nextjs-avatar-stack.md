export const metadata = docsPageMetadata("avatar-stack");

# Avatar Stack

A row of overlapping faces — the "people who…" cue under a headline, beside a count, or next to a join button. It shows up to `max` faces, folds the rest into a "+N" disc, and takes an optional trailing `action` that shares the stack's size. On hover the faces fan apart a little, so the row answers the pointer without turning into a carousel.

Several sections used to hand-roll this row; Fashion Hero uses this one.

export const usageDefault = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function BasicAvatarStack() {
  return (
    
  );
}`;

export const usageTooltip = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function TooltipZoomAvatarStack() {
  return (
    
  );
}`;

export const usageTooltipArrow = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function TooltipArrowAvatarStack() {
  return (
    
  );
}`;

export const usageSpread = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadOnHover() {
  return (
    
  );
}`;

export const usageSpreadTooltip = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadWithTooltip() {
  return (
    
  );
}`;

export const usageSpreadTooltipArrow = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadWithTooltipArrow() {
  return (
    
  );
}`;

export const usageAction = `"use client";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
];

export default function Community() {
  return (
     console.log("Action clicked")}
    />
  );
}`;

export const usageCount = `"use client";

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
    
       console.log(\`Clicked +\${restCount} more\`)}
      />
      
        2,400+ people joined this month

  );
}`;

export const usageSizes = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SizesDemo() {
  return (
    
      {/* Small with tooltip */}

      {/* Medium without tooltip */}

      {/* Large with arrow tooltip */}

  );
}`;

export const usageAvatarGroup = `import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function AvatarGroupDemo() {
  return (
    
  );
}`;

 void to handle clicks on the +N counter disc.",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it if not needed.",
        },
      ],
      props: { example: "avatar-group", showTooltip: true },
      usage: usageAvatarGroup,
      code: extractCode("src/components/custom/blocks/AvatarStackBlock.tsx"),
      minHeight: 260,
    },
  ]}
/>

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

 void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "default", variant: "zoom", type: "default" },
      usage: usageDefault,
      minHeight: 240,
    },
    {
      title: "With tooltip (Zoom on hover)",
      subheading:
        "Hovering an avatar displays its name in a tooltip and zooms the face upward, keeping the row's gap fixed.",
      propNotes: [
        {
          prop: "variant",
          value: '"zoom"',
          effect: "raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.",
        },
        {
          prop: "type",
          value: '"tooltip"',
          effect: "displays the avatar's name and designation in a clean floating tooltip on hover.",
        },
        {
          prop: "max",
          value: "4",
          effect: "sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "tooltip", variant: "zoom", type: "tooltip" },
      usage: usageTooltip,
      minHeight: 240,
    },
    {
      title: "With tooltip arrow (Zoom on hover)",
      subheading:
        "Displays an anchored pointer arrow underneath the tooltip card with a lively spring popup animation as avatars smoothly zoom on hover.",
      propNotes: [
        {
          prop: "variant",
          value: '"zoom"',
          effect: "raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.",
        },
        {
          prop: "type",
          value: '"tooltip-arrow"',
          effect: "renders a floating tooltip with a pointer arrow anchoring to the top of the avatar circle.",
        },
        {
          prop: "max",
          value: "4",
          effect: "sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "tooltip-arrow", variant: "zoom", type: "tooltip-arrow" },
      usage: usageTooltipArrow,
      minHeight: 240,
    },
    {
      title: "Spread on hover (Expand width)",
      subheading:
        "Hovering over the stack smoothly fans the avatars out to the right and subtly shifts the hovered face upward without zooming.",
      propNotes: [
        {
          prop: "variant",
          value: '"spread"',
          effect: "smoothly shifts subsequent avatars to the right on hover (6px) and elevates the hovered face by -30% without scaling.",
        },
        {
          prop: "type",
          value: '"default"',
          effect: "disables tooltips so the avatars fan out cleanly without info popups.",
        },
        {
          prop: "max",
          value: "4",
          effect: "sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "spread", variant: "spread", type: "default" },
      usage: usageSpread,
      minHeight: 240,
    },
    {
      title: "Spread with tooltip",
      subheading:
        "Hovering over the stack widens the avatar gap to the right, elevates the hovered face by -30%, and displays a clean floating tooltip above it.",
      propNotes: [
        {
          prop: "variant",
          value: '"spread"',
          effect: "smoothly shifts subsequent avatars to the right on hover and elevates the hovered face by -30%.",
        },
        {
          prop: "type",
          value: '"tooltip"',
          effect: "displays a clean floating tooltip without a pointer arrow on hover.",
        },
        {
          prop: "max",
          value: "4",
          effect: "sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "spread-tooltip", variant: "spread", type: "tooltip" },
      usage: usageSpreadTooltip,
      minHeight: 240,
    },
    {
      title: "Spread with tooltip arrow",
      subheading:
        "Hovering widens the stack to the right, subtly raises the hovered face, and reveals a spring popup tooltip with an anchored pointer arrow.",
      propNotes: [
        {
          prop: "variant",
          value: '"spread"',
          effect: "smoothly shifts subsequent avatars to the right on hover and elevates the hovered face by -30%.",
        },
        {
          prop: "type",
          value: '"tooltip-arrow"',
          effect: "renders a floating tooltip with an anchored pointer arrow underneath and spring popup animation.",
        },
        {
          prop: "max",
          value: "4",
          effect: "sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.",
        },
      ],
      props: { example: "spread-tooltip-arrow", variant: "spread", type: "tooltip-arrow" },
      usage: usageSpreadTooltipArrow,
      minHeight: 240,
    },
    {
      title: "With an action",
      subheading: "Three faces using the zoom variant with clean tooltips and a trailing plus action button that triggers an onClick handler.",
      propNotes: [
        {
          prop: "variant",
          value: '"zoom"',
          effect: "raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.",
        },
        {
          prop: "type",
          value: '"tooltip"',
          effect: "displays the avatar's name and designation in a clean floating tooltip on hover.",
        },
        {
          prop: "action",
          value: "() => void",
          effect:
            "renders the built-in '+' action button at the end of the stack and triggers your onClick function when clicked.",
        },
      ],
      props: { example: "action", variant: "zoom", type: "tooltip" },
      usage: usageAction,
      minHeight: 240,
    },
    {
      title: "Folded count",
      subheading: "Six people, three shown — the rest become a clickable +3 disc. Hovering faces or the counter disc displays arrow tooltips.",
      propNotes: [
        {
          prop: "max",
          value: "3",
          effect: "is how many faces show before the rest fold into a +N count disc.",
        },
        {
          prop: "onMoreClick",
          value: "(restCount, hiddenAvatars) => void",
          effect: "triggers your onClick callback when the +N counter disc is clicked.",
        },
        {
          prop: "variant",
          value: '"zoom"',
          effect: "raises and zooms the hovered face or counter disc above its neighbours.",
        },
        {
          prop: "type",
          value: '"tooltip-arrow"',
          effect: "displays tooltips with pointer arrows and lively pop animations on hover.",
        },
        {
          prop: "action",
          effect: "optional — pass an onClick function () => void alongside max if you want both a +N counter and a trailing '+' button.",
        },
      ],
      props: { example: "count", variant: "zoom", type: "tooltip-arrow", max: 3 },
      usage: usageCount,
      minHeight: 240,
    },
    {
      title: "Sizes",
      subheading:
        "sm, md and lg — 28, 36 and 44 pixels. The small stack shows a clean tooltip (type=\"tooltip\"), the middle stack shows without tooltip (type=\"default\"), and the large stack displays tooltips with pointing arrows (type=\"tooltip-arrow\").",
      propNotes: [
        {
          prop: "size",
          effect: "controls the avatar circle dimensions: sm (28px), md (36px), lg (44px), or xl (48px).",
        },
        {
          prop: "variant",
          value: '"zoom"',
          effect: "scales the hovered avatar upward while keeping the row's spacing fixed.",
        },
        {
          prop: "type",
          effect: "configures each stack's tooltip style: \"tooltip\" (sm), \"default\" (md), and \"tooltip-arrow\" (lg).",
        },
        {
          prop: "ringClassName",
          effect:
            "is the gap colour between faces (`ring-background` by default). Match it to the surface the stack sits on.",
        },
      ],
      props: { example: "sizes" },
      usage: usageSizes,
      minHeight: 260,
    },
  ]}
/>

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
        "default" | "shift" | "zoom" | "spread"
        "default"
        Presentation style: shift (animate-ui spring shift upward with pointer tooltip), zoom (scale up on hover with fixed gap), or spread (smoothly fan out to the right and elevate on hover).

        type
        "default" | "tooltip" | "tooltip-arrow"
        "tooltip"
        Tooltip presentation type for zoom and spread variants: default (no tooltip), tooltip (clean floating tooltip), or tooltip-arrow (tooltip with anchored pointer arrow).

        size
        "sm" | "md" | "lg" | "xl"
        "md"
        Avatar diameter: sm (28px), md (36px), lg (44px), or xl (48px).

        max
        number
        4
        Maximum faces shown before the rest fold into a +N count disc. Can be customized on any variant.

        onMoreClick
        (restCount: number, hiddenAvatars: StackAvatar[], event: MouseEvent) =&gt; void
        —
        Click handler triggered when the folded +N counter disc is clicked.

        ringClassName
        string
        "ring-background"
        Border/gap colour between overlapping faces. Defaults to theme background.

        action
        ((event: MouseEvent) =&gt; void) | &#123; onClick?: (event: MouseEvent) =&gt; void; label?: string &#125; | boolean | ReactNode
        —
        Single prop for the trailing + action button: pass an onClick function () =&gt; void, &#123; onClick, label &#125;, true, or custom ReactNode.

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
