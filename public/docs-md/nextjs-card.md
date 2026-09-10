# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` and `ProductCardBlock` provide a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`, `ProductCard`) that automatically manage internal spacing and interactive states.

export const usageEcommerce = `"use client";

export default function EcommerceProductCardsDemo() {
  const [sneakerBg, setSneakerBg] = useState(
    "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30"
  );
  const [watchBg, setWatchBg] = useState(
    "bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-zinc-900 border-indigo-500/30"
  );

  return (
    
      {/* Product Card 1: Headphones */}
      
            🎧
          
        }
        onAddToCart={() => console.log("Added to cart")}
      />

      {/* Product Card 2: Sneakers with Dynamic Swatches */}
      
            👟
          
        }
        colors={[
          {
            name: "Amber",
            value:
              "bg-amber-600 border-amber-500|bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30",
          },
          {
            name: "Rose",
            value:
              "bg-rose-600 border-rose-500|bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 dark:from-rose-500/20 dark:to-zinc-900 border-rose-500/30",
          },
          {
            name: "Emerald",
            value:
              "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 border-emerald-500/30",
          },
        ]}
        onColorChange={(col: ProductColorOption) => setSneakerBg(col.value.split("|")[1])}
        onQuickView={() => console.log("Quick View")}
      />

      {/* Product Card 3: Tech Gadget Smartwatch */}
      
            ⌚
          
        }
        colors={[
          {
            name: "Indigo",
            value:
              "bg-indigo-600 border-indigo-500|bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-zinc-900 border-indigo-500/30",
          },
          {
            name: "Emerald",
            value:
              "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 border-emerald-500/30",
          },
        ]}
        onColorChange={(col: ProductColorOption) => setWatchBg(col.value.split("|")[1])}
        onBuyNow={() => console.log("Proceeding to checkout")}
      />
    
  );
}`;

export const usageDefault = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

export default function NotificationCard() {
  return (

        Notifications
        You have 3 unread messages.

            System Update
            A new version is available.

            Account Notice
            Please verify your email address.

          Mark all as read

  );
}`;

export const usageInteractive = `"use client";

export default function ClickableCards() {
  return (
    
       console.log("Download")}>

             Download Report

            Export your analytics data as a CSV file for external processing.

       console.log("Import")}>

             Import Data

            Upload legacy customer profiles to merge into your active CRM.

  );
}`;

export const usageStats = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/blocks/CardBlock";

export default function StatGrid() {
  return (

          Total Revenue

          $45,231.89
          +20.1% from last month

          Subscriptions

          +2350
          +180.1% from last month

          Active Now

          +573
          +201 since last hour

  );
}`;

export const usageBlogShowcase = `import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

const FEED = [
  {
    title: "Naming things without a thesaurus",
    topic: "Craft",
    read: "5 min",
    thumb: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=400&auto=format&fit=crop",
    thumbAlt: "Developer writing code at a desk",
  },
  {
    title: "What a design token is not",
    topic: "Design systems",
    read: "6 min",
    thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    thumbAlt: "Workspace with a laptop showing a web layout",
  },
];

export default function BlogShowcase() {
  return (
    
      {/* Featured story */}
      
        {/* The cover sits outside CardHeader so it can bleed to the edges */}

            Performance

            The quiet cost of a re-render

            A dashboard that only felt slow on Mondays, and the six components that explained it.

            Priya Raman
            4 March
          
          8 min

      {/* Sidebar feed — one Card, rows split by divide-y */}
      
        Latest
        {FEED.map((story) => (

              {story.title}
              {story.topic}
            
            {story.read}
          
        ))}

  );
}`;

export const usageBlogGrid = `import {
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
    cover: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Abstract flowing ink in blue and violet",
    author: "Maya Lin",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    read: "7 min",
  },
  {
    topic: "Accessibility",
    title: "The accessibility tree is not a mirror",
    dek: "Two components that looked identical read as completely different things aloud.",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Glowing circuit board traces",
    author: "Daniel Kim",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    read: "5 min",
  },
  {
    topic: "Machine learning",
    title: "Ship the model, keep the seams",
    dek: "Every inference call our app makes can fail. The UI has to say so plainly.",
    cover: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Abstract render of intersecting shapes",
    author: "Ethan Wright",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    read: "9 min",
  },
];

export default function BlogCardGrid() {
  return (
    
      {POSTS.map((post) => (

            {/* The topic rides on the image, so the card body stays type-only */}
            
              {post.topic}

              {post.title}

              {post.dek}

              {post.author}
            
            {post.read}

      ))}
    
  );
}`;

