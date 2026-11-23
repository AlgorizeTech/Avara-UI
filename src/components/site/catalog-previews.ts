import type { ComponentType, LazyExoticComponent } from "react";

import { navigation } from "@/constants/navigation";
import { lazyRetry } from "@/preview/lazyRetry";
import { sandboxNames } from "@/preview/names";
import { sandboxRegistry } from "@/preview/registry";

/**
 * Catalog cards that show the REAL component instead of a drawn miniature.
 *
 * - `width`  the width in CSS px the component is laid out at. It is then
 *            measured and scaled down to fit the card whole, centred, never
 *            cropped, so this sets its proportions (a narrower width gives a
 *            taller, more compact layout), not its size on the card.
 * - `props`  passed to the demo, to pick the most telling example.
 */
export type CatalogPreviewSpec = {
  component: LazyExoticComponent<ComponentType<any>>;
  width: number;
  props?: Record<string, unknown>;
};

/** Slugs whose docs page shows a demo registered under a different name. */
export const PREVIEW_NAME_OVERRIDES: Record<string, string> = {
  "auth-forms": "login-form",
  "data-table": "advanced-table",
  "file-upload": "upload",
  "fleet-tracker": "fleet",
  navigation: "navigation-menu",
  "qr-code-generator": "qr-code",
  "split-scroll-stepper": "scroll-accordion",
  "support-dashboard": "support",
};

/**
 * Slugs that keep their miniature even inside the live range: demos that open
 * overlays or fixed-position UI over the page, or that are too heavy to run
 * inside a card. Add a slug here when a card's preview misbehaves.
 */
const KEEP_MINIATURE = new Set<string>([]);

/** Component cards are laid out at a compact width; website sections at a desktop one. */
const DEFAULT_WIDTH = 720;
const SECTION_WIDTH = 1200;

/** Per-slug width, props or a card-specific scene; everything else uses the demo as is. */
const OVERRIDES: Record<string, Partial<CatalogPreviewSpec>> = {
  accordion: { width: 600 },
  "action-buttons": {
    // A card-only scene: nine buttons in three even rows.
    component: lazyRetry(() => import("./catalog-scenes/ActionButtonsScene")),
    width: 760,
  },
  "agent-graph": { width: 1100 },
  "ai-chat": { width: 760 },
  alert: { width: 560 },
  "animated-list": { width: 640 },
  "animated-timeline": {
    // The docs demo is a scroller a card cannot scroll; this renders the timeline itself.
    component: lazyRetry(() => import("./catalog-scenes/AnimatedTimelineScene")),
    width: 760,
  },
  // The headline clips itself at its container, so it needs a stage wide enough to hold it.
  "animated-typography": { width: 1100 },
  "api-playground": { width: 900 },
  "apple-select": { width: 640 },
  // The split layout is landscape, so it fills a 2:1 card where the stacked form would not.
  "auth-forms": { width: 900, props: { variant: "split" } },
  "modern-scroll-stack": {
    // The docs demo is a scroller that rests on an empty block; this shows the settled stack.
    component: lazyRetry(() => import("./catalog-scenes/ModernScrollStackScene")),
    width: 760,
  },
  // Wide enough for the two-column layout (text beside the image), which is much shorter.
  "split-scroll-stepper": { width: 1200 },
  "video-accordion": {
    // The docs demo streams four large clips; the scene shows the posters only.
    component: lazyRetry(() => import("./catalog-scenes/VideoAccordionScene")),
    width: 760,
  },
};

const registeredDemos = new Set<string>(sandboxNames);

function buildPreviews(): Record<string, CatalogPreviewSpec> {
  const specs: Record<string, CatalogPreviewSpec> = {};
  for (const group of navigation) {
    if (group.label !== "Ui Components" && group.label !== "Website Sections") continue;
    for (const child of group.children) {
      if (!child.slug || KEEP_MINIATURE.has(child.slug)) continue;
      const demo = PREVIEW_NAME_OVERRIDES[child.slug] ?? child.slug;
      const override = OVERRIDES[child.slug];
      const component =
        override?.component ??
        (registeredDemos.has(demo) ? sandboxRegistry[demo] : undefined);
      if (!component) continue;
      specs[child.slug] = {
        component,
        width:
          override?.width ??
          (group.label === "Website Sections" ? SECTION_WIDTH : DEFAULT_WIDTH),
        props: override?.props,
      };
    }
  }
  return specs;
}

export const CATALOG_PREVIEWS: Record<string, CatalogPreviewSpec> = buildPreviews();
