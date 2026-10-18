"use client";

import React from "react";
import DesignsToolkitBlock, {
  type ToolkitItem,
  type FooterNote,
  CREATIVE_TOOLKIT_ITEMS,
  DEVELOPER_TOOLKIT_ITEMS,
  ROADMAP_TOOLKIT_ITEMS,
} from "@/components/custom/blocks/DesignsToolkitBlock";

export interface DesignsToolkitDemoProps {
  variant?: "grid" | "roadmap";
  items?: ToolkitItem[];
  preset?: "creative" | "developer" | "roadmap";
  title?: string;
  description?: string;
  showDashedLine?: boolean;
  showGrid?: boolean;
  showLines?: boolean;
  interactive?: boolean;
  animated?: boolean;
  animationDuration?: number;
  animationSpeed?: number;
  footerNote?: FooterNote;
}

export default function DesignsToolkitDemo({
  variant = "grid",
  items,
  preset = "creative",
  title,
  description,
  showDashedLine = true,
  showGrid = true,
  showLines,
  interactive = true,
  animated = true,
  animationDuration,
  animationSpeed,
  footerNote,
}: DesignsToolkitDemoProps) {
  const resolvedItems =
    items ??
    (variant === "roadmap" || preset === "roadmap"
      ? ROADMAP_TOOLKIT_ITEMS
      : preset === "developer"
        ? DEVELOPER_TOOLKIT_ITEMS
        : CREATIVE_TOOLKIT_ITEMS);

  return (
    <div
      className="w-full block"
      style={{
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "15px",
        paddingRight: "0px",
        boxSizing: "border-box",
      }}
    >
      <DesignsToolkitBlock
        variant={variant}
        items={resolvedItems}
        title={title}
        description={description}
        showDashedLine={showDashedLine}
        showGrid={showGrid}
        showLines={showLines ?? (variant === "roadmap")}
        interactive={interactive}
        animated={animated}
        animationDuration={animationDuration ?? animationSpeed}
        footerNote={footerNote}
      />
    </div>
  );
}
