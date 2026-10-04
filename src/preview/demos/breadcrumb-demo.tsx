"use client";

import {
  BreadcrumbBlock,
  BreadcrumbColor,
  BreadcrumbVariant,
} from "@/components/custom/blocks/BreadcrumbBlock";
import { FileText, Folder, Home, Settings } from "lucide-react";

// Mock Paths
const shortPath = [
  { label: "Home", href: "#", icon: Home },
  { label: "Settings", href: "#", icon: Settings },
  { label: "Profile", href: "#" },
];

const longPath = [
  { label: "Home", href: "#", icon: Home },
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#", icon: Folder },
  { label: "Nexus UI Kit", href: "#" },
  { label: "Components", href: "#" },
  { label: "Breadcrumb.tsx", href: "#", icon: FileText },
];

const plainPath = [
  { label: "Docs", href: "#" },
  { label: "Components", href: "#" },
  { label: "Breadcrumb", href: "#" },
];

export default function BreadcrumbDemo({
  variant = "classic",
  color = "primary",
  isLongPath = false,
  maxItems = 4,
  showIcons = true,
  showAll,
}: {
  variant?: BreadcrumbVariant;
  color?: BreadcrumbColor | string;
  isLongPath?: boolean;
  maxItems?: number;
  /** false swaps in a path whose items carry no `icon`. */
  showIcons?: boolean;
  /** Render-all mode: every visual variant stacked in one frame. */
  showAll?: "variants";
}) {
  const items = isLongPath ? longPath : showIcons ? shortPath : plainPath;

  if (showAll === "variants") {
    const variants: BreadcrumbVariant[] = [
      "classic",
      "slash",
      "solid",
      "ghost",
    ];

    return (
      <div className="w-full flex flex-col items-center justify-center gap-10 py-16 text-center">
        {variants.map((v) => (
          <BreadcrumbBlock
            key={v}
            variant={v}
            color={color}
            items={items}
            maxItems={maxItems}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-16 text-center">
      {/* Key forces re-render so the "expansion" state resets when user changes length */}
      <BreadcrumbBlock
        key={`${variant}-${color}-${isLongPath}-${maxItems}-${showIcons}`}
        variant={variant}
        color={color}
        items={items}
        maxItems={maxItems}
      />
    </div>
  );
}
