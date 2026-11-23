---
title: "Shadcn Card"
description: "A flexible container used to group related information and actions together in a visually distinct box. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/card
---

# Shadcn Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` and `ProductCardBlock` provide a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`, `ProductCard`) that automatically manage internal spacing and interactive states.

## Teaser card

Three to a row: an image, a meta line, a title with a corner arrow, and a tag beside the date.

```tsx
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { ArrowUpRight } from "lucide-react";

const TEASERS = [
  {
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
    coverAlt: "Abstract flowing ink in blue and violet",
    author: "William Ashford",
    read: "5 min read",
    title: "Optimizing Business decisions with Advanced data Analytics",
    dek: "Discover how web solutions are reshaping the business landscape.",
    tag: "Data Science",
    date: "Mar 09, 2024",
  },
  {
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    coverAlt: "Glowing circuit board traces",
    author: "Priya Nair",
    read: "7 min read",
    title: "Designing interfaces that stay readable at any size",
    dek: "Practical rules for type, spacing and contrast that hold up on every screen.",
    tag: "Design",
    date: "Mar 02, 2024",
  },
  {
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1618005198919-d3d4b5a92ead-1790158812198.jpg",
    coverAlt: "Abstract render of intersecting shapes",
    author: "Marcus Bell",
    read: "4 min read",
    title: "Shipping faster with smaller, safer releases",
    dek: "How small batches cut risk and keep the whole team moving.",
    tag: "Engineering",
    date: "Feb 26, 2024",
  },
];

export default function ArticleTeaserCards() {
  return (
    <div className="grid w-full max-w-5xl gap-5 sm:grid-cols-3">
      {TEASERS.map((post) => (
        <Card key={post.title} variant="default" className="gap-0 rounded-[26px] p-3.5 shadow-lg">
          <img
            src={post.cover}
            alt={post.coverAlt}
            loading="lazy"
            className="h-44 w-full rounded-2xl object-cover"
          />

          <p className="mt-3.5 flex items-center gap-2 text-xs text-muted-foreground">
            {post.author}
            <span className="size-[3px] rounded-full bg-muted-foreground" />
            {post.read}
          </p>

          <div className="mt-2 flex items-start gap-3">
            <CardTitle className="line-clamp-2 flex-1 text-[15px] font-medium leading-snug tracking-normal">
              {post.title}
            </CardTitle>
            <ArrowUpRight className="mt-0.5 size-[18px] shrink-0 text-muted-foreground" />
          </div>

          <CardDescription className="mt-2 text-[13px] leading-relaxed">{post.dek}</CardDescription>

          <CardFooter className="mt-auto items-center gap-3 p-0 pt-4">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-foreground">
              {post.tag}
            </span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/card.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/card
```

## Examples

### Blog post cards

Three bare cards: a cover, the date, a title, and the author with a Read more link under a hairline.

```tsx
import { Card } from "@/components/custom/blocks/CardBlock";
import { ArrowRight } from "lucide-react";

const POST_CARDS = [
  {
    date: "October 1, 2024",
    title: "Mindful Moments: Simple Practices to Boost Your Mental Well-Being",
    author: "Sarah Thompson",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
    coverAlt: "Abstract flowing ink in blue and violet",
  },
  {
    date: "September 29, 2024",
    title: "The Connection Between Nutrition and Mental Health: What You Need to Know",
    author: "David Kim",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    coverAlt: "Glowing circuit board traces",
  },
  {
    date: "September 25, 2024",
    title: "The Power of Journaling: How Writing Can Transform Your Mind and Persona",
    author: "Emily Carter",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1618005198919-d3d4b5a92ead-1790158812198.jpg",
    coverAlt: "Abstract render of intersecting shapes",
  },
];

export default function BlogPostCards() {
  return (
    <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-3">
      {POST_CARDS.map((post) => (
        <Card
          key={post.title}
          variant="flat"
          className="group rounded-none border-0 bg-transparent shadow-none"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={post.cover}
              alt={post.coverAlt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{post.date}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-snug">{post.title}</h3>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs">
            <span className="text-muted-foreground">{post.author}</span>
            <a href="#" className="inline-flex items-center gap-1.5 font-medium">
              Read more <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Notched cards

A card with a tab cut into its top-right corner, in soft gray (light) or the card colour (dark). A concave fillet joins the tab to the body.

```tsx
import { Card } from "@/components/custom/blocks/CardBlock";

