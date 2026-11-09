/**
 * Variant data model for the "ask before picking a variant" agent workflow.
 *
 * Site-only: nothing under src/components/custom or src/components/ui may
 * import this. One hand-written file per docs page that offers a choice lives
 * next to this one (`<slug>.ts`) and is registered in `./index.ts`. Everything
 * the agent sees (index, viewer, registry descriptions, skill) is generated
 * from it. `npm run check:variants` keeps it honest.
 *
 * See AGENT-WORKFLOW-PLAN.md section 3.
 */

export type Variant = {
  /** URL-safe, unique per page: "honeycomb". Used in /view/<slug>/<id>. */
  id: string;
  /** "Honeycomb hero" */
  label: string;
  /** One line, at most 120 characters. */
  summary: string;
  /** At least one: "travel and outdoor brands with strong photography". */
  bestFor: string[];
  /** At least one: "you have no photographs". */
  avoidIf: string[];
  /** Short facts an agent can score against a brief: "carousel", "needs photos". */
  traits: string[];

  /**
   * Registry item to install, e.g. "honeycomb-hero". A look of a multi-look
   * component installs the shared item ("hero").
   * Namespace: `registry.json` item names.
   */
  item: string;
  /**
   * Preview (sandbox) demo name, rendered at `/preview/<demo>`.
   * Namespace: `src/preview/names.ts`. Often equal to `item`, but not always
   * (`hero-doctor` installs item `hero`; the demo `homepage-hero` is a different
   * thing from the registry item `homepage-hero`). Never assume they match.
   */
  demo: string;
  /**
   * Title of the ExampleShowcase example on the docs page that this variant
   * mirrors. The example must sit in a showcase whose `name` equals `demo`.
   * The "back to docs" anchor is `#` + (example id ?? slugify(title)).
   */
  example: string;
  /**
   * Props sent to the preview as `?props=<json>`. Omit when the demo already
   * hard-codes the variant (hero-doctor) or the default look is the variant.
   * For one-item pages: `{ variant: "simple-centered" }`.
   */
  props?: Record<string, unknown>;
};

export type PageVariants = {
  /** Docs page slug, equal to the folder under src/app/docs/[framework]/. */
  slug: string;
  /** When to use this section at all. */
  intro: string;
  /** Sibling components that fit better in some cases. `slug` is a docs page. */
  whenNot?: { use: string; slug: string; reason: string }[];
  /** Real mistakes, from the source. */
  gotchas?: string[];
  /** Two or more. */
  variants: Variant[];
};
