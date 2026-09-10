"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { ProductCard, ProductColorOption } from "@/components/custom/blocks/ProductCardBlock";
import { cn } from "@/lib/utils";
import {
  Bell,
  Check,
  CreditCard,
  Download,
  Heart,
  MapPin,
  MessageCircle,
  Pause,
  Plane,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Upload,
  UserPlus,
} from "lucide-react";

export default function CardDemo({
  variant = "bordered",
  interactive = false,
  layout = "standard",
}: {
  variant?: "bordered" | "default" | "flat";
  interactive?: boolean;
  layout?:
    | "standard"
    | "grid"
    | "stats"
    | "ecommerce"
    | "blog-showcase"
    | "blog-grid"
    | "profile"
    | "ticket"
    | "media";
}) {
  const [sneakerBg, setSneakerBg] = useState(
    "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30"
  );
  const [watchBg, setWatchBg] = useState(
    "bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-zinc-900 border-indigo-500/30"
  );

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] p-4 relative z-10 overflow-hidden">
      {layout === "standard" && (
        <Card variant={variant} interactive={interactive} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Bell className="w-5 h-5 text-indigo-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">System Update</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  A new version is available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Settings className="w-5 h-5 text-rose-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Account Notice</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Please verify your email address.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              Mark all as read
            </button>
          </CardFooter>
        </Card>
      )}

      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-500" /> Download Report
              </CardTitle>
              <CardDescription>
                Export your analytics data as a CSV file for external processing.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" /> Import Data
              </CardTitle>
              <CardDescription>
                Upload legacy customer profiles to merge into your active CRM.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {layout === "stats" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Subscriptions
              </CardTitle>
              <Bell className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Active Now
              </CardTitle>
              <Settings className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-zinc-500 font-medium mt-1">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {layout === "ecommerce" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl my-4">
          {/* Product Card 1: Headphones (Full Width Soft Light Gradient Background) */}
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
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 flex items-center justify-center">
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">🎧</span>
              </div>
            }
            onAddToCart={() => {}}
            onFavoriteToggle={(liked) => console.log("Liked Headphones:", liked)}
            interactive={interactive}
          />

          {/* Product Card 2: Sneakers with Soft Light Tint Color Swatches */}
          <ProductCard
            title="Urban Runner Sneakers X"
            subtitle="Footwear Co"
            description="Ultra-lightweight mesh knit with responsive cushion soles for daily runs."
            price="$89.00"
            originalPrice="$129.00"
            badge="-30% OFF"
            badgeVariant="rose"
            image={
              <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${sneakerBg}`}>
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">👟</span>
              </div>
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
              {
                name: "Dark",
                value:
                  "bg-zinc-900 border-zinc-700|bg-gradient-to-br from-zinc-500/15 via-zinc-400/10 to-zinc-500/5 dark:from-zinc-800/30 dark:to-zinc-900 border-zinc-500/30",
              },
            ]}
            onColorChange={(col: ProductColorOption) => setSneakerBg(col.value.split("|")[1])}
            onQuickView={() => {}}
            onFavoriteToggle={(liked) => console.log("Liked Sneakers:", liked)}
            interactive={interactive}
          />

          {/* Product Card 3: Smartwatch Tech Gadget with Soft Light Tint Color Swatches */}
          <ProductCard
            title="Smart Watch Ultra Series"
            subtitle="Tech Wearables"
            description="24/7 heart rate monitor, sleep tracking, and 50m water resistance."
            price="$199.00"
            badge="New Arrival"
            badgeVariant="indigo"
            inStock={true}
            image={
              <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${watchBg}`}>
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">⌚</span>
              </div>
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
              {
                name: "Rose",
                value:
                  "bg-rose-600 border-rose-500|bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 dark:from-rose-500/20 dark:to-zinc-900 border-rose-500/30",
              },
              {
                name: "Amber",
                value:
                  "bg-amber-600 border-amber-500|bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30",
              },
            ]}
            onColorChange={(col: ProductColorOption) => setWatchBg(col.value.split("|")[1])}
            onBuyNow={() => {}}
            interactive={interactive}
          />

          {/* Product Card 4: Compact Horizontal Deal Card */}
          <div className="sm:col-span-2 lg:col-span-3">
            <ProductCard
              variant="horizontal"
              title="Ergonomic Wireless Optical Mouse"
              description="Dual Bluetooth & 2.4GHz wireless connection with silent tactile clicks."
              price="$49.00"
              originalPrice="$69.00"
              badge="Flash Deal"
              badgeVariant="rose"
              rating={4.9}
              image={
                <div className="w-full h-full bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-transparent flex items-center justify-center">
                  <span className="text-4xl drop-shadow-md">🖱️</span>
                </div>
              }
              onAddToCart={() => {}}
              interactive={interactive}
            />
          </div>
        </div>
      )}

      {layout === "blog-showcase" && (
        <BlogShowcaseCards interactive={interactive} />
      )}

      {layout === "blog-grid" && <BlogGridCards interactive={interactive} />}

      {layout === "profile" && <ProfileCards interactive={interactive} />}

      {layout === "ticket" && <BoardingPassCard />}

      {layout === "media" && <NowPlayingCard />}
    </div>
  );
}

