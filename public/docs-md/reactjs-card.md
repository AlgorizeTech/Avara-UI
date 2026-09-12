# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` and `ProductCardBlock` provide a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`, `ProductCard`) that automatically manage internal spacing and interactive states.

export const usageEcommerce = `export default function EcommerceProductCardsDemo() {
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
            className="grid size-11 place-items-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
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

export default function ProfileCards({ interactive }: { interactive: boolean }) {
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
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              following
                ? "border-border text-foreground hover:bg-muted"
                : "border-violet-600 bg-violet-600 text-white hover:border-violet-500 hover:bg-violet-500",
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

export const usageProfilePage = `const TEAMMATES = [
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

const PROFILE_TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 }; // hours, in Ayesha's time zone

const HIGHLIGHTS = [
  {
    title: "Motion primitives v2",
    summary: "One easing vocabulary for modals, drawers and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Northwind UI 4.0",
    summary: "128 components, dark mode by default, tokens in CSS.",
    status: "Shipped June 2026",
  },
  {
    title: "Contrast audit",
    summary: "Every text and icon color checked at 4.5:1 or better.",
    status: "Shipped February 2026",
  },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1287 — unify easing curves across overlays", when: "2h ago" },
  { icon: Eye, text: "Reviewed Tomás's drawer focus-trap fix", when: "Yesterday" },
  { icon: FileText, text: "Published the Northwind UI 4.0 release notes", when: "3 days ago" },
  { icon: MessageCircle, text: "Opened an RFC on token naming", when: "Last week" },
];

/** Hour-of-day (with minutes as a fraction) and a readable clock, both in the
 *  profile's own time zone — so the day strip is honest wherever it's viewed. */
function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const read = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(now);
      const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
      const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
      const label = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(now);
      setTime({ hour: h + m / 60, label });
    };
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);
  const time = useLocalTime(PROFILE_TIME_ZONE);
  const working =
    time !== null && time.hour >= WORKDAY.start && time.hour 
      {/* Top bar */}

           People

           Share

      {/* Hero — no banner; the name and the day strip carry it */}

                AK

                  Ayesha Karim

                  Design engineer at Northwind

                  Dhaka

                    {time ? time.label : "--:--"} local

                  Joined March 2021

               Message
            
             setFollowing((v) => !v)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-none",
                following
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-violet-600 bg-violet-600 text-white hover:border-violet-500 hover:bg-violet-500",
              )}
            >
              {following ? (
                <>
                   Following
                
              ) : (
                <>
                   Follow
                
              )}

        {/* Her day: 24 hours in Dhaka, the working window, and a live marker */}

              {working ? "Working now" : "Outside working hours"}

              10:00 – 18:00 Dhaka, UTC+6

            {[6, 12, 18].map((h) => (
              
            ))}
            {time && (

            )}

            12 am
            6 am
            12 pm
            6 pm
            12 am

      {/* Body — two columns on wide screens, one below */}

            About
            
              Builds the component library three product teams ship on. Currently
              rewriting the motion primitives so a modal, a drawer and a toast all
              ease the same way. Happiest when a design decision becomes one
              variable.

            Skills
            
              {[
                "Design systems",
                "React",
                "Motion",
                "Accessibility",
                "TypeScript",
                "Figma",
              ].map((tag) => (
                
                  {tag}
                
              ))}

            Details

                ayesha@northwind.co

                ayesha.design

                Platform team, reports to Head of Design

            Works closely with
            
              {TEAMMATES.map((member) => (

                    {member.initials}

                    {member.name}
                    
                      {member.role}

                    {member.zone}

              ))}

            Highlights
            
              {HIGHLIGHTS.map((item) => (

                    {item.title}
                    
                      {item.summary}

                    {item.progress !== undefined && (

                    )}
                    
                      {item.progress !== undefined
                        ? item.status + ", " + item.progress + "%"
                        : item.status}

              ))}

            Recent activity
            
              {ACTIVITY.map((entry) => (

                  {entry.text}
                  
                    {entry.when}

              ))}

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
