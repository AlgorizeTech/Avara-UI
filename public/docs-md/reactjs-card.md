export const metadata = docsPageMetadata("card");

# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` and `ProductCardBlock` provide a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`, `ProductCard`) that automatically manage internal spacing and interactive states.

export const usageEcommerce = `export default function EcommerceProductCardsDemo() {
  const [sneakerBg, setSneakerBg] = useState(
    "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-card border-amber-500/30"
  );
  const [watchBg, setWatchBg] = useState(
    "bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-card border-indigo-500/30"
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
      
            ⌚
          
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

export const usageInteractive = `export default function ClickableCards() {
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
    thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_400,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    thumbAlt: "Developer writing code at a desk",
  },
  {
    title: "What a design token is not",
    topic: "Design systems",
    read: "6 min",
    thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_400,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
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

export const usageShop = `const ITEMS = [
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
    
      {ITEMS.map((item) => (
        
          {/* The photo sits bottom-right at 80% height, leaving the top clear
              for the tag and title. Two masks, intersected, fade its left and
              top edges so it dissolves into the tile instead of ending in a
              hard line */}

              {item.tag}

              {item.title}

            {item.price}
             e.stopPropagation()}
              className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >

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

export const usageMedia = `const WAVEFORM = [22, 34, 48, 40, 62, 76, 58, 44, 68, 88, 72, 54, 38, 46, 60, 82, 96, 78];
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
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {playing ?  : }

  );
}`;

export const usageProfile = `const TEAMMATES = [
  {
    initials: "TL",
    name: "Tomás Léger",
    role: "Motion and prototyping",
    zone: "Lisbon",
    tint: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    initials: "WA",
    name: "Wren Adeyemi",
    role: "Accessibility",
    zone: "Lagos",
    tint: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
];

export default function ProfileCards() {
  const [following, setFollowing] = useState(false);

  return (

                AK

              Open to projects

            Ayesha Karim
            
              Design engineer at Northwind
              |
               Dhaka

            Builds the component library three product teams ship on. Currently
            rewriting the motion primitives.

            {["Design systems", "React", "Motion", "Accessibility"].map(
              (tag) => (
                
                  {tag}
                
              ),
            )}

            {[
              ["128", "Components"],
              ["342", "Merged PRs"],
              ["96", "Reviews"],
            ].map(([value, label]) => (
              
                {value}
                {label}
              
            ))}

           setFollowing((v) => !v)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              following
                ? "border-border text-foreground hover:bg-muted"
                : "border-primary bg-primary text-primary-foreground hover:border-primary/90 hover:bg-primary/90",
            )}
          >
            {following ? (
              <>
                 Following
              
            ) : (
              <>
                 Follow
              
            )}

             Message

        {TEAMMATES.map((member) => (

              {member.initials}

              {member.name}
              
                {member.role}

              {member.zone}

        ))}

           Invite a teammate

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/card
```

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