export const usageTicket = `import { Card } from "@/components/custom/blocks/CardBlock";

export default function BoardingPassCard() {
  return (
    // sm:flex-row turns the column into two panels the perforation runs between

        Meridian Air
        Flight MR 214, Saturday 12 April

            DAC
            09:40

            5 h 25 m, nonstop

            SIN
            15:05

      {/* Tear-off stub: dashed edge plus two holes filled with the page colour */}

        Seat
        14A
        
        MR214 12APR

  );
}`;

export const usageMedia = `"use client";

const WAVEFORM = [22, 34, 48, 40, 62, 76, 58, 44, 68, 88, 72, 54, 38, 46, 60, 82, 96, 78];
const TRACK_LENGTH = 214;

const formatTime = (s: number) => \`\${Math.floor(s / 60)}:\${String(s % 60).padStart(2, "0")}\`;

export default function NowPlayingCard() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(72);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setElapsed((v) => (v >= TRACK_LENGTH ? 0 : v + 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing]);

  const progress = elapsed / TRACK_LENGTH;

  return (
    
      {/* Art panel — the record turns only while the track is playing */}

          Ceiling Fan Blues
          Lila Moreau Trio

        {/* A real range input sits invisibly over the bars, so seeking works
            with a pointer and a keyboard both */}

            {WAVEFORM.map((height, i) => (
              
            ))}
          
           setElapsed(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />

          {formatTime(elapsed)}
          {formatTime(TRACK_LENGTH)}

           setPlaying((v) => !v)}
            className="grid size-11 place-items-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {playing ?  : }

  );
}`;

## Installation

## Examples

## Features
Learn about the Card component's flexible layout options, including headers, footers, content areas, and interactive hover effects.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Composable
    Mix and match sub-components to create complex card layouts effortlessly.

## Props Reference

### Card

        Prop
        Type
        Default
        Description

          variant

          "bordered" | "default" | "flat"

          "bordered"
        
        Visual styling variant of the card container.

          interactive

          boolean

          false
        
        Enables hover elevation, scale effects, and pointer cursor.

          className

          string

          undefined
        
        Additional CSS classes applied to the root element.

### ProductCard

        Prop
        Type
        Default
        Description

          title

          string

          -
        
        Product title heading (required).

          price

          string

          -
        
        Displayed product price string (required).

          variant

          "standard" | "compact" | "horizontal"

          "standard"
        
        Layout orientation and sizing of the product card.

          subtitle

          string

          undefined
        
        Brand name, category or secondary label.

          description

          string

          undefined
        
        Detailed product description text.

          originalPrice

          string

          undefined
        
        Strikethrough original price for discount display.

          rating

          number

          undefined
        
        Star rating score (e.g. 4.8).

          reviewsCount

          number

          undefined
        
        Total review count displayed beside rating.

          badge

          string

          undefined
        
        Tag label displayed on top corner (e.g. "Best Seller").

          badgeVariant

          "emerald" | "rose" | "indigo" | "amber" | "zinc"

          "emerald"
        
        Color theme of the badge tag.

          inStock

          boolean

          true
        
        Shows availability indicator badge on image header.

          image

          ReactNode

          undefined
        
        Image or visual graphic node for the product preview.

          colors

          ProductColorOption[]

          undefined
        
        Array of color swatch options &#123; name, value &#125;.

          onAddToCart

          () => void

          undefined
        
        Callback triggered when clicking the Add to Cart button.

          onBuyNow

          () => void

          undefined
        
        Callback triggered when clicking Buy Now button.

          onQuickView

          () => void

          undefined
        
        Callback triggered when clicking Quick View button.

          onFavoriteToggle

          (isLiked: boolean) => void

          undefined
        
        Callback when heart button is toggled.

---

**Component Path:** `[framework]\card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
