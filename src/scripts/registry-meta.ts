/**
 * Human-authored registry metadata.
 *
 * generate-registry.ts derives everything mechanical (names, file paths,
 * dependencies, targets) by parsing the source. It CANNOT derive prose.
 * Description, categories and post-install notes live here.
 *
 * Keys are the generated item name (kebab-case). Anything absent falls back to
 * a placeholder and is reported by `npm run generate:registry` so the gap is
 * visible rather than silently shipped.
 */

export type ItemMeta = {
  /** One sentence, present tense: what it does and when you'd reach for it. */
  description: string;
  /** Controlled vocabulary — see CATEGORIES below. Do not invent new ones ad hoc. */
  categories: string[];
  /** Post-install notes: exports, gotchas, required setup. Shown after `shadcn add`. */
  docs?: string;
};

/** The controlled category vocabulary. Adding a term here is a deliberate act. */
export const CATEGORIES = [
  "actions",
  "authentication",
  "code",
  "commerce",
  "communication",
  "data-display",
  "dates",
  "feedback",
  "forms",
  "layout",
  "maps",
  "marketing",
  "media",
  "navigation",
  "overlays",
  "scroll",
  "typography",
  "utilities",
] as const;

/**
 * Name overrides where the mechanical kebab-case of the filename is wrong or
 * collides with another item.
 */
export const NAME_OVERRIDES: Record<string, string> = {
  // Filename → item name
  "ThreeDCarouselBlock.tsx": "carousel-3d",
  "UtilityBlocks.tsx": "utility",
  "Alerts.tsx": "alert",
  "CustomCodeBlock.tsx": "custom-code-block",
  "Ai-chat.tsx": "ai-chat",
  "Fleet-map.tsx": "fleet-map",
  "Fleet-tracker.tsx": "fleet-tracker",
  "Pricing-plan.tsx": "pricing-plan",
  "Support-dashboard.tsx": "support-dashboard",
  "DesignComponentsFolder.tsx": "design-components-folder",
  "DesignFolderBox.tsx": "design-folder-box",
};

export const META: Record<string, ItemMeta> = {
  // ---- Curated in Phase 3. Verified against source. ----
  button: {
    description:
      "A button with variants, sizes, loading state, and a click ripple effect. Reach for it as the default action element anywhere in an interface.",
    categories: ["actions", "forms"],
    docs: "Default export. Supports variant (default | destructive | outline | secondary | ghost | link), size (sm | lg), and a `loading` prop. Ripple keyframes are injected into document.head on mount, so no Tailwind config or global CSS changes are needed.",
  },
  card: {
    description:
      "A composable surface with header, title, description, content, and footer slots. Use it to group related content into a bounded block.",
    categories: ["layout"],
    docs: "Named exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. Compose them rather than passing props to a single element.",
  },
  tooltip: {
    description:
      "A portal-rendered tooltip with fade and zoom entrance, positioned on hover or focus. Use it for short labels that clarify an unlabeled control.",
    categories: ["overlays"],
    docs: "Named exports: TooltipProvider, Tooltip, TooltipTrigger, TooltipContent. Requires the `animate-in`, `fade-in` and `zoom-in-95` utilities — on Tailwind v4 add `@import \"tw-animate-css\";` to your global stylesheet, on v3 use the `tailwindcss-animate` plugin. Content renders through a React portal at z-index 9999.",
  },
  skeleton: {
    description:
      "A loading placeholder with a pulse or shimmer sweep. Use it to hold layout space while content is still being fetched.",
    categories: ["feedback"],
    docs: "Shimmer keyframes ship inline in a scoped <style> block — no global CSS or Tailwind config changes required.",
  },
  progress: {
    description:
      "A themeable progress bar with an optional labelled field wrapper. Use it for determinate operations where percentage complete is known.",
    categories: ["feedback"],
    docs: "Named exports: Progress, ProgressField, getThemeStyles. Use ProgressField when you need a label and value readout; use Progress bare inside your own layout.",
  },
  toggle: {
    description:
      "A two-state switch with controlled and uncontrolled modes. Use it for settings that apply immediately, rather than a checkbox in a submitted form.",
    categories: ["forms"],
    docs: "Named export: Toggle. Forwards a ref and accepts `checked` / `onCheckedChange` for controlled use, or `defaultChecked` for uncontrolled.",
  },
  "otp-input": {
    description:
      "A segmented one-time-passcode field with auto-advance, paste handling, and backspace navigation. Use it for email or SMS verification steps.",
    categories: ["forms", "authentication"],
    docs: "Pasting a full code into any cell distributes the digits across all cells.",
  },
  kbd: {
    description:
      "An inline keyboard-key badge for rendering shortcuts. Use it in menus, tooltips, and docs where a keystroke needs to look pressable.",
    categories: ["typography"],
    docs: "Compose several side by side for chords, e.g. <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>.",
  },
  pagination: {
    description:
      "A page navigator with previous/next controls and truncated page ranges. Use it for paged tables and result lists.",
    categories: ["navigation"],
    docs: "Renders framework-agnostic buttons, not router links, so wire navigation through your own handler.",
  },
  marquee: {
    description:
      "A continuously scrolling row or column of content that loops seamlessly. Use it for logo walls and testimonial strips.",
    categories: ["data-display"],
    docs: "Duplicate the children set to keep the loop seamless; supports reverse and vertical orientations.",
  },
  terminal: {
    description:
      "A terminal-styled code surface with a copy-to-clipboard control. Use it in docs and landing pages to present install or CLI commands.",
    categories: ["code", "marketing"],
    docs: "The copy button uses navigator.clipboard, which requires a secure context (HTTPS or localhost).",
  },

  // ---- Shared primitives (src/components/custom/ui) ----
  "ui-accordion": {
    description:
      "The Radix-backed accordion primitive that the higher-level Accordion block composes. Install it only if you want the unstyled base directly.",
    categories: ["utilities"],
    docs: "Named exports: Accordion, AccordionItem, AccordionTrigger, AccordionContent. This is the internal primitive — most projects want the `accordion` item instead.",
  },
  "ui-badge": {
    description:
      "A small status label primitive with CVA-driven variants. Used internally by pricing blocks.",
    categories: ["utilities"],
  },
  "ui-button": {
    description:
      "A minimal CVA button primitive with Radix Slot support for `asChild`. Used internally by the Calendar and pricing blocks.",
    categories: ["utilities"],
    docs: "This is the internal primitive, not the main `button` item. Prefer `button` unless you specifically need the Slot-based base.",
  },
  "ui-slider": {
    description:
      "The Radix slider primitive used by pricing blocks for usage-based tier selection.",
    categories: ["utilities"],
  },
  "ui-base": {
    description:
      "Shared layout scaffolding (ComponentCard, ToggleSwitch) used by the settings, payment, compute and utility blocks.",
    categories: ["utilities"],
    docs: "Named exports: ComponentCard, ToggleSwitch. Pulled in automatically as a dependency — rarely installed directly.",
  },
  "ui-card": {
    description:
      "The card surface primitive that the pricing-plan block composes.",
    categories: ["utilities"],
    docs: "NOTE: installs to components/ui/card.tsx and will overwrite a shadcn `card` already present. Review before installing into an existing project.",
  },
};
