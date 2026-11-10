import type { PageVariants } from "./types";

/**
 * Invoice: 3 designs of one registry item (`invoice`), chosen with the
 * `variant` prop. Claims come from src/app/docs/[framework]/invoice/page.mdx.
 */
export const invoice: PageVariants = {
  slug: "invoice",
  intro: "An editable invoice dashboard in three designs: a default dashboard, a corporate executive look and a neo-brutalist one. You hand it an `invoiceData` object and it owns the rest, including editing line items and downloading the JSON.",
  gotchas: [
    "All three are looks of the one `invoice` item: install it once and set `variant` from the index.",
    "The dates, addresses, billing details, line items, totals and notes all come from the one `invoiceData` object.",
  ],
  variants: [
    {
      id: "default",
      label: "Default dashboard",
      summary: "The standard invoice dashboard, with your accent colour on the primary buttons and focus rings.",
      bestFor: ["a SaaS or billing area that should match a general dashboard"],
      avoidIf: ["you want a stricter business look or a bold, graphic one"],
      traits: ["dashboard layout", "default look", "editable with an Edit sidebar"],
      item: "invoice",
      demo: "invoice",
      example: "Default Dashboard Invoice",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "corporate",
      label: "Corporate executive",
      summary: "A formal, business-style invoice.",
      bestFor: ["a B2B or finance product where the invoice should look formal"],
      avoidIf: ["your brand is playful or casual"],
      traits: ["formal styling"],
      item: "invoice",
      demo: "invoice",
      example: "Corporate Executive",
      props: { variant: "corporate" },
      setProps: { variant: "corporate" },
    },
    {
      id: "brutalist",
      label: "Neo-brutalist",
      summary: "A bold neo-brutalist invoice.",
      bestFor: ["a brand with a loud, graphic, neo-brutalist identity"],
      avoidIf: ["you need a conservative or corporate look"],
      traits: ["neo-brutalist styling"],
      item: "invoice",
      demo: "invoice",
      example: "Neo-Brutalist",
      props: { variant: "brutalist" },
      setProps: { variant: "brutalist" },
    },
  ],
};
