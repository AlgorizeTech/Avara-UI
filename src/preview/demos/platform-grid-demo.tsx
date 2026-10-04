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
  <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-foreground text-background">
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
  t("Maker Hub", <Grid2x2 />),
  t("Launch Playbook", <Rocket />),
  t("Ideas MCP Server", <Sparkles />),
  t("Reddit Connector", <Bot />),
  t("Ask the Data", <MessageSquare />),
  t("Verified Revenue", <Star />),
  t("Stripe Benchmarks", <DollarSign />),
  t("Stripe Customers", <StripeIcon fill="currentColor" />),
  t("Deals for Sale", <Store />),
  t("Acquire.com Listings", <HeartHandshake />),
  {
    kind: "feature",
    label: "G2 Insights",
    icon: <G2Icon />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold">Inbox App</span>
          <PlatformGrid.Pill>Score: 8.4</PlatformGrid.Pill>
        </div>
        <p className="truncate text-[7px] text-foreground/50">Most of 1,380 low ratings blame sync errors</p>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill tone="soft">24 vendors</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">↓ Download</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  {
    kind: "feature",
    label: "Capterra Insights",
    icon: <CapterraIcon />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold">Team Review Tool</span>
          <PlatformGrid.Pill>Score: 7.9</PlatformGrid.Pill>
        </div>
        <p className="truncate text-[7px] text-foreground/50">Calendar integrations keep breaking</p>
        <div className="flex items-center gap-1 pt-0.5">
          <PlatformGrid.Pill tone="soft">52 vendors</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">2,690 reviews</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  t("Funding Rounds", <Landmark />),
  t("YC Startups", <YCombinatorIcon fill="currentColor" />),
  t("AI Skill Packs", <Puzzle />),
  t("Starter Kit", <Box />),
  t("Web Clipper", <Scissors />),
  t("Launch Tracker", <Zap />),
  t("Clone Ideas", <Copy />),
  t("Weekly Brief", <FileText />),
  {
    kind: "feature",
    label: "Reddit Insights",
    icon: <RedditIcon />,
    card: (
      <PlatformGrid.Mock>
        <p className="text-[8px] italic leading-snug text-foreground/70">
          &ldquo;Switching between three apps for every client is wearing me out&rdquo;
        </p>
        <div className="flex flex-wrap gap-1">
          <PlatformGrid.Pill tone="soft">urgent</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">founder</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="soft">may cancel</PlatformGrid.Pill>
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill>Frustration</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">Open pipeline →</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  {
    kind: "feature",
    label: "App Store Insights",
    icon: <StoreBadges />,
    card: (
      <PlatformGrid.Mock>
        <div className="flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-primary text-primary-foreground">
            <ClipboardList size={9} />
          </span>
          <span className="text-[9px] font-semibold">Weekly Meal Planner</span>
        </div>
        <p className="text-[7px] text-foreground/50">
          <span className="text-primary">★</span> 4.1 · 18 reviews · Paid
        </p>
        <div className="flex items-center justify-between pt-0.5">
          <PlatformGrid.Pill>Usability gaps</PlatformGrid.Pill>
          <PlatformGrid.Pill tone="accent">Read report</PlatformGrid.Pill>
        </div>
      </PlatformGrid.Mock>
    ),
  },
  t("Lookalike Apps", <LayoutGrid />),
  t("Problem Library", <Database />),
  t("Solution Library", <Lightbulb />),
  t("User Frustrations", <Flame />),
  t("Complaint Archive", <MessagesSquare />),
  t("Product Hunt Launches", <PackageOpen />),
  t("App Store Library", <StoreBadges />),
  t("Upwork Demand", <UpworkIcon />),
  t("Idea Scorer", <BadgeDollarSign />),
  t("Live Feed", <Radio />),
  t("Request a Dataset", <ClipboardList />),
  t("Rankings", <Trophy />),
  t("Feature Requests", <Tag />),
  t("App Income Estimator", <Calculator />),
  t("MRR Estimator", <ChartLine />),
  t("Valuation Estimator", <Calculator />),
  t("Metrics Board", <BarChart3 />),
  t("Idea Spark", <ArrowLeftRight />),
  t("Keyword Finder", <Search />),
  t("Domain Finder", <Globe />),
  t("Free Utilities", <Wrench />),
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
      eyebrow="The complete toolkit"
      heading={
        <>
          All Your Research
          <br />
          Under One Roof
        </>
      }
      intro="Over 40 datasets, pipelines and utilities to spot, test and ship your next product."
      className={cn("max-w-6xl pb-10", rounded && "overflow-hidden rounded-[28px] border border-border")}
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
