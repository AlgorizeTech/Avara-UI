"use client";

import React from "react";
import SplitFlap, { SplitFlapProps } from "@/components/custom/split-flap";

export default function SplitFlapDemo(props: SplitFlapProps) {
  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-8 min-h-[460px] bg-background/50">
      <SplitFlap {...props} />
    </div>
  );
}
