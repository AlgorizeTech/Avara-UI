"use client";

import { ArrowUpRight, Download, Handshake, TrendingUp } from "lucide-react";
import Button from "@/components/custom/blocks/Button";
import { DataFlow } from "@/components/custom/blocks/DataFlowBlock";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
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

// The store marks sit white on black tiles, as store badges do; two platforms
// have no public mark and get a tinted tile with a glyph instead.
function Tile({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-[5px] text-white" style={{ backgroundColor: bg }}>
      {children}
    </span>
  );
}

const SOURCES = [
  {
    title: "App stores",
    count: "2 sources",
    items: [
      { label: "App Store", icon: <Tile bg="#141414"><AppStoreIcon size={13} fill="currentColor" /></Tile> },
      { label: "Google Play", icon: <Tile bg="#141414"><GooglePlayIcon size={11} fill="currentColor" /></Tile> },
    ],
  },
  {
    title: "Review platforms",
    count: "4 sources",
    items: [
      { label: "G2", icon: <G2Icon size={20} /> },
      { label: "Capterra", icon: <CapterraIcon size={20} /> },
      { label: "Reddit", icon: <RedditIcon size={20} /> },
      { label: "Upwork", icon: <UpworkIcon size={20} /> },
    ],
  },
  {
    title: "Data intel",
    count: "4 sources",
    items: [
      { label: "Stripe", icon: <StripeIcon size={20} /> },
      { label: "TrustMRR", icon: <Tile bg="#2563eb"><TrendingUp size={12} strokeWidth={2.5} /></Tile> },
      { label: "Acquire.com", icon: <Tile bg="#1d4ed8"><Handshake size={12} strokeWidth={2.5} /></Tile> },
      { label: "Y Combinator", icon: <YCombinatorIcon size={20} /> },
    ],
  },
];

export default function DataFlowDemo({
  reveal = "immediate",
  rounded = true,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
}) {
  return (
    <DataFlow
      reveal={reveal}
      eyebrow="Integrated intelligence"
      heading="From Data to Opportunities"
      intro={
        <>
          We scraped <mark>10 platforms</mark> and analyzed <mark>millions of complaints</mark>, reviews, and revenue signals
          to hand you <mark>validated startup opportunities</mark>.
        </>
      }
      className={cn("max-w-6xl", rounded && "overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/10")}
    >
      {SOURCES.map((s) => (
        <DataFlow.Source key={s.title} title={s.title} count={s.count} items={s.items} />
      ))}

      <DataFlow.Core title="Deep Analysis" subtitle="AI-powered processing" />

      <DataFlow.Output title="Market Analysis Reports" badge="3,432 categories">
        <div className="flex flex-wrap gap-1.5">
          <DataFlow.Tag>Maturity: Growing</DataFlow.Tag>
          <DataFlow.Tag>Competition: High</DataFlow.Tag>
          <DataFlow.Tag>Trend: AI Analytics</DataFlow.Tag>
        </div>
        <Button variant="default" size="sm" iconLeft={<Download size={11} />} className="h-7 rounded-md px-2.5 text-[10.5px] shadow-none">
          Export data
        </Button>
      </DataFlow.Output>

      <DataFlow.Output title="Ranked Pain Points" badge="200K+ found">
        <DataFlow.Row>
          Integration issues with HR systems
          <DataFlow.Pill>Gap: 8.0</DataFlow.Pill>
        </DataFlow.Row>
        <DataFlow.Row>
          Unreliable sync breaks daily workflows
          <DataFlow.Pill>Gap: 8.5</DataFlow.Pill>
        </DataFlow.Row>
      </DataFlow.Output>

      <DataFlow.Output title="Startup Opportunities" badge="15,000+ scored">
        <DataFlow.Row className="border border-emerald-500/25 bg-emerald-50 text-[11px] leading-snug text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
          <span>
            <strong className="font-bold">Opportunity:</strong> Self-serve report builder for agencies, demand already proven
          </span>
        </DataFlow.Row>
        <div className="flex justify-end">
          <Button variant="default" size="sm" iconRight={<ArrowUpRight size={11} />} className="h-7 rounded-md px-2.5 text-[10.5px] shadow-none">
            Start building
          </Button>
        </div>
      </DataFlow.Output>

      <DataFlow.Output title="Individual Reviews" badge="1M+ analyzed">
        <DataFlow.Row className="flex-col items-stretch gap-1.5">
          <span className="flex items-center justify-between">
            <HalfStars rating={2} size={10} showText={false} activeColor="text-primary" inactiveColor="text-black/15 dark:text-white/20" className="gap-0" role="img" aria-label="2 out of 5" />
            <a href="#" className="inline-flex items-center gap-0.5 text-[10px] font-medium text-black/60 hover:text-black dark:text-white/60">
              View on G2 <ArrowUpRight size={10} />
            </a>
          </span>
          <span className="text-[11px] italic text-black/70 dark:text-white/70">
            &ldquo;No calendar integration at all, so I still live in Outlook&hellip;&rdquo;
          </span>
        </DataFlow.Row>
      </DataFlow.Output>
    </DataFlow>
  );
}