/* ========================================================================== */
/*  Blog showcase — one featured story beside the rest of the feed             */
/* ========================================================================== */

const FEATURED_STORY = {
  topic: "Performance",
  title: "The quiet cost of a re-render",
  dek: "A dashboard that only felt slow on Mondays, and the six components that explained it.",
  cover:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  coverAlt: "Analytics dashboard charts on a laptop screen",
  author: "Priya Raman",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  date: "4 March",
  read: "8 min",
};

const FEED_STORIES = [
  {
    title: "Naming things without a thesaurus",
    topic: "Craft",
    read: "5 min",
    thumb:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=400&auto=format&fit=crop",
    thumbAlt: "Developer writing code at a desk",
  },
  {
    title: "What a design token is not",
    topic: "Design systems",
    read: "6 min",
    thumb:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    thumbAlt: "Workspace with a laptop showing a web layout",
  },
  {
    title: "Shipping on a Friday, safely",
    topic: "Practice",
    read: "4 min",
    thumb:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    thumbAlt: "Abstract render of connected nodes",
  },
];

function BlogShowcaseCards({ interactive }: { interactive: boolean }) {
  return (
    <div className="grid w-full max-w-4xl items-start gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <Card
        variant="bordered"
        interactive={interactive}
        className="group overflow-hidden rounded-lg"
      >
        {/* The cover sits outside CardHeader so it can bleed to the edges */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={FEATURED_STORY.cover}
            alt={FEATURED_STORY.coverAlt}
            loading="lazy"
            className={cn(
              "size-full object-cover",
              interactive &&
                "transition-transform duration-500 motion-safe:group-hover:scale-[1.04]",
            )}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 backdrop-blur">
            {FEATURED_STORY.topic}
          </span>
        </div>

        <CardHeader className="gap-2.5 px-6 pb-4 pt-5">
          <CardTitle className="font-serif text-[23px] font-normal leading-snug tracking-normal">
            {FEATURED_STORY.title}
          </CardTitle>
          <CardDescription className="leading-relaxed">
            {FEATURED_STORY.dek}
          </CardDescription>
        </CardHeader>

        <CardFooter className="items-center gap-3 border-t border-border/70 px-6 pb-6 pt-4">
          <img
            src={FEATURED_STORY.avatar}
            alt=""
            loading="lazy"
            className="size-8 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">{FEATURED_STORY.author}</p>
            <p className="text-xs text-muted-foreground">{FEATURED_STORY.date}</p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {FEATURED_STORY.read}
          </span>
        </CardFooter>
      </Card>

      <Card
        variant="bordered"
        className="divide-y divide-border overflow-hidden rounded-lg"
      >
        <p className="px-5 py-3.5 text-sm font-medium">Latest</p>
        {FEED_STORIES.map((story) => (
          <button
            key={story.title}
            type="button"
            className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-500/70"
          >
            <img
              src={story.thumb}
              alt={story.thumbAlt}
              loading="lazy"
              className="size-[72px] shrink-0 rounded-md object-cover"
            />
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[15px] leading-snug">
                {story.title}
              </span>
              <span className="mt-1.5 block text-xs text-muted-foreground">
                {story.topic}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {story.read}
            </span>
          </button>
        ))}
      </Card>
    </div>
  );
}

/* ========================================================================== */
/*  Blog grid — three posts across                                             */
/* ========================================================================== */

const BLOG_POSTS = [
  {
    topic: "Layout",
    title: "Grids that survive translation",
    dek: "German compound nouns broke our pricing table in four places. What we changed.",
    cover:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Abstract flowing ink in blue and violet",
    author: "Maya Lin",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    date: "11 March",
    read: "7 min",
  },
  {
    topic: "Accessibility",
    title: "The accessibility tree is not a mirror",
    dek: "Two components that looked identical read as completely different things aloud.",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Glowing circuit board traces",
    author: "Daniel Kim",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    date: "9 March",
    read: "5 min",
  },
  {
    topic: "Machine learning",
    title: "Ship the model, keep the seams",
    dek: "Every inference call our app makes can fail. The UI has to say so plainly.",
    cover:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
    coverAlt: "Abstract render of intersecting shapes",
    author: "Ethan Wright",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    date: "6 March",
    read: "9 min",
  },
];

function BlogGridCards({ interactive }: { interactive: boolean }) {
  return (
    <div className="grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {BLOG_POSTS.map((post) => (
        <Card
          key={post.title}
          variant="bordered"
          interactive={interactive}
          className="group overflow-hidden rounded-xl"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.cover}
              alt={post.coverAlt}
              loading="lazy"
              className={cn(
                "size-full object-cover",
                interactive &&
                  "transition-transform duration-500 motion-safe:group-hover:scale-105",
              )}
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-900 backdrop-blur">
              {post.topic}
            </span>
          </div>

          <CardHeader className="gap-2 px-5 pb-3 pt-5">
            <CardTitle className="font-serif text-[17px] font-normal leading-snug tracking-normal">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {post.dek}
            </CardDescription>
          </CardHeader>

          <CardFooter className="items-center gap-2.5 px-5 pb-5 pt-0">
            <img
              src={post.avatar}
              alt=""
              loading="lazy"
              className="size-7 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {post.author}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {post.read}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

/* ========================================================================== */
/*  Profile — one full member card beside the rest of the team                 */
/* ========================================================================== */

const TEAMMATES = [
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

function ProfileCards({ interactive }: { interactive: boolean }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="grid w-full max-w-4xl items-start gap-5 lg:grid-cols-2">
      <Card variant="bordered" className="overflow-hidden rounded-3xl">
        <div className="h-24 bg-violet-500/10 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.35)_1px,transparent_0)] [background-size:12px_12px]" />

        <CardHeader className="gap-3 px-6 pb-0 pt-0">
          <div className="-mt-11 flex items-end justify-between gap-3">
            <div className="relative">
              <span className="grid size-20 place-items-center rounded-full bg-violet-500/15 text-xl font-semibold text-violet-700 ring-4 ring-white dark:bg-violet-500/20 dark:text-violet-200 dark:ring-[#050505]">
                AK
              </span>
              <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#050505]" />
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
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              following
                ? "border-border text-foreground hover:bg-muted"
                : "border-violet-600 bg-violet-600 text-white hover:border-violet-500 hover:bg-violet-500",
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageCircle className="size-4" /> Message
          </button>
        </CardFooter>
      </Card>

      <div className="grid gap-4">
        {TEAMMATES.map((member) => (
          <Card
            key={member.name}
            variant="bordered"
            interactive={interactive}
            className="flex-row items-center gap-4 rounded-2xl p-4"
          >
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-semibold",
                member.tint,
              )}
            >
              {member.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {member.role}
              </p>
            </div>
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
              {member.zone}
            </span>
            <button
              type="button"
              aria-label={`Message ${member.name}`}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <MessageCircle className="size-4" />
            </button>
          </Card>
        ))}

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground transition-colors hover:border-violet-500/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          <UserPlus className="size-4" /> Invite a teammate
        </button>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Boarding pass — a card that tears in two                                   */
/* ========================================================================== */

function BoardingPassCard() {
  return (
    <div className="w-full max-w-3xl">
      <Card variant="bordered" className="rounded-2xl sm:flex-row">
        <div className="flex-1 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Meridian Air</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Flight MR 214, Saturday 12 April
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300">
              Boards 09:05
            </span>
          </div>

          <div className="mt-7 flex items-start gap-4">
            <div>
              <p className="font-mono text-3xl font-semibold tracking-tight">
                DAC
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Dhaka</p>
              <p className="mt-2 font-mono text-sm tabular-nums">09:40</p>
            </div>
            <div className="flex-1 pt-3">
              <div className="flex items-center">
                <span className="flex-1 border-t border-dashed border-teal-500/50" />
                <span className="mx-2 grid size-7 place-items-center rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Plane className="size-3.5 rotate-90" />
                </span>
                <span className="flex-1 border-t border-dashed border-teal-500/50" />
              </div>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                5 h 25 m, nonstop
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-3xl font-semibold tracking-tight">
                SIN
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Singapore</p>
              <p className="mt-2 font-mono text-sm tabular-nums">15:05</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-4 border-t border-border pt-5">
            {[
              ["Passenger", "R. Chowdhury"],
              ["Gate", "C4"],
              ["Zone", "2"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 truncate font-mono text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative border-t border-dashed border-border p-6 sm:w-48 sm:border-l sm:border-t-0">
          {/* Punched holes where the stub tears off: half outside the card,
              filled with the page colour, so they read as bites. */}
          <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full border border-border bg-background" />
          <span className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full border border-border bg-background sm:block" />
          <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full border border-border bg-background sm:hidden" />

          <p className="text-xs text-muted-foreground">Seat</p>
          <p className="font-mono text-4xl font-semibold tracking-tight">14A</p>
          <div className="mt-5 h-14 w-full bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)] text-foreground/75" />
          <p className="mt-2 font-mono text-[11px] tracking-widest text-muted-foreground">
            MR214 12APR
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ========================================================================== */
/*  Now playing — a card that holds a running transport                        */
/* ========================================================================== */

const WAVEFORM = [
  22, 34, 48, 40, 62, 76, 58, 44, 68, 88, 72, 54, 38, 46, 60, 82, 96, 78, 56,
  42, 34, 50, 66, 84, 70, 52, 40, 58, 74, 90, 64, 46, 36, 44, 62, 80, 68, 50,
  38, 30, 42, 56, 34, 24,
];
const TRACK_LENGTH = 214;

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function NowPlayingCard() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(72);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setElapsed((value) => (value >= TRACK_LENGTH ? 0 : value + 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing]);

  const progress = elapsed / TRACK_LENGTH;

  return (
    <Card
      variant="bordered"
      className="w-full max-w-2xl overflow-hidden rounded-2xl sm:flex-row"
    >
      <div className="grid aspect-square w-full shrink-0 place-items-center bg-indigo-950 sm:aspect-auto sm:size-48">
        <div
          className={cn(
            "grid size-32 place-items-center rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.10)_0_1px,transparent_1px_5px)] ring-1 ring-white/10 sm:size-36",
            playing && "[animation-duration:6s] motion-safe:animate-spin",
          )}
        >
          <span className="grid size-12 place-items-center rounded-full bg-amber-400">
            <span className="size-1.5 rounded-full bg-indigo-950" />
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col justify-center gap-4 p-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-3 items-end gap-[3px]" aria-hidden>
              {[8, 12, 6].map((height, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-[3px] rounded-full bg-indigo-500",
                    playing && "motion-safe:animate-pulse",
                  )}
                  style={{ height, animationDelay: `${i * 160}ms` }}
                />
              ))}
            </span>
            {playing ? "Playing" : "Paused"}
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-tight">
            Ceiling Fan Blues
          </h3>
          <p className="text-sm text-muted-foreground">Lila Moreau Trio</p>
        </div>

        <div className="relative rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
          <div
            aria-hidden
            className="pointer-events-none flex h-10 items-end gap-[3px]"
          >
            {WAVEFORM.map((height, i) => (
              <span
                key={i}
                className={cn(
                  "min-w-0 flex-1 rounded-full transition-colors",
                  i / WAVEFORM.length <= progress
                    ? "bg-indigo-500"
                    : "bg-muted-foreground/25",
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={TRACK_LENGTH}
            value={elapsed}
            aria-label="Seek"
            onChange={(event) => setElapsed(Number(event.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>

        <div className="flex justify-between font-mono text-xs tabular-nums text-muted-foreground">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(TRACK_LENGTH)}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous track"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((value) => !value)}
            className="grid size-11 place-items-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 translate-x-px" />
            )}
          </button>
          <button
            type="button"
            aria-label="Next track"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <SkipForward className="size-4" />
          </button>
          <span className="flex-1" />
          <button
            type="button"
            aria-label={saved ? "Remove from library" : "Save to library"}
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Heart className={cn("size-4", saved && "fill-rose-500 text-rose-500")} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
