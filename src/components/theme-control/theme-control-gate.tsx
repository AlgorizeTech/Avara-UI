"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/**
 * The customizer pulls in the sheet, the preset/colour/font controls and the
 * theme-preset tables, and it renders nothing at all on the home page, the
 * themes page or an embedded preview. Gating the import on the same paths
 * keeps all of that out of those pages' bundles. Everywhere else it is
 * rendered on the server as before, so the tab is part of the first paint.
 */
const ThemeControl = dynamic(() =>
  import("./theme-control").then((m) => m.ThemeControl),
);

export function ThemeControlGate() {
  const pathname = usePathname();
  if (
    pathname === "/" ||
    pathname === "/themes" ||
    pathname?.startsWith("/preview")
  ) {
    return null;
  }
  return <ThemeControl />;
}
