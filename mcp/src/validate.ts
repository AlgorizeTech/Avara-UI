import type { RegistryFullItem } from "./registry/types.js";

/**
 * mcp-guide.md section 12. Only checks what the data actually supports:
 * - structured `props` (once generate-registry.ts emits them, section 0.8): errors.
 * - `docs` prose only: warnings, because prose isn't a type.
 * This is not a type checker — it exists so an agent doesn't hallucinate an API.
 */

export interface ValidationIssue {
  type: "INVALID_PROP" | "INVALID_VARIANT" | "MISSING_REQUIRED_PROP" | "UNKNOWN_PROP";
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  propSource: "structured" | "docs-text" | "unknown";
}

export function validateComponentUsage(
  item: RegistryFullItem,
  props: Record<string, unknown> = {},
): ValidationResult {
  if (item.props && item.props.length > 0) {
    return validateAgainstStructuredProps(item.props, props);
  }

  if (item.docs) {
    return {
      valid: true,
      errors: [],
      warnings: [
        {
          type: "UNKNOWN_PROP",
          message:
            "This component's prop list is not structured yet — only prose documentation is available, so props were not checked. Read the `docs` text from get_component before using unfamiliar props.",
        },
      ],
      propSource: "docs-text",
    };
  }

  return {
    valid: true,
    errors: [],
    warnings: [
      {
        type: "UNKNOWN_PROP",
        message: "No prop or documentation data is available for this component; props could not be validated.",
      },
    ],
    propSource: "unknown",
  };
}

function validateAgainstStructuredProps(
  known: NonNullable<RegistryFullItem["props"]>,
  provided: Record<string, unknown>,
): ValidationResult {
  const errors: ValidationIssue[] = [];
  const byName = new Map(known.map((p) => [p.name, p]));

  for (const [name, value] of Object.entries(provided)) {
    const spec = byName.get(name);
    if (!spec) {
      errors.push({ type: "INVALID_PROP", message: `'${name}' is not a known prop on this component.` });
      continue;
    }
    if (spec.variantValues && spec.variantValues.length > 0 && typeof value === "string") {
      if (!spec.variantValues.includes(value)) {
        errors.push({
          type: "INVALID_VARIANT",
          message: `'${value}' is not a valid value for '${name}'. Expected one of: ${spec.variantValues.join(", ")}.`,
        });
      }
    }
  }

  for (const spec of known) {
    if (spec.required && !(spec.name in provided)) {
      errors.push({ type: "MISSING_REQUIRED_PROP", message: `Required prop '${spec.name}' is missing.` });
    }
  }

  return { valid: errors.length === 0, errors, warnings: [], propSource: "structured" };
}
