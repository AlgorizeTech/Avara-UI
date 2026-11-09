---
title: "Shadcn Review Section"
description: "A review and testimonial section with either a rotating 3D globe marquee or a 3D stacked portrait carousel with arrow navigation. Free shadcn/ui Review Section."
url: https://avaraui.com/docs/nextjs/reviews
---

# Shadcn Review Section

A high-converting Review / Testimonial website section featuring a 3D WebGL rotating background globe marquee or an interactive 3D stacked portrait carousel with smooth rolling motion and arrow navigation.

Designed to showcase client feedback, agency trust signals, and social proof with maximum visual impact and dynamic theme color integration.

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/reviews

**When to use it.** A testimonials section. Four designs: an envelope that opens to a letter, rolling stacked cards, a logo-tab carousel with a quote card, and a wall of vertical marquee columns.

**Gotchas:**

- All four are looks of the one `reviews` item: install it once and set `variant` from the index.

### The 4 variants

1. **Testimonial loom (envelope carousel)** (`testimonial-loom`): A 3D envelope opens, a ruled testimonial letter slides out and settles on the front with a postmark.
   - Live: https://avaraui.com/view/reviews/testimonial-loom
   - Best for: a few strong, personal testimonials that deserve a moment each
   - Avoid if: you have many short reviews to show at once
   - Traits: 3D envelope flap, letter card, rubber postmark, carousel
   - Install: `npx shadcn@latest add @avara-ui/reviews`
   - Set these props: `{"variant":"testimonial-loom"}`
   - Docs: https://avaraui.com/docs/nextjs/reviews#testimonial-loom-pro-envelope-carousel
2. **3D stacked cards carousel** (`stacked-carousel`): Three stacked portrait cards that roll into place with arrow navigation.
   - Live: https://avaraui.com/view/reviews/stacked-carousel
   - Best for: testimonials that come with a portrait of the person
   - Avoid if: you have no portraits or photos of reviewers
   - Traits: 3 stacked portrait cards, rolling rotation, arrow navigation
   - Install: `npx shadcn@latest add @avara-ui/reviews`
   - Set these props: `{"variant":"stacked-carousel"}`
   - Docs: https://avaraui.com/docs/nextjs/reviews#3d-stacked-cards-carousel-with-rolling-motion-arrows
3. **Interactive brand logo carousel** (`logo-carousel`): Company logo tabs that switch a split testimonial quote card with the author's portrait.
   - Live: https://avaraui.com/view/reviews/logo-carousel
   - Best for: B2B proof: quotes from named companies, led by their logos
   - Avoid if: your reviewers are individuals with no company logos
   - Traits: company logo tabs, split quote card, author portrait
   - Install: `npx shadcn@latest add @avara-ui/reviews`
   - Set these props: `{"variant":"logo-carousel"}`
   - Docs: https://avaraui.com/docs/nextjs/reviews#interactive-brand-logo-carousel
4. **Up-down vertical marquee** (`up-down-marquee`): Four infinite vertical columns of reviews scrolling up and down, pausing on hover.
   - Live: https://avaraui.com/view/reviews/up-down-marquee
   - Best for: a wall of many short reviews that shows volume
   - Avoid if: you have only a few reviews; you want visitors to read each one at their own pace
   - Traits: 4 infinite columns, alternating directions, pauses on hover
   - Install: `npx shadcn@latest add @avara-ui/reviews`
   - Set these props: `{"variant":"up-down-vertical-marquee"}`
   - Docs: https://avaraui.com/docs/nextjs/reviews#updown-vertical-marquee

## Testimonial Loom Pro (Envelope Carousel)

- 4-Stage Envelope Choreography `variant="testimonial-loom"` opens the 3D top envelope flap, extracts the ruled testimonial letter card upward out of the pocket, and settles it onto the front of the envelope with a rubber postmark and mini-envelope thumbnail selector.

```tsx
import { ReviewsBlock } from "@/components/custom/blocks/ReviewsBlock";

export default function TestimonialLoomDemo() {
  return <ReviewsBlock variant="testimonial-loom" />;
}
```

## UpDown Vertical Marquee

- Features `up-down-vertical-marquee=UpDown Vertical Marquee` renders 4 infinite vertical marquee columns scrolling up and down with hover pause.

