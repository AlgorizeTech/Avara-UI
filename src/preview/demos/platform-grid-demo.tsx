"use client";

import {
  ArrowLeftRight,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Box,
  Calculator,
  ChartLine,
  ClipboardList,
  Copy,
  Database,
  DollarSign,
  FileText,
  Flame,
  Globe,
  Grid2x2,
  HeartHandshake,
  Landmark,
  LayoutGrid,
  Lightbulb,
  MessageSquare,
  MessagesSquare,
  PackageOpen,
  Puzzle,
  Radio,
  Rocket,
  Scissors,
  Search,
  Sparkles,
  Star,
  Store,
  Tag,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import { PlatformGrid } from "@/components/custom/blocks/PlatformGridBlock";
import {
  AppStoreIcon,
  CapterraIcon,
  G2Icon,
  GooglePlayIcon,
  RedditIcon,
  StripeIcon,
  UpworkIcon,
  YCombinatorIcon,
} from "@/components/custom/blocks/Icons";
import { cn } from "@/lib/utils";

// A small mark on a dark tile, the way store badges are drawn.
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#141414] text-white dark:bg-white dark:text-[#141414]">
    {children}
  </span>
);

const StoreBadges = () => (
  <span className="flex items-center gap-1">
    <Badge><AppStoreIcon size={10} fill="currentColor" /></Badge>
    <Badge><GooglePlayIcon size={9} fill="currentColor" /></Badge>
  </span>
);

// The reference order: features are placed where dense packing lands them at
// eight columns, and simply flow with the rest at narrower widths.
type Cell =
  | { kind: "tile"; label: string; icon: React.ReactNode }
  | { kind: "feature"; label: string; icon: React.ReactNode; card: React.ReactNode };

const t = (label: string, icon: React.ReactNode): Cell => ({ kind: "tile", label, icon });

const CELLS: Cell[] = [
  t("BuildHub", <Grid2x2 />),
  t("BuildGuide", <Rocket />),
  t("BigIdeasDB MCP", <Sparkles />),
  t("Reddit MCP", <Bot />),
  t("Database AI Chat", <MessageSquare />),
  t("TrustMRR", <Star />),
  t("Stripe Index", <DollarSign />),
  t("Stripe CRM", <StripeIcon fill="currentColor" />),
  t("SellSide DB", <Store />),
  t("Acquire.com Data", <HeartHandshake />),
  {
    kind: "feature",
    label: "G2 Analysis",
    icon: <G2Icon />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold">Email Client</span>
          <PlatformGrid.Pill>Gap: 8.5</PlatformGrid.Pill>
        </div>
        <p className="truncate text-[7px] text-black/50 dark:text-white/50">Sync failures dominate 1,412 negative reviews</p>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill tone="soft">26 companies</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">↓ Export</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  {
    kind: "feature",
    label: "Capterra Analysis",
    icon: <CapterraIcon />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold">360 Degree Feedback</span>
          <PlatformGrid.Pill>Gap: 8.0</PlatformGrid.Pill>
        </div>
        <p className="truncate text-[7px] text-black/50 dark:text-white/50">Integration issues with meeting link systems</p>
        <div className="flex items-center gap-1 pt-0.5">
          <PlatformGrid.Pill tone="soft">55 companies</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">2,761 reviews</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  t("Funded DB", <Landmark />),
  t("Y Combinator Data", <YCombinatorIcon fill="currentColor" />),
  t("Claude Skills Packs", <Puzzle />),
  t("SaaS Boilerplate", <Box />),
  t("Clipper Extension", <Scissors />),
  t("LaunchDB", <Zap />),
  t("SwiperDB", <Copy />),
  t("Intelligence Report", <FileText />),
  {
    kind: "feature",
    label: "Reddit Analysis",
    icon: <RedditIcon />,
    card: (
      <PlatformGrid.Mock>
        <p className="text-[8px] italic leading-snug text-black/70 dark:text-white/70">
          &ldquo;Honestly so frustrated with juggling three tools for one client&rdquo;
        </p>
        <div className="flex flex-wrap gap-1">
          <PlatformGrid.Pill tone="soft">urgency</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">owner</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">churn risk</PlatformGrid.Pill>
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill>Pain point</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">See pipeline →</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  {
    kind: "feature",
    label: "App Store Analysis",
    icon: <StoreBadges />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-primary text-primary-foreground">
            <ClipboardList size={9} />
          </span>
          <span className="text-[9px] font-semibold">MealPrepPro Planner</span>
        </div>
        <p className="text-[7px] text-black/50 dark:text-white/50">
          <span className="text-primary">★</span> 4.2 · 15 reviews · Paid
        </p>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill>UX issues</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">View analysis</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  t("CopyCat DB", <LayoutGrid />),
  t("Problems DB", <Database />),
  t("Solutions DB", <Lightbulb />),
  t("Pain Points", <Flame />),
  t("Complaints DB", <MessagesSquare />),
  t("Product Hunt DB", <PackageOpen />),
  t("App Store DB", <StoreBadges />),
  t("Upwork Analysis", <UpworkIcon />),
  t("Idea Evaluator", <BadgeDollarSign />),
  t("Live Data", <Radio />),
  t("Data Requests", <ClipboardList />),
  t("Leaderboards", <Trophy />),
  t("Feature Suggestions", <Tag />),
  t("App Revenue Calculator", <Calculator />),
  t("MRR Calculator", <ChartLine />),
  t("Valuation Calculator", <Calculator />),
  t("Metrics Dashboard", <BarChart3 />),
  t("Idea Generator", <ArrowLeftRight />),
  t("Keyword Generator", <Search />),
  t("Domain Generator", <Globe />),
  t("Free Tools", <Wrench />),
  t("Docs", <BookOpen />),
];

export default function PlatformGridDemo({
  reveal = "immediate",
  fadeEdges = true,
  rounded = true,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  fadeEdges?: boolean;
  rounded?: boolean;
}) {
  return (
    <PlatformGrid
      reveal={reveal}
      fadeEdges={fadeEdges}
      eyebrow="The full platform"
      heading={
        <>
          Everything You Need
          <br />
          in One Platform
        </>
      }
      intro="40+ databases, pipelines, and tools to find, validate, and build your next product."
      className={cn("max-w-6xl pb-10", rounded && "overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/10")}
    >
      {CELLS.map((c) =>
        c.kind === "tile" ? (
          <PlatformGrid.Tile key={c.label} icon={c.icon} label={c.label} href="#" />
        ) : (
          <PlatformGrid.Feature key={c.label} icon={c.icon} label={c.label} href="#">
            {c.card}
          </PlatformGrid.Feature>
        ),
      )}
    </PlatformGrid>
  );
}
