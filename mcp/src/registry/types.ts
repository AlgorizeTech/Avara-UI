import { z } from "zod";

/**
 * Shape confirmed against the live registry (see mcp-guide.md section 1.1):
 * `public/r/registry.json` (index) and `public/r/<name>.json` (per-item).
 * Extra unknown keys must not break parsing, since the source registry can
 * grow fields (e.g. `tier`, `props`) without this client being updated in lockstep.
 */

const RegistryFileSchema = z
  .object({
    path: z.string(),
    type: z.string(),
    target: z.string().optional(),
    content: z.string().optional(),
  })
  .loose();

const TierSchema = z.enum(["free", "premium"]).default("free");

/**
 * Not emitted by generate-registry.ts yet (section 0.8 is approved but not
 * implemented as of this file). Declared now so the client accepts it the
 * moment it appears, without another schema change.
 */
const ComponentPropSchema = z
  .object({
    name: z.string(),
    type: z.string(),
    required: z.boolean().default(false),
    default: z.string().optional(),
    description: z.string().optional(),
    variantValues: z.array(z.string()).optional(),
  })
  .loose();
export type ComponentProp = z.infer<typeof ComponentPropSchema>;

/** Present on both the index entry and the full per-item document. */
const RegistryItemBaseSchema = z
  .object({
    name: z.string(),
    type: z.string(),
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).default([]),
    dependencies: z.array(z.string()).default([]),
    registryDependencies: z.array(z.string()).default([]),
    files: z.array(RegistryFileSchema).default([]),
    docs: z.string().optional(),
    /** Not in the registry today (section 1.1); defaults to "free" when absent. */
    tier: TierSchema,
    /** Structured props (section 0.8, Option A) — absent until generate-registry.ts is extended. */
    props: z.array(ComponentPropSchema).optional(),
  })
  .loose();

export const RegistryIndexItemSchema = RegistryItemBaseSchema;
export type RegistryIndexItem = z.infer<typeof RegistryIndexItemSchema>;

export const RegistryIndexSchema = z
  .object({
    $schema: z.string().optional(),
    name: z.string(),
    homepage: z.string().optional(),
    items: z.array(RegistryIndexItemSchema),
  })
  .loose();
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;

/** The full per-item document (`{base}/{name}.json`) additionally carries file content. */
export const RegistryFullItemSchema = RegistryItemBaseSchema.extend({
  $schema: z.string().optional(),
});
export type RegistryFullItem = z.infer<typeof RegistryFullItemSchema>;

export type RegistryFile = z.infer<typeof RegistryFileSchema>;