```tsx
import { ReviewsBlock, type ReviewItem } from "@/components/custom/blocks/ReviewsBlock";

const sampleReviews: ReviewItem[] = [
  {
    id: "1",
    name: "Tamar Mendelson",
    role: "Restaurant Critic",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
    rating: 5.0,
    content:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive.",
  },
  {
    id: "2",
    name: "Alice Johnson",
    role: "Product Director",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
    rating: 5.0,
    content:
      "The difference between AlgorizeTech and other agencies is their talent pool. Code quality, architecture, and attention to detail are on a completely different level.",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    role: "Co-Founder & CEO",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
    rating: 5.0,
    content:
      "Their 'Quality Obsessed' mantra is apparent in everything they do. Delivered a final product that increased our conversion rate by 40%.",
  },
  {
    id: "4",
    name: "Sofia Chen",
    role: "Lead Systems Architect",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
    rating: 5.0,
    content:
      "Integrating their modular UI components shaved weeks off our launch roadmap. Performance optimizations saved us hundreds of hours.",
  },
  {
    id: "5",
    name: "Mr. Martin",
    role: "Chief Operating Officer",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
    rating: 5.0,
    content:
      "The unlimited revisions gave us creative freedom to experiment without scope creep. AlgorizeTech didn't stop until we were 100% thrilled.",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Head of Design",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
    rating: 5.0,
    content:
      "The attention to typography, micro-interactions, and responsive layout scaling surpassed all our expectations.",
  },
  {
    id: "7",
    name: "Elena Rostova",
    role: "VP of Engineering",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
    rating: 5.0,
    content:
      "Their components are bulletproof. Seamless dark mode integration and flawless animation physics out of the box.",
  },
  {
    id: "8",
    name: "Marcus Vance",
    role: "Tech Lead",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
    rating: 5.0,
    content:
      "Outstanding developer experience. Clean TypeScript types, modular exports, and instant setup across projects.",
  },
];

export default function VerticalMarqueeDemo() {
  return (
    <ReviewsBlock
      variant="up-down-vertical-marquee"
      title="Loved by Tech Leaders Worldwide"
      subtitle="See how fast-growing teams scale products with our senior engineering team."
      reviews={sampleReviews}
    />
  );
}
```

## 3D Stacked Cards Carousel with Rolling Motion & Arrows

- Features `stacked-carousel=3D Stacked Carousel` renders 3 stacked portrait cards with smooth rolling rotation motion and arrow navigation.

```tsx
import { ReviewsBlock, type ReviewItem } from "@/components/custom/blocks/ReviewsBlock";

const sampleReviews: ReviewItem[] = [
  {
    id: "1",
    name: "Tamar Mendelson",
    role: "Restaurant Critic",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
    rating: 5.0,
    content:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive.",
  },
  {
    id: "2",
    name: "Alice Johnson",
    role: "Product Director",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
    rating: 5.0,
    content:
      "The difference between AlgorizeTech and other agencies is their talent pool. Code quality, architecture, and attention to detail are on a completely different level.",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    role: "Co-Founder & CEO",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
    rating: 5.0,
    content:
      "Their 'Quality Obsessed' mantra is apparent in everything they do. Delivered a final product that increased our conversion rate by 40%.",
  },
  {
    id: "4",
    name: "Sofia Chen",
    role: "Lead Systems Architect",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
    rating: 5.0,
    content:
      "Integrating their modular UI components shaved weeks off our launch roadmap. Performance optimizations saved us hundreds of hours.",
  },
  {
    id: "5",
    name: "Mr. Martin",
    role: "Chief Operating Officer",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
    rating: 5.0,
    content:
      "The unlimited revisions gave us creative freedom to experiment without scope creep. AlgorizeTech didn't stop until we were 100% thrilled.",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Head of Design",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
    rating: 5.0,
    content:
      "The attention to typography, micro-interactions, and responsive layout scaling surpassed all our expectations.",
  },
  {
    id: "7",
    name: "Elena Rostova",
    role: "VP of Engineering",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
    rating: 5.0,
    content:
      "Their components are bulletproof. Seamless dark mode integration and flawless animation physics out of the box.",
  },
  {
    id: "8",
    name: "Marcus Vance",
    role: "Tech Lead",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
    rating: 5.0,
    content:
      "Outstanding developer experience. Clean TypeScript types, modular exports, and instant setup across projects.",
  },
];

export default function StackedCarouselDemo() {
  return (
    <ReviewsBlock
      variant="stacked-carousel"
      title="Loved by Tech Leaders Worldwide"
      subtitle="See how fast-growing teams scale products with our senior engineering team."
      reviews={sampleReviews}
    />
  );
}
```

