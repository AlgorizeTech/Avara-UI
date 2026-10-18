"use client";

import React from "react";
import DesignsToolkitBlock, {
  type ToolkitItem,
  CREATIVE_TOOLKIT_ITEMS,
  DEVELOPER_TOOLKIT_ITEMS,
} from "@/components/custom/blocks/DesignsToolkitBlock";

export interface DesignsToolkitDemoProps {
  items?: ToolkitItem[];
  preset?: "creative" | "developer";
  title?: string;
  description?: string;
  showDashedLine?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
  animated?: boolean;
  animationDuration?: number;
  animationSpeed?: number;
}

export default function DesignsToolkitDemo({
  items,
  preset = "creative",
  title,
  description,
  showDashedLine = true,
  showGrid = true,
  interactive = true,
  animated = true,
  animationDuration,
  animationSpeed,
}: DesignsToolkitDemoProps) {
  const resolvedItems =
    items ??
    (preset === "developer"
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
        items={resolvedItems}
        title={title}
        description={description}
        showDashedLine={showDashedLine}
        showGrid={showGrid}
        interactive={interactive}
        animated={animated}
        animationDuration={animationDuration ?? animationSpeed}
      />
    </div>
  );
}
