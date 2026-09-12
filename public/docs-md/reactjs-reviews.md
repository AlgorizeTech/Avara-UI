# Review Section

A high-converting Review / Testimonial website section featuring a 3D WebGL rotating background globe marquee or an interactive 3D stacked portrait carousel with smooth rolling motion and arrow navigation.

Designed to showcase client feedback, agency trust signals, and social proof with maximum visual impact and dynamic theme color integration.

export const sampleReviewsData = `const sampleReviews: ReviewItem[] = [
  {
    id: "1",
    name: "Tamar Mendelson",
    role: "Restaurant Critic",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive.",
  },
  {
    id: "2",
    name: "Alice Johnson",
    role: "Product Director",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "The difference between AlgorizeTech and other agencies is their talent pool. Code quality, architecture, and attention to detail are on a completely different level.",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    role: "Co-Founder & CEO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "Their 'Quality Obsessed' mantra is apparent in everything they do. Delivered a final product that increased our conversion rate by 40%.",
  },
  {
    id: "4",
    name: "Sofia Chen",
    role: "Lead Systems Architect",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "Integrating their modular UI components shaved weeks off our launch roadmap. Performance optimizations saved us hundreds of hours.",
  },
  {
    id: "5",
    name: "Mr. Martin",
    role: "Chief Operating Officer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "The unlimited revisions gave us creative freedom to experiment without scope creep. AlgorizeTech didn't stop until we were 100% thrilled.",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Head of Design",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "The attention to typography, micro-interactions, and responsive layout scaling surpassed all our expectations.",
  },
  {
    id: "7",
    name: "Elena Rostova",
    role: "VP of Engineering",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "Their components are bulletproof. Seamless dark mode integration and flawless animation physics out of the box.",
  },
  {
    id: "8",
    name: "Marcus Vance",
    role: "Tech Lead",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    content:
      "Outstanding developer experience. Clean TypeScript types, modular exports, and instant setup across projects.",
  },
];`;

export const usageStackedCarousel = `import { ReviewsBlock, type ReviewItem } from "@/components/custom/blocks/ReviewsBlock";

${sampleReviewsData}

export default function StackedCarouselDemo() {
  return (
    
  );
}`;

export const usageVerticalMarquee = `import { ReviewsBlock, type ReviewItem } from "@/components/custom/blocks/ReviewsBlock";

${sampleReviewsData}

export default function VerticalMarqueeDemo() {
  return (
    
  );
}`;

## Installation

## Features

Discover the key capabilities of the `ReviewsBlock` component:

- **UpDown Vertical Marquee**: 4 infinite scrolling columns moving continuously (Column 1 Up, Column 2 Down, Column 3 Up, Column 4 Down) with hover-to-pause interaction.
- **3D Stacked Portrait Carousel**: Interactive 3-card stacked portrait layout with Framer Motion spring physics, rolling 3D card rotation, and circular arrow buttons.
- **Modern Review Cards**: Avatar image, name, role, 5-star rating, and clean typography in a modern card container.
- **Dynamic Site Theme Accent**: Automatically binds to site CSS variables (`var(--primary)`) with live color preset support.
- **Full Customizability**: Pass custom `variant`, `title`, `subtitle`, `reviews` data array, and `glowColor` accents.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "up-down-vertical-marquee" | "stacked-carousel"
        "up-down-vertical-marquee"
        Determines the visual review layout style (infinite up/down vertical marquee or 3D stacked cards).

        title
        string
        "Loved by Teams Worldwide"
        Main headline text rendered at the top of the reviews section.

        subtitle
        string
        "See what founders, designers, and engineers are saying..."
        Supporting paragraph description displayed below the title.

        reviews
        ReviewItem[]
        DEFAULT_REVIEWS
        Array of review objects with id, name, role, avatar, rating, and content.

        autoSlide
        boolean
        true
        Enables automatic card sliding for stacked carousel variants.

        autoSlideInterval
        number
        5000
        Interval duration in milliseconds for auto-sliding stacked cards.

        className
        string
        undefined
        Additional custom Tailwind CSS class names applied to the container.

---

**Component Path:** `[framework]\reviews\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