## Interactive Brand Logo Carousel

- Features `logo-carousel=Logo Carousel` renders interactive company logo tabs with split testimonial quote card and author portrait.

```tsx
import { ReviewsBlock, type ReviewItem } from "@/components/custom/blocks/ReviewsBlock";

const sampleReviews: ReviewItem[] = [
  {
    id: "1",
    name: "Tamar Mendelson",
    role: "Restaurant Critic",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
    rating: 5.0,
    content:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive.",
  },
  {
    id: "2",
    name: "Alice Johnson",
    role: "Product Director",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
    rating: 5.0,
    content:
      "The difference between AlgorizeTech and other agencies is their talent pool. Code quality, architecture, and attention to detail are on a completely different level.",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    role: "Co-Founder & CEO",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
    rating: 5.0,
    content:
      "Their 'Quality Obsessed' mantra is apparent in everything they do. Delivered a final product that increased our conversion rate by 40%.",
  },
  {
    id: "4",
    name: "Sofia Chen",
    role: "Lead Systems Architect",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
    rating: 5.0,
    content:
      "Integrating their modular UI components shaved weeks off our launch roadmap. Performance optimizations saved us hundreds of hours.",
  },
  {
    id: "5",
    name: "Mr. Martin",
    role: "Chief Operating Officer",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
    rating: 5.0,
    content:
      "The unlimited revisions gave us creative freedom to experiment without scope creep. AlgorizeTech didn't stop until we were 100% thrilled.",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Head of Design",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
    rating: 5.0,
    content:
      "The attention to typography, micro-interactions, and responsive layout scaling surpassed all our expectations.",
  },
  {
    id: "7",
    name: "Elena Rostova",
    role: "VP of Engineering",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
    rating: 5.0,
    content:
      "Their components are bulletproof. Seamless dark mode integration and flawless animation physics out of the box.",
  },
  {
    id: "8",
    name: "Marcus Vance",
    role: "Tech Lead",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
    rating: 5.0,
    content:
      "Outstanding developer experience. Clean TypeScript types, modular exports, and instant setup across projects.",
  },
];

export default function LogoCarouselDemo() {
  return (
    <ReviewsBlock
      variant="logo-carousel"
      title="Loved by teams building what's next"
      subtitle="Hear how founders are using our platform to save time, simplify their workflow, and grow their business."
      reviews={sampleReviews}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/reviews.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/reviews
```

## Features

Discover the key capabilities of the `ReviewsBlock` component:

- **UpDown Vertical Marquee**: 4 infinite scrolling columns moving continuously (Column 1 Up, Column 2 Down, Column 3 Up, Column 4 Down) with hover-to-pause interaction.
- **3D Stacked Portrait Carousel**: Interactive 3-card stacked portrait layout with spring-eased CSS transitions, rolling 3D card rotation, and circular arrow buttons.
- **Interactive Brand Logo Carousel**: Split card layout with company logo tabs, quote transition animations, author portrait, indicator dots, and round navigation controls.
- **Modern Review Cards**: Avatar image, name, role, 5-star rating, and clean typography in a modern card container.
- **Dynamic Site Theme Accent**: Automatically binds to site CSS variables (`var(--primary)`) with live color preset support.
- **Full Customizability**: Pass custom `variant`, `title`, `subtitle`, `reviews` data array, and `glowColor` accents.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"testimonial-loom" \| "up-down-vertical-marquee" \| "stacked-carousel" \| "logo-carousel"` | `"up-down-vertical-marquee"` | Determines the visual review layout style (4-stage interactive envelope loom, infinite up/down vertical marquee, 3D stacked cards, or brand logo carousel). |
| `title` | `string` | `"Loved by Teams Worldwide"` | Main headline text rendered at the top of the reviews section. |
| `subtitle` | `string` | `"See what founders, designers, and engineers are saying..."` | Supporting paragraph description displayed below the title. |
| `reviews` | `ReviewItem[]` | `DEFAULT_REVIEWS` | Array of review objects with `id`, `name`, `role`, `avatar`, `rating`, and `content`. |
| `autoSlide` | `boolean` | `true` | Enables automatic card sliding for stacked carousel variants. |
| `autoSlideInterval` | `number` | `5000` | Interval duration in milliseconds for auto-sliding stacked cards. |
| `className` | `string` | `undefined` | Additional custom Tailwind CSS class names applied to the container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/reviews
