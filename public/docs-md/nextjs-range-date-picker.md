# Range Date Picker

An interactive **Range Date Picker** component featuring single month, dual-month, and rate-priced calendar layouts for hotel or flight booking applications.

## Variations

export const usageSingle = `import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

export default function SingleRangeDatePickerDemo() {
  const [range, setRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  return (
    
  );
}`;

export const usagePricedSingle = `import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

export default function PricedSingleRangeDatePickerDemo() {
  const [range, setRange] = useState({
    from: new Date(new Date().setDate(8)),
    to: new Date(new Date().setDate(18)),
  });

  return (
     (date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100")}
      color="primary"
    />
  );
}`;

export const usageDual = `import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

export default function DualRangeDatePickerDemo() {
  const [range, setRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 14)),
    to: new Date(),
  });

  return (
    
  );
}`;

export const usagePricedDual = `import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

export default function PricedDualRangeDatePickerDemo() {
  const [range, setRange] = useState({
    from: new Date(new Date().setDate(8)),
    to: new Date(new Date().setDate(28)),
  });

  return (
     (date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100")}
      color="primary"
    />
  );
}`;

## Installation

## Features

Discover the interactive capabilities of the `RangeDatePicker` component:

- **Single & Dual Priced Calendars (`variant="priced-single" | "priced-dual"`)**: Renders dynamic rate prices (`$100`, `$120`) directly below each date number for hotel room or flight booking workflows in both single and dual month views.
- **Dual Calendar Layout (`variant="dual"`)**: Displays two side-by-side calendars (Month N on Left, Month N+1 on Right). Select start date from the left calendar and end date on the right calendar.
- **Single Calendar Layout (`variant="single"`)**: Compact single-month view ideal for smaller screens or compact forms.
- **Custom Price Formatter (`getPrice`)**: Accepts custom callback functions to supply date-specific rates from API or static pricing rules.
- **Range Selection Engine**: Click any start date and end date to highlight the span with smooth background effects.
- **Dynamic Color Themes**: Built-in support for `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, and `"zinc"` color schemes.

## Props Reference: RangeDatePicker

        Prop
        Type
        Default
        Description

        variant
        "single" | "dual" | "priced-single" | "priced-dual"
        "single"
        Calendar layout variant. "priced-single" & "priced-dual" render price tags below date numbers.

        showPrices
        boolean
        false
        Toggles visibility of price labels underneath dates.

        getPrice
        {`(date: Date) => string | number | null`}
        undefined
        Custom pricing formatter function to return dynamic rates per date.

        value
        {`{ from: Date | null; to: Date | null }`}
        undefined
        Controlled date range value object.

        onChange
        {`(range: DateRange) => void`}
        undefined
        Callback fired when date range is selected or reset.

        defaultFrom
        Date | null
        Last 7 Days
        Initial start date for uncontrolled state.

        defaultTo
        Date | null
        Today
        Initial end date for uncontrolled state.

        color
        "primary" | "indigo" | "rose" | "emerald" | "zinc"
        "primary"
        Theme color variant for highlights and buttons.

---

**Component Path:** `[framework]\range-date-picker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
