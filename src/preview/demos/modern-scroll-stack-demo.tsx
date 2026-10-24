"use client";

import React, { useRef } from "react";
import {
  ModernScrollStack,
  type ModernScrollStackProps,
} from "@/components/custom/blocks/ModernScrollStackBlock";

export default function ModernScrollStackDemo(props: ModernScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollerRef}
      className="h-[640px] w-full overflow-y-auto overflow-x-hidden bg-background"
    >
      <ModernScrollStack scrollerRef={scrollerRef} {...props} />
    </div>
  );
}
