"use client";

import {
  LivePulsePill,
  DEFAULT_LIVE_PARTICIPANTS,
  type LiveParticipant,
} from "@/components/custom/blocks/LivePulsePillBlock";
import { useState } from "react";

export default function LivePulsePillDemo({
  variant = "default",
  title = "Live Session",
  actionLabel = "Join Now",
  count,
  themeColor,
}: {
  variant?: "default" | "pulse";
  title?: string;
  actionLabel?: string;
  count?: number | string;
  themeColor?: string;
}) {
  const [participants] = useState<LiveParticipant[]>(DEFAULT_LIVE_PARTICIPANTS);

  return (
    <div className="w-full min-h-[160px] sm:min-h-[190px] flex items-center justify-center relative bg-[#f6f7fb]/60 dark:bg-card/40 rounded-2xl border border-border/60 p-6 sm:p-8 overflow-hidden">
      {/* Background ambient decorative shapes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="size-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* The Live Pulse Pill: Compact, centered with clear border and vibrating outward waves */}
        <LivePulsePill
          variant={variant}
          participants={participants}
          title={title}
          actionLabel={actionLabel}
          count={count}
          themeColor={themeColor}
        />
      </div>
    </div>
  );
}
