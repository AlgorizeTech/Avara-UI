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

export default function BreadcrumbDemo({
  variant = "classic",
  color = "primary",
  isLongPath = false,
}: {
  variant?: BreadcrumbVariant;
  color?: BreadcrumbColor | string;
  isLongPath?: boolean;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      {/* Key forces re-render so the "expansion" state resets when user changes length */}
      <BreadcrumbBlock
        key={`${variant}-${color}-${isLongPath}`}
        variant={variant}
        color={color}
        items={isLongPath ? longPath : shortPath}
        maxItems={4}
      />
    </div>
  );
}
