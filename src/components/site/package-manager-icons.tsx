import { Boxes, Cat, Package, Zap, type LucideIcon } from "lucide-react";
import type { PackageManager } from "@/contexts/package-manager-context";

/**
 * One lucide mark per package manager, shared by the CLI block and the
 * package-manager tabs so both pick the same glyph for the same tool.
 *
 * lucide ships no brand logos, so these are stand-ins that lean on each tool's
 * own imagery: npm's box, pnpm's stacked boxes, yarn's cat mascot, bun's speed
 * pitch. The `color` is the tool's brand colour, for callers that want it —
 * except bun, whose cream (#FBF0DF) vanishes on a light tab, so it gets the
 * darker crust tone from the same logo.
 */
export const PACKAGE_MANAGER_ICONS: Record<
  PackageManager,
  { Icon: LucideIcon; color: string }
> = {
  npm: { Icon: Package, color: "#CB3837" },
  pnpm: { Icon: Boxes, color: "#F9DC3E" },
  yarn: { Icon: Cat, color: "#2C8EBB" },
  bun: { Icon: Zap, color: "#D89B5A" },
};
