import type { PageVariants } from "./types";

/**
 * Input: 4 field styles of one registry item (`input`), chosen with the
 * `variant` prop. Password toggle (`inputType="password"`) and autocomplete
 * (`suggestions`) are props, so those examples are not listed. Claims come
 * from src/app/docs/[framework]/input/page.mdx.
 */
export const input: PageVariants = {
  slug: "input",
  intro: "A text field with labels, helper text, a password toggle and autocomplete suggestions, in four styles: bordered, filled, underlined and a pill badge.",
  whenNot: [
    {
      use: "File Upload",
      slug: "file-upload",
      reason: "for drag-and-drop or file selection fields",
    },
  ],
  gotchas: [
    "All four are looks of the one `input` item: install it once and set `variant` from the index.",
    "A password field is `inputType=\"password\"` (the show/hide toggle comes with it) and autocomplete is the `suggestions` prop: neither is a different design.",
  ],
  variants: [
    {
      id: "default",
      label: "Bordered",
      group: "Boxed",
      summary: "The default bordered box, with an optional label above and helper text below.",
      bestFor: ["a standard form field that should look clearly like a field"],
      avoidIf: ["the form's design system calls for a flatter field"],
      traits: ["bordered box", "default look"],
      item: "input",
      demo: "input",
      example: "Input",
      props: { inputType: "email" },
      generalItem: true,
    },
    {
      id: "filled",
      label: "Filled",
      group: "Boxed",
      summary: "A solid, low-contrast field with no visible border at rest.",
      bestFor: ["a soft, modern form on a light background"],
      avoidIf: ["the field must stand out against a similar-coloured surface"],
      traits: ["solid fill", "no border at rest"],
      item: "input",
      demo: "input",
      example: "Filled",
      props: { variant: "filled" },
      setProps: { variant: "filled" },
      generalItem: true,
    },
    {
      id: "underlined",
      label: "Underlined",
      group: "Lines and capsule",
      summary: "The chrome is reduced to a single baseline rule.",
      bestFor: ["a minimal, editorial form"],
      avoidIf: ["fields must be easy to spot in a dense form"],
      traits: ["baseline rule only"],
      item: "input",
      demo: "input",
      example: "Underlined",
      props: { variant: "underlined" },
      setProps: { variant: "underlined" },
      generalItem: true,
    },
    {
      id: "pill",
      label: "Pill badge",
      group: "Lines and capsule",
      summary: "The input sits in a capsule with a vertical divider after a leading icon in a segregated badge.",
      bestFor: ["a search or single-field sign-up with a leading icon"],
      avoidIf: ["you have a long multi-field form"],
      traits: ["capsule shape", "leading icon badge", "vertical divider"],
      item: "input",
      demo: "input",
      example: "Pill badge",
      props: { example: "pill", variant: "pill" },
      setProps: { variant: "pill" },
      generalItem: true,
    },
  ],
};
