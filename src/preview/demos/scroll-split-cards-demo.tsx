"use client";

import React from "react";
import {
  ScrollSplitCards,
  type ScrollSplitCardsProps,
} from "@/components/custom/blocks/ScrollSplitCardsBlock";

export default function ScrollSplitCardsDemo(props: ScrollSplitCardsProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <ScrollSplitCards {...props} />
    </div>
  );
}