const CARDS = [
  {
    brand: "Archive Studio®",
    lead: "It’s high time to discuss the details.",
    headline: "Let’s Talk.",
    art: "bg-[linear-gradient(135deg,#02021f_0%,#0b1c7a_50%,#2a74ff_100%)]",
    dot: "bg-[#2f7bff]",
    active: 1,
  },
  {
    brand: "Level Up®",
    lead: "A new level of quality for your brand.",
    headline: "+190%",
    art: "bg-[linear-gradient(135deg,#1d0402_0%,#8a1a07_50%,#ff5a36_100%)]",
    dot: "bg-[#ff4a24]",
    active: 2,
  },
  {
    brand: "Spider’s Lair®",
    lead: "The spiders are ready to work.",
    headline: "One Call.",
    art: "bg-[linear-gradient(135deg,#0d0220_0%,#4b138f_50%,#b04bff_100%)]",
    dot: "bg-[#b44cff]",
    active: 3,
  },
];

export default function NotchedCards() {
  return (
    <div className="grid w-full max-w-[922px] gap-5 sm:grid-cols-3">
      {CARDS.map((card) => (
        <Card
          key={card.brand}
          variant="flat"
          className="relative rounded-none border-0 bg-transparent pt-[34px] shadow-none drop-shadow-sm [--shell:var(--muted)] dark:[--shell:var(--card)] dark:drop-shadow-none"
        >
          {/* The tab: rounded on top, with a concave fillet that eases it into the body. The shadow and the 1px overhang on the fillet overlap the body, so no seam shows at fractional widths. --shell is soft gray (muted) in light mode and the card colour in dark mode */}
          <div className="absolute right-0 top-0 flex h-[34px] w-[58%] items-center justify-end rounded-tl-[17px] rounded-tr-[28px] bg-(--shell) px-4 shadow-[0_1px_0_var(--shell)] before:absolute before:-bottom-px before:-left-[17px] before:h-[18px] before:w-[18px] before:[background:radial-gradient(circle_at_0_0,transparent_16.5px,var(--shell)_17.5px)]">
            <span className="text-[11px] font-medium">— {card.brand}</span>
          </div>

          <div className="rounded-[28px] rounded-tr-none bg-(--shell) p-4">
            <div className={"relative flex h-[150px] items-end overflow-hidden rounded-xl p-3.5 text-white " + card.art}>
              {/* Ribs give the flat gradient a 3D, folded-ribbon feel */}
              <div className="absolute inset-0 [mask-image:linear-gradient(100deg,transparent_25%,black)] bg-[repeating-linear-gradient(100deg,rgba(255,255,255,0.22)_0_2px,transparent_2px_9px)]" />
              <p className="relative text-[15px] font-medium leading-snug">{card.lead}</p>
            </div>

            <p className="mt-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-[44px] font-light leading-none tracking-tight text-transparent">
              {card.headline}
            </p>

            <div className="mt-6 flex gap-1.5" aria-hidden>
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={"size-2.5 rounded-full " + (n <= card.active ? card.dot : "bg-foreground/15")}
                />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Blog cards

Three posts across. The topic rides on the image, so the card body stays type-only.

- Set `interactive` to make the whole card clickable — the cover then scales gently on hover, and holds still under `prefers-reduced-motion`.

```tsx
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

const POSTS = [
  {
    topic: "Layout",
    title: "Grids that survive translation",
    dek: "German compound nouns broke our pricing table in four places. What we changed.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
    coverAlt: "Abstract flowing ink in blue and violet",
    author: "Maya Lin",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
    read: "7 min",
  },
  {
    topic: "Accessibility",
    title: "The accessibility tree is not a mirror",
    dek: "Two components that looked identical read as completely different things aloud.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    coverAlt: "Glowing circuit board traces",
    author: "Daniel Kim",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790159965/photo-1519085360753-af0119f7cbe7-1790159970113.jpg",
    read: "5 min",
  },
  {
    topic: "Machine learning",
    title: "Ship the model, keep the seams",
    dek: "Every inference call our app makes can fail. The UI has to say so plainly.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1618005198919-d3d4b5a92ead-1790158812198.jpg",
    coverAlt: "Abstract render of intersecting shapes",
    author: "Ethan Wright",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
    read: "9 min",
  },
];

export default function BlogCardGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {POSTS.map((post) => (
        <Card
          key={post.title}
          variant="bordered"
          interactive
          className="group overflow-hidden rounded-xl"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.cover}
              alt={post.coverAlt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            />
            {/* The topic rides on the image, so the card body stays type-only */}
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-900 backdrop-blur">
              {post.topic}
            </span>
          </div>

          <CardHeader className="gap-2 px-5 pb-3 pt-5">
            <CardTitle className="line-clamp-2 font-serif text-[17px] font-normal leading-snug tracking-normal">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {post.dek}
            </CardDescription>
          </CardHeader>

          <CardFooter className="items-center gap-2.5 px-5 pb-5 pt-0">
            <img src={post.avatar} alt="" className="size-7 shrink-0 rounded-full object-cover" />
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {post.author}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">{post.read}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Author cards

Two to a row: a cover beside a title and intro, then the author and round actions. Each card stacks when it gets narrow.

- Add `dark="className"` to a single card to pin it to the dark tokens, whatever the page theme. Without it the card follows light and dark.

```tsx
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Forward, MoreHorizontal } from "lucide-react";

const ARTICLES = [
  {
    tag: "#art",
    title: "Art, Creativity and Genius: A Journey Through Masterpieces",
    dek: "Discover the beauty, diversity and impact of art on society, from classical masterpieces to modern-day geniuses.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
    coverAlt: "Abstract flowing ink in blue and violet",
    author: "Samantha Smith",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
    date: "March 11, 2024",
  },
  {
    tag: "#tech",
    title: "Circuits and Code: How Hardware Shapes the Software We Write",
    dek: "A look at the physical limits behind everyday software, and the craft of working well inside them.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    coverAlt: "Glowing circuit board traces",
    author: "Daniel Kim",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790159965/photo-1519085360753-af0119f7cbe7-1790159970113.jpg",
    date: "March 4, 2024",
  },
];

export default function ArticleCards() {
  return (
    <div className="grid w-full max-w-5xl gap-5 md:grid-cols-2">
      {ARTICLES.map((article) => (
        // @container lets each card pick its own layout from its width, not the page's
        <div key={article.title} className="@container min-w-0">
          {/* Colours come from the theme tokens, so the card follows light and dark */}
          <Card variant="default" className="h-full gap-5 rounded-[28px] p-3 shadow-lg @sm:flex-row">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[22px] bg-muted @sm:aspect-auto @sm:w-[38%]">
              <img
                src={article.cover}
                alt={article.coverAlt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <span className="absolute left-3.5 top-3 text-sm font-medium text-white drop-shadow">
                {article.tag}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col py-1 pr-2">
              <CardTitle className="line-clamp-2 text-base font-medium leading-snug tracking-normal @lg:text-xl">
                {article.title}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2 text-xs leading-relaxed">
                {article.dek}
              </CardDescription>

              <CardFooter className="mt-auto items-center gap-3 p-0 pt-4">
                <img
                  src={article.avatar}
                  alt=""
                  loading="lazy"
                  className="size-9 shrink-0 rounded-full object-cover @lg:size-11"
                />
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-xs font-medium"><span className="hidden @lg:inline">By </span>{article.author}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{article.date}</p>
                </div>
                <button
                  type="button"
                  aria-label="Share"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card @lg:size-10"
                >
                  <Forward className="size-[17px]" />
                </button>
                <button
                  type="button"
                  aria-label="More options"
                  className="hidden size-9 shrink-0 place-items-center rounded-full border border-foreground/60 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card @lg:grid"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </CardFooter>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
```

### E-commerce Product Cards

Four reusable product cards for online stores and flash deal showcases.

- `variant="standard" | "compact" | "horizontal"` controls layout orientation and sizing across ProductCard variations.

```tsx
"use client";

import { useState } from "react";
import { ProductCard, type ProductColorOption } from "@/components/custom/blocks/ProductCardBlock";

export default function EcommerceProductCardsDemo() {
  const [sneakerBg, setSneakerBg] = useState(
    "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-card border-amber-500/30"
  );
  const [watchBg, setWatchBg] = useState(
    "bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-card border-indigo-500/30"
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Product Card 1: Headphones */}
      <ProductCard
        title="Wireless Noise-Cancelling Headphones"
        subtitle="AudioTech Pro"
        description="Pure bass acoustics, 40h battery life & dual microphone noise suppression."
        price="$249.00"
        originalPrice="$299.00"
        rating={4.9}
        reviewsCount={128}
        badge="Best Seller"
        badgeVariant="emerald"
        image={
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-card flex items-center justify-center">
            <span className="text-5xl drop-shadow-md transition-transform duration-300 hover:scale-110">🎧</span>
          </div>
        }
        onAddToCart={() => console.log("Added to cart")}
      />

      {/* Product Card 2: Sneakers with Dynamic Swatches */}
      <ProductCard
        title="Urban Runner Sneakers X"
        subtitle="Footwear Co"
        description="Ultra-lightweight mesh knit with responsive cushion soles for daily runs."
        price="$89.00"
        originalPrice="$129.00"
        badge="-30% OFF"
        badgeVariant="rose"
        image={
          <div className={"w-full h-full flex items-center justify-center transition-all duration-300 " + sneakerBg}>
            <span className="text-5xl drop-shadow-md transition-transform duration-300 hover:scale-110">👟</span>
          </div>
        }
        colors={[
          {
            name: "Amber",
            value:
              "bg-amber-600 border-amber-500|bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-card border-amber-500/30",
          },
          {
            name: "Rose",
            value:
              "bg-rose-600 border-rose-500|bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 dark:from-rose-500/20 dark:to-card border-rose-500/30",
          },
          {
            name: "Emerald",
            value:
              "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-card border-emerald-500/30",
          },
        ]}
        onColorChange={(col: ProductColorOption) => setSneakerBg(col.value.split("|")[1])}
        onQuickView={() => console.log("Quick View")}
      />

      {/* Product Card 3: Tech Gadget Smartwatch */}
      <ProductCard
        title="Apex Horizon Smartwatch"
        subtitle="Chronos Tech"
        description="AMOLED display, ECG monitoring, cellular connectivity & 50m water resistance."
        price="$349.00"
        rating={4.8}
        reviewsCount={95}
        badge="New Arrival"
        badgeVariant="amber"
        image={
          <div className={"w-full h-full flex items-center justify-center transition-all duration-300 " + watchBg}>
            <span className="text-5xl drop-shadow-md transition-transform duration-300 hover:scale-110">⌚</span>
          </div>
        }
        colors={[
          {
            name: "Indigo",
            value:
              "bg-indigo-600 border-indigo-500|bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-card border-indigo-500/30",
          },
          {
            name: "Emerald",
            value:
              "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-card border-emerald-500/30",
          },
        ]}
        onColorChange={(col: ProductColorOption) => setWatchBg(col.value.split("|")[1])}
        onBuyNow={() => console.log("Proceeding to checkout")}
      />
    </div>
  );
}
```

### Shop tiles

Pastel product tiles with a tag, a two-line title, the product on the right and a frosted price bar. The photo's backdrop and the tile share a colour, so the edge between them disappears.

- Set `interactive` to lift the tile and zoom the photo on hover. The basket button stops propagation, so it never triggers the tile's own click.

```tsx
"use client";

import type { CSSProperties } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/custom/blocks/CardBlock";
import { ShoppingBasket } from "lucide-react";

const ITEMS = [
  {
    tag: "Women",
    title: "Pink Fashion",
    price: "$42.00",
    tint: "#efb6c4",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1769708638693-60abd4bdfa9e-1790146212211.jpg",
    imageAlt: "Woman in a pink coat adjusting her sunglasses against a pink wall",
    // She stands mid-frame; showing the left of the photo keeps her clear of the mask
    focus: "object-left",
  },
  {
    tag: "Kids",
    title: "Party Frock",
    price: "$56.00",
    tint: "#fdd24f",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1759313560255-0458c8f4e615-1790146212211.jpg",
    imageAlt: "Young girl in a blue star dress against a yellow backdrop",
    focus: "object-center",
  },
  {
    tag: "Shoes",
    title: "Pastel Sneakers",
    price: "$80.00",
    tint: "#dcd6f4",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1595950653106-6c9ebd614d3a-1790146212210.jpg",
    imageAlt: "Pastel sneakers on a pink and periwinkle surface",
    focus: "object-center",
  },
];

export default function ShopCards() {
  return (
    <div className="grid w-full max-w-4xl gap-5 sm:grid-cols-3">
      {ITEMS.map((item) => (
        <Card
          key={item.title}
          variant="default"
          interactive
          style={{ backgroundColor: item.tint, "--tint": item.tint } as CSSProperties}
          className="group relative aspect-[3/4] overflow-hidden rounded-[28px] text-zinc-900 shadow-none"
        >
          {/* The photo sits bottom-right at 80% height, leaving the top clear
              for the tag and title. Two masks, intersected, fade its left and
              top edges so it dissolves into the tile instead of ending in a
              hard line */}
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className={`absolute bottom-0 right-0 h-4/5 w-[58%] object-cover [mask-image:linear-gradient(to_right,transparent,black_35%),linear-gradient(to_bottom,transparent,black_30%)] [mask-composite:intersect] transition-transform duration-500 motion-safe:group-hover:scale-105 ${item.focus}`}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-(--tint) to-transparent"
          />

          <CardHeader className="relative items-start space-y-3 p-5">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium">
              {item.tag}
            </span>
            <CardTitle className="max-w-[7ch] text-[28px] font-normal leading-[1.05] tracking-tight">
              {item.title}
            </CardTitle>
          </CardHeader>

          <CardFooter className="absolute inset-x-3 bottom-3 justify-between rounded-[20px] bg-white/70 p-1.5 pl-4 backdrop-blur-md">
            <span className="text-sm font-semibold tabular-nums">{item.price}</span>
            <button
              type="button"
              aria-label={`Add ${item.title} to basket`}
              onClick={(e) => e.stopPropagation()}
              className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <ShoppingBasket className="size-[18px]" />
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Folder cards

A thick frame around a photograph and a folder-tab panel. Only the number and title show at first; hover or focus a card to open the text.

```tsx
import { Card } from "@/components/custom/blocks/CardBlock";
import { ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    number: "01",
    title: "A castle above the mist",
    text: "Cobbled lanes, stone towers and a quiet start. Arrive early, before the day trippers do.",
    theme:
      "[--frame:#dde2e5] [--panel:#f0f2f3] [--ink:#1b2227] dark:[--frame:#1b2227] dark:[--panel:#242d33] dark:[--ink:#ffffff]",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    alt: "A stone castle on a hill, wrapped in morning mist",
  },
  {
    number: "02",
    title: "The red lighthouse walk",
    text: "A short coastal path under a wide open sky. Climb at golden hour for the best light.",
    theme:
      "[--frame:#c6e2e7] [--panel:#e5f3f5] [--ink:#0a2f37] dark:[--frame:#0a2f37] dark:[--panel:#0d3d47] dark:[--ink:#ffffff]",
    image: "https://images.unsplash.com/photo-1718807384827-bf59c4935ee1?auto=format&fit=crop&w=800&q=80",
    alt: "A red and white striped lighthouse against a teal sky",
  },
  {
    number: "03",
    title: "Peonies by the window",
    text: "One stem, soft light and a blush wall. A slow flower morning that asks nothing of you.",
    theme:
      "[--frame:#ebd2d3] [--panel:#f8eceb] [--ink:#3b2227] dark:[--frame:#3a2428] dark:[--panel:#4a2e33] dark:[--ink:#f8eceb]",
    image: "https://images.unsplash.com/photo-1684752840287-13f1546fce93?auto=format&fit=crop&w=800&q=80",
    alt: "A single pink peony in a metal bottle against a blush wall",
  },
];

export default function FolderCards() {
  return (
    <div className="grid w-full max-w-[922px] gap-5 sm:grid-cols-3">
      {CARDS.map((card) => (
        <Card
          key={card.number}
          variant="flat"
          interactive
          tabIndex={0}
          className={
            "group aspect-[3/4] rounded-[26px] border-0 bg-(--frame) p-[5px] text-(--ink) shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
            card.theme
          }
        >
          <div className="relative size-full overflow-hidden rounded-[21px]">
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105 group-focus-visible:scale-105"
            />

            {/* Anchored to the bottom: at rest only the number and title show, and the panel grows upward when the text row opens */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col rounded-tr-[18px] bg-(--panel) p-4">
              {/* The folder tab: a raised step on the left, with a concave fillet at its foot. Its height is the convex radius (14px) plus the fillet radius (14px), so the two curves meet in one smooth S. The shadow and the 1px overhang on the fillet overlap the panel, so no seam shows */}
              <div className="absolute -top-7 left-0 h-7 w-[46%] rounded-tl-[16px] rounded-tr-[14px] bg-(--panel) shadow-[0_1px_0_var(--panel)] after:absolute after:-bottom-px after:left-full after:-ml-px after:size-[15px] after:[background:radial-gradient(circle_at_100%_0,transparent_13.5px,var(--panel)_14.5px)]" />

              <div className="flex items-start justify-between">
                <span className="text-[44px] font-light leading-none tracking-tight">
                  {card.number}
                </span>
                <ArrowUpRight className="mt-3 size-5 transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5" />
              </div>

              <p className="mt-4 text-[15px] font-semibold leading-snug">{card.title}</p>

              {/* grid-rows 0fr to 1fr animates the height of text of any length */}
              <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                <div className="min-h-0 overflow-hidden">
                  <p className="pt-2 text-xs leading-relaxed opacity-70">{card.text}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Quote tiles

Pastel tiles with a small caps category, a bold quote and the photo dissolving into the tint from below.

```tsx
import type { CSSProperties } from "react";
import { Card } from "@/components/custom/blocks/CardBlock";

const TILES = [
  {
    category: "Branding",
    title: "A Brand Is A Voice And A Product Is A Souvenir.",
    tint: "#e1c2ce",
    color: "#18181b",
    image: "https://images.unsplash.com/photo-1759332691549-fb0863bbb92c?auto=format&fit=crop&w=600&q=80",
    imageAlt: "A single pale flower balanced on a paper triangle against a pink wall",
    position: "50% 50%",
  },
  {
    category: "Typography",
    title: "The Purpose Of Our Lives Is To Be Happy.",
    tint: "#1f636d",
    color: "#ffffff",
    image: "https://images.unsplash.com/photo-1718807384827-bf59c4935ee1?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Red and white lighthouse against a deep teal sky",
    position: "50% 38%",
  },
  {
    category: "Copy Writing",
    title: "Love Is The Flower You’ve Got To Let Grow.",
    tint: "#b5a08d",
    color: "#18181b",
    image: "https://images.unsplash.com/photo-1684752840287-13f1546fce93?auto=format&fit=crop&w=600&q=80",
    imageAlt: "A coral peony in a steel bottle against a dusty rose wall",
    position: "50% 15%",
  },
];

export default function QuoteTiles() {
  return (
    <div className="w-full max-w-3xl">
      <h2 className="max-w-md text-2xl font-bold leading-snug tracking-tight">
        You Only Live Once, But If You Do It Right, Once Is Enough.
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Card
            key={tile.category}
            variant="default"
            style={{ backgroundColor: tile.tint, color: tile.color, "--tint": tile.tint } as CSSProperties}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg border-0 shadow-none"
          >
            {/* The photo fills the lower half; a mask dissolves its top edge into the tint */}
            <img
              src={tile.image}
              alt={tile.imageAlt}
              loading="lazy"
              style={{ objectPosition: tile.position }}
              className="absolute inset-x-0 bottom-0 h-[68%] w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_30%)] transition-transform duration-500 motion-safe:group-hover:scale-105"
            />

            <div className="relative p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em]">
                {tile.category}
              </p>
              <h3 className="mt-3 text-[17px] font-bold leading-snug">{tile.title}</h3>
            </div>

            <button
              type="button"
              className="absolute bottom-3 right-3 rounded-md bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-900 shadow-sm transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              Explore
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### Profile card

A person as a card: a patterned banner, an avatar that overlaps it, a few numbers, and one primary action.

```tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { cn } from "@/lib/utils";
import { Check, MapPin, MessageCircle, UserPlus } from "lucide-react";

export default function ProfileCards() {
  const [following, setFollowing] = useState(false);

  return (
    <Card variant="bordered" className="w-full max-w-md overflow-hidden rounded-3xl">
      <div className="h-24 bg-primary/10 bg-[radial-gradient(circle_at_1px_1px,var(--primary)_1px,transparent_0)] [background-size:12px_12px] opacity-40" />

      <CardHeader className="gap-3 px-6 pb-0 pt-0">
        <div className="-mt-11 flex items-end justify-between gap-3">
          <div className="relative">
            <span className="grid size-20 place-items-center rounded-full bg-primary/15 text-xl font-semibold text-primary ring-4 ring-card">
              AK
            </span>
            <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>
          <span className="mb-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Open to projects
          </span>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl">Ayesha Karim</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            Design engineer at Northwind
            <span className="text-muted-foreground/40">|</span>
            <MapPin className="size-3.5" /> Dhaka
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-6 pb-0 pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Builds the component library three product teams ship on. Currently
          rewriting the motion primitives.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Design systems", "React", "Motion", "Accessibility"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ),
          )}
        </div>
        <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-muted/40 py-3 text-center">
          {[
            ["128", "Components"],
            ["342", "Merged PRs"],
            ["96", "Reviews"],
          ].map(([value, label]) => (
            <div key={label} className="px-2">
              <p className="text-base font-semibold tabular-nums">{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-3 px-6 pb-6 pt-5">
        <button
          type="button"
          aria-pressed={following}
          onClick={() => setFollowing((v) => !v)}
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            following
              ? "border-border text-foreground hover:bg-muted"
              : "border-primary bg-primary text-primary-foreground hover:border-primary/90 hover:bg-primary/90",
          )}
        >
          {following ? (
            <>
              <Check className="size-4" /> Following
            </>
          ) : (
            <>
              <UserPlus className="size-4" /> Follow
            </>
          )}
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle className="size-4" /> Message
        </button>
      </CardFooter>
    </Card>
  );
}
```

### Platform grid

A full-width two-column card: a visual preview on the left, and on the right the specifications, tags, action buttons and a copyable install command.

- Two-column grid `layout="project-showcase"` splits the card into an image preview on the left and full project details, specifications, actions, and install bar on the right.

```tsx
"use client";

import { ProjectCard } from "@/components/custom/blocks/CardBlock";

export default function ProjectShowcaseCardDemo() {
  return (
    <ProjectCard
      title="Platform grid"
      image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg"
      slug="platform-grid"
      scope="avara-ui"
      badge1="Component Block"
      badge2="TypeScript & Tailwind"
      description="A meticulously crafted, responsive interactive block built with modern animations, responsive layouts, and accessible standards. Ready to drop into your Next.js and React applications."
      ctaLabel="Full View"
      contactLabel="Contact"
    />
  );
}
```

### Stat grid

`CardHeader` stacks its children by default; override that to line a title up against an icon.

- `variant="bordered"` keeps each tile separated in a dense grid.

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/blocks/CardBlock";
import { Bell, CreditCard, Settings } from "lucide-react";

export default function StatGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card variant="bordered">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">$45,231.89</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Subscriptions</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">+2350</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">+180.1% from last month</p>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Now</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">+573</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Standard Card

Stack `CardHeader`, `CardContent` and `CardFooter` — spacing is handled for you.

- `variant="bordered"` is the default — a subtle stroke around the surface.

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Bell, Settings } from "lucide-react";

export default function NotificationCard() {
  return (
    <Card variant="bordered" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
          <Bell className="w-5 h-5 text-primary" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">System Update</p>
            <p className="text-xs text-muted-foreground">A new version is available.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
          <Settings className="w-5 h-5 text-primary" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Account Notice</p>
            <p className="text-xs text-muted-foreground">Please verify your email address.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-primary/20 pt-6">
        <button className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Mark all as read
        </button>
      </CardFooter>
    </Card>
  );
}
```

### Boarding pass

One card, two panels, a dashed perforation between them — the holes are circles filled with the page colour.

- Set `className="sm:flex-row"` to turn the card's column into side-by-side panels; below `sm` the perforation becomes a horizontal tear.

```tsx
import { Card } from "@/components/custom/blocks/CardBlock";
import { Plane } from "lucide-react";

export default function BoardingPassCard() {
  return (
    // sm:flex-row turns the column into two panels the perforation runs between
    <Card variant="bordered" className="w-full max-w-3xl rounded-2xl sm:flex-row">
      <div className="flex-1 p-6 sm:p-7">
        <p className="text-sm font-semibold">Meridian Air</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Flight MR 214, Saturday 12 April</p>

        <div className="mt-7 flex items-start gap-4">
          <div>
            <p className="font-mono text-3xl font-semibold tracking-tight">DAC</p>
            <p className="mt-2 font-mono text-sm tabular-nums">09:40</p>
          </div>
          <div className="flex-1 pt-3">
            <div className="flex items-center">
              <span className="flex-1 border-t border-dashed border-primary/50" />
              <span className="mx-2 grid size-7 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Plane className="size-3.5 rotate-90" />
              </span>
              <span className="flex-1 border-t border-dashed border-primary/50" />
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">5 h 25 m, nonstop</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-3xl font-semibold tracking-tight">SIN</p>
            <p className="mt-2 font-mono text-sm tabular-nums">15:05</p>
          </div>
        </div>
      </div>

      {/* Tear-off stub: dashed edge plus two holes filled with the page colour */}
      <div className="relative border-t border-dashed border-border p-6 sm:w-48 sm:border-l sm:border-t-0">
        <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full border border-border bg-background" />
        <span className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full border border-border bg-background sm:block" />
        <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full border border-border bg-background sm:hidden" />

        <p className="text-xs text-muted-foreground">Seat</p>
        <p className="font-mono text-4xl font-semibold tracking-tight">14A</p>
        <div className="mt-5 h-14 w-full bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)] text-foreground/75" />
        <p className="mt-2 font-mono text-[11px] tracking-widest text-muted-foreground">MR214 12APR</p>
      </div>
    </Card>
  );
}
```

## Features
Learn about the Card component's flexible layout options, including headers, footers, content areas, and interactive hover effects.

Easily adapt the component's styling and behavior to fit your application's unique design system.

Mix and match sub-components to create complex card layouts effortlessly.

## Props Reference

### Card

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"bordered" \| "default" \| "flat"` | `"bordered"` | Visual styling variant of the card container. |
| `interactive` | `boolean` | `false` | Enables hover elevation, scale effects, and pointer cursor. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the root element. |

### ProductCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `-` | Product title heading (required). |
| `price` | `string` | `-` | Displayed product price string (required). |
| `variant` | `"standard" \| "compact" \| "horizontal"` | `"standard"` | Layout orientation and sizing of the product card. |
| `subtitle` | `string` | `undefined` | Brand name, category or secondary label. |
| `description` | `string` | `undefined` | Detailed product description text. |
| `originalPrice` | `string` | `undefined` | Strikethrough original price for discount display. |
| `rating` | `number` | `undefined` | Star rating score (e.g. 4.8). |
| `reviewsCount` | `number` | `undefined` | Total review count displayed beside rating. |
| `badge` | `string` | `undefined` | Tag label displayed on top corner (e.g. "Best Seller"). |
| `badgeVariant` | `"emerald" \| "rose" \| "indigo" \| "amber" \| "zinc"` | `"emerald"` | Color theme of the badge tag. |
| `inStock` | `boolean` | `true` | Shows availability indicator badge on image header. |
| `image` | `ReactNode` | `undefined` | Image or visual graphic node for the product preview. |
| `colors` | `ProductColorOption[]` | `undefined` | Array of color swatch options `&#123; name, value &#125;`. |
| `onAddToCart` | `() => void` | `undefined` | Callback triggered when clicking the Add to Cart button. |
| `onBuyNow` | `() => void` | `undefined` | Callback triggered when clicking Buy Now button. |
| `onQuickView` | `() => void` | `undefined` | Callback triggered when clicking Quick View button. |
| `onFavoriteToggle` | `(isLiked: boolean) => void` | `undefined` | Callback when heart button is toggled. |

### ProjectCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Platform grid"` | The primary title of the component or showcase. |
| `image` | `string` | — | Image URL displayed in the left visual card presentation frame. |
| `slug` | `string` | — | Component slug used in the CLI install bar and package name. |
| `scope` | `string` | `"avara-ui"` | NPM scope prefix for the package and CLI command. |
| `badge1` | `string` | `"Component Block"` | First category pill badge (rose outline style). |
| `badge2` | `string` | `"TypeScript & Tailwind"` | Second category pill badge (amber/neutral style). |
| `description` | `string` | — | Detailed editorial narrative of the component or block. |
| `specs` | `ProjectCardSpec[]` | Default 2x2 grid | Array of `&#123; label, value &#125;` specifications displayed in the 2x2 rounded grid. |
| `ctaLabel` | `string` | `"Full View"` | Label for the primary branded action button. |
| `ctaHref` | `string` | `"#"` | Target URL when clicking the primary action. |
| `contactLabel` | `string` | `"Contact"` | Label for the secondary outline contact button. |
| `installCommand` | `string` | — | Custom CLI command string for the copyable bottom terminal bar. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/card
