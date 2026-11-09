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
  /**
   * Which group the variant sits in, so a click-to-pick question can offer
   * groups first and then the few variants in one group (those tools hold 2 to
   * 4 options per question). Required when the page has 4 or more variants:
   * at most 4 groups, at most 4 variants in each. A short label such as
   * "Photo-led".
   */
  group?: string;
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
  /**
   * The props an agent must set on the installed component to get this look
   * (`{ variant: "glass-dock" }`). Goes into the agent index as `props`.
   * Different from `props`, which only drives the preview and may hold
   * example tuning or a demo switch that is not a real prop of the item.
   * Omit when installing the item is the look.
   */
  setProps?: Record<string, unknown>;
  /**
   * True when `item` is a general-purpose component (a text input, a folder)
   * that is also used for things unrelated to this page. Its registry
   * description then does NOT get the ask-first notice, so an agent that only
   * wants a plain text field is not asked about file uploads.
   */
  generalItem?: boolean;
};

export type PageVariants = {
  /** Docs page slug, equal to the folder under src/app/docs/[framework]/. */
  slug: string;
  /** When to use this section at all. */
  intro: string;
  /** Sibling components that fit better in some cases. `slug` is a docs page. */
  whenNot?: { use: string; slug: string; reason: string }[];
  /**
   * Registry items that are the same kind of section but not one of the
   * variants (and so are not listed to the user). A search can still land on
   * them, so their registry description gets the same ask-first notice.
   * Namespace: `registry.json` item names.
   */
  relatedItems?: string[];
  /** Real mistakes, from the source. */
  gotchas?: string[];
  /** Two or more. */
  variants: Variant[];
};
