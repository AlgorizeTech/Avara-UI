import type { PageVariants } from "./types";

/**
 * Range date picker: 4 calendar layouts of one registry item
 * (`range-date-picker`), chosen with the `variant` prop. Disabling past dates
 * and the start and end time columns are props, so those examples are not
 * listed. Claims come from
 * src/app/docs/[framework]/range-date-picker/page.mdx.
 */
export const rangeDatePicker: PageVariants = {
  slug: "range-date-picker",
  intro: "A date range picker for hotel or flight booking, in four layouts: one or two months, each with or without a price under every day.",
  whenNot: [
    {
      use: "Date Picker",
      slug: "date-picker",
      reason: "for choosing a single date in a form field",
    },
  ],
  gotchas: [
    "All four are looks of the one `range-date-picker` item: install it once and set `variant` from the index.",
    "Past dates are blocked with `disablePast` (and `minDate` / `maxDate` bound the window) and start and end times come from `showTime`: both are props on any layout.",
  ],
  variants: [
    {
      id: "single",
      label: "Single month",
      group: "One month",
      summary: "One month at a time for choosing a start and end date.",
      bestFor: ["a compact picker in a narrow space or on mobile"],
      avoidIf: ["people often pick ranges that span two months"],
      traits: ["one month", "no prices"],
      item: "range-date-picker",
      demo: "range-date-picker",
      example: "Single Month Range Date Picker",
      props: { variant: "single" },
      setProps: { variant: "single" },
    },
    {
      id: "priced-single",
      label: "Single month with prices",
      group: "One month",
      summary: "One month with a price shown for each day.",
      bestFor: ["a compact booking widget where the nightly or daily rate matters"],
      avoidIf: ["you have no per-day price to show"],
      traits: ["one month", "price per day"],
      item: "range-date-picker",
      demo: "range-date-picker",
      example: "Single Month Priced Range Date Picker",
      props: { variant: "priced-single" },
      setProps: { variant: "priced-single" },
    },
    {
      id: "dual",
      label: "Dual month",
      group: "Two months",
      summary: "Two months side by side, so a range across a month boundary is visible at once.",
      bestFor: ["a desktop booking flow where ranges often span two months"],
      avoidIf: ["the space is narrow"],
      traits: ["two months", "no prices"],
      item: "range-date-picker",
      demo: "range-date-picker",
      example: "Dual Month Range Date Picker",
      props: { variant: "dual" },
      setProps: { variant: "dual" },
    },
    {
      id: "priced-dual",
      label: "Dual month with prices",
      group: "Two months",
      summary: "Two months side by side with a price on each day.",
      bestFor: ["a hotel or flight search where comparing prices across two months helps"],
      avoidIf: ["you have no per-day price to show, or the space is narrow"],
      traits: ["two months", "price per day"],
      item: "range-date-picker",
      demo: "range-date-picker",
      example: "Dual Month Priced Range Date Picker",
      props: { variant: "priced-dual" },
      setProps: { variant: "priced-dual" },
    },
  ],
};
