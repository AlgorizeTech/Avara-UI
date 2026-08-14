"use client";

import {
  BreadcrumbBlock,
  BreadcrumbColor,
  BreadcrumbVariant,
} from "@/components/custom/blocks/BreadcrumbBlock";
import { FileText, Folder, Home, Settings } from "lucide-react";

// Mock Paths
const shortPath = [
  { label: "Home", href: "/", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/settings/profile" },
];

const longPath = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Nexus UI Kit", href: "/projects/nexus" },
  { label: "Components", href: "/projects/nexus/components" },
  { label: "Breadcrumb.tsx", href: "#", icon: FileText },
];

const plainPath = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
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
      <div className="w-full flex flex-col items-center justify-center gap-8 py-20">
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
    <div className="w-full flex items-center justify-center py-20">
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
